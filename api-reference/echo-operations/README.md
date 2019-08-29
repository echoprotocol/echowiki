# Echo Operations

## Account Management

* [account_create_operation](account-management.md#account_create_operation) - Create new account
* [account_update_operation](account-management.md#account_update_operation) - Update an existing account
* [account_whitelist_operation](account-management.md#account_whitelist_operation) - This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets
* [account_transfer_operation](account-management.md#account_transfer_operation) - Transfers the account to another account while clearing the white list
* [account_address_create_operation](account-management.md#account_address_create_operation) - Create account address

## Asset Management

* [asset_create_operation](asset-management.md#asset_create_operation) - Create new asset
* [asset_update_operation](asset-management.md#asset_update_operation) - Update options common to all assets
* [asset_update_bitasset_operation](asset-management.md#asset_update_bitasset_operation) - Update options specific to BitAssets
* [asset_update_feed_producers_operation](asset-management.md#asset_update_feed_producers_operation) - Update the set of feed-producing accounts for a BitAsset
* [asset_issue_operation](asset-management.md#asset_issue_operation) - Asset issue to account
* [asset_reserve_operation](asset-management.md#asset_reserve_operation) - Used to take an asset out of circulation, returning to the issuer
* [asset_fund_fee_pool_operation](asset-management.md#asset_fund_fee_pool_operation)
* [asset_publish_feed_operation](asset-management.md#asset_publish_feed_operation) - Publish price feeds for market-issued assets

## Balance Object

* [balance_claim_operation](balance-object.md#balance_claim_operation) - Claim a balance in a `balance_object`

## Committee Member

* [committee_member_create_operation](committee-member.md#committee_member_create_operation) - Create a `committee_member` object, as a bid to hold a `committee_member` seat on the network
* [committee_member_update_operation](committee-member.md#committee_member_update_operation) - Update a `committee_member` object
* [committee_member_update_global_parameters_operation](committee-member.md#committee_member_update_global_parameters_operation) - Used by committee members to update the global parameters of the blockchain

## Contracts

* [contract_create_operation](contracts.md#contract_create_operation) - Creates a contract
* [contract_call_operation](contracts.md#contract_call_operation) - Calls a contract
* [contract_fund_pool_operation](contracts.md#contract_fund_pool_operation) - Transfer asset to fee pool
* [contract_whitelist_operation](contracts.md#contract_whitelist_operation) - Manage the blacklist and whitelist pool of the contract
* [contract_transfer_operation](contracts.md#contract_transfer_operation)*[VIRTUAL]* - Indicates internal contract transfers
* [contract_update_operation](contracts.md#contract_update_operation) - Update contract data

## Sidechain

* [sidechain_eth_create_address_operation](contracts.md#sidechain_eth_create_address_operation) - used to generate address in ETH blockchain. After the address is generated eth_address_object(s) will be created in echo db and can be retrieved using get_eth_address method. Until one of the objects will receive sufficient amount of approvals the number of objects connected to account id can be more than one.
* [sidechain_eth_approve_address_operation](contracts.md#sidechain_eth_approve_address_operation) - An internal operation by which committee members confirm the created  Ethereum address
* [sidechain_eth_deposit_operation](contracts.md#sidechain_eth_deposit_operation) - An internal operation by which committee members confirm Ethereum deposit
* [sidechain_eth_withdraw_operation](contracts.md#sidechain_eth_withdraw_operation) - used to withdraw the eETH and receive ETH to provided address
* [sidechain_eth_approve_withdraw_operation](contracts.md#sidechain_eth_approve_withdraw_operation) - An internal operation by which committee members confirm the withdrawal of ETH and burn the eETH
* [sidechain_change_config_operation](contracts.md#sidechain_change_config_operation) - An internal operation by which committee members confirm the update of the sidechain configuration
* [sidechain_eth_issue_operation](contracts.md#sidechain_eth_issue_operation) - Virtual operation, which reports that the money entered with the help of sidechain
* [sidechain_eth_burn_operation](contracts.md#sidechain_eth_burn_operation) - Virtual operation, which reports that the conclusion was successful and funds burned(withdrawn)
* [sidechain_erc20_register_token_operation](contracts.md#sidechain_erc20_register_token_operation) - Used to register a token in the sidechain
* [sidechain_erc20_deposit_token_operation](contracts.md#sidechain_erc20_deposit_token_operation) - An internal operation by which committee members confirm the entry of tokens
* [sidechain_erc20_withdraw_token_operation](contracts.md#sidechain_erc20_withdraw_token_operation) - Executed by the user and initiates the withdrawal of the token from the Echo network to the specified address
* [sidechain_erc20_approve_token_withdraw_operation](contracts.md#sidechain_erc20_approve_token_withdraw_operation) - An internal operation by which committee members confirm the removal of tokens

## Transaction Proposal Protocol

Echo allows users to propose a transaction which requires approval of multiple accounts in order to execute.
The user proposes a transaction using proposal_create_operation, then signatory accounts use
proposal_update_operations to add or remove their approvals from this operation. When a sufficient number of
approvals have been granted, the operations in the proposal are used to create a virtual transaction which is
subsequently evaluated. Even if the transaction fails, the proposal will be kept until the expiration time, at
which point, if sufficient approval is granted, the transaction will be evaluated a final time. This allows
transactions which will not execute successfully until a given time to still be executed through the proposal
mechanism. The first time the proposed transaction succeeds, the proposal will be regarded as resolved, and all
future updates will be invalid.

The proposal system allows for arbitrarily complex or recursively nested authorities. If a recursive authority
(i.e. an authority which requires approval of 'nested' authorities on other accounts) is required for a
proposal, then a second proposal can be used to grant the nested authority's approval. That is, a second
proposal can be created which, when sufficiently approved, adds the approval of a nested authority to the first
proposal. This multiple-proposal scheme can be used to acquire approval for an arbitrarily deep authority tree.

Note that at any time, a proposal can be approved in a single transaction if sufficient signatures are available
on the proposal_update_operation, as long as the authority tree to approve the proposal does not exceed the
maximum recursion depth. In practice, however, it is easier to use proposals to acquire all approvals, as this
leverages on-chain notification of all relevant parties that their approval is required. Off-chain
multi-signature approval requires some off-chain mechanism for acquiring several signatures on a single
transaction. This off-chain synchronization can be avoided using proposals.

## Proposals

* [proposal_create_operation](proposals.md#proposal_create_operation) - Creates a transaction proposal, for use in multi-sig scenarios
* [proposal_update_operation](proposals.md#proposal_update_operation) - Updates an existing transaction proposal
* [proposal_delete_operation](proposals.md#proposal_delete_operation) - Deletes an existing transaction proposal

## Asset Transfer

* [transfer_operation](asset-transfer.md#transfer_operation) - Transfers an amount of one asset from one account to another
* [override_transfer_operation](asset-transfer.md#override_transfer_operation) - Allows the issuer of an asset to transfer an asset from any account to any account if they have override_authority
* [transfer_to_address_operation](asset-transfer.md#transfer_to_address_operation) - Transfers an amount of one asset from one account to account address

## Vesting Balances

* [vesting_balance_create_operation](vesting-balances.md#vesting_balance_create_operation) - Create a vesting balance
* [vesting_balance_withdraw_operation](vesting-balances.md#vesting_balance_withdraw_operation) - Withdraw from a vesting balance
