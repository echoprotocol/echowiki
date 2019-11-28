## Assets

### get\_assets\(asset\_ids\)

Get a list of assets by ID. This function has semantics identical to get\_objects.

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<asset_id_type> asset_ids` | IDs of the assets to retrieve |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_assets",
        [
            [
                "1.3.0",
                "1.3.1", ...
            ]
        ]
    ]
}
```

#### Returns

The assets corresponding to the provided IDs.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.3.0",
            "symbol": "ECHO",
            "precision": 8,
            "issuer": "1.2.3",
            "options": {
                "max_supply": "1000000000000000",
                "issuer_permissions": 0,
                "flags": 0,
                "core_exchange_rate": {
                    "base": {
                        "amount": 1,
                        "asset_id": "1.3.0"
                    },
                    "quote": {
                        "amount": 1,
                        "asset_id": "1.3.0"
                    }
                },
                "whitelist_authorities": [],
                "blacklist_authorities": [],
                "description": "",
                "extensions": []
            },
            "dynamic_asset_data_id": "2.2.0",
            "extensions": []
        },
        {
            "id": "1.3.1",
            "symbol": "EETH",
            "precision": 6,
            "issuer": "1.2.1",
            "options": {
                "max_supply": "1000000000000000",
                "issuer_permissions": 15,
                "flags": 0,
                "core_exchange_rate": {
                    "base": {
                        "amount": 1,
                        "asset_id": "1.3.0"
                    },
                    "quote": {
                        "amount": 1,
                        "asset_id": "1.3.1"
                    }
                },
                "whitelist_authorities": [],
                "blacklist_authorities": [],
                "description": "ethereum asset",
                "extensions": []
            },
            "dynamic_asset_data_id": "2.2.1",
            "extensions": []
        }
    ]
}
```

### list\_assets\(lower\_bound\_symbol, limit\)

Get assets alphabetically by symbol name.

#### Parameters

| Option | Description |
| :--- | :--- |
| `string lower_bound_symbol` | lower bound of symbol names to retrieve |
| `uint32_t limit` | maximum number of assets to fetch \(must not exceed 100\) |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "list_assets",
        [
            "",
            "2"
        ]
    ]
}
```

#### Returns

The assets found.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.3.2",
            "symbol": "EBTC",
            "precision": 8,
            "issuer": "1.2.1",
            "options": {
                "max_supply": 21000000,
                "issuer_permissions": 15,
                "flags": 0,
                "core_exchange_rate": {
                    "base": {
                        "amount": 1,
                        "asset_id": "1.3.0"
                    },
                    "quote": {
                        "amount": 1,
                        "asset_id": "1.3.2"
                    }
                },
                "whitelist_authorities": [],
                "blacklist_authorities": [],
                "description": "bitcoin asset",
                "extensions": []
            },
            "dynamic_asset_data_id": "2.2.2",
            "extensions": []
        },
        {
            "id": "1.3.0",
            "symbol": "ECHO",
            "precision": 8,
            "issuer": "1.2.3",
            "options": {
                "max_supply": "1000000000000000",
                "issuer_permissions": 0,
                "flags": 0,
                "core_exchange_rate": {
                    "base": {
                        "amount": 1,
                        "asset_id": "1.3.0"
                    },
                    "quote": {
                        "amount": 1,
                        "asset_id": "1.3.0"
                    }
                },
                "whitelist_authorities": [],
                "blacklist_authorities": [],
                "description": "",
                "extensions": []
            },
            "dynamic_asset_data_id": "2.2.0",
            "extensions": []
        }
    ]
}
```

### lookup\_asset\_symbols\(symbols\_or\_ids\)

Get a list of assets by symbol. This function has semantics identical to get\_objects.

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<string> symbols_or_ids` | symbols or stringified IDs of the assets to retrieve |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "lookup_asset_symbols",
        [
            [
                "EETH",
                "1.3.0"
            ]
        ]
    ]
}
```

#### Returns

The assets corresponding to the provided symbols or IDs.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.3.1",
            "symbol": "EETH",
            "precision": 6,
            "issuer": "1.2.1",
            "options": {
                "max_supply": "1000000000000000",
                "issuer_permissions": 15,
                "flags": 0,
                "core_exchange_rate": {
                    "base": {
                        "amount": 1,
                        "asset_id": "1.3.0"
                    },
                    "quote": {
                        "amount": 1,
                        "asset_id": "1.3.1"
                    }
                },
                "whitelist_authorities": [],
                "blacklist_authorities": [],
                "description": "ethereum asset",
                "extensions": []
            },
            "dynamic_asset_data_id": "2.2.1",
            "extensions": []
        },
        {
            "id": "1.3.0",
            "symbol": "ECHO",
            "precision": 8,
            "issuer": "1.2.3",
            "options": {
                "max_supply": "1000000000000000",
                "issuer_permissions": 0,
                "flags": 0,
                "core_exchange_rate": {
                    "base": {
                        "amount": 1,
                        "asset_id": "1.3.0"
                    },
                    "quote": {
                        "amount": 1,
                        "asset_id": "1.3.0"
                    }
                },
                "whitelist_authorities": [],
                "blacklist_authorities": [],
                "description": "",
                "extensions": []
            },
            "dynamic_asset_data_id": "2.2.0",
            "extensions": []
        }
    ]
}
```