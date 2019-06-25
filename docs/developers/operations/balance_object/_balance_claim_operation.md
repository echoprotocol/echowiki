# balance_claim_operation

Claim a balance in a @ref balance_object.

This operation is used to claim the balance in a given @ref balance_object. If the balance object contains a vesting balance, `total_claimed` must not exceed @ref balance_object::available at the time of evaluation. If the object contains a non-vesting balance, `total_claimed` must be the full balance of the object.

### JSON Example

```json
[
  34,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "deposit_to_account": "1.2.0",
    "balance_to_claim": "1.15.0",
    "balance_owner_key": "ECHO1111111111111111111111111111111114T1Anm",
    "total_claimed": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```