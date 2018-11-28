# call_order_update_operation

This operation can be used to add collateral, cover, and adjust the margin call price for a particular user.

For prediction markets the collateral and debt must always be equal.

This operation will fail if it would trigger a margin call that couldn't be filled.  If the margin call hits
the call price limit then it will fail if the call price is above the settlement price.

> Note: This operation can be used to force a market order using the collateral without requiring outside funds.

### JSON Example

```json
[
  3,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "funding_account": "1.2.0",
    "delta_collateral": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "delta_debt": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```