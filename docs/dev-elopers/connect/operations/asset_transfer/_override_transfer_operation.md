# override_transfer_operation

Allows the issuer of an asset to transfer an asset from any account to any account if they have override_authority.

`memo` field is optional.

### JSON Example

```json
[
  38,{
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
    "memo": {
        "from": "ECHO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
        "to": "ECHO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
        "nonce": "16430576185191232340",
        "message": "74d0e455e2e5587b7dc85380102c3291"
    },
    "extensions": []
  }
]
```