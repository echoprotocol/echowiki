# asset_update_bitasset_operation

Update options specific to BitAssets.

BitAssets have some options which are not relevant to other asset types. This operation is used to update those options an an existing BitAsset.

- `issuer` MUST be an existing account and MUST match asset_object::issuer on @ref asset_to_update
- `asset_to_update` MUST be a BitAsset, i.e. @ref asset_object::is_market_issued() returns true
- `fee` MUST be nonnegative, and @ref issuer MUST have a sufficient balance to pay it
- `new_options` SHALL be internally consistent, as verified by @ref validate()
- `asset_to_update` will have BitAsset-specific options matching those of new_options

### JSON Example

```json
[
  12,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "asset_to_update": "1.3.0",
    "new_options": {
      "feed_lifetime_sec": 86400,
      "minimum_feeds": 1,
      "force_settlement_delay_sec": 86400,
      "force_settlement_offset_percent": 0,
      "maximum_force_settlement_volume": 2000,
      "short_backing_asset": "1.3.0",
      "extensions": []
    },
    "extensions": []
  }
]
```