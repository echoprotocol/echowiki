## Balances

### get\_account\_balances\(id, assets\)

Get an account’s balances in various assets.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type id` | ID of the account to get balances for |
| `flat_set<asset_id_type> assets` | an array of IDs of the assets to get balances of; if empty, get all assets account has a balance in |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_account_balances",
        [
            "1.2.15",
            [
                "1.3.0", ...
            ]
        ]
    ]
}
```

#### Returns

An array of balances of the account.

```javascript
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

### get\_contract\_balances\(contract\_id\)

Get a contract's balances in various assets.

#### Parameters

| Option | Description |
| :--- | :--- |
| `contract_id_type contract_id` | ID of the contract to get balances for |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_contract_balances",
        [
            "1.11.0"
        ]
    ]
}
```

#### Returns

An array of balances of the contract.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "amount": 100,
            "asset_id": "1.3.0"
        }
    ]
}
```

### get\_named\_account\_balances\(name, assets\)

Semantically equivalent to _get\_account\_balances_, but takes a name instead of an ID.

#### Parameters

| Option | Description |
| :--- | :--- |
| `string name` | name of the account to get balances for |
| `flat_set<asset_id_type> assets` | an array of IDs of the assets to get balances of; if empty, get all assets account has a balance in |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_named_account_balances",
        [
            "nathan",
            [
                "1.3.0", ...
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
    "result": [
        {
            "amount": "991999999999840",
            "asset_id": "1.3.0"
        }
    ]
}
```

### get\_balance\_objects\(keys\)

Returns all unclaimed balance objects for a set of addresses.

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
        "get_balance_objects",
        [
            [
                "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
                ...
            ]
        ]
    ]
}
```

#### Returns

An array of balances objects.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.8.0",
            "owner": "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
            "balance": {
                "amount": "1000000000000000",
                "asset_id": "1.3.0"
            },
            "last_claim_date": "1970-01-01T00:00:00",
            "extensions": []
        }
    ]
}
```

### get\_vested\_balances\(objs\)

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<balance_id_type> objs` | an array of balance ID |

#### Example

```javascript
{
    "id": 3,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_vested_balances",
        [
            [
                "1.8.0",
                ...
            ]
        ]
    ]
}
```

#### Returns

An array of assets vested.

```javascript
{
    "id": 3,
    "jsonrpc": "2.0",
    "result": [
        {
            "amount": "1000000000000000",
            "asset_id": "1.3.0"
        }
    ]
}
```

### get\_vesting\_balances\(account\_id\)

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account_ids` | the id of account to use |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_vesting_balances",
        [
            "1.2.26"
        ]
    ]
}
```

#### Returns

An array of vesting balances.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.7.0",
            "owner": "1.2.26",
            "balance": {
                "amount": 100,
                "asset_id": "1.3.0"
            },
            "policy": [
                0,
                {
                    "begin_timestamp": "1970-01-01T00:00:00",
                    "vesting_cliff_seconds": 0,
                    "vesting_duration_seconds": 0,
                    "begin_balance": 100
                }
            ],
            "extensions": []
        }
    ]
}
```

### get\_frozen\_balances\(account\_id\)

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account_id` | the id of account to use |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_frozen_balances",
        [
            "1.2.26"
        ]
    ]
}
```

#### Returns

An array of vesting balances.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.11.0",
            "owner": "1.2.26",
            "balance": {
                "amount": 1000000000,
                "asset_id": "1.3.0"
            },
            "multiplier": 13000,
            "unfreeze_time": "2019-12-18T14:49:32",
            "extensions": []
        }
    ]
}
```

### get\_committee\_frozen\_balance\(committee\_member\_id\)

#### Parameters

| Option                                         | Description                       |
|:-----------------------------------------------|:----------------------------------|
| `committee_member_id_type committee_member_id` | the id of committee member to use |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_committee_frozen_balance",
        [
            "1.4.6"
        ]
    ]
}
```

#### Returns

Frozen balance of committee member.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "amount": 1000,
        "asset_id": "1.3.0"
    }
}
```