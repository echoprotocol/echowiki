# vesting_balance_create_operation

Create a vesting balance.

The chain allows a user to create a vesting balance. Normally, vesting balances are created automatically as part of cashback and worker operations. This operation allows vesting balances to be created manually as well.

Manual creation of vesting balances can be used by a stakeholder to publicly demonstrate that they are committed to the chain. It can also be used as a building block to create transactions that function like public debt.  Finally, it is useful for testing vesting balance functionality.

Returns ID of newly created vesting_balance_object.

- `creator` Who provides funds initially
- `owner` Who is able to withdraw the balance

### JSON Example

```json
[
  30,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "creator": "1.2.0",
    "owner": "1.2.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "policy": [
      0,{
        "begin_timestamp": "1970-01-01T00:00:00",
        "vesting_cliff_seconds": 0,
        "vesting_duration_seconds": 0
      }
    ],
    "extensions": []
  }
]
```