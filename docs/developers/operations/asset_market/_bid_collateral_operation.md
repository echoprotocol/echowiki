# bid_collateral_operation

This operation can be used after a black swan to bid collateral for taking over part of the debt and the settlement_fund (see BSIP-0018).

### JSON Example

```json
[
  38,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "bidder": "1.2.0",
    "additional_collateral": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "debt_covered": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```