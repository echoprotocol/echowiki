# Balance Object Operations

## balance_claim_operation

Claim a balance in a balance_object.

This operation is used to claim the balance in a given balance_object. If the balance object contains a vesting balance, `total_claimed` must not exceed available vasting balance to withdraw at the time of evaluation. If the object contains a non-vesting balance, `total_claimed` must be the full balance of the object.

```cpp
struct balance_claim_operation : public base_operation
{
   struct fee_parameters_type {};

   asset               fee;
   account_id_type     deposit_to_account;
   balance_id_type     balance_to_claim;
   eddsa::public_key_t balance_owner_key;
   asset               total_claimed;

   extensions_type     extensions;

   account_id_type fee_payer()const { return deposit_to_account; }
   share_type      calculate_fee(const fee_parameters_type& )const { return 0; }
   void            validate()const;
   void            get_required_authorities( vector<authority>& a )const
   {
      a.push_back( authority( 1, balance_owner_key, 1 ) );
   }
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

[authority](/api-reference/echo-operations/types/common.md#authority)

### JSON Example

```json
[
   28,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "deposit_to_account": "1.2.0",
      "balance_to_claim": "1.8.0",
      "balance_owner_key": "ECHODaQencDTLD5u6LGk9JNaMoJBh6sAkGchMnZPjtJXdvG3",
      "total_claimed": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "extensions": []
   }
]
```

## balance_freeze_operation

Freeze balance to get more reward during fee distribution.

Duration is indicated in days. For the selected duration, the balance modifier must be specified in the chain parameters.

```cpp
struct balance_freeze_operation : public base_operation {
    struct fee_parameters_type {
        uint64_t fee = 1000;
    };

    asset               fee;
    account_id_type     account;
    asset               amount;
    uint16_t            duration;

    extensions_type     extensions;

    account_id_type fee_payer() const { return account; }
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   29,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "account": "1.2.0",
      "amount": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "duration": 0,
      "extensions": []
   }
]
```

## balance_unfreeze_operation

Unfreeze balance.

This operation is used to unfreeze frozen balance so you can use this balance in transactions.

```cpp
struct balance_unfreeze_operation : public balance_freeze_operation {
    account_id_type     account;
    asset               amount;
    extensions_type     extensions;

    account_id_type fee_payer() const { return ECHO_NULL_ACCOUNT; }
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   30,
   {
      "account": "1.2.0",
      "amount": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "extensions": []
   }
]
```