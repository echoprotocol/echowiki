# Rust smart-contracts

## Project set up

```bash
cargo init example-contract
cd example-contract
```

Add `echo-x64` library as dependency in `Cargo.toml`.

```toml
[dependencies]
echo-x64 = { path = "../echo-x64" }
```

### Compilation target specification

Echo-x64 CPU specification:
```json
{
  "llvm-target": "x86_64-unknown-none",
  "data-layout": "e-m:e-i64:64-f80:128-n8:16:32:64-S128",
  "arch": "x86_64",
  "target-endian": "little",
  "target-pointer-width": "64",
  "target-c-int-width": "32",
  "os": "none",
  "executables": true,
  "dynamic-linking": false,
  "linker-flavor": "ld.lld",
  "linker": "rust-lld",
  "panic-strategy": "abort",
  "disable-redzone": true,
  "features": "-mmx,-sse,+soft-float"
}
```

Save it as `x86_64-echo.json` in the project root directory.

### Compilation

Compile project in release for Echo-x64 target and repack it into ESC format using our repackager utility.

```bash
cargo xbuild --release --target x86_64-echo.json
repackager target/x86_64-echo/release/example-contract -o target/example-contract.esc
```

And now you are ready to deploy `target/example-contract.esc`!

## Features guide

### Basics

Rust's standard library heavily depends on native implementation, so it cannot be used in other environments such as embed microprocessors or echo-x64 smart-contracts. So the smart-contract required to build with `#![no_std]` attribute which disables Rust's `std` library and replaces it with `core` library which is platform independent.

Same goes for executable's entry point, which is must be replaced with `#![no_main]` attribute and custom `_start` function. New `_start` function can be created with `echo_contract` marco, along with function name matching, argument forwarding and handling of return values.

The `Contract` trait is required for smart-contract type. Currently it has only one method `construct(&mut self)` which is called when contract code is called during deployment.

Lets take a look at simplest "Hello World!" example.

```rust
#![no_std]
#![no_main]

extern crate echo_x64;

use echo_x64::preamble::*;

#[derive(Default)]
struct HelloWorld;

impl Contract for HelloWorld {}

impl HelloWorld {
    pub fn hello(&self) -> &str {
        "Hello World!"
    }
}

echo_contract!(HelloWorld, hello());
```

### Arguments and returns

Supported method argument types: `bool`, `i8`, `i16`, `i32`, `i64`, `u8`, `u16`, `u32`, `u64`, `String`.

Supported return types: `()`, `bool`, `i8`, `i16`, `i32`, `i64`, `u8`, `u16`, `u32`, `u64`, `&str`, `String` and tuples of these types up to 5 elements.

```rust
impl Counter {
    pub fn add(&mut self, val: i64) -> (i64, i64) {
        let num = i64::load(get_contract_id(), "num").unwrap_or(0);
        let new_num = num + val;
        StorageValue::store("num", &new_num);
        (num, val)
    }
}

echo_contract!(Counter, add(i64));
```

### Storage operations

Storage operations for individual values are implemented with `StorageValue` trait:
```rust
pub trait StorageValue where Self: Sized {
    /// Store a `value` into the storage variable `key`
    fn store(key: &str, value: &Self);
    /// Load a storage variable `key` of contract `con`
    fn load(con: u32, key: &str) -> Option<Self>;
}
```

Its implemented for types `bool`, `i8`, `i16`, `i32`, `i64`, `u8`, `u16`, `u32`, `u64`, `String`.

To remove values from the storage use `remove_storage_variable(prefix: &str)` function.
It will remove all keys with specified prefix.

#### Usage example

```rust
let num: i64 = StorageValue::load(get_contract_id(), "num").unwrap_or(0);
StorageValue::store("num", &(num + 1));
```

### Advanced storage operations

Access to values of complex collection such as vectors or maps can be easily achieved with `StorageAccess` utility trait.

`StorageAccess` provides generic interface to convert arbitrary data to string key for storage database.

You need to define how to construct key to your values and thats all.
```rust
struct IndexAccess;
impl<'a> StorageAccess<'a> for IndexAccess {
    type KeyParts = &'a usize; // Data which will be encoded into storage key
    type Key = String; // Resulting key type. Must implement `AsRef<str>`
    type Value = u64; // Storage value type

    fn make_key(index: Self::KeyParts) -> Self::Key {
        let mut key = String::with_capacity(32);
        key.push_str("some_array_");
        key.push_str(index.to_string());
        key
    }
}
```

With `StorageAccess` you can store, load and remove values:
```rust
// Create `StorageAccessRef` to the value with key `some_array_42`.
let value_acs: u64 = IndexAccess::to(&42);

value_acs.store(128);
assert_eq!(value_acs.load().unwrap_or(0), 128);
value_acs.remove();
```

### Events

The best way to define event function is to use `fn_event` macro.

```rust
fn_event! {Transfer, from: &Address, to: &Address, value: u64}

// The expansion of macro above
fn Transfer(from: &Address, to: &Address, value: u64) {
    event_begin("Transfer");
    EventValue::push_value(from);
    EventValue::push_value(to);
    EventValue::push_value(value);
    event_end();
}
```

To emit this event simply call this function like `Transfer("alice", "bob", 100);`.

### List of blockchain-related functions

```rust
get_balance(id: &str, asset_id: &str)
get_block_author()
get_block_hash(number: u32)
get_block_number()
get_block_timestamp()
get_call_asset_id()
get_contract_id()
get_full_contract_id()
get_gas_limit()
get_origin_sender()
get_property(request: &str)
get_send_value()
get_sender()
is_constructor()
transfer(to: &str, asset_id: &str, amount: u64)
```