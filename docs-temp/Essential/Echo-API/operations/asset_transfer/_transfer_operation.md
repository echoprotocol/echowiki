# transfer_operation

Transfers an amount of one asset from one account to another.

`memo` field is optional.

### JSON Examples

```json
[
  0,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
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

##### With optional memo
```json
[
  0,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
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