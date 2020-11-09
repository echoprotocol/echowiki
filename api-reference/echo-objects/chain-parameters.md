# Chain parameters

{% hint style="warning" %}
x86 is now in the development stage.
{% endhint %}

Default configuration values for chain parameters can be obtained using the method [get_config](../echo-node-api/database-api/globals-api.md#get_config).

```cpp
struct chain_parameters
{
   /** using a shared_ptr breaks the circular dependency created between operations and the fee schedule */
   std::shared_ptr<fee_schedule> current_fees; ///< current schedule of fees

   uint32_t                maintenance_interval                = ECHO_DEFAULT_MAINTENANCE_INTERVAL; ///< interval in sections between blockchain maintenance events
   uint8_t                 maintenance_duration_seconds        = ECHO_DEFAULT_MAINTENANCE_DURATION_SECONDS; ///< duration of maintenance(time to stop echorand)
   uint32_t                balance_unfreezing_time             = ECHO_DEFAULT_UNFREEZE_BALANCE_TIME; ///< number of intervals after which the requested frozen balance to be unfreezed
   uint32_t                committee_proposal_review_period    = ECHO_DEFAULT_COMMITTEE_PROPOSAL_REVIEW_PERIOD_SEC; ///< minimum time in seconds that a proposed transaction requiring committee authority may not be signed, prior to expiration
   uint32_t                maximum_transaction_size            = ECHO_DEFAULT_MAX_TRANSACTION_SIZE; ///< maximum allowable size in bytes for a transaction
   uint32_t                maximum_block_size                  = ECHO_DEFAULT_MAX_BLOCK_SIZE; ///< maximum allowable size in bytes for a block
   uint32_t                maximum_time_until_expiration       = ECHO_DEFAULT_MAX_TIME_UNTIL_EXPIRATION; ///< maximum lifetime in seconds for transactions to be valid, before expiring
   uint32_t                maximum_proposal_lifetime           = ECHO_DEFAULT_MAX_PROPOSAL_LIFETIME_SEC; ///< maximum lifetime in seconds for proposed transactions to be kept, before expiring
   uint8_t                 maximum_asset_whitelist_authorities = ECHO_DEFAULT_MAX_ASSET_WHITELIST_AUTHORITIES; ///< maximum number of accounts which an asset may list as authorities for its whitelist OR blacklist
   uint8_t                 maximum_asset_feed_publishers       = ECHO_DEFAULT_MAX_ASSET_FEED_PUBLISHERS; ///< the maximum number of feed publishers for a given asset
   uint16_t                maximum_authority_membership        = ECHO_DEFAULT_MAX_AUTHORITY_MEMBERSHIP; ///< largest number of keys/accounts an authority can have
   uint8_t                 max_authority_depth                 = ECHO_MAX_SIG_CHECK_DEPTH;

   uint64_t                committee_frozen_balance_to_activate        = ECHO_DEFAULT_COMMITTEE_FROZEN_BALANCE_TO_ACTIVATE;
   uint64_t                committee_maintenance_intervals_to_deposit  = ECHO_DEFAULT_COMMITTEE_MAINTENANCE_INTERVALS_TO_DEPOSIT;
   uint32_t                committee_balance_unfreeze_duration_seconds = ECHO_DEFAULT_COMMITTEE_BALANCE_UNFREEZE_DURATION_SECONDS;

   uint64_t                x86_64_maximum_contract_size        = ECHO_DEFAULT_MAX_X86_64_CONTRACT_SIZE;

   std::map<uint16_t, uint32_t> frozen_balances_multipliers    = {
      {90,  110 * ECHO_1_PERCENT},
      {180, 130 * ECHO_1_PERCENT},
      {360, 150 * ECHO_1_PERCENT},
   };

   rand::config      echorand_config;
   sidechain::config sidechain_config;
   sidechain::erc20_config erc20_config;
   sidechain::stake_config stake_sidechain_config;

   gas_price_t gas_price;

   std::set<asset_id_type> consensus_assets;

   std::set<asset_id_type> valid_fee_asset = {asset_id_type(1), asset_id_type(2)}; ///< assets other than ECHO that can be accepted as fee without fee pool 

   economy::config economy_config;

   extensions_type         extensions;
};

```

## Types

[fee_schedule](types.md#Fee-schedule)

[echorand_config](echorand-config.md#Configuration-parameters-for-EchoRand-algorithm-implementation)

[sidechain_config](sidechain-config.md#Configuration-parameters-for-Echo-Sidechain)

[erc20_config](sidechain-config.md#Configuration-parameters-for-Echo-ERC20-Sidechain)

[stake_sidechain-config](sidechain-config.md#Configuration-parameters-for-Echo-Stake-Sidechain)

[economy_config](economy-config.md#Configuration-parameters-for-block-rewards-distribution)

[gas_price_t](types.md#Gas-price-type)