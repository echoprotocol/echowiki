# asset_global_settle_operation

Allows global settling of bitassets (black swan or prediction markets).

In order to use this operation, @ref asset_to_settle must have the global_settle flag set.

When this operation is executed all balances are converted into the backing asset at the settle_price and all open margin positions are called at the settle price.  If this asset is used as backing for other bitassets, those bitassets will be force settled at their current feed price.

### JSON Example 

```json
[
  18,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "asset_to_settle": "1.3.0",
    "settle_price": {
      "base": {
        "amount": 0,
        "asset_id": "1.3.0"
      },
      "quote": {
        "amount": 0,
        "asset_id": "1.3.0"
      }
    },
    "extensions": []
  }
]
```