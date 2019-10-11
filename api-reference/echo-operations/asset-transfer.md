# Asset Transfer Operations

## transfer_operation

Transfers an amount of one asset from one account to another.

```cpp
struct transfer_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t fee       = 20 * ECHO_BLOCKCHAIN_PRECISION;
   };

   asset            fee;
   /// Account to transfer asset from
   account_id_type  from;
   /// Account to transfer asset to
   account_id_type  to;
   /// The amount of asset to transfer from @ref from to @ref to
   asset            amount;

   extensions_type   extensions;

   account_id_type fee_payer()const { return from; }
   void            validate()const;
   share_type      calculate_fee(const fee_parameters_type& k)const;
};
```

### JSON Examples

```json
[
  0,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "from": "1.2.0",
    "to": "1.2.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```

## override_transfer_operation

Allows the issuer of an asset to transfer an asset from any account to any account if they have override_authority.

```cpp
struct override_transfer_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t fee       = 20 * ECHO_BLOCKCHAIN_PRECISION;
   };

   asset           fee;
   account_id_type issuer;
   /// Account to transfer asset from
   account_id_type from;
   /// Account to transfer asset to
   account_id_type to;
   /// The amount of asset to transfer from @ref from to @ref to
   asset amount;

   extensions_type   extensions;

   account_id_type fee_payer()const { return issuer; }
   void            validate()const;
   share_type      calculate_fee(const fee_parameters_type& k)const;
};
```

### JSON Example

```json
[
  23,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "issuer": "1.2.0",
    "from": "1.2.0",
    "to": "1.2.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```

## transfer_to_address_operation

```cpp
struct transfer_to_address_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t fee       = 20 * ECHO_BLOCKCHAIN_PRECISION;
   };

   asset            fee;
   /// Account to transfer asset from
   account_id_type  from;
   /// Account to transfer asset to
   fc::ripemd160  to;
   /// The amount of asset to transfer from @ref from to @ref to
   asset            amount;

   extensions_type   extensions;

   account_id_type fee_payer()const { return from; }
   void            validate()const;
};
```

### JSON Example

```json
[
  30,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "from": "1.2.0",
    "to": "0000000000000000000000000000000000000000",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```
