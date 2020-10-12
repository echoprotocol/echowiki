{% hint style="warning" %}
Is now in the development stage.
{% endhint %}
# Echo x86-64 

## Overview

The purpose of x86-64 smart contracts in the ECHO blockchain is to allow
owners of ECHO accounts to create and run smart contracts implemented in
any high level programming language that can be compiled into sequence
of x86-64 instructions.

x86-64 VM is developed as a part of the ECHO blockchain which is acting
as a isolated runtime environment for the x86-64 smart contract. x86-64
VM can execute smart contract uploaded into the ECHO blockchain by
emulating 64 bit processor hardware and x86-64 instruction set.

x86-64 smart contract along with the x86-64 virtual machine allows
developers to implement smart contracts for the ECHO blockchain with
complex data structures, algorithms and calculations using the full set
of features provided by the selected high level programming language. 

Development, deployment and execution of the x86-64 smart contract
includes the following steps: 
- write the smart contract using high level programming language in any
  development environment familiar to the developer 
- compile and link smart contract into 64 bit ELF executable 
- run the resulted executable through the repackager utility program
  provided along with the ECHO blockchain package
- upload the contract into ECHO blockchain 
- call smart contract with provided parameters and get the return result
  stored in the ECHO 
  
These steps are covered in detail in the following sections.

## Smart contract implementation

### x86-64 smart contract development

Smart contract can be written in any complied programming language
including C++, ADA, D, Eiffel, Go, Haskell, Pascal, Rust. For the
details on each of the programming language please refer to the
corresponding section. Developers of the x86-64 smart contracts have
access to the following features for implementation of the contract:

Several classes/functions are provided allowing easy development of the
smart contract 

- string, vector, hashmap
- cryptographic functions (to be defined)
- debug output functions
- functions for accessing the blockchain, persistent storage, contract
  parameters and for returning the result from contract
  
### Compilation and linkage

In order to receive the x86-64 bytecode of the contract developer should
run the source code through the compilation and linkage toolchain
available for the particular high level programming language. For the
set of supported toolchains please refer to the corresponding section.

### Debugging of x86-64 smart contract

Debugging environment is provided in order to help developers to test
their smart contracts before deploying into the ECHO blockchain. It
allows developer to run the contract on the local environment, get the
return result, analyze debug outputs from the contract. Generating
64-bit ELF executable.

### Repackaging

The executable generated during the previous step should be passed
through the repakager utility which is a part of smart contract
development environment. Command line example for repakager 

```bash
./repakager contract contract.out
```

### Uploading of smart contract

User should upload the bytecode of the contract to the ECHO blockchain.
See below for the example of command uploading the contract through his
wallet.

```bash
create_contract <username> <bytecode> 500 ECHO "" false true
```

Once the contract is uploaded it can be executed.

### Executing smart contract

x86-64 Smart contract uploaded into ECHO blockchain can be executed as
ordinary smart contract. Contract parameters represents a byte array
where all the parameters are concatenated. Strings are delimited with 0
value (char '\0') or two characters "\0"

Example of executing smart contract

```bash
call_contract <username> 1.16.0 "get_balance(\"1.2.16\",\"1.3.0\")" 0 ECHO 1 2000000 true true
```
