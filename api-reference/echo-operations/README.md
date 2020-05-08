# Echo Operations

* [Operations order](operations-order.md)

## Asset Transfer

* [transfer\_operation](asset-transfer.md#transfer_operation) - Transfers an amount of one asset from one account to another
* [transfer\_to\_address\_operation](asset-transfer.md#transfer_to_address_operation) - Transfers an amount of one asset from one account to account address
* [override\_transfer\_operation](asset-transfer.md#override_transfer_operation) - Allows the issuer of an asset to transfer an asset from any account to any account if they have override\_authority

## Account Management

* [account\_create\_operation](account-management.md#account_create_operation) - Create new account
* [account\_update\_operation](account-management.md#account_update_operation) - Update an existing account
* [account\_whitelist\_operation](account-management.md#account_whitelist_operation) - This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets
* [account\_address\_create\_operation](account-management.md#account_address_create_operation) - Create account address

## Asset Management

* [asset\_create\_operation](asset-management.md#asset_create_operation) - Create new asset
* [asset\_update\_operation](asset-management.md#asset_update_operation) - Update options common to all assets
* [asset\_update\_bitasset\_operation](asset-management.md#asset_update_bitasset_operation) - Update options specific to BitAssets
* [asset\_update\_feed\_producers\_operation](asset-management.md#asset_update_feed_producers_operation) - Update the set of feed-producing accounts for a BitAsset
* [asset\_issue\_operation](asset-management.md#asset_issue_operation) - Asset issue to account
* [asset\_reserve\_operation](asset-management.md#asset_reserve_operation) - Used to take an asset out of circulation, returning to the issuer
* [asset\_fund\_fee\_pool\_operation](asset-management.md#asset_fund_fee_pool_operation) - Used to transfer asset to fee pool
* [asset\_publish\_feed\_operation](asset-management.md#asset_publish_feed_operation) - Publish price feeds for market-issued assets
* [asset_claim_fees_operation](asset-management.md#asset_claim_fees_operation) - Used to transfer accumulated fees back to the issuer's balance

## Proposals

* [proposal\_create\_operation](proposals.md#proposal_create_operation) - Creates a transaction proposal, for use in multi-sig scenarios
* [proposal\_update\_operation](proposals.md#proposal_update_operation) - Updates an existing transaction proposal
* [proposal\_delete\_operation](proposals.md#proposal_delete_operation) - Deletes an existing transaction proposal

## Committee Member

* [committee\_member\_create\_operation](committee-member.md#committee_member_create_operation) - Create a `committee_member` object, as a bid to hold a `committee_member` seat on the network
* [committee\_member\_update\_operation](committee-member.md#committee_member_update_operation) - Update a `committee_member` object
* [committee\_member\_update\_global\_parameters\_operation](committee-member.md#committee_member_update_global_parameters_operation) - Used by committee members to update the global parameters of the blockchain
* [committee\_member\_activate\_operation](committee-member.md#committee_member_activate_operation) - Used by active `committee_members` to propose activation of `committee_member`
* [committee\_member\_deactivate\_operation](committee-member.md#committee_member_deactivate_operation) - Used by active `committee_members` to propose deactivation of `committee_member`
* [committee\_frozen\_balance\_deposit\_operation](committee-member.md#committee_frozen_balance_deposit_operation) - Used by a `committee_member` to deposit a frozen balance
* [committee\_frozen\_balance\_withdraw\_operation](committee-member.md#committee_frozen_balance_withdraw_operation) - Used by a `committee_member` to withdraw a frozen balance

## Vesting Balances

* [vesting\_balance\_create\_operation](vesting-balances.md#vesting_balance_create_operation) - Create a vesting balance
* [vesting\_balance\_withdraw\_operation](vesting-balances.md#vesting_balance_withdraw_operation) - Withdraw from a vesting balance

## Balance Object

* [balance\_claim\_operation](balance-object.md#balance_claim_operation) - Claim a balance in a `balance_object`
* [balance\_freeze\_operation](balance-object.md#balance_freeze_operation) - Freeze balance
* [balance\_unfreeze\_operation](balance-object.md#balance_unfreeze_operation) - Unfreeze balance

## Contracts

* [contract\_create\_operation](contracts.md#contract_create_operation) - Creates a contract
* [contract\_call\_operation](contracts.md#contract_call_operation) - Calls a contract
* [contract\_internal\_create\_operation](contracts.md#contract_internal_create_operation) _\[VIRTUAL\]_ - Indicates contract creation from another contract
* [contract\_internal\_call\_operation](contracts.md#contract_internal_call_operation) _\[VIRTUAL\]_ - Indicates contract call from another contract
* [contract\_selfdestruct\_operation](contracts.md#contract_selfdestruct_operation) _\[VIRTUAL\]_ - Indicates contract destruction
* [contract\_update\_operation](contracts.md#contract_update_operation) - Update contract data
* [contract\_fund\_pool\_operation](contracts.md#contract_fund_pool_operation) - Transfer asset to contract fee pool
* [contract\_whitelist\_operation](contracts.md#contract_whitelist_operation) - Manage the blacklist and whitelist pool of the contract

## Sidechain

* [sidechain\_eth\_create\_address\_operation](sidechain.md#sidechain_eth_create_address_operation) - Used to generate address in ETH blockchain. After the address is generated eth\_address\_object\(s\) will be created in echo db and can be retrieved using get\_eth\_address method. Until one of the objects will receive sufficient amount of approvals the number of objects connected to account id can be more than one
* [sidechain\_eth\_approve\_address\_operation](sidechain.md#sidechain_eth_approve_address_operation) - An internal operation by which committee members confirm the created Ethereum address
* [sidechain\_eth\_deposit\_operation](sidechain.md#sidechain_eth_deposit_operation) - An internal operation by which committee members confirm Ethereum deposit
* [sidechain\_eth\_send\_deposit\_operation](sidechain.md#sidechain_eth_send_deposit_operation) - An internal operation by which committee members confirm Ethereum deposit after 24h and credit eETH
* [sidechain\_eth\_withdraw\_operation](sidechain.md#sidechain_eth_withdraw_operation) - Used to withdraw the eETH and receive ETH to provided address
* [sidechain\_eth\_send\_withdraw\_operation](sidechain.md#sidechain_eth_send_withdraw_operation) -  An internal operation by which committee members confirm the withdrawal of ETH after 24h
* [sidechain\_eth\_approve\_withdraw\_operation](sidechain.md#sidechain_eth_approve_withdraw_operation) - An internal operation by which committee members confirm the withdrawal of ETH and burn the eETH
* [sidechain\_eth\_update\_contract\_address\_operation](sidechain.md#sidechain_eth_update_contract_address_operation) - An internal operation, sent by committee member to propose update of the eth contract address
* [sidechain\_issue\_operation](sidechain.md#sidechain_issue_operation) - Virtual operation, which reports that the money entered with the help of sidechain
* [sidechain\_burn\_operation](sidechain.md#sidechain_burn_operation) - Virtual operation, which reports that the conclusion was successful and funds burned\(withdrawn\)
* [sidechain\_erc20\_register\_token\_operation](sidechain.md#sidechain_erc20_register_token_operation) - Used to register a token in the sidechain
* [sidechain\_erc20\_deposit\_token\_operation](sidechain.md#sidechain_erc20_deposit_token_operation) - An internal operation by which committee members confirm the entry of tokens
* [sidechain\_erc20\_send\_deposit\_token\_operation](sidechain.md#sidechain_erc20_send_deposit_operation) - An internal operation by which committee members confirm the entry of tokens after 24h and credit token
* [sidechain\_erc20\_withdraw\_token\_operation](sidechain.md#sidechain_erc20_withdraw_token_operation) - Executed by the user and initiates the withdrawal of the token from the Echo network to the specified address
* [sidechain\_erc20\_send\_withdraw\_token\_operation](sidechain.md#sidechain_erc20_send_withdraw_operation) - An internal operation by which committee members confirm the removal of tokens after 24h
* [sidechain\_erc20\_approve\_token\_withdraw\_operation](sidechain.md#sidechain_erc20_approve_token_withdraw_operation) - An internal operation by which committee members confirm the removal of tokens
* [sidechain\_erc20\_issue\_operation](sidechain.md#sidechain_erc20_issue_operation) - Virtual operation which issues erc20 token
* [sidechain\_erc20\_burn\_operation](sidechain.md#sidechain_erc20_burn_operation) - Virtual operation which burns erc20 token
* [sidechain\_btc\_create\_address\_operation](sidechain.md#sidechain_btc_create_address_operation) - Used to generate address in BTC blockchain. After the address is generated btc\_address\_object\(s\) will be created in echo db and can be retrieved using get\_btc\_address method
* [sidechain\_btc\_create\_intermediate\_deposit\_operation](sidechain.md#sidechain_btc_create_intermediate_deposit_operation) - An internal operation by which committee members processed deposit to account
* [sidechain\_btc\_intermediate\_deposit\_operation](sidechain.md#sidechain_btc_intermediate_deposit_operation) - An internal operation by which committee members send from intermediate address to deposit address
* [sidechain\_btc\_deposit\_operation](sidechain.md#sidechain_btc_deposit_operation) -  An internal operation by which committee members processed deposit to deposit address from intermediate address
* [sidechain\_btc\_withdraw\_operation](sidechain.md#sidechain_btc_withdraw_operation) - Used to withdraw the eBTC and receive BTC to provided address
* [sidechain\_btc\_aggregate\_operation](sidechain.md#sidechain_btc_aggregate_operation) - An internal operation by which committee members collect an aggregate transaction
* [sidechain\_btc\_approve\_aggregate\_operation](sidechain.md#sidechain_btc_approve_aggregate_operation) - An internal operation by which committee members confirm the aggregate transaction

## Block Reward

* [block\_reward\_operation](block-reward.md#block_reward_operation) - Virtual operation that indicates payout of block reward

## DID Management

* [did\_create\_operation](did.md#didcreateoperation) - Create new DID
* [did\_update\_operation](did.md#didupdateoperation) - Update an existing DID
* [did\_delete\_operation](did.md#diddeleteoperation) - Remove DID
