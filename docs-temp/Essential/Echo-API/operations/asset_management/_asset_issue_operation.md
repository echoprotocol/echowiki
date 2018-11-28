# asset_issue_operation

- `memo` Optional field. User provided data encrypted to the memo key of the "to" account.

### JSON Example

```json
[
  14,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "asset_to_issue": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issue_to_account": "1.2.0",
    "extensions": []
  }
]
```