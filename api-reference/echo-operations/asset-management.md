# Asset Management Operations

## asset_create_operation

This operation is used to create assets

```cpp
struct asset_create_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t symbol3        = 500000 * ECHO_BLOCKCHAIN_PRECISION;
      uint64_t symbol4        = 300000 * ECHO_BLOCKCHAIN_PRECISION;
      uint64_t long_symbol    = 5000   * ECHO_BLOCKCHAIN_PRECISION;
      uint32_t price_per_kbyte = 10; /// only required for large memos.
   };

   asset                   fee;
   /// This account must sign and pay the fee for this operation. Later, this account may update the asset
   account_id_type         issuer;
   /// The ticker symbol of this asset
   string                  symbol;
   /// Number of digits to the right of decimal point, must be less than or equal to 12
   uint8_t                 precision = 0;

   /// Options common to all assets.
   ///
   /// @note common_options.core_exchange_rate technically needs to store the asset ID of this new asset. Since this
   /// ID is not known at the time this operation is created, create this price as though the new asset has instance
   /// ID 1, and the chain will overwrite it with the new asset's ID.
   asset_options              common_options;
   /// Options only available for BitAssets. MUST be non-null if and only if the @ref market_issued flag is set in
   /// common_options.flags
   optional<bitasset_options> bitasset_opts;

   extensions_type extensions;

   account_id_type fee_payer()const { return issuer; }
   void            validate()const;
   share_type      calculate_fee( const fee_parameters_type& k )const;
};
```

### JSON Example

```json
[
  4,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "symbol": "",
    "precision": 0,
    "common_options": {
      "max_supply": "1000000000000000",
      "issuer_permissions": 15,
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
      "description": "",
      "extensions": []
    },
    "extensions": []
  }
]
```

## asset_update_operation

Update options common to all assets.

There are a number of options which all assets in the network use. These options are enumerated in the asset_options struct. This operation is used to update these options for an existing asset.

```cpp
struct asset_update_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t fee            = 500 * ECHO_BLOCKCHAIN_PRECISION;
      uint32_t price_per_kbyte = 10;
   };

   asset_update_operation(){}

   asset           fee;
   account_id_type issuer;
   asset_id_type   asset_to_update;

   /// If the asset is to be given a new issuer, specify his ID here.
   optional<account_id_type>   new_issuer;
   optional<asset_options>     new_options;

   extensions_type             extensions;

   account_id_type fee_payer()const { return issuer; }
   void            validate()const;
   share_type      calculate_fee(const fee_parameters_type& k)const;
};
```

### JSON Example

```json
[
  5,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "asset_to_update": "1.3.0",
    "new_issuer": "1.2.0",
    "new_options": {
      "max_supply": "1000000000000000",
      "issuer_permissions": 15,
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
      "description": "",
      "extensions": []
    },
    "extensions": []
  }
]
```

## asset_update_bitasset_operation

Update options specific to BitAssets.

BitAssets have some options which are not relevant to other asset types. This operation is used to update those options an an existing BitAsset.

```cpp
struct asset_update_bitasset_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 500 * ECHO_BLOCKCHAIN_PRECISION; };

   asset           fee;
   account_id_type issuer;
   asset_id_type   asset_to_update;

   bitasset_options new_options;

   extensions_type  extensions;

   account_id_type fee_payer()const { return issuer; }
   void            validate()const;
};
```

### JSON Example

```json
[
  6,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "asset_to_update": "1.3.0",
    "new_options": {
      "feed_lifetime_sec": 86400,
      "minimum_feeds": 1,
      "short_backing_asset": "1.3.0",
      "extensions": []
    },
    "extensions": []
  }
]
```

## asset_update_feed_producers_operation

Update the set of feed-producing accounts for a BitAsset.

BitAssets have price feeds selected by taking the median values of recommendations from a set of feed producers. This operation is used to specify which accounts may produce feeds for a given BitAsset.

```cpp
struct asset_update_feed_producers_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 500 * ECHO_BLOCKCHAIN_PRECISION; };

   asset           fee;
   account_id_type issuer;
   asset_id_type   asset_to_update;

   flat_set<account_id_type> new_feed_producers;

   extensions_type           extensions;

   account_id_type fee_payer()const { return issuer; }
   void            validate()const;
};
```

### JSON Example

```json
[
  7,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "asset_to_update": "1.3.0",
    "new_feed_producers": [],
    "extensions": []
  }
]
```

## asset_issue_operation

Asset issue to account.

```cpp
struct asset_issue_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t fee = 20 * ECHO_BLOCKCHAIN_PRECISION; 
   };

   asset            fee;
   account_id_type  issuer; ///< Must be asset_to_issue->asset_id->issuer
   asset            asset_to_issue;
   account_id_type  issue_to_account;

   extensions_type      extensions;

   account_id_type fee_payer()const { return issuer; }
   void            validate()const;
   share_type      calculate_fee(const fee_parameters_type& k)const;
};
```

### JSON Example

```json
[
  8,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "asset_to_issue": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issue_to_account": "1.2.0",
    "extensions": []
  }
]
```

## asset_reserve_operation

Used to take an asset out of circulation, returning to the issuer

```cpp
struct asset_reserve_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 20 * ECHO_BLOCKCHAIN_PRECISION; };

   asset             fee;
   account_id_type   payer;
   asset             amount_to_reserve;

   extensions_type   extensions;

   account_id_type fee_payer()const { return payer; }
   void            validate()const;
};
```

### JSON Example

```json
[
  9,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "payer": "1.2.0",
    "amount_to_reserve": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```

## asset_claim_fees_operation

Used to transfer accumulated fees back to the issuer's balance

```cpp
struct asset_claim_fees_operation : public base_operation
{
  struct fee_parameters_type {
      uint64_t fee = 20 * ECHO_BLOCKCHAIN_PRECISION;
  };

  asset           fee;
  account_id_type issuer;
  asset           amount_to_claim; /// amount_to_claim.asset_id->issuer must == issuer
  
  extensions_type extensions;

  account_id_type fee_payer()const { return issuer; }
  void            validate()const;
};
```

### JSON Example

```json
[
  23,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "amount_to_claim": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```

## asset_fund_fee_pool_operation

```cpp
struct asset_fund_fee_pool_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee =  ECHO_BLOCKCHAIN_PRECISION; };

   asset           fee; ///< core asset
   account_id_type from_account;
   asset_id_type   asset_id;
   share_type      amount; ///< core asset

   extensions_type extensions;

   account_id_type fee_payer()const { return from_account; }
   void       validate()const;
};
```

### JSON Example

```json
[
  10,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "from_account": "1.2.0",
    "asset_id": "1.3.0",
    "amount": 0,
    "extensions": []
  }
]
```

## asset_publish_feed_operation

Publish price feeds for market-issued assets.

Price feed providers use this operation to publish their price feeds for market-issued assets. A price feed is used to tune the market for a particular market-issued asset. For each value in the feed, the median across all committee_member feeds for that asset is calculated and the market for the asset is configured with the median of that value.

The feed in the operation contains three prices: a call price limit, a short price limit, and a settlement price. The call limit price is structured as (collateral asset) / (debt asset) and the short limit price is structured as (asset for sale) / (collateral asset). Note that the asset IDs are opposite to eachother, so if we're publishing a feed for USD, the call limit price will be ECHO/USD and the short limit price will be USD/ECHO. The settlement price may be flipped either direction, as long as it is a ratio between the market-issued asset and its collateral.

```cpp
struct asset_publish_feed_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = ECHO_BLOCKCHAIN_PRECISION; };

   asset                  fee; ///< paid for by publisher
   account_id_type        publisher;
   asset_id_type          asset_id; ///< asset for which the feed is published
   price_feed             feed;

   extensions_type        extensions;

   account_id_type fee_payer()const { return publisher; }
   void            validate()const;
};
```

### JSON Example

```json
[
  11,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "publisher": "1.2.0",
    "asset_id": "1.3.0",
    "feed": {
      "settlement_price": {
        "base": {
          "amount": 0,
          "asset_id": "1.3.0"
        },
        "quote": {
          "amount": 0,
          "asset_id": "1.3.0"
        }
      },
      "maintenance_collateral_ratio": 1750,
      "maximum_short_squeeze_ratio": 1500,
      "core_exchange_rate": {
        "base": {
          "amount": 0,
          "asset_id": "1.3.0"
        },
        "quote": {
          "amount": 0,
          "asset_id": "1.3.0"
        }
      }
    },
    "extensions": []
  }
]
```
