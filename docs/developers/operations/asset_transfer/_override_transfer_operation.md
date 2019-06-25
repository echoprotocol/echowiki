# override_transfer_operation

Allows the issuer of an asset to transfer an asset from any account to any account if they have override_authority.

`memo` field is optional.

### JSON Example

```json
[
  35,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "from": "1.2.0",
    "to": "1.2.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```