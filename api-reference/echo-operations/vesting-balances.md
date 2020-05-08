# Vesting Balances Operations

## vesting_balance_create_operation

Create a vesting balance.

The chain allows a user to create a vesting balance. Normally, vesting balances are created automatically as part of cashback and worker operations. This operation allows vesting balances to be created manually as well.

Manual creation of vesting balances can be used by a stakeholder to publicly demonstrate that they are committed to the chain. It can also be used as a building block to create transactions that function like public debt.  Finally, it is useful for testing vesting balance functionality.

Returns ID of newly created vesting_balance_object.

```cpp
struct vesting_balance_create_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = ECHO_BLOCKCHAIN_PRECISION; };

   asset                       fee;
   account_id_type             creator; ///< Who provides funds initially
   account_id_type             owner; ///< Who is able to withdraw the balance
   asset                       amount;
   vesting_policy_initializer  policy;

   extensions_type extensions;

   account_id_type   fee_payer()const { return creator; }
   void              validate()const
   {
      FC_ASSERT( fee.amount >= 0 );
      FC_ASSERT( amount.amount > 0 );
   }
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   26,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "creator": "1.2.0",
      "owner": "1.2.0",
      "amount": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "policy": [
         0,
         {
               "begin_timestamp": "1970-01-01T00:00:00",
               "vesting_cliff_seconds": 0,
               "vesting_duration_seconds": 0
         }
      ],
      "extensions": []
   }
]
```

## vesting_balance_withdraw_operation

Withdraw from a vesting balance.

Withdrawal from a not-completely-mature vesting balance will result in paying fees.

```cpp
struct vesting_balance_withdraw_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 20*ECHO_BLOCKCHAIN_PRECISION; };

   asset                   fee;
   vesting_balance_id_type vesting_balance;
   account_id_type         owner; ///< Must be vesting_balance.owner
   asset                   amount;

   extensions_type extensions;

   account_id_type   fee_payer()const { return owner; }
   void              validate()const
   {
      FC_ASSERT( fee.amount >= 0 );
      FC_ASSERT( amount.amount > 0 );
   }
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   27,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "vesting_balance": "1.7.0",
      "owner": "1.2.0",
      "amount": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "extensions": []
   }
]
```