# Account Management Operations

## account_create_operation

This operation is used to create an account

```cpp
struct account_create_operation
{
  struct ext
  {
      optional< void_t >            null_ext;
      optional< special_authority > owner_special_authority;
      optional< special_authority > active_special_authority;
      optional< buyback_account_options > buyback_options;
  };

  struct fee_parameters_type
  {
      uint64_t basic_fee      = 5*ECHO_BLOCKCHAIN_PRECISION; ///< the cost to register the cheapest non-free account
      uint64_t premium_fee    = 2000*ECHO_BLOCKCHAIN_PRECISION; ///< the cost to register the cheapest non-free account
      uint32_t price_per_kbyte = ECHO_BLOCKCHAIN_PRECISION;
  };

  asset           fee;
  /// This account pays the fee. Must be a lifetime member.
  account_id_type registrar;

  /// This account receives a portion of the fee split between registrar and referrer. Must be a member.
  account_id_type referrer;
  /// Of the fee split between registrar and referrer, this percentage goes to the referrer. The rest goes to the
  /// registrar.
  uint16_t        referrer_percent = 0;

  string          name;
  
  authority       owner;
  authority       active;
  eddsa::public_key_t ed_key;

  account_options options;
  extension< ext > extensions;
};
```

[authority](types/common.md#authority)

[special_authority](types/common.md#special_authority)

[asset](types/common.md#asset)

[buyback_account_options](types/common.md#buyback_account_options)

[account_options](types/common.md#account_options)


### JSON Example 

```javascript
[
  5,{
    "fee": { // will be set automaticly
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "registrar": "1.2.0",
    "referrer": "1.2.0",
    "referrer_percent": 0,
    "name": "",
    "owner": { // by default has key_auths
      "weight_threshold": 0,
      "account_auths": [],
      "key_auths": [],
      "address_auths": []
    },
    "active": { // by default has key_auths
      "weight_threshold": 0,
      "account_auths": [],
      "key_auths": [],
      "address_auths": []
    },
    "options": {
      /// The memo key is the key this account will typically use to encrypt/sign transaction memos and other non-
      /// validated account activities. This field is here to prevent confusion if the active authority has zero or
      /// multiple keys in it.
      "memo_key": "ECHO1111111111111111111111111111111114T1Anm",
      /// If this field is set to an account ID other than GRAPHENE_PROXY_TO_SELF_ACCOUNT("1.2.5),
      /// then this account's votes will be ignored; its stake
      /// will be counted as voting for the referenced account's selected votes instead.
      "voting_account": "1.2.5",
      "num_witness": 0,   /// The number of active witnesses this account votes the blockchain should appoint
      "num_committee": 0, /// The number of active committee members this account votes the blockchain should appoint
      "votes": [],        /// This is the list of vote IDs this account votes for.
      "extensions": []
    },
    "extensions": {}
  }
]
```

## account_update_operation

This operation is used to update an existing account. It can be used to update the authorities, or adjust the options on the account. See account_object::options_type for the options which may be updated.

```cpp
struct account_update_operation : public base_operation
{
  struct ext
  {
      optional< void_t >            null_ext;
      optional< special_authority > owner_special_authority;
      optional< special_authority > active_special_authority;
  };

  struct fee_parameters_type
  {
      share_type fee             = 20 * ECHO_BLOCKCHAIN_PRECISION;
      uint32_t   price_per_kbyte = ECHO_BLOCKCHAIN_PRECISION;
  };

  asset fee;
  /// The account to update
  account_id_type account;

  /// New owner authority. If set, this operation requires owner authority to execute.
  optional<authority> owner;
  /// New active authority. This can be updated by the current active authority.
  optional<authority> active;
  // New ED25519 public key
  optional<eddsa::public_key_t> ed_key;

  /// New account options
  optional<account_options> new_options;
  extension< ext > extensions;
};
```

[authority](types/common.md#authority)

[special_authority](types/common.md#special_authority)

[asset](types/common.md#asset)

[buyback_account_options](types/common.md#buyback_account_options)

[account_options](types/common.md#account_options)

### JSON Example

```javascript
[
  6,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.0",
    "owner": { // by default has key_auths
      "weight_threshold": 0,
      "account_auths": [],
      "key_auths": [],
      "address_auths": []
    },
    "active": { // by default has key_auths
      "weight_threshold": 0,
      "account_auths": [],
      "key_auths": [],
      "address_auths": []
    },
    "new_options": {
      /// The memo key is the key this account will typically use to encrypt/sign transaction memos and other non-
      /// validated account activities. This field is here to prevent confusion if the active authority has zero or
      /// multiple keys in it.
      "memo_key": "ECHO1111111111111111111111111111111114T1Anm",
      /// If this field is set to an account ID other than GRAPHENE_PROXY_TO_SELF_ACCOUNT("1.2.5),
      /// then this account's votes will be ignored; its stake
      /// will be counted as voting for the referenced account's selected votes instead.
      "voting_account": "1.2.5",
      "num_witness": 0,   /// The number of active witnesses this account votes the blockchain should appoint
      "num_committee": 0, /// The number of active committee members this account votes the blockchain should appoint
      "votes": [],        /// This is the list of vote IDs this account votes for.
      "extensions": []
    },
    "extensions": {}
  }
]
```

## account_whitelist_operation

This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets

Accounts can freely specify opinions about other accounts, in the form of either whitelisting or blacklisting them. This information is used in chain validation only to determine whether an account is authorized to transact in an asset type which enforces a whitelist, but third parties can use this information for other uses as well, as long as it does not conflict with the use of whitelisted assets.

An asset which enforces a whitelist specifies a list of accounts to maintain its whitelist, and a list of accounts to maintain its blacklist. In order for a given account A to hold and transact in a whitelisted asset S, A must be whitelisted by at least one of S's whitelist_authorities and blacklisted by none of S's blacklist_authorities. If A receives a balance of S, and is later removed from the whitelist(s) which allowed it to hold S, or added to any blacklist S specifies as authoritative, A's balance of S will be frozen until A's authorization is reinstated.

This operation requires authorizing_account's signature, but not account_to_list's. The fee is paid by authorizing_account.

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

[asset](types/common.md#asset)

### JSON Example

```javascript
[
  7,{
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

## account_upgrade_operation

Manage an account's membership status

This operation is used to upgrade an account to a member, or renew its subscription. If an account which is an unexpired annual subscription member publishes this operation with upgrade_to_lifetime_member set to false, the account's membership expiration date will be pushed backward one year. If a basic account publishes it with upgrade_to_lifetime_member set to false, the account will be upgraded to a subscription member with an expiration date one year after the processing time of this operation.

Any account may use this operation to become a lifetime member by setting upgrade_to_lifetime_member to true. Once an account has become a lifetime member, it may not use this operation anymore.

```cpp
struct account_upgrade_operation : public base_operation
{
  struct fee_parameters_type { 
      uint64_t membership_annual_fee   =  2000 * ECHO_BLOCKCHAIN_PRECISION;
      uint64_t membership_lifetime_fee = 10000 * ECHO_BLOCKCHAIN_PRECISION; ///< the cost to upgrade to a lifetime member
  };

  asset             fee;
  /// The account to upgrade; must not already be a lifetime member
  account_id_type   account_to_upgrade;
  /// If true, the account will be upgraded to a lifetime member; otherwise, it will add a year to the subscription
  bool              upgrade_to_lifetime_member = false;
  extensions_type   extensions;
};
```

[asset](types/common.md#asset)

### JSON Example 

```javascript
[
  8,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account_to_upgrade": "1.2.0",
    "upgrade_to_lifetime_member": false,
    "extensions": []
  }
]
```

## account_transfer_operation

transfers the account to another account while clearing the white list

In theory an account can be transferred by simply updating the authorities, but that kind of transfer lacks semantic meaning and is more often done to rotate keys without transferring ownership. This operation is used to indicate the legal transfer of title to this account and a break in the operation history.

The account_id's owner/active/voting/memo authority should be set to new_owner

This operation will clear the account's whitelist statuses, but not the blacklist statuses.

```cpp
struct account_transfer_operation
{
    struct fee_parameters_type { uint64_t fee = 500 * ECHO_BLOCKCHAIN_PRECISION; };
    
    asset           fee;
    account_id_type account_id;
    account_id_type new_owner;
    extensions_type extensions;
};
```

[asset](../types/common.md#asset)

### JSON Example

```javascript
[
  9,{    
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account_id": "1.2.0",
    "new_owner": "1.2.0",
    "extensions": []
  }
]
```

## account_address_create_operation

### JSON Example

```javascript
[
  44,{
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