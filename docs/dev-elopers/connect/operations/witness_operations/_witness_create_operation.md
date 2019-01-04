# witness_create_operation

Create a witness object, as a bid to hold a witness position on the network.

Accounts which wish to become witnesses may use this operation to create a witness object which stakeholders may vote on to approve its position as a witness.

### JSON Example

```json
[
  20,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "witness_account": "1.2.0",
    "url": "http://example.com",
    "block_signing_key": "ECHO1111111111111111111111111111111114T1Anm",
    "ed_signing_key": "0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```