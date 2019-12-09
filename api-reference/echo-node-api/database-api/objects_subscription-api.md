## Objects

#### get\_objects\(ids\)

Get the objects corresponding to the provided IDs.

If any of the provided IDs does not map to an object, a null is returned in its position.

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<object_id_type> ids` | an array of object IDs, e.g. `["1.2.1", "1.2.2", ...]` |

#### Example

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

#### Returns

The objects retrieved, in the order they are mentioned in ids.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.2.1",
            "registrar": "1.2.0",
            "name": "committee-account",
            "active": {
                "weight_threshold": 14,
                "account_auths": [
                    [
                        "1.2.6",
                        1
                    ],
                    [
                        "1.2.7",
                        1
                    ],
                    [
                        "1.2.8",
                        1
                    ],
                    [
                        "1.2.9",
                        1
                    ],
                    [
                        "1.2.10",
                        1
                    ],
                    [
                        "1.2.11",
                        1
                    ],
                    [
                        "1.2.12",
                        1
                    ],
                    [
                        "1.2.13",
                        1
                    ],
                    [
                        "1.2.14",
                        1
                    ],
                    [
                        "1.2.15",
                        1
                    ],
                    [
                        "1.2.16",
                        1
                    ],
                    [
                        "1.2.17",
                        1
                    ],
                    [
                        "1.2.18",
                        1
                    ],
                    [
                        "1.2.19",
                        1
                    ],
                    [
                        "1.2.20",
                        1
                    ],
                    [
                        "1.2.21",
                        1
                    ],
                    [
                        "1.2.22",
                        1
                    ],
                    [
                        "1.2.23",
                        1
                    ],
                    [
                        "1.2.24",
                        1
                    ],
                    [
                        "1.2.25",
                        1
                    ]
                ],
                "key_auths": []
            },
            "echorand_key": "ECHODaQencDTLD5u6LGk9JNaMoJBh6sAkGchMnZPjtJXdvG3",
            "options": {
                "delegating_account": "1.2.5",
                "delegate_share": 2000,
                "extensions": []
            },
            "statistics": "2.5.1",
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "active_special_authority": [
                0,
                {}
            ],
            "top_n_control_flags": 0,
            "accumulated_reward": 0,
            "extensions": []
        },
        {
            "id": "1.2.2",
            "registrar": "1.2.0",
            "name": "relaxed-committee-account",
            "active": {
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": []
            },
            "echorand_key": "ECHODaQencDTLD5u6LGk9JNaMoJBh6sAkGchMnZPjtJXdvG3",
            "options": {
                "delegating_account": "1.2.5",
                "delegate_share": 2000,
                "extensions": []
            },
            "statistics": "2.5.2",
            "whitelisting_accounts": [],
            "blacklisting_accounts": [],
            "whitelisted_accounts": [],
            "blacklisted_accounts": [],
            "active_special_authority": [
                0,
                {}
            ],
            "top_n_control_flags": 0,
            "accumulated_reward": 0,
            "extensions": []
        }
    ]
}
```

## Subscriptions

### set\_subscribe\_callback\(callback, clear\_filter\)

Subscribe to updates.

#### Parameters

| Option | Description |
| :--- | :--- |
| `function<void(variant)> callback` | global subscription callback can be registered |
| `clear_filter` | whether subscribe to universal object creation and removal events |

If _clear\_filter_ is set to true, the API server will notify all newly created objects and ID of all newly removed objects to the client, no matter whether client subscribed to the objects

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "set_subscribe_callback",
        [
            CALLBACK_ID,
            true
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": null
}
```

#### Notice example

```javascript
{
    "method": "notice",
    "params": [ 
        CALLBACK_ID,
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

### set\_pending\_transaction\_callback\(callback\)

Subscribe to pending transactions.

#### Parameters

| Option | Description |
| :--- | :--- |
| `function<void(variant)> callback` | notifications for incoming unconfirmed transactions |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "set_pending_transaction_callback",
        [
            CALLBACK_ID
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": null
}
```

#### Notice example

```javascript
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

### set\_block\_applied\_callback\(callback\)

Subscribe to block applications.

#### Parameters

| Option | Description |
| :--- | :--- |
| `function<void(variant block_id)> callback` | gives a notification whenever the block block\_id is applied to the blockchain |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "set_block_applied_callback",
        [
            CALLBACK_ID
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": null
}
```

#### Notice example

```javascript
{
    "method": "notice",
    "params": [
        CALLBACK_ID,
        [
            "0013191865d4306288d52d2f648476508a159a0d"
        ]
    ]
}
```

### cancel\_all\_subscriptions\(\)

Stop receiving any notifications. Unsubscribe from all subscribed objects.

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "cancel_all_subscriptions",
        [
            CALLBACK_ID
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": null
}
```