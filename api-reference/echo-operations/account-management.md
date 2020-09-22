# Account Management

## account\_create\_operation

This operation is used to create an account

User can specify the evm address with which it will be possible to restore the account in the future via [ecrecover](/technologies/evm-support/differences-from-ethereum.md#ecrecover).

```cpp
struct account_create_operation
{
   struct ext
   {
       optional< void_t >            null_ext;
       optional< special_authority > active_special_authority;
   };

   struct fee_parameters_type
   {
       uint64_t basic_fee      = 5*ECHO_BLOCKCHAIN_PRECISION; ///< the cost to register the cheapest non-free account
       uint64_t premium_fee    = 2000*ECHO_BLOCKCHAIN_PRECISION; ///< the cost to register the cheapest non-free account
       uint32_t price_per_kbyte = ECHO_BLOCKCHAIN_PRECISION;
   };

   asset           fee;
   account_id_type registrar;
   string          name;
   authority       active;
   eddsa::public_key_t echorand_key;
   fc::optional<eth_address_type> evm_address;

   account_options options;
   extension< ext > extensions;
};
```

[authority](/api-reference/echo-operations/types/common.md#authority)

[special\_authority](/api-reference/echo-operations/types/common.md#special_authority)

[asset](/api-reference/echo-operations/types/common.md#asset)

[account\_options](/api-reference/echo-operations/types/common.md#account_options)

### JSON Example

```json
[
   3,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "registrar": "1.2.0",
      "name": "",
      "active": {
         "weight_threshold": 0,
         "account_auths": [],
         "key_auths": []
      },
      "echorand_key": "ECHODaQencDTLD5u6LGk9JNaMoJBh6sAkGchMnZPjtJXdvG3",
      "options": {
         "delegating_account": "1.2.5",
         "delegate_share": 2000,
         "extensions": []
      },
      "extensions": {}
   }
]
```

## account\_update\_operation

This operation is used to update an existing account. It can be used to update the authorities, or adjust the options on the account. See [account\_options](/api-reference/echo-operations/types/common.md#account_options) for the options which may be updated. Optional fields can be added or not depending on your intentions.

```cpp
struct account_update_operation : public base_operation
{
   struct ext
   {
       optional< void_t >            null_ext;
       optional< special_authority > owner_special_authority;
   };

   struct fee_parameters_type
   {
       share_type fee             = 20 * ECHO_BLOCKCHAIN_PRECISION;
       uint32_t   price_per_kbyte = ECHO_BLOCKCHAIN_PRECISION;
   };

   asset fee;
   /// The account to update
   account_id_type account;
   /// New active authority. This can be updated by the current active authority.
   optional<authority> active;
   // New ED25519 public key
   optional<eddsa::public_key_t> echorand_key;

   /// New account options
   optional<account_options> new_options;
   extension< ext > extensions;
};
```

[authority](/api-reference/echo-operations/types/common.md#authority)

[special\_authority](/api-reference/echo-operations/types/common.md#special_authority)

[asset](/api-reference/echo-operations/types/common.md#asset)

[account\_options](/api-reference/echo-operations/types/common.md#account_options)

### JSON Example

```json
[
   4,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "account": "1.2.0",
      "extensions": {}
   }
]
```

## account\_whitelist\_operation

This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets. For more info see `Whitelisting and Blacklisting` section in [Asset Fee Pool](/advanced/asset-fee-pool.md).

This operation requires authorizing\_account's signature, but not account\_to\_list's. The fee is paid by authorizing\_account.

```cpp
struct account_whitelist_operation : public base_operation
{
   struct fee_parameters_type { share_type fee = 300000; };
   enum account_listing {
      no_listing = 0x0, ///< No opinion is specified about this account
      white_listed = 0x1, ///< This account is whitelisted, but not blacklisted
      black_listed = 0x2, ///< This account is blacklisted, but not whitelisted
      white_and_black_listed = white_listed | black_listed ///< This account is both whitelisted and blacklisted
   };

   /// Paid by authorizing_account
   asset           fee;
   /// The account which is specifying an opinion of another account
   account_id_type authorizing_account;
   /// The account being opined about
   account_id_type account_to_list;
   /// The new white and blacklist status of account_to_list, as determined by authorizing_account
   /// This is a bitfield using values defined in the account_listing enum
   uint8_t new_listing = no_listing;
   extensions_type extensions;
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   5,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "authorizing_account": "1.2.0",
      "account_to_list": "1.2.0",
      "new_listing": 0,
      "extensions": []
   }
]
```

## account\_address\_create\_operation

Creates an address for an account to which money can be transferred.

```cpp
struct account_address_create_operation : public base_operation 
{
   struct fee_parameters_type
   {
      uint64_t fee       = 5*ECHO_BLOCKCHAIN_PRECISION;
      uint32_t price_per_kbyte = ECHO_BLOCKCHAIN_PRECISION;
   };

   asset fee;
   account_id_type owner;
   string label;

   extensions_type extensions;
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   6,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "owner": "1.2.0",
      "label": "",
      "extensions": []
   }
]
```

## evm\_address\_register\_operation

Creates an ethereum address for an account.

The specified `evm_address` can be used in the future to restore account via [ecrecover](/technologies/evm-support/differences-from-ethereum.md#ecrecover).

```cpp
struct evm_address_register_operation : public base_operation
   {
      struct fee_parameters_type 
      { 
         uint64_t fee = 0;
      };

      asset fee;

      account_id_type owner;
      eth_address_type evm_address;

      extensions_type extensions;
   };
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   67,{
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
    },
    "owner": "1.2.0",
    "evm_address": "0000000000000000000000000000000000000000",
    "extensions": []
  }
]
```