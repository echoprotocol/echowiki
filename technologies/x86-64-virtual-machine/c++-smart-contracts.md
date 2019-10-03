# C++ Smart Contracts

## Writing a C++ smart contract

Smart contract should have entry point `void __apply()`. There is no other requirement for the rest of the code of the smart contract, though the approach for writing smart contract used in the examples is encouraged. There are several limitations to the C++ language in order to get small and portable bytecode

* dynamic linked libraries and runtime loading of the dynamic library is

  not supported 

* C++ and C standard libraries are not supported fully on all the C++

  toolchains, only classes/functions defined as header only can be

  included. As a consequence of that the following language features are

  not supported

* RTTI
  * exceptions
  * constructors of global variables are not called on the program

    startup 

Contract parameters can be retrieved by `get_parameters` variadic functions, should return false on error. Contract return value can be set using `set_return_values` variadic functions.

Several standard classes and functions are provided as a part of development environment:

* string, vector, hashmap
* cryptography functions
* classes/functions for accessing chain
* classes/functions for accessing persistent storage

`include` for them we can find in `x86-64/contracts/`.

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

extern "C" void __apply()
{
   CONTRACT(c);
   string function;

   parameters::get_function_name(function);

   if (function == "total_supply")
   {
       set_return_values(c.total_supply());
   }
   else if (function == "balance_of")
   {
       string account;
       if(get_parameters(account))
           set_return_values(c.balance_of(account));
   }
   else if (function == "mint")
   {
       std::uint64_t amount = 0;
       if(get_parameters(amount))
           set_return_values(c.mint(amount));
   }
   else if (function == "transfer")
   {
       string from, to;
       std::uint64_t amount = 0;
       if(get_parameters(from, to, amount))
           set_return_values(c.transfer(from, to, amount));
   }
}
}
```

This smart contract receives the name of the function to be invoked as a parameter, calls the corresponding function of the contract and returns the value back to the blockchain.

## Storage variables

For saving variables in chain for the contract exists DB classes. These variables are global for the contract and joint for the all who сalls the contract. Now we have following classes:

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

In contracts we can use event mechanism. In contract namespace we should add event signature `EVENT(event_name, variable_type1, variable_type2)` and then we can emit the event in the place we need. Event records in the result logs:

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
* `logs` - array of logs, where every logs represents:
    * `hash` - hash(keccak256) of event. Event signature for get the hash must like as `event_name(bool,string,uint64)`, without spaces between variables
    * `log` - hex of log
    * `id` - id of the contract that generated the logs

## Errors of executing smart contract

Errors may occur during the execution of the contract. Errors records in the result logs:

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
* `error` - the type of error if it was, else `none`

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

## Compilation and linkage

C++ smart contract should be compiled and linked into ELF executable.

### gcc toolchain

gcc compiler flags

```bash
-O0 -masm=intel -Wall -Wno-return-type -nostdlib -mno-tbm -fno-rtti -fno-exceptions -fno-unwind-tables -no-pie -mno-mmx -mno-sse -mno-sse2 -mno-sse3 -mno-sse4.1 -ffreestanding -mno-sse4.2
```

for otpimizatsiya we can use the flags `-01` or `-Os`. Recommended use `-Os`.

gcc linker flags

```text
-nostdlib -fno-rtti -fno-exceptions -fno-unwind-tables -ffreestanding
```

## Repackaging, uploading and executing of the smart contract

The 64 bit ELF executable generated by the C++ linker tool should be repackaged, uploaded and executed using the general flow for the x86-64 smart contracts described in the corresponding sections.

