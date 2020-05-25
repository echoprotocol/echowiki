# Create Committee Member

A committee member is an account that has certain privileges in relation to other accounts. Responsibilities of the committee member includes regulation of the operation of echo network and, in particular, bitcoin and ethereum [sidechains](/technologies/sidechains/README.md).
Also committee members are responsible for updating [chain_parameters](/api-reference/echo-objects/chain-parameters.md) for correct network operation.
Committee members also feed prices for bitassets. 

## Adding an active Committee member

The user, having an account in the network, has the right to register for the role of the committee member. To do this, use the wallet method [create_committee_member](/api-reference/echo-wallet-api/README.md#create_committee_member-owner_account-url-amount-eth_address-btc_public_key-broadcast) that uses [committee\_member\_create_\_operation](/api-reference/echo-operations/committee-member.md#committee_member_activate_operation). To register as committee member Ethereum address and Bitcoin public key are needed for sidechains. Also you need to have enough funds that will be frozen. The amount should be equal or greater than the value of `committee_frozen_balance_to_activate` from [chain_parameters](/api-reference/echo-objects/chain-parameters.md).
   
In case of increasing of deposit amount committee should replenish committee frozen balance to the required amount in time of 10 * `maintenance_interval` (parameter in [chain_parameters](/api-reference/echo-objects/chain-parameters.md)) . If after this amount of time the balance has not been replenished committee member is excluded from the active committee. But if the balance is not replenished by 1/3 of the participants or more this period of time is extended by another day and so on until more than 2/3 of the participants have a required amount on the frozen balance. Recalculation occurs during maintenance.

Once a committee member has been created, any of the active committee can use the wallet method [create_activate_committee_member_proposal](/api-reference/echo-wallet-api/README.md#create_activate_committee_member_proposal-sender-committee_to_activate-expiration_time) that adding [committee\_member\_activate\_operation](/api-reference/echo-operations/committee-member.md#committee_member_activate_operation) to proposal. For more info about proposals see [Create and Processing Propose](advanced/propose.md). It proposes to include the new candidate to the active committee. Should be approved by more than 2/3 of active committee members.

New active committee member is also starting to participate in sidechains regulation as well.

## Exclusion of an active committee member

Active committee members can use the wallet method [create_deactivate_committee_member_proposal](/api-reference/echo-wallet-api/README.md#create_deactivate_committee_member_proposal-sender-committee_to_activate-expiration_time) that adding [committee\_member\_deactivate\_operation](/api-reference/echo-operations/committee-member.md#committee_member_deactivate_operation) to proposal. The participant is excluded and becomes an inactive committee member if more than 2/3 members of activate committee added their approvals to proposal. Also deactivated committee member is removed from the sidechain regulation.
Deactivated committee member will be able to withdraw frozen funds after the time in seconds specified in `committee_balance_unfreeze_duration_seconds` in [chain_parameters](/api-reference/echo-objects/chain-parameters.md) after deactivation.
## Deposit funds

The user can transfer funds from the account balance to the frozen balance of committee member using the wallet [committee_freeze_balance](/api-reference/echo-wallet-api/README.md#committee_freeze_balance-owner_account-amount-broadcast) method that uses [committee\_frozen\_balance\_deposit\_operation](/api-reference/echo-operations/committee-member.md#committee_frozen_balance_deposit_operation).

## Withdrawal of funds

If committee member want to withdraw excessive frozen balance he can do that with the help of wallet method [committee_withdraw_balance](/api-reference/echo-wallet-api/README.md#committee_withdraw_balance-owner_account-amount-broadcast) that uses [committee\_frozen\_balance\_withdraw\_operation](/api-reference/echo-operations/committee-member.md#committee_frozen_balance_withdraw_operation). The main part of the balance can be withdrawn only after the time in seconds specified in `committee_balance_unfreeze_duration_seconds` in [chain_parameters](/api-reference/echo-objects/chain-parameters.md) after committee member left the committee for the last time. When you become an active committee member again, the countdown resets.

## Withdrawal of surpluses

If as a result of the interval maintenance the chain parameter `committee_frozen_balance_to_activate` has decreased, then committee member can remove the excess after the time specified by the chain parameter `committee_balance_unfreeze_duration_seconds` using the operation [committee\_frozen\_balance\_withdraw\_operation](/api-reference/echo-operations/committee-member.md#committee_frozen_balance_withdraw_operation).