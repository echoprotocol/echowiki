# Account Management

## account\_create\_operation

This operation is used to create an account

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

   account_options options;
   extension< ext > extensions;
};
```

[authority](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#authority)

[special\_authority](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#special_authority)

[asset](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#asset)

[buyback\_account\_options](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#buyback_account_options)

[account\_options](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#account_options)

### JSON Example

```javascript
[
  1,{
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
      "voting_account": "1.2.5",
      "delegating_account": "1.2.5",
      "delegate_share": 2000,
      "num_committee": 0,
      "votes": [],
      "extensions": []
    },
    "extensions": {}
  }
]
```

## account\_update\_operation

This operation is used to update an existing account. It can be used to update the authorities, or adjust the options on the account. See account\_object::options\_type for the options which may be updated. Optional fields can be added or not depending on your intentions.

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

[authority](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#authority)

[special\_authority](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#special_authority)

[asset](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#asset)

[buyback\_account\_options](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#buyback_account_options)

[account\_options](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#account_options)

### JSON Example

```javascript
[
  2,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.0",
    "new_options": {
        "voting_account": "1.2.5",
        "delegating_account": "1.2.5",
        "num_committee": 0,
        "votes": ["0:0"],
        "extensions": []
    },
    "extensions": {}
  }
]
```

## account\_whitelist\_operation

This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets

Accounts can freely specify opinions about other accounts, in the form of either whitelisting or blacklisting them. This information is used in chain validation only to determine whether an account is authorized to transact in an asset type which enforces a whitelist, but third parties can use this information for other uses as well, as long as it does not conflict with the use of whitelisted assets.

An asset which enforces a whitelist specifies a list of accounts to maintain its whitelist, and a list of accounts to maintain its blacklist. In order for a given account A to hold and transact in a whitelisted asset S, A must be whitelisted by at least one of S's whitelist\_authorities and blacklisted by none of S's blacklist\_authorities. If A receives a balance of S, and is later removed from the whitelist\(s\) which allowed it to hold S, or added to any blacklist S specifies as authoritative, A's balance of S will be frozen until A's authorization is reinstated.

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

[asset](https://github.com/echoprotocol/echowiki/tree/cec007eab21c178f4566db72e33f835d613e3592/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```javascript
[
  3,{
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

### JSON Example

```javascript
[
  29,{
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

