# Echo TestRPC API

### eth_mining
Returns `true` if client is actively mining new blocks, otherwise `false`.

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
Start the block mining process.

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
Stop the block mining process.

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
| `string name` | New account name |
| `string passphrase` | Passphrase which is used to unlock account |
| Returns | The address of the new account |

##### Example
```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"miner_stop","params":["swordfish"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### personal_listAccounts
Returns all account addresses of all keys in the key store.

### personal_lockAccounts
Removes the private key with given address from memory. The account can no longer be used to send transactions.

### personal_unlockAccounts
Decrypts the key with the given address from the key store.  
The account can be used with eth_sign and eth_sendTransaction while it is unlocked.

### eth_sign
The sign method calculates an Ethereum specific signature with: sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))).

**Note** the address to sign with must be unlocked.

| Option | Description |
| :--- | :--- |
| `string message` | Message to sign in hex |
| `string account` | Account name |
| `string passphrase` | Account passphrase |
| Returns | Hex-encoded signature |

##### Example
```json
curl -X POST --data '{"id":1,"jsonrpc":"2.0","method":"eth_sign","params":["0xdeadbeaf","nathan",""]}'

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
| `string from` | Name or id of the account the transaction is send from |
| `string to` |  (optional when creating new contract) Name or id of the account or contract the transaction is directed to. |
| `string gas` | (optional, default: estimated) Integer of the **fee** provided for the transaction execution. |
| `string value` | (optional) Integer of the value sent with this transaction |
| `string value_asset` | (optional) Integer of the asset id of value |
| `string data` | The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. |



Example parameters:
```json
params: [{
  "from": "nathan",
  "to": "1.11.54",
  "gas": "0x76c0", // 30400
  "value": "0x9184e72a", // 2441406250
  "value_asset": "0x01", // eETH
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
  "result": "0x4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### personal_sendTransaction
Validate the given passphrase and submit transaction.

The transaction is the same argument as for `eth_sendTransaction` and contains the `from` address. If the passphrase can be used to decrypt the private key belogging to `tx.from` the transaction is verified, signed and send onto the network. The account is not unlocked globally in the node and cannot be used in other RPC calls.