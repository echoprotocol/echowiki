# Contracts Operations

## contract_create_operation

Creates new contract.

```cpp
struct contract_create_operation : public contract_base_operation
{
   struct fee_parameters_type {
      uint64_t fee = 0;
   };

   bool eth_accuracy = false;
   fc::optional<asset_id_type> supported_asset_id;

   extensions_type   extensions;

   void validate() const;
};
```

### JSON Example

```json
[
  25,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "registrar": "1.2.0",
    "value": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "code": "",
    "eth_accuracy": false,
    "extensions": []
  }
]
```

## contract_call_operation

Operation to call specified contract.

```cpp
struct contract_call_operation : public contract_base_operation
{
   struct fee_parameters_type {
      uint64_t fee = 0;
   };

   contract_id_type callee;

   extensions_type   extensions;
   
   void validate() const;
};
```

### JSON Example

```json
[
  26,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "registrar": "1.2.0",
    "value": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "code": "",
    "callee": "1.9.0",
    "extensions": []
  }
]
```

## contract_fund_pool_operation

```cpp
struct contract_fund_pool_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t fee = 2 * ECHO_BLOCKCHAIN_PRECISION;
   };
   
   asset fee;
   account_id_type sender;
   contract_id_type contract;
   asset value;
   
   extensions_type   extensions;

   void validate() const;
   account_id_type fee_payer() const { return sender; }
};
```

### JSON Example

```json
[
  36,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "sender": "1.2.0",
    "contract": "1.9.0",
    "value": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```

## contract_whitelist_operation

```cpp
struct contract_whitelist_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t fee = 2 * ECHO_BLOCKCHAIN_PRECISION;
   };

   asset fee;
   account_id_type sender;
   contract_id_type contract;

   set<account_id_type> add_to_whitelist;
   set<account_id_type> remove_from_whitelist;
   set<account_id_type> add_to_blacklist;
   set<account_id_type> remove_from_blacklist;

   extensions_type   extensions;

   void validate() const;
   account_id_type fee_payer() const { return sender; }
};
```

### JSON Example

```json
[
  37,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "sender": "1.2.0",
    "contract": "1.9.0",
    "add_to_whitelist": [],
    "remove_from_whitelist": [],
    "add_to_blacklist": [],
    "remove_from_blacklist": [],
    "extensions": []
  }
]
```

## contract_transfer_operation

Virtual operation that indicates internal transfers from contracts.

```cpp
struct contract_transfer_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t fee       = 0;
   };

   asset                fee;
   /// Contract to transfer asset from
   contract_id_type     from;
   /// Account or contract to transfer asset to
   object_id_type       to;
   /// The amount of asset to transfer from @ref from to @ref to
   asset                amount;

   extensions_type   extensions;

   void validate() const;
   account_id_type fee_payer() const { return account_id_type(); }
};
```

### JSON Example

```json
[
  27,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "from": "1.9.0",
    "to": "0.0.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```

## contract_update_operation

Update contract data.

```cpp
struct contract_update_operation : public base_operation
{
   struct fee_parameters_type {
      share_type fee = 20 * ECHO_BLOCKCHAIN_PRECISION;
   };

   asset fee;
   account_id_type sender;
   contract_id_type contract;
   
   fc::optional<account_id_type> new_owner;

   extensions_type extensions;

   void validate() const;
   account_id_type fee_payer() const { return sender; }
};
```

### JSON Example

```json
[
  28,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "sender": "1.2.0",
    "contract": "1.9.0",
    "extensions": []
  }
]
```