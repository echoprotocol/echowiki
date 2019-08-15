# APIs

## Database API

---

## Objects

### get_objects(ids)

Get the objects corresponding to the provided IDs.

If any of the provided IDs does not map to an object, a null is returned in its position.

##### Parameters

| Option                               | Description                                            |
|--------------------------------------|:-------------------------------------------------------|
| `const vector<object_id_type>& ids`  | an array of object IDs, e.g. `["1.2.1", "1.2.2", ...]` |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_objects",
        [
            [
                "1.2.1",
                "1.2.2"
            ]
        ]
    ]
}
```

##### Returns

The objects retrieved, in the order they are mentioned in ids.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.2.1",
            "membership_expiration_date": "2106-02-07T06:28:15",
            "registrar": "1.2.1",
            "referrer": "1.2.1",
            "lifetime_referrer": "1.2.1",
            "network_fee_percentage": 0,
            "lifetime_referrer_fee_percentage": 10000,
            "referrer_rewards_percentage": 0,
            "name": "placeholder-account",
            "active": {
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": []
            },
            "echorand_key": "ECHODaQencDTLD5u6LGk9JNaMoJBh6sAkGchMnZPjtJXdvG3",
            "options": {
                "voting_account": "1.2.5",
                "delegating_account": "1.2.5",
                "num_committee": 0,
                "votes": [],
                "extensions": []
            },
            "statistics": "2.6.1",
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "active_special_authority": [
                0,
                {}
            ],
            "top_n_control_flags": 0,
            "extensions": []
        },
        {
            "id": "1.2.2",
            "membership_expiration_date": "2106-02-07T06:28:15",
            "registrar": "1.2.2",
            "referrer": "1.2.2",
            "lifetime_referrer": "1.2.2",
            "network_fee_percentage": 2000,
            "lifetime_referrer_fee_percentage": 8000,
            "referrer_rewards_percentage": 0,
            "name": "relaxed-committee-account",
            "active": {
                "weight_threshold": 56427,
                "account_auths": [
                    [
                        "1.2.6",
                        37368
                    ],
                    [
                        "1.2.10",
                        38116
                    ],
                    [
                        "1.2.14",
                        37368
                    ]
                ],
                "key_auths": []
            },
            "echorand_key": "ECHODaQencDTLD5u6LGk9JNaMoJBh6sAkGchMnZPjtJXdvG3",
            "options": {
                "voting_account": "1.2.5",
                "delegating_account": "1.2.5",
                "num_committee": 0,
                "votes": [],
                "extensions": []
            },
            "statistics": "2.6.2",
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "active_special_authority": [
                0,
                {}
            ],
            "top_n_control_flags": 0,
            "extensions": []
        }
    ]
}
```

---

## Subscriptions

#### set_subscribe_callback(callback, clear_filter)

Subscribe to updates.

##### Parameters

| Option                                     | Description                                                       |
|--------------------------------------------|:------------------------------------------------------------------|
| `function<void(const variant&)> callback`  | global subscription callback can be registered                    |
| `clear_filter`                             | whether subscribe to universal object creation and removal events |

If *clear_filter* is set to true, the API server will notify all newly created objects and ID of all newly removed objects to the client, no matter whether client subscribed to the objects

##### Notice example

```json
{
    "method": "notice",
    "params": [ 
        SUBSCRIPTION_ID,
        [
            [
                {
                    "id": "2.1.0", ...
                },
                {
                    "id": ...
                },
                {
                    "id": ...
                },
                {
                    "id": ...
                }
            ]
        ]
    ],
}
```

#### set_pending_transaction_callback(callback)

Subscribe to pending transactions.

##### Parameters

| Option                                     | Description                                         |
|--------------------------------------------|:----------------------------------------------------|
| `function<void(const variant&)> callback`  | notifications for incoming unconfirmed transactions |

#### Example

```json
{
    "id": 3,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "set_pending_transaction_callback",
        [
            "CALLBACK_ID"
        ]
    ]
}
```

#### Notice example

```json
{
    "method": "notice",
    "params": [
        CALLBACK_ID,
        [
            {
                "ref_block_num": 46,
                "ref_block_prefix": 620557504,
                "expiration": "2019-08-14T12:35:31",
                "operations": [
                    [
                        21,
                        {
                            "fee": {
                                "amount": 0,
                                "asset_id": "1.3.0"
                            },
                            "deposit_to_account": "1.2.26",
                            "balance_to_claim": "1.8.0",
                            "balance_owner_key": "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
                            "total_claimed": {
                                "amount": "1000000000000000",
                                "asset_id": "1.3.0"
                            },
                            "extensions": []
                        }
                    ]
                ],
                "extensions": [],
                "signatures": [
                    "1c8747b07f8131b4caaa52932c14a2472b52fdff339456ceb52befe5f2f14142e0020a4ba02258a68c43668bd36fc4c56ba19234a9a525e9c493fbc251103e0a"
                ],
                "signed_with_echorand_key": false
            }
        ]
    ]
}
```

#### Returns

```json
{
    "id": 3,
    "jsonrpc": "2.0",
    "result": null
}
```

#### set_block_applied_callback(callback)

Subscribe to block applications.

##### Parameters

| Option                                              | Description                                                                  |
|-----------------------------------------------------|:-----------------------------------------------------------------------------|
| `function<void(const variant& block_id)> callback`  | gives a notification whenever the block blockid is applied to the blockchain |

#### cancel_all_subscriptions()

Stop receiving any notifications. Unsubscribes from all subscribed objects.

---

## Blocks and transactions

#### get_block_header(block_num)

Retrieve a block header.

##### Parameters

| Option               | Description                                         |
|----------------------|:----------------------------------------------------|
| `uint32_t block_num` | height of the block whose header should be returned |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_block_header",
        [
            "1000"
        ]
    ]
}
```

##### Returns

Header of the referenced block, or null if no matching block was found.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "previous": "000003e7db7017a9a894ab68b0bd6e29a3a8ae03",
        "timestamp": "2019-06-25T07:13:12",
        "account": "1.2.8",
        "transaction_merkle_root": "0000000000000000000000000000000000000000",
        "vm_root": "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421.56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421 0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68",
        "round": 1000,
        "extensions": []
    }
}
```

#### get_block_header_batch(block_nums)

Retrieve multiple block header by block numbers.

##### Parameters

| Option                              | Description                                                            |
|-------------------------------------|:-----------------------------------------------------------------------|
| `const vector<uint32_t> block_nums` | vector containing heights of the block whose header should be returned |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_block_header_batch",
        [
            "10",
            "20",
            "30", ...
        ]
    ]
}
```

##### Returns

Array of headers of the referenced blocks, or null if no matching block was found.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        [
            10,
            {
                "previous": "00000009e0d2ebc49d9cc34c271d2585345aea57",
                "timestamp": "2019-06-25T06:08:32",
                "account": "1.2.10",
                "transaction_merkle_root": "0000000000000000000000000000000000000000",
                "vm_root": "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421.56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421 0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68",
                "round": 10,
                "extensions": []
            }
        ],
        [
            20,
            {
                "previous": "0000001315198620982920b66c2f998f3bedc704",
                "timestamp": "2019-06-25T06:09:04",
                "account": "1.2.8",
                "transaction_merkle_root": "0000000000000000000000000000000000000000",
                "vm_root": "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421.56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421 0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68",
                "round": 20,
                "extensions": []
            }
        ],
        [
            30,
            {
                "previous": "0000001d8e1bfa025ddcb0e9dc938e2fe56bee64",
                "timestamp": "2019-06-25T06:09:36",
                "account": "1.2.10",
                "transaction_merkle_root": "0000000000000000000000000000000000000000",
                "vm_root": "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421.56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421 0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68",
                "round": 30,
                "extensions": []
            }
        ]
    ]
}
```

#### get_block(block_num)

Retrieve a full, signed block.

##### Parameters

| Option               | Description                        |
|----------------------|:-----------------------------------|
| `uint32_t block_num` | height of the block to be returned |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_block",
        [
            "1000"
        ]
    ]
}
```

##### Returns

The referenced block, or null if no matching block was found.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "previous": "000003e7db7017a9a894ab68b0bd6e29a3a8ae03",
        "timestamp": "2019-06-25T07:13:12",
        "account": "1.2.8",
        "transaction_merkle_root": "0000000000000000000000000000000000000000",
        "vm_root": "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421.56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421 0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68",
        "round": 1000,
        "extensions": [],
        "ed_signature": "e96ab7d670280cfde4a9255a5abe0161f946f5be5427a33778064e705f85aea82f453b01988b64d941e13abc0de5f9c5596d6838a946e06a783e758a8195a801",
        "rand": "6b0fa959096a569810a9647034c7cdb4cd0ac30ccddcd5884ed24eb17bf68b6b",
        "cert": {
            "_rand": "6b0fa959096a569810a9647034c7cdb4cd0ac30ccddcd5884ed24eb17bf68b6b",
            "_block_hash": "000003e8c6a3b58cd0f3ccbec0af5fde717077da",
            "_producer": 8,
            "_signatures": [
                {
                    "_step": 4,
                    "_value": 0,
                    "_signer": 10,
                    "_fallback": 0,
                    "_bba_sign": "a40faf83ad8b89bd0be170638931ef9ef2c898c3d8bffbb3bf33e25139b67df7c8e106659489aa56d04518e2eca184512e743b6489b6773993dcbc529741a006"
                },
                {
                    "_step": 4,
                    "_value": 0,
                    "_signer": 9,
                    "_fallback": 0,
                    "_bba_sign": "b7ed84d12d81fb830dc54f99a50cd15781ab65634dbd2747176c16996f135d70f5aa69e0769d97e7cff1fe75296f5ad0f411f6dbe209d669e4957b55d99b750f"
                },
                {
                    "_step": 4,
                    "_value": 0,
                    "_signer": 13,
                    "_fallback": 0,
                    "_bba_sign": "defb6d7f4223b3a019dcd14a243b8bbaedc9e3c76fa1f945d8fa5b98b4416f3f007dd17966810509dc0c9e5ba598fe944b6edb6a6f11e2a8df210bec8ee0820d"
                },
                {
                    "_step": 4,
                    "_value": 0,
                    "_signer": 14,
                    "_fallback": 0,
                    "_bba_sign": "93c4d2a3f44257287f897c5be940d09fe91a04fb28943c29e7ea7acf0a073e3c99882baaae57f369f0f2027b789a627d36302f303c1d681d22a62d5e09f7eb06"
                },
                {
                    "_step": 4,
                    "_value": 0,
                    "_signer": 12,
                    "_fallback": 0,
                    "_bba_sign": "05157cc34d128cd206ad7dfdb1cd9592f79ebcb58da5b6a82256fcb88b71610a1ef2df0261bb34aed814169c6141317facb1629c12e1671d05e61a1b4e517c07"
                }
            ]
        },
        "transactions": []
    }
}
```

#### get_block_tx_number(id)

Get the total number of transactions in block.

##### Parameters

| Option                                  | Description                 |
|-----------------------------------------|:----------------------------|
| `const block_id_type(fc::ripemd160) id` | ID of the block to retrieve |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_block_tx_number",
        [
            "000003e835f96c81ce14fea203ad5658f8b2f5b1"
        ]
    ]
}
```

##### Returns

If block was found total number of transaction in block, or null if no matching block was found.

#### get_block_virtual_ops(block_num)

Get virtual ops from the block.

##### Parameters

| Option               | Description                        |
|----------------------|:-----------------------------------|
| `uint32_t block_num` | height of the block to be returned |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_block_virtual_ops",
        [
            "7429"
        ]
    ]
}
```

##### Returns

Array of operation history objects, or null if no matching operation was found.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.10.448",
            "op": [
                53,
                {
                    "fee": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "value": {
                        "amount": 99448,
                        "asset_id": "1.3.1"
                    },
                    "account": "1.2.21",
                    "deposit_id": "1.18.5",
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 7429,
            "trx_in_block": 6,
            "op_in_trx": 0,
            "virtual_op": 3886,
            "extensions": []
        }
    ]
}
```

#### get_transaction(block_num, trx_in_block)

Fetch an individual transaction.

##### Parameters

| Option                  | Description                                          |
|-------------------------|:-----------------------------------------------------|
| `uint32_t block_num`    | height of the block in which the transaction resides |
| `uint32_t trx_in_block` | index of the transaction in the block                |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_transaction",
        [
            "1000",
            "10"
        ]
    ]
}
```

##### Returns

A processed transaction object.

#### get_recent_transaction_by_id(id)

If the transaction has not expired, this method will return the
transaction for the given ID or it will return null if it is not known.
Just because it is not known does not mean it wasn’t included in the blockchain.

##### Parameters

| Option                                        | Description           |
|-----------------------------------------------|:----------------------|
| `const transaction_id_type(fc::ripemd160) id` | ID of the transaction |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_recent_transaction_by_id",
        [
            "a4002bfb11e667ed67ea40c20774b99a705f58c3"
        ]
    ]
}
```

##### Returns

A signed transaction object.

---

## Globals

#### get_chain_properties()

Retrieve the chain property object associated with the chain.

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_chain_properties",
        []
    ]
}
```

##### Returns

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "2.10.0",
        "chain_id": "31cde47f6b94908c2b2ed67c3365c7f58bb744dac145ecf6dc0941e1167c34ab",
        "immutable_parameters": {
            "min_committee_member_count": 9,
            "num_special_accounts": 0,
            "num_special_assets": 0
        },
        "extensions": []
    }
}
```

#### get_global_properties()

Retrieve the current global property object.

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_global_properties",
        []
    ]
}
```

##### Returns

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
                        ...
                    ], 
                        5,
                        {
                            "basic_fee": 500000,
                            "premium_fee": 200000000,
                            "price_per_kbyte": 100000
                        }
                    ],
                    [
                        6,
                        {
                            "fee": 2000000,
                            "price_per_kbyte": 100000
                        }
                    ],
                    [
                        7,
                        {
                            "fee": 300000
                        }
                    ],
                    [
                        8,
                        {
                            "membership_annual_fee": 200000000,
                            "membership_lifetime_fee": 1000000000
                        }
                    ],
                    [
                        9,
                        {
                            "fee": 50000000
                        }
                    ],
                    [
                        10,
                        {
                            "symbol3": 500,
                            "symbol4": 300,
                            "long_symbol": 500,
                            "price_per_kbyte": 10
                        }
                    ], ...
                ],
                "scale": 10000
            },
            "block_interval": 5,
            "maintenance_interval": 86400,
            "maintenance_duration_seconds": 10,
            "committee_proposal_review_period": 3600,
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
            "cashback_vesting_threshold": 10000000,
            "count_non_member_votes": true,
            "allow_non_member_whitelists": false,
            "max_predicate_opcode": 1,
            "fee_liquidation_threshold": 10000000,
            "accounts_per_fee_scale": 1000,
            "account_fee_scale_bitshifts": 4,
            "max_authority_depth": 2,
            "echorand_config": {
                "_time_net_1mb": 3000,
                "_time_net_256b": 1500,
                "_creator_count": 2,
                "_verifier_count": 7,
                "_ok_threshold": 5,
                "_max_bba_steps": 12,
                "_gc1_delay": 0
            },
            "sidechain_config": {
                "eth_contract_address": "2d02eC421beAf8b13d2A65E3428ae528FBBD8813",
                "eth_committee_update_method": {
                    "method": "7ff203ab",
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
                    "method": "f1e3eb60",
                    "gas": 1000000
                },
                "eth_withdraw_token_method": {
                    "method": "e21bd1ce",
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
                "erc20_deposit_topic": "",
                "ETH_asset_id": "1.3.1",
                "fines": {
                    "generate_eth_address": -10
                },
                "waiting_blocks": 30
            },
            "erc20_config": {
                "contract_code": "60806040523480156...",
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
        "next_available_vote_id": 9,
        "active_committee_members": [
            "1.5.4",
            "1.5.8",
            "1.5.0",
            "1.5.1",
            "1.5.2",
            "1.5.3",
            "1.5.5",
            "1.5.6",
            "1.5.7"
        ]
    }
}
```

#### get_config()

Retrieve compile-time constants.

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_config",
        []
    ]
}
```

##### Returns

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
        "ECHO_MIN_BLOCK_INTERVAL": 1,
        "ECHO_MAX_BLOCK_INTERVAL": 30,
        "ECHO_DEFAULT_BLOCK_INTERVAL": 5,
        "ECHO_DEFAULT_MAX_TRANSACTION_SIZE": 2097152,
        "ECHO_DEFAULT_MAX_BLOCK_SIZE": 5242880,
        "ECHO_DEFAULT_MAX_TIME_UNTIL_EXPIRATION": 86400,
        "ECHO_DEFAULT_MAINTENANCE_INTERVAL": 86400,
        "ECHO_DEFAULT_MAINTENANCE_DURATION_SECONDS": 10,
        "ECHO_MIN_UNDO_HISTORY": 10,
        "ECHO_MAX_UNDO_HISTORY": 10000,
        "ECHO_MIN_BLOCK_SIZE_LIMIT": 5120,
        "ECHO_MIN_TRANSACTION_EXPIRATION_LIMIT": 150,
        "ECHO_BLOCKCHAIN_PRECISION": 100000000,
        "ECHO_BLOCKCHAIN_PRECISION_DIGITS": 8,
        "ECHO_DEFAULT_TRANSFER_FEE": 100000000,
        "ECHO_MAX_INSTANCE_ID": "281474976710655",
        "ECHO_100_PERCENT": 10000,
        "ECHO_1_PERCENT": 100,
        "ECHO_MAX_MARKET_FEE_PERCENT": 10000,
        "ECHO_DEFAULT_FORCE_SETTLEMENT_DELAY": 86400,
        "ECHO_DEFAULT_FORCE_SETTLEMENT_OFFSET": 0,
        "ECHO_DEFAULT_FORCE_SETTLEMENT_MAX_VOLUME": 2000,
        "ECHO_DEFAULT_PRICE_FEED_LIFETIME": 86400,
        "ECHO_MAX_FEED_PRODUCERS": 200,
        "ECHO_DEFAULT_MAX_AUTHORITY_MEMBERSHIP": 10,
        "ECHO_DEFAULT_MAX_ASSET_WHITELIST_AUTHORITIES": 10,
        "ECHO_DEFAULT_MAX_ASSET_FEED_PUBLISHERS": 10,
        "ECHO_COLLATERAL_RATIO_DENOM": 1000,
        "ECHO_MIN_COLLATERAL_RATIO": 1001,
        "ECHO_MAX_COLLATERAL_RATIO": 32000,
        "ECHO_DEFAULT_MAINTENANCE_COLLATERAL_RATIO": 1750,
        "ECHO_DEFAULT_MAX_SHORT_SQUEEZE_RATIO": 1500,
        "ECHO_DEFAULT_MARGIN_PERIOD_SEC": 2592000,
        "ECHO_DEFAULT_MAX_COMMITTEE": 1001,
        "ECHO_DEFAULT_MAX_PROPOSAL_LIFETIME_SEC": 2419200,
        "ECHO_DEFAULT_COMMITTEE_PROPOSAL_REVIEW_PERIOD_SEC": 1209600,
        "ECHO_DEFAULT_NETWORK_PERCENT_OF_FEE": 2000,
        "ECHO_DEFAULT_LIFETIME_REFERRER_PERCENT_OF_FEE": 3000,
        "ECHO_DEFAULT_MAX_BULK_DISCOUNT_PERCENT": 5000,
        "ECHO_DEFAULT_BULK_DISCOUNT_THRESHOLD_MIN": "100000000000",
        "ECHO_DEFAULT_BULK_DISCOUNT_THRESHOLD_MAX": "10000000000000",
        "ECHO_DEFAULT_CASHBACK_VESTING_PERIOD_SEC": 31536000,
        "ECHO_DEFAULT_CASHBACK_VESTING_THRESHOLD": "10000000000",
        "ECHO_DEFAULT_BURN_PERCENT_OF_FEE": 2000,
        "ECHO_DEFAULT_MAX_ASSERT_OPCODE": 1,
        "ECHO_DEFAULT_FEE_LIQUIDATION_THRESHOLD": "10000000000",
        "ECHO_DEFAULT_ACCOUNTS_PER_FEE_SCALE": 1000,
        "ECHO_DEFAULT_ACCOUNT_FEE_SCALE_BITSHIFTS": 4,
        "ECHO_MAX_URL_LENGTH": 127,
        "ECHO_NEAR_SCHEDULE_CTR_IV": "7640891576956012808",
        "ECHO_FAR_SCHEDULE_CTR_IV": "13503953896175478587",
        "ECHO_CORE_ASSET_CYCLE_RATE": 17,
        "ECHO_CORE_ASSET_CYCLE_RATE_BITS": 32,
        "ECHO_DEFAULT_COMMITEE_PAY_VESTING_SECONDS": 86400,
        "ECHO_MAX_INTEREST_APR": 10000,
        "ECHO_COMMITTEE_ACCOUNT": "1.2.0",
        "ECHO_RELAXED_COMMITTEE_ACCOUNT": "1.2.2",
        "ECHO_NULL_ACCOUNT": "1.2.3",
        "ECHO_TEMP_ACCOUNT": "1.2.4"
    }
}
```

#### get_chain_id()

Get the chain ID.

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_chain_id",
        []
    ]
}
```

##### Returns

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": "31cde47f6b94908c2b2ed67c3365c7f58bb744dac145ecf6dc0941e1167c34ab"
}
```

#### get_dynamic_global_properties()

Retrieve the current dynamic global property object.

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_dynamic_global_properties",
        []
    ]
}
```

##### Returns

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "2.1.0",
        "head_block_number": 250396,
        "head_block_id": "0003d21cb1f7eb2f08e817f184c26748870f7e99",
        "time": "2019-07-04T09:47:50",
        "next_maintenance_time": "2019-07-05T00:00:00",
        "last_budget_time": "2019-07-04T00:00:02",
        "committee_budget": 1,
        "accounts_registered_this_interval": 24,
        "recently_missed_count": 396504222,
        "current_aslot": "31237959594",
        "recent_slots_filled": "120766797792735655195624277327849675482",
        "dynamic_flags": 0,
        "last_irreversible_block_num": 250381,
        "extensions": []
    }
}
```

---

## Keys

#### get_key_references(keys)

Retreive an array of account IDs associated with the given keys.

##### Parameters

| Option                             | Description             |
|------------------------------------|:------------------------|
| `vector<eddsa::public_key_t> keys` | an array of public keys |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_key_references",
        [
            "ECHOEdjiBUy2RBJ9sMN7jKMK4x9Fa4QVR7JgtNLwbgcZtcZB",
            "ECHO4oFbfkABpd6jenamJyjMwx3Sj98UUusYGSX9K8hDW8oK", ...
        ]
    ]
}
```

##### Returns

An array of arrays of account IDs for every public key provided.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        [],
        []
    ]
}
```

#### is_public_key_registered(public_key)

Determine whether of a public key is *currently* linked
to any *registered* (i.e. non-stealth) account on the blockchain.

##### Parameters

| Option                    | Description |
|---------------------------|:------------|
| `eddsa::public_key_t key` | public key  |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "is_public_key_registered",
        [
            "ECHOEdjiBUy2RBJ9sMN7jKMK4x9Fa4QVR7JgtNLwbgcZtcZB"
        ]
    ]
}

```

##### Returns

Whether a public key is known.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": false
}
```

---

## Accounts

#### get_accounts(account_ids)

Get a list of accounts by ID. This function has semantics identical to get_objects.

##### Parameters

| Option                                        | Description                     |
|-----------------------------------------------|:--------------------------------|
| `const vector<account_id_type>& accounts_ids` | IDs of the accounts to retrieve |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_accounts",
        [
            "1.2.10",
            "1.2.11", ...
        ]
    ]
}
```

##### Returns

The accounts corresponding to the provided IDs.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.2.10",
            "membership_expiration_date": "2106-02-07T06:28:15",
            "registrar": "1.2.10",
            "referrer": "1.2.10",
            "lifetime_referrer": "1.2.10",
            "network_fee_percentage": 2000,
            "lifetime_referrer_fee_percentage": 8000,
            "referrer_rewards_percentage": 0,
            "name": "init4",
            "active": {
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    [
                        "ECHO6EwDsYFoZ3bc4GSuS4dzFRSAJhEWgsCFB8aUBdLXvhdt",
                        1
                    ]
                ]
            },
            "echorand_key": "ECHO6EwDsYFoZ3bc4GSuS4dzFRSAJhEWgsCFB8aUBdLXvhdt",
            "options": {
                "voting_account": "1.2.5",
                "delegating_account": "1.2.5",
                "num_committee": 0,
                "votes": [],
                "extensions": []
            },
            "statistics": "2.6.10",
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "active_special_authority": [
                0,
                {}
            ],
            "top_n_control_flags": 0,
            "extensions": []
        },
        {
            "id": "1.2.11",
            "membership_expiration_date": "2106-02-07T06:28:15",
            "registrar": "1.2.11",
            "referrer": "1.2.11",
            "lifetime_referrer": "1.2.11",
            "network_fee_percentage": 2000,
            "lifetime_referrer_fee_percentage": 8000,
            "referrer_rewards_percentage": 0,
            "name": "init5",
            "active": {
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    [
                        "ECHOnSpfhDpbKkLhdt9Ve74uF1CY5U3PVBDvEXBuQYRJdKQ",
                        1
                    ]
                ]
            },
            "echorand_key": "ECHOnSpfhDpbKkLhdt9Ve74uF1CY5U3PVBDvEXBuQYRJdKQ",
            "options": {
                "voting_account": "1.2.5",
                "delegating_account": "1.2.5",
                "num_committee": 0,
                "votes": [],
                "extensions": []
            },
            "statistics": "2.6.11",
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "cashback_vb": "1.12.1",
            "active_special_authority": [
                0,
                {}
            ],
            "top_n_control_flags": 0,
            "extensions": []
        }
    ]
}
```

#### get_full_accounts(names_or_ids, subscribe)

Fetch all objects relevant to the specified accounts and subscribe to updates.

This function fetches all relevant objects for the given accounts,
and subscribes to updates to the given accounts. If any of the strings in names_or_ids
cannot be tied to an account, that input will be ignored.
All other accounts will be retrieved and subscribed.

##### Parameters

| Option                               | Description                                                                |
|--------------------------------------|:---------------------------------------------------------------------------|
| `const vector<string>& names_or_ids` | an array of either the names or IDs of accounts to retrieve (can be mixed) |
| `bool subscribe`                     | Whethere to subscribe to updates                                           |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_full_accounts",
        [
            [
                "1.2.10",
                "1.2.11"
            ],
            "false"
        ]
    ]
}
```

##### Returns

A map of strings from names_or_ids to the corresponding accounts.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        [
            "1.2.10",
            {
                "account": {
                    "id": "1.2.10",
                    "membership_expiration_date": "2106-02-07T06:28:15",
                    "registrar": "1.2.10",
                    "referrer": "1.2.10",
                    "lifetime_referrer": "1.2.10",
                    "network_fee_percentage": 2000,
                    "lifetime_referrer_fee_percentage": 8000,
                    "referrer_rewards_percentage": 0,
                    "name": "init4",
                    "active": {
                        "weight_threshold": 1,
                        "account_auths": [],
                        "key_auths": [
                            [
                                "ECHO6EwDsYFoZ3bc4GSuS4dzFRSAJhEWgsCFB8aUBdLXvhdt",
                                1
                            ]
                        ]
                    },
                    "echorand_key": "ECHO6EwDsYFoZ3bc4GSuS4dzFRSAJhEWgsCFB8aUBdLXvhdt",
                    "options": {
                        "voting_account": "1.2.5",
                        "delegating_account": "1.2.5",
                        "num_committee": 0,
                        "votes": [],
                        "extensions": []
                    },
                    "statistics": "2.6.10",
                    "whitelisting_accounts": [],
                    "blacklisting_accounts": [],
                    "whitelisted_accounts": [],
                    "blacklisted_accounts": [],
                    "active_special_authority": [
                        0,
                        {}
                    ],
                    "top_n_control_flags": 0,
                    "extensions": []
                },
                "statistics": {
                    "id": "2.6.10",
                    "owner": "1.2.10",
                    "most_recent_op": "2.9.2392",
                    "total_ops": 75,
                    "removed_ops": 0,
                    "total_blocks": 1577,
                    "total_core_in_orders": 0,
                    "lifetime_fees_paid": 0,
                    "pending_fees": 0,
                    "pending_vested_fees": 0,
                    "generated_eth_address": false,
                    "committeeman_rating": 0,
                    "extensions": []
                },
                "registrar_name": "init4",
                "referrer_name": "init4",
                "lifetime_referrer_name": "init4",
                "votes": [],
                "balances": [
                    {
                        "id": "2.5.3",
                        "owner": "1.2.10",
                        "asset_type": "1.3.0",
                        "balance": "1000000000000",
                        "extensions": []
                    }
                ],
                "vesting_balances": [
                    {
                        "id": "1.12.9",
                        "owner": "1.2.10",
                        "balance": {
                            "amount": "4827956465",
                            "asset_id": "1.3.0"
                        },
                        "policy": [
                            1,
                            {
                                "vesting_seconds": 86400,
                                "start_claim": "1970-01-01T00:00:00",
                                "coin_seconds_earned": "416365444195200",
                                "coin_seconds_earned_last_update": "2019-07-04T00:00:15"
                            }
                        ],
                        "extensions": []
                    }
                ],
                "limit_orders": [],
                "call_orders": [],
                "settle_orders": [],
                "proposals": [],
                "assets": [],
                "withdraws": []
            }
        ],
        [
            "1.2.11",
            {
                "account": {
                    "id": "1.2.11",
                    "membership_expiration_date": "2106-02-07T06:28:15",
                    "registrar": "1.2.11",
                    "referrer": "1.2.11",
                    "lifetime_referrer": "1.2.11",
                    "network_fee_percentage": 2000,
                    "lifetime_referrer_fee_percentage": 8000,
                    "referrer_rewards_percentage": 0,
                    "name": "init5",
                    "active": {
                        "weight_threshold": 1,
                        "account_auths": [],
                        "key_auths": [
                            [
                                "ECHOnSpfhDpbKkLhdt9Ve74uF1CY5U3PVBDvEXBuQYRJdKQ",
                                1
                            ]
                        ]
                    },
                    "echorand_key": "ECHOnSpfhDpbKkLhdt9Ve74uF1CY5U3PVBDvEXBuQYRJdKQ",
                    "options": {
                        "voting_account": "1.2.5",
                        "delegating_account": "1.2.5",
                        "num_committee": 0,
                        "votes": [],
                        "extensions": []
                    },
                    "statistics": "2.6.11",
                    "whitelisting_accounts": [],
                    "blacklisting_accounts": [],
                    "whitelisted_accounts": [],
                    "blacklisted_accounts": [],
                    "cashback_vb": "1.12.1",
                    "active_special_authority": [
                        0,
                        {}
                    ],
                    "top_n_control_flags": 0,
                    "extensions": []
                },
                "statistics": {
                    "id": "2.6.11",
                    "owner": "1.2.11",
                    "most_recent_op": "2.9.2421",
                    "total_ops": 119,
                    "removed_ops": 0,
                    "total_blocks": 13589,
                    "total_core_in_orders": 0,
                    "lifetime_fees_paid": 3411895877,
                    "pending_fees": 400019237,
                    "pending_vested_fees": 1019823,
                    "generated_eth_address": false,
                    "committeeman_rating": -10,
                    "extensions": []
                },
                "registrar_name": "init5",
                "referrer_name": "init5",
                "lifetime_referrer_name": "init5",
                "votes": [],
                "cashback_balance": {
                    "id": "1.12.1",
                    "owner": "1.2.11",
                    "balance": {
                        "amount": "35371134893",
                        "asset_id": "1.3.0"
                    },
                    "policy": [
                        1,
                        {
                            "vesting_seconds": 31536000,
                            "start_claim": "1970-01-01T00:00:00",
                            "coin_seconds_earned": "7430475834952995",
                            "coin_seconds_earned_last_update": "2019-07-04T00:00:02"
                        }
                    ],
                    "extensions": []
                },
                "balances": [
                    {
                        "id": "2.5.4",
                        "owner": "1.2.11",
                        "asset_type": "1.3.0",
                        "balance": "9996187065063",
                        "extensions": []
                    }
                ],
                "vesting_balances": [
                    {
                        "id": "1.12.1",
                        "owner": "1.2.11",
                        "balance": {
                            "amount": "35371134893",
                            "asset_id": "1.3.0"
                        },
                        "policy": [
                            1,
                            {
                                "vesting_seconds": 31536000,
                                "start_claim": "1970-01-01T00:00:00",
                                "coin_seconds_earned": "7430475834952995",
                                "coin_seconds_earned_last_update": "2019-07-04T00:00:02"
                            }
                        ],
                        "extensions": []
                    },
                    {
                        "id": "1.12.10",
                        "owner": "1.2.11",
                        "balance": {
                            "amount": "4827956465",
                            "asset_id": "1.3.0"
                        },
                        "policy": [
                            1,
                            {
                                "vesting_seconds": 86400,
                                "start_claim": "1970-01-01T00:00:00",
                                "coin_seconds_earned": "416365444195200",
                                "coin_seconds_earned_last_update": "2019-07-04T00:00:15"
                            }
                        ],
                        "extensions": []
                    }
                ],
                "limit_orders": [],
                "call_orders": [],
                "settle_orders": [],
                "proposals": [],
                "assets": [],
                "withdraws": []
            }
        ]
    ]
}
```

#### get_account_by_name(name)

Get the account object by it's name.

##### Parameters

| Option        | Description  |
|---------------|:-------------|
| `string name` | account name |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_account_by_name",
        [
            "nathan"
        ]
    ]
}
```

##### Returns

Account object it the account exists, null otherwise.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "1.2.15",
        "membership_expiration_date": "2106-02-07T06:28:15",
        "registrar": "1.2.15",
        "referrer": "1.2.15",
        "lifetime_referrer": "1.2.15",
        "network_fee_percentage": 2000,
        "lifetime_referrer_fee_percentage": 8000,
        "referrer_rewards_percentage": 0,
        "name": "nathan",
        "active": {
            "weight_threshold": 1,
            "account_auths": [],
            "key_auths": [
                [
                    "ECHO3BhH6nPrPmh6wAtsNphRTcreo2uzZLxSP8JyNJoiRD6Q",
                    1
                ]
            ]
        },
        "echorand_key": "ECHO3BhH6nPrPmh6wAtsNphRTcreo2uzZLxSP8JyNJoiRD6Q",
        "options": {
            "voting_account": "1.2.5",
            "delegating_account": "1.2.5",
            "num_committee": 0,
            "votes": [],
            "extensions": []
        },
        "statistics": "2.6.15",
        "whitelisting_accounts": [],
        "blacklisting_accounts": [],
        "whitelisted_accounts": [],
        "blacklisted_accounts": [],
        "cashback_vb": "1.12.3",
        "active_special_authority": [
            0,
            {}
        ],
        "top_n_control_flags": 0,
        "extensions": []
    }
}
```

#### get_account_references(account_id)

##### Parameters

| Option                       | Description       |
|------------------------------|:------------------|
| `account_id_type account_id` | id of the account |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_account_references",
        [
            "1.2.10"
        ]
    ]
}
```

##### Returns

All accounts that refer to the key or account id in their active authorities.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        "1.2.0",
        "1.2.2"
    ]
}
```

#### lookup_account_names(account_names)

Get a list of accounts by name. This function has semantics identical to get_objects.

##### Parameters

| Option                                | Description                       |
|---------------------------------------|:----------------------------------|
| `const vector<string>& account_names` | names of the accounts to retrieve |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "lookup_account_names",
        [
            "init1",
            "init2", ...
        ]
    ]
}
```

##### Returns

The accounts holding the provided names.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.2.7",
            "membership_expiration_date": "2106-02-07T06:28:15",
            "registrar": "1.2.7",
            "referrer": "1.2.7",
            "lifetime_referrer": "1.2.7",
            "network_fee_percentage": 2000,
            "lifetime_referrer_fee_percentage": 8000,
            "referrer_rewards_percentage": 0,
            "name": "init1",
            "active": {
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    [
                        "ECHO9zaxMcSs3roFS2KhfwBgL3TdUNDHEoQMRQMgRndC7Q4B",
                        1
                    ]
                ]
            },
            "echorand_key": "ECHO9zaxMcSs3roFS2KhfwBgL3TdUNDHEoQMRQMgRndC7Q4B",
            "options": {
                "voting_account": "1.2.5",
                "delegating_account": "1.2.5",
                "num_committee": 0,
                "votes": [],
                "extensions": []
            },
            "statistics": "2.6.7",
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "active_special_authority": [
                0,
                {}
            ],
            "top_n_control_flags": 0,
            "extensions": []
        },
        {
            "id": "1.2.8",
            "membership_expiration_date": "2106-02-07T06:28:15",
            "registrar": "1.2.8",
            "referrer": "1.2.8",
            "lifetime_referrer": "1.2.8",
            "network_fee_percentage": 2000,
            "lifetime_referrer_fee_percentage": 8000,
            "referrer_rewards_percentage": 0,
            "name": "init2",
            "active": {
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    [
                        "ECHOBt9reqYX9yccLmCw2tPwg3C5S5NucoxxhHRkq1ScmLSQ",
                        1
                    ]
                ]
            },
            "echorand_key": "ECHOBt9reqYX9yccLmCw2tPwg3C5S5NucoxxhHRkq1ScmLSQ",
            "options": {
                "voting_account": "1.2.5",
                "delegating_account": "1.2.5",
                "num_committee": 0,
                "votes": [],
                "extensions": []
            },
            "statistics": "2.6.8",
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "cashback_vb": "1.12.2",
            "active_special_authority": [
                0,
                {}
            ],
            "top_n_control_flags": 0,
            "extensions": []
        }
    ]
}
```

#### lookup_accounts(lower_bound_name, limit)

Get names and IDs for registered accounts.

##### Parameters

| Option                           | Description                                              |
|----------------------------------|:---------------------------------------------------------|
| `const string& lower_bound_name` | lower bound of the first name to return                  |
| `uint32_t limit`                 | maximum number of results to return must not exceed 1000 |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "lookup_accounts",
        [
            "init1",
            "3"
        ]
    ]
}
```

##### Returns

Map of account names to corresponding IDs.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        [
            "init1",
            "1.2.7"
        ],
        [
            "init2",
            "1.2.8"
        ],
        [
            "init3",
            "1.2.9"
        ]
    ]
}
```

#### get_account_addresses(account_id, from, limit)

Get addresses of specified account.

##### Parameters

| Option                             | Description                            |
|------------------------------------|:---------------------------------------|
| `const account_id_type account_id` | ID of the account                      |
| `const uint64_t from`              | number of block to start retrieve from |
| `const unsigned limit`             | maximum number of addresses to return  |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_account_addresses",
        [
            "1.2.10",
            "3",
            "6"
        ]
    ]
}
```

##### Returns

Addresses owned by account in specified ids interval.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "2.18.0",
            "owner": "1.2.15",
            "label": "test",
            "address": "8815c69de5d32d3061e52ca9386446332225b43d",
            "extensions": []
        }
    ]
}
```

#### get_account_by_address(address)

Get owner of specified address.

##### Parameters

| Option                        | Description                       |
|-------------------------------|:----------------------------------|
| `const fc::ripemd160 address` | address in form of ripemd160 hash | 

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_account_by_address",
        [
            "8815c69de5d32d3061e52ca9386446332225b43d"
        ]
    ]
}
```

##### Returns

Account id of owner.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": "1.2.15"
}
```

---

## Contracts

#### get_contract(contract_id)

Get a contract info from VM by ID.

##### Parameters

| Option                         | Description                    |
|--------------------------------|:-------------------------------|
| `contract_id_type contract_id` | ID of the contract to retrieve | 

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_contract",
        [
            "1.14.0"
        ]
    ]
}
```

##### Returns

The contracts data from VM corresponding to the provided ID.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        0,
        {
            "code": "6080604052600436106100d557...",
            "storage": [
                [
                    "036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0",
                    [
                        "05",
                        "d3c21bcecceda1000000"
                    ]
                ], ...
            ]
        }
    ]
}
```

#### get_contracts(contract_ids)

 Get a list of contracts by ID.

 ##### Parameters

| Option                                         | Description                      |
|------------------------------------------------|:---------------------------------|
| `const vector<contract_id_type>& contract_ids` | IDs of the contracts to retrieve | 

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_contracts",
        [
            "1.14.0",
            "1.14.1", ...
        ]
    ]
}
```

##### Returns

The contracts corresponding to the provided IDs.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.14.0",
            "type": "evm",
            "destroyed": false,
            "statistics": "2.17.0",
            "owner": "1.2.27",
            "extensions": []
        },
        {
            "id": "1.14.1",
            "type": "evm",
            "destroyed": false,
            "statistics": "2.17.1",
            "supported_asset_id": "1.3.0",
            "owner": "1.2.38",
            "extensions": []
        }
    ]
}
```

#### get_contract_logs(contract_id, from, to)

Get logs of specified contract.

##### Parameters

| Option                               | Description                            |
|--------------------------------------|:---------------------------------------|
| `const contract_id_type contract_id` | ID of the contract                     |
| `const uint32_t from`                | number of block to start retrieve from |
| `const uint32_t to`                  | number of block to end to retrieve     |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_contract_logs",
        [
            "1.14.0",
            "0",
            "3"
        ]
    ]
}
```

##### Returns

The contracts logs from specified blocks interval.

#### subscribe_contracts(contracts_ids)

Request notification about contracts.

##### Parameters 

| Option                                          | Description                       |
|-------------------------------------------------|:----------------------------------|
| `const vector<contract_id_type>& contracts_ids` | IDs of the contracts to subscribe |

#### subscribe_contract_logs(callback, contract_id, from, to)

Subscribe to contract's logs.

If you want to always receive alerts, then you can specify a very large number as the end of the range of the blocks you listen to, for example, `999999999`.

When calling this method, it will return all already existing events in the specified range as well as the `get_contract_logs` method.

##### Parameters

| Option                               | Description                                                 |
|:-------------------------------------|:------------------------------------------------------------|
| `function<void(const variant&)> cb`  | callback method which is called when contracts has new logs |
| `const contract_id_type contract_id` | ID of the contract                                          |
| `const uint32_t from`                | number of block to start retrieve from                      |
| `const uint32_t to`                  | number of block to end to retrieve                          |

##### Returns

The contracts logs from specified blocks interval.

##### Notice example

```json
{
    "method": "notice",
    "params": [ 
        SUBSCRIPTION_ID,
        [
            [
                {
                    "address": "0100000000000000000000000000000000000000",
                    "log": [
                        "a887d9f447f44f095186fc4a0bef9914881f330f24d2a2f63242c4c05eb26ee0"
                    ],
                    "data": "000000000000000000000000000000000000000000000000000000000000001a"
                }
            ]
        ]
    ],
}
```

#### get_contract_result(id)

Get contract result from VM for specified result_id

##### Parameters

| Option                              | Description              |
|-------------------------------------|:-------------------------|
| `const contract_result_id_type& id` | ID of result to retrieve |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_contract_result",
        [
            "1.15.0"
        ]
    ]
}
```

##### Returns

Result of execution.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        0,
        {
            "exec_res": {
                "excepted": "None",
                "new_address": "0100000000000000000000000000000000000000",
                "output": "6080604052600436106100d5576...",
                "code_deposit": "Success",
                "gas_refunded": 0,
                "gas_for_deposit": 1207462,
                "deposit_size": 5534
            },
            "tr_receipt": {
                "status_code": 1,
                "gas_used": 1692338,
                "bloom": "0000000000000000000000000000000000000000001000000002000...",
                "log": [
                    {
                        "address": "0100000000000000000000000000000000000000",
                        "log": [
                            "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                            "0000000000000000000000000000000000000000000000000000000000000000",
                            "000000000000000000000000000000000000000000000000000000000000001b"
                        ],
                        "data": "00000000000000000000000000000000000000000000d3c21bcecceda1000000"
                    }
                ]
            }
        }
    ]
}
```

#### call_contract_no_changing_state(contract_id, registrar_account, asset_type, code)

Call the provided contract, but don't change the state.

##### Parameters

| Option                              | Description                                                   |
|:------------------------------------|:--------------------------------------------------------------|
| `contract_id_type contract_id`      | ID of the contract                                            |
| `account_id_type registrar_account` | name of the account calling the contract                      |
| `asset_id_type asset_type`          | the type of the asset transfered to the contract              |
| `string code`                       | the hash of the method to call(or name for x86-x64 contracts) |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "call_contract_no_changing_state",
        [
            "1.14.0",
            "1.2.26",
            "1.3.0",
            "cfae3217"
        ]
    ]
}
```

##### Returns

Result of execution.

---

## Balances

#### get_account_balances(id, assets)

Get an account’s balances in various assets.

##### Parameters

| Option                                  | Description                                                                                         |
|:----------------------------------------|:----------------------------------------------------------------------------------------------------|
| `account_id_type id`                    | ID of the account to get balances for                                                               |
| `const flat_set<asset_id_type>& assets` | an array of IDs of the assets to get balances of; if empty, get all assets account has a balance in |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_account_balances",
        [
            "1.2.15",
            "1.3.0", ...
        ]
    ]
}
```

##### Returns

An array of balances of the account.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "amount": "799959899999120",
            "asset_id": "1.3.0"
        }
    ]
}
```

#### get_contract_balances(contract_id)

Get an contract's balances in various assets.

##### Parameters

| Option                         | Description                            |
|:-------------------------------|:---------------------------------------|
| `contract_id_type contract_id` | ID of the contract to get balances for |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_contract_balances",
        [
            "1.14.0"
        ]
    ]
}
```

##### Returns

An array of balances of the contract.

#### get_named_account_balances(name, assets)

Semantically equivalent to *get_account_balances*, but takes a name instead of an ID.

#### get_balance_objects(keys)

Returns all unclaimed balance objects for a set of addresses.

##### Parameters

| Option                                    | Description             |
|:------------------------------------------|:------------------------|
| `const vector<eddsa::public_key_t>& keys` | an array of public keys |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_balance_objects",
        [
            "ECHOEdjiBUy2RBJ9sMN7jKMK4x9Fa4QVR7JgtNLwbgcZtcZB",
            "ECHOB7X3uEz2mJXTBbbBzUw8f8neV3RFEje8o1isr3cuqF7Y", ...
        ]
    ]
}
```

##### Returns

An array of balances objects.

#### get_vested_balances(objs)

##### Parameters

| Option                                | Description             |
|:--------------------------------------|:------------------------|
| `const vector<balance_id_type>& objs` | an array of public keys |

##### Returns

An array of assets vested.

#### get_vesting_balances(account_id)

##### Parameters

| Option                        | Description              |
|:------------------------------|:-------------------------|
| `account_id_type account_ids` | the id of account to use |

##### Returns

An array of vesting balances.

#### get_account_count()

Get the total number of accounts registered with the blockchain.

---

## Assets

#### get_assets(asset_ids)

Get a list of assets by ID. This function has semantics identical to get_objects.

##### Parameters

| Option                                   | Description                   |
|:-----------------------------------------|:------------------------------|
| `const vector<asset_id_type>& asset_ids` | IDs of the assets to retrieve |

##### Returns

The assets corresponding to the provided IDs.

#### list_assets(lower_bound_symbol, limit)

Get assets alphabetically by symbol name.

##### Parameters

| Option                             | Description                                             |
|:-----------------------------------|:--------------------------------------------------------|
| `const string& lower_bound_symbol` | lower bound of symbol names to retrieve                 |
| `uint32_t limit`                   | maximum number of assets to fetch (must not exceed 100) |

##### Returns

The assets found.

#### lookup_asset_symbols(symbols_or_ids)

Get a list of assets by symbol. This function has semantics identical to get_objects.

##### Parameters

| Option                                 | Description                                          |
|:---------------------------------------|:-----------------------------------------------------|
| `const vector<string>& symbols_or_ids` | symbols or stringified IDs of the assets to retrieve |

##### Return

The assets corresponding to the provided symbols or IDs.

---

## Verifiers

#### get_current_verifiers(stage_num)

Get a list of accounts selected to be verifiers on current round on stage provided.

##### Parameters

| Option                          | Description  |
|:--------------------------------|:-------------|
| `const uint32_t stage_num`      | stage number |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_current_verifiers",
        [
            "5"
        ]
    ]
}
```

##### Returns

List of accounts selected to be verifiers on given stage.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        "1.2.11",
        "1.2.14",
        "1.2.15",
        "1.2.18",
        "1.2.32",
        "1.2.66",
        "1.2.73"
    ]
}
```

---

## Committee members

#### get_committee_members(committee_member_ids)

Get a list of committee_members by ID. This function has semantics identical to get_objects.

##### Parameters

| Option                                                         | Description                              |
|:---------------------------------------------------------------|:-----------------------------------------|
| `const vector<committee_member_id_type>& committee_member_ids` | IDs of the committee_members to retrieve |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_committee_members",
        [
            "1.5.0",
            "1.5.1", ...
        ]
    ]
}
```

##### Returns

The committee_members corresponding to the provided IDs.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.5.0",
            "committee_member_account": "1.2.6",
            "pay_vb": "1.12.5",
            "vote_id": "0:0",
            "total_votes": "4897997616",
            "url": "",
            "eth_address": "9BDC67627acA07aD0DAB8C6678765862b7d5F5C0",
            "extensions": []
        },
        {
            "id": "1.5.1",
            "committee_member_account": "1.2.7",
            "pay_vb": "1.12.6",
            "vote_id": "0:1",
            "total_votes": 0,
            "url": "",
            "eth_address": "2B1f2bDdEf68914106F72e7Ee9A43D95F180A397",
            "extensions": []
        }
    ]
}
```

#### get_committee_member_by_account(account)

Get the committee_member owned by a given account.

##### Parameters

| Option                    | Description                                                      |
|:--------------------------|:-----------------------------------------------------------------|
| `account_id_type account` | the ID of the account whose committee_member should be retrieved |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_committee_member_by_account",
        [
            "1.2.26"
        ]
    ]
}
```

##### Returns

The committee_member object, or null if the account does not have a committee_member.

#### lookup_committee_member_accounts(lower_bound_name, limit)

Get names and IDs for registered committee_members.

##### Parameters

| Option                           | Description                                                 |
|:---------------------------------|:------------------------------------------------------------|
| `const string& lower_bound_name` | lower bound of the first name to return                     |
| `uint32_t limit`                 | maximum number of results to return -- must not exceed 1000 |

##### Returns

Map of committee_member names to corresponding IDs.

#### get_committee_count()

Get the total number of committee registered with the blockchain

---

## Votes

#### lookup_vote_ids(votes)

Given a set of votes, return the objects they are voting for.

This will be a mixture of committee_member_object, witness_objects, and worker_objects

The results will be in the same order as the votes.
null will be returned for any vote ids that are not found.

##### Parameters

| Option                              | Description    |
|:------------------------------------|:---------------|
| `const vector<vote_id_type>& votes` | an array votes |

---

## Authority / validation

#### get_transaction_hex(trx)

Get a hexdump of the serialized binary form of a signed transaction.

#### get_required_signatures(ctrx, available_keys)

Takes a partially signed transaction and a set of public keys that the owner has the ability
to sign for and return the minimal subset of public keys that should add
signatures to the transaction.

#### get_potential_signatures(ctrx)

This method will return the set of all public keys that could possibly sign for a given transaction.
This call can be used by wallets to filter their set of public keys to just
the relevant subset prior to calling get_required_signatures to get the minimum subset.

#### verify_authority(trx)

Returns true of the trx has all of the required signatures, otherwise throws an exception.

#### verify_account_authority(name_or_id, signers)

Returns true if the signers have enough authority to authorize an account.

#### validate_transaction(trx)

Validates a transaction against the current state without broadcasting it on the network.

#### get_required_fees(ops, id)

For each operation calculate the required fee in the specified asset type.
If the asset type does not have a valid core_exchange_rate.

---

## Proposed transactions

#### get_proposed_transactions(id)

Returns the set of proposed transactions relevant to the specified account id.

##### Parameters

| Option               | Description           |
|:---------------------|:----------------------|
| `account_id_type id` | the ID of the account |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_proposed_transactions",
        [
            "1.2.26"
        ]
    ]
}
```

---

## Sidechain

#### get_eth_address(account)

Returns information about generated ethereum address, if then exist and approved, for the given account id.

##### Parameters

| Option                           | Description                                        |
|:---------------------------------|:---------------------------------------------------|
| `const account_id_type& account` | the id of the account to provide information about |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_eth_address",
        [
            "1.2.21"
        ]
    ]
}
```

##### Returns

The public ethereum address data stored in the blockchain

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "1.17.4",
        "account": "1.2.21",
        "eth_addr": "1134464B537884EE89cb298eEd674C9B14BCce47",
        "is_approved": true,
        "approves": [],
        "extensions": []
    }
}
```

#### get_account_deposits(account)

Returns all approved deposits, for the given account id.

##### Parameters

| Option                           | Description                                        |
|:---------------------------------|:---------------------------------------------------|
| `const account_id_type& account` | the id of the account to provide information about |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_account_deposits",
        [
            "1.2.21"
        ]
    ]
}
```

##### Returns

The all public deposits data stored in the blockchain.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.18.5",
            "deposit_id": 6,
            "account": "1.2.21",
            "value": 99448,
            "is_approved": true,
            "approves": [],
            "extensions": []
        }
    ]
}
```

#### get_account_withdrawals(account)

Returns all approved withdrawals, for the given account id.

##### Parameters

| Option                           | Description                                        |
|:---------------------------------|:---------------------------------------------------|
| `const account_id_type& account` | the id of the account to provide information about |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_account_withdrawals",
        [
            "1.2.21"
        ]
    ]
}
```

##### Returns

The all public withdrawals data stored in the blockchain.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.19.15",
            "withdraw_id": 15,
            "account": "1.2.21",
            "eth_addr": "46Ba2677a1c982B329A81f60Cf90fBA2E8CA9fA8",
            "value": 1000,
            "is_approved": true,
            "approves": [],
            "extensions": []
        }
    ]
}
```

---

## Sidechain ERC20

#### get_erc20_token(eth_addr)

Returns information about erc20 token, if then exist.

##### Parameters

| Option                             | Description                                       |
|:-----------------------------------|:--------------------------------------------------|
| `const eth_address_type& eth_addr` | the ethereum address of token in Ethereum network |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_erc20_token",
        [
            "0102fe7702b96808f7bbc0d4a888ed1468216cfd"
        ]
    ]
}
```

##### Returns

The public erc20 token data stored in the blockchain.

#### get_erc20_account_deposits(account)

Returns all approved deposits, for the given account id.

##### Parameters

| Option                           | Description                                        |
|:---------------------------------|:---------------------------------------------------|
| `const account_id_type& account` | the id of the account to provide information about |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_erc20_account_deposits",
        [
            "1.2.26"
        ]
    ]
}
```

##### Returns

The all public erc20 deposits data stored in the blockchain.

#### get_erc20_account_withdrawals(account)

Returns all approved withdrawals, for the given account id.

##### Parameters

| Option                           | Description                                        |
|:---------------------------------|:---------------------------------------------------|
| `const account_id_type& account` | the id of the account to provide information about |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_erc20_account_withdrawals",
        [
            "1.2.26"
        ]
    ]
}
```

##### Returns

The all public erc20 withdrawals data stored in the blockchain.

---

## Contract Feepool

#### get_contract_pool_balance(id)

Get an contract's pool balance in default asset.

##### Parameters

| Option                | Description                            |
|:----------------------|:---------------------------------------|
| `contract_id_type id` | ID of the contract to get balances for |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_contract_pool_balance",
        [
            "1.14.0"
        ]
    ]
}
```

##### Returns

Balances of the contract.

#### get_contract_pool_whitelist(id)

Get an contract's whitelist and blacklist.

##### Parameters

| Option                | Description                            |
|:----------------------|:---------------------------------------|
| `contract_id_type id` | ID of the contract to get balances for |

##### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [DATABASE_API_ID,
        "get_contract_pool_whitelist",
        [
            "1.14.0"
        ]
    ]
}
```

##### Returns

Struct contract_pool_whitelist which consist of whitelist blacklist.
