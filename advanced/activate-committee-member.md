# Create Committee Member

## Adding an active Committee member

The user, having an account in the network, has the right to register for the role of the committee member. To do this, use the wallet method `create_committee_member` that uses[committee\_member\_create_\_operation](/api-reference/echo-operations/committee-member.md#committee_member_activate_operation). To register as committee member Ethereum and Bitcoin addresses are needed for sidechains. Also you need to have enough funds that will be frozen. The amount should be equal or greater than the value of `committee_frozen_balance_to_activate` from chain_parameters. Note: if you'll become active committee member you will be able to withdraw frozen funds in a month after deactivation.
   
In case of its increasing of deposit amount committee should replenish committee frozen balance to the required amount in 10 days. If after 10 days the balance has not been replenished committee member is excluded from the active committee. But if the balance is not replenished by 1/3 of the participants or more the 10-day period is extended by another day and so on until more than 2/3 of the participants have a required amount on the frozen balance. Recalculation occurs during maintenance.

Once a committee member has been created, any of the active committee can use the wallet method `create_activate_committee_member_proposal` that adding [committee\_member\_activate\_operation](/api-reference/echo-operations/committee-member.md#committee_member_activate_operation) to proposal. For more info about proposals see [transaction proposal protocol](/api-reference/echo-operations/README.md#transaction-proposal-protocol). It proposes to include the new candidate to the active committee. Should be approved by more than 2/3 of active committee members.

New active committee member is also added to the sidechain mechanisms as well.

## Exclusion of an active committee member

Active committee members can use the wallet method `create_deactivate_committee_member_proposal` that adding [committee\_member\_deactivate\_operation](/api-reference/echo-operations/committee-member.md#committee_member_deactivate_operation) to proposal. The participant is excluded and becomes an inactive committee member if more than 2/3 members of activate committee added their approvals to propsal. Also deactivated committee member is removed from the sidechain mechanisms.

## Deposit funds

The user can transfer funds from the account balance to the frozen balance of committee member using the wallet `committee_freeze_balance` method that uses [committee\_frozen\_balance\_deposit\_operation](/api-reference/echo-operations/committee-member.md#committee_frozen_balance_deposit_operation).

## Withdrawal of funds

If committee member can withdraw excessive balance with the help of wallet method `committee_withdraw_balance` that uses [committee\_frozen\_balance\_withdraw\_operation](/api-reference/echo-operations/committee-member.md#committee_frozen_balance_withdraw_operation). The main part of the balance can be withdrawn only `committee_freeze_duration_seconds` after committee member left the committee for the last time. When you become an active committee member again, the countdown resets.

## Withdrawal of surpluses

If as a result of the interval maintenance the chain parameter `committee_frozen_balance_to_activate` has decreased, then you can remove the excess after the time specified by the chain parameter `committee_freeze_duration_seconds` using the operation [committee\_frozen\_balance\_withdraw\_operation](/api-reference/echo-operations/committee-member.md#committee_frozen_balance_withdraw_operation).