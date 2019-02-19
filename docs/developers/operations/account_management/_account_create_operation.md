# account_create_operation

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

[authority](../types/common.md#authority)

[special_authority](../types/common.md#special_authority)

[asset](../types/common.md#asset)

[buyback_account_options](../types/common.md#buyback_account_options)

[account_options](../types/common.md#account_options)


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