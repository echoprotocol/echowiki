# Echo Operations

## Account Management

* [account\_create\_operation](account-management.md#account_create_operation) - Create new account
* [account\_update\_operation](account-management.md#account_update_operation) - Update an existing account
* [account\_whitelist\_operation](account-management.md#account_whitelist_operation) - This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets
* [account\_address\_create\_operation](account-management.md#account_address_create_operation) - Create account address

## Asset Management

* [asset\_create\_operation](asset-management.md#asset_create_operation) - Create new asset
* [asset\_update\_operation](asset-management.md#asset_update_operation) - Update options common to all assets
* [asset\_update\_bitasset\_operation]( asset-management.md#asset_update_bitasset_operation) - Update options specific to BitAssets
* [asset\_update\_feed\_producers\_operation](asset-management.md#asset_update_feed_producers_operation) - Update the set of feed-producing accounts for a BitAsset
* [asset\_issue\_operation](asset-management.md#asset_issue_operation) - Asset issue to account
* [asset\_reserve\_operation](asset-management.md#asset_reserve_operation) - Used to take an asset out of circulation, returning to the issuer
* [asset_claim_fees_operation](asset-management.md#asset_claim_fees_operation) - Used to transfer accumulated fees back to the issuer's balance
* [asset\_fund\_fee\_pool\_operation](asset-management.md#asset_fund_fee_pool_operation)
* [asset\_publish\_feed\_operation](asset-management.md#asset_publish_feed_operation) - Publish price feeds for market-issued assets

## Balance Object

* [balance\_claim\_operation](balance-object.md#balance_claim_operation) - Claim a balance in a `balance_object`
* [balance\_freeze\_operation](balance-object.md#balance_freeze_operation) - Freeze balance
* [balance\_unfreeze\_operation](balance-object.md#balance_unfreeze_operation) _\[VIRTUAL\]_ - Unfreeze balance

## Committee Member

* [committee\_member\_create\_operation](committee-member.md#committee_member_create_operation) - Create a `committee_member` object, as a bid to hold a `committee_member` seat on the network
* [committee\_member\_update\_operation](committee-member.md#committee_member_update_operation) - Update a `committee_member` object
* [committee\_member\_update\_global\_parameters\_operation](committee-member.md#committee_member_update_global_parameters_operation) - Used by committee members to update the global parameters of the blockchain

## Contracts

* [contract\_create\_operation](contracts.md#contract_create_operation) - Creates a contract
* [contract\_call\_operation](contracts.md#contract_call_operation) - Calls a contract
* [contract\_internal\_create\_operation](contracts.md#contract_internal_create_operation) _\[VIRTUAL\]_ - Indicates contract creation from another contract
* [contract\_internal\_call\_operation](contracts.md#contract_internal_call_operation) _\[VIRTUAL\]_ - Indicates contract call from another contract
* [contract\_selfdestruct\_operation](contracts.md#contract_selfdestruct_operation) _\[VIRTUAL\]_ - Indicates contract destruction
* [contract\_fund\_pool\_operation](contracts.md#contract_fund_pool_operation) - Transfer asset to fee pool
* [contract\_whitelist\_operation](contracts.md#contract_whitelist_operation) - Manage the blacklist and whitelist pool of the contract
* [contract\_update\_operation](contracts.md#contract_update_operation) - Update contract data

## Sidechain

* [sidechain\_eth\_create\_address\_operation](sidechain.md#sidechain_eth_create_address_operation) - Used to generate address in ETH blockchain. After the address is generated eth\_address\_object\(s\) will be created in echo db and can be retrieved using get\_eth\_address method. Until one of the objects will receive sufficient amount of approvals the number of objects connected to account id can be more than one.
* [sidechain\_eth\_approve\_address\_operation](sidechain.md#sidechain_eth_approve_address_operation) - An internal operation by which committee members confirm the created  Ethereum address
* [sidechain\_eth\_deposit\_operation](sidechain.md#sidechain_eth_deposit_operation) - An internal operation by which committee members confirm Ethereum deposit
* [sidechain\_eth\_withdraw\_operation](sidechain.md#sidechain_eth_withdraw_operation) - Used to withdraw the eETH and receive ETH to provided address
* [sidechain\_eth\_approve\_withdraw\_operation](sidechain.md#sidechain_eth_approve_withdraw_operation) - An internal operation by which committee members confirm the withdrawal of ETH and burn the eETH
* [sidechain\\_issue\_operation](sidechain.md#sidechain_issue_operation) - Virtual operation, which reports that the money entered with the help of sidechain
* [sidechain\\_burn\_operation](sidechain.md#sidechain_burn_operation) - Virtual operation, which reports that the conclusion was successful and funds burned\(withdrawn\)
* [sidechain\_erc20\_register\_token\_operation](sidechain.md#sidechain_erc20_register_token_operation) - Used to register a token in the sidechain
* [sidechain\_erc20\_deposit\_token\_operation](sidechain.md#sidechain_erc20_deposit_token_operation) - An internal operation by which committee members confirm the entry of tokens
* [sidechain\_erc20\_withdraw\_token\_operation](sidechain.md#sidechain_erc20_withdraw_token_operation) - Executed by the user and initiates the withdrawal of the token from the Echo network to the specified address
* [sidechain\_erc20\_approve\_token\_withdraw\_operation](sidechain.md#sidechain_erc20_approve_token_withdraw_operation) - An internal operation by which committee members confirm the removal of tokens
* [sidechain\_erc20\_issue\_operation](sidechain.md#sidechain_erc20_issue_operation) - Virtual operation which issues erc20 token
* [sidechain\_erc20\_burn\_operation](sidechain.md#sidechain_erc20_burn_operation) - Virtual operation which burns erc20 token

## Transaction Proposal Protocol

Echo allows users to propose a transaction which requires approval of multiple accounts in order to execute. The user proposes a transaction using proposal\_create\_operation, then signatory accounts use proposal\_update\_operations to add or remove their approvals from this operation. When a sufficient number of approvals have been granted, the operations in the proposal are used to create a virtual transaction which is subsequently evaluated. Even if the transaction fails, the proposal will be kept until the expiration time, at which point, if sufficient approval is granted, the transaction will be evaluated a final time. This allows transactions which will not execute successfully until a given time to still be executed through the proposal mechanism. The first time the proposed transaction succeeds, the proposal will be regarded as resolved, and all future updates will be invalid.

The proposal system allows for arbitrarily complex or recursively nested authorities. If a recursive authority \(i.e. an authority which requires approval of 'nested' authorities on other accounts\) is required for a proposal, then a second proposal can be used to grant the nested authority's approval. That is, a second proposal can be created which, when sufficiently approved, adds the approval of a nested authority to the first proposal. This multiple-proposal scheme can be used to acquire approval for an arbitrarily deep authority tree.

Note that at any time, a proposal can be approved in a single transaction if sufficient signatures are available on the proposal\_update\_operation, as long as the authority tree to approve the proposal does not exceed the maximum recursion depth. In practice, however, it is easier to use proposals to acquire all approvals, as this leverages on-chain notification of all relevant parties that their approval is required. Off-chain multi-signature approval requires some off-chain mechanism for acquiring several signatures on a single transaction. This off-chain synchronization can be avoided using proposals.

## Proposals

* [proposal\_create\_operation](proposals.md#proposal_create_operation) - Creates a transaction proposal, for use in multi-sig scenarios
* [proposal\_update\_operation](proposals.md#proposal_update_operation) - Updates an existing transaction proposal
* [proposal\_delete\_operation](proposals.md#proposal_delete_operation) - Deletes an existing transaction proposal

## Asset Transfer

* [transfer\_operation](asset-transfer.md#transfer_operation) - Transfers an amount of one asset from one account to another
* [override\_transfer\_operation](asset-transfer.md#override_transfer_operation) - Allows the issuer of an asset to transfer an asset from any account to any account if they have override\_authority
* [transfer\_to\_address\_operation](asset-transfer.md#transfer_to_address_operation) - Transfers an amount of one asset from one account to account address

## Vesting Balances

* [vesting\_balance\_create\_operation](vesting-balances.md#vesting_balance_create_operation) - Create a vesting balance
* [vesting\_balance\_withdraw\_operation](vesting-balances.md#vesting_balance_withdraw_operation) - Withdraw from a vesting balance

