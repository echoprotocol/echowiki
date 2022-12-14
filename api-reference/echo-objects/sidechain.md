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

## btc_block_object

```cpp
class btc_block_object
{
public:
    spv::btc::block_header header;
    fc::sha256 block_hash;
    uint32_t height;

    extensions_type extensions;
};
```

## btc_tx_object

```cpp
class btc_tx_object
{
public:
    fc::sha256 block_hash;
    spv::btc::merkle_proof proof;

    extensions_type extensions;
};
```

## eth_block_object

```cpp
class eth_block_object
{
public:
    spv::eth::block_header header;
    fc::sha256 block_hash;

    extensions_type extensions;
};
```

## eth_tx_receipt_object

```cpp
class eth_tx_receipt_object
{
public:
    fc::sha256 block_hash;
    spv::eth::merkle_proof proof;

    extensions_type extensions;
};
```