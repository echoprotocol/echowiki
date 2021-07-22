# Sidechain Operations

## sidechain_eth_create_address_operation

Used to generate address in ETH blockchain. After the address is generated eth\_address\_object\(s\) will be created in echo db and can be retrieved using get\_eth\_address method. Until one of the objects will receive sufficient amount of approvals the number of objects connected to account id can be more than one.

User use this operation to generate ethereum address which can be used to interact with eth sidechain. Before user can use the address it must be approved by the committee.

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
   40,
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

An internal operation by which committee members confirm the created Ethereum address.

Committee member sends this operation to approve created address. After the required number of approvals has been collected user can use his eth address to interact with eth sidechain.

```cpp
struct sidechain_eth_approve_address_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   std::vector<account_id_type> malicious_committeemen;

   account_id_type account;
   eth_address_type eth_addr;
   sha256 transaction_hash;

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
      "malicious_committeemen": [],
      "account": "1.2.0",
      "eth_addr": "0000000000000000000000000000000000000000",
      "transaction_hash": "0000000000000000000000000000000000000000000000000000000000000000",
      "extensions": []
   }
]
```

## sidechain_eth_deposit_operation

An internal operation by which committee members confirm Ethereum deposit.

This operation is sent by the committee member to indicate that eth transaction with deposit was processed in the echo.

```cpp
struct sidechain_eth_deposit_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   uint64_t deposit_id;
   account_id_type account;
   uint64_t value;
   sha256 transaction_hash;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
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
      "committee_member_id": "1.2.0",
      "deposit_id": 0,
      "account": "1.2.0",
      "value": 0,
      "transaction_hash": "0000000000000000000000000000000000000000000000000000000000000000",
      "extensions": []
   }
]
```

## sidechain_eth_send_deposit_operation

An internal operation by which committee members confirm Ethereum deposit after 24h and credit eETH.

This operation is sent by the committee member after 24h after receiving deposit to approve deposit. After the required number of approvals has been collected eETH are credited to the account to which the eth address is attached.

```cpp
struct sidechain_eth_send_deposit_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   eth_deposit_id_type deposit_id;

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
      "deposit_id": "1.14.0",
      "extensions": []
   }
]
```

## sidechain_eth_withdraw_operation

Used to withdraw the eETH and receive ETH to provided address.

User use this operation to withdraw eETH and receive back ethereum to provided address.

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
   44,
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

## sidechain_eth_send_withdraw_operation

An internal operation by which committee members confirm the withdrawal of ETH after 24h.

This operation is used by the commitee member to approve withdrawal of ETH after 24h.

```cpp
struct sidechain_eth_send_withdraw_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   eth_withdraw_id_type withdraw_id;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
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
      "committee_member_id": "1.2.0",
      "withdraw_id": "1.15.0",
      "extensions": []
   }
]
```

## sidechain_eth_approve_withdraw_operation

An internal operation by which committee members confirm the withdrawal of ETH and burn the eETH.

This operation is used by the commitee member to approve withdrawal. After the required number of approvals has been collected indicated amount of ETH is transfered back to provided address and eETH are burned.

```cpp
struct sidechain_eth_approve_withdraw_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   uint64_t withdraw_id;
   sha256 transaction_hash;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
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
      "committee_member_id": "1.2.0",
      "withdraw_id": 0,
      "transaction_hash": "0000000000000000000000000000000000000000000000000000000000000000",
      "extensions": []
   }
]
```

## sidechain_eth_update_contract_address_operation

An internal operation, sent by committee member to propose update of the eth contract address.

This operation is used by the committee only through proposals to change address of the eth sidechain contract.

```cpp
struct sidechain_eth_update_contract_address_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = ECHO_BLOCKCHAIN_PRECISION; };

   asset fee;
   eth_address_type new_addr;

   extensions_type extensions;

   account_id_type fee_payer() const { return ECHO_COMMITTEE_ACCOUNT; }
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
      "new_addr": "0e7057518879d5DE1F842b77e8F6F3e22931a1be",
      "extensions": []
   }
]
```

## sidechain_issue_operation

Virtual operation, which reports that the money entered with the help of sidechain.

This operation is used to credit sidechain assets.

```cpp
struct sidechain_issue_operation : public base_operation
{
   asset           value;
   account_id_type account;
   object_id_type  deposit_id;

   extensions_type extensions;

   account_id_type fee_payer()const { return ECHO_NULL_ACCOUNT; }
};
```

### JSON Example

```json
[
   48,
   {
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

Virtual operation, which reports that the conclusion was successful and funds burned\(withdrawn\).

This operation is used to burn sidechain assets.

```cpp
struct sidechain_burn_operation : public base_operation
{
   asset           value;
   account_id_type account;
   object_id_type  withdraw_id;

   extensions_type extensions;

   account_id_type fee_payer()const { return ECHO_NULL_ACCOUNT; }
};
```

### JSON Example

```json
[
   49,
   {
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

## sidechain_erc20_register_contract_operation

Used to register(create) contract in the sidechain. Used by committie members through proposal.

```cpp
struct sidechain_erc20_register_contract_operation : public base_operation
{
    struct fee_parameters_type
    {
        uint64_t fee = ECHO_BLOCKCHAIN_PRECISION;
    };

    asset fee;

    std::string code;
    std::string args;
    eth_address_type address; // address of the contract in ethereum
    std::string name;
    std::string symbol;
    uint8_t decimals;

    extensions_type extensions;

    share_type calculate_fee(const fee_parameters_type& fp) const { return fp.fee; }
    account_id_type fee_payer() const { return ECHO_COMMITTEE_ACCOUNT; }
};
```

### JSON Example

```json
[
   50,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "code": "",
      "args": "",
      "address": "0000000000000000000000000000000000000000",
      "name": "",
      "symbol": "",
      "decimals": 0,
      "extensions": []
   }
]
```

## sidechain_erc20_register_token_operation

Used to register a token in the sidechain.

User use this operation to register his erc20 token in echo network.

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
   bool eth_accuracy;
   
   extensions_type extensions;

   account_id_type fee_payer() const { return account; }
};
```

### JSON Example

```json
[
   51,
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
      "eth_accuracy": false,
      "extensions": []
   }
]
```

## sidechain_erc20_deposit_token_operation

An internal operation by which committee members confirm the entry of tokens.

This operation is sent by the committee member to indicate that eth transaction with erc20 deposit was processed in the echo. 

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
   52,
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

## sidechain_erc20_send_deposit_operation

An internal operation by which committee members confirm the entry of tokens after 24h and credit token.

This operation is sent by the committee member after 24h after receiving erc20 deposit to approve deposit. After the required number of approvals has been collected provided amount of tokens are credited to the account in the echo network.

```cpp
struct sidechain_erc20_send_deposit_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   erc20_deposit_token_id_type deposit_id;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
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
      "deposit_id": "1.17.0",
      "extensions": []
   }
]
```

## sidechain_erc20_withdraw_token_operation

Executed by the user and initiates the withdrawal of the token from the Echo network to the specified address.

User use this operation to withdraw erc20 tokens and receive back this tokens to provided eth address.

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
   54,
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

## sidechain_erc20_send_withdraw_operation

An internal operation by which committee members confirm the removal of tokens after 24h.

This operation is used by the commitee member to approve withdrawal of erc20 tokens after 24h.

```cpp
struct sidechain_erc20_send_withdraw_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;
   account_id_type committee_member_id;
   erc20_withdraw_token_id_type withdraw_id;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
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
      "withdraw_id": "1.18.0",
      "extensions": []
   }
]
```

## sidechain_erc20_approve_token_withdraw_operation

An internal operation by which committee members confirm the removal of tokens.

This operation is used by the commitee member to approve withdrawal. After the required number of approvals has been collected indicated amount of erc20 tokens is transfered back to provided address and erc20 tokens are burned.

```cpp
struct sidechain_erc20_approve_token_withdraw_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;

   account_id_type committee_member_id;
   uint64_t withdraw_id;
   sha256 transaction_hash;

   extensions_type extensions;

   account_id_type fee_payer() const { return committee_member_id; }
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
      "committee_member_id": "1.2.0",
      "withdraw_id": 0,
      "transaction_hash": "0000000000000000000000000000000000000000000000000000000000000000",
      "extensions": []
   }
]
```

## sidechain_erc20_issue_operation

Virtual operation which issues erc20 token.

This operation is used to credit erc20 tokens.

```cpp
struct sidechain_erc20_issue_operation : public base_operation
{
   erc20_deposit_token_id_type deposit;
   account_id_type account;
   erc20_token_id_type token;
   string amount;

   extensions_type extensions;

   account_id_type fee_payer() const { return ECHO_NULL_ACCOUNT; }
};
```
### JSON Example

```json
[
   57,
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

Virtual operation which burns erc20 tokens.

This operation is used to burn erc20 tokens.

```cpp
struct sidechain_erc20_burn_operation : public base_operation
{
   erc20_withdraw_token_id_type withdraw;
   account_id_type account;
   erc20_token_id_type token;
   string amount;

   extensions_type extensions;

   account_id_type fee_payer() const { return ECHO_NULL_ACCOUNT; }
};
```

### JSON Example

```json
[
   58,
   {
      "withdraw": "1.19.0",
      "account": "1.2.0",
      "token": "1.17.0",
      "amount": "",
      "extensions": []
   }
]
```

## sidechain_erc20_transfer_asset_operation

Used for transfer asset to Ethereum ERC20 contract.

```cpp
struct sidechain_erc20_transfer_asset_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type account;
    eth_address_type to;
    asset value;

    extensions_type extensions;

    account_id_type fee_payer() const { return account; }
};

```

### JSON Example

```json
[
   59,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "account": "1.2.26",
      "to": "0000000000000000000000000000000000000000",
      "value": {
         "amount": 1000,
         "asset_id": "1.3.0"
      },
      "extensions": []
   }
]
```


## sidechain_btc_create_address_operation

Used to generate address in BTC blockchain. After the address is generated btc\_address\_object\(s\) will be created in echo db and can be retrieved using get\_btc\_address method.

User use this operation to generate bitcoin address which can be used to interact with btc sidechain. Backup address must be only P2PK.

```cpp
struct sidechain_btc_create_address_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

   asset fee;

   account_id_type account;

   extensions_type extensions;

   account_id_type fee_payer() const { return account; }
};
```

### JSON Example

```json
[
   60,
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

## sidechain_btc_deposit_operation

This operation is used by the committee member to indicate that deposit address was processed.

```cpp
struct sidechain_btc_deposit_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type account;
    btc_address_id_type btc_address_id;
    btc_transaction_details tx_info;

   account_id_type fee_payer() const { return committee_member_id; }
};
```

### JSON Example

```json
[
   63,
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

Used to withdraw the eBTC and receive BTC to provided address.

User use this operation to withdraw eBTC and receive back bitcoins to provided address.

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
   64,
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

An internal operation by which committee members collect an aggregate transaction.

This operation is used to collect all deposits and withdrawals into aggregate transaction.

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
   uint32_t btc_block_number = 0;

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
   65,
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
      "btc_block_number": 0,
      "previous_aggregation": "1.23.0", // optional
      "cpfp_depth": 0,
      "signatures": [],
      "extensions": []
   }
]
```


## sidechain_btc_approve_aggregate_operation

An internal operation by which committee members confirm the aggregate transaction.

Used by the committee member to approve aggregate transaction. After the required number of approvals has been collected aggregate transaction is sent to bitcoin network and eBTC are credited/burned.

```cpp
struct sidechain_btc_approve_aggregate_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;

    account_id_type committee_member_id;
    fc::sha256 transaction_id;
    uint64_t block_number = 0;

    extensions_type extensions;

    account_id_type fee_payer()const { return committee_member_id; }
};
```

### JSON Example

```json
[
   66,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "committee_member_id": "1.2.0",
      "transaction_id": "0000000000000000000000000000000000000000000000000000000000000000",
      "block_number": 0,
      "extensions": []
   }
]
```


## sidechain_stake_eth_update_operation

Used by the committee member to approve/generate  `stake_eth_update_object` with Ethereum stake sidechain data.

```cpp
struct sidechain_stake_eth_update_operation : public base_operation
{
    struct fee_parameters_type
    {
        uint64_t fee = 0;
    };

    asset fee;
    account_id_type committee_member_id;
    asset_id_type asset_id;
    uint64_t current_balance;
    account_id_type account;

    fc::sha256 transaction_hash;

    extensions_type extensions;

    account_id_type fee_payer() const { return committee_member_id; }
};
```

### JSON Example

```json
[
  67,
  {
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "committee_member_id": "1.2.1",
    "asset_id": "1.3.10",
    "current_balance": "1000000",
    "account": "1.2.26",
    "transaction_hash": "0000000000000000000000000000000000000000000000000000000000000000",
    "extensions": [ ]
  }
]
```


## sidechain_stake_btc_create_script_operation

Used to generate `stake_btc_script_object` with stake script and p2sh address.

```cpp
struct sidechain_stake_btc_create_script_operation : public base_operation
{
    struct fee_parameters_type
    {
        uint64_t fee = 0;
    };

    asset fee;

    account_id_type account;
    fc::ripemd160 pubkey_hash;

    extensions_type extensions;

    account_id_type fee_payer() const { return account; }
};
```

### JSON Example

```json
[
  68,
  {
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.26",
    "pubkey_hash": "6334edf1175678f7905763e6b24361ab998aa232",
    "extensions": [ ]
  }
]
```


## sidechain_stake_btc_update_operation

Used by the committee member to approve/generate `stake_btc_vout_object` with data about deposits and withdrawals.

```cpp
struct sidechain_stake_btc_update_operation : public base_operation
{
    struct fee_parameters_type
    {
        uint64_t fee = 0;
    };

    asset fee;

    // committee sender id
    account_id_type committee_member_id;
    account_id_type owner;
    btc_transaction_details btc_tx_info;
    bool is_vin = false;

    extensions_type extensions;

    account_id_type fee_payer() const { return committee_member_id; }
};
```

### JSON Example

```json
[
  69,
  {
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "committee_member_id": "1.2.17",
    "owner": "1.2.26",
    "btc_tx_info": {
      "block_number": 0,
      "out": {
         "tx_id": "0000000000000000000000000000000000000000000000000000000000000000",
         "index": 0,
         "amount": 0
      }
    },
    "is_vin": "false",
    "extensions": [ ]
  }
]
```

## sidechain_eth_spv_create_operation

Used by the committee member to add Ethereum block header and sidechain related transaction receipts(with proof) from it

```cpp
struct sidechain_eth_spv_create_operation : public base_operation
{
    struct fee_parameters_type 
    {
        uint64_t fee = 0; 
    };
    
    asset fee;

    account_id_type committee_member_id;
    spv::eth::block_header header;
    std::vector<spv::eth::merkle_proof> proofs;
    
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
    "header": {
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "miner": "0x",
      "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "logsBloom": "0x",
      "difficulty": "0",
      "number": "0",
      "gasLimit": "0",
      "gasUsed": "0",
      "timestamp": "0",
      "extraData": "0x",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce": "0x"
    },
    "proofs": [],
    "extensions": []
  }
]
```

## sidechain_eth_spv_add_missed_tx_receipt_operation

Can be used by any user to add proof for a missed transaction by a committee member. Also will active penalties mechanism

```cpp
struct sidechain_eth_spv_add_missed_tx_receipt_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };
    
    asset fee;

    account_id_type reporter;
    fc::sha256 block_hash;
    std::vector<spv::eth::merkle_proof> proofs;
    
    extensions_type extensions;

    account_id_type fee_payer() const { return reporter; }
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
    "reporter": "1.2.0",
    "block_hash": "0000000000000000000000000000000000000000000000000000000000000000",
    "proofs": [],
    "extensions": []
  }
]
```

## sidechain_btc_spv_create_operation

Used by the committee member to add Bitcoin block header and sidechain related transactions(and its proofs) from it

```cpp
struct sidechain_btc_spv_create_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };
    
    asset fee;

    account_id_type committee_member_id;
    spv::btc::block_header header;
    std::vector<spv::btc::merkle_proof> proofs;
    
    extensions_type extensions;

    account_id_type fee_payer() const { return committee_member_id; }
};
```

### JSON Example

```json
[
  67,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "committee_member_id": "1.2.0",
    "header": {
      "version": 0,
      "prev_block_hash": "0000000000000000000000000000000000000000000000000000000000000000",
      "merkle_root": "0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 0,
      "bits": 0,
      "nonce": 0,
      "height": 0
    },
    "proofs": [],
    "extensions": []
  }
]
```

## sidechain_btc_spv_add_missed_tx_operation

Can be used by any user to add proof for a missed transaction by a committee member. Also will active penalties mechanism

```cpp
struct sidechain_btc_spv_add_missed_tx_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };
    
    asset fee;

    account_id_type reporter;
    fc::sha256 block_hash;
    std::vector<spv::btc::merkle_proof> proofs;
    
    extensions_type extensions;

    account_id_type fee_payer() const { return reporter; }
};
```

### JSON Example

```json
[
  68,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "reporter": "1.2.0",
    "block_hash": "0000000000000000000000000000000000000000000000000000000000000000",
    "proofs": [],
    "extensions": []
  }
]
```

## sidechain_spv_exchange_excess_funds_operation

Can be used by any user to exchange surplus of sidechain asset caused by unexpected committee behavior

```cpp
struct sidechain_spv_exchange_excess_funds_operation : public base_operation
{
    struct fee_parameters_type { uint64_t fee = 0; };

    asset fee;
    account_id_type account;

    asset amount;
    extensions_type extensions;

    account_id_type fee_payer() const { return account; }
};
```

### JSON Example

```json
[
  69,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```
