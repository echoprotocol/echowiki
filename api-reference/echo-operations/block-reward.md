# Block Reward Operations

## block_reward_operation

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
    59,
    {
        "receiver": "1.2.0",
        "assets": [],
        "extensions": []
    }
]
```