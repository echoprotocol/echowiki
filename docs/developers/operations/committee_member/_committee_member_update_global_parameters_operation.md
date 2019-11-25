# committee_member_update_global_parameters_operation

Used by committee_members to update the global parameters of the blockchain.

This operation allows the committee_members to update the global parameters on the blockchain. These control various tunable aspects of the chain, including block and maintenance intervals, maximum data sizes, the fees charged by the network, etc.

This operation may only be used in a proposed transaction, and a proposed transaction which contains this operation must have a review period specified in the current global parameters before it may be accepted.

## JSON Example

```json
[
  29,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "new_parameters": {
      "current_fees": {
        "parameters": [],
        "scale": 10000
      },
      "block_interval": 5,
      "maintenance_interval": 86400,
      "maintenance_duration_seconds": 10,
      "committee_proposal_review_period": 1209600,
      "maximum_transaction_size": 2097152,
      "maximum_block_size": 5242880,
      "maximum_time_until_expiration": 86400,
      "maximum_proposal_lifetime": 2419200,
      "maximum_asset_whitelist_authorities": 10,
      "maximum_asset_feed_publishers": 10,
      "maximum_committee_count": 1001,
      "maximum_authority_membership": 10,
      "reserve_percent_of_fee": 2000,
      "network_percent_of_fee": 2000,
      "lifetime_referrer_percent_of_fee": 3000,
      "cashback_vesting_period_seconds": 31536000,
      "cashback_vesting_threshold": "10000000000",
      "count_non_member_votes": true,
      "allow_non_member_whitelists": false,
      "max_predicate_opcode": 1,
      "fee_liquidation_threshold": "10000000000",
      "accounts_per_fee_scale": 1000,
      "account_fee_scale_bitshifts": 4,
      "max_authority_depth": 2,
      "echorand_config": {
        "_time_net_1mb": 0,
        "_time_net_256b": 0,
        "_creator_count": 0,
        "_verifier_count": 0,
        "_ok_threshold": 0,
        "_max_bba_steps": 0,
        "_gc1_delay": 0
      },
      "sidechain_config": {
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
      "erc20_config": {
        "contract_code": "",
        "create_token_fee": 0,
        "transfer_topic": "",
        "check_balance_method": {
          "method": "",
          "gas": 0
        },
        "burn_method": {
          "method": "",
          "gas": 0
        },
        "issue_method": {
          "method": "",
          "gas": 0
        }
      },
      "gas_price": {
        "price": 1,
        "gas_amount": 1000
      },
      "extensions": []
    },
    "extensions": []
  }
]
```