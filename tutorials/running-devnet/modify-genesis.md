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

## Starting network with custom genesis

To start custom network with custom genesis you need specify `genesis.json` by
- Using CLI argument `--genesis-json <path>`.
- Placing `genesis.json` file at your datadir.

There should be no other blockchain in datadir otherwise its genesis will be used.
