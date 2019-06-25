# create_contract_operation

Creates new contract.

`eth_accuracy` if true all balances passing to contract with ethereum accuracy(18). More [here](../../smart-contracts/solidity/introduction#flag-of-using-ethereum-accuracy)

`supported_asset_id` is optional. Operation must be without this field if you dont want to link the contract with the specified asset.

```cpp
struct create_contract_operation : public base_contract_operation
{
  struct fee_parameters_type {
      uint64_t fee = 0;
  };

  bool eth_accuracy = false;
  fc::optional<asset_id_type> supported_asset_id;
};
```

It's inherited from [base_contract_operation](../types/common.md#base_contract_operation) so has all its fields. Its order described in `JSON` below

## JSON Example

```javascript
[
  40,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "registrar": "1.2.0",
    "value": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "code": "",
    "supported_asset_id": "1.3.0", // optional
    "eth_accuracy": false,
    "extensions": []
  }
]
```