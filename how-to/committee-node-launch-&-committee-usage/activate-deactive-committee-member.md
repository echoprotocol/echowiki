# How to: Activate and deactivate committee member

## Adding an active committee member

The user, having an account in the network, has the right to register for the role of the committee member. To do this, use the wallet method [create_committee_member](/api-reference/echo-wallet-api/README.md#create_committee_member-owner_account-url-amount-eth_address-btc_public_key-broadcast) that uses [committee_member_create_operation](/api-reference/echo-operations/committee-member.md#committee_member_activate_operation).

```bash
unlocked >>> create_committee_member 1.2.26 nathan_committee 1000 E8fd4Db0C38d48493AD167A268683fAb7230a88A 02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e true
{
  "ref_block_num": 78,
  "ref_block_prefix": 3722586335,
  "expiration": "2020-09-27T16:32:51",
  "operations": [[
      19,{
        "fee": {
          "amount": 50000,
          "asset_id": "1.3.0"
        },
        "committee_member_account": "1.2.26",
        "url": "nathan_committee",
        "eth_address": "E8fd4Db0C38d48493AD167A268683fAb7230a88A",
        "btc_public_key": "02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e",
        "deposit": {
          "amount": "100000000000",
          "asset_id": "1.3.0"
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "3f6331a54fa7ecddc16178aa24922b9ff5ac4b5bfabdb971984a09a3f0824f1aea5b6bb7866dd4096617fec72542f78284fc9e3bcf519d1e3733dcc7417c690e"
  ],
  "signed_with_echorand_key": false
}
```

To get info about created committee member you can use the wallet method [get_committee_member](/api-reference/echo-wallet-api/README.md#get_committee_member-owner_account).

```bash
unlocked >>> get_committee_member 1.2.26
{
  "id": "1.4.5",
  "committee_member_account": "1.2.26",
  "url": "nathan_committee",
  "eth_address": "E8fd4Db0C38d48493AD167A268683fAb7230a88A",
  "btc_public_key": "02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e",
  "extensions": []
}
```

To register as committee member Ethereum address and Bitcoin public key are needed for sidechains. Also you need to have enough funds that will be frozen. The amount should be equal or greater than the value of `committee_frozen_balance_to_activate` from [chain_parameters](/api-reference/echo-objects/chain-parameters.md). More info about committee frozen balance you can get [here](freeze-unfreeze-committee-frozen-balance.md).

In case of increasing of deposit amount committee should replenish committee frozen balance to the required amount in time of 10 * `maintenance_interval` (parameter in [chain_parameters](/api-reference/echo-objects/chain-parameters.md)). If after this amount of time the balance has not been replenished committee member is excluded from the active committee. But if the balance is not replenished by 1/3 of the participants or more this period of time is extended by another day and so on until more than 2/3 of the participants have a required amount on the frozen balance. Recalculation occurs during maintenance.

Once a committee member has been created, any of the active committee can use the wallet method [create_activate_committee_member_proposal](/api-reference/echo-wallet-api/README.md#create_activate_committee_member_proposal-sender-committee_to_activate-expiration_time) that adding [committee_member_activate_operation](/api-reference/echo-operations/committee-member.md#committee_member_activate_operation) to proposal. 

```bash
unlocked >>> create_activate_committee_member_proposal 1.2.6 1.4.5 "2020-09-27T16:35:00"  
{
  "ref_block_num": 79,
  "ref_block_prefix": 596396598,
  "expiration": "2020-09-27T16:42:05",
  "operations": [[
      16,{
        "fee": {
          "amount": 2000,
          "asset_id": "1.3.0"
        },
        "fee_paying_account": "1.2.6",
        "expiration_time": "2020-09-27T16:35:00",
        "proposed_ops": [{
            "op": [
              22,{
                "fee": {
                  "amount": 0,
                  "asset_id": "1.3.0"
                },
                "committee_to_activate": "1.4.5",
                "extensions": []
              }
            ]
          }
        ],
        "review_period_seconds": 60,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "455d870c635518fbb90ccd0fc6eafe21ae0dc9302071300490e5b5e52d498f5f866f397f751d1ef4c7275356bb5fce2b0127cc531579e87132b384cc4b09470b"
  ],
  "signed_with_echorand_key": false
}
```

For more info about proposals see [Create and Processing Propose](/advanced/propose.md). It proposes to include the new candidate to the active committee. Should be approved by more than 2/3 of active committee members.
List of the active committee members you can get via method [get_global_properties](/api-reference/echo-wallet-api/README.md#get_dynamic_global_properties) and `active_committee_members` field is what you need.
New active committee member is also starting to participate in sidechains regulation as well.

## Exclusion of an active committee member

Active committee members can use the wallet method [create_deactivate_committee_member_proposal](/api-reference/echo-wallet-api/README.md#create_deactivate_committee_member_proposal-sender-committee_to_activate-expiration_time) that adding [committee_member_deactivate_operation](/api-reference/echo-operations/committee-member.md#committee_member_deactivate_operation) to proposal. The participant is excluded and becomes an inactive committee member if more than 2/3 members of activate committee added their approvals to proposal. Also deactivated committee member is removed from the sidechain regulation.

```bash
unlocked >>> create_deactivate_committee_member_proposal 1.2.6 1.4.5 "2020-09-27T16:40:00" 
{
  "ref_block_num": 80,
  "ref_block_prefix": 1017293334,
  "expiration": "2020-09-27T16:44:13",
  "operations": [[
      16,{
        "fee": {
          "amount": 2000,
          "asset_id": "1.3.0"
        },
        "fee_paying_account": "1.2.6",
        "expiration_time": "2020-09-27T16:40:00",
        "proposed_ops": [{
            "op": [
              23,{
                "fee": {
                  "amount": 0,
                  "asset_id": "1.3.0"
                },
                "committee_to_deactivate": "1.4.5",
                "extensions": []
              }
            ]
          }
        ],
        "review_period_seconds": 60,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "469b4e9d1b4dd009780a3ba58241efb121b798b126f08a07f71917515ba51b4b875ee76cb72483e8d24ab532753727ff769728bd9adf360acab52f6e34190203"
  ],
  "signed_with_echorand_key": false
}
```

Deactivated committee member will be able to withdraw frozen funds after the time in seconds specified in `committee_balance_unfreeze_duration_seconds` in [chain_parameters](/api-reference/echo-objects/chain-parameters.md) after deactivation.
