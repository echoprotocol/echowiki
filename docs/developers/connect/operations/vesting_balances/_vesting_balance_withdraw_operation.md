# vesting_balance_withdraw_operation

Withdraw from a vesting balance.

Withdrawal from a not-completely-mature vesting balance will result in paying fees.

- `owner` Must be vesting_balance.owner

### JSON Example

```json
[
  33,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "vesting_balance": "1.13.0",
    "owner": "1.2.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    }
  }
]
```