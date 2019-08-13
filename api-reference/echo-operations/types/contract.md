# contract types

## base_contract_operation

```cpp
struct base_contract_operation
{
    asset fee;
    account_id_type registrar;
    asset value;
    string code;
};
```

[asset](./common.md#asset)