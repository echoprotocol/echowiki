ECHO Application Interfaces
===========================

List
----

- [login_api][] The login_api is the bottom layer of the RPC API. All other APIs must be requested from this API.
- [asset_api][] Access to asset holders and asset balances.
- [database_api][] Exposes accessors on the database which query state tracked by a blockchain validating node.
  Read-only, all modifications to the database must be performed via transactions. Transactions can be broadcasted via the [network_broadcast_api][].
- [history_api][] Contains methods to access account histories.
- [network_broadcast_api][] Allows broadcasting of transactions.
- [registration_api][] API that provides method for account registration


<!--- [block_api][] Access to chain blocks. -->
<!-- - [crypto_api][] Access cryptography functions -->
<!-- - [network_node_api][] Allows maintenance of p2p connections. -->

Authorization Scheme
--------------------

You can restrict API’s to particular users by specifying an `api-access` file in `config.ini` or by using the `--api-access /full/path/to/api-access.json` startup node command. Here is an example `apiaccess` file which allows user `bytemaster` with password `supersecret` to access four different API’s, while allowing any other user to access the three public API’s necessary to use the wallet:

```
{
   "permission_map" :
   [
      [
         "bytemaster",
         {
            "password_hash_b64" : "9e9GF7ooXVb9k4BoSfNIPTelXeGOZ5DrgOYMj94elaY=",
            "password_salt_b64" : "INDdM6iCi/8=",
            "allowed_apis" : ["database_api", "network_broadcast_api", "history_api"]
         }
      ],
      [
         "*",
         {
            "password_hash_b64" : "*",
            "password_salt_b64" : "*",
            "allowed_apis" : ["database_api", "network_broadcast_api", "history_api"]
         }
      ]
   ]
}
```
With the above configuration, here is an example of how to call `get_chain_id` from the `database` API:

```
{"id":1, "method":"call", "params":[1,"login",["bytemaster", "supersecret"]]}
{"id":2, "method":"call", "params":[1,"database",[]]}
{"id":3, "method":"call", "params":[3,"get_chain_id",[]]}
```
Note, the call to `database` is necessary to obtain the correct API identifier for the database API.
It is not guaranteed that the API identifier will always be 3.

Since the `network_node` API requires login, it is only accessible over the [websocket RPC](websocket-api.md).

[login_api]: apis/login-api.md
[asset_api]: apis/asset-api.md
[block_api]: apis/block-api.md
[network_broadcast_api]: apis/network-broadcast-api.md
[database_api]: apis/database-api.md
[history_api]: apis/history-api.md
[registration_api]: apis/registration-api.md
<!-- [crypto_api]: https://dev-doc.myecho.app/classgraphene_1_1app_1_1crypto__api.html -->
<!-- [network_node_api]: https://dev-doc.myecho.app/classgraphene_1_1app_1_1network__node__api.html -->