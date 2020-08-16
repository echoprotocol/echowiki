## Contracts

{% hint style="warning" %}
x86 is now in the development stage.
{% endhint %}

### get\_contract\(contract\_id\)

Get a contract info from VM by ID.

#### Parameters

| Option | Description |
| :--- | :--- |
| `contract_id_type contract_id` | ID of the contract to retrieve |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_contract",
        [
            "1.11.0"
        ]
    ]
}
```

#### Returns

The contracts data from VM corresponding to the provided ID.

```javascript
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

### get\_contracts\(contract\_ids\)

Get a list of contracts by ID.

**Parameters**

| Option | Description |
| :--- | :--- |
| `vector<contract_id_type> contract_ids` | IDs of the contracts to retrieve |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_contracts",
        [
            "1.11.0",
            "1.11.1", ...
        ]
    ]
}
```

#### Returns

The contracts corresponding to the provided IDs.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.11.0",
            "type": "evm",
            "destroyed": false,
            "statistics": "2.17.0",
            "owner": "1.2.27",
            "extensions": []
        },
        {
            "id": "1.11.1",
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

### get\_contract\_logs\(contract\_logs\_filter\_options\)

Returns an array of all logs matching a given filter object.

#### Parameters

| Option | Description |
| :--- | :--- |
| `function<void(const variant&)> cb` | callback method which is called when contracts has logs |
| `contract_logs_filter_options opts` | The filter object |

#### The filter options

| Option | Description |
| :--- | :--- |
| `set<contract_id_type> contracts` | (optional) A list of contract ids from which logs should originate |
| `vector<set<string>> topics` | (optional) Topics are order-dependent. It’s possible to pass in empty array to match any topic, or a subarray of multiple topics of which one should be matching. |
| `optional<uint32_t> from_block` | (optional) Default: `head_block_num - 1000`. |
| `optional<uint32_t> to_block` | (optional) Default: `head_block_num`. |

{% hint style="info" %}
A note on specifying topic filters:  
Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:
* `[]` “anything”
* `[[A]]` “A in first position (and anything after)”
* `[[], [B]]` “anything in first position AND B in second position (and anything after)”
* `[[A], [B]]` “A in first position AND B in second position (and anything after)”
* `[[A, B], [A, B]]` “(A OR B) in first position AND (A OR B) in second position (and anything after)”
{% endhint %}

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_contract_logs",
        [
            CALLBACK_ID,
            {
                "contracts": [
                    "1.11.0"
                ],
                "topics": [
                    [
                        "a1f905024bf9f0430b6d981173eb6df240bdf128fbadea8a869257b4015673e5"
                    ],
                    [],
                    [
                        "0000000000000000000000000000000000000000000000000000000000000002",
                        "0000000000000000000000000000000000000000000000000000000000000004"
                    ]
                ],
                "from_block": "0",
                "to_block": "100"
            }
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
            [
                [
                    0,
                    {
                        "address": "0100000000000000000000000000000000000000",
                        "log": [
                            "bfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf"
                        ],
                        "data": "",
                        "block_num": 14,
                        "trx_num": 0,
                        "op_num": 0
                    }
                ]
            ]
        ]
    ]
}
```

### subscribe\_contracts\(contracts\_ids\)

Subscription to change the contract uses [set\_subscribe\_callback](objects_subscription-api.md#set_subscribe_callback-callback-clear_filter).

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<contract_id_type> contracts_ids` | IDs of the contracts to subscribe |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "subscribe_contracts",
        [
            [
                "1.11.0"
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
                    "address": "0100000000000000000000000000000000000003",
                    "log": [
                        "a1f905024bf9f0430b6d981173eb6df240bdf128fbadea8a869257b4015673e5"
                    ],
                    "data": "0000000000000000000000000000000000000000000000000000000000000097",
                    "block_num": 14,
                    "trx_num": 0,
                    "op_num": 0
                }
            ]
        ]
    ]
}
```

### subscribe\_contract\_logs\(cb_id, cb, contract\_id\)

Subscribe to specified contract logs.

#### Parameters

| Option | Description |
| :--- | :--- |
| `uint64_t cb_id` | Callback id which is referenced in notice when contracts has new logs |
| `function<void(variant)> cb` | callback method which is called when contracts has new logs |
| `map<contract_id_type, std::set<string>> subs` | Pairs of contract ids and topic filters |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "subscribe_contract_logs",
        [
            CALLBACK_ID,
            {
                1.11.0 : []
            }
        ]
    ]
}
```

#### Returns

The contracts logs by contract ID.

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
                [
                    0,
                    {
                        "address": "0100000000000000000000000000000000000000",
                        "log": [
                            "bfed43b35c99a41ee9b8cb5a2afa74e45703b17dfd398a3b96260bdebca807cf"
                        ],
                        "data": "",
                        "block_num": 14,
                        "trx_num": 0,
                        "op_num": 0
                    }
                ]
            ]
        ]
    ]
}
```

### unsubscribe\_contract\_logs(cb\_id)

Unsubscribe from contract log subscription

#### Parameters

| Option | Description |
| :--- | :--- |
| `uint64_t cb_id` | Callback id of subscription |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "unsubscribe_contract_logs",
        [
            CALLBACK_ID
        ]
    ]
}
```

#### Returns

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": null
}
```

### get\_contract\_result\(id\)

Get contract result from VM for specified result\_id

#### Parameters

| Option | Description |
| :--- | :--- |
| `contract_result_id_type id` | ID of result to retrieve |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_contract_result",
        [
            "1.12.0"
        ]
    ]
}
```

#### Returns

Result of execution.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        0,
        {
            "exec_res": {
                "excepted": "None",
                "new_address": "0100000000000000000000000000000000000000",
                "output": "608060405260...",
                "code_deposit": "Success",
                "gas_for_deposit": 720877,
                "deposit_size": 2601
            },
            "tr_receipt": {
                "status_code": 1,
                "gas_used": 885323,
                "bloom": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "log": []
            }
        }
    ]
}
```

### call\_contract\_no\_changing\_state\(contract\_id, caller, value, code\)

Call the provided contract, but don't change the state.

#### Parameters

| Option | Description |
| :--- | :--- |
| `contract_id_type contract_id` | ID of the contract |
| `object_id_type caller` | id of the caller(contract or account) |
| `asset value` | the type of the asset transfered to the contract |
| `string code` | the hash of the method to call\(or name for x86-x64 contracts\) |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "call_contract_no_changing_state",
        [
            "1.11.0",
            "1.2.26",
            {"amount": 100,"asset_id": "1.3.0"},
            "6d4ce63c"
        ]
    ]
}
```

#### Returns

Result of execution.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": "0000000000000000000000000000000000000000000000000000000000000093"
}
```

## Contract Feepool

### get\_contract\_pool\_balance\(id\)

Get a contract's pool balance in default asset.

#### Parameters

| Option | Description |
| :--- | :--- |
| `contract_id_type id` | ID of the contract to get balances for |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_contract_pool_balance",
        [
            "1.11.0"
        ]
    ]
}
```

#### Returns

Balances of the contract.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "amount": 1,
        "asset_id": "1.3.0"
    }
}
```

### get\_contract\_pool\_whitelist\(id\)

Get a contract's whitelist and blacklist.

#### Parameters

| Option | Description |
| :--- | :--- |
| `contract_id_type id` | ID of the contract |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_contract_pool_whitelist",
        [
            "1.11.0"
        ]
    ]
}
```

#### Returns

Struct contract\_pool\_whitelist which consist of whitelist blacklist.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "whitelist": [
            "1.2.1"
        ],
        "blacklist": [
            "1.2.2"
        ]
    }
}
```