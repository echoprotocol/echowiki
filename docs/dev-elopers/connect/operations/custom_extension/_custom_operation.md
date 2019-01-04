# custom_operation

Provides a generic way to add higher level protocols on top of witness consensus.

There is no validation for this operation other than that required auths are valid and a fee is paid that is appropriate for the data contained.

### JSON Example

```json
[
  35,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "payer": "1.2.0",
    "required_auths": ["1.2.0"],
    "id": 0,
    "data": ""
  }
]
```