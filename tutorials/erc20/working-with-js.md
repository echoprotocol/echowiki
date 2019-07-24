# Working With Contract With JavaScript Library

[echojs-lib](https://www.npmjs.com/package/echojs-lib) library is the recommended means for communication with Echo network in JavaScript & TypeScript.

Documentation on the library can be found in the `docs` section of [https://github.com/echoprotocol/echojs-lib/tree/master/docs](https://github.com/echoprotocol/echojs-lib/tree/master/docs).

Below is an example of working with Echo network using `echojs-lib` for an ERC20 token contract deployment and calling.

Pre-requisites:
- A private key of an account with positive balance in ECHO
- WebSocket access to a running Echo node

## Initialization

The library can be installed using `npm`:

```bash
npm i echojs-lib
```

Then you need to initialize a connection to a node and import your private key:

```javascript
const { default: echo, PrivateKey, constants } = require('echojs-lib');

const privateKey = PrivateKey.fromWif(YOUR_PRIVATE_KEY_WIF);

const connect = async () => {
	await echo.connect('ws://127.0.0.1:9000');
};

connect().then(async () => {
    //	the rest of the code below should be used here.
});
```

## Contract Deployment

To deploy a contract, you need to build an operation, sign and send it:
```javascript
const bytecode = '608060405261271060025534801561001657600080fd5b506127106000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6127106040518082815260200191505060405180910390a3610d8e806100d36000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063095ea7b31461009357806318160ddd146100f857806323b872dd1461012357806339509351146101a857806370a082311461020d578063a457c2d714610264578063a9059cbb146102c9578063dd62ed3e1461032e575b600080fd5b34801561009f57600080fd5b506100de600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506103a5565b604051808215151515815260200191505060405180910390f35b34801561010457600080fd5b5061010d6103bc565b6040518082815260200191505060405180910390f35b34801561012f57600080fd5b5061018e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506103c6565b604051808215151515815260200191505060405180910390f35b3480156101b457600080fd5b506101f3600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610477565b604051808215151515815260200191505060405180910390f35b34801561021957600080fd5b5061024e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061051c565b6040518082815260200191505060405180910390f35b34801561027057600080fd5b506102af600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610564565b604051808215151515815260200191505060405180910390f35b3480156102d557600080fd5b50610314600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610609565b604051808215151515815260200191505060405180910390f35b34801561033a57600080fd5b5061038f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610620565b6040518082815260200191505060405180910390f35b60006103b23384846106a7565b6001905092915050565b6000600254905090565b60006103d3848484610928565b61046c843361046785600160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610c4e90919063ffffffff16565b6106a7565b600190509392505050565b6000610512338461050d85600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610cd890919063ffffffff16565b6106a7565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60006105ff33846105fa85600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610c4e90919063ffffffff16565b6106a7565b6001905092915050565b6000610616338484610928565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610772576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001807f45524332303a20617070726f76652066726f6d20746865207a65726f2061646481526020017f726573730000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561083d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001807f45524332303a20617070726f766520746f20746865207a65726f20616464726581526020017f737300000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156109f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001807f45524332303a207472616e736665722066726f6d20746865207a65726f20616481526020017f647265737300000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515610abe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f45524332303a207472616e7366657220746f20746865207a65726f206164647281526020017f657373000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b610b0f816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610c4e90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610ba2816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610cd890919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b600080838311151515610cc9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525060200191505060405180910390fd5b82840390508091505092915050565b6000808284019050838110151515610d58576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b80915050929150505600a165627a7a723058209db49b546872ac269ed6ee5bd01a2644ad7a12d7abf648300c0afd08ef5a483d0029';

const options = {
    fee: { // optional, default fee asset: 1.3.0, amount: will be calculated
        asset_id: '1.3.0'
    },
    registrar: '1.2.1334',
    value: { asset_id: '1.3.0', amount: 0 }, // transfer asset to contract
    code: bytecode,
    eth_accuracy: false,
};

const result = await echo
    .createTransaction()
    .addOperation(constants.OPERATIONS_IDS.CREATE_CONTRACT, options)
    .addSigner(privateKey)
    .broadcast();

console.log(result);
```

`result` variable will have the following value:

```json
[
  {
    "id": "a8354a7d57505a5197bf12a18c7c057c08305919",
    "block_num": 661562,
    "trx_num": 0,
    "trx": {
      "ref_block_num": 6200,
      "ref_block_prefix": 1131830036,
      "expiration": "2019-07-23T22:50:51",
      "operations": [
        [
          40,
          {
            "fee": {
              "amount": 1116,
              "asset_id": "1.3.0"
            },
            "registrar": "1.2.1334",
            "value": {
              "amount": 0,
              "asset_id": "1.3.0"
            },
            "code": "608060405261<...>d08ef5a483d0029",
            "eth_accuracy": false,
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [
        "1bcd1d<...>f16a0f"
      ],
      "signed_with_echorand_key": false,
      "operation_results": [
        [
          1,
          "1.15.726"
        ]
      ]
    }
  }
]

```

ID `1.15.721` in `operation_results` array defines the operation execution result ID. An object with said ID stores the information about the deployed contract.
`api.getObject(objectId)` method can be used to get said object.

```javascript
const object = await echo.api.getObject('1.15.726');
console.log(object);
```

```json
{
  "id": "1.15.726",
  "type": "evm",
  "contracts_id": [
    "1.14.352"
  ],
  "extensions": []
}
```

The first element of the `contracts_id` array is the contract ID. Contract ID is used to call it.

## Call contract

There are two types of contract calls - a call without changing the contract's state (to receive values of variables and methods) and a call that would change the contract's state (sending a transaction).

## Get ERC20 Token Balance

Fetching an account's balance in token doesn't require a transaction, hence the `callContractNoChangingState(contractId, accountId, assetId, bytecode)` method is used:

```javascript
const balance = await echo.api.callContractNoChangingState('1.14.352', '1.2.1334', '1.3.0', '70a082310000000000000000000000000000000000000000000000000000000000000536');
console.log(parseInt(balance, 16)); // 10000
```

The last argument in the method is the hash of the contract's called method and the argument joined with the arguments that were passed along with the call. 
In this case `70a08231` is the hash of `balanceOf(address)` method, and `0000000000000000000000000000000000000000000000000000000000000536` is the "address" (derived from account ID), the balance of which we need are trying to get (zeroes are added to increase the size of the address to 32 bytes). 
This address belongs to Echo account `1.2.1334`. More information on converting the IDs to address formats can be found in [EVM. Introduction](developers/evm/introduction.md) .

## Transfer ERC20 Token

Token transfer is an operation that requires a transaction.

```javascript
const contractId = '1.14.352';
const accountSender = '1.2.1334';
const method = 'a9059cbb';
const methodParameters = '00000000000000000000000000000000000000000000000000000000000005370000000000000000000000000000000000000000000000000000000000000010';

const options = {
    fee: { // optional, default fee asset: 1.3.0, amount: will be calculated
        asset_id: '1.3.0'
    },
    registrar: accountSender,
    value: { // if method mark as payable you can transfer asset, if not set amount to 0
        asset_id: '1.3.0',
        amount: 0,
    },
    code: method + methodParameters,
    callee: contractId,
};

const result = await echo
    .createTransaction()
    .addOperation(constants.OPERATIONS_IDS.CALL_CONTRACT, options)
    .addSigner(privateKey)
    .broadcast();

console.log(result);
```

When this method is executed, a transaction will be sent to Echo network. `result` variable will have the following value:

```json
[
  {
    "id": "d4c8ff190f74add76696e344a6db0f5e9f561272",
    "block_num": 661760,
    "trx_num": 0,
    "trx": {
      "ref_block_num": 6398,
      "ref_block_prefix": 4048465865,
      "expiration": "2019-07-23T23:00:53",
      "operations": [
        [
          41,
          {
            "fee": {
              "amount": 151,
              "asset_id": "1.3.0"
            },
            "registrar": "1.2.1334",
            "value": {
              "amount": 0,
              "asset_id": "1.3.0"
            },
            "code": "a9059cbb00000000000000000000000000000000000000000000000000000000000005370000000000000000000000000000000000000000000000000000000000000010",
            "callee": "1.14.352",
            "extensions": []
          }
        ]
      ],
      "extensions": [],
      "signatures": [
        "911ca1ed144a68948a3d47fb5d00bc667c70373b69c4a77776af2b12daf7ad33a4bea7d65b397fc2a4ef9da600d2cb873cba2550c56cf9ff598234108875350f"
      ],
      "signed_with_echorand_key": false,
      "operation_results": [
        [
          1,
          "1.15.727"
        ]
      ]
    }
  }
]
```

As a result of the transfer, the contract calls an `event Transfer(address indexed from, address indexed to, uint256 value);` event. The logs can be viewed via `getContractResult` method, and adding operation execution result ID to argument:

```javascript
const result = await echo.api.getContractResult('1.15.727');
console.log(result);
```

```json
[
  0,
  {
    "exec_res": {
      "excepted": "None",
      "new_address": "0000000000000000000000000000000000000000",
      "output": "0000000000000000000000000000000000000000000000000000000000000001",
      "code_deposit": "None",
      "gas_refunded": 0,
      "gas_for_deposit": 0,
      "deposit_size": 0
    },
    "tr_receipt": {
      "status_code": 1,
      "gas_used": 50133,
      "bloom": "00000000000000002000000000000000800040000000010000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000008000000000004000000000000000000000000000000000000000000000000000000000000000000040000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000002000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "log": [
        {
          "address": "0100000000000000000000000000000000000160",
          "log": [
            "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0000000000000000000000000000000000000000000000000000000000000536",
            "0000000000000000000000000000000000000000000000000000000000000537"
          ],
          "data": "0000000000000000000000000000000000000000000000000000000000000010"
        }
      ]
    }
  }
]

```

This contract call changes an account's token balance. The change in balance can be checked via `balanceOf` method:

```javascript
const balance = await echo.api.callContractNoChangingState('1.14.352', '1.2.1334', '1.3.0', '70a082310000000000000000000000000000000000000000000000000000000000000536');
console.log(parseInt(balance, 16)); // 9984
```
