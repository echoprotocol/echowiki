# asset_settle_cancel_operation

Virtual op generated when force settlement is cancelled.

- `account` Account requesting the force settlement. This account pays the fee.
- `amount` Amount of asset to force settle. This must be a market-issued asset.

### JSON Example

```json
[
  42,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "settlement": "1.4.0",
    "account": "1.2.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```