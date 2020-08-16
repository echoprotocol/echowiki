{% hint style="warning" %}
Is now in the development stage.
{% endhint %}

# Smart contract implementation

## x86-64 smart contract development

Smart contract can be written in any complied programming language including C++, ADA, D, Eiffel, Go, Haskell, Pascal, Rust. C++ and Rust only supported now. For the details on each of the programming language please refer to the corresponding section. Developers of the x86-64 smart contracts have access to the following features for implementation of the contract:

Several classes/functions are provided allowing easy development of the smart contract

* string, vector, hashmap
* cryptographic functions (to be implemented)
* debug output functions
* functions for accessing the blockchain, persistent storage, contract

  parameters and for returning the result from contract

## Compilation and linkage

In order to receive the x86-64 bytecode of the contract developer should run the source code through the compilation and linkage toolchain available for the particular high level programming language. For the set of supported toolchains please refer to the corresponding section.

## Debugging of x86-64 smart contract

Debugging environment will be provided in order to help developers to test their smart contracts before deploying into the Echo blockchain. It will allow developer to run the contract on the local environment, get the return result, analyze debug outputs from the contract. 

## Repackaging

The executable generated during the previous step should be passed through the repakager utility which is a part of smart contract development environment. Command line example for repakager

```bash
./repackager contract contract.out
```

## Uploading of smart contract

User should upload the bytecode of the contract to the ECHO blockchain. See below for the example of command uploading the contract through his wallet.

```bash
create_contract <username> "<bytecode>" <amount> <asset_type> "" false true
```

* `username` - name of the account creating the contract, can be id or name, as an example "1.2.1214" or "alex"
* `bytecode` - code of the contract
* `amount` - the amount of asset transfered to the contract, as an example "1000"
* `asset_type` - the type of the asset transfered to the contract, can be id or name, as an example "1.3.0" or "ECHO"

Once the contract is uploaded it can be executed.

## Executing smart contract

x86-64 Smart contract uploaded into ECHO blockchain can be executed as ordinary smart contract. Contract parameters represents a byte array where all the parameters are concatenated. Strings are delimited with 0 value \(char '\0'\) or two characters "\0"

Example of executing smart contract

```bash
call_contract <username> <contract_id> "<function_with_parameters>" <amount> <asset_type> true
```

* `username` - name of the account calling the contract, can be either id or name, as an example "1.2.1214" or "alex"
* `contract_id` - the id of the contract to call, as an example "1.10.754"
* `function_with_parameters` - function with parameters for call, as an example "get_balance(\"1.2.16\",\"1.3.0\")"
* `amount` - the amount of asset transfered to the contract, as an example "1000"
* `asset_type` - the type of the asset transfered to the contract, can be id or name, as an example "1.3.0" or "ECHO"

## Get result of upload or execution

To get results of the uploading or execution of contracts, just call the method `get_contract_result (contract_result_id id)` , which takes the id of the results of contracts, for example `1.12.2`.

```bash
get_contract_result <contract_result_id>
```

* `contract_result_id` - the id of the contract result, as an example "1.11.21"

result of call:

```bash
[
  1,{
    "contract_id": "1.11.1544",
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

## Get variables smart contract and call without changing chain

To get value of the public field of the contract, without creating a transaction, just call the method `call_contract_no_changing_state`.
This method also allows call the method of contract without changing chain.

```bash
call_contract_no_changing_state <contract_id> <username> <asset_type> <function_or_variable>
```

* `contract_id` - the id of the contract to call, as an example "1.10.754"
* `username` - name of the account calling the contract, can be either id or name, as an example "1.2.1214" or "Contract_alex"
* `asset_type` - the type of the asset transfered to the contract, can be id or name, as an example "1.3.0" or "ECHO"
* `function_or_variable` - variable name or function with parameters for call, as an example "storage_v" or "get_balance(\"1.2.16\",\"1.3.0\")"
