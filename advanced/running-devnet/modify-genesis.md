# Modify genesis
If you want to create private network with custom fee or echorand parameters, with different initial accounts or balances, then you need to to modify genesis.

## Create genesis file
As starting point you can create an example genesis or network genesis.
- `--example-genesis-json [path]` - creates example genesis at path or in current directory.
- `--create-genesis-json` - creates networks genesis at corresponding or selected datadir. By specifying network with `--testnet` or `--devnet` flags you can select mainnet, testnet or devnet to take genesis from.

## Parts of the genesis
- `initial_parameters`
    - `current_fees.parameters` - fees prices of operations;
    - `echorand_config` - echorand consensus parameters;
    - `sidechain_config` - sidechain parameters;
    - `erc20_config` - erc20 sidechain parameters;
    - `stake_sidechain_config` - stake sidechain parameters;
    - `economy_config` - rewards calculation parameters;
    - `spv_penalties_config` - penalties for missed spv transactions;
- `initial_accounts` - list of initial accounts. Can be imported to the wallet with `import_key` command;
- `initial_assets` - list of additional assets;
- `initial_balances` - list of balances that can be redeemed by account with `import_balance` command;
- `initial_vesting_balances` - list of vesting balances;
- `initial_committee_candidates` - list of initial committee accounts.
- `initial_sidechain_asset_config` - list of initial contracts for asset transferring to Ethereum;
- `btc_initial_stable_block` - stable BTC block (the height is a multiple of 2016) for sidechain;
- `eth_initial_stable_block` - stable ETH block for sidechain;

## Add initial spv penalties example

* `missed_gen_address_penalty` - penalty for missed generate ETH address SPV transaction.
* `missed_deposit_penalty` - penalty for missed deposit BTC/ETH SPV transaction.
* `missed_withdraw_penalty` - penalty for missed withdraw BTC/ETH SPV transaction.
* `missed_balance_update_penalty` - penalty for update ERC20 balance SPV transaction.
* `missed_erc20_deposit_penalty` - penalty for missed ERC20 deposit SPV transaction.
* `missed_erc20_withdraw_penalty` - penalty for missed ERC20 withdraw SPV transaction.
* `missed_erc20_transfer_penalty` - penalty for missed ERC20 transfer SPV transaction.
* `excess_withdraw_penalty` - penalty for excess withdraw BTC/ETH SPV transaction.
* `penalty_multiplier` - penalty multiplier coefficient.


```json
"spv_penalties_config": {
  "missed_gen_address_penalty": 10000000,
  "missed_deposit_penalty": 10000000,
  "missed_withdraw_penalty": 200000000,
  "missed_balance_update_penalty": 10000000,
  "missed_erc20_deposit_penalty": 10000000,
  "missed_erc20_withdraw_penalty": 10000000,
  "missed_erc20_transfer_penalty": 10000000,
  "excess_withdraw_penalty": 500000000,
  "penalty_multiplier": 10000
}
```

## Add initial account example

To add new init accounts you need to add account name in `name` field and know 2 public keys. `echorand_key` need to take part in echorand consensus and `active_key` used for signing transaction
Using this information, you can add new entries to the list as follows:

```json
"initial_accounts": [
    {
        "name": "init0",
        "active_key": "ECHO5PNcN4VanyKHaAEtRx1UfwgJGMVJbCmeiD6toKD1WGeU",
        "echorand_key": "ECHO5PNcN4VanyKHaAEtRx1UfwgJGMVJbCmeiD6toKD1WGeU"
    },{
        "name": "init1",
        "active_key": "ECHODP2d2c4VjsxVduMYRg4MNCCt5Cwph8H1y2nXZqbKVZRQ",
        "echorand_key": "ECHODP2d2c4VjsxVduMYRg4MNCCt5Cwph8H1y2nXZqbKVZRQ"
    }
],
```

## Add initial assets example

* `symbol` - ticker symbol for this asset, i.e. "USD".
* `issuer_name` - name of the account which issued this asset.
* `description` - data that describes the meaning/purpose of this asset.
* `precision` - maximum number of digits after the decimal point (must be <= 12).
* `max_supply` - The maximum supply of this asset which may exist at any given time. This can be as large as `ECHO_MAX_SHARE_SUPPLY`.
* `accumulated_fees` - fees accumulate to be paid out over time.
* `is_bitasset` - bitasset flag.
* `flags` - the currently active flags on this permission.
* `core_exchange_rate` - rate for convertation to core asset.

Using this information, you can add new entries to the list as follows:

```json
"initial_assets": [
    {
      "symbol": "EETH",
      "issuer_name": "committee-account",
      "description": "sidechained ethereum asset",
      "precision": 8,
      "max_supply": "10000000000000000",
      "accumulated_fees": 0,
      "is_bitasset": true,
      "collateral_records": [],
      "flags": 8,
      "core_exchange_rate": {
        "base": {
          "amount": 1,
          "asset_id": "1.3.1"
        },
        "quote": {
          "amount": 1,
          "asset_id": "1.3.0"
        }
      }
    }
],
```

## Add initial balances example

To add new init balance you need to know `public key` of the balance owner and the `asset amount`.
Using this information, you can add new entries to the list as follows:

```json
"initial_balances": [
    {
        "owner": "ECHO5NaRTkq4uBAVGrZkD3jcTEdUxhxxJLU7hvt3p1zJyytc",
        "asset_symbol": "ECHO",
        "amount": "1000000000000000"
    },
    {
        "owner": "ECHO5NaRTkq4uBAVGrZkD3jcTEdUxhxxJLU7hvt3p1zJyytc",
        "asset_symbol": "EETH",
        "amount": "1000"
    }
],
```

## Add initial vesting balances example

To add new init balance you need to know `public key` of the balance owner and the `asset amount`. `begin_timestamp` - this is the time at which funds begin vesting. `vesting_duration_seconds` - duration of the vesting period, in seconds. `begin_balance` - the total amount of asset to vest.
Using this information, you can add new entries to the list as follows:

```json
"initial_vesting_balances": [
    {
        "owner": "ECHO5NaRTkq4uBAVGrZkD3jcTEdUxhxxJLU7hvt3p1zJyytc",
        "asset_symbol": "ECHO",
        "amount": "10000",
        "begin_timestamp": "2019-08-05T00:00:00",
        "vesting_duration_seconds": 20000,
        "begin_balance": "20000"
    },
    {
        "owner": "ECHO5NaRTkq4uBAVGrZkD3jcTEdUxhxxJLU7hvt3p1zJyytc",
        "asset_symbol": "EETH",
        "amount": "1000",
        "begin_timestamp": "2019-08-05T00:00:00",
        "vesting_duration_seconds": 25000,
        "begin_balance": "200"
    }
],
```

## Add initial committee candidates example

To add new init committee member you need to add account name who ows committee in `owner_name` field. `eth_address` - Ethereum address which committee member owned. `btc_public_key` - public key of Bitcoin address which committee member owned.
Using this information, you can add new entries to the list as follows:

```json
"initial_committee_candidates": [
    {
        "owner_name": "my_own_acc1",
        "eth_address": "f372c3b578534Ac5C1Cf0Cca7049A279d1ca3e79",
        "btc_public_key": "02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512e"
    },
    {
        "owner_name": "my_own_acc2",
        "eth_address": "Fba802D86f8d9b080eD247e712751DDBF86086A9",
        "btc_public_key": "02c16e97132e72738c9c0163656348cd1be03521de17efeb07e496e742ac84512f"
    }
],
```

## Add initial committee candidates example

To add new asset sidechain contract you need fill this field:
* `code` - code of sidechain contract. We advice on to use the same contract code as for `ECHO` token. Find in genesis-devnet.json file.
* `address` - address of Ethereum ERC20 contract. All token balance should be at sidechain address.
* `name` - the name of ERC20 token.
* `symbol` - should be the same as asset and unique in Echo network.
* `decimals` - accuracy of token.
* `supported_asset` - asset which you want to bond with contract.

Using this information, you can add new entries to the list as follows:

```json
  "initial_sidechain_asset_config": [
    {
      "code" : "6080604052348...72657373",
      "address" : "bC384aBfDd339BCf2f9e68Ea3858C04563ef012C",
      "name" : "EchoToken",
      "symbol" : "ECHO",
      "decimals" : 8,
      "supported_asset" : "1.3.0"
    },
    {
      "code" : "6080604052348...72657373",
      "address" : "2A365517AB5f70b4079Cd2dC2C3Bc9d111AaE951",
      "name" : "EbtcToken",
      "symbol" : "EBTC",
      "decimals" : 8,
      "supported_asset" : "1.3.2"
    }
  ],
```
## Add stable BTC block example

You need to add BTC stable block for sidechain. Its height should be divisible by 2016 for proper retarget verification for SPV accepted blocks.

```json
"btc_initial_stable_block": {
  "hash":"00000000000000353138cee31622c4e9cb6f04f33a672ab3ab8d3d880d055514",
  "height":2064384,
  "version":536870912,
  "merkleroot":"72886b1a426b6bf3b594179fe1a2d4edf1d8854f4abf135960bcdf841d900141",
  "time":1628707368,
  "nonce":3819972105,
  "bits":"19382bdc",
  "previousblockhash":"000000000000000c555ee275a7c75daeea5fc8c9cc3589ce8ffc485b0e2f9c84"
}
```

## Add stable ETH block example
```json
"eth_initial_stable_block": {
  "baseFeePerGas":"0x8",
  "difficulty":"0x5178f75b",
  "extraData":"0xd883010a07846765746888676f312e31362e35856c696e7578",
  "gasLimit":"0x7a1200",
  "gasUsed":"0x5e877b",
  "hash":"0x99f20186425b682d2da7fc680f317a4a541747fd13ff26be03dec955264caca4",
  "logsBloom":"0x00120000000000020020000000000000000000020000800000800101000004000000000000420000000001205...",
  "mixHash":"0xcf40b200310bf2c69632063000e1fdaab6e52d519743af93296e14994c967679",
  "nonce":"0xfc67dd6c202e4933",
  "number":"0xa628f2",
  "parentHash":"0xc1cbbb5f0e679877f2d1f7ee95dcd930599bd7cc90abe89c0cd6ecc86bf369b8", 
  "receiptsRoot":"0x878b31b399d6635b6610f165b1a451dc84e005f14f0856eed5869fa1bbd14d02",
  "sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  "stateRoot":"0xe6c7df361b36d2a3470d135390fd62e0dd874b9162f8a41bcf0c3f18927036fb",
  "timestamp":"0x6122b67e",
  "transactionsRoot":"0xb47c45ebe6b82ab3ff167721c36ef84cfce7f951b5164d99682e6378e33b0b00"
}
```

After editing genesis file restart your network.

## Starting network with custom genesis
To start custom network with custom genesis you need specify `genesis.json` either by
- Using CLI argument `--genesis-json <path>`.
- Using config parameter `genesis-json = <path>`.
- Placing `genesis.json` file at your datadir.

There should be no other blockchain in datadir otherwise its genesis will be used.
