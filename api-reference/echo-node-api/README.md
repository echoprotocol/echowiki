# Echo Node API

## Login API

The login\_api is the bottom layer of the RPC API. All other APIs must be requested from this API.

* [login](login-api.md#login-user-password)

## Asset API

Access to asset holders and asset balances.

* [get_asset_holders](asset-api.md#get_asset_holders-asset_id-start-limit)
* [get_asset_holders_count](asset-api.md#get_asset_holders_count-string-asset_id)
* [get_all_asset_holders](asset-api.md#get_all_asset_holders)

## Database API

Exposes accessors on the database which query state tracked by a blockchain validating node. Read-only, all modifications to the database must be performed via transactions. Transactions can be broadcasted via the [Network Broadcast API](network-broadcast-api.md).

* [Objects](database-api.md#objects)
  * [get_objects](database-api.md#get_objects-ids)
* [Subscriptions](database-api.md#subscriptions)
  * [set_subscribe_callback](database-api.md#set_subscribe_callback-callback-clear_filter)
  * [set_pending_transaction_callback](database-api.md#set_pending_transaction_callback-callback)
  * [set_block_applied_callback](database-api.md#set_block_applied_callback-callback)
  * [cancel_all_subscriptions](database-api.md#cancel_all_subscriptions)
* [Blocks and transactions](database-api.md)
  * [get_block_header](database-api.md#get_block_header-block_num)
  * [get_block_header_batch](database-api.md#get_block_header_batch-block_nums)
  * [get_block](database-api.md#get_block-block_num)
  * [get_block_tx_number](database-api.md#get_block_tx_number-id)
  * [get_block_virtual_ops](database-api.md#get_block_virtual_ops-block_num)
  * [get_transaction](database-api.md#get_transaction-block_num-trx_in_block)
  * [get_recent_transaction_by_id](database-api.md#get_recent_transaction_by_id-id)
* [Globals](database-api.md#globals)
  * [get_chain_properties](database-api.md#get_chain_properties)
  * [get_global_properties](database-api.md#get_global_properties)
  * [get_config](database-api.md#get_config)
  * [get_chain_id](database-api.md#get_chain_id)
  * [get_dynamic_global_properties](database-api.md#get_dynamic_global_properties)
* [Keys](database-api.md#keys)
  * [get_key_references](database-api.md#get_key_references-keys)
  * [is_public_key_registered](database-api.md#is_public_key_registered-public_key)
* [Accounts](database-api.md#accounts)
  * [get_accounts](database-api.md#get_accounts-account_ids)
  * [get_full_accounts](database-api.md#get_full_accounts-names_or_ids-subscribe)
  * [get_account_by_name](database-api.md#get_account_by_name-name)
  * [get_account_references](database-api.md#get_account_references-account_id)
  * [lookup_account_names](database-api.md#lookup_account_names-account_names)
  * [lookup_accounts](database-api.md#lookup_accounts-lower_bound_name-limit)
  * [get_account_addresses](database-api.md#get_account_addresses-account_id-from-limit)
  * [get_account_by_address](database-api.md#get_account_by_address-address)
* [Contracts](database-api.md#contracts)
  * [get_contract](database-api.md#get_contract-contract_id)
  * [get_contracts](database-api.md#get_contracts-contract_ids)
  * [get_contract_logs](database-api.md#get_contract_logs-contract_id-from-limit)
  * [subscribe_contracts](database-api.md#subscribe_contracts-contracts_ids)
  * [subscribe_contract_logs](database-api.md#subscribe_contract_logs-callback-contract_id-from-to)
  * [get_contract_result](database-api.md#get_contract_result-id)
  * [call_contract_no_changing_state](database-api.md#call_contract_no_changing_state-contract_id-registrar_account-asset_type-code)
* [Balances](database-api.md#balances)
  * [get_account_balances](database-api.md#get_account_balances-id-assets)
  * [get_contract_balances](database-api.md#get_contract_balances-contract_id)
  * [get_named_account_balances](database-api.md#get_named_account_balances-name-assets)
  * [get_balance_objects](database-api.md#get_balance_objects-keys)
  * [get_vested_balances](database-api.md#get_vested_balances-objs)
  * [get_vesting_balances](database-api.md#get_vesting_balances-account_id)
  * [get_account_count](database-api.md#get_account_count)
* [Assets](database-api.md#assets)
  * [get_assets](database-api.md#get_assets-asset_ids)
  * [list_assets](database-api.md#list_assets-lower_bound_symbol-limit)
  * [lookup_asset_symbols](database-api.md#lookup_asset_symbols-symbols_or_ids)
* [Verifiers](database-api.md#verifiers)
  * [get_current_verifiers](database-api.md#get_current_verifiers-stage_num)
* [Committee members](database-api.md#committee-members)
  * [get_committee_members](database-api.md#get_committee_members-committee_member_ids)
  * [get_committee_member_by_account](database-api.md#get_committee_member_by_account-account)
  * [lookup_committee_member_accounts](database-api.md#lookup_committee_member_accounts-lower_bound_name-limit)
  * [get_committee_count](database-api.md#get_committee_count)
* [Votes](database-api.md#votes)
  * [lookup_vote_ids](database-api.md#lookup_vote_ids-votes)
* [Authority / validation](database-api.md#authority-validation)
  * [get_transaction_hex](database-api.md#get_transaction_hex-trx)
  * [get_required_signatures](database-api.md#get_required_signatures-ctrx-available_keys)
  * [get_potential_signatures](database-api.md#get_potential_signatures-ctrx)
  * [verify_authority](database-api.md#verify_authority-trx)
  * [verify_account_authority](database-api.md#verify_account_authority-name_or_id-signers)
  * [validate_transaction](database-api.md#validate_transaction-trx)
  * [get_required_fees](database-api.md#get_required_fees-ops-id)
* [Proposed transactions](database-api.md#proposed-transactions)
  * [get_proposed_transactions](database-api.md#get_proposed_transactions-id)
* [Sidechain](database-api.md#sidechain)
  * [get_eth_address](database-api.md#get_eth_address-account)
  * [get_account_deposits](database-api.md#get_account_deposits-account)
  * [get_account_withdrawals](database-api.md#get_account_withdrawals-account)
* [Sidechain ERC20](database-api.md#sidechain-erc20)
  * [get_erc20_token](database-api.md#get_erc20_token-eth_addr)
  * [get_erc20_account_deposits](database-api.md#get_erc20_account_deposits-account)
  * [get_erc20_account_withdrawals](database-api.md#get_erc20_account_withdrawals-account)
* [Contract Feepool](database-api.md#contract-feepool)
  * [get_contract_pool_balance](database-api.md#get_contract_pool_balance-id)
  * [get_contract_pool_whitelist](database-api.md#get_contract_pool_whitelist-id)


## History API

Contains methods to access account histories.

* [get_account_history](history-api.md#get_account_history-account-stop-limit-start)
* [get_relative_account_history](history-api.md#get_relative_account_history-account-stop-limit-start)
* [get_account_history_operations](history-api.md#get_account_history_operations-account-operation_id-start-stop-limit)
* [get_contract_history](history-api.md#get_contract_history-contract-stop-limit-start)

## Network Broadcast API

Allows broadcasting of transactions.

* [broadcast_transaction](network-broadcast-api.md#broadcast_transaction-trx)
* [broadcast_block](network-broadcast-api.md#broadcast_block-signed_block)
* [broadcast_transaction_with_callback](network-broadcast-api.md#broadcast_transaction_with_callback-callback-trx)
* [broadcast_transaction_synchronous](network-broadcast-api.md#broadcast_transaction_synchronous-trx)

## Registration API

API that provides method for account registration

* [register_account](registration-api.md#register_account-callback-name-active_key-echorand_key)
