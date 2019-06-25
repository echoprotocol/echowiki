# Hello world

The example below describes the mechanism of creating, deploying, and invoking a contract on the Echo network, written in Solidity. To interact with the blockchain, **Echo cli-wallet** will be used. There are also some other options for creating a contract, such as using js or python libraries, or uploading a contract manually through the desktop wallet. Examples for these methods can be found in the documentation of the corresponding libraries or applications.

As an example, we will use the `piggy.sol` contract. After having been created this contract accepts money, and withdraw it one at a time or all at once, while deleting itself.

```silidity
pragma solidity ^0.4.24;

contract PiggyBank {
    address owner;

    constructor() public payable {
        owner = msg.sender;
    }

    function greet() public pure returns (string) {
        return "Hello World!!!";
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
6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610254806100536000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630314c1bf1461005c5780639e19b52d14610073578063cfae32171461008a575b600080fd5b34801561006857600080fd5b5061007161011a565b005b34801561007f57600080fd5b50610088610154565b005b34801561009657600080fd5b5061009f6101eb565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100df5780820151818401526020810190506100c4565b50505050905090810190601f16801561010c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60019081150290604051600060405180830381858888f193505050501580156101bc573d6000803e3d6000fd5b507fbfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf60405160405180910390a1565b60606040805190810160405280600e81526020017f48656c6c6f20576f726c642121210000000000000000000000000000000000008152509050905600a165627a7a723058202c417e9b0840ebe18e2be5b31caac4edba9cd957395ce053180c3aa9efdd78130029
Function signatures:
0314c1bf: breakPiggy()
9e19b52d: getPennie()
cfae3217: greet()
```

Now we create a contract named nathan using the command `create_contract`.

When creating a contract we are sending 10000 ECHO to it.

```bash
create_contract nathan "6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610254806100536000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630314c1bf1461005c5780639e19b52d14610073578063cfae32171461008a575b600080fd5b34801561006857600080fd5b5061007161011a565b005b34801561007f57600080fd5b50610088610154565b005b34801561009657600080fd5b5061009f6101eb565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100df5780820151818401526020810190506100c4565b50505050905090810190601f16801561010c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60019081150290604051600060405180830381858888f193505050501580156101bc573d6000803e3d6000fd5b507fbfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf60405160405180910390a1565b60606040805190810160405280600e81526020017f48656c6c6f20576f726c642121210000000000000000000000000000000000008152509050905600a165627a7a723058202c417e9b0840ebe18e2be5b31caac4edba9cd957395ce053180c3aa9efdd78130029" 10000 ECHO 1 2000000 "" true true false
```

After adding the resulting transaction to the blockchain, we can find out the ID of a new contract.

But before, it's necessary to get the contract performance result. The result ID can be found out with the help of `get_account_history` method, by requesting the latest  operation.

```bash
unlocked >>> get_account_history nathan 1
get_account_history nathan 1
2039-01-01T15:17:26 create_contract_operation nathan fee: 0.00013 ECHO   result: 1.15.0
```

The result of creating a contract has the ID `1.15.0`, and now let's see how to get it using the `get_contract_result` method.

```bash
unlocked >>> get_contract_result 1.15.0
get_contract_result 1.15.0
[
  0,{
    "exec_res": {
      "excepted": "None",
      "new_address": "0100000000000000000000000000000000000000",
      "output": "608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630314c1bf1461005c5780639e19b52d14610073578063cfae32171461008a575b600080fd5b34801561006857600080fd5b5061007161011a565b005b34801561007f57600080fd5b50610088610154565b005b34801561009657600080fd5b5061009f6101eb565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100df5780820151818401526020810190506100c4565b50505050905090810190601f16801561010c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60019081150290604051600060405180830381858888f193505050501580156101bc573d6000803e3d6000fd5b507fbfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf60405160405180910390a1565b60606040805190810160405280600e81526020017f48656c6c6f20576f726c642121210000000000000000000000000000000000008152509050905600a165627a7a723058202c417e9b0840ebe18e2be5b31caac4edba9cd957395ce053180c3aa9efdd78130029",
      "code_deposit": "Success",
      "gas_refunded": 0,
      "gas_for_deposit": 1885669,
      "deposit_size": 596
    },
    "tr_receipt": {
      "status_code": 1,
      "gas_used": 233531,
      "bloom": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "log": []
    }
  }
]
```

The address of the new contract is in the `exec_res.new_address` field. It is written in an Ethereum address format, that equals `0100000000000000000000000000000000000000` in our case, which is converted into Echo ID as `1.14.0`.

Now, we can find out the current contract balance, as well as call its methods.

Finding out the balance using the `list_id_balances` method:

```bash
unlocked >>> list_id_balances 1.14.0
list_id_balances 1.14.0
[{
    "amount": 10000,
    "asset_id": "1.3.0"
  }
]
```

Calling the `greet` method that returns the constant string.

```sh
call_contract nathan 1.14.0 "cfae3217" 0 ECHO 1 2000000 true true
```

The line that the contract returns is in the contract result field `exec_res.output` in a hex-form.

```sh
unlocked >>> get_contract_result 1.15.1
get_contract_result 1.15.1
[
  0,{
    "exec_res": {
      "excepted": "None",
      "new_address": "0000000000000000000000000000000000000000",
      "output": "0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e48656c6c6f20576f726c64212121000000000000000000000000000000000000",
      "code_deposit": "None",
      "gas_refunded": 0,
      "gas_for_deposit": 0,
      "deposit_size": 0
    },
    "tr_receipt": {
      "status_code": 1,
      "gas_used": 21921,
      "bloom": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "log": []
    }
  }
]
```

Calling the `getPennie` method, that performs transfer to the account and creates an event.

```sh
call_contract nathan 1.14.0 "9e19b52d" 0 ECHO 1 2000000 true true
```

As a result of this method implementation, the contract balance should have decreased by 1, which we can see when viewing its balance sheet.

```sh
unlocked >>> list_id_balances 1.14.0
list_id_balances 1.14.0
[{
    "amount": 9999,
    "asset_id": "1.3.0"
  }
]
```

Also there are event records in the result logs..

```sh
"log": [{
    "address": "0100000000000000000000000000000000000000",
    "log": [
    "bfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf"
    ],
    "data": ""
}
]
```

Calling the `breakPiggy` method, that returns all the contract money back and destroying the contract itself.

```sh
call_contract nathan 1.14.0 "0314c1bf" 0 ECHO 1 2000000 true true
```

As a result, we can see that the contract balance has decreased to zero and that it has `suicided`, so now it's impossible to call its methods any more.

```sh
unlocked >>> list_id_balances 1.14.0
list_id_balances 1.14.0
[{
    "amount": 0,
    "asset_id": "1.3.0"
  }
]

unlocked >>> get_object 1.14.0
get_object 1.14.0
[{
    "id": "1.14.0",
    "statistics": "2.20.0",
    "suicided": true,
    "type": "evm"
  }
]
```
