# Database API

## register_account(name, owner_key, active_key, echorand_key, registrar_account, referrer_account, referrer_percent)

* `string name` - name of account

* `public_key_type owner` - owner ECDSA key

* `public_key_type active` - active ECDSA key

* `string echorand_key` - ed25519 key used for echorand and onnode accounts registration

* `string registrar_account` - name of the registrar

* `string referrer_account` - name of the referrer

* `uint32_t referrer_percent` - fee split between registrar and referrer, this percentage goes to the referrer. The rest goes to the registrar.

### Example 

``` json
    {"id":1, "method":"call", "params":[2,"register_account",["test123", "ECHO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV","ECHO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV","DETDvHDsAfk2M8LhYcxLZTbrNJRWT3UH5zxdaWimWc6uZkH", "nathan", "nathan", 74]]}
```
