# witness_update_operation

Update a witness object's URL and block signing key.

Fields `new_url`, `new_signing_key` and `new_ed_signing_key` are optional.

### JSON Example

```json
[
  21,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "witness": "1.6.0",
    "witness_account": "1.2.0",
    "new_url": "http://another-example.com",
    "new_signing_key": "ECHO1111111111111111111111111111111114T1Anm",
    "new_ed_signing_key": "0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```