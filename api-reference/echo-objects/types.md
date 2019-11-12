# Types

## Fee schedule

```cpp
struct fee_schedule
{
   flat_set<fee_parameters> parameters;
   uint32_t                 scale = ECHO_100_PERCENT; ///< fee * scale / ECHO_100_PERCENT
};
```

## Gas price type

```cpp
struct gas_price_t
{
   uint64_t price = 1;
   uint64_t gas_amount = 1000;
};
```