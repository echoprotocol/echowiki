# Registration API

### register_account(callback, name, active_key, echorand_key)

#### Parameters
| Option                        | Description                                                                   |
|:------------------------------|:------------------------------------------------------------------------------|
| `variant_callback_t callback` | gives a notification whenever transaction for registation account broadcasted |
| `string name`                 | name of account                                                               |
| `public_key_t active`         | active ed25519 key                                                            |
| `public_key_t echorand_key`   | ed25519 key for echorand                                                      |

#### Example

The objects retrieved, in the order they are mentioned in ids.

```json
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

#### Notice example

```json
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