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

[login_api]: apis/login-api.md
[asset_api]: apis/asset-api.md
[block_api]: apis/block-api.md
[network_broadcast_api]: apis/network-broadcast-api.md
[database_api]: apis/database-api.md
[history_api]: apis/history-api.md
[registration_api]: apis/registration-api.md
<!-- [crypto_api]: https://dev-doc.myecho.app/classgraphene_1_1app_1_1crypto__api.html -->
<!-- [network_node_api]: https://dev-doc.myecho.app/classgraphene_1_1app_1_1network__node__api.html -->