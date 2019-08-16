# Balance Object Operations

## balance_claim_operation

Claim a balance in a @ref balance_object.

This operation is used to claim the balance in a given @ref balance_object. If the balance object contains a vesting balance, `total_claimed` must not exceed @ref balance_object::available at the time of evaluation. If the object contains a non-vesting balance, `total_claimed` must be the full balance of the object.

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

### JSON Example

```json
[
  21,{
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