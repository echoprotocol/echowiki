# Chain parameters

```cpp
struct chain_parameters
{
    /** using a smart ref breaks the circular dependency created between operations and the fee schedule */
    smart_ref<fee_schedule> current_fees;                       ///< current schedule of fees
    uint32_t                maintenance_interval                = ECHO_DEFAULT_MAINTENANCE_INTERVAL; ///< interval in sections between blockchain maintenance events
    uint8_t                 maintenance_duration_seconds        = ECHO_DEFAULT_MAINTENANCE_DURATION_SECONDS; ///< duration of maintenance(time to stop echorand)
    uint32_t                committee_proposal_review_period    = ECHO_DEFAULT_COMMITTEE_PROPOSAL_REVIEW_PERIOD_SEC; ///< minimum time in seconds that a proposed transaction requiring committee authority may not be signed, prior to expiration
    uint32_t                maximum_transaction_size            = ECHO_DEFAULT_MAX_TRANSACTION_SIZE; ///< maximum allowable size in bytes for a transaction
    uint32_t                maximum_block_size                  = ECHO_DEFAULT_MAX_BLOCK_SIZE; ///< maximum allowable size in bytes for a block
    uint32_t                maximum_time_until_expiration       = ECHO_DEFAULT_MAX_TIME_UNTIL_EXPIRATION; ///< maximum lifetime in seconds for transactions to be valid, before expiring
    uint32_t                maximum_proposal_lifetime           = ECHO_DEFAULT_MAX_PROPOSAL_LIFETIME_SEC; ///< maximum lifetime in seconds for proposed transactions to be kept, before expiring
    uint8_t                 maximum_asset_whitelist_authorities = ECHO_DEFAULT_MAX_ASSET_WHITELIST_AUTHORITIES; ///< maximum number of accounts which an asset may list as authorities for its whitelist OR blacklist
    uint8_t                 maximum_asset_feed_publishers       = ECHO_DEFAULT_MAX_ASSET_FEED_PUBLISHERS; ///< the maximum number of feed publishers for a given asset
    uint16_t                maximum_authority_membership        = ECHO_DEFAULT_MAX_AUTHORITY_MEMBERSHIP; ///< largest number of keys/accounts an authority can have
    uint16_t                reserve_percent_of_fee              = ECHO_DEFAULT_BURN_PERCENT_OF_FEE; ///< the percentage of the network's allocation of a fee that is taken out of circulation
    uint16_t                network_percent_of_fee              = ECHO_DEFAULT_NETWORK_PERCENT_OF_FEE; ///< percent of transaction fees paid to network
    uint32_t                committee_pay_vesting_seconds       = ECHO_DEFAULT_COMMITTEE_PAY_VESTING_SECONDS;
    uint16_t                max_predicate_opcode                = ECHO_DEFAULT_MAX_ASSERT_OPCODE; ///< predicate_opcode must be less than this number
    uint8_t                 max_authority_depth                 = ECHO_MAX_SIG_CHECK_DEPTH;

    int64_t                 block_emission_amount               = 0;
    uint16_t                block_producer_reward_ratio         = 50 * ECHO_1_PERCENT;

    uint64_t                committee_frozen_balance_to_activate       = ECHO_DEFAULT_COMMITTEE_FROZEN_BALANCE_TO_ACTIVATE;
    uint64_t                committee_maintenance_intervals_to_deposit = ECHO_DEFAULT_COMMITTEE_MAINTENANCE_INTERVALS_TO_DEPOSIT;
    uint32_t                committee_freeze_duration_seconds          = ECHO_DEFAULT_COMMITTEE_FREEZE_DURATION_SECONDS;

    uint64_t                x86_64_maximum_contract_size        = 200'000;

    std::map<uint16_t, uint32_t> frozen_balances_multipliers    = {
        {90,  130 * ECHO_1_PERCENT},
        {180, 140 * ECHO_1_PERCENT},
        {360, 150 * ECHO_1_PERCENT},
    };

    echo::rand::config      echorand_config;
    echo::sidechain::config sidechain_config;
    echo::sidechain::erc20_config erc20_config;

    struct gas_price_t
    {
        uint64_t price = 1;
        uint64_t gas_amount = 1000;
    } gas_price;

    extensions_type         extensions;

    /** defined in fee_schedule.cpp */
    void validate()const;
};
```