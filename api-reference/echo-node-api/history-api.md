# History API

### get_account_history(account, start, stop, limit)

Get operations relevant to the specificed account.

#### Parameters

| Option                            | Description                                                    |
|-----------------------------------|:---------------------------------------------------------------|
| `account_id_type account`         | The account whose history should be queried                    |
| `operation_history_id_type stop`  | ID of the earliest operation to retrieve                       |
| `unsigned limit`                  | Maximum number of operations to retrieve (must not exceed 100) |
| `operation_history_id_type start` | ID of the most recent operation to retrieve                    |

#### Example

```json
{
    "id": 3,
    "method": "call",
    "params": [
        HISTORY_API_ID,
        "get_account_history",
        [
            "1.2.12",
            "1.10.0",
            "100",
            "1.10.10"
        ]
    ]
}
```

#### Returns

A list of operations performed by account, ordered from most recent to oldest.

```json
{
    "id": 3,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.10.4",
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
            "block_num": 2269,
            "trx_in_block": 0,
            "op_in_trx": 0,
            "virtual_op": 33,
            "extensions": []
        }
    ]
}
```

### get_account_history_operations(account, operation_id, start, stop, limit)

Get only asked operations relevant to the specified account.

#### Parameters

| Option                            | Description                                                                                                   |
|-----------------------------------|:--------------------------------------------------------------------------------------------------------------|
| `account_id_type account`         | The account whose history should be queried                                                                   |
| `int operation_id`                | The ID of the operation we want to get operations in the account( 0 = transfer , 1 = limit order create, ...) |
| `operation_history_id_type start` | ID of the most recent operation to retrieve                                                                   |
| `operation_history_id_type stop`  | ID of the earliest operation to retrieve                                                                      |
| `unsigned limit`                  | Maximum number of operations to retrieve (must not exceed 100)                                                |

#### Example

```json
{
    "id": 3,
    "method": "call",
    "params": [
        HISTORY_API_ID,
        "get_account_history_operations",
        [
            "1.2.0",
            "0",
            "1.10.0",
            "1.10.10",
            "100"
        ]
    ]
}
```

#### Returns

A list of operations performed by account, ordered from most recent to oldest.

```json
{
    "id": 3,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.10.3623",
            "op": [
                0,
                {
                    "fee": {
                        "amount": 20,
                        "asset_id": "1.3.0"
                    },
                    "from": "1.2.15",
                    "to": "1.2.0",
                    "amount": {
                        "amount": "10000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 732031,
            "trx_in_block": 1,
            "op_in_trx": 0,
            "virtual_op": 3652,
            "extensions": []
        }
    ]
}
```

### get_relative_account_history(account, start, stop, limit)

Get operations relevant to the specified account referenced by an event numbering specific to the account.
The current number of operations for the account can be found in the account statistics (or use 0 for start).

#### Parameters

| Option                    | Description                                                                                                                      |
|---------------------------|:---------------------------------------------------------------------------------------------------------------------------------|
| `account_id_type account` | The account whose history should be queried                                                                                      |
| `uint32_t stop`           | Sequence number of earliest operation. 0 is default and will query 'limit' number of operations                                  |
| `unsigned limit`          | Maximum number of operations to retrieve (must not exceed 100)                                                                   |
| `uint32_t start`          | Sequence number of the most recent operation to retrieve. 0 is default, which will start querying from the most recent operation |

#### Example

```json
{
    "id": 3,
    "method": "call",
    "params": [
        HISTORY_API_ID,
        "get_relative_account_history",
        [
            "1.2.6",
            "0",
            "1",
            "10"
        ]
    ]
}
```

#### Returns

A list of operations performed by account, ordered from most recent to oldest.

```json
{
    "id": 3,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.10.163",
            "op": [
                47,
                {
                    "fee": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "committee_member_id": "1.2.6",
                    "malicious_committeemen": [],
                    "account": "1.2.46",
                    "eth_addr": "aCf5E99Db1b408E9CF5C2643CD9059D7E0fa6264",
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 4550,
            "trx_in_block": 18,
            "op_in_trx": 0,
            "virtual_op": 192,
            "extensions": []
        }
    ]
}
```

### get_contract_history(contract, start, stop, limit)

Get operations relevant to the specificed contract.

#### Parameters

| Option                            | Description                                                    |
|-----------------------------------|:---------------------------------------------------------------|
| `contract_id_type contract`       | The contract whose history should be queried                   |
| `operation_history_id_type stop`  | ID of the earliest operation to retrieve                       |
| `unsigned limit`                  | Maximum number of operations to retrieve (must not exceed 100) |
| `operation_history_id_type start` | ID of the most recent operation to retrieve                    |

#### Example

```json
{
    "id": 3,
    "method": "call",
    "params": [
        HISTORY_API_ID,
        "get_contract_history",
        [
            "1.14.0",
            "1.10.0",
            "1",
            "1.10.20"
        ]
    ]
}
```

#### Returns

A list of operations performed by contract, ordered from most recent to oldest.

```json
{
    "id": 3,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.10.0",
            "op": [
                34,
                {
                    "fee": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "deposit_to_account": "1.2.15",
                    "balance_to_claim": "1.13.0",
                    "balance_owner_key": "ECHO3BhH6nPrPmh6wAtsNphRTcreo2uzZLxSP8JyNJoiRD6Q",
                    "total_claimed": {
                        "amount": "1000000000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 2250,
            "trx_in_block": 0,
            "op_in_trx": 0,
            "virtual_op": 29,
            "extensions": []
        }
    ]
}
```