# Running Committee Node

## Enabling Echorand consensus and sidechain

By default Echo node doesn't generate any blocks and not participating in consensus or sidechain mechanisms.

To enable this features you need to configure sidechain connection and pass Echo and Ethereum private keys.

To enable sidechain you should add `sidechain-enabled` flag and specify Ethereum websocket RPC URL for sidechain.

```
$ ./echo_node \
    --sidechain-enabled --sidechain-eth-node-url="ws://1.2.3.4:8545"
```

In Echo node configuration files and CLI flags share same parameters, so flags and Ethereum URL can be added in both ways. In config file this setup will look like this:

```
sidechain-enabled = true
sidechain-eth-node-url = "ws://1.2.3.4:8545"
```

## Adding private keys

Block production requires one or more private keys to generate signatures of block and messages of echorand consensus protocol and additional private key for Ethereum sidechain to sign its transactions.

There are two ways to add private keys:
- by adding keys in open format through configuration files or CLI flags;
- with encrypted keys file, generated in special interactive mode of the node.

### Adding private keys in open format

Parameter `account-info` is used by consensus to sign block and various messages. It accepts a tuple of **account id** and **eddsa private key**.

Parameter `sidechain-committeeman` is used by sidechain to sign Ethereum transactions. It accepts a tuple of **account id** and **Ethereum private key**.

You can specify multiple account and sidechain keys for different accounts.

> However to enter this keys in terminal their quotes and brackets should be escaped like this
>
> `--account-info \[\"account id\",\"eddsa private key\"\]`
> `--sidechain-committeeman \[\"account id\",\"Ethereum private key\"\]`

```text
$ ./echo_node \
    --sidechain-enabled --sidechain-eth-node-url="ws://1.2.3.4:8545" \
    --account-info \[\"1.2.1234\",\"6L7UCPPSJrcFC6S8mTTQU4vZrhLsYPbwyyQ6cZENevbJ\"\] \
    --account-info \[\"1.2.1235\",\"B1VyzqPkrf8o1rFMwE1GuvF81LVivfoDjxKu2gUdgBqs\"\] \
    --sidechain-committeeman \[\"1.2.1234\", \"327bdacfdb6e548a6e2d7d770be94e11fa7234e58216865d5063fecfd6322f43\"\]
```

Alternatively keys can be added in config file in `~/.echo/config.ini`.

```
account-info = ["1.2.1234", "6L7UCPPSJrcFC6S8mTTQU4vZrhLsYPbwyyQ6cZENevbJ"]
account-info = ["1.2.1235", "B1VyzqPkrf8o1rFMwE1GuvF81LVivfoDjxKu2gUdgBqs"]
sidechain-committeeman = ["1.2.1234", "327bdacfdb6e548a6e2d7d770be94e11fa7234e58216865d5063fecfd6322f43"]
```

### Adding private keys in interactive mode

Echo node's interactive mode lets you add multiple private keys to encrypted file.

To enter this mode add flag `--configure-keys` to Echo node.

On first enter, when keys file is not created yet, you need to specify password which will encrypt future keys. This is done by calling `set_password` command and then entering your secret pass phrase. In future you can change password using the same command.

When node can locate keys file you will be asked for password to decrypt them. After this you can manage existing keys and add new ones.

To add new key you need to call either `add_echo_key` or `add_ethereum_key` command and then input the key itself.

In the end to exit this interactive mode use `exit` command but if you don't want to save changes use `cancel` instead.

---

If private keys were added successfully node will output message like this:

```text
Account 1.2.1234 ED Public Key: ECHO5PNcN4VanyKHaAEtRx1UfwgJGMVJbCmeiD6toKD1WGeU
Account 1.2.1235 ED Public Key: ECHODP2d2c4VjsxVduMYRg4MNCCt5Cwph8H1y2nXZqbKVZRQ
```
