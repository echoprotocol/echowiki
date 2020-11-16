## stake_btc_script_object 

```cpp
struct stake_btc_script_object
{
    account_id_type account;
    std::string stake_script;
    std::string address;

    extensions_type extensions;
};
```

## stake_btc_vout_object 

```cpp
struct stake_btc_vout_object
{    
    // owner of balance
    account_id_type account;
    // vout transaction data
    echo::sidechain::btc::prev_out out;

    // vout trx block number (just for setting last_processed_btc_block)
    uint64_t vout_block_number = 0;
    // vin trx block number (just for setting last_processed_btc_block)
    uint64_t vin_block_number = 0;

    std::set<account_id_type> approves_for_vout;
    bool is_vout_approved = false;
    std::set<account_id_type> approves_for_vin;
    bool is_vin_approved = false;

    extensions_type extensions;
};
```

## stake_eth_update_object

```cpp
struct stake_eth_update_object
{    
    account_id_type account;
    asset_id_type asset_id;
    uint64_t current_balance;

    fc::sha256 transaction_hash;

    bool is_approved = false;
    set<account_id_type> approves;

    extensions_type extensions;
};
```