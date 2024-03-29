# Echo Wallet API

## Contents
* Info and help
    * [info](#info)
    * [about](#about)
    * [help](#help)
* Objects
    * [get_object](#get_object-object_id)
* Blocks and transactions
    * [get_block](#get_block-block_num)
    * [get_block_virtual_ops](#get_block_virtual_ops-block_num)
    * [get_transaction](#get_transaction-block_num-tx_index)
    * [get_transaction_by_id](#get_transaction_by_id-tx_id)
    * [get_transaction_id](#get_transaction_id-tx)
    * [serialize_transaction](#serialize_transaction-tx)
    * [sign_transaction](#sign_transaction-tx-broadcast)
* Accounts
    * [get_account_count](#get_account_count)
    * [list_my_accounts](#list_my_accounts)
    * [list_accounts](#list_accounts-lowerbound-limit)
    * [get_account_history](#get_account_history-account-limit)
    * [get_relative_account_history](#get_relative_account_history-account-stop-limit-start)
    * [get_account](#get_account-account)
    * [get_account_id](#get_account_id-account)
    * [get_account_addresses](#get_account_addresses-account-from-limit)
    * [get_account_by_address](#get_account_by_address-address)
    * [get_evm_addresses](#get_evm_addresses-account)
    * [get_account_address_by_label](#get_account_address_by_label-account-label)
    * [register_account](#register_account-name-active-echorand-key-registrar-account-evm-address-broadcast)
    * [register_account_with_api](#register_account_with_api-name-active_key-echorand_key-evm_address)
    * [create_account_with_brain_key](#create_account_with_brain_key-brain_key-account_name-registrar_account-evm_address-broadcast-save_wallet)
    * [generate_account_address](#generate_account_address-owner_account-label-broadcast)
    * [whitelist_account](#whitelist_account-authorizing_account-account_to_list-new_listing_status-broadcast)
    * [update_account](#update_account-account-new_options-broadcast-new_active-new_echorand_key)
    * [get_account_address_history](#get_account_address_history-address-start-stop-limit)
    * [get_account_history_operations](#get_account_history_operations-account-operation_id-start-stop-limit)
    * [register_evm_address](#register_evm_address-owner-evm_address-broadcast)
)
* Keys
    * [import_key](#import_key-account_name_or_id-priv_key)
    * [create_eddsa_keypair](#create_eddsa_keypair)
    * [get_private_key](#get_private_key-pubkey)
    * [is_public_key_registered](#is_public_key_registered-public_key)
    * [suggest_brain_key](#suggest_brain_key)
    * [normalize_brain_key](#normalize_brain_key-brain-key)
    * [derive_keys_from_brain_key](#derive_keys_from_brain_key-brain_key-number_of_desired_keys)
    * [dump_private_keys](#dump_private_keys)
* Password & lock
    * [is_new](#is_new)
    * [is_locked](#is_locked)
    * [lock](#lock)
    * [unlock](#unlock-password)
    * [set_password](#set_password-password)
    * [exit](#exit)
* Wallet file
    * [load_wallet_file](#load_wallet_file-wallet_filename)
    * [save_wallet_file](#save_wallet_file-wallet_filename)
    * [set_wallet_filename](#set_wallet_filename-wallet_filename)
    * [get_wallet_filename](#get_wallet_filename)
* Balances
    * [import_balance](#import_balance-account-broadcast-private_keys)
    * [list_account_balances](#list_account_balances-account)
    * [list_id_balances](#list_id_balances-id)
    * [get_vesting_balances](#get_vesting_balances-account)
    * [withdraw_vesting](#withdraw_vesting-account-amount-asset_symbol-broadcast)
    * [transfer](#transfer-from-to-amount-asset_symbol-broadcast)
    * [list_frozen_balances](#list_frozen_balances-account)
    * [get_committee_frozen_balance](#get_committee_frozen_balance-owner_account)
    * [freeze_balance](#freeze_balance-account-amount-asset-duration-broadcast)
    * [request_unfreeze_balance](#request_unfreeze_balance-account-objects_to_unfreeze-broadcast)
    * [committee_freeze_balance](#committee_freeze_balance-owner_account-amount-broadcast)
    * [committee_withdraw_balance](#committee_withdraw_balance-owner_account-amount-broadcast)
    * [transfer_to_address](#transfer_to_address-from-address-amount-asset_symbol-broadcast)
    * [create_vesting_linear_policy](#create_vesting_linear_policy-creator-owner-amount-asset_symbol-begin_timestamp-vesting_cliff_seconds-vesting_duration_seconds-broadcast)
    * [create_vesting_cdd_policy](#create_vesting_cdd_policy-creator-owner-amount-asset_symbol-start_claim-vesting_second-broadcast)
* Assets
    * [list_assets](#list_assets-lowerbound-limit)
    * [create_asset](#create_asset-issuer-symbol-precision-asset_opts-bitasset_opts-broadcast)
    * [update_asset](#update_asset-symbol-new_issuer-new_options-broadcast)
    * [update_bitasset](#update_bitasset-symbol-new_options-broadcast)
    * [update_asset_feed_producers](#update_asset_feed_producers-symbol-new_feed_producers-broadcast)
    * [publish_asset_feed](#publish_asset_feed-publishing_account-symbol-core_exchange_rate-broadcast)
    * [issue_asset](#issue_asset-to_account-amount-symbol-broadcast)
    * [get_asset](#get_asset-asset_name_or_id)
    * [get_asset_id](#get_asset_id-asset_name)
    * [get_bitasset_data](#get_bitasset_data-asset_name_or_id)
    * [fund_asset_fee_pool](#fund_asset_fee_pool-from-symbol-amount-broadcast)
    * [reserve_asset](#reserve_asset-from-amount-symbol-broadcast)
* Committee members
    * [create_committee_member](#create_committee_member-owner_account-url-amount-eth_address-btc_public_key-broadcast)
    * [update_committee_member](#update_committee_member-owner_account-committee_member-new_url-new_eth_address-new_btc_public_key-broadcast)
    * [create_activate_committee_member_proposal](#create_activate_committee_member_proposal-sender-committee_to_activate-expiration_time)
    * [create_deactivate_committee_member_proposal](#create_deactivate_committee_member_proposal-sender-committee_to_activate-expiration_time)
    * [list_committee_members](#list_committee_members-lowerbound-limit)
    * [get_committee_member](#get_committee_member-owner_account)
* Globals
    * [get_chain_properties](#get_chain_properties)
    * [get_global_properties](#get_global_properties)
    * [get_dynamic_global_properties](#get_dynamic_global_properties)
    * [propose_parameter_change](#propose_parameter_change-proposing_account-expiration_time-changed_values)
    * [propose_fee_change](#propose_fee_change-proposing_account-expiration_time-changed_values)
    * [approve_proposal](#approve_proposal-fee_paying_account-proposal_id-delta-broadcast)
    * [get_current_incentives_info](#get_current_incentives_info)
    * [get_incentives_info](#get_incentives_info-start_block-end_block)
* Contracts
    * [get_contract_object](#get_contract_object-id)
    * [get_contract](#get_contract-id)
    * [get_contract_result](#get_contract_result-id)
    * [get_contract_history](#get_contract_history-contract_id-limit)
    * [get_relative_contract_history](#get_relative_contract_history-contract_id-stop-limit-start)
    * [create_contract](#create_contract-registrar_account-code-amount-asset_type-supported_asset_id-eth_accuracy)
    * [call_contract](#call_contract-registrar_account-receiver-code-amount-asset_type)
    * [call_contract_no_changing_state](#call_contract_no_changing_state-contract_id-registrar_account-asset_type-code)
* Contract pool    
    * [get_contract_pool_balance](#get_contract_pool_balance-id)
    * [get_contract_pool_whitelist](#get_contract_pool_whitelist-id)
    * [contract_fund_fee_pool](#contract_fund_fee_pool-registrar_account-receiver-value-broadcast)
    * [whitelist_contract_pool](#whitelist_contract_pool-registrar_account-contract_id-add_to_whitelist-add_to_blacklist-rm_whitelist-rm_blacklist-broadcast)
* Network
    * [network_add_nodes](#network_add_nodes-nodes)
    * [network_get_connected_peers](#network_get_connected_peers)
* Sidechain
    * [get_account_deposits](#get_account_deposits-account-type)
    * [get_account_withdrawals](#get_account_withdrawals-account-type)
* Sidechain-Ethereum
    * [get_eth_address](#get_eth_address-account)
    * [create_eth_address](#create_eth_address-account-broadcast)
    * [withdraw_eth](#withdraw_eth-account-eth_addr-value-broadcast)
    * [propose_eth_update_contract_address](#propose_eth_update_contract_address-sender-expiration_time-new_addr)
* Sidechain-ERC20
    * [get_erc20_token](#get_erc20_token-eth_addr_or_id)
    * [check_erc20_token](#check_erc20_token-id)
    * [get_erc20_account_deposits](#get_erc20_account_deposits-account)
    * [get_erc20_account_withdrawals](#get_erc20_account_withdrawals-account)
    * [register_erc20_token](#register_erc20_token-account-eth_addr-name-symbol-decimals-broadcast)
    * [withdraw_erc20_token](#withdraw_erc20_token-account-to-erc20_token-value-broadcast)
    * [propose_register_asset_in_sidechain](#propose_register_asset_in_sidechain-proposing_account-expiration_time-erc20_data-broadcast)
    * [transfer_to_eth_erc20](#transfer_to_eth_erc20-account-to-amount-asset_symbol-broadcast)
* Sidechain-Bitcoin
    * [create_btc_address](#create_btc_address-account-broadcast)
    * [get_btc_address](#get_btc_address-account)
    * [get_btc_deposit_script](#get_btc_deposit_script-address)
    * [withdraw_btc](#withdraw_btc-account-btc_addr-value-broadcast)
    * [create_btc_stake_address](#create_btc_stake_address-account-user_pubkey-broadcast)
    * [get_btc_stake_address](#get_btc_stake_address-account)
* Transaction Builder
    * [begin_builder_transaction](#begin_builder_transaction)
    * [add_operation_to_builder_transaction](#add_operation_to_builder_transaction-transaction_handle-op)
    * [replace_operation_in_builder_transaction](#replace_operation_in_builder_transaction-handle-operation_index-new_op)
    * [set_fees_on_builder_transaction](#set_fees_on_builder_transaction-handle-fee_asset)
    * [preview_builder_transaction](#preview_builder_transaction-handle)
    * [sign_builder_transaction](#sign_builder_transaction-transaction_handle-broadcast)
    * [propose_builder_transaction](#propose_builder_transaction-handle-expiration-review_period_seconds)
    * [propose_builder_transaction2](#propose_builder_transaction2-handle-account-expiration-review_period_seconds)
    * [remove_builder_transaction](#remove_builder_transaction-handle)
    * [get_prototype_operation](#get_prototype_operation-operation_type)

{% hint style="warning" %}
Verifiable Credentials is now in the development stage.
{% endhint %}

* Verifiable Credentials
    * [add_verifiable_credential](#add_verifiable_credential-keyword-verifiable_cred)
    * [get_verifiable_credential_keywords](#get_verifiable_credential_keywords)
    * [get_verifiable_credential](#get_verifiable_credential-keyword)
    * [get_all_verifiable_credentials](#get_all_verifiable_credentials)
    * [get_did_object_key](#get_did_object_key-id_string)
    * [get_verifiable_presentation](#get_verifiable_presentation-keywords)
    * [validate_verifiable_presentation](#validate_verifiable_presentation-presentation)
    * [validate_verifiable_credential](#validate_verifiable_credential-credential)

## Info and help

### `info`
Returns info about current chain and active committee members.

```
info
```

### `about`
Returns info such as client version, git version of graphene/fc, version of boost, openssl.

```
about
```

### `help`
Returns a list of all commands supported by the wallet API or detailed help on a single command.

This lists each command, along with its arguments and return types.

| Option | Description |
| :--- | :--- |
| `string method` | (Optional) method the name of the API command for more detailed help |

```
help
help get_object
```

## Objects

### `get_object object_id`
Returns the blockchain object corresponding to the given id.

| Option | Description |
| :--- | :--- |
| `triplet object_id` | the id of the object to return |

```
get_object 1.2.0
```

## Blocks and transactions

### `get_block block_num`
Retrieve a full, signed block.

| Option | Description |
| :--- | :--- |
| `number block_num` | height of the block to be returned |

```
get_block 10
```

### `get_block_virtual_ops block_num`
Get virtual ops from the block.

| Option | Description |
| :--- | :--- |
| `number block_num` | height of the block to be returned |

```
get_block_virtual_ops 10
```

### `get_transaction_id tx`
This method is used to convert a JSON transaction to its transaction ID.

| Option | Description |
| :--- | :--- |
| `string tx` | signed transaction |

```
get_transaction_id JSON_transaction
```

### `get_transaction block_num tx_index`
This method is to get transaction by index in block

| Option | Description |
| :--- | :--- |
| `number block_num` | number of block with transaction |
| `number tx_index` | transaction index in block |

### `get_transaction_by_id tx_id`

This method is to get transaction by index in block

| Option | Description |
| :--- | :--- |
| `ripemd160 tx_id` | id of transaction to get |

### `serialize_transaction tx`
Converts a signed_transaction in JSON form to its binary representation.

| Option | Description |
| :--- | :--- |
| `string tx` | the transaction to serialize |

```
serialize_transaction JSON_transaction
```

### `sign_transaction tx broadcast`
Signs a transaction. Given a fully-formed transaction that is only lacking signatures, this signs the transaction with the necessary keys and std::optionally broadcasts the transaction.

| Option | Description |
| :--- | :--- |
| `string tx` | the unsigned transaction |
| `bool broadcast` | true if you want to broadcast the transaction |

```
sign_transaction JSON_transaction true
```

## Accounts

### `get_account_count`
Returns the number of accounts registered on the blockchain.

```
get_account_count
```

### `list_my_accounts`
Lists all accounts controlled by this wallet. This returns a list of the full account objects for all accounts whose private keys we possess.

```
list_my_accounts
```

### `list_accounts lowerbound limit`
Lists all accounts registered in the blockchain. This returns a list of all account names and their account ids, sorted by account name.

Use the `lowerbound` and limit parameters to page through the list. To retrieve all accounts, start by setting `lowerbound` to the empty string `""`, and then each iteration, pass the last account name returned as the `lowerbound` for the next `list_accounts` call.

Returns a list of accounts mapping account names to account ids.

| Option | Description |
| :--- | :--- |
| `string lowerbound` | the name of the first account to return. If the named account does not exist, the list will start at the account that comes after `lowerbound` |
| `number limit` | the maximum number of accounts to return (max: 1000) |

```
list_accounts nathan 10
```

### `get_account_history account limit`
Returns the most recent operations on the named account. This returns a list of operation history objects, which describe activity on the account.

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the account |
| `number limit` | the number of entries to return (starting from the most recent) |

```
get_account_history nathan 10
```

### `get_relative_account_history account stop limit start`
Returns the relative operations on the named account from start number.

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the account |
| `number stop` | sequence number of earliest operation |
| `number limit` | the number of entries to return |
| `number start` | the sequence number where to start looping back throw the history |

```
get_relative_account_history nathan 0 10 20
```

### `get_account account`
Returns information about the given account.

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the account to provide information about |

```
get_account nathan
get_account 1.2.26
```

### `get_account_id account`
Lookup the id of a named account.

| Option | Description |
| :--- | :--- |
| `string account` | the name of the account to look up |

```
get_account_id 1.2.26
```

### `get_account_addresses account from limit`
Get addresses owned by account in specified ids interval

| Option | Description |
| :--- | :--- |
| `string account`|  id or name of the account |
| `number from` | number of block to start retrieve from |
| `number limit` | maximum number of addresses to return |

```
get_account_addresses 1.2.26 0 10
get_account_addresses nathan 0 10
```

### `get_account_by_address address`
Get owner of specified address.

Returns account id of owner.

| Option | Description |
| :--- | :--- |
| `ripemd160 address` | address in form of ripemd160 hash |

```
get_account_by_address 8815c69de5d32d3061e52ca9386446332225b43d
```

### `get_evm_addresses account`
Get EVM addresses, if exist, for the given account id

| Option | Description |
| :--- | :--- |
| `string account` | id or name of the account |

```
get_evm_addresses nathan
get_evm_addresses 1.2.26
```

### `get_account_address_by_label account label`
Get account address by owner account and label

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the owner account |
| `string label` | the label of account address object |

```
get_account_address_by_label 1.2.26 primary
```

### `register_account name active echorand-key registrar-account evm-address broadcast`
Registers a third party's account on the blockckain.
This function is used to register an account for which you do not own the private keys. When acting as a registrar, an end user will generate their own private keys and send you the public keys. The registrar will use this function to register the account on behalf of the end user.

| Option | Description |
| :--- | :--- |
| `string name` | the name of the account, must be unique on the blockchain. Shorter names are more expensive to register; the rules are still in flux, but in general names of more than 8 characters with at least one digit will be cheap. |
| `public_key active` | the active key for a new account |
| `public_key echorand-key` | the echorand key for a new account |
| `string registrar-account`|  the account which will pay the fee to register the user |
| `eth_address evm_address` | (Optional) the ethereum address of the account or null |
| `bool broadcast` | true to broadcast the transaction on the network |

```
register_account new_acc ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu nathan E8fd4Db0C38d48493AD167A268683fAb7230a88A true
```

### `register_account_with_api name active_key echorand_key evm_address`
Request connected node to register account with provided name and keys.

| Option | Description |
| :--- | :--- |
| `string name` | the name of the account, must be unique on the blockchain. Shorter names are more expensive to register; the rules are still in flux, but in general names of more than 8 characters with at least one digit will be cheap.
| `public_key active-key` | the active key for a new account
| `public_key echorand-key` | the echorand key for a new account
| `eth_address_t evm_address` | evm address related to the account

``` 
register_account_with_api nathan ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu 517CF26a16127c4A58072FB7C24D1140F1b63A67
```


### `create_account_with_brain_key brain_key account_name registrar_account evm_address broadcast save_wallet`
Creates a new account and registers it on the blockchain.

| Option | Description |
| :--- | :--- |
| `string brain_key` | the brain key used for generating the account's private keys |
| `string account_name` | the name of the account, must be unique on the blockchain. Shorter names are more expensive to register; the rules are still in flux, but in general names of more than 8 characters with at least one digit will be cheap. |
| `string registrar_account` | the account which will pay the fee to register the user |
| `eth_address_t evm_address` | evm address related to the account |
| `bool broadcast` | true to broadcast the transaction on the network |
| `bool save_wallet` | whether to save the account to the wallet |

```
create_account_with_brain_key "brain_key" new_acc nathan 517CF26a16127c4A58072FB7C24D1140F1b63A67 true true
```

### `generate_account_address owner_account label broadcast`
Creates a transaction to generate account address.

| Option | Description |
| :--- | :--- |
| `string owner_account` | The account for which the address is generated. |
| `string label` | The label for address |
| `bool broadcast` | true if you want to broadcast the transaction |

```
generate_account_address nathan label true
```

### `whitelist_account authorizing_account account_to_list new_listing_status broadcast` 
Whitelist and blacklist accounts, primarily for transacting in whitelisted assets.

Accounts can freely specify opinions about other accounts, in the form of either whitelisting or blacklisting them. This information is used in chain validation only to determine whether an account is authorized to transact in an asset type which enforces a whitelist, but third parties can use this information for other uses as well, as long as it does not conflict with the use of whitelisted assets.

An asset which enforces a whitelist specifies a list of accounts to maintain its whitelist, and a list of accounts to maintain its blacklist. In order for a given account A to hold and transact in a whitelisted asset S, A must be whitelisted by at least one of S's whitelist_authorities and blacklisted by none of S's blacklist_authorities. If A receives a balance of S, and is later removed from the whitelist(s) which allowed it to hold S, or added to any blacklist S specifies as authoritative, A's balance of S will be frozen until A's authorization is reinstated.

| Option | Description |
| :--- | :--- |
| `string authorizing_account` | the account who is doing the whitelisting |
| `string account_to_list` | the account being whitelisted |
| `account_listing new_listing_status` | the new whitelisting status |
| `bool broadcast` | true to broadcast the transaction on the network |

```
whitelist_account nathan acc 0 true
```

### `update_account account new_options broadcast new_active new_echorand_key`
Update an existing account. It can be used to update the authorities, or adjust the options.
Returns the signed transaction updating the asset

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the account to update |
| `variant_object new_options` | object with options field to update. The new [account_options](/api-reference/echo-operations/types/common.md#account_options) object, which will entirely replace the existing options. |
| `bool broadcast` | true to broadcast the transaction on the network |
| `authority new_active`| (Optional) the new active [authority](/api-reference/echo-operations/types/common.md#authority). This can be updated by the current active authority. null if you don't want to change the authority |
| `public_key new_echorand_key`| (Optional) the new public echorand key, which will entirely replace the existing key. null if you don't want to change the echorand key |

```
update_account nathan {"delegating_account": "1.2.10", "delegate_share": "3000"} true null null
```

### `get_account_address_history address start stop limit`
Get all transfers about this address.

### Parameters

| Option | Description |
| :--- | :--- |
| `ripemd160 address` | the address whose history should be queried |
| `operation_history_id_type start` | id of the most recent operation to retrieve |
| `operation_history_id_type stop` | id of the earliest operation to retrieve |
| `unsigned limit` | maximum number of operations to retrieve \(must not exceed 100\) |

```
get_account_address_history f149bd2883b1179965bd6706092573be4d68fec8 1.6.67 1.6.0 100
```

### `register_evm_address owner evm_address broadcast`

Get operations relevant to the specified account.

### Parameters

| Option | Description |
| :--- | :--- |
| `string owner` | the id or name of the account to register address for |
| `eth_address_type evm_address` | address that will be associated with owner account id |
| `bool broadcast` | true to broadcast the transaction on the network |

```
get_account_history_operations 1.2.12 1 1.6.10 1.6.0 100
```

### `get_account_history_operations account operation_id start stop limit`
Get operations relevant to the specificed account.

### Parameters

| Option | Description |
| :--- | :--- |
| `string account` | the id or name of the account whose history should be queried |
| `uint64 operation_id` | the ID of the operation we want to get operations in the account |
| `operation_history_id_type start` | id of the most recent operation to retrieve |
| `operation_history_id_type stop` | id of the earliest operation to retrieve |
| `unsigned limit` | maximum number of operations to retrieve \(must not exceed 100\) |

```
get_account_history_operations 1.2.12 1 1.6.10 1.6.0 100
```

## Keys

### `import_key account_name_or_id priv_key`
Imports the private key for an existing account.
The private key must match either an owner key or an active key for the named account.

Returns true if the key was imported.

| Option | Description |
| :--- | :--- |
| `string account_name_or_id` | the account owning the key |
| `private_key priv_key` | the private key, should be input interactively |

```
import_key nathan private_key
```

### `create_eddsa_keypair`
Create new EdDSA keypair encoded in base58 for public key and WIF for private key.

```
create_eddsa_keypair
```

### `get_private_key pubkey`
Get the WIF private key corresponding to a public key. The private key must already be in the wallet.

| Option | Description |
| :--- | :--- |
| `public_key pubkey` | eddsa public key |

```
get_private_key ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu
```

### `is_public_key_registered public_key`
Determine whether a textual representation of a public key (in Base-58 format) is *currently* linked to any account on the blockchain 

Returns true whether a public key is known.

| Option | Description |
| :--- | :--- |
| `public_key public_key` | public key |

```
is_public_key_registered ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu
```

### `suggest_brain_key`
Suggests a safe brain key to use for creating your account. [create_account_with_brain_key](#create_account_with_brain_key-brain_key-account_name-registrar_account-evm_address-broadcast-save_wallet) requires you to specify a 'brain key', a long passphrase that provides enough entropy to generate cyrptographic keys. This function will suggest a suitably random string that should be easy to write down (and, with effort, memorize).

```
suggest_brain_key
```

### `normalize_brain_key brain-key`
Transforms a brain key to reduce the chance of errors when re-entering the key from memory.

This takes a user-supplied brain key and normalizes it into the form used for generating private keys. In particular, this upper-cases all ASCII characters and collapses multiple spaces into one.

Returns the brain key in its normalized form

| Option | Description |
| :--- | :--- |
| `string brain-key` | the brain key as supplied by the user |

```
normalize_brain_key brain_key
```

### `derive_keys_from_brain_key brain_key number_of_desired_keys`
Derive any number of *possible* owner keys from a given brain key.

Returns a list of keys that are deterministically derived from the brainkey

NOTE: These keys may or may not match with the owner keys of any account. This function is merely intended to assist with account or key recovery.

| Option | Description |
| :--- | :--- |
| `string brain_key` | brain key |
| `number number_of_desired_keys` | number of desired keys |

```
derive_keys_from_brain_key brain_key 1
```

### `dump_private_keys`
Dumps all private keys owned by the wallet.  
The keys are printed in WIF format. You can import these keys into another wallet using `import_key`.  
Returns a map containing the private keys, indexed by their public key

```
dump_private_keys
```

## Password & lock

### `is_new`
Checks whether the wallet has just been created and has not yet had a password set.
Calling `set_password` will transition the wallet to the locked state.

Returns `true` if the wallet is new.

```
is_new
```

### `is_locked`
Checks whether the wallet is locked (is unable to use its private keys).
This state can be changed by calling `lock` or `unlock`.

Returns `true` if the wallet in locked.

```
is_locked
```

### `lock`
Locks the wallet immediately.

```
lock
```

### `unlock password`
Unlocks the wallet.
The wallet remain unlocked until the `lock` is called or the program exits. 

| Option | Description |
| :--- | :--- |
| `string password` | the password previously set with `set_password`, in the wallet it should be input interactively |

```
unlock some_password
```

### `set_password password`
Sets a new password on the wallet.
The wallet must be either 'new' or 'unlocked' to execute this command. 

| Option | Description |
| :--- | :--- |
| `string password` | the password, should be input automatically in the wallet |

```
set_password your_password
```

### `exit` 
Exit from wallet

```
exit
```

## Wallet file

### `load_wallet_file wallet_filename`
Loads a specified Graphene wallet.
The current wallet is closed before the new wallet is loaded.
This does not change the filename that will be used for future wallet writes, so this may cause you to overwrite your original wallet unless you also call `set_wallet_filename`
Returns true if the specified wallet is loaded

| Option | Description |
| :--- | :--- |
| `string wallet_filename` | the filename of the wallet JSON file to load. If `wallet_filename` is empty, it reloads the existing wallet file |

```
load_wallet_file wallet.json
```

### `save_wallet_file wallet_filename`
Saves the current wallet to the given filename.
This does not change the wallet filename that will be used for future writes, so think of this function as 'Save a Copy As...' instead of 'Save As...'. Use `set_wallet_filename` to make the filename persist. 

| Option | Description |
| :--- | :--- |
| `string wallet_filename` | the filename of the new wallet JSON file to create or overwrite. If `wallet_filename` is empty, save to the current filename. |

```
save_wallet_file wallet.json
```

### `set_wallet_filename wallet_filename`
Sets the wallet filename used for future writes.
This does not trigger a save, it only changes the default filename that will be used the next time a save is triggered.

| Option | Description |
| :--- | :--- |
| `string wallet_filename` | the new filename to use for future saves. |

```
set_wallet_filename wallet.json
```

### `get_wallet_filename`
This is the filename that will be used when automatically saving the wallet.

Returns the current wallet filename.

```
get_wallet_filename
```

## Balances

### `import_balance account broadcast private_keys`

This call will construct transaction(s) that will claim all balances controled by wif_keys and deposit them into the given account. wif_key should be input interactively

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the account owning the key |
| `bool broadcast` | true to broadcast the transaction on the network |
| `listprivate_key private_keys` | array of eddsa private keys |

```
import_balance nathan true [ private_keys ]
```

### `list_account_balances account`
List the balances of an account. Each account can have multiple balances, one for each type of asset owned by that account. The returned list will only contain assets for which the account has a nonzero balance.  
Returns a list of the given account's balances

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the account whose balances you want |

```
list_account_balances nathan
list_account_balances 1.2.26
```

### `list_id_balances id`
List the balances of an account or a contract.

| Option | Description |
| :--- | :--- |
| `string id` | the id of either an account or a contract |

```
list_id_balances 1.11.0
list_id_balances 1.2.26
```

### `list_frozen_balances account`
List frozen balances of an account.

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the account whose balances you want |

```
list_frozen_balances nathan
list_frozen_balances 1.2.26
```

### `get_committee_frozen_balance owner_account`
List frozen balances of an committee member account.

| Option | Description |
| :--- | :--- |
| `string owner_account` | the name or id of the committee members account whose balances you want |

```
get_committee_frozen_balance nathan
get_committee_frozen_balance 1.2.26
```

### `freeze_balance account amount asset duration broadcast`
Freezes part of your balance for the specified amount of time.

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the balance holder |
| `string amount` | the amount of asset to freeze |
| `string asset` | the name of asset you want to freeze |
| `number duration` | duration of freeze in days |
| `bool broadcast` | true to broadcast the transaction on the network |

```
freeze_balance nathan 1 ECHO 90 true
```

### `request_unfreeze_balance account objects_to_unfreeze broadcast`
Request to unfreeze your frozen balance's.

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of the balance holder |
| `vector objects_to_unfreeze` | the ids of the objects with frozen balance you want to unfreeze which you can get from method list_frozen_balances |
| `bool broadcast` | true to broadcast the transaction on the network |

```
request_unfreeze_balance nathan ["1.9.1", "1.9.2"] true
```

### `committee_freeze_balance owner_account amount broadcast`
Freezes balance required for committee members to operate.

| Option | Description |
| :--- | :--- |
| `string owner_account` | the name or id of the committee member account |
| `number amount` | the amount of asset to freeze |
| `bool broadcast` | true to broadcast the transaction on the network |

```
committee_freeze_balance nathan 10 true
```

### `committee_withdraw_balance owner_account amount broadcast`
Withdraws part of frozen committee members balance.

| Option | Description |
| :--- | :--- |
| `string owner_account` | the name or id of the committee member account |
| `number amount` | the amount of frozen committee balance to withdraw |
| `bool broadcast` | true to broadcast the transaction on the network |

```
committee_withdraw_balance nathan 1 true
```

### `transfer_to_address from address amount asset_symbol broadcast`
Transfer an amount from one account to address.

| Option | Description |
| :--- | :--- |
| `string from` | the name or id of the account sending the funds |
| `ripemd160 address` | the address of the account receiving the funds in form of ripemd160 hash |
| `string amount` | the amount to send (in nominal units -- to send half of a ECHO, specify 0.5) |
| `string asset_symbol` | the symbol or id of the asset to send |
| `bool broadcast` | true to broadcast the transaction on the network |

```
transfer_to_address 1.2.0 f149bd2883b1179965bd6706092573be4d68fec8 10 ECHO true
```

### `create_vesting_linear_policy creator owner amount asset_symbol begin_timestamp vesting_cliff_seconds vesting_duration_seconds broadcast`
Create a vesting balance with linear policy.

| Option | Description |
| :--- | :--- |
| `string creator` | the account name or id of vesting creator |
| `string owner` | the account name or id of vesting creator |
| `string amount` | the amount to create vesting |
| `string asset_symbol` | the symbol of the asset to create vesting |
| `time_point begin_timestamp` | begin timestamp |
| `number vesting_cliff_seconds` | the vesting cliff seconds |
| `number vesting_duration_seconds` | the vesting duration seconds |
| `bool broadcast` | true to broadcast the transaction on the network |

```
create_vesting_linear_policy nathan nathan 10 ECHO "2093-12-11T10:26:00" 10 10 true
```

### `create_vesting_cdd_policy creator owner amount asset_symbol start_claim vesting_second broadcast`
Create a vesting balance with cdd policy.

| Option | Description |
| :--- | :--- |
| `string creator` | the account name or id of vesting creator |
| `string owner` | the account name or id of vesting creator |
| `string amount` | the amount to create vesting |
| `string asset_symbol` | the symbol of the asset to create vesting |
| `time_point start_claim` | start claim |
| `number vesting_seconds` | the vesting duration seconds |
| `bool broadcast` | true to broadcast the transaction on the network |

```
create_vesting_cdd_policy nathan nathan 10 ECHO "2093-12-11T10:26:00" 10 true
```

### `get_vesting_balances account` 
Get information about a vesting balance object.

| Option | Description |
| :--- | :--- |
| `string account` | account name or account ID or vesting balance object ID. |

```
get_vesting_balances nathan
get_vesting_balances 1.2.26
```

### `withdraw_vesting account amount asset_symbol broadcast`
Withdraw a vesting balance.

| Option | Description |
| :--- | :--- |
| `string account` | the account id or name or vesting balance ID type. |
| `string amount` | the amount to withdraw. |
| `string asset_symbol` | the symbol of the asset to withdraw. |
| `bool broadcast` | true if you want to broadcast the transaction |

```
withdraw_vesting nathan 10 ECHO true
```

### `transfer from to amount asset_symbol broadcast`
Transfer an amount from one account to another.
Returns the signed transaction transferring funds

| Option | Description |
| :--- | :--- |
| `string from` | the name or id of the account sending the funds |
| `string to` | the name or id of the account receiving the funds |
| `string amount` | the amount to send (in nominal units  to send half of a BTS, specify 0.5) |
| `string asset_symbol` | the symbol or id of the asset to send |
| `bool broadcast` | true to broadcast the transaction on the network |

```
transfer 1.2.0 1.2.1 10 ECHO true
transfer nathan alice 10 EBTC true
```

## Assets

### `list_assets lowerbound limit`
Lists all assets registered on the blockchain.
To list all assets, pass the empty string `""` for the lowerbound to start at the beginning of the list, and iterate as necessary.

Returns the list of asset objects, ordered by symbol

| Option | Description |
| :--- | :--- |
| `string lowerbound` | the symbol of the first asset to include in the list. |
| `number limit` | the maximum number of assets to return (max: 100) |

```
list_assets ECHO 10
list_assets "" 10
```

### `create_asset issuer symbol precision asset_opts bitasset_opts broadcast`
Creates a new user-issued or market-issued asset.
Many options can be changed later using `update_asset`.
Right now this function is difficult to use because you must provide raw JSON data structures for the options objects, and those include prices and asset ids.

Returns the signed transaction creating a new asset

| Option | Description |
| :--- | :--- |
| `string issuer` | the name or id of the account who will pay the fee and become the issuer of the new asset. This can be updated later |
| `string symbol` | the ticker symbol of the new asset |
| `number precision` | the number of digits of precision to the right of the decimal point, must be less than or equal to 12 |
| `asset_options asset_opts` | asset options required for all new assets. Note that core_exchange_rate technically needs to store the asset ID of this new asset. Since this ID is not known at the time this operation is created, create this price as though the new asset has instance ID 1, and the chain will overwrite it with the new asset's ID. ([asset_options](/api-reference/echo-operations/types/common.md#asset_options)) |
| `bitasset_options bitasset_opts` | (Optional) options specific to BitAssets. This may be null unless the `market_issued` flag is set in common.flags. ([bitasset_options](/api-reference/echo-operations/types/common.md#bitasset_options)) |
| `bool broadcast` | true to broadcast the transaction on the network |

```
create_asset nathan myasset 10 {asset_opts} null true
```

### `update_asset symbol new_issuer new_options broadcast`
Update the core options on an asset. There are a number of options which all assets in the network use. These options are enumerated in the asset_object::asset_options struct. This command is used to update these options for an existing asset.  
This operation cannot be used to update BitAsset-specific options. For these options, `update_bitasset` instead.

Returns the signed transaction updating the asset

| Option | Description |
| :--- | :--- |
| `string symbol` | the name or id of the asset to update |
| `string new_issuer` | (Optional) if changing the asset's issuer, the name or id of the new issuer. null if you want to remain the issuer of the asset |
| `asset_options new_options` | the new asset_options object, which will entirely replace the existing options. |
| `bool broadcast` | true to broadcast the transaction on the network |

```
update_asset myasset nathan {asset_opts} true
```

### `update_bitasset symbol new_options broadcast`
Update the options specific to a BitAsset.
BitAssets have some options which are not relevant to other asset types. This operation is used to update those options an an existing BitAsset.

Returns the signed transaction updating the bitasset

| Option | Description |
| :--- | :--- |
| `string symbol` | the name or id of the asset to update, which must be a market-issued asset |
| `bitasset_options new_options` | the new bitasset_options object, which will entirely replace the existing options. |
| `bool broadcast` | true to broadcast the transaction on the network |

```
update_bitasset myasset {bitasset_opts} true
```

### `update_asset_feed_producers symbol new_feed_producers broadcast`
Update the set of feed-producing accounts for a BitAsset.
BitAssets have price feeds selected by taking the median values of recommendations from a set of feed producers. This command is used to specify which accounts may produce feeds for a given BitAsset. 

Returns the signed transaction updating the bitasset's feed producers

| Option | Description |
| :--- | :--- |
| `string symbol` | the name or id of the asset to update |
| `liststring new_feed_producers` | a list of account names or ids which are authorized to produce feeds for the asset. this list will completely replace the existing list |
| `bool broadcast` | true to broadcast the transaction on the network |

```
update_asset_feed_producers UIA [nathan, foobar] true
```

### `publish_asset_feed publishing_account symbol core_exchange_rate broadcast`
Publishes a price feed for the named asset.
Price feed providers use this command to publish their price feeds for market-issued assets. A price feed is used to tune the market for a particular market-issued asset. For each value in the feed, the median across all committee_member feeds for that asset is calculated and the market for the asset is configured with the median of that value.  
The feed object in this command contains three prices: a call price limit, a short price limit, and a settlement price. The call limit price is structured as (collateral asset) / (debt asset) and the short limit price is structured as (asset for sale) / (collateral asset). Note that the asset IDs are opposite to eachother, so if we're publishing a feed for USD, the call limit price will be ECHO/USD and the short limit price will be USD/ECHO. The settlement price may be flipped either direction, as long as it is a ratio between the market-issued asset and its collateral.

Returns the signed transaction updating the price feed for the given asset

| Option | Description |
| :--- | :--- |
| `string publishing_account` | the account publishing the price feed |
| `string symbol` | the name or id of the asset whose feed we're publishing |
| `price core_exchange_rate` | the price object containing price making up the feed |
| `bool broadcast` | true to broadcast the transaction on the network |

```
publish_asset_fee nathan myasset {price} true
```

### `issue_asset to_account amount symbol broadcast`
Issue new shares of an asset.

Returns the signed transaction issuing the new shares

| Option | Description |
| :--- | :--- |
| `string to_account` | the name or id of the account to receive the new shares |
| `string amount` | the amount to issue, in nominal units |
| `string symbol` | the ticker symbol of the asset to issue |
| `bool broadcast` | true to broadcast the transaction on the network |

```
issue_asset nathan 10 myasset true
```

### `get_asset asset_name_or_id`
Returns information about the given asset.

| Option | Description |
| :--- | :--- |
| `string asset_name_or_id` | the symbol or id of the asset in question |

```
get_asset ECHO
```

### `get_asset_id asset_name`
Lookup the id of a named asset.

| Option | Description |
| :--- | :--- |
| `string asset_name` | the symbol of an asset to look up |

```
get_asset_id ECHO
```

### `get_bitasset_data asset_name_or_id`
Returns the BitAsset-specific data for a given asset. Market-issued assets's behavior are determined both by their "BitAsset Data" and their basic asset data, as returned by `get_asset`.

| Option | Description |
| :--- | :--- |
| `string asset_name_or_id` | the symbol or id of the BitAsset in question |

```
get_bitasset_data ECHO
```

### `fund_asset_fee_pool from symbol amount broadcast`
Pay into the fee pool for the given asset.
User-issued assets can fc::optionally have a pool of the core asset which is automatically used to pay transaction fees for any transaction using that asset (using the asset's core exchange rate).  
This command allows anyone to deposit the core asset into this fee pool.

Returns the signed transaction funding the fee pool

| Option | Description |
| :--- | :--- |
| `string from` | the name or id of the account sending the core asset |
| `string symbol` | the name or id of the asset whose fee pool you want to fund |
| `string amount` | the amount of the core asset to deposit |
| `bool broadcast` | true to broadcast the transaction on the network |

```
fund_asset_fee_pool nathan myasset 10 true
```

### `reserve_asset from amount symbol broadcast`
Burns the given user-issued asset.
This command burns the user-issued asset to reduce the amount in circulation. you cannot burn market-issued assets. 

Returns the signed transaction burning the asset

| Option | Description |
| :--- | :--- |
| `string from` | the account containing the asset you want to burn |
| `string amount` | the amount to burn, in nominal units |
| `string symbol` | the name or id of the asset to burn |
| `bool broadcast` | true to broadcast the transaction on the network |

```
reserve_asset nathan 10 ECHO true
```

## Committee members

### `create_committee_member owner_account url amount eth_address btc_public_key broadcast`
Creates a committee_member object owned by the given account.
An account can have at most one committee_member object.

Returns the signed transaction registering a committee_member

| Option | Description |
| :--- | :--- |
| `string owner_account` | the name or id of the account which is creating the committee_member |
| `string url` | a URL to include in the committee_member record in the blockchain. Clients may display this when showing a list of committee_members. May be blank. |
| `string amount` | amount of ECHO asset to freeze |
| `string eth_address` | address of the account in the ethereum network |
| `string btc_public_key` | public key of the account in the bitcoin network |
| `bool broadcast` | true to broadcast the transaction on the network |

```
create_committee_member nathan example.com 1000 E8fd4Db0C38d48493AD167A268683fAb7230a88A 02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e true
```

### `update_committee_member owner_account committee_member new_url new_eth_address new_btc_public_key broadcast`
Updates a committee_member object owned by the given account.

Returns the signed transaction updating a committee_member.

| Option | Description |
| :--- | :--- |
| `string owner_account` | the name or id of the account which is updating the committee_member |
| `string new_url` | (Optional) a new URL of the committee_member_object, enter empty string if you don't want to change it |
| `string new_eth_address` | (Optional) a new ethereum address of the committee_member object, enter empty string if you don't want to change it |
| `string new_btc_public_key` | (Optional) a new bitcoin public key of the committee_member object, enter empty string if you don't want to change it |
| `bool broadcast` | true to broadcast the transaction on the network |

```
update_committee_member nathan new_url E8fd4Db0C38d48493AD167A268683fAb7230a88A 02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e true
```

### `create_activate_committee_member_proposal sender committee_to_activate expiration_time`
Creates a proposal to activate given commitee.
An account can have at most one committee_member object.

Returns the signed transaction registering a committee_member

| Option | Description |
| :--- | :--- |
| `string sender` | the name or id of the account which is creating proposal |
| `triplet committee_to_activate` | a committee member |
| `time_point expiration_time` | expiration time of created proposal |

```
create_activate_committee_member_proposal nathan 1.4.0 1970-01-01T00:00:00
```

### `create_deactivate_committee_member_proposal sender committee_to_activate expiration_time)`
Creates a proposal to deactivate given commitee.
An account can have at most one committee_member object.

Returns the signed transaction registering a committee_member

| Option | Description |
| :--- | :--- |
| `string sender` | the name or id of the account which is creating proposal |
| `triplet committee_to_activate` | a committee member |
| `time_point expiration_time` | expiration time of created proposal |

```
create_deactivate_committee_member_proposal nathan 1.4.0 1970-01-01T00:00:00
```

### `list_committee_members lowerbound limit`
Lists all committee_members registered in the blockchain. This returns a list of all account names that own committee_members, and the associated committee_member id, sorted by name. This lists committee_members whether they are currently voted in or not.

Use the `lowerbound` and limit parameters to page through the list. To retrieve all committee_members, start by setting `lowerbound` to the empty string `""`, and then each iteration, pass the last committee_member name returned as the `lowerbound` for the next `list_committee_members` call.

| Option | Description |
| :--- | :--- |
| `string lowerbound` | the name of the first committee_member to return. If the named committee_member does not exist, the list will start at the committee_member that comes after `lowerbound`|
| `number limit` | the maximum number of committee_members to return (max: 1000) |

```
list_committee_members 1.4.0 10
```

### `get_committee_member owner_account`
Returns information about the given committee_member.

| Option | Description |
| :--- | :--- |
| `string owner_account` | the name or id of the committee_member account owner, or the id of the committee_member |

```
get_committee_member nathan
get_committee_member 1.2.26
```

## Globals

### `get_chain_properties`
Retrieve the chain_property_object associated with the chain

```
get_chain_properties
```

### `get_global_properties`
Returns the block chain's slowly-changing settings. This object contains all of the properties of the blockchain that are fixed or that change only once per maintenance interval (daily) such as the current list of committee_members, block interval, etc.  
**See also**: `get_dynamic_global_properties` for frequently changing properties.

```
get_global_properties
```

### `get_dynamic_global_properties`
Returns the block chain's rapidly-changing properties. The returned object contains information that changes every block interval such as the head block number, etc.  
**See also**: `get_global_properties` for less-frequently changing properties

```
get_dynamic_global_properties
```

### `get_git_revision`
Returns information about git revision of the running node. The returned object contains commit hash, approximate relative time of commit and revision description.

```
get_git_revision
```

### `propose_parameter_change proposing_account expiration_time changed_values`
Creates a transaction to propose a parameter change.  
Multiple parameters can be specified if an atomic change is desired.

Returns the signed transaction with new global parameters and proposal id.

| Option | Description |
| :--- | :--- |
| `string proposing_account` | the account paying the fee to propose the tx |
| `time_point expiration_time` | timestamp specifying when the proposal will either take effect or expire. |
| `string changed_values` | the values to change; all other chain parameters are filled in with default values |

```
propose_parameter_change 1.2.6 "2093-12-11T10:26:00" { "sidechain_config" : { "eth_committee_update_method" : { "method" : "ffffffff" } } }
```

### `propose_fee_change proposing_account expiration_time changed_values`
Propose a fee change.

Returns the signed transaction with new global parameters and proposal id.

| Option | Description |
| :--- | :--- |
| `string proposing_account` | the account paying the fee to propose the tx |
| `time_point expiration_time` | timestamp specifying when the proposal will either take effect or expire. |
| `string changed_values` | map of operation type to new fee. Operations may be specified by name or ID. The "scale" key changes the scale. All other operations will maintain current values. |

```
propose_fee_change 1.2.6 "2014-12-11T12:42:00" { 59 : { "fee" :123 } }
propose_fee_change 1.2.6 "2122-12-11T07:53:00" { "sidechain_btc_intermediate_deposit" : { "fee" :123 } }
propose_fee_change 1.2.6 "2179-12-11T07:53:00" { "scale" : 1000 }
```

### `approve_proposal fee_paying_account proposal_id delta broadcast`
Approve or disapprove a proposal.

| Option | Description |
| :--- | :--- |
| `string fee_paying_account` | the account paying the fee for the op. |
| `string proposal_id` | the proposal to modify. |
| `approval_delta delta` | members contain approvals to create or remove. In JSON you can leave empty members undefined. |
| `bool broadcast` | true if you want to broadcast the transaction |

```
approve_proposal 1.2.6 1.5.0 {"active_approvals_to_add": ["1.2.6", "1.2.7", "1.2.8", "1.2.9", "1.2.10"],"active_approvals_to_remove": [],"key_approvals_to_add": [],"key_approvals_to_remove": []} true
```

### `get_current_incentives_info`
Returns information about incentives. The returned object contains incentives_pool that indicates amounts that stored in pool now and incentives per block for current interval.

```
get_current_incentives_info
```

### `get_incentives_info start_block end_block`
Retrieve the info about incentives in given block range [start_block, end_block]

| Option | Description |
| :--- | :--- |
| `uint64_t proposing_account` | number of start block |
| `uint64_t expiration_time` | number of end block |

```
get_incentives_info 5 100
get_incentives_info 100 100
```

## Contracts

### `get_contract_object id`
Get the contract object from the database by it's id.

| Option | Description |
| :--- | :--- |
| `triplet id` | the id of the contract |

```
get_contract_object 1.11.0
```

### `get_contract id`
Get the contract information by the contract's id

| Option | Description |
| :--- | :--- |
| `triplet id` | id of the contract |

```
get_contract 1.11.0
```

### `get_contract_result id`
Get the result of contract execution.

| Option | Description |
| :--- | :--- |
| `triplet id` | the id of the conract result |

```
get_contract_result 1.12.0
```

### `get_contract_history contract_id limit`
Returns the most recent operations on the contract id. This returns a list of operation history objects, which describe activity on the contract.

| Option | Description |
| :--- | :--- |
| `triplet contract_id` | the ID of the contract |
| `unsigned limit` | the number of entries to return (starting from the most recent) |

```
get_contract_history 1.11.0 10
```

### `get_relative_contract_history contract_id stop limit start`
Returns the relative operations on the id contract from start number.

| Option | Description |
| :--- | :--- |
| `triplet contract_id` | the ID of the contract |
| `uint32_t stop` | Sequence number of earliest operation |
| `unsigned limit` | the number of entries to return (starting from the most recent) |
| `uint32_t start` | the sequence number where to start looping back throw the history |

```
get_relative_contract_history 1.11.0 0 10 20
```

### `create_contract registrar_account code amount asset_type supported_asset_id eth_accuracy`
Upload/Create a contract.

Returns the signed transaction creating the contract

| Option | Description |
| :--- | :--- |
| `string registrar_account` | name of the account creating the contract |
| `string code` | code of the contract in hex format |
| `string amount` | the amount of asset transfered to the contract |
| `string asset_type` | the type of the asset transfered to the contract |
| `string supported_asset_id` | the asset that can be used to create/call the contract (see [Flag of supported asset](../../technologies/evm-support/README.md#flag-of-supported-asset)) |
| `bool eth_accuracy` | whether to use the ethereum asset accuracy (see [Flag of using Ethereum accuracy](../../technologies/evm-support/README.md#flag-of-using-ethereum-accuracy)) |

```
create_contract nathan code_contract 0 ECHO "" false
```

### `call_contract registrar_account receiver code amount asset_type`
Call a contract.

Returns the signed transaction calling the contract

| Option | Description |
| :--- | :--- |
| `string registrar_account` | name of the account calling the contract |
| `triplet receiver` | the id of the contract to call |
| `string code` | the hash of the method to call |
| `string amount` | the amount of asset transfered to the contract |
| `string asset_type` | the type of the asset transfered to the contract |

```
call_contract nathan 1.11.0 code_contract 0 ECHO
```

### `call_contract_no_changing_state contract_id registrar_account asset_type code`
Call the provided contract, but don't change the state.

Returns result of execution

| Option | Description |
| :--- | :--- |
| `triplet contract_id` | id of the contract |
| `string caller` | id of the account or contract that calls contract |
| `string amount` | amount in ECHO. 1 ECHO is 100000000 |
| `string asset_type` | the type of the asset transfered to the contract |
| `string code` | the hash of the method to call |

```
call_contract_no_changing_state 1.11.0 1.2.0 0 ECHO "6d4ce63c"
```

### `get_contract_pool_balance id`
Get contract's feepool balance.

| Option | Description |
| :--- | :--- |
| `triplet id` | for getting feepool balance. |

```
get_contract_pool_balance 1.11.0
```

### `get_contract_pool_whitelist id`
Get contract's whitelist and blacklist.

| Option | Description |
| :--- | :--- |
| `triplet id` | for getting whitelist and blacklist of feepool object. |

```
get_contract_pool_whitelist 1.11.0
```

### `contract_fund_fee_pool registrar_account receiver value broadcast`
Fund feepool of contract.

| Option | Description |
| :--- | :--- |
| `string registrar_account` | name of the account which fund contract's feepool |
| `triplet receiver` | the id of the contract's feepool |
| `number value` | the amount of asset transfered to the contract in default asset_id_type() |
| `bool broadcast` | whether to broadcast the fund contract operation to the network |

```
contract_fund_fee_pool nathan 1.11.0 0 true
```

### `whitelist_contract_pool registrar_account contract_id add_to_whitelist add_to_blacklist rm_whitelist rm_blacklist broadcast`
Whitelist or blacklist contract pool.

Returns the signed version of the transaction.

| Option | Description |
| :--- | :--- |
| `string registrar_account` | is an owner of contract which perform whitelistining or blacklistining. |
| `triplet contract_id` | whitelistining or blacklistining applying for this contract. |
| `listtriplet add_to_whitelist` | leave it empty if you don't want to add some account to whitelist. |
| `listtriplet add_to_blacklist` | leave it empty if you don't want to add some account to blacklist. |
| `listtriplet rm_whitelist` | leave it empty if you don't want to remove some account from whitelist. |
| `listtriplet rm_blacklist` | leave it empty if you don't want to remove some account from blacklist. |
| `bool broadcast` | true if you want to broadcast the contract whitelist operation |

```
whitelist_contract_pool nathan 1.11.0 [] [] [] [] true
```

## Network

### `network_add_nodes nodes`
Adding nodes to network.

| Option | Description |
| :--- | :--- |
| `liststring nodes` | endpoints your nodes |

```
network_add_nodes 127.0.0.1:8090
```

### `network_get_connected_peers`
Get connected peers.

```
network_get_connected_peers
```

## Sidechain

### `get_account_deposits account type`
Returns all deposits, for the given account id.

| Option | Description |
| :--- | :--- |
| `string account` | the id or name of the account to provide information about |
| `string type` | the type of the deposits may be "", "eth" or "btc". By default "" = all deposits |

```
get_account_deposits 1.2.0 ""
get_account_deposits nathan btc
```

### `get_account_withdrawals account type`
Returns all withdrawals, for the given account id.

| Option | Description |
| :--- | :--- |
| `string account` | the id or name of the account to provide information about |
| `string type` | the type of the withdrawals may be "", "eth" or "btc". By default "" = all withdrawals |

```
get_account_withdrawals 1.2.0 ""
get_account_deposits nathan eth
```

## Sidechain Ethereum

### `get_eth_address account`
Returns information about generated eth address, if exist and approved, for the given account id.

| Option | Description |
| :--- | :--- |
| `string account` | the id or name of the account to provide information about |

```
get_eth_address 1.2.0
get_eth_address nathan
```

### `create_eth_address account broadcast`
Creates a transaction to generate ethereum address.

| Option | Description |
| :--- | :--- |
| `string account` | the name or id of account for which the ethereum address is generated. |
| `bool broadcast` | true if you want to broadcast the transaction |

```
create_eth_address 1.2.0 true
create_eth_address nathan true
```

### `withdraw_eth account eth_addr value broadcast`
Creates a transaction to withdraw ethereum.

| Option | Description |
| :--- | :--- |
| `string account` | the account who withdraw ethereum. |
| `string eth_addr` | the Ethereum address where withdraw. |
| `number value` | withdraw amount. |
| `bool broadcast` | true if you want to broadcast the transaction. |

```
withdraw_eth nathan 0102fe7702b96808f7bbc0d4a888ed1468216cfd 10 true
```

### `propose_eth_update_contract_address sender expiration_time new_addr`
Creates a transaction to propose change the eth contract address.

| Option | Description |
| :--- | :--- |
| `string sender` | the account paying the fee to propose the tx. |
| `fc::time_point_sec expiration_time` | timestamp specifying when the proposal will either take effect or expire. |
| `string new_addr` | the new address for ethereum contract. |

```
propose_eth_update_contract_address 1.2.6 "2019-11-28T13:50:00" "0e7057518879d5DE1F842b77e8F6F3e22931a1be"
```

## Sidechain ERC20

### `get_erc20_token eth_addr_or_id`
Get erc20 token information.

| Option | Description |
| :--- | :--- |
| `string eth_addr_or_id` | the ethereum address of token in Ethereum network or the id in ECHO |

```
get_erc20_token 0102fe7702b96808f7bbc0d4a888ed1468216cfd
get_erc20_token 1.16.155
```

### `check_erc20_token id`
Checks the contract exists and is ERC20 token contract registered by register_erc20_contract operation

| Option | Description |
| :--- | :--- |
| `triplet id` | ID of the contract |

```
check_erc20_token 1.11.0
```

### `get_erc20_account_deposits account`
Returns all deposits, for the given account id.

| Option | Description |
| :--- | :--- |
| `string account` | the id or name of the account to provide information about |

```
get_erc20_account_deposits 1.2.0
get_erc20_account_deposits nathan
```

### `get_erc20_account_withdrawals account`
Returns all withdrawals for the given account id.

| Option | Description |
| :--- | :--- |
| `string account` | the id or name of the account to provide information about |

```
get_erc20_account_withdrawals 1.2.0
get_erc20_account_withdrawals nathan
```

### `register_erc20_token account eth_addr name symbol decimals broadcast`
Creates a transaction to register erc20_token for sidechain.

Returns the signed version of the transaction.

| Option | Description |
| :--- | :--- |
| `string account` | the account who create erc20 token and become his owner. |
| `string eth_addr` | the address of token erc20 token in ethereum network. |
| `string name` | name of the token in echo network. |
| `string symbol` | symbol of the token in echo network. |
| `number decimals` | number of the digist after the comma of the token in echo network. |
| `bool broadcast` | true if you want to broadcast the transaction. |

```
register_erc20_token nathan E62627255a4BC0c92E190E01c515Ba28233c9207 erc20DbeVxoV QIGMPUZ 8 true
```

### `withdraw_erc20_token account to erc20_token value broadcast`
Creates a transaction to withdraw erc20_token.

Returns the signed version of the transaction.

| Option | Description |
| :--- | :--- |
| `string account` | the account who withdraw erc20 token. |
| `string to` | the Ethereum address where withdraw erc20 token. |
| `string erc20_token` | the erc20 token id in ECHO. |
| `string value` | the amount withdraw. |
| `bool broadcast` | true if you want to broadcast the transaction. |


```
withdraw_erc20_token nathan 545a68602db30bf5db9692267f8f84b7f1e70ec3 1.16.0 10 true
```

### `propose_register_asset_in_sidechain proposing_account expiration_time erc20_data broadcast`
Creates a transaction to transfer assets to Ethereum erc20_token.

Returns the signed version of the transaction.

| Option | Description |
| :--- | :--- |
| `string proposing_account` | the account who make proposal. |
| `fc::time_point_sec expiration_time` | timestamp specifying when the proposal will either take effect or expire. |
| `string erc20_data` | object of data for erc20 contract. Should have fields `code`, `args`, `address`,`name`,`symbol`,`decimals`. Filed `eth_accuracy` is optional. |
| `bool broadcast` | true if you want to broadcast the transaction. |


```
propose_register_asset_in_sidechain 1.2.6 "2122-12-11T07:53:00" { "code" : "some code", "args" : "some args", "address" : "2A365517AB5f70b4079Cd2dC2C3Bc9d111AaE951", "name" : "NewToken", "symbol": "ENEW", "decimals" : 8, "eth_accuracy" : false } true
```

### `transfer_to_eth_erc20 account to amount asset_symbol broadcast`
Creates a transaction to transfer assets to Ethereum erc20_token.

Returns the signed version of the transaction.

| Option | Description |
| :--- | :--- |
| `string account` | the account who withdraw erc20 token. |
| `string to` | the Ethereum address where transfer erc20 token. |
| `string amount` | the amount transfer. |
| `string asset_symbol` | the asset symbol. |
| `bool broadcast` | true if you want to broadcast the transaction. |


```
transfer_to_eth_erc20 nathan 545a68602db30bf5db9692267f8f84b7f1e70ec3 100 ECHO true
```


## Sidechain Bitcoin

### `create_btc_address account broadcast`
Creates a transaction to generate bitcoin deposit address.

| Option | Description |
| :--- | :--- |
| `string account` | the account or id for which the bitcoin address is generated. |
| `bool broadcast` | true if you want to broadcast the transaction |

```
create_btc_address nathan true
```

### `get_btc_address account`
Returns information about generated btc address, if exist and approved, for the given account id.

| Option | Description |
| :--- | :--- |
| `string account` | the account name or id to provide information about |

```
get_btc_address 1.2.0
get_btc_address nathan
```

### `get_btc_deposit_script address`
Returns bitcoin script for generated bitcoin deposit address, if exist, for the given address id.

| Option | Description |
| :--- | :--- |
| `triplet address` | the id of the bitcoin address to provide script |

```
get_btc_deposit_script 1.19.0
```

### `withdraw_btc account btc_addr value broadcast`
Creates a transaction to withdraw btc.

| Option | Description |
| :--- | :--- |
| `string account` | the account who withdraw btc. |
| `string btc_addr` | the Bitcoin address where withdraw. |
| `number value` | the amount withdraw in satoshis. |
| `bool broadcast` | true if you want to broadcast the transaction. |

```
withdraw_btc nathan 0102fe7702b96808f7bbc0d4a888ed1468216cfd 10000000 true
```

### `create_btc_stake_address account user_pubkey broadcast`
Creates a transaction to generate bitcoin stake address.

| Option | Description |
| :--- | :--- |
| `string account` | the account for which the bitcoin address is generated. |
| `string user_pubkey` | the Bitcoin address where stake. |
| `bool broadcast` | true if you want to broadcast the transaction |

```
create_btc_stake_address nathan 02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e true
```

### `get_btc_stake_address account`
Returns bitcoin stake object with stake redeem script and p2sh address.

| Option | Description |
| :--- | :--- |
| `string account` | the account name or id to provide information about |

```
get_btc_stake_address 1.2.0
get_btc_stake_address nathan
```

## Transaction Builder

### `begin_builder_transaction`
Create a new transaction builder.

```
begin_builder_transaction
```

### `add_operation_to_builder_transaction transaction_handle op`
Append a new operation to a transaction builder.

| Option | Description |
| :--- | :--- |
| `uint16 transaction_handle` | handle of the transaction builder |
| `operation op` | the operation in JSON format |

```
add_operation_to_builder_transaction 0 {operation}
```

### `replace_operation_in_builder_transaction handle operation_index new_op`
Replace an operation in a transaction builder with a new operation

| Option | Description |
| :--- | :--- |
| `uint16 handle` | handle of the transaction builder |
| `unsigned operation_index` | the index of the old operation in the builder to be replaced |
| `operation new_op` | the operation in JSON format |

```
replace_operation_in_builder_transaction 1 0 {operation}
```

### `set_fees_on_builder_transaction handle fee_asset`
Calculate and update fees for the operations in a transaction builder.

| Option | Description |
| :--- | :--- |
| `uint16 handle` | handle of the transaction builder |
| `string fee_asset` | name or ID of an asset that to be used to pay fees |

```
set_fees_on_builder_transaction 0
```

### `preview_builder_transaction handle`
Show content of a transaction builder.

| Option | Description |
| :--- | :--- |
| `uint16 handle` | handle of the transaction builder |

```
preview_builder_transaction 0
```

### `sign_builder_transaction transaction_handle broadcast`
Sign the transaction in a transaction builder and optionally broadcast to the network.

| Option | Description |
| :--- | :--- |
| `uint16 transaction_handle` | handle of the transaction builder |
| `bool broadcast` | whether to broadcast the signed transaction to the network |

```
sign_builder_transaction 0 true
```

### `propose_builder_transaction handle expiration review_period_seconds`
Create a proposal containing the operations in a transaction builder (create a new proposal_create operation, then replace the transaction builder with the new operation), then sign the transaction and optionally broadcast to the network.

Note: this command is buggy because unable to specify proposer. It will be deprecated in a future release. Please use `propose_builder_transaction2` instead.

| Option | Description |
| :--- | :--- |
| `uint16 handle` | handle of the transaction builder |
| `time_point_sec expiration` | when the proposal will expire |
| `uint32 review_period_seconds` | review period of the proposal in seconds |

```
propose_builder_transaction 0 1970-01-01T00:00:00 30
```

### `propose_builder_transaction2 handle account expiration review_period_seconds`
Create a proposal containing the operations in a transaction builder (create a new proposal_create operation, then replace the transaction builder with the new operation), then sign the transaction and optionally broadcast to the network.

| Option | Description |
| :--- | :--- |
| `uint16 handle` | handle of the transaction builder |
| `string account` | name or ID of the account who would pay fees for creating the proposal |
| `time_point_sec expiration` | when the proposal will expire |
| `uint32 review_period_seconds` | review period of the proposal in seconds |

```
propose_builder_transaction2 0 nathan 1970-01-01T00:00:00 30
```

### `remove_builder_transaction handle`
Destroy a transaction builder.

| Option | Description |
| :--- | :--- |
| `uint16 handle` | handle of the transaction builder |

```
remove_builder_transaction 0
```

### `get_prototype_operation operation_type`
Returns an uninitialized object representing a given blockchain operation.  
This returns a default-initialized object of the given type; it can be used during early development of the wallet when we don't yet have custom commands for creating all of the operations the blockchain supports.

| Option | Description |
| :--- | :--- |
| `string operation_type` | the type of operation to return, must be one of the operations described in [Operation section](/api-reference/echo-operations/README.md#Echo-Operations) |

```
get_prototype_operation account_create_operation
```

## Verifiable Credentials

{% hint style="warning" %}
Verifiable Credentials is now in the development stage.
{% endhint %}

### `add_verifiable_credential keyword verifiable_cred`
Writing Verifiable Credentials to encrypted wallet storage. Verifiable Credentials data
can be used to authenticate claims.

| Option | Description |
| :--- | :--- |
| `string keyword` | name associated with Verifiable Credentials |
| `string verifiable_cred` | Verifiable Credentials presented in json format |

```
add_verifiable_credential "keyword" "{json}"
```

### `get_verifiable_credential_keywords`
Get all saved verifiable credential names.

```
get_verifiable_credential_keywords
```

### `get_verifiable_credential keyword`
Get verifiable credentials recorded under a specific name.

| Option | Description |
| :--- | :--- |
| `string keyword` | name associated with Verifiable Credentials |

```
get_verifiable_credential "keyword"
```

### `get_all_verifiable_credentials`
Get all verifiable credentials saved in wallet.

```
get_all_verifiable_credentials
```

### `get_did_object_key id_string`
Get key from DID object by DID uri with key number.

| Option | Description |
| :--- | :--- |
| `string id_string` | DID uri with key number |

```
get_did_object_key "did:echo:0.1.25.0#key-1"
```

### `get_verifiable_presentation keywords`
Get verifiable presentation from given VC keywords.

| Option | Description |
| :--- | :--- |
| `string_vector keywords` | vector of VC keywords |

```
get_verifiable_presentation ["keyword_1", "keyword_2"]
```

### `validate_verifiable_presentation presentation`
Validate given verifiable presentation.

| Option | Description |
| :--- | :--- |
| `string presentation` | presentation in JSON format |

```
validate_verifiable_presentation "verifiable_presentation"
```

### `validate_verifiable_credential credential`
Validate given verifiable credential.

| Option | Description |
| :--- | :--- |
| `string credential` | credential in JSON format |

```
validate_verifiable_credential "verifiable_credential"
```
