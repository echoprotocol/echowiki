# change_sidechain_config_operation

## JSON Example

```javascript
[
  43,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "registrar": "1.2.0",
    "new_config": {
      "eth_contract_address": "0000000000000000000000000000000000000000",
      "eth_committee_update_method": {
        "method": "",
        "gas": 0
      },
      "eth_gen_address_method": {
        "method": "",
        "gas": 0
      },
      "eth_withdraw_method": {
        "method": "",
        "gas": 0
      },
      "eth_update_addr_method": {
        "method": "",
        "gas": 0
      },
      "eth_withdraw_token_method": {
        "method": "",
        "gas": 0
      },
      "eth_collect_tokens_method": {
        "method": "",
        "gas": 0
      },
      "eth_committee_updated_topic": "",
      "eth_gen_address_topic": "",
      "eth_deposit_topic": "",
      "eth_withdraw_topic": "",
      "erc20_deposit_topic": "",
      "ETH_asset_id": "1.3.0",
      "fines": {
        "create_eth_address": 0
      },
      "waiting_blocks": 0
    },
    "extensions": []
  }
]
```