# Echo JSON RPC protocol

## The default block parameter

The following methods have an extra default block parameter:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

The defaultBlock parameter is string and left only for backward compatibility. Doing nothing. Result are always returned for `latest` state.

## Echo to Eth block conversion

  - `number`: `QUANTITY` - the block number. Field `round` from Echo block
  - `hash`: `DATA`, 32 Bytes - zero-prefixed Echo block id. See [block hash](#block-hash-format)
  - `parentHash`: `DATA`, 32 Bytes - zero-prefixed block id of previous block. `previous` field from Echo block.  See [block hash](#block-hash-format)
  - `nonce`: `DATA`, 8 Bytes - always zero. No POW in Echo.
  - `sha3Uncles`: `DATA`, 32 Bytes - zero. No uncle blocks in Echo.
  - `logsBloom`: `DATA`, 256 Bytes - zero. No such info related to the block
  - `transactionsRoot`: `DATA`, 32 Bytes - zero-prefixed `transaction_merkle_root`.
  - `stateRoot`: `DATA`, 32 Bytes - EVM root. Should be taken from vm_root of Echo block.
  - `receiptsRoot`: `DATA`, 32 Bytes - zero
  - `miner`: `DATA`, 20 Bytes - account field from Echo block.
  - `difficulty`: `QUANTITY` - zero. No POW in Echo.
  - `totalDifficulty`: `QUANTITY` - zero. No POW in Echo.
  - `extraData`: `DATA` - zero.
  - `size`: `QUANTITY` - integer the size of this block in bytes.
  - `gasLimit`: `QUANTITY` - the maximum gas allowed in this block.
  - `gasUsed`: `QUANTITY` - the total used gas by all transactions in this block. // fees collected?
  - `timestamp`: `QUANTITY` - the unix timestamp of the block
  - `transactions`: `Array` - Array of [transaction object](#echo-to-eth-transaction-conversion), or 32 Bytes [transaction hashes](#transaction-hash-format) depending on the last given parameter.
  - `uncles`: `Array` - Empty array. No uncle blocks in Echo.

### Example

Echo block:
```json
{
    "previous": "00000bb70ca6b57b1a868a06ad0882694d70c41f",
    "round": 3000,
    "attempt": 0,
    "timestamp": "2019-12-16T17:10:53",
    "account": "1.2.102",
    "delegate": "1.2.9",
    "transaction_merkle_root": "eef2bb6be5f9a1051292d6de48e7094a7a20dd41",
    "vm_root": [
        "3934f73bb11156767ecfd1c66c7f1f4ea3f44dae15388171d0484826777585ea2fe64d0e13b566a9de2c8e87934fa2319e7c1b6296dbeb854dbcfde1a1debe0e",
        "0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68"
    ],
    "prev_signatures": [ ... ],
    "extensions": [],
    "ed_signature": "a30d6b62d6c83b49ea4185341b9a9c2573593d48613a6358b3e3b938099018a2225369466e52c71caa4425453db5f59d7a7ee13ffc9024aba8f961afb9fd2207",
    "rand": "08aeb609ec58b4b59ce4e9f13c59f74825979115f06d89a3965dc478ec564502",
    "cert":[ ... ],
    "transactions": [ {...} ]
}
```

Converts to next Ethereum block: 

```json
{
    "number": "0xbb8", // 3000
    "hash": "0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18",
    "parentHash": "0x00000000000000000000000000000bb70ca6b57b1a868a06ad0882694d70c41f",
    "nonce": "0x00",
    "sha3Uncles": "0x00",
    "logsBloom": "0x00",
    "transactionsRoot": "0x000000000000000000000000eef2bb6be5f9a1051292d6de48e7094a7a20dd41",
    "stateRoot": "0x3934f73bb11156767ecfd1c66c7f1f4ea3f44dae15388171d0484826777585ea",
    "miner": "0x0000000000000000000000000000000000000066",
    "difficulty": "0x00",
    "totalDifficulty":  "0x00",
    "extraData": "0x00",
    "size":  "0x0812", // 2066 bytes
    "gasLimit": "0x9f759", // 653145
    "gasUsed": "0x9f759", // 653145
    "timestamp": "0x5df7ba9d", // 1576516253
    "transactions": [{...}],
    "uncles": []
}
```

## Echo to Eth transaction conversion

  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in. `null` when its pending.
  - `blockNumber`: `QUANTITY` - block number where this transaction was in. `null` when its pending.
  - `from`: `DATA`, 20 Bytes - address of the sender. Sender is fee_payer of transaction
  - `gas`: `QUANTITY` - fee amount from operation
  - `gasPrice`: `QUANTITY` - User didn't specifies gasPrice. So set to `1`.
  - `hash`: `DATA`, 32 Bytes - hash of the transaction, see [transaction hashes](#transaction-hash-format).
  - `input`: `DATA` - the data send along with the transaction.
  - `nonce`: `QUANTITY` - zero. No such info in Echo blockchain.
  - `to`: `DATA`, 20 Bytes - address of the receiver. `null` when its a contract creation transaction.
  - `transactionIndex`: `QUANTITY` - integer of the transaction's index position in the block. `null` when its pending.
  - `value`: `QUANTITY` - value transferred in Wei.
  - `v`: `QUANTITY` - empty
  - `r`: `QUANTITY` - empty
  - `s`: `QUANTITY` - empty

### Example

Echo transaction :
```json
{
    "ref_block_num": 2998,
    "ref_block_prefix": 3266335494,
    "expiration": "2019-12-16T17:15:41",
    "operations": [[
        0,{
        "fee": {
            "amount": 20,
            "asset_id": "1.3.0"
        },
        "from": "1.2.24",
        "to": "1.2.596",
        "amount": {
            "amount": "5000000000",
            "asset_id": "1.3.0"
        },
        "extensions": []
        }
    ]
    ],
    "extensions": [],
    "signatures": [
    "bc871cfb9e5875ceccc9a6c5aa8b7bf7533cdc024366d6e5d9cccf9357cb4590569166eb70d9e01fbfab27fb1cf1278f8e9507e314fe4552a3f37e58ac2ff101"
    ],
    "signed_with_echorand_key": false,
    "operation_results": [[
        0,{}
    ]
    ],
    "fees_collected": 20
}
```

Converts to next Ethereum transaction: 

```json
{
    "blockHash":"0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18",
    "blockNumber":"0xbb8", // 3000
    "from":"0x0000000000000000000000000000000000000018",
    "gas":"0x14", // 20
    "gasPrice":"0x01", // 1
    "hash":"0x0000000000000bb800000000f975cb125cd12efc9bc783e5a444435e0337f494",
    "input":"",
    "nonce":"0x00",
    "to":"0x0000000000000000000000000000000000000254",
    "transactionIndex":"0x00",
    "value":"0xf3dbb76162000", // 5000000000
    "v":"0x00",
    "r":"0x00",
    "s":"0x00"
  }
```

## Block hash format

Field `blockHash` is converted from Echo `block_id` just by appending `0x` prefix with 12 zero bytes.

### Example

Echo `block_id = 00000baf371addf365df0d9df9333c0af8a5e9a1` converts to

```
0x00000000000000000000000000000baf371addf365df0d9df9333c0af8a5e9a1
``` 

## Transaction hash format

Transaction hash consists of 2 parts:
1. Applied operation data, that consists of Block number and index of operation in block.
2. Ripemd160 hash of serialized operation with appended expiration_time from transaction. Helps to identify operation from pending.

And looks like:

``` 
"0x"[4bytes zero][4bytes blocknum][4bytes opnum][20bytes ophash] 
```

ophash is `ripemd160(serialize(op) + serialize(trx.expiration))`

### Example

#### Pending operation

Not included to block, so has empty `applied operation data` and has only `ophash`:

> 0x00000000000000000000000034b8cbaf371addf365df0d9df9333c0af8a5e9a1

#### Processed operation 

Operation with index `1` from block `2467` with hash `34b8cbaf371addf365df0d9df9333c0af8a5e9a1`.

> 0x00000000000009a30000000134b8cbaf371addf365df0d9df9333c0af8a5e9a1

## JSON-RPC methods

### Implemented

* [web3_clientVersion](#web3_clientversion)
* [web3_sha3](#web3_sha3)
* [net_version](#net_version)
* [net_peerCount](#net_peercount)
* [net_listening](#net_listening)
* [eth_protocolVersion](#eth_protocolversion)
* [eth_syncing](#eth_syncing)
* [eth_coinbase](#eth_coinbase)
* [eth_mining](#eth_mining)
* [eth_gasPrice](#eth_gasprice)
* [eth_blockNumber](#eth_blocknumber)
* [eth_getBalance](#eth_getbalance)
* [eth_getStorageAt](#eth_getstorageat)
* [eth_getTransactionCount](#eth_gettransactioncount)
* [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
* [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
* [eth_getCode](#eth_getcode)
* [eth_sendRawTransaction](#eth_sendrawtransaction)
* [eth_call](#eth_call)
* [eth_estimateGas](#eth_estimategas) 
* [eth_getBlockByHash](#eth_getblockbyhash)
* [eth_getBlockByNumber](#eth_getblockbynumber)
* [eth_getTransactionByHash](#eth_gettransactionbyhash)
* [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
* [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
* [eth_getTransactionReceipt](#eth_gettransactionreceipt)
* [eth_pendingTransactions](#eth_pendingtransactions)
* [eth_newFilter](#eth_newfilter)
* [eth_newBlockFilter](#eth_newblockfilter)
* [eth_newPendingTransactionFilter](#eth_newpendingtransactionfilter)
* [eth_uninstallFilter](#eth_uninstallfilter)
* [eth_getFilterChanges](#eth_getfilterchanges)
* [eth_getFilterLogs](#eth_getfilterlogs)
* [eth_getLogs](#eth_getlogs)

### Not implemented

* [eth_accounts](#eth_accounts)
* [eth_sign](#eth_sign)
* [eth_sendTransaction](#eth_sendtransaction)
* [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
* [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
* [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
* [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)
* [eth_hashrate](#eth_hashrate)
* [eth_getWork](#eth_getwork)
* [eth_submitWork](#eth_submitwork)
* [eth_submitHashrate](#eth_submithashrate)
* [eth_getProof](#eth_getproof)
* [eth_getCompilers](#eth_getcompilers)
* [eth_compileLLL](#eth_compilelll)
* [eth_compileSolidity](#eth_compilesolidity)
* [eth_compileSerpent](#eth_compileserpent)
* [db_putString](#db_putstring)
* [db_getString](#db_getstring)
* [db_putHex](#db_puthex)
* [db_getHex](#db_gethex)
* [shh_post](#shh_post)
* [shh_version](#shh_version)
* [shh_newIdentity](#shh_newidentity)
* [shh_hasIdentity](#shh_hasidentity)
* [shh_newGroup](#shh_newgroup)
* [shh_addToGroup](#shh_addtogroup)
* [shh_newFilter](#shh_newfilter)
* [shh_uninstallFilter](#shh_uninstallfilter)
* [shh_getFilterChanges](#shh_getfilterchanges)
* [shh_getMessages](#shh_getmessages)


## JSON RPC API Reference

***

### web3_clientVersion

Returns the current client version.

##### Parameters
none

##### Returns

`String` - The current client version. Consists of `blockchain_name`, `client_version` and os with bitness.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "ECHO/0.13.6/osx.64-bit"
}
```

***

#### web3_sha3

Returns Keccak-256 (*not* the standardized SHA3-256) of the given data.

##### Parameters

1. `DATA` - the data to convert into a SHA3 hash.

##### Example Parameters
```js
params: [
  "0x68656c6c6f20776f726c64"
]
```

##### Returns

`DATA` - The SHA3 result of the given string.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'

// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

***

### net_version

Returns the current network id.

##### Parameters
none

##### Returns

`String` - The current network id.
- `"1"`: Echo Mainnet
- `"2"`: Echo Testnet
- `"3"`: Echo Devnet

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

***

### net_listening

Returns `true` if client is actively listening for network connections.

##### Parameters
none

##### Returns

`Boolean` - `true` when listening, otherwise `false`.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

***

### net_peerCount

Returns number of peers currently connected using `node::get_connection_count()`.

##### Parameters
none

##### Returns

`QUANTITY` - integer of the number of connected peers.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'

// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

***

### eth_protocolVersion

Returns the current ethereum protocol version used in EVM integrated into Echo.

##### Parameters
none

##### Returns

`String` - The current ethereum protocol version.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x54"
}
```

***

### eth_syncing

Returns an object with data about the sync status or `false`.

##### Parameters
none

##### Returns

`Object|Boolean`, An object with sync status data or `FALSE`, when not syncing:
  - `startingBlock`: `QUANTITY` - The block at which sync was started (will only be reset, after the sync reached his head)
  - `currentBlock`: `QUANTITY` - The current block, same as eth_blockNumber
  - `highestBlock`: `QUANTITY` - The estimated highest block

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

***

### eth_coinbase

Returns the client coinbase address. Is first account from echorand config(account_info).

##### Parameters
none

##### Returns

`DATA`, 20 bytes - the current coinbase address.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'

// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x000000000000000000000000000000000000000a" // 1.2.10
}
```

***

### eth_mining

Returns `true` if client has any imported account to participate in consensus.

##### Parameters
none

##### Returns

`Boolean` - `true` if client has any imported account to participate in consensus, otherwise `false`.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'

// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}

```

***

### eth_gasPrice

Echo has a different approach to working with gas. So this method will return 1 always.

##### Parameters
none

##### Returns

`QUANTITY` - integer of the current gas price in wei.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'

// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

***

### eth_blockNumber

Returns the number of most recent block.

##### Parameters
none

##### Returns

`QUANTITY` - integer of the current block number the client is on.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0xc94" // 1207
}
```

***

### eth_getBalance

Returns the balance of the account of given address.

##### Parameters

1. `DATA`, 20 Bytes - address to check for balance.
2. `TAG` - string, see the [default block parameter](#the-default-block-parameter)

##### Example Parameters
```js
params: [
   '0x000000000000000000000000000000000000000a',
   'latest'
]
```

##### Returns

`QUANTITY` - integer of the current balance.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x000000000000000000000000000000000000000a", "latest"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5F5E100" // 100000000 (1 ECHO)
}
```

***

### eth_getStorageAt

Returns the value from a storage position at a given address. 

##### Parameters

1. `DATA`, 20 Bytes - address of the storage.
2. `QUANTITY` - integer of the position in the storage.
3. `TAG` - string, see the [default block parameter](#the-default-block-parameter)

##### Returns

`DATA` - the value at this storage position.

##### Example
Calculating the correct position depends on the storage to retrieve. Consider the following contract deployed at `0x0100000000000000000000000000000000000001` by address `0x000000000000000000000000000000000000000a`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    
    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Retrieving the value of pos0 is straight forward:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x0100000000000000000000000000000000000001", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"} // 1234
```

Retrieving an element of the map is harder. The position of an element in the map is calculated with:
```js
keccack(LeftPad32(key, 0), LeftPad32(map position, 0))
```

This means to retrieve the storage on pos1["0x000000000000000000000000000000000000000a"] we need to calculate the position with:
```js
keccak(decodeHex("000000000000000000000000000000000000000000000000000000000000000a" + "0000000000000000000000000000000000000000000000000000000000000001"))
```
The geth console which comes with the web3 library can be used to make the calculation:
```js
> var key = "000000000000000000000000000000000000000000000000000000000000000a" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```
Now to fetch the storage:
```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x0100000000000000000000000000000000000001", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"} //5678

```

***

### eth_getTransactionCount

Returns the number of transactions *sent* from an address.


##### Parameters

1. `DATA`, 20 Bytes - address.
2. `TAG` - string, see the [default block parameter](#the-default-block-parameter)

##### Example Parameters
```js
params: [
   '0x000000000000000000000000000000000000000a',
   'latest'
]
```

##### Returns

`QUANTITY` - integer of the number of transactions send from this address.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x000000000000000000000000000000000000000a","latest"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

***

### eth_getBlockTransactionCountByHash

Returns the number of operations in a block from a block matching the given block id(hash).

##### Parameters

1. `DATA`, 32 Bytes - zero-prefixed Echo block id. See []

##### Example Parameters
```js
params: [
   '0x00000000000000000000000000000baf371addf365df0d9df9333c0af8a5e9a1'
]
```

##### Returns

`QUANTITY` - integer of the number of transactions in this block.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x00000000000000000000000000000baf371addf365df0d9df9333c0af8a5e9a1"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xc" // 11
}
```

***

### eth_getBlockTransactionCountByNumber

Returns the number of operations in a block matching the given block number.

##### Parameters

1. `QUANTITY|TAG` - integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](#the-default-block-parameter). If specified as `pending` - ops count in pending transations will be returned.

##### Example Parameters
```js
params: [
   '0xe8', // 232
]
```

##### Returns

`QUANTITY` - integer of the number of transactions in this block.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa" // 10
}
```

***

### eth_getCode

Returns code at a given address.

##### Parameters

1. `DATA`, 20 Bytes - address.
2. `QUANTITY|TAG` - string, see the [default block parameter](#the-default-block-parameter).

##### Example Parameters
```js
params: [
   '0x0100000000000000000000000000000000000001',
   '0x2'  // 2
]
```

##### Returns

`DATA` - the code from the given address. Always empty string if account address is passed.


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0x0100000000000000000000000000000000000001", "0x2"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```

*** 

### eth_sendRawTransaction

Creates new message call transaction or a contract creation for signed transactions.

##### Parameters

1. `DATA`, Binary signed Echo transaction data.

##### Example Parameters
```js
params: ["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"]
```

##### Returns

`DATA`, 32 Bytes - the transaction hash, see [transaction hash](#transaction-hash-format).

Use [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

***

### eth_call

Executes a new message call immediately without creating a transaction on the block chain.

##### Parameters

1. `Object` - The transaction call object
  - `from`: `DATA`, 20 Bytes - (optional) The address the transaction is sent from.
  - `to`: `DATA`, 20 Bytes  - The address the transaction is directed to.
  - `value`: `QUANTITY`  - (optional) Integer of the value sent with this transaction
  - `data`: `DATA`  - (optional) Hash of the method signature and encoded parameters. For details see [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)
2. `TAG` - string, see the [default block parameter](#the-default-block-parameter)

##### Returns

`DATA` - the return value of executed contract.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

***

### eth_estimateGas

Generates and returns an estimate of how much fee is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics.

##### Parameters

See [eth_call](#eth_call) parameters, expect that all properties are optional. As a result the returned estimate might not be enough to executed the call/transaction when the amount of gas is higher than the pending block gas limit.

##### Returns

`QUANTITY` - fee amount that 

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

***

### eth_getBlockByHash

Returns information about a block by hash. See how it converts from Echo block: [block conversion](#echo-to-eth-block-conversion)

##### Parameters

1. `DATA`, 32 Bytes - zero prefixed block id.
2. `Boolean` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

##### Example Parameters
```js
params: [
   '0x00000000000000000000000000000baf371addf365df0d9df9333c0af8a5e9a1',
   true
]
```

##### Returns

`Object` - A block object, or `null` when no block was found.

See [block conversion](#echo-to-eth-block-conversion)

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18", true],"id":1}'

// Result
{
"id":1,
"jsonrpc":"2.0",
"result": {
    "number": "0xbb8", // 3000
    "hash": "0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18",
    "parentHash": "0x00000000000000000000000000000bb70ca6b57b1a868a06ad0882694d70c41f",
    "nonce": "0x00",
    "sha3Uncles": "0x00",
    "logsBloom": "",
    "transactionsRoot": "0x000000000000000000000000eef2bb6be5f9a1051292d6de48e7094a7a20dd41",
    "stateRoot": "0x3934f73bb11156767ecfd1c66c7f1f4ea3f44dae15388171d0484826777585ea",
    "miner": "0x0000000000000000000000000000000000000066",
    "difficulty": "0x00",
    "totalDifficulty":  "0x00",
    "extraData": "0x00",
    "size":  "0x0812", // 2066 bytes
    "gasLimit": "0x9f759", // 653145
    "gasUsed": "0x9f759", // 653145
    "timestamp": "0x5df7ba9d", // 1576516253
    "transactions": [{...}],
    "uncles": []
}
```

***

### eth_getBlockByNumber

Returns information about a block by block number. See how it converts from Echo block: [block conversion](#echo-to-eth-block-conversion)

##### Parameters

1. `QUANTITY|TAG` - integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`. `pending` will return latest one.
2. `Boolean` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

##### Example Parameters
```js
params: [
   '0xbb8', // 3000
   true
]
```

##### Returns

See [block conversion](#echo-to-eth-block-conversion)

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0xbb8", true],"id":1}'

// Result
{
"id":1,
"jsonrpc":"2.0",
"result": {
    "number": "0xbb8", // 3000
    "hash": "0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18",
    "parentHash": "0x00000000000000000000000000000bb70ca6b57b1a868a06ad0882694d70c41f",
    "nonce": "0x00",
    "sha3Uncles": "0x00",
    "logsBloom": "",
    "transactionsRoot": "0x000000000000000000000000eef2bb6be5f9a1051292d6de48e7094a7a20dd41",
    "stateRoot": "0x3934f73bb11156767ecfd1c66c7f1f4ea3f44dae15388171d0484826777585ea",
    "miner": "0x0000000000000000000000000000000000000066",
    "difficulty": "0x00",
    "totalDifficulty":  "0x00",
    "extraData": "0x00",
    "size":  "0x0812", // 2066 bytes
    "gasLimit": "0x9f759", // 653145
    "gasUsed": "0x9f759", // 653145
    "timestamp": "0x5df7ba9d", // 1576516253
    "transactions": [{...}],
    "uncles": []
}
```

***

### eth_getTransactionByHash

Returns the information about a transaction requested by transaction hash.

##### Parameters

1. `DATA`, 32 Bytes - hash of a transaction

##### Example Parameters
```js
params: [
   "0x0000000000000bb800000000f975cb125cd12efc9bc783e5a444435e0337f494"
]
```

##### Returns

`Object` - A transaction object, or `null` when no transaction was found. See [transaction conversion](#echo-to-eth-transaction-conversion).

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x0000000000000bb800000000f975cb125cd12efc9bc783e5a444435e0337f494"],"id":1}'

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18",
    "blockNumber":"0xbb8", // 3000
    "from":"0x0000000000000000000000000000000000000018",
    "gas":"0x14", // 20
    "gasPrice":"0x01", // 1
    "hash":"0x0000000000000bb800000000f975cb125cd12efc9bc783e5a444435e0337f494",
    "input":"",
    "nonce":"0x00",
    "to":"0x0000000000000000000000000000000000000254",
    "transactionIndex":"0x00",
    "value":"0xf3dbb76162000", // 5000000000
    "v":"0x00",
    "r":"0x00",
    "s":"0x00"
  }
}
```

***

### eth_getTransactionByBlockHashAndIndex

Returns information about a transaction by block hash and transaction index position.


##### Parameters

1. `DATA`, 32 Bytes - hash of a block.
2. `QUANTITY` - integer of the transaction index position.

##### Example Parameters
```js
params: [
   '0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18',
   '0x0' // 0
]
```

##### Returns

`Object` - A transaction object, or `null` when no transaction was found. See [transaction conversion](#echo-to-eth-transaction-conversion).

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18", "0x0"],"id":1}'

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18",
    "blockNumber":"0xbb8", // 3000
    "from":"0x0000000000000000000000000000000000000018",
    "gas":"0x14", // 20
    "gasPrice":"0x01", // 1
    "hash":"0x0000000000000bb800000000f975cb125cd12efc9bc783e5a444435e0337f494",
    "input":"",
    "nonce":"0x00",
    "to":"0x0000000000000000000000000000000000000254",
    "transactionIndex":"0x00",
    "value":"0xf3dbb76162000", // 5000000000
    "v":"0x00",
    "r":"0x00",
    "s":"0x00"
  }
}
```

***

### eth_getTransactionByBlockNumberAndIndex

Returns information about a transaction by block number and transaction index position.

##### Parameters

1. `QUANTITY|TAG` - integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`. `pending` will return latest one.
2. `QUANTITY` - the transaction index position.

##### Example Parameters
```js
params: [
   '0xbb8', // 3000
   '0x0' // 0
]
```

##### Returns

`Object` - A transaction object, or `null` when no transaction was found. See [transaction conversion](#echo-to-eth-transaction-conversion).

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0xbb8", "0x0"],"id":1}'

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18",
    "blockNumber":"0xbb8", // 3000
    "from":"0x0000000000000000000000000000000000000018",
    "gas":"0x14", // 20
    "gasPrice":"0x01", // 1
    "hash":"0x0000000000000bb800000000f975cb125cd12efc9bc783e5a444435e0337f494",
    "input":"",
    "nonce":"0x00",
    "to":"0x0000000000000000000000000000000000000254",
    "transactionIndex":"0x00",
    "value":"0xf3dbb76162000", // 5000000000
    "v":"0x00",
    "r":"0x00",
    "s":"0x00"
  }
}
```

***

### eth_getTransactionReceipt

Returns the receipt of a transaction by transaction hash.

**Note** That the receipt is not available for pending transactions.


##### Parameters

1. `DATA`, 32 Bytes - hash of a transaction

##### Example Parameters
```js
params: [
   '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238'
]
```

##### Returns

`Object` - A transaction receipt object, or `null` when no receipt was found:

  - `transactionHash `: `DATA`, 32 Bytes - hash of the transaction.
  - `transactionIndex`: `QUANTITY` - integer of the transaction's index position in the block.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in.
  - `blockNumber`: `QUANTITY` - block number where this transaction was in.
  - `from`: `DATA`, 20 Bytes - address of the sender.
  - `to`: `DATA`, 20 Bytes - address of the receiver. null when it's a contract creation transaction.
  - `cumulativeGasUsed `: `QUANTITY ` - The total amount of gas used when this transaction was executed in the block.
  - `gasUsed `: `QUANTITY ` - The amount of gas used by this specific transaction alone.
  - `contractAddress `: `DATA`, 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise `null`.
  - `logs`: `Array` - Array of log objects, which this transaction generated.
  - `logsBloom`: `DATA`, 256 Bytes - Bloom filter for light clients to quickly retrieve related logs.
  
It also returns _either_ :

  - `root` : `DATA` 32 bytes of post-transaction state root (pre Byzantium)
  - `status`: `QUANTITY` either `1` (success) or `0` (failure) 


##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'

// Result
{
"id":1,
"jsonrpc":"2.0",
"result": {
     transactionHash: '0x0000000000000bb800000000f975cb125cd12efc9bc783e5a444435e0337f494',
     transactionIndex:  '0x00', // 0
     blockNumber: '0xbb8', // 3000
     blockHash: '0x00000000000000000000000000000bb8ad06b5654a7d5b2537df4c7c5ae29c18',
     cumulativeGasUsed: '0x33bc', // 13244
     gasUsed: '0x4dc', // 1244
     contractAddress: '0xb60e8dd61c5d32be8058bb8eb970870f07233155', // or null, if none was created
     logs: [{
         // logs as returned by getFilterLogs, etc.
     }, ...],
     logsBloom: "0x00...0", // 256 byte bloom filter
     status: '0x1'
  }
}
```

***

### eth_pendingTransactions

Returns the pending transactions list.

##### Parameters
none

##### Returns

`Array` - A list of pending transactions.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_pendingTransactions","params":[],"id":1}'

// Result
{
"id":1,
"jsonrpc":"2.0",
"result": [{ 
    blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    blockNumber: null,
    from: '0x000000000000000000000000000000000000000a',
    gas: '0x204734',
    gasPrice: '0x4a817c800',
    hash: '0x000000000000000000000000f975cb125cd12efc9bc783e5a444435e0337f494',
    input: '0x6080604052600',
    nonce: '0x00',
    to: null,
    transactionIndex: '0x0',
    value: '0x0',
    v: '0x00',
    r: '0x00',
    s: '0x00' 
   },...]
}
```

***

### eth_newFilter

Creates a filter object, based on filter options, to notify when the state changes (logs).
To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

##### A note on specifying topic filters:
Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:
* `[]` "anything"
* `[A]` "A in first position (and anything after)"
* `[null, B]` "anything in first position AND B in second position (and anything after)"
* `[A, B]` "A in first position AND B in second position (and anything after)"
* `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"

##### Parameters

1. `Object` - The filter options:
  - `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  - `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  - `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
  - `topics`: `Array of DATA`,  - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.

##### Example Parameters
```js
params: [{
  "fromBlock": "0x1",
  "toBlock": "0x2",
  "address": "0x8888f1f195afa192cfee860698584c030f4c9db1",
  "topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]
}]
```

##### Returns

`QUANTITY` - A filter id.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x0000000000000000000000000000000000000000000000000000000012341234"]}],"id":73}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

***

### eth_newBlockFilter

Creates a filter in the node, to notify when a new block arrives. Works on top of `set_block_applied_callback`. 
To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

##### Parameters
None

##### Returns

`QUANTITY` - A filter id.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'

// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

***

### eth_newPendingTransactionFilter

Creates a filter in the node, to notify when new pending transactions arrive.
To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

##### Parameters
None

##### Returns

`QUANTITY` - A filter id.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'

// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

***

### eth_uninstallFilter

Uninstalls a filter with given id. Should always be called when watch is no longer needed.
Additonally Filters timeout when they aren't requested with [eth_getFilterChanges](#eth_getfilterchanges) for a period of time.

##### Parameters

1. `QUANTITY` - The filter id.

##### Example Parameters
```js
params: [
  "0xb" // 11
]
```

##### Returns

`Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

***

### eth_getFilterChanges

Polling method for a filter, which returns an array of logs which occurred since last poll.

##### Parameters

1. `QUANTITY` - the filter id.

##### Example Parameters
```js
params: [
  "0x16" // 22
]
```

##### Returns

`Array` - Array of log objects, or an empty array if nothing has changed since last poll.

- For filters created with `eth_newBlockFilter` the return are block hashes (`DATA`, 32 Bytes), e.g. `["0x3454645634534..."]`.
- For filters created with `eth_newPendingTransactionFilter ` the return are transaction hashes (`DATA`, 32 Bytes), e.g. `["0x6345343454645..."]`.
- For filters created with `eth_newFilter` logs are objects with following params:

  - `removed`: `TAG` - `true` when the log was removed, due to a chain reorganization. `false` if its a valid log.
  - `logIndex`: `QUANTITY` - integer of the log index position in the block.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from.
  - `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in.
  - `blockNumber`: `QUANTITY` - the block number where this log was in. 
  - `address`: `DATA`, 20 Bytes - address from which this log originated.
  - `data`: `DATA` - contains the non-indexed arguments of the log.
  - `topics`: `Array of DATA` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments. (In *solidity*: The first topic is the *hash* of the signature of the event (e.g. `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.)

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'

// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

***

### eth_getFilterLogs

Returns an array of all logs matching filter with given id.


##### Parameters

1. `QUANTITY` - The filter id.

##### Example Parameters
```js
params: [
  "0x16" // 22
]
```

##### Returns

See [eth_getFilterChanges](#eth_getfilterchanges)

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Result see [eth_getFilterChanges](#eth_getfilterchanges)

***

### eth_getLogs

Returns an array of all logs matching a given filter object.

##### Parameters

1. `Object` - The filter options:
  - `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  - `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  - `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
  - `topics`: `Array of DATA`,  - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.
  - `blockhash`:  `DATA`, 32 Bytes - (optional) With the addition of EIP-234 (Geth >= v1.8.13 or Parity >= v2.1.0), `blockHash` is a new filter option which restricts the logs returned to the single block with the 32-byte hash `blockHash`.  Using `blockHash` is equivalent to `fromBlock` = `toBlock` = the block number with hash `blockHash`.  If `blockHash` is present in the filter criteria, then neither `fromBlock` nor `toBlock` are allowed.

##### Example Parameters
```js
params: [{
  "topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]
}]
```

##### Returns

See [eth_getFilterChanges](#eth_getfilterchanges)

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Result see [eth_getFilterChanges](#eth_getfilterchanges)

***


### Wallet mode methods

Not implemented. No wallet mode support in Echo node for now. 

#### eth_accounts
#### eth_sign
#### eth_sendTransaction

### Uncle blocks 

Not implemented. Echo doesn't have uncle blocks.

#### eth_getUncleByBlockHashAndIndex
#### eth_getUncleByBlockNumberAndIndex
#### eth_getUncleCountByBlockHash
#### eth_getUncleCountByBlockNumber

### DEPRECATED

This methods was marked as deprecated in JSON RPC so not implemented in Echo.

### eth_hashrate
### eth_getWork
### eth_submitWork
### eth_submitHashrate
### eth_getProof
### eth_getCompilers
### eth_compileSolidity
### eth_compileLLL
### eth_compileSerpent
### db_putString
### db_getString
### db_putHex
### db_getHex
### shh_post
### shh_version
### shh_newIdentity
### shh_hasIdentity
### shh_newGroup
### shh_addToGroup
### shh_newFilter
### shh_uninstallFilter
### shh_getFilterChanges
### shh_getMessages