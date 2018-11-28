# asset_create_operation

This operation is used to create assets 

- `issuer` This account must sign and pay the fee for this operation. Later, this account may update the asset.
- `symbol` The ticker symbol of this asset.
- `precision` Number of digits to the right of decimal point, must be less than or equal to 12. Default is 0.
- `common_options` Options common to all assets.
- `bitasset_opts` Options only available for BitAssets. MUST be non-null if and only if the @ref market_issued flag is set in `common_options.flags`.
- `is_prediction_market` For BitAssets, set this to true if the asset implements a @ref prediction_market; false otherwise.

### JSON Example

```json
[
  10,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "symbol": "",
    "precision": 0,
    "common_options": {
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
    "is_prediction_market": false,
    "extensions": []
  }
]
```