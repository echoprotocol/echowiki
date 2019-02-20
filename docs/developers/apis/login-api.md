<!-- markdownlint-disable md001 -->
<!-- markdownlint-disable md024 -->

# Login API

The functions here should be called as follows:

```json
{"id": your-id, "method":"call", "params":[1,"function-name",[params...]]}
```

for example:

```json
{"id": 1, "method":"call", "params":[1,"login",["", ""]]}
```

### login(string user, string password)

This must be called prior to requesting other APIs.
Other APIs may not be accessible until the client has sucessfully authenticated.

#### Parameters

| Option | Description |
|:-------|:-----------|
| `user`  | Username to login with |
| `password`  | Password to login with |

#### Returns

`true` if logged in successfully, `false` otherwise

#### Example

```bash
> {"id": 1, "method":"call", "params":[1,"login",["", ""]]}
< {"id":1,"jsonrpc":"2.0","result":true}
```

### API Methods

Enable and retrieve enabled API indentifier

| API | Description |
|:-------|:-----------|
| `database` | `database_api` implements the API for the chain database |
| `block` | `block_api` has only a get_blocks method for getting multiple blocks |
| `network_broadcast` | `network_broadcast_api` allows broadcasting of transactions and blocks |
| `network_node` | `network_node_api` allows maintenance of p2p connections including consensus monitoring |
| `crypto` | `crypto_api` implemets crypto helper functions |
| `history` | `history_api` implements the RPC API for accounts, contracts, orders and markets history |
| `asset` | `asset_api` access to asset holders and asset balances |

#### Example

Working exactly the same for all API's. Example for `database_api`:

```bash
> {"id": 1, "method":"call", "params":[1,"database",[]]}
< {"id":1,"jsonrpc":"2.0","result":2}
```
