# Registration API

#### register_account(name, owner_key, active_key, memo_key, echorand_key)

##### Parameters
| Option | Description |
|:-------|:-----------|
| `string name`  | name of account |
| `public_key_t active` | active ed25519 key |
| `public_key_t echorand_key` | ed25519 key for echorand |

##### Returns

The objects retrieved, in the order they are mentioned in ids.
```json
{
    "id":1, 
    "method":"call", 
    "params":[2,"register_account",[
        "test123", 
        "ECHODvHDsAfk2M8LhYcxLZTbrNJRWT3UH5zxdaWimWc6uZkH",
        "ECHODvHDsAfk2M8LhYcxLZTbrNJRWT3UH5zxdaWimWc6uZkH"
    ]]
}
```
