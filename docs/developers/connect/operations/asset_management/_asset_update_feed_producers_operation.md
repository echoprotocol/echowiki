# asset_update_feed_producers_operation

Update the set of feed-producing accounts for a BitAsset.

BitAssets have price feeds selected by taking the median values of recommendations from a set of feed producers. This operation is used to specify which accounts may produce feeds for a given BitAsset.

All valid feeds supplied by feed producers in `new_feed_producers`, which were already feed producers prior to execution of this operation, will be preserved.
Cardinality of `new_feed_producers` MUST NOT exceed @ref chain_parameters::maximum_asset_feed_publishers.

- `fee` MUST be nonnegative, and `issuer` MUST have a sufficient balance to pay it
- `issuer` MUST be an existing account, and MUST match asset_object::issuer on `asset_to_update`. MUST NOT be the committee account.
- `asset_to_update` MUST be a BitAsset, i.e. @ref asset_object::is_market_issued() returns true will have a set of feed producers matching `new_feed_producers`

### JSON Example

```json
[
  13,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "asset_to_update": "1.3.0",
    "new_feed_producers": ["1.2.0"],
    "extensions": []
  }
]
```