# asset_update_operation

Update options common to all assets.

There are a number of options which all assets in the network use. These options are enumerated in the asset_options struct. This operation is used to update these options for an existing asset.

> Note: This operation cannot be used to update BitAsset-specific options. For these options, use @ref [asset_update_bitasset_operation](asset_update_bitasset_operation.md) instead.

- `fee` SHALL be nonnegative, and `issuer` MUST have a sufficient balance to pay it.
- `issuer` SHALL be an existing account and MUST match asset_object::issuer on `asset_to_update`.
- `new_options` This field is optional. If the asset is to be given a new issuer, specify his ID here.

### JSON Example

```json
[
  11,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "asset_to_update": "1.3.0",
    "new_issuer": "1.2.0",
    "new_options": {
      "max_supply": "1000000000000000",
      "market_fee_percent": 0,
      "max_market_fee": "1000000000000000",
      "issuer_permissions": 79,
      "flags": 0,
      "core_exchange_rate": {
        "base": {
          "amount": 0,
          "asset_id": "1.3.0"
        },
        "quote": {
          "amount": 0,
          "asset_id": "1.3.0"
        }
      },
      "whitelist_authorities": [],
      "blacklist_authorities": [],
      "whitelist_markets": [],
      "blacklist_markets": [],
      "description": "",
      "extensions": []
    },
    "extensions": []
  }
]
```