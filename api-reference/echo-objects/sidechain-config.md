# Sidechain config

## Configuration parameters for Echo Sidechain

```cpp
struct config
{
    eth_address_type eth_contract_address {"cd8a072122aeb5fa749c0c5ce817bbe58111a03d"};
    eth_method eth_committee_update_method {"f1e3eb60", 0};
    eth_method eth_gen_address_method {"ffcc34fd", 0};
    eth_method eth_withdraw_method {"e21bd1ce", 0};
    eth_method eth_update_addr_method {"7ff203ab", 0};
    eth_method eth_update_contract_address {"3659cfe6", 0};
    eth_method eth_withdraw_token_method {"1c69c0e2", 0};
    eth_method eth_collect_tokens_method {"5940a240", 0};
    eth_topic_type eth_committee_updated_topic {"514bf7702a7d2aca90dcf3d947158aad29563a17c1dbdc76d2eae84c22420142"};
    eth_topic_type eth_gen_address_topic {"1855f12530a368418f19b2b15227f19225915b8113c7e17d4c276e2a10225039"};
    eth_topic_type eth_deposit_topic {"77227a376c41a7533c952ebde8d7b44ee36c7a6cec0d3448f1a1e4231398356f"};
    eth_topic_type eth_withdraw_topic {"481c4276b65cda86cfcd095776a5e290a13932f5bed47d4f786b0ffc4d0d76ae"};
    eth_topic_type erc20_deposit_topic {"d6a701782aaded96fbe10d6bd46445ecef12edabc8eb5d3b15fb0e57f6395911"};
    eth_topic_type erc20_withdraw_topic {"ec7288d868c54d049bda9254803b6ddaaf0317b76e81601c0af91a480592b272"};
    asset_id_type ETH_asset_id {1};
    asset_id_type BTC_asset_id {2};
    sidechain_fines fines {0};
    gas_price_type gas_price = 0;
    uint32_t satoshis_per_byte = 1;
    uint32_t send_spv_echo_block_delay = 0;
    uint32_t aggregation_delay = 0;
    uint32_t btc_blocks_lag = 0;
    uint64_t btc_deposit_withdrawal_min_size = 0;
    uint64_t btc_deposit_withdrawal_fee = 0;
    uint32_t eth_blocks_lag = 0;
    uint64_t eth_withdrawal_fee = 0;
    uint64_t eth_withdrawal_min = 0;

    dev::u256 london_fork_block = 12965000;
    dev::u256 muir_glacier_fork_block = 9200000;
    dev::u256 constantinople_fork_block = 7280000;
    dev::u256 byzantium_fork_block = 4370000;
    dev::u256 homestead_fork_block = 1150000;
    dev::u256 difficulty_duration_limit = 13;
    dev::u256 difficulty_bound_divisor = 2048;
    dev::u256 minimum_difficulty = 131072;
};
```

## Configuration parameters for Echo ERC20 Sidechain

```cpp
struct erc20_config
{
   uint64_t create_token_fee;
   eth_topic_type transfer_topic;
   eth_method check_balance_method;
   eth_method burn_method;
   eth_method issue_method;
};
```

## Configuration parameters for Echo Stake Sidechain

```cpp
struct stake_config
{
    eth_address_type contract_address;
    eth_topic_type balance_updated_topic;
};
```

## SPV Penalties config

```cpp
struct config 
{
    echo::chain::share_type missed_gen_address_penalty;
    echo::chain::share_type missed_deposit_penalty;
    echo::chain::share_type missed_withdraw_penalty;
    echo::chain::share_type missed_balance_update_penalty;
    echo::chain::share_type missed_erc20_deposit_penalty;
    echo::chain::share_type missed_erc20_withdraw_penalty;
    echo::chain::share_type missed_erc20_transfer_penalty;
    echo::chain::share_type excess_withdraw_penalty;
    uint16_t penalty_multiplier = 100 * ECHO_1_PERCENT;
};
```