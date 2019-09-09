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
  24,{
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
  35,{
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
  36,{
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
  26,{
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
  43,{
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

## sidechain_eth_create_address_operation

```cpp
struct sidechain_eth_create_address_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type account;

   extensions_type extensions;

   account_id_type fee_payer()const { return account; }
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
    "account": "1.2.0",
    "extensions": []
  }
]
```

## sidechain_eth_approve_address_operation

```cpp
struct sidechain_eth_approve_address_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   std::vector<account_id_type> malicious_committeemen;

   account_id_type account;
   eth_address_type eth_addr;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
};
```

### JSON Example

```json
[
  31,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "committee_member_id": "1.2.0",
    "malicious_committeemen": [],
    "account": "1.2.0",
    "eth_addr": "0000000000000000000000000000000000000000",
    "extensions": []
  }
]
```

## sidechain_eth_deposit_operation

```cpp
struct sidechain_eth_deposit_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   uint64_t deposit_id;
   account_id_type account;
   uint64_t value;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
};
```

### JSON Example

```json
[
  32,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "committee_member_id": "1.2.0",
    "deposit_id": 0,
    "account": "1.2.0",
    "value": 0,
    "extensions": []
  }
]
```

## sidechain_eth_withdraw_operation

```cpp
struct sidechain_eth_withdraw_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type account;
   eth_address_type eth_addr;
   uint64_t value;

   extensions_type extensions;

   account_id_type fee_payer() const { return account; }
};
```

### JSON Example

```json
[
  33,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.0",
    "eth_addr": "0000000000000000000000000000000000000000",
    "value": 0,
    "extensions": []
  }
]
```

## sidechain_eth_approve_withdraw_operation

```cpp
struct sidechain_eth_approve_withdraw_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   uint64_t withdraw_id;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
};
```

### JSON Example

```json
[
  34,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "committee_member_id": "1.2.0",
    "withdraw_id": 0,
    "extensions": []
  }
]
```

## sidechain_change_config_operation

```cpp
struct sidechain_change_config_operation :  public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };
   
   asset fee;
   account_id_type registrar;
   echo::sidechain::config new_config;

   extensions_type extensions;

   account_id_type fee_payer()const { return registrar; }
   void            validate ()const {};
   share_type      calculate_fee(const fee_parameters_type& schedule)const { return schedule.fee; }
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
    "registrar": "1.2.0",
    "new_config": {
      "eth_contract_address": "0000000000000000000000000000000000000000",
      "eth_committee_update_method": {
        "method": "",
        "gas": 0
      },
      "eth_gen_address_method": {
        "method": "",
        "gas": 0
      },
      "eth_withdraw_method": {
        "method": "",
        "gas": 0
      },
      "eth_update_addr_method": {
        "method": "",
        "gas": 0
      },
      "eth_withdraw_token_method": {
        "method": "",
        "gas": 0
      },
      "eth_collect_tokens_method": {
        "method": "",
        "gas": 0
      },
      "eth_committee_updated_topic": "0000000000000000000000000000000000000000000000000000000000000000",
      "eth_gen_address_topic": "0000000000000000000000000000000000000000000000000000000000000000",
      "eth_deposit_topic": "0000000000000000000000000000000000000000000000000000000000000000",
      "eth_withdraw_topic": "0000000000000000000000000000000000000000000000000000000000000000",
      "erc20_deposit_topic": "0000000000000000000000000000000000000000000000000000000000000000",
      "ETH_asset_id": "1.3.0",
      "fines": {
        "generate_eth_address": 0
      },
      "waiting_blocks": 0
    },
    "extensions": []
  }
]
```

## sidechain_eth_issue_operation

```cpp
struct sidechain_eth_issue_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };
   
   sidechain_eth_issue_operation() = default;
   sidechain_eth_issue_operation(asset v, account_id_type a, deposit_eth_id_type d) :
            value(v), account(a), deposit_id(d) {}
   
   asset               fee;
   asset               value;
   account_id_type     account;
   deposit_eth_id_type deposit_id;

   extensions_type extensions;

   account_id_type fee_payer()const { return account; }
   void            validate ()const {};
   share_type      calculate_fee(const fee_parameters_type& schedule)const { return schedule.fee; }
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
    "value": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.0",
    "deposit_id": "1.13.0",
    "extensions": []
  }
]
```

## sidechain_eth_burn_operation

```cpp
struct sidechain_eth_burn_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };
   sidechain_eth_burn_operation() = default;
   sidechain_eth_burn_operation(asset v, account_id_type a, withdraw_eth_id_type w) :
            value(v), account(a), withdraw_id(w) {}
   
   asset                   fee;
   asset                   value;
   account_id_type         account;
   withdraw_eth_id_type    withdraw_id;

   extensions_type extensions;

   account_id_type fee_payer()const { return account; }
   void            validate ()const {};
   share_type      calculate_fee(const fee_parameters_type& schedule)const { return schedule.fee; }
};
```

### JSON Example

```json
[
  38,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "value": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.0",
    "withdraw_id": "1.14.0",
    "extensions": []
  }
]
```

## sidechain_erc20_register_token_operation

```cpp
struct sidechain_erc20_register_token_operation : public base_operation
{
   struct fee_parameters_type {
      uint64_t fee = 5000 * ECHO_BLOCKCHAIN_PRECISION;
      uint64_t pool_fee = 5 * ECHO_BLOCKCHAIN_PRECISION;
   };

   asset fee;

   account_id_type account;
   eth_address_type eth_addr; // address of the contract in ethereum
   std::string name;
   std::string symbol;
   uint8_t decimals;
   
   extensions_type extensions;

   account_id_type fee_payer() const { return account; }
   share_type calculate_fee(const fee_parameters_type& fp) const { return fp.fee + fp.pool_fee; }
};
```

### JSON Example

```json
[
  39,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.0",
    "eth_addr": "0000000000000000000000000000000000000000",
    "name": "",
    "symbol": "",
    "decimals": 0,
    "extensions": []
  }
]
```

## sidechain_erc20_deposit_token_operation

```cpp
struct sidechain_erc20_deposit_token_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   
   account_id_type committee_member_id;
   std::vector<account_id_type> malicious_committeemen;

   account_id_type account;
   eth_address_type erc20_token_addr; // address of the contract in ethereum
   std::string value;
   sha256 transaction_hash;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
};
```

### JSON Example

```json
[
  40,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "committee_member_id": "1.2.0",
    "malicious_committeemen": [],
    "account": "1.2.0",
    "erc20_token_addr": "0000000000000000000000000000000000000000",
    "value": "",
    "transaction_hash": "0000000000000000000000000000000000000000000000000000000000000000",
    "extensions": []
  }
]
```

## sidechain_erc20_withdraw_token_operation

```cpp
struct sidechain_erc20_withdraw_token_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;

   account_id_type account;
   eth_address_type to; // withdrawal address
   erc20_token_id_type erc20_token; // contract id of the token
   std::string value;

   extensions_type extensions;

   account_id_type fee_payer() const { return account; }
};
```

### JSON Example

```json
[
  41,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.0",
    "to": "0000000000000000000000000000000000000000",
    "erc20_token": "1.15.0",
    "value": "",
    "extensions": []
  }
]
```

## sidechain_erc20_approve_token_withdraw_operation

```cpp
struct sidechain_erc20_approve_token_withdraw_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;

   account_id_type committee_member_id;
   uint64_t withdraw_id;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
};
```

### JSON Example

```json
[
  42,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "committee_member_id": "1.2.0",
    "withdraw_id": 0,
    "extensions": []
  }
]
```