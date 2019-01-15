# create_contract_operation

Creates new contract.

`eth_accuracy` if true all balances passing to contract with ethereum accuracy(18). More [here](https://wiki.echo-dev.io/developers/smart-contracts/solidity/introduction/#flag-of-using-ethereum-accuracy)

`supported_asset_id` is optional. Operation must be without this field if you dont want to link the contract with the specified asset.

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
    "eth_accuracy": false,
    "supported_asset_id": "1.3.0" // optional
  }
]
```