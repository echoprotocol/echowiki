# Chain parameters

```cpp
struct chain_parameters
{
   /** using a smart ref breaks the circular dependency created between operations and the fee schedule */
   smart_ref<fee_schedule>                                    current_fees;                       ///< current schedule of fees
   uint32_t maintenance_interval                            = ECHO_DEFAULT_MAINTENANCE_INTERVAL; ///< interval in sections between blockchain maintenance events
   uint8_t  maintenance_duration_seconds                    = ECHO_DEFAULT_MAINTENANCE_DURATION_SECONDS; ///< duration of maintenance(time to stop echorand)
   uint32_t committee_proposal_review_period                = ECHO_DEFAULT_COMMITTEE_PROPOSAL_REVIEW_PERIOD_SEC; ///< minimum time in seconds that a proposed transaction requiring committee authority may not be signed, prior to expiration
   uint32_t maximum_transaction_size                        = ECHO_DEFAULT_MAX_TRANSACTION_SIZE; ///< maximum allowable size in bytes for a transaction
   uint32_t maximum_block_size                              = ECHO_DEFAULT_MAX_BLOCK_SIZE; ///< maximum allowable size in bytes for a block
   uint32_t maximum_time_until_expiration                   = ECHO_DEFAULT_MAX_TIME_UNTIL_EXPIRATION; ///< maximum lifetime in seconds for transactions to be valid, before expiring
   uint32_t maximum_proposal_lifetime                       = ECHO_DEFAULT_MAX_PROPOSAL_LIFETIME_SEC; ///< maximum lifetime in seconds for proposed transactions to be kept, before expiring
   uint8_t  maximum_asset_whitelist_authorities             = ECHO_DEFAULT_MAX_ASSET_WHITELIST_AUTHORITIES; ///< maximum number of accounts which an asset may list as authorities for its whitelist OR blacklist
   uint8_t  maximum_asset_feed_publishers                   = ECHO_DEFAULT_MAX_ASSET_FEED_PUBLISHERS; ///< the maximum number of feed publishers for a given asset
   uint16_t maximum_authority_membership                    = ECHO_DEFAULT_MAX_AUTHORITY_MEMBERSHIP; ///< largest number of keys/accounts an author
   uint8_t  max_authority_depth                             = ECHO_MAX_SIG_CHECK_DEPTH;

   int64_t  block_emission_amount                           = 0;
   uint16_t block_producer_reward_ratio                     = 50 * ECHO_1_PERCENT;

   uint64_t committee_frozen_balance_to_activate            = ECHO_DEFAULT_COMMITTEE_FROZEN_BALANCE_TO_ACTIVATE;
   uint64_t committee_maintenance_intervals_to_deposit      = ECHO_DEFAULT_COMMITTEE_MAINTENANCE_INTERVALS_TO_DEPOSIT;
   uint32_t committee_freeze_duration_seconds               = ECHO_DEFAULT_COMMITTEE_FREEZE_DURATION_SECONDS;

   uint64_t x86_64_maximum_contract_size                    = 200'000;

   std::map<uint16_t, uint32_t> frozen_balances_multipliers = {
      {90,  130 * ECHO_1_PERCENT},
      {180, 140 * ECHO_1_PERCENT},
      {360, 150 * ECHO_1_PERCENT},
   };

   echo::rand::config echorand_config; ///< See Configuration parameters for EchoRand algorithm implementation in chain-parameters.md
   echo::sidechain::config sidechain_config; ///< See Configuration parameters for Echo Sidechain in chain-parameters.md
   echo::sidechain::erc20_config erc20_config; ///< See Configuration parameters for Echo ERC20 in chain-parameters.md

   gas_price_t gas_price;

   extensions_type extensions;
};
```

## Gas price type

```cpp
struct gas_price_t
{
   uint64_t price = 1;
   uint64_t gas_amount = 1000;
};
```

## Configuration parameters for EchoRand algorithm implementation

```cpp
struct config
{
   unsigned _time_generate  = 0;    ///< timeout in mills to generate block on GC1
   unsigned _time_net_1mb   = 0;    ///< timeout in mills for 1Mb message spreads over the network
   unsigned _time_net_256b  = 0;    ///< timeout in mills for 256b message spreads over the network
   unsigned _creator_count  = 0;    ///< number of max block creators for this node
   unsigned _verifier_count = 0;    ///< number of max block verifiers for this node
   unsigned _ok_threshold   = 0;    ///< threshold to made ok decision, recommended eq. 0.69 * _creator_count
   unsigned _max_bba_steps  = 0;    ///< max number of BBA steps
   unsigned _gc1_delay      = 0;    ///< delay before sending GC1 messages in milliseconds
   unsigned _round_attempts = 0;    ///< number of max attempts to generate non-empty block on round before stop EchoRand
};
```

## Configuration parameters for Echo Sidechain

```cpp
struct config
{
   eth_address_type eth_contract_address;
   eth_method eth_committee_update_method;
   eth_method eth_gen_address_method;
   eth_method eth_withdraw_method;
   eth_method eth_update_addr_method;
   eth_method eth_withdraw_token_method;
   eth_method eth_collect_tokens_method;
   eth_topic_type eth_committee_updated_topic;
   eth_topic_type eth_gen_address_topic;
   eth_topic_type eth_deposit_topic;
   eth_topic_type eth_withdraw_topic;
   eth_topic_type erc20_deposit_topic;
   eth_topic_type erc20_withdraw_topic;
   asset_id_type ETH_asset_id;
   asset_id_type BTC_asset_id;
   sidechain_fines fines;
   gas_price_type gas_price;
   uint32_t satoshis_per_byte = 1;
   uint32_t coefficient_waiting_blocks = 0;
};
```

## Configuration parameters for Echo ERC20

```cpp
struct erc20_config
{
   std::string contract_code;
   uint64_t create_token_fee;
   eth_topic_type transfer_topic;
   eth_method check_balance_method;
   eth_method burn_method;
   eth_method issue_method;
};
```