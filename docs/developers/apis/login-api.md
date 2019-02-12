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

### block()

Retrieve the network block API indentifier.

#### Parameters

Without parameters

#### Returns

Identification of API connection which you should use on next requests to the block API.

#### Example

```bash
> {"id": 1, "method":"call", "params":[1,"block",[]]}
< {"id":1,"jsonrpc":"2.0","result":2}
```

### network_broadcast()

Retrieve the network broadcast API identifier.

#### Parameters

Without parameters

#### Returns

Identification of API connection which you should use on next requests to the network_broadcast API.

#### Example

```bash
> {"id": 1, "method":"call", "params":[1,"network_broadcast",[]]}
< {"id":1,"jsonrpc":"2.0","result":3}
```

### database()

Retrieve the database API identifier.

#### Parameters

Without parameters

#### Returns

Identification of API connection which you should use on next requests to the database API.

#### Example

```bash
> {"id": 1, "method":"call", "params":[1,"database",[]]}
< {"id":1,"jsonrpc":"2.0","result":4}
```

### history()

Retrieve the history API identifier.

#### Parameters

Without parameters

#### Returns

Identification of API connection which you should use on next requests to the history API.

#### Example

```bash
> {"id": 1, "method":"call", "params":[1,"history",[]]}
< {"id":1,"jsonrpc":"2.0","result":5}

```

### network_node()

Retrieve the network node API identifier.

#### Parameters

Without parameters

#### Returns

Identification of API connection which you should use on next requests to the network_node API.

#### Example

```bash
> {"id": 1, "method":"call", "params":[1,"network_node",[]]}
< {"id":1,"jsonrpc":"2.0","result":6}

```

### crypto()

Retrieve the cryptography API identifier.

#### Parameters

Without parameters

#### Returns

Identification of API connection which you should use on next requests to the crypto API.

#### Example

```bash
> {"id": 1, "method":"call", "params":[1,"crypto",[]]}
< {"id":1,"jsonrpc":"2.0","result":7}

```

### asset()

Retrieve the asset API identifier.

#### Parameters

Without parameters

#### Returns

Identification of API connection which you should use on next requests to the asset API.

#### Example

```bash
> {"id": 1, "method":"call", "params":[1,"asset",[]]}
< {"id":1,"jsonrpc":"2.0","result":7}

```
