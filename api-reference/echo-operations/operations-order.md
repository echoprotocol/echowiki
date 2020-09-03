# Operations order

| Operation | id |
| :--- | :--- |
|[transfer\_operation](asset-transfer.md#transfer_operation)|0|
|[transfer\_to\_address\_operation](asset-transfer.md#transfer_to_address_operation)|1|
|[override\_transfer\_operation](asset-transfer.md#override_transfer_operation)|2|
|[account\_create\_operation](account-management.md#account_create_operation)|3|
|[account\_update\_operation](account-management.md#account_update_operation)|4|
|[account\_whitelist\_operation](account-management.md#account_whitelist_operation)|5|
|[account\_address\_create\_operation](account-management.md#account_address_create_operation)|6|
|[asset\_create\_operation](asset-management.md#asset_create_operation)|7|
|[asset\_update\_operation](asset-management.md#asset_update_operation)|8|
|[asset\_update\_bitasset\_operation](asset-management.md#asset_update_bitasset_operation)|9|
|[asset\_update\_feed\_producers\_operation](asset-management.md#asset_update_feed_producers_operation)|10|
|[asset\_issue\_operation](asset-management.md#asset_issue_operation)|11|
|[asset\_reserve\_operation](asset-management.md#asset_reserve_operation)|12|
|[asset\_fund\_fee\_pool\_operation](asset-management.md#asset_fund_fee_pool_operation)|13|
|[asset\_publish\_feed\_operation](asset-management.md#asset_publish_feed_operation)|14|
|[asset\_claim\_fees\_operation](asset-management.md#asset_claim_fees_operation)|15|
|[proposal\_create\_operation](proposals.md#proposal_create_operation)|16|
|[proposal\_update\_operation](proposals.md#proposal_update_operation) |17|
|[proposal\_delete\_operation](proposals.md#proposal_delete_operation)|18|
|[committee\_member\_create\_operation](committee-member.md#committee_member_create_operation)|19|
|[committee\_member\_update\_operation](committee-member.md#committee_member_update_operation)|20|
|[committee\_member\_update\_global\_parameters\_operation](committee-member.md#committee_member_update_global_parameters_operation)|21|
|[committee\_member\_activate\_operation](committee-member.md#committee_member_activate_operation)|22|
|[committee\_member\_deactivate\_operation](committee-member.md#committee_member_deactivate_operation)|23|
|[committee\_frozen\_balance\_deposit\_operation](committee-member.md#committee_frozen_balance_deposit_operation)|24|
|[committee\_frozen\_balance\_withdraw\_operation](committee-member.md#committee_frozen_balance_withdraw_operation)|25|
|[vesting\_balance\_create\_operation](vesting-balances.md#vesting_balance_create_operation)|26|
|[vesting\_balance\_withdraw\_operation](vesting-balances.md#vesting_balance_withdraw_operation)|27|
|[balance\_claim\_operation](balance-object.md#balance_claim_operation)|28|
|[balance\_freeze\_operation](balance-object.md#balance_freeze_operation)|29|
|[balance\_unfreeze\_operation](balance-object.md#balance_unfreeze_operation) // VIRTUAL|30|
|[request\_unfreeze\_balance\_operation](balance-object.md#request_balance_unfreeze_operation) // |31|
|[contract\_create\_operation](contracts.md#contract_create_operation)|21|
|[contract\_call\_operation](contracts.md#contract_call_operation)|33|
|[contract\_internal\_create\_operation](contracts.md#contract_internal_create_operation) // VIRTUAL|34|
|[contract\_internal\_call\_operation](contracts.md#contract_internal_call_operation) // VIRTUAL|35|
|[contract\_selfdestruct\_operation](contracts.md#contract_selfdestruct_operation) // VIRTUAL|36|
|[contract\_update\_operation](contracts.md#contract_update_operation)|37|
|[contract\_fund\_pool\_operation](contracts.md#contract_fund_pool_operation)|38|
|[contract\_whitelist\_operation](contracts.md#contract_whitelist_operation)|39|
|[sidechain\_eth\_create\_address\_operation](sidechain.md#sidechain_eth_create_address_operation)|30|
|[sidechain\_eth\_approve\_address\_operation](sidechain.md#sidechain_eth_approve_address_operation)|41|
|[sidechain\_eth\_deposit\_operation](sidechain.md#sidechain_eth_deposit_operation)|42|
|[sidechain\_eth\_send\_deposit\_operation](sidechain.md#sidechain_eth_send_deposit_operation)|43|
|[sidechain\_eth\_withdraw\_operation](sidechain.md#sidechain_eth_withdraw_operation)|44|
|[sidechain\_eth\_send\_withdraw\_operation](sidechain.md#sidechain_eth_send_withdraw_operation)|45|
|[sidechain\_eth\_approve\_withdraw\_operation](sidechain.md#sidechain_eth_approve_withdraw_operation)|46|
|[sidechain\_eth\_update\_contract\_address\_operation](sidechain.md#sidechain_eth_update_contract_address_operation)|47|
|[sidechain\_issue\_operation](sidechain.md#sidechain_issue_operation) // VIRTUAL|48|
|[sidechain\_burn\_operation](sidechain.md#sidechain_burn_operation) // VIRTUAL|49|
|[sidechain\_erc20\_register\_token\_operation](sidechain.md#sidechain_erc20_register_token_operation)|50|
|[sidechain\_erc20\_deposit\_token\_operation](sidechain.md#sidechain_erc20_deposit_token_operation)|51|
|[sidechain\_erc20\_send\_deposit\_token\_operation](sidechain.md#sidechain_erc20_send_deposit_operation)|52|
|[sidechain\_erc20\_withdraw\_token\_operation](sidechain.md#sidechain_erc20_withdraw_token_operation)|53|
|[sidechain\_erc20\_send\_withdraw\_token\_operation](sidechain.md#sidechain_erc20_send_withdraw_operation)|54|
|[sidechain\_erc20\_approve\_token\_withdraw\_operation](sidechain.md#sidechain_erc20_approve_token_withdraw_operation)|55|
|[sidechain\_erc20\_issue\_operation](sidechain.md#sidechain_erc20_issue_operation) // VIRTUAL|56|
|[sidechain\_erc20\_burn\_operation](sidechain.md#sidechain_erc20_burn_operation) // VIRTUAL|57|
|[sidechain\_btc\_create\_address\_operation](sidechain.md#sidechain_btc_create_address_operation)|58|
|[sidechain\_btc\_create\_intermediate\_deposit\_operation](sidechain.md#sidechain_btc_create_intermediate_deposit_operation)|59|
|[sidechain\_btc\_intermediate\_deposit\_operation](sidechain.md#sidechain_btc_intermediate_deposit_operation)|60|
|[sidechain\_btc\_deposit\_operation](sidechain.md#sidechain_btc_deposit_operation)|61|
|[sidechain\_btc\_withdraw\_operation](sidechain.md#sidechain_btc_withdraw_operation)|62|
|[sidechain\_btc\_aggregate\_operation](sidechain.md#sidechain_btc_aggregate_operation)|63|
|[sidechain\_btc\_approve\_aggregate\_operation](sidechain.md#sidechain_btc_approve_aggregate_operation)|64|
|[block\_reward\_operation](block-reward.md#block_reward_operation) // VIRTUAL|65|
|[evm\_address\_register\_operation](account-management.md#evm_address_register_operation)|66|
|[did\_create\_operation](did.md#didcreateoperation)|67|
|[did\_update\_operation](did.md#didupdateoperation)|68|
|[did\_delete\_operation](did.md#diddeleteoperation)|69|
