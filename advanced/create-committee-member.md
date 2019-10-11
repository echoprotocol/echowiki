# Create Committee Member

## Adding an active Committee member

1. The user, having an account in the network, has the right to register for the role of committee member. To do this, use the wallet API `create_committee_member` method. To register committee member, you will need Ethereum and Bitcoin address for the relevant sidechains, as well as the amount that is sent and frozen for the entire time while the account is an active committee member, as well as another 1 month to withdraw this amount if excluded. The amount sent must be equal to or greater than the value entered in the network configuration.
   
   Since the Deposit amount is a network configuration parameter, it can be changed. In case of its increase, immediately after making changes, committee member have 10 days to replenish the frozen balance. If after 10 days the balance has not been replenished, committee member is excluded from the active members. But, if the balance is not replenished by 1/3 of the participants or more, the 10-day period is extended by another day and so on until more than 2/3 of the participants have a valid balance. Recalculation occurs in maitenance.

2. Once a committee member has been created, any of the active members of the Committee can use the wallet API method `create_activate_committee_member_proposal` using the [committee\_member\_activate\_operation](committee-member.md#committee_member_activate_operation), in which it proposes to include the new candidate in the list of participants. The decision is made on the result of approve for the proposal in the positive direction only if more than 2/3 of the active members of committee member approves for the addition.

3. As a result of adding a participant, the active committee members introduces the user to the sidechain mechanisms as well.

## Exclusion of an active committee member

1. Active committee members can use the wallet API method `create_deactivate_committee_member_proposal` using the [committee\_member\_deactivate\_operation](committee-member.md#committee_member_deactivate_operation). In case of more than 2/3 of the votes, the participant is excluded and becomes an inactive committee member, as well as removed from the sidechain mechanisms.

## Deposit funds

1. The user can transfer funds from the account balance to the frozen balance of committee member using the wallet API `committee_freeze_balance` method.

## Withdrawal of funds

1. The user can withdraw frozen funds only 1 month after he was expelled or left the committee for the last time using the wallet API method `committee_withdraw_balance`. When you become an active committee member again, the countdown resets.

2. Also, the `committee_frozen_balance_withdraw` method can output a large Deposit amount from the frozen balance.