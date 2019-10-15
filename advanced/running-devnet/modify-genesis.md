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
- `initial_accounts` - list of initial accounts. Can be imported to the wallet with `import_key` command;
- `initial_assets` - list of additional assets;
- `initial_balances` - list of balances that can be redeemed by account with `import_balance` command;
- `initial_committee_candidates` - list of initial committee accounts.

## Add initial balances example
Open your genesis file and find `initial_balances` section that can look like this:
```
"initial_balances": [],
```

To add new init balance you need to know `public key` of the balance owner and the `asset amount`.
Using this information, you can add new entries to the list as follows:
```
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

After editing genesis file restart your network.

## Starting network with custom genesis
To start custom network with custom genesis you need specify `genesis.json` either by
- Using CLI argument `--genesis-json <path>`.
- Using config parameter `genesis-json = <path>`.
- Placing `genesis.json` file at your datadir.

There should be no other blockchain in datadir otherwise its genesis will be used.
