# How to: Freeze and unfreeze Echo funds for committee member

## Deposit funds

The user can transfer funds from the account balance to the frozen balance of committee member using the wallet [committee_freeze_balance](/api-reference/echo-wallet-api/README.md#committee_freeze_balance-owner_account-amount-broadcast) method that uses [committee_frozen_balance_deposit_operation](/api-reference/echo-operations/committee-member.md#committee_frozen_balance_deposit_operation).

```bash
unlocked >>> committee_freeze_balance 1.2.26 1000 true
{
  "ref_block_num": 81,
  "ref_block_prefix": 2772341062,
  "expiration": "2020-09-27T16:50:57",
  "operations": [[
      24,{
        "fee": {
          "amount": 20,
          "asset_id": "1.3.0"
        },
        "committee_member_account": "1.2.26",
        "amount": {
          "amount": 1000,
          "asset_id": "1.3.0"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "b6738517ab5f6586b1af916b4a15b8ddb302170126462a8d670c2e5bc1bace26046a80f82e6d22905d07a60a76219c0c2acdbf0a401a8f73006aa0b7b26ec804"
  ],
  "signed_with_echorand_key": false
}
```

To get committee frozen balance you can use wallet method [get_committee_frozen_balance](/api-reference/echo-wallet-api/README.md#get_committee_frozen_balance-owner_account)

```bash
unlocked >>> get_committee_frozen_balance 1.2.26
{
  "amount": "100000000000",
  "asset_id": "1.3.0"
}
```

## Withdrawal of funds

If committee member want to withdraw excessive frozen balance he can do that with the help of wallet method [committee_withdraw_balance](/api-reference/echo-wallet-api/README.md#committee_withdraw_balance-owner_account-amount-broadcast) that uses [committee_frozen_balance_withdraw_operation](/api-reference/echo-operations/committee-member.md#committee_frozen_balance_withdraw_operation). The main part of the balance can be withdrawn only after the time in seconds specified in `committee_balance_unfreeze_duration_seconds` in [chain_parameters](/api-reference/echo-objects/chain-parameters.md) after committee member left the committee for the last time. When you become an active committee member again, the countdown resets.

```bash
unlocked >>> committee_withdraw_balance 1.2.26 500 true
{
  "ref_block_num": 82,
  "ref_block_prefix": 3601599606,
  "expiration": "2020-09-27T16:52:30",
  "operations": [[
      25,{
        "fee": {
          "amount": 20,
          "asset_id": "1.3.0"
        },
        "committee_member_account": "1.2.26",
        "amount": {
          "amount": 500,
          "asset_id": "1.3.0"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "db8a6f6107590ed249809b6fe055533c290805617da54e98b85b308fd6ddde3931fb18d3c301d133aafd4b2538192a72e8481bc0ab08c0f39990f1314d8c2d00"
  ],
  "signed_with_echorand_key": false
}
```

```bash
unlocked >>> get_committee_frozen_balance 1.2.26
{
  "amount": "50000000000",
  "asset_id": "1.3.0"
}
```

## Withdrawal of surpluses

If as a result of the interval maintenance the chain parameter `committee_frozen_balance_to_activate` has decreased, then committee member can remove the excess after the time specified by the chain parameter `committee_balance_unfreeze_duration_seconds` using the operation [committee_frozen_balance_withdraw_operation](/api-reference/echo-operations/committee-member.md#committee_frozen_balance_withdraw_operation).
