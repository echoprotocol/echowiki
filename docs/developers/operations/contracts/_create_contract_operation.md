# create_contract_operation

Creates new contract.

* `supported_asset_id` is optional. Operation must be without this field if you dont want to link the contract with the specified asset.

## JSON Example

```json
[
  47,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "registrar": "1.2.0",
    "value": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "gasPrice": 0,
    "gas": 0,
    "code": "",
    "supported_asset_id": "1.3.0" // optional
  }
]
```