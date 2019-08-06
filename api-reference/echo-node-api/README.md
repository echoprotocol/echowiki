# Echo Node API

## Login API

The login_api is the bottom layer of the RPC API. All other APIs must be
requested from this API.

* login(string user, string password)

## Asset API 

Access to asset holders and asset balances.

## Database API

Exposes accessors on the database which query state tracked by a
blockchain validating node. Read-only, all modifications to the database
must be performed via transactions. Transactions can be broadcasted via
the [Network Broadcast API](network-broadcast-api.md).

## History API

Contains methods to access account histories.

## Network Broadcast API

Allows broadcasting of transactions.

## Registration API

API that provides method for account registration
