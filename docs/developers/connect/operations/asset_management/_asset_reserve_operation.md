# asset_reserve_operation

Used to take an asset out of circulation, returning to the issuer

> Note: You cannot use this operation on market-issued assets.

### JSON Example

```json
[
  15,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "payer": "1.2.0",
    "amount_to_reserve": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```