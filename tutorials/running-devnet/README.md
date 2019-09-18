# Running devnet
## Requirements
During this tutorials you will need an `Echo node` and `Echo wallet`.

## Getting started
Running private network is as simple as

```bash
./echo_node --devnet --start-echorand --rpc-endpoint 127.0.0.1:19999
```

This will create data directory at `~/.echo.devnet` with `config.ini` in it. This file contains various settings and account's private keys that are used during consensus.

## Transferring currency
Currency transfer is done with `transfer` command. You should have import "from" account (`import_key`) to the wallet to sign transaction with transfer.

You can get current account balances with `list_account_balances` command.

> `transfer <from> <to> <amount> <asset> true`

```
transfer nathan foobar 10 ECHO true

list_account_balances foobar
10 ECHO
```