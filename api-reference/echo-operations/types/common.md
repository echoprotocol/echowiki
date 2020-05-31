# Types

## authority

```cpp
struct authority {
    uint32_t                           weight_threshold = 0;
    flat_map<account_id_type,uint16_t> account_auths;
    flat_map<public_key_type,uint16_t> key_auths;
    /** needed for backward compatibility only */
    flat_map<address,uint16_t>         address_auths;
};
```

## special_authority

```cpp
struct no_special_authority {};

struct top_holders_special_authority
{
   asset_id_type asset;
   uint8_t       num_top_holders = 1;
};

using special_authority = static_variant<
   no_special_authority,
   top_holders_special_authority
   > special_authority;
```

## asset

Struct that is used as a parameter in many operations in the network related to the movement of currency.

```cpp
struct asset
{
    share_type    amount;
    asset_id_type asset_id;
}
```

## account_options

The account_options struct contains options available for all accounts in the network.

```cpp
struct account_options
{
   /// If this field is not ECHO_PROXY_TO_SELF_ACCOUNT, then the vote will be delegated to another account specified.
   account_id_type delegating_account = ECHO_PROXY_TO_SELF_ACCOUNT;
   /// Share of block reward for delegate account
   uint16_t delegate_share = 20 * ECHO_1_PERCENT;

   extensions_type extensions;

   void validate()const;
};
```

## asset_issuer_permission_flags

Flags which can be used in [asset_options](#asset_options).

```cpp
enum asset_issuer_permission_flags
{
   white_list           = 0x01, /**< accounts must be whitelisted in order to hold this asset */
   override_authority   = 0x02, /**< issuer may transfer asset back to himself */
   transfer_restricted  = 0x04, /**< require the issuer to be one party to every transfer */
   committee_fed_asset  = 0x08  /**< allow the asset to be fed by the committee */
};
```

## asset_options

The `asset_options` struct contains options available for all assets in the network.

```cpp
struct asset_options
{
   /// The maximum supply of this asset which may exist at any given time. This can be as large as
   /// ECHO_MAX_SHARE_SUPPLY = 10^15
   share_type max_supply = ECHO_MAX_SHARE_SUPPLY;

   /// The flags which the issuer has permission to update. See @ref asset_issuer_permission_flags
   uint16_t issuer_permissions = UIA_ASSET_ISSUER_PERMISSION_MASK;
   /// The currently active flags on this permission. See @ref asset_issuer_permission_flags
   uint16_t flags = 0;

   /// When a non-core asset is used to pay a fee, the blockchain must convert that asset to core asset in
   /// order to accept the fee. If this asset's fee pool is funded, the chain will automatically deposite fees
   /// in this asset to its accumulated fees, and withdraw from the fee pool the same amount as converted at
   /// the core exchange rate.
   price core_exchange_rate;

   /// A set of accounts which maintain whitelists to consult for this asset. If whitelist_authorities
   /// is non-empty, then only accounts in whitelist_authorities are allowed to hold, use, or transfer the asset.
   flat_set<account_id_type> whitelist_authorities;
   /// A set of accounts which maintain blacklists to consult for this asset. If flags & white_list is set,
   /// an account may only send, receive, trade, etc. in this asset if none of these accounts appears in
   /// its account_object::blacklisting_accounts field. If the account is blacklisted, it may not transact in
   /// this asset even if it is also whitelisted.
   flat_set<account_id_type> blacklist_authorities;

   /**
      * data that describes the meaning/purpose of this asset, fee will be charged proportional to
      * size of description.
      */
   string description;
   extensions_type extensions;
};
```

[price](/api-reference/echo-operations/types/common.md#price)

## bitasset_options

The `bitasset_options` struct contains configurable options available only for BitAssets.

```cpp
struct bitasset_options
{
   /// Time before a price feed expires
   uint32_t feed_lifetime_sec = ECHO_DEFAULT_PRICE_FEED_LIFETIME;
   /// Minimum number of unexpired feeds required to extract a median feed from
   uint8_t minimum_feeds = 1;
   /// This speicifies which asset type is used to collateralize short sales
   /// This field may only be updated if the current supply of the asset is zero.
   asset_id_type short_backing_asset;
   extensions_type extensions;
};
```

## price

The price struct stores asset prices in the Graphene system.

A price is defined as a ratio between two assets, and represents a possible exchange rate between those two
assets. prices are generally not stored in any simplified form, i.e. a price of (1000 ECHO)/(20 USD) is perfectly
normal.

The assets within a price are labeled base and quote. Throughout the Graphene code base, the convention used is
that the base asset is the asset being sold, and the quote asset is the asset being purchased, where the price is
represented as base/quote, so in the example price above the seller is looking to sell ECHO asset and get USD in
return.

```cpp
struct price
{
   asset base;
   asset quote;
};
```

[asset](#asset)