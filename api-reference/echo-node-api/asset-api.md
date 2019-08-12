Asset API
=========

### get_asset_holders(string asset_id, int start, int limit)

Retrieve the information about the holders of the specified asset.

#### Parameters
- *asset_id* ID of the asset to retrieve, a string that look like 1.6.<id-of-the-asset>
- *start* The acount id to start retrieving from
- *limit* Limit to that much accounts (max 100)

#### Returns
An array of information about asset holders, that has the following structure:
```
[{
  name: "owner name",
  account_id: "1.2.<accout-id>",
  amount: amount-of-shares
}, ... ]
```

### get_asset_holders_count(string asset_id)

Retrieve the number of holders of the provided asset.

### get_all_asset_holders()

An array of all asset IDs with the number of holders.

#### Returns

An array of the following structure:
```
[{
  asset_id: "1.3.<id-of-the-asset>",
  count: number-of-holders
}, ...]
```
