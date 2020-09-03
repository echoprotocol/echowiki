# Economy config

## Configuration parameters for block rewards distribution

```cpp
const uint16_t PERCENT_1 = 100;
const uint16_t PERCENT_100 = PERCENT_1 * 100;

struct config
{
    uint64_t blocks_in_interval = 1;
    uint8_t maintenances_in_interval = 1;
    int64_t block_emission_amount = 0;
    uint16_t block_producer_reward_ratio = 50 * PERCENT_1;
    uint16_t pool_divider = 30;
};
```
