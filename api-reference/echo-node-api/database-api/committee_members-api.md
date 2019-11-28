## Committee members

### get\_committee\_members\(committee\_member\_ids\)

Get a list of committee\_members by ID. This function has semantics identical to get\_objects.

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<committee_member_id_type> committee_member_ids` | IDs of the committee\_members to retrieve |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_committee_members",
        [
            [
                "1.4.0",
                "1.4.1"
            ]
        ]
    ]
}
```

#### Returns

The committee\_members corresponding to the provided IDs.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.4.0",
            "committee_member_account": "1.2.6",
            "url": "",
            "eth_address": "f372c3b578534Ac5C1Cf0Cca7049A279d1ca3e79",
            "btc_public_key": "02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e",
            "extensions": []
        },
        {
            "id": "1.4.1",
            "committee_member_account": "1.2.7",
            "url": "",
            "eth_address": "Fba802D86f8d9b080eD247e712751DDBF86086A9",
            "btc_public_key": "02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e",
            "extensions": []
        }
    ]
}
```

### get\_committee\_member\_by\_account\(account\)

Get the committee\_member owned by a given account.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account` | the ID of the account whose committee\_member should be retrieved |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_committee_member_by_account",
        [
            "1.2.6"
        ]
    ]
}
```

#### Returns

The committee\_member object, or null if the account does not have a committee\_member.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "1.4.0",
        "committee_member_account": "1.2.6",
        "url": "",
        "eth_address": "f372c3b578534Ac5C1Cf0Cca7049A279d1ca3e79",
        "btc_public_key": "02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e",
        "extensions": []
    }
}
```

### lookup\_committee\_member\_accounts\(lower\_bound\_name, limit\)

Get names and IDs for registered committee\_members.

#### Parameters

| Option | Description |
| :--- | :--- |
| `string lower_bound_name` | lower bound of the first name to return |
| `uint32_t limit` | maximum number of results to return -- must not exceed 1000 |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "lookup_committee_member_accounts",
        [
            "",
            "1000"
        ]
    ]
}
```

#### Returns

Map of committee\_member names to corresponding IDs.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        [
            "init0",
            "1.4.0"
        ],
        [
            "init1",
            "1.4.1"
        ],
        [
            "init10",
            "1.4.10"
        ],
        [
            "init11",
            "1.4.11"
        ],
        [
            "init12",
            "1.4.12"
        ],
        [
            "init13",
            "1.4.13"
        ],
        [
            "init14",
            "1.4.14"
        ],
        [
            "init15",
            "1.4.15"
        ],
        [
            "init16",
            "1.4.16"
        ],
        [
            "init17",
            "1.4.17"
        ],
        [
            "init18",
            "1.4.18"
        ],
        [
            "init19",
            "1.4.19"
        ],
        [
            "init2",
            "1.4.2"
        ],
        [
            "init3",
            "1.4.3"
        ],
        [
            "init4",
            "1.4.4"
        ],
        [
            "init5",
            "1.4.5"
        ],
        [
            "init6",
            "1.4.6"
        ],
        [
            "init7",
            "1.4.7"
        ],
        [
            "init8",
            "1.4.8"
        ],
        [
            "init9",
            "1.4.9"
        ]
    ]
}
```

### get\_committee\_count\(\)

Get the total number of committee registered with the blockchain

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_committee_count",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": 20
}
```