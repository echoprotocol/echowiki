## Globals

{% hint style="warning" %}
x86 is now in the development stage.
{% endhint %}

### get\_chain\_properties\(\)

Retrieve the chain property object associated with the chain.

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_chain_properties",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "2.9.0",
        "chain_id": "ee3aa7f1a6cc08a2759c2c9844a0dd475d5e9ee5a4a032f74c6d9fa1c0b9c89e",
        "extensions": []
    }
}
```

### get\_global\_properties\(\)

Retrieve the current global property object.

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_global_properties",
        []
    ]
}
```

#### Returns

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "2.0.0",
        "parameters": {
            "current_fees": {
                "parameters": [
                    [
                        0,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        1,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        2,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        3,
                        {
                            "basic_fee": 5000,
                            "premium_fee": 2000,
                            "price_per_kbyte": 1000
                        }
                    ],
                    [
                        4,
                        {
                            "fee": 200,
                            "price_per_kbyte": 100
                        }
                    ],
                    [
                        5,
                        {
                            "fee": 300000
                        }
                    ],
                    [
                        6,
                        {
                            "fee": 200,
                            "price_per_kbyte": 100
                        }
                    ],
                    [
                        7,
                        {
                            "symbol3": 500000,
                            "symbol4": 300000,
                            "long_symbol": 5000,
                            "price_per_kbyte": 10
                        }
                    ],
                    [
                        8,
                        {
                            "fee": 5000,
                            "price_per_kbyte": 10
                        }
                    ],
                    [
                        9,
                        {
                            "fee": 5000
                        }
                    ],
                    [
                        10,
                        {
                            "fee": 50000
                        }
                    ],
                    [
                        11,
                        {
                            "fee": 2000
                        }
                    ],
                    [
                        12,
                        {
                            "fee": 2000
                        }
                    ],
                    [
                        13,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        14,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        15,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        16,
                        {
                            "fee": 2000,
                            "price_per_kbyte": 10
                        }
                    ],
                    [
                        17,
                        {
                            "fee": 2000,
                            "price_per_kbyte": 10
                        }
                    ],
                    [
                        18,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        19,
                        {
                            "fee": 50000
                        }
                    ],
                    [
                        20,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        21,
                        {
                            "fee": 10
                        }
                    ],
                    [
                        22,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        23,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        24,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        25,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        26,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        27,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        28,
                        {}
                    ],
                    [
                        29,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        30,
                        {}
                    ],
                    [
                        31,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        32,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        33,
                        {}
                    ],
                    [
                        34,
                        {}
                    ],
                    [
                        35,
                        {}
                    ],
                    [
                        36,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        37,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        38,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        39,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        40,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        41,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        42,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        43,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        44,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        45,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        46,
                        {
                            "fee": 0,
                            "pool_fee": 500000000
                        }
                    ],
                    [
                        47,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        48,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        49,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        50,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        51,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        52,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        53,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        54,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        55,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        56,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        57,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        58,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        59,
                        {}
                    ]
                ],
                "scale": 10000
            },
            "maintenance_interval": 86400,
            "maintenance_duration_seconds": 10,
            "committee_proposal_review_period": 3600,
            "maximum_transaction_size": 2097152,
            "maximum_block_size": 5242880,
            "maximum_time_until_expiration": 86400,
            "maximum_proposal_lifetime": 2419200,
            "maximum_asset_whitelist_authorities": 10,
            "maximum_asset_feed_publishers": 10,
            "maximum_authority_membership": 10,
            "max_authority_depth": 2,
            "block_emission_amount": 1000,
            "block_producer_reward_ratio": 5000,
            "committee_frozen_balance_to_activate": "100000000000",
            "committee_maintenance_intervals_to_deposit": 10,
            "committee_balance_unfreeze_duration_seconds": 2592000,
            "x86_64_maximum_contract_size": 200000,
            "frozen_balances_multipliers": [
                [
                    90,
                    13000
                ],
                [
                    180,
                    14000
                ],
                [
                    360,
                    15000
                ]
            ],
            "echorand_config": {
                "_time_generate": 1000,
                "_time_net_1mb": 2000,
                "_time_net_256b": 1500,
                "_creator_count": 10,
                "_verifier_count": 12,
                "_ok_threshold": 9,
                "_max_bba_steps": 12,
                "_gc1_delay": 0,
                "_round_attempts": 3
            },
            "sidechain_config": {
                "eth_contract_address": "9E1E1a4Bc97e8b6dB45fa9538C943761A10dac99",
                "eth_committee_update_method": {
                    "method": "f1e3eb60",
                    "gas": 1000000
                },
                "eth_gen_address_method": {
                    "method": "ffcc34fd",
                    "gas": 1000000
                },
                "eth_withdraw_method": {
                    "method": "e21bd1ce",
                    "gas": 1000000
                },
                "eth_update_addr_method": {
                    "method": "7ff203ab",
                    "gas": 1000000
                },
                "eth_withdraw_token_method": {
                    "method": "1c69c0e2",
                    "gas": 1000000
                },
                "eth_collect_tokens_method": {
                    "method": "5940a240",
                    "gas": 1000000
                },
                "eth_committee_updated_topic": "514bf7702a7d2aca90dcf3d947158aad29563a17c1dbdc76d2eae84c22420142",
                "eth_gen_address_topic": "1855f12530a368418f19b2b15227f19225915b8113c7e17d4c276e2a10225039",
                "eth_deposit_topic": "77227a376c41a7533c952ebde8d7b44ee36c7a6cec0d3448f1a1e4231398356f",
                "eth_withdraw_topic": "481c4276b65cda86cfcd095776a5e290a13932f5bed47d4f786b0ffc4d0d76ae",
                "erc20_deposit_topic": "d6a701782aaded96fbe10d6bd46445ecef12edabc8eb5d3b15fb0e57f6395911",
                "erc20_withdraw_topic": "ec7288d868c54d049bda9254803b6ddaaf0317b76e81601c0af91a480592b272",
                "ETH_asset_id": "1.3.1",
                "BTC_asset_id": "1.3.2",
                "fines": {
                    "create_eth_address": -10
                },
                "gas_price": "10000000000",
                "satoshis_per_byte": 23,
                "coefficient_waiting_blocks": 100
            },
            "erc20_config": {
                "create_token_fee": 1000,
                "transfer_topic": "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "check_balance_method": {
                    "method": "70a08231",
                    "gas": 1000000
                },
                "burn_method": {
                    "method": "42966c68",
                    "gas": 1000000
                },
                "issue_method": {
                    "method": "40c10f19",
                    "gas": 1000000
                }
            },
            "gas_price": {
                "price": 1,
                "gas_amount": 1000
            },
            "extensions": []
        },
        "active_committee_members": [
            [
                "1.4.0",
                "1.2.6"
            ],
            [
                "1.4.1",
                "1.2.7"
            ],
            [
                "1.4.2",
                "1.2.8"
            ],
            [
                "1.4.3",
                "1.2.9"
            ],
            [
                "1.4.4",
                "1.2.10"
            ],
            [
                "1.4.5",
                "1.2.11"
            ],
            [
                "1.4.6",
                "1.2.12"
            ],
            [
                "1.4.7",
                "1.2.13"
            ],
            [
                "1.4.8",
                "1.2.14"
            ]
        ]
    }
}
```

### get\_config\(\)

Retrieve compile-time constants.

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_config",
        []
    ]
}
```

#### Returns

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "ECHO_SYMBOL": "ECHO",
        "ECHO_ADDRESS_PREFIX": "ECHO",
        "ECHO_ED_PREFIX": "ECHO",
        "ECHO_MIN_ACCOUNT_NAME_LENGTH": 1,
        "ECHO_MAX_ACCOUNT_NAME_LENGTH": 63,
        "ECHO_MIN_ASSET_SYMBOL_LENGTH": 3,
        "ECHO_MAX_ASSET_SYMBOL_LENGTH": 16,
        "ECHO_MAX_SHARE_SUPPLY": "1000000000000000",
        "ECHO_MAX_PAY_RATE": 10000,
        "ECHO_MAX_SIG_CHECK_DEPTH": 2,
        "ECHO_MIN_TRANSACTION_SIZE_LIMIT": 1024,
        "ECHO_DEFAULT_MAX_TRANSACTION_SIZE": 524288,
        "ECHO_DEFAULT_MAX_BLOCK_SIZE": 1048576,
        "ECHO_DEFAULT_MAX_TIME_UNTIL_EXPIRATION": 86400,
        "ECHO_DEFAULT_MAINTENANCE_INTERVAL": 86400,
        "ECHO_DEFAULT_MAINTENANCE_DURATION_SECONDS": 10,
        "ECHO_DEFAULT_COMMITTEE_FREEZE_DURATION_SECONDS": 2592000,
        "ECHO_MIN_UNDO_HISTORY": 10,
        "ECHO_MAX_UNDO_HISTORY": 10000,
        "ECHO_MIN_BLOCK_SIZE_LIMIT": 4096,
        "ECHO_MIN_TRANSACTION_EXPIRATION_LIMIT": 4,
        "ECHO_BLOCKCHAIN_PRECISION": 100000000,
        "ECHO_BLOCKCHAIN_PRECISION_DIGITS": 8,
        "ECHO_DEFAULT_TRANSFER_FEE": 100000000,
        "ECHO_MAX_INSTANCE_ID": "281474976710655",
        "ECHO_100_PERCENT": 10000,
        "ECHO_1_PERCENT": 100,
        "ECHO_DEFAULT_PRICE_FEED_LIFETIME": 86400,
        "ECHO_DEFAULT_MAX_AUTHORITY_MEMBERSHIP": 10,
        "ECHO_DEFAULT_MAX_ASSET_WHITELIST_AUTHORITIES": 10,
        "ECHO_DEFAULT_MAX_ASSET_FEED_PUBLISHERS": 10,
        "ECHO_COLLATERAL_RATIO_DENOM": 1000,
        "ECHO_DEFAULT_MIN_COMMITTEE_MEMBER_COUNT": 11,
        "ECHO_MAX_COMMITTEE": 19,
        "ECHO_DEFAULT_MAX_PROPOSAL_LIFETIME_SEC": 2419200,
        "ECHO_DEFAULT_COMMITTEE_PROPOSAL_REVIEW_PERIOD_SEC": 1209600,
        "ECHO_MAX_URL_LENGTH": 127,
        "ECHO_DEFAULT_MINIMUM_FEEDS": 7,
        "ECHO_REVERSIBLE_BLOCKS_COUNT": 15,
        "ECHO_DEFAULT_MAX_X86_64_CONTRACT_SIZE": 200000,
        "ECHO_NULL_ACCOUNT": "1.2.0",
        "ECHO_COMMITTEE_ACCOUNT": "1.2.1",
        "ECHO_RELAXED_COMMITTEE_ACCOUNT": "1.2.2",
        "ECHO_NULL_AUTHORITY_ACCOUNT": "1.2.3",
        "ECHO_TEMP_ACCOUNT": "1.2.4",
        "ECHO_PROXY_TO_SELF_ACCOUNT": "1.2.5"
    }
}
```

### get\_chain\_id\(\)

Get the chain ID.

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_chain_id",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": "31cde47f6b94908c2b2ed67c3365c7f58bb744dac145ecf6dc0941e1167c34ab"
}
```

### get\_dynamic\_global\_properties\(\)

Retrieve the current dynamic global property object.

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_dynamic_global_properties",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "2.1.0",
        "head_block_number": 108,
        "head_block_id": "0000006ca384bf6b3cdbbd9b6b4278390f49f44e",
        "time": "2019-10-14T10:25:31",
        "next_maintenance_time": "2019-10-14T10:30:00",
        "last_budget_time": "1970-01-01T00:00:00",
        "committee_budget": 0,
        "accounts_registered_this_interval": 0,
        "dynamic_flags": 0,
        "last_irreversible_block_num": 93,
        "extensions": []
    }
}
```

### get\_git\_revision\(\)

Retrieve info about git revision of running node

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_git_revision",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "ECHO_GIT_REVISION_SHA": "e910d1a1d8f00f4c2c86d047373e68bb6c482396",
        "ECHO_GIT_REVISION_UNIX_TIMESTAMP": "5 days ago",
        "ECHO_GIT_REVISION_DESCRIPTION": "0.20-rc.0-27-ge910d1a1"
    }
}
```

### get_current_incentives_info

Returns information about incentives. The returned object contains incentives_pool that indicates amounts that stored in pool now and incentives per block for current interval.

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_current_incentives_info",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "incentives_pool": [[
            "1.3.0",
            1506532392
            ]
        ],
        "incentives": [[
            0,
            502177
            ]
        ]
    }
}
```

### get_incentives_info(start_block end_block)

Returns the info about incentives in given block range [start_block, end_block]

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_incentives_info",
        [
            67,
            71
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [{
        "incentives_pool": {
          "id": "2.17.67",
          "pool": [[
              "1.3.0",
              273122631
            ]
          ],
          "block_number": 67
        },
        "incentives": [[
            "1.3.0",
            0
          ]]
      },{
        "incentives_pool": {
          "id": "2.17.68",
          "pool": [[
              "1.3.0",
              273030306
            ]
          ],
          "block_number": 68
        },
        "incentives": [[
            "1.3.0",
            0
          ]]
      },{
        "incentives_pool": {
          "id": "2.17.69",
          "pool": [[
              "1.3.0",
              272937981
            ]
          ],
          "block_number": 69
        },
        "incentives": [[
            "1.3.0",
            0
          ]]
      },{
        "incentives_pool": {
          "id": "2.17.70",
          "pool": [[
              "1.3.0",
              272845656
            ]
          ],
          "block_number": 70
        },
        "incentives": [[
            "1.3.0",
            92333
          ]
        ]
      },{
        "incentives_pool": {
          "id": "2.17.71",
          "pool": [[
              "1.3.0",
              526753331
            ]
          ],
          "block_number": 71
        },
        "incentives": [[
            "1.3.0",
            92333
          ]
        ]
      }
    ]
}
```