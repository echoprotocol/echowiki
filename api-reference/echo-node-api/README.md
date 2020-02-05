# Echo Node API

## Login API

The login\_api is the bottom layer of the RPC API. All other APIs must be requested from this API.

* [login](login-api.md#login-user-password)

## Asset API

Access to asset holders and asset balances.

* [get\_asset\_holders](asset-api.md#get_asset_holders-asset_id-start-limit)
* [get\_asset\_holders\_count](asset-api.md#get_asset_holders_count-string-asset_id)
* [get\_all\_asset\_holders](asset-api.md#get_all_asset_holders)

## Database API

Exposes accessors on the database which query state tracked by a blockchain validating node. Read-only, all modifications to the database must be performed via transactions. Transactions can be broadcasted via the [Network Broadcast API](network-broadcast-api.md).

* [Database API](database-api/README.md)

## History API

Contains methods to access account and contract histories.

* [get\_account\_history](history-api.md#get_account_history-account-stop-limit-start)
* [get\_relative\_account\_history](history-api.md#get_relative_account_history-account-stop-limit-start)
* [get\_account\_history\_operations](history-api.md#get_account_history_operations-account-operation_id-start-stop-limit)
* [get\_contract\_history](history-api.md#get_contract_history-contract-stop-limit-start)
* [get\_relative\_contract\_history](history-api.md#get_relative_contract_history-contract-stop-limit-start)

## Key Config API

API that provides methods for config of keys.

* [set\_password](key-config-api.md#set_password-key)
* [add\_echorand\_key](key-config-api.md#add_echorand_key-acc_id-key)
* [add\_sidechains\_keys](key-config-api.md#add_sidechains_keys-acc_id-btc_key-eth_key)
* [rm\_echorand\_key\_by\_account](key-config-api.md#rm_echorand_key_by_account-acc_id)
* [rm\_echorand\_key\_by\_echo\_key](key-config-api.md#rm_echorand_key_by_echo_key-key)
* [rm\_sidechains\_keys\_by\_account](key-config-api.md#rm_sidechains_keys_by_account-acc_id)
* [rm\_sidechains\_keys\_by\_btc\_key](key-config-api.md#rm_sidechains_keys_by_btc-key)
* [rm\_sidechains\_keys\_by\_eth\_key](key-config-api.md#rm_sidechains_keys_by_eth-key)
* [list](key-config-api.md#list)
* [help](key-config-api.md#help)

## Network Broadcast API

Allows broadcasting of transactions.

* [broadcast\_transaction](network-broadcast-api.md#broadcast_transaction-trx)
* [broadcast\_block](network-broadcast-api.md#broadcast_block-signed_block)
* [broadcast\_transaction\_with\_callback](network-broadcast-api.md#broadcast_transaction_with_callbackcb-trx)
* [broadcast\_transaction\_synchronous](network-broadcast-api.md#broadcast_transaction_synchronous-trx)

## Network Node API

Allows maintenance of p2p connections.

* [get\_info](network-node-api.md#get_info)
* [add\_node](network-node-api.md#add_node-ep)
* [get\_connected\_peers](network-node-api.md#get_connected_peers)
* [get\_potential\_peers](network-node-api.md#get_potential_peers)
* [get\_advanced\_node\_parameters](network-node-api.md#get_advanced_node_parameters)
* [set\_advanced\_node\_parameters](network-node-api.md#set_advanced_node_parameters-params)

## Registration API

API that provides method for account registration

* [request\_registration\_task](registration-api.md#request_registration_task)
* [submit\_registration\_solution](registration-api.md#submit_registration_solution-callback-name-active-echorand_key-nonce-rand_num)
* [get\_registrar](registration-api.md#get\_registrar)

## Echorand API

Contains methods to access echorand notifications.

* [set\_agreement\_message\_callback](echorand-api.md#set_agreement_message_callback-cb)

