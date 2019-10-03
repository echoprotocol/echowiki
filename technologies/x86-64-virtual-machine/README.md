# x86-64 Virtual Machine

## Overview

The purpose of x86-64 smart contracts in the ECHO blockchain is to allow owners of ECHO accounts to create and run smart contracts implemented in any high level programming language that can be compiled into sequence of x86-64 instructions.

x86-64 VM is developed as a part of the ECHO blockchain which is acting as a isolated runtime environment for the x86-64 smart contract. x86-64 VM can execute smart contract uploaded into the ECHO blockchain by emulating 64 bit processor hardware and x86-64 instruction set.

x86-64 smart contract along with the x86-64 virtual machine allows developers to implement smart contracts for the ECHO blockchain with complex data structures, algorithms and calculations using the full set of features provided by the selected high level programming language.

Development, deployment and execution of the x86-64 smart contract includes the following steps:

* write the smart contract using high level programming language in any

  development environment familiar to the developer 

* compile and link smart contract into 64 bit ELF executable 
* run the resulted executable through the repackager utility program

  provided along with the ECHO blockchain package

* upload the contract into ECHO blockchain 
* call smart contract with provided parameters and get the return result

  stored in the ECHO 

These steps are covered in detail in the following sections.

## Smart contract implementation

### x86-64 smart contract development

Smart contract can be written in any complied programming language including C++, ADA, D, Eiffel, Go, Haskell, Pascal, Rust. For the details on each of the programming language please refer to the corresponding section. Developers of the x86-64 smart contracts have access to the following features for implementation of the contract:

Several classes/functions are provided allowing easy development of the smart contract

* string, vector, hashmap
* cryptographic functions \(to be defined\)
* debug output functions
* functions for accessing the blockchain, persistent storage, contract

  parameters and for returning the result from contract

### Compilation and linkage

In order to receive the x86-64 bytecode of the contract developer should run the source code through the compilation and linkage toolchain available for the particular high level programming language. For the set of supported toolchains please refer to the corresponding section.

### Debugging of x86-64 smart contract

Debugging environment is provided in order to help developers to test their smart contracts before deploying into the ECHO blockchain. It allows developer to run the contract on the local environment, get the return result, analyze debug outputs from the contract. Generating 64-bit ELF executable.

### Repackaging

The executable generated during the previous step should be passed through the repakager utility which is a part of smart contract development environment. Command line example for repakager

```bash
./repakager contract contract.out
```

### Uploading of smart contract

User should upload the bytecode of the contract to the ECHO blockchain. See below for the example of command uploading the contract through his wallet.

```bash
create_contract <username> "<bytecode>" <value> <asset_type> "" false true
```

* `username` - name of the account creating the contract, can be id or name, as an example "1.2.1214" or "alex"
* `bytecode` - code of the contract
* `value` - the amount of asset transfered to the contract, as an example "1000"
* `asset_type` - the type of the asset transfered to the contract, can be id or name, as an example "1.3.0" or "ECHO"

Once the contract is uploaded it can be executed.

### Executing smart contract

x86-64 Smart contract uploaded into ECHO blockchain can be executed as ordinary smart contract. Contract parameters represents a byte array where all the parameters are concatenated. Strings are delimited with 0 value \(char '\0'\) or two characters "\0"

Example of executing smart contract

```bash
call_contract <username> <contract_id> "<function_with_parameters>" <value> <asset_type> true
```

* `username` - name of the account calling the contract, can be either id or name, as an example "1.2.1214" or "alex"
* `contract_id` - the id of the contract to call, as an example "1.10.754"
* `function_with_parameters` - function with parameters for call, as an example "get_balance(\"1.2.16\",\"1.3.0\")"
* `value` - the amount of asset transfered to the contract, as an example "1000"
* `asset_type` - the type of the asset transfered to the contract, can be id or name, as an example "1.3.0" or "ECHO"

### Get result of upload or execution

To get results of the uploading or execution of contracts, just call the method `get_contract_result (contract_result_id id)` , which takes the id of the results of contracts, for example `1.11.2`.

```bash
get_contract_result <contract_result_id>
```

* `contract_result_id` - the id of the contract result, as an example "1.11.21"

result of call:

```bash
[
  1,{
    "contract_id": "1.10.1544",
    "result": {
      "error": "none",
      "gas_used": 32554,
      "output": "f72e000000000000",
      "logs": []
    }
  }
]

```

where:

* `contract_id` - the id of the contract that was created or called
* `error` - the type of error if it was, else `none`
* `gas_used` - amount in echo * 10<sup>-8</sup> meaning how much it cost to call a contract
* `output` - hex of return variable
* `logs` - array of logs

### Get variables smart contract and call without changing chain

To get value of the public field of the contract, without creating a transaction, just call the method `call_contract_no_changing_state`.
This method also allows call the method of contract without changing chain.

```bash
call_contract_no_changing_state <contract_id> <username> <asset_type> <function_or_variable>
```

* `contract_id` - the id of the contract to call, as an example "1.10.754"
* `username` - name of the account calling the contract, can be either id or name, as an example "1.2.1214" or "Contract_alex"
* `asset_type` - the type of the asset transfered to the contract, can be id or name, as an example "1.3.0" or "ECHO"
* `function_or_variable` - variable name or function with parameters for call, as an example "storage_v" or "get_balance(\"1.2.16\",\"1.3.0\")"
