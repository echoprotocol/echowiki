# Contracts Operations

## contract_create_operation

Creates new contract.

See [Ethereum network contracts compatibility](/technologies/evm-support/README.md#ethereum-network-contracts-compatibility) for more information about `eth_accuracy` and `supported_asset_id` fields.

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

[contract_base_operation](/api-reference/echo-operations/types/contract.md#contract_base_operation)

### JSON Example

```json
[
   31,
   {
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

[contract_base_operation](/api-reference/echo-operations/types/contract.md#contract_base_operation)

### JSON Example

```json
[
   32,
   {
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
      "callee": "1.11.0",
      "extensions": []
   }
]
```

## contract_internal_create_operation

Virtual operation created when contract creates another contract.

See [Ethereum network contracts compatibility](/technologies/evm-support/README.md#ethereum-network-contracts-compatibility) for more information about `eth_accuracy` and `supported_asset_id` fields.

```cpp
struct contract_internal_create_operation : public base_operation
{
    contract_id_type caller;
    contract_id_type new_contract;
    asset value;
    bool eth_accuracy = false;
    fc::optional<asset_id_type> supported_asset_id;

    extensions_type extensions;
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example
```json
[
   33,
   {
      "caller": "1.11.0",
      "new_contract": "1.11.0",
      "value": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "eth_accuracy": false,
      "extensions": []
   }
]
```

## contract_internal_call_operation

Virtual operation created when contract calls another contract or transfers asset.

```cpp
struct contract_internal_call_operation : public base_operation
{
    contract_id_type caller;
    object_id_type callee;
    string method;
    asset value;

    extensions_type extensions;
};
```

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example
```json
[
   34,
   {
      "caller": "1.11.0",
      "callee": "0.0.0",
      "method": "",
      "value": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "extensions": []
   }
]
```

## contract_selfdestruct_operation

Virtual operation created when contract self-destructs.

```cpp
struct contract_selfdestruct_operation : public base_operation
{
    contract_id_type contract;
    object_id_type recipient;
    vector<asset> amounts;

    extensions_type extensions;
};
```

### JSON Example
```json
[
   35,
   {
      "contract": "1.11.0",
      "recipient": "0.0.0",
      "amounts": [],
      "extensions": []
   }
]
```

## contract_update_operation

Update contract data.

Currently this operation can update only the owner of the specified contract.

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

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   36,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "sender": "1.2.0",
      "contract": "1.11.0",
      "extensions": []
   }
]
```

## contract_fund_pool_operation

Transfer asset from sender account to contract [fee pool](/advanced/contract-fee-pool.md).

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

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   37,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "sender": "1.2.0",
      "contract": "1.11.0",
      "value": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "extensions": []
   }
]
```

## contract_whitelist_operation

Manage the blacklist and whitelist pool of the contract. For more informattion see `Whitelisting and Blacklisting` section in [fee pool](/advanced/contract-fee-pool.md)

This operation is used to manage accounts in whitelist and blacklist of the specified contract.

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

[asset](/api-reference/echo-operations/types/common.md#asset)

### JSON Example

```json
[
   38,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "sender": "1.2.0",
      "contract": "1.11.0",
      "add_to_whitelist": [],
      "remove_from_whitelist": [],
      "add_to_blacklist": [],
      "remove_from_blacklist": [],
      "extensions": []
   }
]
```
