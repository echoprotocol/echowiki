# account_create_operation

This operation is used to create an account

### JSON Example 

```json
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