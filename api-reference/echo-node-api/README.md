# Echo Node API

## Login API

The login\_api is the bottom layer of the RPC API. All other APIs must be requested from this API.

* [login\(string user, string password\)](login-api.md#login-string-user-string-password)

## Asset API

Access to asset holders and asset balances.

* [get_asset_holders\(string asset_id, int start, int limit\)](asset-api.md#get_asset_holders-string-asset_id-int-start-int-limit)
* [get_asset_holders_count(string asset_id)](asset-api.md#get_asset_holders_count-string-asset_id)
* [get_all_asset_holders\(\)](asset-api.md#get_all_asset_holders)

## Database API

Exposes accessors on the database which query state tracked by a blockchain validating node. Read-only, all modifications to the database must be performed via transactions. Transactions can be broadcasted via the [Network Broadcast API](https://github.com/echoprotocol/echowiki/tree/a51e885cd5991f21faeb47fe2b5ec57e52b12b99/api-reference/echo-node-api/network-broadcast-api.md).

* [Objects](database-api.md#objects)
  * [get_objects(ids)](database-api.md)
* [Subscriptions](database-api.md#subscriptions)
  * [set_subscribe_callback(callback, clear_filter)](database-api.md)
  * [set_pending_transaction_callback(callback)](database-api.md)
  * [set_block_applied_callback(callback)](database-api.md)
  * [cancel_all_subscriptions()](database-api.md)
* [Blocks and transactions](database-api.md)
  * [get_block_header(block_num)](database-api.md)
  * [get_block_header_batch(block_nums)](database-api.md)
  * [get_block(block_num)](database-api.md)
  * [get_block_tx_number(id)](database-api.md)
  * [get_block_virtual_ops(block_num)](database-api.md)
  * [get_transaction(block_num, trx_in_block)](database-api.md)
  * [get_recent_transaction_by_id(id)](database-api.md)
* [Globals](database-api.md#globals)
  * [get_chain_properties()](database-api.md)
  * [get_global_properties()](database-api.md)
  * [get_config()](database-api.md)
  * [get_chain_id()](database-api.md)
  * [get_dynamic_global_properties()](database-api.md)
* [Keys](database-api.md#keys)
  * [get_key_references(keys)](database-api.md)
  * [is_public_key_registered(public_key)](database-api.md)
* [Accounts](database-api.md#accounts)
  * [get_accounts(account_ids)](database-api.md)
  * [get_full_accounts(names_or_ids, subscribe)](database-api.md)
  * [get_account_by_name(name)](database-api.md)
  * [get_account_references(account_id)](database-api.md)
  * [lookup_account_names(account_names)](database-api.md)
  * [lookup_accounts(lower_bound_name, limit)](database-api.md)
  * [get_account_addresses(account_id, from, limit)](database-api.md)
  * [get_account_by_address(address)](database-api.md)
* [Contracts](database-api.md#contracts)
  * [get_contract(contract_id)](database-api.md)
  * [get_contracts(contract_ids)](database-api.md)
  * [get_contract_logs(contract_id, from, to)](database-api.md)
  * [subscribe_contracts(contracts_ids)](database-api.md)
  * [subscribe_contract_logs(callback, contract_id, from, to)](database-api.md)
  * [get_contract_result(id)](database-api.md)
  * [call_contract_no_changing_state(contract_id, registrar_account, asset_type, code)](database-api.md)
* [Balances](database-api.md#balances)
  * [get_account_balances(id, assets)](database-api.md)
  * [get_contract_balances(contract_id)](database-api.md)
  * [get_named_account_balances(name, assets)](database-api.md)
  * [get_balance_objects(keys)](database-api.md)
  * [get_vested_balances(objs)](database-api.md)
  * [get_vesting_balances(account_id)](database-api.md)
  * [get_account_count()](database-api.md)
* [Assets](database-api.md#assets)
  * [get_assets(asset_ids)](database-api.md)
  * [list_assets(lower_bound_symbol, limit)](database-api.md)
  * [lookup_asset_symbols(symbols_or_ids)](database-api.md)
* [Verifiers](database-api.md#verifiers)
  * [get_current_verifiers(stage_num)](database-api.md)
* [Committee members](database-api.md#committee-members)
  * [get_committee_members(committee_member_ids)](database-api.md)
  * [get_committee_member_by_account(account)](database-api.md)
  * [lookup_committee_member_accounts(lower_bound_name, limit)](database-api.md)
  * [get_committee_count()](database-api.md)
* [Votes](database-api.md#votes)
  * [lookup_vote_ids(votes)](database-api.md)
* Authority / validation
  * [get_transaction_hex(trx)](database-api.md)
  * [get_required_signatures(ctrx, available_keys)](database-api.md)
  * [get_potential_signatures(ctrx)](database-api.md)
  * [verify_authority(trx)](database-api.md)
  * [verify_account_authority(name_or_id, signers)](database-api.md)
  * [validate_transaction(trx)](database-api.md)
  * [get_required_fees(ops, id)](database-api.md)
* [Proposed transactions](database-api.md#proposed-transactions)
  * [get_proposed_transactions(id)](database-api.md)
* [Sidechain](database-api.md#sidechain)
  * [get_eth_address(account)](database-api.md)
  * [get_account_deposits(account)](database-api.md)
  * [get_account_withdrawals(account)](database-api.md)
* Sidechain ERC20
  * [get_erc20_token(eth_addr)](database-api.md)
  * [get_erc20_account_deposits(account)](database-api.md)
  * [get_erc20_account_withdrawals(account)](database-api.md)
* Contract Feepool
  * [get_contract_pool_balance(id)](database-api.md)
  * [get_contract_pool_whitelist(id)](database-api.md)


## History API

Contains methods to access account histories.

* [get_account_history(account, stop, limit = 100, start)](history-api.md)
* [get_relative_account_history(account, stop, limit, start)](history-api.md)
* [get_account_history_operations(account, operation_id, start, stop, limit)](history-api.md)
* [get_contract_history(contract, stop, limit, start)](history-api.md)

## Network Broadcast API

Allows broadcasting of transactions.

* [broadcast_transaction(signed_transaction)](network-broadcast-api.md)
* [broadcast_block(signed_block)](network-broadcast-api.md)
* [broadcast_transaction_with_callback(callback, trx)](network-broadcast-api.md)
* [broadcast_transaction_synchronous(trx)](network-broadcast-api.md)

## Registration API

API that provides method for account registration

* [register_account(name, active_key, echorand_key)](registration-api.md)
