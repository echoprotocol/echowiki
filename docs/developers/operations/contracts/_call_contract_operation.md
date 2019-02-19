# call_contract_operation

Operation to call specified contract

```cpp
struct call_contract_operation : public base_contract_operation
{
  struct fee_parameters_type {
      uint64_t fee = 0;
  };

  contract_id_type callee;
};
```

Inherited from [base_contract_operation](../types/contract.md#base_contract_operation) so has all its fields. Its order described in `JSON` below

## JSON Example

```javascript
[
  48,{
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
    "callee": "1.16.0"
  }
]
```