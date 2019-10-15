# Running devnet
## Requirements
During this tutorials you will need an `Echo node` and `Echo wallet`.

## Getting started
Running private network is as simple as

```bash
./echo_node --devnet --start-echorand --rpc-endpoint 127.0.0.1:19999
```

This will create data directory at `~/.echo.devnet` with `config.ini` in it. This file contains various settings and account's private keys that are used during consensus.

## Using Echo wallet
To start Echo wallet you need to know `node address and port`, its `chain id` and run command:
```bash
./echo_wallet \
    -s ws://127.0.0.1:19999 \
    --chain-id e5da051fd6fe4859f9b9cd100fac9ade49be619b9830db53d117b14a48b3931b
```

If remote node has different `chain id` then you will get a error with remote `chain id` which you can copy-paste into your command.
```
Remote server gave us an unexpected chain_id
    {"remote_chain_id":"64f6619b923a36a49d30692a36583066ee7e4bdc71a2ab16805e085eb76bfe0e",
     "chain_id":"e5da051fd6fe4859f9b9cd100fac9ade49be619b9830db53d117b14a48b3931b"}
```

Next step is to set password in your wallet with `set_password` command:
```
new >>> set_password
Input private data: sw0rdf1sh
```

Now every time you will open this wallet (with `wallet.json` file) you will need to `unlock` it to make any operations with your accounts. 
```
locked >>> unlock
Input private data: sw0rdf1sh
```

Now you can import account keys.

## Working with keys
You can get private keys of devnet accounts in your `config.ini`. Here listed accounts from `init0` to `init8` and `nathan` which is the only account with init balance in default devnet genesis.

Using this private keys you can import accounts in your wallet and do any paid operations.

To import key into wallet you need to run `import_key <account> <private key>` command:
```
unlocked >>> import_key nathan
Input private data: 5JjHQ1GqTbqVZLdTB3QRqcUWA6LezqA65iPJbq5craE6MRc4u9K
```

{% hint style="info" %}
Note that private key is a private data and entered in the next line after `import_key nathan`.
{% endhint %}

If account has initial balances defined in genesis, then you can import them with `import_balance` command:
```
unlocked >>> import_balance nathan true
Input private data: [5JjHQ1GqTbqVZLdTB3QRqcUWA6LezqA65iPJbq5craE6MRc4u9K]
```

## Custom genesis
This section is described on [Modify genesis](modify-genesis.md) page.