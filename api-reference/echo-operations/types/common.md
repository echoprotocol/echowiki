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

```cpp
struct asset
{
    share_type    amount;
    asset_id_type asset_id;
}
```

## buyback_account_options

```cpp
struct buyback_account_options
{
   /**
    * The asset to buy.
    */
   asset_id_type       asset_to_buy;

   /**
    * Issuer of the asset.  Must sign the transaction, must match issuer
    * of specified asset.
    */
   account_id_type     asset_to_buy_issuer;

   /**
    * What assets the account is willing to buy with.
    * Other assets will just sit there since the account has null authority.
    */
   flat_set< asset_id_type > markets;
};
```

## account_options

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