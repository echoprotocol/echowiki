# Create and Processing Propose

## Create Propose

Any account can create propose. Propose is activated after the end time of the collection of confirmations is reached, during "maintenance" and only if there are more confirmations or exactly than 2/3 + 1.
Propose are created by means of a wallet.

Echo allows users to propose a transaction which requires approval of multiple accounts in order to execute. The user proposes a transaction using proposal\_create\_operation, then signatory accounts use proposal\_update\_operations to add or remove their approvals from this operation. When a sufficient number of approvals have been granted, the operations in the proposal are used to create a virtual transaction which is subsequently evaluated. Even if the transaction fails, the proposal will be kept until the expiration time, at which point, if sufficient approval is granted, the transaction will be evaluated a final time. This allows transactions which will not execute successfully until a given time to still be executed through the proposal mechanism. The first time the proposed transaction succeeds, the proposal will be regarded as resolved, and all future updates will be invalid.

The proposal system allows for arbitrarily complex or recursively nested authorities. If a recursive authority \(i.e. an authority which requires approval of 'nested' authorities on other accounts\) is required for a proposal, then a second proposal can be used to grant the nested authority's approval. That is, a second proposal can be created which, when sufficiently approved, adds the approval of a nested authority to the first proposal. This multiple-proposal scheme can be used to acquire approval for an arbitrarily deep authority tree.

Note that at any time, a proposal can be approved in a single transaction if sufficient signatures are available on the proposal\_update\_operation, as long as the authority tree to approve the proposal does not exceed the maximum recursion depth. In practice, however, it is easier to use proposals to acquire all approvals, as this leverages on-chain notification of all relevant parties that their approval is required. Off-chain multi-signature approval requires some off-chain mechanism for acquiring several signatures on a single transaction. This off-chain synchronization can be avoided using proposals.

Accounts can create the following proposes:

#### [Activate committee member proposal](/api-reference/echo-wallet-api/README.md#create_activate_committee_member_proposal-sender-committee_to_activate-expiration_time)
#### [Deactivate committee member proposal](/api-reference/echo-wallet-api/README.md#create_deactivate_committee_member_proposal-sender-committee_to_activate-expiration_time)
#### [Fee change](/api-reference/echo-wallet-api/README.md#propose_fee_change-proposing_account-expiration_time-changed_values)
#### [Parameter change](/api-reference/echo-wallet-api/README.md#propose_parameter_change-proposing_account-expiration_time-changed_values)
#### [Update Ethereum contract address for sidechain](/api-reference/echo-wallet-api/README.md#propose_eth_update_contract_address-sender-expiration_time-new_addr_broadcast)

After creating "propose" in the wallet, id of the created "propose" will be displayed.

## Approve Propose

Only active committees can add confirmations to propose.

The wallet [approve_proposal](/api-reference/echo-wallet-api/README.md#approve_proposal-fee_paying_account-proposal_id-delta-broadcast) method is used to add or remove confirmations.