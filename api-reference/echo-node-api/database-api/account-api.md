## Accounts

### get\_accounts\(account\_ids\)

Get a list of accounts by ID. This function has semantics identical to get\_objects.

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<account_id_type> accounts_ids` | IDs of the accounts to retrieve |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_accounts",
        [
            [
                "1.2.10"
            ]
        ]
    ]
}
```

#### Returns

The accounts corresponding to the provided IDs.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.2.10",
            "registrar": "1.2.4",
            "name": "init4",
            "active": {
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    [
                        "ECHOEdjiBUy2RBJ9sMN7jKMK4x9Fa4QVR7JgtNLwbgcZtcZB",
                        1
                    ]
                ]
            },
            "echorand_key": "ECHOEdjiBUy2RBJ9sMN7jKMK4x9Fa4QVR7JgtNLwbgcZtcZB",
            "options": {
                "delegating_account": "1.2.5",
                "delegate_share": 2000,
                "extensions": []
            },
            "statistics": "2.5.10",
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

### get\_full\_accounts\(names\_or\_ids, subscribe\)

Fetch all objects relevant to the specified accounts and subscribe to updates.

This function fetches all relevant objects for the given accounts, and subscribes to updates to the given accounts. If any of the strings in names\_or\_ids cannot be tied to an account, that input will be ignored. All other accounts will be retrieved and subscribed.

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<string> names_or_ids` | an array of either the names or IDs of accounts to retrieve \(can be mixed\) |
| `bool subscribe` | whether to subscribe to updates |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_full_accounts",
        [
            [
                "1.2.10"
            ],
            "false"
        ]
    ]
}
```

#### Returns

A map of strings from names\_or\_ids to the corresponding accounts.

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
                    "registrar": "1.2.4",
                    "name": "init4",
                    "active": {
                        "weight_threshold": 1,
                        "account_auths": [],
                        "key_auths": [
                            [
                                "ECHOEdjiBUy2RBJ9sMN7jKMK4x9Fa4QVR7JgtNLwbgcZtcZB",
                                1
                            ]
                        ]
                    },
                    "echorand_key": "ECHOEdjiBUy2RBJ9sMN7jKMK4x9Fa4QVR7JgtNLwbgcZtcZB",
                    "options": {
                        "delegating_account": "1.2.5",
                        "delegate_share": 2000,
                        "extensions": []
                    },
                    "statistics": "2.5.10",
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
                "statistics": {
                    "id": "2.5.10",
                    "owner": "1.2.10",
                    "most_recent_op": "2.8.0",
                    "total_ops": 0,
                    "removed_ops": 0,
                    "total_blocks": 3,
                    "total_core_in_orders": 0,
                    "created_eth_address": false,
                    "committeeman_rating": 0,
                    "extensions": []
                },
                "registrar_name": "temp-account",
                "balances": [],
                "vesting_balances": [],
                "proposals": [],
                "assets": []
            }
        ]
    ]
}
```

#### Notice example

The notification was received by performing the account update operation for changing delegating\_account.

```javascript
{
    "method": "notice",
    "params": [
        CALLBACK_ID,
        [
            [
                {
                    "id": "1.2.10",
                    "registrar": "1.2.4",
                    "name": "init4",
                    "active": {
                        "weight_threshold": 1,
                        "account_auths": [],
                        "key_auths": [
                            [
                                "ECHOCh3WGJCMKkBJHFJpzaC378cwwYisNbNKpD6oYhcuA6nR",
                                1
                            ]
                        ]
                    },
                    "echorand_key": "ECHOCh3WGJCMKkBJHFJpzaC378cwwYisNbNKpD6oYhcuA6nR",
                    "options": {
                        "delegating_account": "1.2.5",
                        "delegate_share": 2000,
                        "extensions": []
                    },
                    "statistics": "2.5.10",
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
        ]
    ]
}
```

### get\_account\_by\_name\(name\)

Get the account object by it's name.

#### Parameters

| Option | Description |
| :--- | :--- |
| `string name` | account name |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_account_by_name",
        [
            "nathan"
        ]
    ]
}
```

#### Returns

Account object it the account exists, null otherwise.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "1.2.26",
        "registrar": "1.2.4",
        "name": "nathan",
        "active": {
            "weight_threshold": 1,
            "account_auths": [],
            "key_auths": [
                [
                    "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
                    1
                ]
            ]
        },
        "echorand_key": "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
        "options": {
            "delegating_account": "1.2.5",
            "delegate_share": 2000,
            "extensions": []
        },
        "statistics": "2.5.26",
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
}
```

### get\_account\_references\(account\_id\)

All accounts that refer to the key or account id in their active authorities.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account_id` | id of the account |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_account_references",
        [
            "1.2.10"
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
        "1.2.0",
        "1.2.2"
    ]
}
```

### lookup\_account\_names\(account\_names\)

Get a list of accounts by name. This function has semantics identical to get\_objects.

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<string> account_names` | names of the accounts to retrieve |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "lookup_account_names",
        [
            [
                "nathan"
            ]
        ]
    ]
}
```

#### Returns

The accounts holding the provided names.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.2.26",
            "registrar": "1.2.4",
            "name": "nathan",
            "active": {
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    [
                        "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
                        1
                    ]
                ]
            },
            "echorand_key": "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
            "options": {
                "delegating_account": "1.2.5",
                "delegate_share": 2000,
                "extensions": []
            },
            "statistics": "2.5.26",
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

### lookup\_accounts\(lower\_bound\_name, limit\)

Get names and IDs for registered accounts.

#### Parameters

| Option | Description |
| :--- | :--- |
| `string lower_bound_name` | lower bound of the first name to return |
| `uint32_t limit` | maximum number of results to return must not exceed 1000 |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "lookup_accounts",
        [
            "init1",
            "3"
        ]
    ]
}
```

#### Returns

Map of account names to corresponding IDs.

```javascript
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

### get\_account\_addresses\(account\_id, from, limit\)

Get addresses of specified account.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account_id` | ID of the account |
| `uint64_t from` | number of block to start retrieve from |
| `unsigned limit` | maximum number of addresses to return |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        2,
        "get_account_addresses",
        [
            "1.2.26",
            "0",
            "1"
        ]
    ]
}
```

#### Returns

Addresses owned by account in specified ids interval.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "2.15.0",
            "owner": "1.2.26",
            "label": "label1",
            "address": "6b34edbee7b4eaf077ab8217a50ac43a00d0ba05",
            "extensions": []
        }
    ]
}
```

### get\_account\_by\_address\(address\)

Get owner of specified address.

#### Parameters

| Option | Description |
| :--- | :--- |
| `ripemd160 address` | address in form of ripemd160 hash |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_account_by_address",
        [
            "8815c69de5d32d3061e52ca9386446332225b43d"
        ]
    ]
}
```

#### Returns

Account id of owner.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": "1.2.15"
}
```

### get\_account\_count\(\)

Get the total number of accounts registered with the blockchain.

#### Example

```javascript
{
    "id": 3,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_account_count",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 3,
    "jsonrpc": "2.0",
    "result": 27
}
```

## Keys

### get\_key\_references\(keys\)

Retreive an array of account IDs associated with the given keys.

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<public_key_t> keys` | an array of public keys |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_key_references",
        [
            [
                "ECHO61p48u6pHnjSAYP5kzQ4RGNQzFDBDYRrfqrAuhtb2Hdm",
                "ECHO6ffcvxMD8XrWWNRSPmusHSFFjuPe9qnnVbVQBgERd3fi", ...
            ]
        ]
    ]
}
```

#### Returns

An array of arrays of account IDs for every public key provided.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        [
            "1.2.14"
        ],
        [
            "1.2.13"
        ]
    ]
}
```

### is\_public\_key\_registered\(public\_key\)

Determine whether of a public key is _currently_ linked to any _registered_ \(i.e. non-stealth\) account on the blockchain.

#### Parameters

| Option | Description |
| :--- | :--- |
| `public_key_t key` | public key |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "is_public_key_registered",
        [
            "ECHOEdjiBUy2RBJ9sMN7jKMK4x9Fa4QVR7JgtNLwbgcZtcZB"
        ]
    ]
}
```

#### Returns

Whether a public key is known.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": false
}
```