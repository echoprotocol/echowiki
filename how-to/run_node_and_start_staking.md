# How to: Run Echo node in 5 min and begin staking

## Download binary

First, you have to download and unpack the archive with the Echo binary files. You will find it here [here]().

## Run Echo node

Next, set up a full node if you are going to participate in the consensus. 

```bash
./echo_node --rpc-endpoint="0.0.0.0:8090" --account-info="[\"1.2.514\", \"5KcP5uiAByA14Koo8o9eYgoPEyB6A53n57MmGMsKaMqi7wKQYiA\"]"
```

Where `--account-info` the first parameter is your account ID, and the second is the ED25519 key you received for your account.

Call `./echo_node --help` to see the complete list of parameters.

> If you don’t want to run a full node yourself but are going to participate in consensus through [delegating](#delegating-stake), you can connect your echo_wallet to the existing public nodes run by companies or individuals on this blockchain. 

## Run echo_wallet

## Run echo_wallet

Now, you need to start [echo_wallet](/how-to/use-cli-wallet.md#Use_CLI_Wallet), get connected to the node and create your own wallet.

> You need to register an account in the blockchain network and deposit ECHO funds to it. You can find all the registration info [here](/how-to/register-account.md#Register_account).

## Freeze balance

To take part in the consensus mechanism, you need to lock some ECHO in the system for a certain period. To see the length of this period in days and the increase coefficient applied, call  `get_global_properties` and find the field `frozen_balances_multipliers`in the object you get. The first digit is the number of days, the second is the increase coefficient applied when you freeze your funds for this number of days (multiplied by 100).

Object example:

```bash
"frozen_balances_multipliers": [
      [90, 13000],
      [180, 14000],
      [360, 15000]
]
```

In the example above, the funds locked for 360 days will be multiplied by 150%.

> The more ECHO tokens you freeze, the bigger are your chances to participate in consensus.

Now, you can call the method of funds freezing:

```bash
unlocked >>> freeze_balance your_acc 10 ECHO 180 true
```

If this operation was successful, you will see this transaction log in the console:

```bash
{
  "ref_block_num": 22958,
  "ref_block_prefix": 2180469415,
  "expiration": "2020-09-15T10:33:04",
  "operations": [[
      29,{
        "fee": {
          "amount": 0,
          "asset_id": "1.3.0"
        },
        "account": "1.2.26",
        "amount": {
          "amount": 1000000000,
          "asset_id": "1.3.0"
        },
        "duration": 180,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "95e69b06f79e08416504ab709a6491208ff6a88fa09c5c3223e57ef7e72088e9daa458af2cbb51ab00d78a9211fc3129fd9b98e4ec80e1cf8f2a1568a13e9b00"
  ],
  "signed_with_echorand_key": false
}
```

To see your frozen balances, use:

```bash
unlocked >>> list_frozen_balances nathan
[{
    "id": "1.9.0",
    "owner": "1.2.26",
    "balance": {
      "amount": 1000000000,
      "asset_id": "1.3.0"
    },
    "multiplier": 14000,
    "unfreeze_availability_time": "2020-09-11T08:46:40",
    "extensions": []
  }
]
```
## Delegating Stake

An account can delegate another account to send messages on its behalf. This second participation option is called delegating. By delegating your right to send messages to another account, authorised with a node, you can receive your share of the reward for the message sent on your behalf. 

To participate in the consensus mechanism through delegating, you still need to have [freeze balance](#freeze-balance) locked in your account.

See the delegate’s ID in your account object. The field is `options.delegating_account`.

```bash
locked >>> get_account nathan
{
  "id": "1.2.26",
  "registrar": "1.2.4",
  "name": "nathan",
  "active": {
    "weight_threshold": 1,
    "account_auths": [],
    "key_auths": [[
        "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
        1
      ]
    ]
  },
  "echorand_key": "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
  "active_delegate_share": 2000,
  "options": {
    "delegating_account": "1.2.5",
    "delegate_share": 2000,
    "extensions": []
  },
  "statistics": "2.5.26",
  "whitelisting_accounts": [],
  "blacklisting_accounts": [],
  "whitelisted_accounts": [],
  "blacklisted_accounts": [],
  "active_special_authority": [
    0,{}
  ],
  "top_n_control_flags": 0,
  "accumulated_reward": [],
  "extensions": []
}
```

By default, the account that registered your account in the system, becomes your delegate. 

In the example above, the delegate of the account `1.2.26` is the account `1.2.5`.

To change your delegate, use:

```bash
unlocked >>> update_account nathan {"delegating_account": "1.2.10", "delegate_share": "3000"} true null null
```

If this operation was successful, you will see this transaction log in the console:

```bash
{
  "ref_block_num": 66,
  "ref_block_prefix": 1728289044,
  "expiration": "2020-10-01T12:14:32",
  "operations": [[
      4,{
        "fee": {
          "amount": 201,
          "asset_id": "1.3.0"
        },
        "account": "1.2.26",
        "new_options": {
          "delegating_account": "1.2.10",
          "delegate_share": 3000,
          "extensions": []
        },
        "extensions": {}
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "dcc41abf82466f0790ec2addd5f60ea90b9e431de59be12f79e8ee0760b5825fa2a61c452b1e2e077f3da9949a9412ba824adab6a4ea72989246b9ad78431800"
  ],
  "signed_with_echorand_key": false
}
```
