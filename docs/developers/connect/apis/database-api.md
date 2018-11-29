Database API
============

### get_objects(array ids)

Get the objects corresponding to the provided IDs.

If any of the provided IDs does not map to an object, a null is returned in its position.

#### Parameters
| Option | Description |
|:-------|:-----------|
| `ids`  | an array of object IDs, e.g. `["1.6.1", "1.6.2", ...]` |

#### Returns

The objects retrieved, in the order they are mentioned in ids.
```json
[{
    "id": "1.6.1",
    ...
}]
```

## set_subscribe_callback(callback, notify_remove_create)

Subscribe to updates.

### Parameters

- *calblack* a function taking one argument
- *nofity_remove_create* whether subscribe to universal object creation and removal events.
       *        If this is set to true, the API server will notify all newly created objects and ID of all
       *        newly removed objects to the client, no matter whether client subscribed to the objects.

## set_pending_transaction_callback(callback)

Subscribe to pending transactions.

### Parameters

- *calblack* a function taking one argument

## set_block_applied_callback(callback)

Subscribe to block applications.

### Parameters

- *calblack* a function taking one argument, the id of the applied block.

## cancel_all_subscriptions()

Stop receiving any notifications. Unsubscribes from all subscribed objects.


## get_block_header(block_num)

Retrieve a block header.

### Parameters
- *block_num* height of the block whose header should be returned

### Returns

Header of the referenced block, or null if no matching block was found.

## get_block(block_num)

Retrieve a full, signed block.

### Parameters

- *block_num* height of the block to be returned

### Returns

The referenced block, or null if no matching block was found.

## get_transaction(block_num, trx_in_block)

Fetch an individual transaction.

### Parameters

- *block_num* height of the block in which the transaction resides
- *trx_in_block* index of the transaction in the block

### Returns

A processed transaction object.

## get_recent_transaction_by_id(id)

If the transaction has not expired, this method will return the
transaction for the given ID or it will return null if it is not known.
Just because it is not known does not mean it wasn’t included in the blockchain.

### Parameters

- *id* id of the transaction

### Returns

A signed transaction object.


## get_chain_properties()

Retrieve the chain property object associated with the chain.

## get_global_properties()

Retrieve the current global property object.

## get_config()

Retrieve compile-time constants.

## get_chain_id()

Get the chain ID.

## get_dynamic_global_properties()

Retrieve the current dynamic global property object.


## get_key_references(keys)

Retreive an array of account IDs associated with the given keys.

### Parameters

- *keys* an array of public keys.

### Returns

An array of arrays of account IDs for every public key provided.


## get_accounts(account_ids)

Get a list of accounts by ID. This function has semantics identical to get_objects.

### Parameters

- *account_ids* IDs of the accounts to retrieve

### Returns

The accounts corresponding to the provided IDs.

## get_full_accounts(names_or_ids, subscribe)

Fetch all objects relevant to the specified accounts and subscribe to updates.

This function fetches all relevant objects for the given accounts,
and subscribes to updates to the given accounts. If any of the strings in names_or_ids
cannot be tied to an account, that input will be ignored.
All other accounts will be retrieved and subscribed.

### Parameters

- *names_or_ids* An array of either the names or IDs of accounts to retrieve (can be mixed)
- *subscribe* Whethere to subscribe to updates

### Returns

A map of strings from names_or_ids to the corresponding accounts.

## get_account_by_name(name)

Get the account object by it's name.

### Parameters

- *name* account name

### Returns

Account object it the account exists, null otherwise.

## get_account_references(account_id)

### Parameters

- *account_id* id of the account

### Returns

All accounts that refer to the key or account id in their owner or active authorities.

## lookup_account_names(account_names)

Get a list of accounts by name. This function has semantics identical to get_objects

### Parameters

- *account_names* names of the accounts to retrieve

### Returns

The accounts holding the provided names.

## lookup_accounts(lower_bound_name, limit)

Get names and IDs for registered accounts.

### Parameters

- *lower_bound_name* lower bound of the first name to return
- *limit* maximum number of results to return must not exceed 1000

### Returns

Map of account names to corresponding IDs.

## get_account_count()

Get the total number of accounts registered with the blockchain.


## get_account_balances(id, assets)

Get an account’s balances in various assets.

### Parameters

- *id* ID of the account to get balances for
- *assets* an array of IDs of the assets to get balances of;
           if empty, get all assets account has a balance in

### Returns

An array of balances of the account

## get_named_account_balances(name, assets)

Semantically equivalent to *get_account_balances*, but takes a name instead of an ID.

## get_balance_objects(addrs)

Returns all unclaimed balance objects for a set of addresses.

## get_vested_balances(const vector<balance_id_type> &objs) const

### Parameters

- *objs* balance IDs

### Returns

An array of assets vested.

get_vesting_balances(account_id)

## Parameters

- *account_id* the id of account to use

## Returns

An array of vesting balances.


## get_assets(asset_ids)

Get a list of assets by ID. This function has semantics identical to get_objects.

### Parameters

- *asset_ids* IDs of the assets to retrieve

### Returns

The assets corresponding to the provided IDs

## list_assets(lower_bound_symbol, limit)

Get assets alphabetically by symbol name.

### Parameters

- *lower_bound_symbol* lower bound of symbol names to retrieve
- *limit* maximum number of assets to fetch (must not exceed 100)

### Returns

The assets found.

## lookup_asset_symbols(symbols_or_ids)

Get a list of assets by symbol. This function has semantics identical to get_objects

### Parameters

- *asset_symbols* symbols or stringified IDs of the assets to retrieve

### Return

The assets corresponding to the provided symbols or IDs.


## get_order_book(base, quote, depth = 50)

Returns the order book for the market base:quote.

### Parameters
- *base* String name of the first asset
- *quote* String name of the second asset
- *depth* of the order book. Up to depth of each asks and bids, capped at 50.
          Prioritizes most moderate of each

### Returns

Order book of the market

## get_limit_orders(a, b, limit)

Get limit orders in a given market.

### Parameters

- *a* ID of asset being sold
- *b* ID of asset being purchased
- *limit: Maximum number of orders to retrieve

### Returns

The limit orders, ordered from least to greatest price

## get_call_orders(a, limit)

Get call orders in a given asset.

### Parameters

- *a* ID of asset being called
- *limit* maximum number of orders to retrieve

### Returns

The call orders to be called, ordered from earliest to latest.

## get_settle_orders(a, limit)

Get forced settlement orders in a given asset.

### Parameters

- *a* ID of asset being settled
- *limit* maximum number of orders to retrieve

### Returns

The settle orders, ordered from earliest settlement date to latest.

## get_margin_positions(id)

### Returns
all open margin positions for a given account id.

## subscribe_to_market(callback, a, b)

Request notification when the active orders in the market between two assets changes.

Callback will be passed an object containing an array of [operation, operation_result].
The array will contain, in order, the operations which changed the market, and their results.

### Parameters

- *callback* callback method which is called when the market changes
- *a* first asset ID
- *b* second asset ID

## unsubscribe_from_market(a, b)

Unsubscribe from updates to a given market.

### Parameters

a: First asset ID
b: Second asset ID

## get_ticker(base, quote)

Returns the ticker for the market assetA:assetB.

### Parameters

- *a* String name of the first asset
- *b* String name of the second asset

### Returns

The market ticker for the past 24 hours.

## get_24_volume(base, quote)

Returns the 24 hour volume for the market assetA:assetB.

### Parameters

- *a* String name of the first asset
- *b* String name of the second asset

### Returns

The market volume over the past 24 hours

## get_trade_history(base, quote, start, stop, limit = 100)

Returns recent trades for the market assetA:assetB. The time must be UTC.

### Parameters

- *a* String name of the first asset
- *b* String name of the second asset
- *stop* Stop time as a UNIX timestamp
- *limit* Number of trasactions to retrieve, capped at 100
- *start* Start time as a UNIX timestamp

### Returns

Recent transactions in the market


## get_witnesses(witness_ids)

Get a list of witnesses by ID. This function has semantics identical to get_objects

### Parameters

- *witness_ids* IDs of the witnesses to retrieve

### Returns

The witnesses corresponding to the provided IDs

## get_witness_by_account(account)

Get the witness owned by a given account.

### Parameters

- *account* The ID of the account whose witness should be retrieved

### Returns

The witness object, or null if the account does not have a witness

## lookup_witness_accounts(lower_bound_name, limit)

Get names and IDs for registered witnesses.

### Parameters

- *lower_bound_name* Lower bound of the first name to return
- *limit* Maximum number of results to return must not exceed 1000

### Returns

Map of witness names to corresponding IDs

## get_witness_count()

Get the total number of witnesses registered with the blockchain.


## get_committee_members(committee_member_ids)

Get a list of committee_members by ID. This function has semantics identical to get_objects.

### Parameters

- *committee_member_ids* IDs of the committee_members to retrieve

### Returns

The committee_members corresponding to the provided IDs


## get_committee_member_by_account(account)

Get the committee_member owned by a given account.

### Parameters

- *account* The ID of the account whose committee_member should be retrieved

### Returns

The committee_member object, or null if the account does not have a committee_member

## lookup_committee_member_accounts(lower_bound_name, limit)

Get names and IDs for registered committee_members.

### Parameters

- *lower_bound_name* Lower bound of the first name to return
- *limit* Maximum number of results to return must not exceed 1000

### Returns

Map of committee_member names to corresponding IDs

## get_workers_by_account(account_id)

Returns the worker objects associated with this account.

## lookup_vote_ids(votes)

Given a set of votes, return the objects they are voting for.

This will be a mixture of committee_member_object, witness_objects, and worker_objects

The results will be in the same order as the votes.
null will be returned for any vote ids that are not found.

## get_transaction_hex(trx)

Get a hexdump of the serialized binary form of a signed transaction.

## get_required_signatures(trx, available_keys)

Takes a partially signed transaction and a set of public keys that the owner has the ability
to sign for and return the minimal subset of public keys that should add
signatures to the transaction.

## get_potential_signatures(trx)

This method will return the set of all public keys that could possibly sign for a given transaction.
This call can be used by wallets to filter their set of public keys to just
the relevant subset prior to calling get_required_signatures to get the minimum subset.

## get_potential_address_signatures(trx)

Get the potential address signature of the transaction.

## verify_authority(trx)

Returns true of the trx has all of the required signatures, otherwise throws an exception

## verify_account_authority(name_or_id, signers)

Returns true if the signers have enough authority to authorize an account

## validate_transaction(trx)

Validates a transaction against the current state without broadcasting it on the network.

## get_required_fees(ops, id)

For each operation calculate the required fee in the specified asset type.
If the asset type does not have a valid core_exchange_rate

## get_proposed_transactions(id)

Returns the set of proposed transactions relevant to the specified account id.

## get_all_contracts()

Get an array of all contracts.

## get_contract_logs(contract_id, from, to)

Get contract's logs.

### Parameters

- *contract_id* ID of the contract
- *from* log to start from
- *to* log to end on

## subscribe_contract_logs(callback, contract_id, from, to)

Subscribe to contract's logs.


### Parameters

- *callback* a function of single argument to call as a callback
- *contract_id* ID of the contract
- *from* log to start from
- *to* log to end on

## get_contract_result(result_contract_id)

Get the contract execution results.

## get_contract(contract_id)

Get the contract by id.

## call_contract_no_changing_state(contract_id, registrar_account, asset_type, code)

Call the provided contract, but don't change the state.

## get_contracts(contract_ids)

Get an array of contracts by their IDs, or null if there is no contract with such ID.

## get_contract_balances (contract_id)

An array of assets and their amounts, that the contract posesses.
