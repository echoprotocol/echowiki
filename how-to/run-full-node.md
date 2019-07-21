# How to run and use Echo

## Run and use Echo node

In order to run a full node that we can connect to, we need to open the
RPC interface, this can be done by:

```bash
./echo_node --rpc-endpoint="0.0.0.0:8090"
```

This will open port `8090` and make it available over the internet (unless you run behind a router/firewall).
If you want it to be open for your machine only, replace `0.0.0.0` by `localhost`.

Note, that the full node needs to synchronize the blockchain with the network first, which may take a few minutes.

To start participating in consensus you should add option `--account-info="[\"account_id\", \"echorand_private_key\"]"`. Where `account_id` is ID of your account and `echorand_private_key` is ed215519 key that you registered with.

```bash
./echo_node --rpc-endpoint="0.0.0.0:8090" --account-info="[\"1.2.423\", \"BST6vLKcm6pWq2m2iHRMXu88JkbUgQ7sNcDncYCrwKf7\"]"
```

The `--account-info` argument can be repeated several times.

{% hint style="info" %}
You can also specify a private key(s) in the [configuration file](advanced/config.md).
{% endhint %}

Starting from version `0.9.0`, private keys can be specified through the interactive mode of the node. 
This allows you to use private keys in a more secure manner, since the keys are saved to a file in an 
encrypted format and you must use a password to access them.

## Run and use Echo cli-wallet

The Cli-Wallet is used to interact with the blockchain. Everything that adds new data to the blockchain requires a signature from a private key.
These signed transactions can be produced by the cli-wallet.

### Run the cli-wallet

All it takes for the cli-wallet to run is a trusted API server to interface with the blockchain. These public API servers are run by businesses and individuals. 
In this example, we use the public API node of Echo and connect via secured websocket connection but you can to change the url to your private node.

Url which we will use in example:

```bash
wss://testnet.echo-dev.io/ws
```

```bash
./echo_wallet -s wss://testnet.echo-dev.io/ws
```

{% hint style="warning" %}
If you get an error `{"remote_chain_id":"$$REMOTE_CHAIN_ID$$","chain_id":"$$CHAIN_ID$$"}` 
at the time of the wallet start it means that genesis.json was changed. It it can happen
on testnet or devnet. You can fix it add an argument `--chain-id=$$REMOTE_CHAIN_ID$$`,
where `$$REMOTE_CHAIN_ID$$` is chain id that wallet shows as `remote_chain_id` on the message.
{% endhint %}

This will open the cli-wallet and unless you already have a local
wallet, will ask you to provide a passphrase for your local wallet.

Once a new wallet has been created (default wallet file is `wallet.json`), it will prompt with

```bash
Please use the set_password method to initialize a new wallet before continuing
new >>>
```

As said, a new wallet needs to be initialized before use. Password is set with `set_password` command:

> Private data, such as passphrase or private key, is not echoed by the wallet

```bash
new >>> set_password 
Input private data:
supersecretpassphrase
locked >>>
```

Now the wallet can be `unlock`ed by providing the passphrase:

```bash
locked >>> unlock 
Input private data:
supersecretpassphrase
unlocked >>> 
```

<!-- After this point, you can issue [any command available to the
cli-wallet](/how-to/api/cli-wallet-api/) or construct your own
transaction manually. -->

You can get a detailed list of all commands by calling `help` command.

By pressing `TAB` you can get a list of autocomplete commands or complete current if there is no alternatives.

{% hint style="info" %}
Many calls have an obligatory `broadcast`-flag as last argument. If this flag is `false`, 
the wallet will construct and sign, but **not** broadcast the transaction. This can be
very useful for a cold storage setup or to verify transactions.
{% endhint %}

### Opening RPC port

The cli-wallet can open a RPC port so that you can interface your application with it. 

You have the choices of

* websocket RPC via the ``-r`` parameter, and
* HTTP RPC via the ``-H`` parameter:

```bash
./echo_wallet -s wss://testnet.echo-dev.io/ws -H 127.0.0.1:8092 -r 127.0.0.1:8093
```
