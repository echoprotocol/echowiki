# Sidechain Operations

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
   39,
   {
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
   40,
   {
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
   41,
   {
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
   42,
   {
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
   43,
   {
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

## sidechain_issue_operation

```cpp
struct sidechain_issue_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };
   
   sidechain_issue_operation() = default;
   sidechain_issue_operation(asset v, account_id_type a, deposit_eth_id_type d) :
            value(v), account(a), deposit_id(d) {}
   
   asset           fee;
   asset           value;
   account_id_type account;
   object_id_type  deposit_id;

   extensions_type extensions;

   account_id_type fee_payer()const { return ECHO_NULL_ACCOUNT; }
   void            validate ()const {};
   share_type      calculate_fee(const fee_parameters_type& schedule)const { return schedule.fee; }
};
```

### JSON Example

```json
[
   44,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "value": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "account": "1.2.0",
      "deposit_id": "0.0.0",
      "extensions": []
   }
]
```

## sidechain_burn_operation

```cpp
struct sidechain_burn_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };
   sidechain_burn_operation() = default;
   sidechain_burn_operation(asset v, account_id_type a, withdraw_eth_id_type w) :
            value(v), account(a), withdraw_id(w) {}
   
   asset           fee;
   asset           value;
   account_id_type account;
   object_id_type  withdraw_id;

   extensions_type extensions;

   account_id_type fee_payer()const { return account; }
   void            validate ()const {};
   share_type      calculate_fee(const fee_parameters_type& schedule)const { return schedule.fee; }
};
```

### JSON Example

```json
[
   45,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "value": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "account": "1.2.0",
      "withdraw_id": "0.0.0",
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
   46,
   {
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
   47,
   {
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
   48,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "account": "1.2.0",
      "to": "0000000000000000000000000000000000000000",
      "erc20_token": "1.17.0",
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
   49,
   {
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

## sidechain_erc20_issue_operation

```cpp
struct sidechain_erc20_issue_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    deposit_erc20_token_id_type deposit;
    account_id_type account;
    erc20_token_id_type token;
    string amount;

    extensions_type extensions;

    account_id_type fee_payer() const { return ECHO_NULL_ACCOUNT; }
    share_type calculate_fee(const fee_parameters_type& schedule) const { return 0; }
};
```
### JSON Example

```json
[
   50,
   {
      "deposit": "1.18.0",
      "account": "1.2.0",
      "token": "1.17.0",
      "amount": "",
      "extensions": []
   }
]
```


## sidechain_erc20_burn_operation

```cpp
struct sidechain_erc20_burn_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;
    
    withdraw_erc20_token_id_type withdraw;
    account_id_type account;
    erc20_token_id_type token;
    string amount;

    extensions_type extensions;

    account_id_type fee_payer() const { return ECHO_NULL_ACCOUNT; }
    share_type calculate_fee(const fee_parameters_type& schedule) const { return 0; }
};
```

### JSON Example

```json
[
   51,
   {
      "withdraw": "1.19.0",
      "account": "1.2.0",
      "token": "1.17.0",
      "amount": "",
      "extensions": []
   }
]
```


## sidechain_btc_create_address_operation
```cpp
struct sidechain_btc_create_address_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type account;
    std::string backup_address;

    extensions_type extensions;

    account_id_type fee_payer() const { return account; }

    void validate() const { FC_ASSERT(!backup_address.empty()); }
    share_type calculate_fee(const fee_parameters_type& k) const { return k.fee; }
};
```

### JSON Example

```json
[
   52,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "account": "1.2.0",
      "backup_address": "n4cLNDfyVPGoNFUpUEyBP8TzDPRNaVBm6E",
      "extensions": []
   }
]
```


## sidechain_btc_create_intermediate_deposit_operation
```cpp
struct sidechain_btc_create_intermediate_deposit_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type committee_member_id;

    account_id_type account;
    btc_address_id_type btc_address_id;
    btc_transaction_details tx_info;

    extensions_type extensions;

    account_id_type fee_payer()const { return committee_member_id; }
};
```

### JSON Example

```json
[
   53,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "committee_member_id": "1.2.0",
      "account": "1.2.0",
      "btc_address_id": "1.19.0",
      "tx_info": {
         "block_number": 0,
         "out": {
            "tx_id": "0000000000000000000000000000000000000000000000000000000000000000",
            "index": 0,
            "amount": 0
         }
      },
      "extensions": []
   }
]
```


## sidechain_btc_intermediate_deposit_operation
```cpp
struct sidechain_btc_intermediate_deposit_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type committee_member_id;
    btc_intermediate_deposit_id_type intermediate_address_id;
    btc_signature_type signature;

    extensions_type extensions;

    account_id_type fee_payer()const { return committee_member_id; }
};
```

### JSON Example

```json
[
   54,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "committee_member_id": "1.2.0",
      "intermediate_address_id": "1.20.0",
      "signature": [],
      "extensions": []
   }
]
```


## sidechain_btc_deposit_operation
```cpp
struct sidechain_btc_deposit_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type committee_member_id;
    account_id_type account;
    btc_intermediate_deposit_id_type intermediate_deposit_id;
    btc_transaction_details tx_info;

    extensions_type extensions;

    account_id_type fee_payer() const { return committee_member_id; }

    share_type calculate_fee(const fee_parameters_type& k) const { return k.fee; }
};
```

### JSON Example

```json
[
   55,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "committee_member_id": "1.2.0",
      "account": "1.2.0",
      "intermediate_deposit_id": "1.20.0",
      "tx_info": {
         "block_number": 0,
         "out": {
            "tx_id": "0000000000000000000000000000000000000000000000000000000000000000",
            "index": 0,
            "amount": 0
         }
      },
      "extensions": []
   }
]
```


## sidechain_btc_withdraw_operation
```cpp
struct sidechain_btc_withdraw_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type account;

    std::string btc_addr;
    uint64_t value;

    extensions_type extensions;

    account_id_type fee_payer()const { return account; }
};
```

### JSON Example

```json
[
   56,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "account": "1.2.0",
      "btc_addr": "n4cLNDfyVPGoNFUpUEyBP8TzDPRNaVBm6E",
      "value": 0,
      "extensions": []
   }
]
```


## sidechain_btc_aggregate_operation
```cpp
struct sidechain_btc_aggregate_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type committee_member_id;

    std::set<btc_deposit_id_type> deposits;
    std::set<btc_withdraw_id_type> withdrawals;

    fc::sha256 transaction_id;
    p2sh_p2wsh sma_address;
    commitee_pub_keys_map_t committee_member_ids_in_script;
    uint64_t aggregation_out_value = 0;

    fc::optional<btc_aggregating_id_type> previous_aggregation;
    uint8_t cpfp_depth = 0;

    std::map<std::uint32_t, btc_signature_type> signatures;

    extensions_type extensions;

    account_id_type fee_payer()const { return committee_member_id; }
};
```

### JSON Example

```json
[
   57,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "committee_member_id": "1.2.0",
      "deposits": [],
      "withdrawals": [],
      "transaction_id": "0000000000000000000000000000000000000000000000000000000000000000",
      "sma_address": "2NBVhof6ntL76Kpy1D4znTqqt13Rt5J8SeS",
      "committee_member_ids_in_script": [],
      "aggregation_out_value": 0,
      "previous_aggregation": "1.23.0", // optional
      "cpfp_depth": 0,
      "signatures": [],
      "extensions": []
   }
]
```


## sidechain_btc_approve_aggregate_operation
```cpp
struct sidechain_btc_approve_aggregate_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type committee_member_id;
    fc::sha256 transaction_id;

    extensions_type extensions;

    account_id_type fee_payer()const { return committee_member_id; }
};
```

### JSON Example

```json
[
   58,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "committee_member_id": "1.2.0",
      "transaction_id": "0000000000000000000000000000000000000000000000000000000000000000",
      "extensions": []
   }
]
```