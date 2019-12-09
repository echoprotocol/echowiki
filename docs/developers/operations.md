# Echo Operations

#### Account Management

| Name                        | Description        |
| --------------------------- | ------------------ |
| [account_create_operation](operations/account_management/_account_create_operation.md)    | Create new account |
| [account_update_operation](operations/account_management/_account_update_operation.md)    | Update an existing account |
| [account_whitelist_operation](operations/account_management/_account_whitelist_operation.md) | This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets |
| [account_upgrade_operation](operations/account_management/_account_upgrade_operation.md)   | Manage an account's membership status |
| [account_address_create_operation](operations/account_management/_account_address_create_operation.md) | |

#### Assert Conditions

| Name             | Description                          |
| ---------------- | ------------------------------------ |
| [assert_operation](operations/assert_conditions/_assert_operation.md) | Assert that some conditions are true |


#### Asset management

| Name | Description |
| -------- | -------- |
| [asset_create_operation](operations/asset_management/_asset_create_operation.md) | Create new asset |
| [asset_global_settle_operation](operations/asset_management/_asset_global_settle_operation.md) | Allows global settling of BitAssets (black swan or prediction markets) |
| [asset_settle_operation](operations/asset_management/_asset_settle_operation.md) | Schedules a market-issued asset for automatic settlement |
| [asset_settle_cancel_operation](operations/asset_management/_asset_settle_cancel_operation.md) *[VIRTUAL]* | Virtual op generated when force settlement is cancelled. |
| [asset_fund_fee_pool_operation](operations/asset_management/_asset_fund_fee_pool_operation.md) |  |
| [asset_update_operation](operations/asset_management/_asset_update_operation.md) | Update options common to all assets |
| [asset_update_bitasset_operation](operations/asset_management/_asset_update_bitasset_operation.md) | Update options specific to BitAssets |
| [asset_update_feed_producers_operation](operations/asset_management/_asset_update_feed_producers_operation.md) | Update the set of feed-producing accounts for a BitAsset |
| [asset_publish_feed_operation](operations/asset_management/_asset_publish_feed_operation.md) | Publish price feeds for market-issued assets |
| [asset_issue_operation](operations/asset_management/_asset_issue_operation.md) |  |
| [asset_reserve_operation](operations/asset_management/_asset_reserve_operation.md) | Used to take an asset out of circulation, returning to the issuer |
| [asset_claim_fees_operation](operations/asset_management/_asset_claim_fees_operation.md) | Used to transfer accumulated fees back to the issuer's balance. |

#### Balance Object

| Name | Description |
| -------- | -------- |
| [balance_claim_operation](operations/balance_object/_balance_claim_operation.md) | Claim a balance in a `balance_object` |

#### For Committee Members

| Name | Description |
| -------- | -------- |
| [committee_member_create_operation](operations/committee_member/_committee_member_create_operation.md) | Create a `committee_member` object, as a bid to hold a `committee_member` seat on the network |
| [committee_member_update_operation](operations/committee_member/_committee_member_update_operation.md) | Update a `committee_member` object |
| [committee_member_update_global_parameters_operation](operations/committee_member/_committee_member_update_global_parameters_operation.md) | Used by committee members to update the global parameters of the blockchain |

#### Contract operations

| Name | Description |
| -------- | -------- |
| [create_contract_operation](operations/contracts/_create_contract_operation.md) | Creates a contract. |
| [call_contract_operation](operations/contracts/_call_contract_operation.md) | Calls a contract. |
| [contract_transfer_operation](operations/contracts/_contract_transfer_operation.md) *[VIRTUAL]* | Indicates internal contract transfers |
| [contract_update_operation](operations/contracts/_contract_update_operation.md) | Update contract data |
| [contract_fund_pool_operation](operations/contracts/_contract_fund_pool_operation.md) | Transfer asset to fee pool. |
| [contract_whitelist_operation](operations/contracts/_contract_whitelist_operation.md) | |

#### Sidechain operations

| Name | Description |
| -------- | -------- |
| [sidechain_eth_create_address_operation](operations/contracts/_sidechain_eth_create_address_operation.md) | |
| [sidechain_eth_approve_address_operation](operations/contracts/_sidechain_eth_approve_address_operation.md) | |
| [sidechain_eth_deposit_operation](operations/contracts/_sidechain_eth_deposit_operation.md) | |
| [sidechain_eth_send_deposit_operation](operations/contracts/_sidechain_eth_send_deposit_operation.md) | |
| [sidechain_eth_withdraw_operation](operations/contracts/_sidechain_eth_withdraw_operation.md) | |
| [sidechain_eth_send_withdraw_operation](operations/contracts/_sidechain_eth_send_withdraw_operation.md) | |
| [sidechain_eth_approve_withdraw_operation](operations/contracts/_sidechain_eth_approve_withdraw_operation.md) | |
| [sidechain_eth_update_contract_address_operation](operations/contracts/sidechain_eth_update_contract_address_operation.md) | |
| [sidechain_issue_operation](operations/contracts/_sidechain_issue_operation.md) | |
| [sidechain_burn_operation](operations/contracts/_sidechain_burn_operation.md) | |
| [sidechain_erc20_register_token_operation](operations/contracts/_sidechain_erc20_register_token_operation.md) | |
| [sidechain_erc20_deposit_token_operation](operations/contracts/_sidechain_erc20_deposit_token_operation.md) | |
| [sidechain_erc20_send_deposit_operation](operations/contracts/_sidechain_erc20_send_deposit_operation.md) | |
| [sidechain_erc20_withdraw_token_operation](operations/contracts/_sidechain_erc20_withdraw_token_operation.md) | |
| [sidechain_erc20_send_withdraw_operation](operations/contracts/_sidechain_erc20_send_withdraw_operation.md) | |
| [sidechain_erc20_approve_token_withdraw_operation](operations/contracts/_sidechain_erc20_approve_token_withdraw_operation.md) | |

#### Custom Extension

| Name | Description |
| -------- | -------- |
| [custom_operation](operations/custom/_custom_operation.md) | Provides a generic way to add higher level protocols on top of witness consensus |

#### Assets Market

| Name | Description |
| -------- | -------- |
| [limit_order_create_operation](operations/asset_market/_limit_order_create_operation.md) | Instructs the blockchain to attempt to sell one asset for another |
| [limit_order_cancel_operation](operations/asset_market/_limit_order_cancel_operation.md) | Used to cancel an existing limit order |
| [call_order_update_operation](operations/asset_market/_call_order_update_operation.md) | This operation can be used to add collateral, cover, and adjust the margin call price for a particular user |
| [fill_order_operation](operations/asset_market/_fill_order_operation.md) *[VIRTUAL]* | This is a virtual operation that is created while matching orders and emitted for the purpose of accurately tracking account history, accelerating a reindex |
| [bid_collateral_operation](operations/asset_market/_bid_collateral_operation.md) | This operation can be used after a black swan to bid collateral for taking over part of the debt and the settlement_fund (see BSIP-0018) |
| [execute_bid_operation](operations/asset_market/_execute_bid_operation.md) *[VIRTUAL]* | This is a virtual operation that is created while reviving a bitasset from collateral bids |

#### Transaction Proposal Protocol

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

##### Proposal operations

| Name | Description |
| -------- | -------- |
| [proposal_create_operation](operations/proposals/_proposal_create_operation.md) | Creates a transaction proposal, for use in multi-sig scenarios |
| [proposal_update_operation](operations/proposals/_proposal_update_operation.md) | Updates an existing transaction proposal |
| [proposal_delete_operation](operations/proposals/_proposal_delete_operation.md) | Deletes an existing transaction proposal |

#### Asset Transfer

| Name | Description |
| -------- | -------- |
| [transfer_operation](operations/asset_transfer/_transfer_operation.md) | Transfers an amount of one asset from one account to another |
| [override_transfer_operation](operations/asset_transfer/_override_transfer_operation.md) | Allows the issuer of an asset to transfer an asset from any account to any account if they have override_authority |
| [transfer_to_address_operation](operations/asset_transfer/_transfer_to_address_operation.md) | |

#### Vesting Balances

| Name | Description |
| -------- | -------- |
| [vesting_balance_create_operation](operations/vesting_balances/_vesting_balance_create_operation.md) | Create a vesting balance |
| [vesting_balance_withdraw_operation](operations/vesting_balances/_vesting_balance_withdraw_operation.md) | Withdraw from a vesting balance |
 
#### Withdrawal Permissions

| Name | Description |
| -------- | -------- |
| [withdraw_permission_create_operation](operations/withdraw_permission/_withdraw_permission_create_operation.md) | Create a new withdrawal permission |
| [withdraw_permission_update_operation](operations/withdraw_permission/_withdraw_permission_update_operation.md) | Update an existing withdraw permission |
| [withdraw_permission_claim_operation](operations/withdraw_permission/_withdraw_permission_claim_operation.md) | Withdraw from an account which has published a withdrawal permission |
| [withdraw_permission_delete_operation](operations/withdraw_permission/_withdraw_permission_delete_operation.md) | Delete an existing withdrawal permission |
