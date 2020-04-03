# Block Reward Operations

## block\_reward\_operation

Virtual operation that indicates payout of block reward

```cpp
struct block_reward_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type receiver;
   std::set<asset> assets;

   extensions_type extensions;

   account_id_type fee_payer() const { return ECHO_NULL_ACCOUNT; }
};
```

### JSON Example

```json
[
    64,
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