# Registration API

## register\_account\(callback, name, active\_key, echorand\_key\)

### Parameters

| Option | Description |
| :--- | :--- |
| `variant_callback_t callback` | gives a notification whenever transaction for registation account broadcasted |
| `string name` | name of account |
| `public_key_t active` | active ed25519 key |
| `public_key_t echorand_key` | ed25519 key for echorand |

### Example

The objects retrieved, in the order they are mentioned in ids.

```javascript
{
    "id": 1,
    "method": "call",
    "params": [
        REGISTRATION_API_ID,
        "register_account",
        [
            CALLBACK_ID,
            "test123",
            "ECHODvHDsAfk2M8LhYcxLZTbrNJRWT3UH5zxdaWimWc6uZkH",
            "ECHODvHDsAfk2M8LhYcxLZTbrNJRWT3UH5zxdaWimWc6uZkH"
        ]
    ]
}
```

### Notice example

```javascript
{
    "method": "notice",
    "params": [
        CALLBACK_ID,
        [
            {
                "block_num": 1248363,
                "tx_id": "8b5172b6c95db447ee4b1ca4cd076651189442dd"
            }
        ]
    ]
}
```

### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": null
}
```
