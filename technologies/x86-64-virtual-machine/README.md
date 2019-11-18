# x86-64 Virtual Machine

## Overview

The purpose of x86-64 smart contracts in the Echo blockchain is to allow owners of Echo accounts to create and run smart contracts implemented in any high level programming language that can be compiled into sequence of x86-64 instructions.

x86-64 VM is a part of the Echo blockchain which is acting as a isolated runtime environment for the x86-64 smart contract. x86-64 VM can execute smart contract uploaded into the Echo blockchain by emulating 64 bit processor hardware and x86-64 instruction set.

x86-64 smart contract along with the x86-64 virtual machine allows developers to implement smart contracts for the Echo blockchain with complex data structures, algorithms and calculations using the full set of features provided by the selected high level programming language.

Development, deployment and execution of the x86-64 smart contract includes the following steps:

* write the smart contract using high level programming language in any

  development environment familiar to the developer 

* compile and link smart contract into 64 bit ELF executable 
* run the resulted executable through the repackager utility program

  provided along with the ECHO blockchain package

* upload the contract into ECHO blockchain 
* call smart contract with provided parameters and get the return result

  stored in the ECHO 

These steps are covered in detail in the corresponding sections.

