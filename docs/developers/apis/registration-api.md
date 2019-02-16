# Registration API

#### register_account(name, owner_key, active_key, memo_key, echorand_key)

##### Parameters
| Option | Description |
|:-------|:-----------|
| `string name`  | name of account |
| `public_key_type owner` | owner ECDSA key |
| `public_key_type active` | active ECDSA key |
| `public_key_type memo` | memo ECDSA key |
| `string echorand_key` | ed25519 key for echorand |

##### Returns

The objects retrieved, in the order they are mentioned in ids.
```json
{
    "id":1, 
    "method":"call", 
    "params":[2,"register_account",[
        "test123", 
        "ECHO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
        "ECHO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
        "ECHO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
        "DETDvHDsAfk2M8LhYcxLZTbrNJRWT3UH5zxdaWimWc6uZkH"
    ]]
}
```