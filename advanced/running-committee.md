# Running Committee Node

## Enabling EchoRand Consensus and Sidechain

By default, an Echo node doesn't generate any blocks and not participating in consensus or sidechain mechanisms, and only acts as a wallet.

To enable these features, you need to configure the sidechain connection and pass Echo and Ethereum and Bitcoin private keys.

To enable the sidechain, you should add the `sidechain` flag to `--plugin` option and specify a full node Bitcoin and Ethereum RPC URL for sidechain.

```bash
$ ./echo_node \
    --plugin=sidechain --eth-rpc-ip="127.0.0.1" --eth-rpc-port="8545"
    --btc-rpc-ip="127.0.0.1" --btc-rpc-port="18443" --btc-rpc-user="1" --btc-rpc-password="1"
```

Node configuration files and CLI flags share the same parameters, so the above flags can be added in both ways. For example, this is how you'd need to update your configuration file:

```text
plugin = sidechain
eth-rpc-ip = "127.0.0.1"
eth-rpc-port = "8545"
btc-rpc-ip = "127.0.0.1"
btc-rpc-port = "18443"
btc-rpc-user = "1"
btc-rpc-password = "1"
```
## Adding Private Keys

Block production requires one or more private keys to be able to generate signatures on blocks and EchoRand messages and additional private key for Ethereum or Bitcoin sidechains to sign its transactions.

There are two ways to add private keys:

* By adding keys in open format through configuration files or CLI flags.
* Using an encrypted keys file, generated in an Echo console.

Note: in the current testnet, the keys are only separated by containerization, but in mainnet keys will be only stored in an HSM.

### Adding Private Keys in an Open Format

Parameter `account-info` is used by the consensus to sign on blocks and various messages. It accepts a tuple of **account id** and **eddsa private key**.

Parameter `sidechain-eth-committeeman` is used by the sidechain to sign on Ethereum transactions. It accepts a tuple of **account id** and **Ethereum private key**.

Parameter `sidechain-btc-committeeman` is used by the sidechain to sign on Bitcoin transactions. It accepts a tuple of **account id** and **Bitcoin private key**.

You can specify multiple accounts and sidechain keys for different accounts.

However to enter this keys in terminal their quotes and brackets should be escaped like so:

> `--account-info \[\"account id\",\"eddsa private key\"\]` `--sidechain-eth-committeeman \[\"account id\",\"Ethereum private key\"\]` `--sidechain-btc-committeeman \[\"account id\",\"Bitcoin private key\"\]`

```bash
$ ./echo_node \
    --plugin=sidechain
    --eth-rpc-ip=\"127.0.0.1\" --eth-rpc-port=\"8545\"
    --btc-rpc-ip=\"127.0.0.1\" --btc-rpc-port=\"18443\" --btc-rpc-user=\"1\" --btc-rpc-password=\"1\"
    --account-info \[\"1.2.1234\",\"6L7UCPPSJrcFC6S8mTTQU4vZrhLsYPbwyyQ6cZENevbJ\"\] \
    --account-info \[\"1.2.1235\",\"B1VyzqPkrf8o1rFMwE1GuvF81LVivfoDjxKu2gUdgBqs\"\] \
    --sidechain-eth-committeeman \[\"1.2.1234\", \"327bdacfdb6e548a6e2d7d770be94e11fa7234e58216865d5063fecfd6322f43\"\]
    --sidechain-btc-committeeman \[\"1.2.1234\", \"cQim4vm4vzhknZzR6EVEiu9QKN6CzyAP53M48Jj6XAMYgucGe8o9\"\]
```

Alternatively, keys can be added to the config file, which can be found at `~/.echo/config.ini`:

```bash
plugin = sidechain
eth-rpc-ip = \"127.0.0.1\"
eth-rpc-port = \"8545\"
btc-rpc-ip = \"127.0.0.1\"
btc-rpc-port = \"18443\"
btc-rpc-user = \"1\"
btc-rpc-password = \"1\"
account-info \[\"1.2.1234\", \"6L7UCPPSJrcFC6S8mTTQU4vZrhLsYPbwyyQ6cZENevbJ\"\]
account-info \[\"1.2.1235\", \"B1VyzqPkrf8o1rFMwE1GuvF81LVivfoDjxKu2gUdgBqs\"\]
sidechain-eth-committeeman \[\"1.2.1234\", \"327bdacfdb6e548a6e2d7d770be94e11fa7234e58216865d5063fecfd6322f43\"\]
sidechain-btc-committeeman \[\"1.2.1234\", \"cQim4vm4vzhknZzR6EVEiu9QKN6CzyAP53M48Jj6XAMYgucGe8o9\"\]
```

### Adding Private Keys in Echo Console

Echo console lets you add multiple private keys to an encrypted file.

To enter this mode add the flag `--configure-keys` to Echo node.

On the first run, when keys file wasn't created yet, you would need to specify a password which will be used to encrypt future keys. This is done by calling `set_password` command and entering your secret passphrase. You can change your password using the same command.

To add a new key, you would need to call either `add_echorand_key` or `add_sidechains_keys` command.

To exit the console, use the `exit`. In the case that you don't want to save any changes, use the `Ctrl-C` instead.

You can type help in Echo Console to get more information.

