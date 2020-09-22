# Block Reward Operations

## block\_reward\_operation

Virtual operation that indicates payout of block reward

```cpp
struct block_reward_operation : public base_operation
{
   asset fee;
   account_id_type receiver;
   std::vector<asset> assets;

   extensions_type extensions;
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
    66,
    {
        "receiver": "1.2.0",
        "assets": [
            {
                "amount": 3606,
                "asset_id": "1.3.0"
            }
        ],
        "extensions": []
    }
]
```