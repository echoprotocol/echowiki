# Echo Node API

## Login API

The login\_api is the bottom layer of the RPC API. All other APIs must be requested from this API.

* [login\(string user, string password\)](login-api.md#login-string-user-string-password)

## Asset API

Access to asset holders and asset balances.

* [get_asset_holders\(string asset_id, int start, int limit\)](asset-api.md#login-string-user-string-password)

## Database API

Exposes accessors on the database which query state tracked by a blockchain validating node. Read-only, all modifications to the database must be performed via transactions. Transactions can be broadcasted via the [Network Broadcast API](https://github.com/echoprotocol/echowiki/tree/a51e885cd5991f21faeb47fe2b5ec57e52b12b99/api-reference/echo-node-api/network-broadcast-api.md).

## History API

Contains methods to access account histories.

## Network Broadcast API

Allows broadcasting of transactions.

## Registration API

API that provides method for account registration

