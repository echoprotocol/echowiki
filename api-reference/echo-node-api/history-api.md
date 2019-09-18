# History API

## get\_account\_history\(account, stop, limit, start\)

Get operations relevant to the specificed account.

### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account` | The account whose history should be queried |
| `operation_history_id_type stop` | ID of the earliest operation to retrieve |
| `unsigned limit` | Maximum number of operations to retrieve \(must not exceed 100\) |
| `operation_history_id_type start` | ID of the most recent operation to retrieve |

### Example

```javascript
{
    "id": 1,
    "method": "call",
    "params": [
        HISTORY_API_ID,
        "get_account_history",
        [
            "1.2.6",
            "1.6.0",
            "100",
            "1.6.10"
        ]
    ]
}
```

### Returns

A list of operations performed by account, ordered from most recent to oldest.

```javascript
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.6.10",
            "op": [
                1,
                {
                  "fee": {
                      "amount": 2102,
                      "asset_id": "1.3.0"
                  },
                  "registrar": "1.2.6",
                  "name": "gordonfreeman",
                  "active": {
                      "weight_threshold": 1,
                      "account_auths": [],
                      "key_auths": [
                          [
                              "ECHO5yQoNcXdPpymd8U2ZyazyP3bXoQCMYrE3rZqosm7uipC",
                              1
                          ]
                      ]
                  },
                  "echorand_key": "ECHOGAnwaHhNEUMqhjjdLdk755z1YAHiFw6SLvZ6Wm3uXgsp",
                  "options": {
                      "voting_account": "1.2.5",
                      "delegating_account": "1.2.6",
                      "delegate_share": 2000,
                      "num_committee": 0,
                      "votes": [],
                      "extensions": []
                  },
                  "extensions": {}
                }
            ],
            "result": [
                1,
                "1.2.16"
            ],
            "block_num": 19377,
            "trx_in_block": 0,
            "op_in_trx": 0,
            "virtual_op": 29,
            "extensions": []
        },
        {
            "id": "1.6.1",
            "op": [
                0,
                {
                    "fee": {
                        "amount": 20,
                        "asset_id": "1.3.0"
                    },
                    "from": "1.2.15",
                    "to": "1.2.6",
                    "amount": {
                        "amount": "1000000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 249,
            "trx_in_block": 0,
            "op_in_trx": 0,
            "virtual_op": 20,
            "extensions": []
        }
    ]
}
```

## get\_account\_history\_operations\(account, operation\_id, start, stop, limit\)

Get only asked operations relevant to the specified account.

### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account` | The account whose history should be queried |
| `int operation_id` | The ID of the operation we want to get operations in the account\( 0 = transfer , 1 = limit order create, ...\) |
| `operation_history_id_type start` | ID of the most recent operation to retrieve |
| `operation_history_id_type stop` | ID of the earliest operation to retrieve |
| `unsigned limit` | Maximum number of operations to retrieve \(must not exceed 100\) |

### Example

```javascript
{
    "id": 1,
    "method": "call",
    "params": [
        HISTORY_API_ID,
        "get_account_history_operations",
        [
            "1.2.15",
            "0",
            "1.6.3",
            "1.6.0",
            "100"
        ]
    ]
}
```

### Returns

A list of operations performed by account, ordered from most recent to oldest.

```javascript
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.6.3",
            "op": [
                0,
                {
                    "fee": {
                        "amount": 20,
                        "asset_id": "1.3.0"
                    },
                    "from": "1.2.15",
                    "to": "1.2.8",
                    "amount": {
                        "amount": "1000000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 250,
            "trx_in_block": 0,
            "op_in_trx": 0,
            "virtual_op": 22,
            "extensions": []
        },
        {
            "id": "1.6.2",
            "op": [
                0,
                {
                    "fee": {
                        "amount": 20,
                        "asset_id": "1.3.0"
                    },
                    "from": "1.2.15",
                    "to": "1.2.7",
                    "amount": {
                        "amount": "1000000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 249,
            "trx_in_block": 1,
            "op_in_trx": 0,
            "virtual_op": 21,
            "extensions": []
        },
        {
            "id": "1.6.1",
            "op": [
              0,
              {
                  "fee": {
                      "amount": 20,
                      "asset_id": "1.3.0"
                  },
                  "from": "1.2.15",
                  "to": "1.2.6",
                  "amount": {
                      "amount": "1000000000000",
                      "asset_id": "1.3.0"
                  },
                  "extensions": []
              }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 249,
            "trx_in_block": 0,
            "op_in_trx": 0,
            "virtual_op": 20,
            "extensions": []
        }
    ]
}
```

## get\_relative\_account\_history\(account, stop, limit, start\)

Get operations relevant to the specified account referenced by an event numbering specific to the account. The current number of operations for the account can be found in the account statistics \(or use 0 for start\).

### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account` | The account whose history should be queried |
| `uint32_t stop` | Sequence number of earliest operation. 0 is default and will query 'limit' number of operations |
| `unsigned limit` | Maximum number of operations to retrieve \(must not exceed 100\) |
| `uint32_t start` | Sequence number of the most recent operation to retrieve. 0 is default, which will start querying from the most recent operation |

### Example

```javascript
{
    "id": 1,
    "method": "call",
    "params": [
        HISTORY_API_ID,
        "get_relative_account_history",
        [
            "1.2.15",
            "0",
            "3",
            "10"
        ]
    ]
}
```

### Returns

A list of operations performed by account, ordered from most recent to oldest.

```javascript
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.6.9",
            "op": [
                0,
                {
                    "fee": {
                        "amount": 20,
                        "asset_id": "1.3.0"
                    },
                    "from": "1.2.15",
                    "to": "1.2.14",
                    "amount": {
                        "amount": "1000000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 255,
            "trx_in_block": 0,
            "op_in_trx": 0,
            "virtual_op": 28,
            "extensions": []
        },
        {
            "id": "1.6.8",
            "op": [
                0,
                {
                    "fee": {
                        "amount": 20,
                        "asset_id": "1.3.0"
                    },
                    "from": "1.2.15",
                    "to": "1.2.13",
                    "amount": {
                        "amount": "1000000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 254,
            "trx_in_block": 0,
            "op_in_trx": 0,
            "virtual_op": 27,
            "extensions": []
        },
        {
            "id": "1.6.7",
            "op": [
                0,
                {
                    "fee": {
                        "amount": 20,
                        "asset_id": "1.3.0"
                    },
                    "from": "1.2.15",
                    "to": "1.2.12",
                    "amount": {
                        "amount": "1000000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 253,
            "trx_in_block": 1,
            "op_in_trx": 0,
            "virtual_op": 26,
            "extensions": []
        }
    ]
}
```

## get\_contract\_history\(contract, stop, limit, start\)

Get operations relevant to the specificed contract.

### Parameters

| Option | Description |
| :--- | :--- |
| `contract_id_type contract` | The contract whose history should be queried |
| `operation_history_id_type stop` | ID of the earliest operation to retrieve |
| `unsigned limit` | Maximum number of operations to retrieve \(must not exceed 100\) |
| `operation_history_id_type start` | ID of the most recent operation to retrieve |

### Example
```javascript
{
    "id": 1,
    "method": "call",
    "params": [
        HISTORY_API_ID,
        "get_contract_history",
        [
            "1.9.1",
            "1.6.0",
            10,
            "1.6.45"
        ]
    ]
}
```

### Returns

A list of operations performed by contract, ordered from most recent to oldest.

```javascript
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.6.44",
            "op": [
                24,
                {
                    "fee": {
                        "amount": 1633,
                        "asset_id": "1.3.0"
                    },
                    "registrar": "1.2.38",
                    "value": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "code": "CONTRACT BYTES",
                    "supported_asset_id": "1.3.0",
                    "eth_accuracy": true,
                    "extensions": []
                }
            ],
            "result": [
                1,
                "1.10.1"
            ],
            "block_num": 152375,
            "trx_in_block": 0,
            "op_in_trx": 0,
            "virtual_op": 63,
            "extensions": []
        }
    ]
}
```