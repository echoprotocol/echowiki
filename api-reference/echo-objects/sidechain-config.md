# Sidechain config

## Configuration parameters for Echo Sidechain

```cpp
struct config
{
   eth_address_type eth_contract_address;
   eth_method eth_committee_update_method;
   eth_method eth_gen_address_method;
   eth_method eth_withdraw_method;
   eth_method eth_update_addr_method;
   eth_method eth_update_contract_address;
   eth_method eth_withdraw_token_method;
   eth_method eth_collect_tokens_method;
   eth_topic_type eth_committee_updated_topic;
   eth_topic_type eth_gen_address_topic;
   eth_topic_type eth_deposit_topic;
   eth_topic_type eth_withdraw_topic;
   eth_topic_type erc20_deposit_topic;
   eth_topic_type erc20_withdraw_topic;
   asset_id_type ETH_asset_id;
   asset_id_type BTC_asset_id;
   sidechain_fines fines;
   gas_price_type gas_price;
   uint32_t satoshis_per_byte = 1;
   uint32_t coefficient_waiting_blocks = 0;
   uint64_t btc_deposit_withdrawal_min = 0;
   uint64_t btc_deposit_withdrawal_fee = 0;
   uint64_t eth_withdrawal_fee = 0;
   uint64_t eth_withdrawal_min = 0;
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