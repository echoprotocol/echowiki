{% hint style="warning" %}
Is now in the development stage.
{% endhint %}

# C++ Smart Contracts

## Writing a C++ smart contract

Smart contract should have entry point `void __apply()` or if you include header from `x86-64/contracts/contract_base.hpp` you can use macro `MAIN(<contract_name> FUNC(<function1_name>) FUNC(<function2_name>))` which includes `__apply` function as the entry point. This macro supports a maximum of 10 functions. There is no other requirement for the rest of the code of the smart contract, though the approach for writing smart contract used in the examples is encouraged. There are several limitations to the C++ language in order to get small and portable bytecode. 

Several standard classes and functions that are not supported:

* floating point types and operations
* dynamic linked libraries and runtime loading of the dynamic library
* C++ and C standard libraries are not supported fully on all the C++ toolchains. For more information about STL support see [Using C++ STL library](advanced/x86-64-virtual-machine/c++-stl-library.md).
* RTTI
* exceptions
* constructors of global variables are not called on the program startup 

Several standard classes and functions are provided as a part of development environment:

* string, vector, hashmap
* cryptography functions (to be implemented)
* classes/functions for accessing chain
* classes/functions for accessing persistent storage

Contract parameters can be retrieved by `get_parameters` variadic functions, should return false on error. Contract return value can be set using `set_return_values` variadic functions. These functions can be called directly or using macro MAIN as in the example below.

Headers for these classes and functions are located in `x86-64/contracts/`.

Following smart contract written in C++ implements simple program for custom token.

```cpp
#include "events.hpp"
#include "string.hpp"
#include "parameters.hpp"
#include "return_value.hpp"
#include "contract_base.hpp"
#include "db_types.hpp"
#include "db_hashmap.hpp"

namespace x86_64_contract
{

EVENT(transfer, string, string, uint64_t);

class contract : public contract_base
{
private:
   string _name{"Contract"};

   DB_STRING(_owner);
   DB_UINT64(_total_supply);
   DB_UINT64(_max_supply);
   DB_HASHMAP(db_string, db_uint64, _balances);

public:
   void constructor() override
   {
       _owner = get_origin_sender();
       _total_supply = 0;
       _max_supply = 1'000'000'000;
   }

   std::uint64_t total_supply() const
   {
       return _total_supply;
   }

   std::uint64_t balance_of(const string& account)
   {
       if(db_hashmap<db_string, db_string>::npos != _balances.find(account))
       {
           return _balances[account];
       }
       return 0;
   }

   bool mint(std::uint64_t amount)
   {
       if(get_origin_sender() == _owner && _total_supply + amount <= _max_supply)
       {
           _total_supply += amount;
           _balances[_owner] += amount;
           return true;
       }
       return false;
   }

   bool transfer(const string& from, const string& to, std::uint64_t amount)
   {
       if(get_origin_sender() == from && _balances[from] >= amount)
       {
           _balances[from] -= amount;
           _balances[to] += amount;

           EMIT(transfer, from, to, amount);

           return true;
       }
       return false;
   }
};

MAIN(contract, FUNC(total_supply) FUNC(balance_of) FUNC(mint) FUNC(transfer))
}
```

This smart contract implements a simple token, each of the functions declared in MAIN can be invoked from the chain via `call_contract` operation and the result will be available for the user. Constructor is invoked automatically during contract creation.

## Storage variables

DB classes allows to save variables in the persistent storage so their values will be accessible during future invocations of the contract. These variables values can be retrieved via `call_contract_no_changin_state` operation. Following types are supporting persistence:

* DB_UINT8(var)
* DB_UINT16(var)
* DB_UINT32(var)
* DB_UINT64(var)
* DB_INT8(var)
* DB_INT16(var)
* DB_INT32(var)
* DB_INT64(var)
* DB_STRING(var)
* DB_BOOL(var)
* DB_VECTOR(type, var)
* DB_HASHMAP(key_type, value_type, var)

## Contract events

Events mechanism is supported in x86-64 contracts. Following event signature `EVENT(event_name, variable_type1, variable_type2)`is defined in contract namespace we and later in can be emited in the contract functions. Event will be saved in the contract result:

```sh
get_contract_result 1.11.4
[
  1,{
    "contract_id": "1.10.28",
    "result": {
      "error": "none",
      "gas_used": 41844,
      "output": "f72e000000000000",
      "logs": [{
          "hash": "806a86f5c5dccc502bdc081bb15f6e3f3cda72d005c0e964bce0baa40c06169d",
          "log": "06000000312e322e323606000000312e322e3235a0fd000000000000",
          "id": 0
        }
      ]
    }
  }
]
```

where
* `logs` - array of logs, where every logs consists of:
    * `hash` - hash(keccak256) of event. This value represents the hash of the signature `event_name(bool,string,uint64)`, without spaces between variables.
    * `log` - hex of log.
    * `id` - id of the contract that generated the logs.

## Errors of executing smart contract

Different types of errors can occur during the execution of the contract. Errors are recorded in the result logs:

```sh
get_contract_result 1.11.25
[
  1,{
    "contract_id": "1.10.28",
    "result": {
      "error": "memory_invalid_access",
      "gas_used": 41844,
      "output": "f72e000000000000",
      "logs": []
    }
  }
]
```

where
* `error` - is the type of error, `none` if contract finished execution successfully.

Errors types:
* unknown
* contract_error
* out_of_gas
* log_limit_exceeded
* output_limit_exceeded
* no_available_memory
* invalid_register
* unsupported_instruction
* unsupported_modrm_sib
* unexpected_operation
* division_by_zero
* memory_invalid_access
* zero_size_allocation
* operand_invalid_access
* not_heap_memory
* incorrect_parameters
* invalid_chain_call
* incorrect_emulator_load

## Compilation and linkage

C++ smart contract should be compiled and linked into ELF or Mach-O executable using standard toolchain.

### gcc toolchain

#### gcc compiler flags

```bash
-O0 -Wall -mno-tbm -fno-rtti -fno-exceptions -fno-unwind-tables -fno-pie -mno-mmx -mno-sse2 -mno-sse3 -mno-sse4.1 -ffreestanding -mno-sse4.2 -Werror=return-type -fdata-sections -ffunction-sections -fno-asynchronous-unwind-tables -fno-dwarf2-cfi-asm -fdiagnostics-show-option 
```

for optimization `-01` or `-Os` can be used instead of `-O0`. `-Os` is recommended to use.

#### gcc linker flags

```bash
-nostdlib -fno-rtti -fno-exceptions -fno-unwind-tables -fno-pie -static -e __apply -Wl,--gc-sections
```

### clang toolchain

#### clang compiler flags

```bash
-O0 -Wall -mno-tbm -fno-rtti -fno-exceptions -fno-unwind-tables -fno-pie -mno-mmx -mno-sse2 -mno-sse3 -mno-sse4.1 -ffreestanding -mno-sse4.2 -Werror=return-type -fdata-sections -ffunction-sections -fno-asynchronous-unwind-tables -fno-dwarf2-cfi-asm -fdiagnostics-show-option -Wno-inline-new-delete -fno-stack-protector
```

for optimization `-01` or `-Os` can be used instead of `-O0`. `-Os` is recommended to use.

#### clang linker flags

```bash
-nostdlib -fno-rtti -fno-exceptions -fno-unwind-tables -fno-pie -static -e ___apply
```

## Repackaging, uploading and executing of the smart contract

The 64 bit ELF or Mach-O executable generated by the C++ linker tool should be repackaged, uploaded and executed using the general flow for the x86-64 smart contracts described in the corresponding sections.

