# fill_order_operation

This is a virtual operation that is created while matching orders and emitted for the purpose of accurately tracking account history, accelerating a reindex.

### JSON Example

```json
[
  4,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "order_id": "0.0.0",
    "account_id": "1.2.0",
    "pays": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "receives": {
      "amount": 0,
      "asset_id": "1.3.0"
    }
  }
]
```