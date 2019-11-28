## Authority / validation

### get\_transaction\_hex\(trx\)

Get a hexdump of the serialized binary form of a signed transaction.

#### Parameters

| Option | Description |
| :--- | :--- |
| `signed_transaction trx` | object signed transaction |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_transaction_hex",
        [
            {
                "ref_block_num": "221",
                "ref_block_prefix": "4141892275",
                "expiration": "1970-01-01T00:00:00",
                "operations": []
            }
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": "dd00b342e0f60000000000000000"
}
```

### get\_required\_signatures\(ctrx, available\_keys\)

Takes a partially signed transaction and a set of public keys that the owner has the ability to sign for and return the minimal subset of public keys that should add signatures to the transaction.

#### Parameters

| Option | Description |
| :--- | :--- |
| `signed_transaction trx` | object signed transaction |
| `flat_set<public_key_t> available_keys` | an array of public keys |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_required_signatures",
        [
            {
                "ref_block_num": 1719,
                "ref_block_prefix": 3664479505,
                "expiration": "2019-08-21T14:16:03",
                "operations": [
                    [
                        28,
                        {
                            "fee": {
                                "amount": 5001,
                                "asset_id": "1.3.0"
                            },
                            "owner": "1.2.26",
                            "label": "label1",
                            "extensions": []
                        }
                    ]
                ],
                "extensions": [],
                "signatures": [],
            },
            [
                "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu"
            ]
        ]
    ]
}
```

#### Returns

A set of public keys.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu"
    ]
}
```

### get\_potential\_signatures\(ctrx\)

This method will return the set of all public keys that could possibly sign for a given transaction. This call can be used by wallets to filter their set of public keys to just the relevant subset prior to calling get\_required\_signatures to get the minimum subset.

#### Parameters

| Option | Description |
| :--- | :--- |
| `signed_transaction trx` | object signed transaction |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_potential_signatures",
        [
            {
                "ref_block_num": 1719,
                "ref_block_prefix": 3664479505,
                "expiration": "2019-08-21T14:16:03",
                "operations": [
                    [
                        28,
                        {
                            "fee": {
                                "amount": 5001,
                                "asset_id": "1.3.0"
                            },
                            "owner": "1.2.26",
                            "label": "label1",
                            "extensions": []
                        }
                    ]
                ],
                "extensions": [],
                "signatures": [
                    "aa936713a49db3b2881ece72879dc2cb22c4b81368f9bbb4e57666b7277b96e153a5519a8fed82ca54ee71cc3dd0a33c614aa44613580009e2de242de5ce8902"
                ],
                "signed_with_echorand_key": false
            }
        ]
    ]
}
```

#### Returns

A set of public keys.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu"
    ]
}
```

### verify\_authority\(trx\)

Returns true of the trx has all of the required signatures, otherwise throws an exception.

#### Parameters

| Option | Description |
| :--- | :--- |
| `signed_transaction trx` | object signed transaction |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "verify_authority",
        [
            {
                "ref_block_num": 1719,
                "ref_block_prefix": 3664479505,
                "expiration": "2019-08-21T14:16:03",
                "operations": [
                    [
                        28,
                        {
                            "fee": {
                                "amount": 5001,
                                "asset_id": "1.3.0"
                            },
                            "owner": "1.2.26",
                            "label": "label1",
                            "extensions": []
                        }
                    ]
                ],
                "extensions": [],
                "signatures": [
                    "aa936713a49db3b2881ece72879dc2cb22c4b81368f9bbb4e57666b7277b96e153a5519a8fed82ca54ee71cc3dd0a33c614aa44613580009e2de242de5ce8902"
                ],
                "signed_with_echorand_key": false
            }
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": true
}
```

### verify\_account\_authority\(name\_or\_id, signers\)

Returns true if the signers have enough authority to authorize an account.

#### Parameters

| Option | Description |
| :--- | :--- |
| `string name_or_id` | the name or ID of the account |
| `flat_set<public_key_t> signers` | an array of public keys |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "verify_account_authority",
        [
            "nathan",
            [
                "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu"
            ]
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": true
}
```

### validate\_transaction\(trx\)

Validates a transaction against the current state without broadcasting it on the network.

#### Parameters

| Option | Description |
| :--- | :--- |
| `signed_transaction trx` | object signed transaction |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "validate_transaction",
        [
            {
                "ref_block_num": 3530,
                "ref_block_prefix": 636194404,
                "expiration": "2019-08-21T15:36:27",
                "operations": [
                    [
                        28,
                        {
                            "fee": {
                                "amount": 5002,
                                "asset_id": "1.3.0"
                            },
                            "owner": "1.2.26",
                            "label": "god_please",
                            "extensions": []
                        }
                    ]
                ],
                "extensions": [],
                "signatures": [
                    "22e67b0b5072fd1e6901d983663b093b81898b318f34ee931e244f076c387cda7f32027cc31b7d50c77299072ddc516ffaf538e6b5c6d385830f1b4d050db20f"
                ],
                "signed_with_echorand_key": false
            }
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "ref_block_num": 3530,
        "ref_block_prefix": 636194404,
        "expiration": "2019-08-21T15:36:27",
        "operations": [
            [
                28,
                {
                    "fee": {
                        "amount": 5002,
                        "asset_id": "1.3.0"
                    },
                    "owner": "1.2.26",
                    "label": "god_please",
                    "extensions": []
                }
            ]
        ],
        "extensions": [],
        "signatures": [
            "22e67b0b5072fd1e6901d983663b093b81898b318f34ee931e244f076c387cda7f32027cc31b7d50c77299072ddc516ffaf538e6b5c6d385830f1b4d050db20f"
        ],
        "signed_with_echorand_key": false,
        "operation_results": [
            [
                1,
                "2.15.4"
            ]
        ]
    }
}
```

### get\_required\_fees\(ops, id\)

For each operation calculate the required fee in the specified asset type. If the asset type does not have a valid core\_exchange\_rate.

#### Parameters

| Option | Description |
| :--- | :--- |
| `string name_or_id` | the name or ID of the account |
| `flat_set<public_key_t> signers` | an array of public keys |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_required_fees",
        [
            [
                [
                    28,
                    {
                        "fee": {
                            "amount": 5002,
                            "asset_id": "1.3.0"
                        },
                        "owner": "1.2.26",
                        "label": "god_please",
                        "extensions": []
                    }
                ]
            ],
            "1.3.0"
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "amount": 5002,
            "asset_id": "1.3.0"
        }
    ]
}
```