# Echo Operations

#### Account Management

| Name                        | Description        |
| --------------------------- | ------------------ |
| [account_create_operation](operations/account_management/_account_create_operation.md)    | Create new account |
| [account_update_operation](operations/account_management/_account_update_operation.md)    | Update an existing account |
| [account_whitelist_operation](operations/account_management/_account_whitelist_operation.md) | This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets |
| [account_upgrade_operation](operations/account_management/_account_upgrade_operation.md)   | Manage an account's membership status |
| [account_transfer_operation](operations/account_management/_account_transfer_operation.md)  | Transfers the account to another account while clearing the white list |

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
| committee_member_update_global_parameters_operation | Used by committee members to update the global parameters of the blockchain |

#### Stealth Transfer

Operations related to stealth transfer of value

Stealth Transfers enable users to maintain their finanical privacy against even
though all transactions are public.  Every account has three balances:

1. Public Balance - everyone can see the balance changes and the parties involved
2. Blinded Balance - everyone can see who is transacting but not the amounts involved
3. Stealth Balance - both the amounts and parties involved are obscured

Account owners may set a flag that allows their account to receive(or not) transfers of these kinds
Asset issuers can enable or disable the use of each of these types of accounts.

Using the "temp account" which has no permissions required, users can transfer a
stealth balance to the temp account and then use the temp account to register a new
account.  In this way users can use stealth funds to create anonymous accounts with which
they can perform other actions that are not compatible with blinded balances (such as market orders)

##### Referral Progam

Stealth transfers that do not specify any account id cannot pay referral fees so 100% of the
transaction fee is paid to the network.

##### Fees

Stealth transfers can have an arbitrarylly large size and therefore the transaction fee for
stealth transfers is based purley on the data size of the transaction.

#### Confidential Operations

| Name | Description |
| -------- | -------- |
| [transfer_to_blind_operation](operations/stealth_transfer/_transfer_to_blind_operation.md) | Converts public account balance to a blinded or stealth balance |
| [transfer_from_blind_operation](operations/stealth_transfer/_transfer_from_blind_operation.md) | Converts blinded/stealth balance to a public account balance |
| [blind_transfer_operation](operations/stealth_transfer/_blind_transfer_operation.md) | Transfers from blind to blind |

#### Contract operations

| Name | Description |
| -------- | -------- |
| [create_contract_operation](operations/contracts/_create_contract_operation.md) | Creates a contract. |
| [call_contract_operation](operations/contracts/_call_contract_operation.md) | Calls a contract. |
| [contract_transfer_operation](operations/contracts/_contract_transfer_operation.md) *[VIRTUAL]* | Indicates internal contract transfers |

#### Custom Extension

| Name | Description |
| -------- | -------- |
| [custom_operation](operations/custom/_custom_operation.md) | Provides a generic way to add higher level protocols on top of witness consensus |

#### FBA

| Name | Description |
| -------- | -------- |
| [fba_distribute_operation](operations/fba/_fba_distribute_operation.md) *[VIRTUAL]* |  |

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

#### Witness Operations

| Name | Description |
| -------- | -------- |
| [witness_create_operation](operations/witnesses/_witness_create_operation.md) | Create a witness object, as a bid to hold a witness position on the network |
| [witness_update_operation](operations/witnesses/_witness_update_operation.md) | Update a witness object's URL and block signing key |

#### The Blockchain Worker System

Echo blockchains allow the creation of special "workers" which are elected positions paid by the blockchain
for services they provide. There may be several types of workers, and the semantics of how and when they are paid
are defined by the @ref worker_type_enum enumeration. All workers are elected by core stakeholder approval, by
voting for or against them.

Workers are paid from the blockchain's daily budget if their total approval (votes for - votes against) is
positive, ordered from most positive approval to least, until the budget is exhausted. Payments are processed at
the blockchain maintenance interval. If a worker does not have positive approval during payment processing, or if
the chain's budget is exhausted before the worker is paid, that worker is simply not paid at that interval.
Payment is not prorated based on percentage of the interval the worker was approved. If the chain attempts to pay
a worker, but the budget is insufficient to cover its entire pay, the worker is paid the remaining budget funds,
even though this does not fulfill his total pay. The worker will not receive extra pay to make up the difference
later. Worker pay is placed in a vesting balance and vests over the number of days specified at the worker's
creation.

Once created, a worker is immutable and will be kept by the blockchain forever.

#### Worker operations

| Name | Description |
| -------- | -------- |
| [worker_create_operation](operations/workers/_worker_create_operation.md) | Create a new worker object |
