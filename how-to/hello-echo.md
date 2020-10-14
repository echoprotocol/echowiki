# Hello Echo!

The example below describes the mechanism of creating, deploying, and invoking a contract on the Echo network, written in Solidity. To interact with the blockchain, **Echo cli-wallet** will be used. There are also some other options for creating a contract, such as using js or python libraries, or uploading a contract manually through the desktop wallet. Examples for these methods can be found in the documentation of the corresponding libraries or applications.

As an example, we will use the `piggy.sol` contract. After having been created this contract accepts money, and withdraw it one at a time or all at once, while deleting itself.

```javascript
pragma solidity ^0.4.24;

contract PiggyBank {
    address owner;

    constructor() public payable {
        owner = msg.sender;
    }

    function greet() public pure returns (string) {
        return "Hello, Echo!";
    }

    function getPennie() public {
        owner.transfer(1);
        emit pennieReturned();
    }

    function breakPiggy() public {
        selfdestruct(owner);
    }

    event pennieReturned();
}
```

Below, as an example we will use solc to compile a contract and output the resulting bytecode and function hashes. Hashes and bytecode can also be obtained in other ways - using the online IDE for example.

```bash
$ ./solc --bin --hashes piggy.sol

======= piggy.sol:PiggyBank =======
Binary:
6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610254806100536000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630314c1bf1461005c5780639e19b52d14610073578063cfae32171461008a575b600080fd5b34801561006857600080fd5b5061007161011a565b005b34801561007f57600080fd5b50610088610154565b005b34801561009657600080fd5b5061009f6101eb565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100df5780820151818401526020810190506100c4565b50505050905090810190601f16801561010c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60019081150290604051600060405180830381858888f193505050501580156101bc573d6000803e3d6000fd5b507fbfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf60405160405180910390a1565b60606040805190810160405280600c81526020017f48656c6c6f2c204563686f2100000000000000000000000000000000000000008152509050905600a165627a7a7230582073eb6c0edb1df21cae5973bcc3f3e3001b42dc4a190530af024541f6ad507df20029
Function signatures:
0314c1bf: breakPiggy()
9e19b52d: getPennie()
cfae3217: greet()
```

Now we create a contract named nathan using the command `create_contract`.

When creating a contract we are sending 10000 ECHO to it.

```bash
create_contract nathan "6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610254806100536000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630314c1bf1461005c5780639e19b52d14610073578063cfae32171461008a575b600080fd5b34801561006857600080fd5b5061007161011a565b005b34801561007f57600080fd5b50610088610154565b005b34801561009657600080fd5b5061009f6101eb565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100df5780820151818401526020810190506100c4565b50505050905090810190601f16801561010c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60019081150290604051600060405180830381858888f193505050501580156101bc573d6000803e3d6000fd5b507fbfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf60405160405180910390a1565b60606040805190810160405280600c81526020017f48656c6c6f2c204563686f2100000000000000000000000000000000000000008152509050905600a165627a7a7230582073eb6c0edb1df21cae5973bcc3f3e3001b42dc4a190530af024541f6ad507df20029" 10000 ECHO "" false
```

Result of execution occurs in console in few seconds:

```bash
Result of create_contract:
{
  "id": "571d5c9844c5dfc49e4dbf67b87fa2cb90a7ec74",
  "block_num": 18,
  "trx_num": 0,
  "trx": {
    "ref_block_num": 16,
    "ref_block_prefix": 4051088017,
    "expiration": "2020-10-14T09:50:26",
    "operations": [[
        32,{
          "fee": {
            "amount": 466,
            "asset_id": "1.3.0"
          },
          "registrar": "1.2.26",
          "value": {
            "amount": "1000000000000",
            "asset_id": "1.3.0"
          },
          "code": "6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610254806100536000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630314c1bf1461005c5780639e19b52d14610073578063cfae32171461008a575b600080fd5b34801561006857600080fd5b5061007161011a565b005b34801561007f57600080fd5b50610088610154565b005b34801561009657600080fd5b5061009f6101eb565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100df5780820151818401526020810190506100c4565b50505050905090810190601f16801561010c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60019081150290604051600060405180830381858888f193505050501580156101bc573d6000803e3d6000fd5b507fbfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf60405160405180910390a1565b60606040805190810160405280600c81526020017f48656c6c6f2c204563686f2100000000000000000000000000000000000000008152509050905600a165627a7a7230582073eb6c0edb1df21cae5973bcc3f3e3001b42dc4a190530af024541f6ad507df20029",
          "eth_accuracy": false,
          "extensions": []
        }
      ]
    ],
    "extensions": [],
    "signatures": [
      "ad01ead4b37e6cdb8b27ec1184cc426a0e6b1d7e6e74abc56b7b059cfe8a7d71091ed5bad522e5377fbdd7452a72b1d47a468b6c7508420f37364e8e9db1b801"
    ],
    "signed_with_echorand_key": false,
    "operation_results": [[
        1,
        "1.12.0"
      ]
    ],
    "fees_collected": [{
        "amount": 466,
        "asset_id": "1.3.0"
      }
    ]
  }
}
```

After adding the resulting transaction to the blockchain, we can find out the ID of a new contract.

But before, it's necessary to get the contract performance result. You may see the result ID in returned console log. Field `operation_results` show us that result ID is `1.12.0`. Also the result ID can be found out with the help of `get_account_history` method, by requesting the latest operation.

```bash
unlocked >>> get_account_history nathan 1
18 2020-10-14T09:40:28 contract_create_operation nathan fee: 0.00000466 ECHO   result: 1.12.0
```

The result of creating a contract has the ID `1.12.0`, and now let's see how to get it using the `get_contract_result` method.

```bash
unlocked >>> get_contract_result 1.12.0
{
  "exec_res": {
    "excepted": "None",
    "new_address": "0100000000000000000000000000000000000000",
    "output": "608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630314c1bf1461005c5780639e19b52d14610073578063cfae32171461008a575b600080fd5b34801561006857600080fd5b5061007161011a565b005b34801561007f57600080fd5b50610088610154565b005b34801561009657600080fd5b5061009f6101eb565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100df5780820151818401526020810190506100c4565b50505050905090810190601f16801561010c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60019081150290604051600060405180830381858888f193505050501580156101bc573d6000803e3d6000fd5b507fbfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf60405160405180910390a1565b60606040805190810160405280600c81526020017f48656c6c6f2c204563686f2100000000000000000000000000000000000000008152509050905600a165627a7a7230582073eb6c0edb1df21cae5973bcc3f3e3001b42dc4a190530af024541f6ad507df20029",
    "code_deposit": "Success",
    "gas_for_deposit": 382149,
    "deposit_size": 596
  },
  "tr_receipt": {
    "status_code": 1,
    "gas_used": 265895,
    "bloom": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "log": []
  },
  "contract_id": "1.11.0"
}
```

The address of the new contract is in the `exec_res.new_address` field. It is written in an Ethereum address format, that equals `0100000000000000000000000000000000000000` in our case, which is converted into Echo ID as `1.11.0`.

Now, we can find out the current contract balance, as well as call its methods.

Finding out the balance using the `list_id_balances` method:

```bash
unlocked >>> list_id_balances 1.11.0
10000 ECHO
```

Calling the `greet` method that returns the constant string.

```bash
unlocked >>> call_contract nathan 1.11.0 "cfae3217" 0 ECHO
```

You also obtain a console log with contract execution.
The line that the contract returns is in the contract result field `exec_res.output` in a hex-form.

```bash
unlocked >>> get_contract_result 1.12.1
{
  "exec_res": {
    "excepted": "None",
    "new_address": "0000000000000000000000000000000000000000",
    "output": "0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c48656c6c6f2c204563686f210000000000000000000000000000000000000000",
    "code_deposit": "None",
    "gas_for_deposit": 0,
    "deposit_size": 0
  },
  "tr_receipt": {
    "status_code": 1,
    "gas_used": 42777,
    "bloom": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "log": []
  }
}
```

Calling the `getPennie` method, that performs transfer to the account and creates an event.

```bash
unlocked >>> call_contract nathan 1.11.0 "9e19b52d" 0 ECHO
```

As a result of this method implementation, the contract balance should have decreased by 1, which we can see when viewing its balance sheet.

```bash
unlocked >>> list_id_balances 1.11.0
9999.99999999 ECHO
```

Also there are event records in the result logs..

```bash
"log": [{
    "address": "0100000000000000000000000000000000000000",
    "log": [
      "bfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf"
    ],
    "data": "",
    "block_num": 65,
    "trx_num": 0,
    "op_num": 0
  }
]
```

Calling the `breakPiggy` method, that returns all the contract money back and destroying the contract itself.

```bash
unlocked >>> call_contract nathan 1.11.0 "0314c1bf" 0 ECHO
```

As a result, we can see that the contract balance has decreased to zero and that it has `destroyed`, so now it's impossible to call its methods any more.

```bash
unlocked >>> list_id_balances 1.11.0
0 ECHO

unlocked >>> get_object 1.11.0
[{
    "id": "1.11.0",
    "type": "evm",
    "destroyed": true,
    "statistics": "2.13.0",
    "eth_accuracy": false,
    "owner": "1.2.26",
    "extensions": []
  }
]
```
