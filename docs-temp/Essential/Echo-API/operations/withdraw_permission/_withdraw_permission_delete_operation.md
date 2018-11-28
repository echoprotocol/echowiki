# withdraw_permission_delete_operation

Delete an existing withdrawal permission.

This operation cancels a withdrawal permission, thus preventing any future withdrawals using that permission.

Fee is paid by withdraw_from_account, which is required to authorize this operation

### JSON Example

```json
[
  28,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "withdraw_from_account": "1.2.0",
    "authorized_account": "1.2.0",
    "withdrawal_permission": "1.12.0"
  }
]
```