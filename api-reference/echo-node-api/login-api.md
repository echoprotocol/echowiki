# APIs

### login(user, password)

This must be called prior to requesting other APIs. Other APIs may not be accessible until the client has sucessfully authenticated.

#### Parameters

| Option                   | Description            |
|--------------------------|:-----------------------|
| `const string& user`     | Username to login with |
| `const string& password` | Password to login with |

#### Example

```json
{
    "id": 1,
    "method": "call",
    "params": [
        1,
        "login",
        [
            "",
            ""
        ]
    ]
}
```

#### Returns

`True` if logged in successfully; `false` otherwise

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": true
}
```

#### API Methods

Enable and retrieve enabled API indentifier

| API                 | Description                                                                             |
|---------------------|:----------------------------------------------------------------------------------------|
| `block`             | `block_api` has only a get_blocks method for getting multiple blocks                    |
| `network_broadcast` | `network_broadcast_api` allows broadcasting of transactions and blocks                  |
| `database`          | `database_api` implements the API for the chain database                                |
| `history`           | `history_api` implements the RPC API for accounts, contracts                            |
| `network_node`      | `network_node_api` allows maintenance of p2p connections including consensus monitoring |
| `asset`             | `asset_api` access to asset holders and asset balances                                  |
| `registration`      | `registration_api` implements the API for register_account                              | 

#### Example

Working exactly the same for all API's. Example for `database_api`:

```json
{
    "id": 1,
    "method": "call",
    "params": [
        1,
        "database",
        []
    ]
}
```

#### Returns

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": 2
}
```
