# contract types

## contract_base_operation

```cpp
struct contract_base_operation
{
    asset fee;
    account_id_type registrar;
    asset value;
    string code;
};
```

[asset](./common.md#asset)