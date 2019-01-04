# proposal_create_operation

The proposal_create_operation creates a transaction proposal, for use in multi-sig scenarios.

Creates a transaction proposal. The operations which compose the transaction are listed in order in `proposed_ops`, and `expiration_time` specifies the time by which the proposal must be accepted or it will fail permanently. The `expiration_time` cannot be farther in the future than the maximum expiration time set in the global properties object.

`review_period_seconds` is optional. When not defined takes value from global properties.

### JSON Example

```json
[
  22,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "fee_paying_account": "1.2.0",
    "expiration_time": "1970-01-01T00:00:00",
    "proposed_ops": [],
    "review_period_seconds": 100500,
    "extensions": []
  }
]
```