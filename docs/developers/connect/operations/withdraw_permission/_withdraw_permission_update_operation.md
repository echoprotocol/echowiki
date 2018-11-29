# withdraw_permission_update_operation

Update an existing withdraw permission.

This oeration is used to update the settings for an existing withdrawal permission. The accounts to withdraw to and from may never be updated. The fields which may be updated are the withdrawal limit (both amount and asset type may be updated), the withdrawal period length, the remaining number of periods until expiration, and the starting time of the new period.

Fee is paid by withdraw_from_account, which is required to authorize this operation

### JSON Example

```json
[
  26,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "withdraw_from_account": "1.2.0",
    "authorized_account": "1.2.0",
    "permission_to_update": "1.12.0",
    "withdrawal_limit": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "withdrawal_period_sec": 0,
    "period_start_time": "1970-01-01T00:00:00",
    "periods_until_expiration": 0
  }
]
```