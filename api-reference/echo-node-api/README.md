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

* [Objects](database-api.md#objects)
  * [get\_objects](database-api.md#get_objects-ids)
* [Subscriptions](database-api.md#subscriptions)
  * [set\_subscribe\_callback](database-api.md#set_subscribe_callback-callback-clear_filter)
  * [set\_pending\_transaction\_callback](database-api.md#set_pending_transaction_callback-callback)
  * [set\_block\_applied\_callback](database-api.md#set_block_applied_callback-callback)
  * [cancel\_all\_subscriptions](database-api.md#cancel_all_subscriptions)
* [Blocks and transactions](database-api.md#blocks-and-transactions)
  * [get\_block\_header](database-api.md#get_block_header-block_num)
  * [get\_block\_header\_batch](database-api.md#get_block_header_batch-block_nums)
  * [get\_block](database-api.md#get_block-block_num)
  * [get\_block\_tx\_number](database-api.md#get_block_tx_number-id)
  * [get\_block\_virtual\_ops](database-api.md#get_block_virtual_ops-block_num)
  * [get\_transaction](database-api.md#get_transaction-block_num-trx_in_block)
  * [get\_recent\_transaction\_by\_id](database-api.md#get_recent_transaction_by_id-id)
* [Globals](database-api.md#globals)
  * [get\_chain\_properties](database-api.md#get_chain_properties)
  * [get\_global\_properties](database-api.md#get_global_properties)
  * [get\_config](database-api.md#get_config)
  * [get\_chain\_id](database-api.md#get_chain_id)
  * [get\_dynamic\_global\_properties](database-api.md#get_dynamic_global_properties)
* [Keys](database-api.md#keys)
  * [get\_key\_references](database-api.md#get_key_references-keys)
  * [is\_public\_key\_registered](database-api.md#is_public_key_registered-public_key)
* [Accounts](database-api.md#accounts)
  * [get\_accounts](database-api.md#get_accounts-account_ids)
  * [get\_full\_accounts](database-api.md#get_full_accounts-names_or_ids-subscribe)
  * [get\_account\_by\_name](database-api.md#get_account_by_name-name)
  * [get\_account\_references](database-api.md#get_account_references-account_id)
  * [lookup\_account\_names](database-api.md#lookup_account_names-account_names)
  * [lookup\_accounts](database-api.md#lookup_accounts-lower_bound_name-limit)
  * [get\_account\_addresses](database-api.md#get_account_addresses-account_id-from-limit)
  * [get\_account\_by\_address](database-api.md#get_account_by_address-address)
  * [get\_account\_count](database-api.md#get_account_count)
* [Contracts](database-api.md#contracts)
  * [get\_contract](database-api.md#get_contract-contract_id)
  * [get\_contracts](database-api.md#get_contracts-contract_ids)
  * [get\_contract\_logs](database-api.md#get_contract_logs-contract_logs_filter_options)
  * [subscribe\_contracts](database-api.md#subscribe_contracts-contracts_ids)
  * [subscribe\_contract\_logs](database-api.md#subscribe_contract_logs-callback-contract_id)
  * [get\_contract\_result](database-api.md#get_contract_result-id)
  * [call\_contract\_no\_changing\_state](database-api.md#call_contract_no_changing_state-contract_id-caller-value-code)
* [Balances](database-api.md#balances)
  * [get\_account\_balances](database-api.md#get_account_balances-id-assets)
  * [get\_contract\_balances](database-api.md#get_contract_balances-contract_id)
  * [get\_named\_account\_balances](database-api.md#get_named_account_balances-name-assets)
  * [get\_balance\_objects](database-api.md#get_balance_objects-keys)
  * [get\_vested\_balances](database-api.md#get_vested_balances-objs)
  * [get\_vesting\_balances](database-api.md#get_vesting_balances-account_id)
  * [get\_frozen\_balances](database-api.md#get_frozen_balances-account_id)
  * [get\_committee\_frozen\_balance](database-api.md#get_committee_frozen_balance-committee_member_id)
* [Assets](database-api.md#assets)
  * [get\_assets](database-api.md#get_assets-asset_ids)
  * [list\_assets](database-api.md#list_assets-lower_bound_symbol-limit)
  * [lookup\_asset\_symbols](database-api.md#lookup_asset_symbols-symbols_or_ids)
* [Committee members](database-api.md#committee-members)
  * [get\_committee\_members](database-api.md#get_committee_members-committee_member_ids)
  * [get\_committee\_member\_by\_account](database-api.md#get_committee_member_by_account-account)
  * [lookup\_committee\_member\_accounts](database-api.md#lookup_committee_member_accounts-lower_bound_name-limit)
  * [get\_committee\_count](database-api.md#get_committee_count)
* [Authority / validation](database-api.md#authority-validation)
  * [get\_transaction\_hex](database-api.md#get_transaction_hex-trx)
  * [get\_required\_signatures](database-api.md#get_required_signatures-ctrx-available_keys)
  * [get\_potential\_signatures](database-api.md#get_potential_signatures-ctrx)
  * [verify\_authority](database-api.md#verify_authority-trx)
  * [verify\_account\_authority](database-api.md#verify_account_authority-name_or_id-signers)
  * [validate\_transaction](database-api.md#validate_transaction-trx)
  * [get\_required\_fees](database-api.md#get_required_fees-ops-id)
* [Proposed transactions](database-api.md#proposed-transactions)
  * [get\_proposed\_transactions](database-api.md#get_proposed_transactions-id)
* [Sidechain](database-api.md#sidechain)
  * [get\_account\_deposits](database-api.md#get_account_deposits-account-type)
  * [get\_account\_withdrawals](database-api.md#get_account_withdrawals-account-type)
* [Sidechain Bitcoin](database-api.md#sidechain_Bitcoin)
  * [get\_btc\_address](database-api.md#get_btc_address-account)
  * [get\_btc\_deposit\_script](database-api.md#get_btc_deposit_script-address)
* [Sidechain Ethereum](database-api.md#sidechain_Ethereum)
  * [get\_eth\_address](database-api.md#get_eth_address-account)
* [Sidechain ERC20](database-api.md#sidechain-erc20)
  * [get\_erc20\_token](database-api.md#get_erc-20-_token-eth_addr)
  * [get\_erc20\_account\_deposits](database-api.md#get_erc-20-_account_deposits-account)
  * [get\_erc20\_account\_withdrawals](database-api.md#get_erc-20-_account_withdrawals-account)
* [Contract Feepool](database-api.md#contract-feepool)
  * [get\_contract\_pool\_balance](database-api.md#get_contract_pool_balance-id)
  * [get\_contract\_pool\_whitelist](database-api.md#get_contract_pool_whitelist-id)

## History API

Contains methods to access account histories.

* [get\_account\_history](history-api.md#get_account_history-account-stop-limit-start)
* [get\_relative\_account\_history](history-api.md#get_relative_account_history-account-stop-limit-start)
* [get\_account\_history\_operations](history-api.md#get_account_history_operations-account-operation_id-start-stop-limit)
* [get\_contract\_history](history-api.md#get_contract_history-contract-stop-limit-start)

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

## Registration API

API that provides method for account registration

* [request\_registration\_task](registration-api.md#request_registration_task)
* [submit\_registration\_solution](registration-api.md#submit_registration_solution-callback-name-active-echorand_key-nonce-rand_num)
* [get\_registrar](registration-api.md#get\_registrar)

