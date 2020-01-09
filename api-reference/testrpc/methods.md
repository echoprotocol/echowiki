# Echo TestRPC API

TestRPC API is the extension of [Ethereum JSON RPC API](../json-rpc/methods.md) which relies on new features of simplified block generator and integrated test wallet.

### eth_mining
Returns `true` if client is generating new blocks, otherwise `false`. 

##### Example
```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### miner_start
Start the block generation process.

##### Example
```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"miner_start","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### miner_stop
Stop the block generation process.

##### Example
```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"miner_stop","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### personal_newAccount
Generates a new private key and create new account with it.  

| Option | Description |
| :--- | :--- |
| `string passphrase` | Passphrase which is used to unlock account |
| Returns | The address of the new account |

##### Example
```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["swordfish"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x000000000000000000000000000000000000001a"
}
```

### personal_listAccounts
Returns all account addresses of all keys in the integrated test wallet.

### personal_lockAccounts
Locks the account's private key so, it can no longer be used to send transactions.

### personal_unlockAccounts
Decrypts the key with the given address from the integrated test wallet.  
The account can be used with eth_sign and eth_sendTransaction while it is unlocked.

### eth_sign
The sign method calculates an Ethereum specific signature with: sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))).

**Note** the address to sign with must be unlocked.

| Option | Description |
| :--- | :--- |
| `string address` | Account address |
| `string message` | Message to sign |
| Returns | Hex-encoded signature |

##### Example
```json
curl -X POST --data '{"id":1,"jsonrpc":"2.0","method":"eth_sign","params":["0x000000000000000000000000000000000000001a","0xdeadbeaf"]}'

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction
Creates new message call transaction or a contract creation, if the data field contains code.  
Returns hex-encoded transaction id.

Parameters object options:
| Option | Description |
| :--- | :--- |
| `string from` | Address of the account the transaction is send from |
| `string to` |  (optional when creating new contract) Address of the account or contract the transaction is directed to. |
| `string gas` | (optional, default: estimated) Integer of the **fee** provided for the transaction execution. |
| `string value` | (optional) Integer of the value sent with this transaction |
| `string data` | The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. |

Example parameters:
```json
params: [{
  "from": "0x000000000000000000000000000000000000001a",
  "to": "0100000000000000000000000000000000000005",
  "gas": "0x76c0", // 30400
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]
```

##### Example
```json
// Request
curl -X POST --data '{"id":1,"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}]}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0000000000000000000000004ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### personal_sendTransaction
Validate the given passphrase and submit transaction.

The transaction is the same argument as for `eth_sendTransaction` and contains the `from` address. If the passphrase can be used to decrypt the private key belogging to `tx.from` the transaction is verified, signed and send onto the network. The account is not unlocked globally in the node and cannot be used in other RPC calls.