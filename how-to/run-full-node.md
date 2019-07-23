# Running a Full Node

To to run a full node that we can connect to, we need to open the
RPC interface, this can be done by:

```bash
./echo_node --rpc-endpoint="0.0.0.0:8090"
```

This will open port `8090` and make it publicly available over the internet (unless you're running behind a router/firewall). If you only need to access the RPC locally, replace `0.0.0.0` by `localhost`.

Note, that at the first run, the node will need to synchronize the blockchain with the network first, which may take a few minutes.

To start participating in the EchoRand consensus, you should add the option `--account-info="[\"account_id\", \"echorand_private_key\"]"`. Where `account_id` is ID of your account and `echorand_private_key` is the ED215519 key that you have registered with.

```bash
./echo_node --rpc-endpoint="0.0.0.0:8090" --account-info="[\"1.2.423\", \"BST6vLKcm6pWq2m2iHRMXu88JkbUgQ7sNcDncYCrwKf7\"]"
```

The `--account-info` argument can be used multiple times to give the node access to numerous accounts.

{% hint style="info" %}
You can also specify a private key(s) in the [configuration file](advanced/config.md).
{% endhint %}

Starting from version `0.9.0`, private keys can be specified through the Echo console. This allows you to use private keys in a more secure manner since the keys are saved to a file in an
encrypted format and a password must be specified to decrypt and use them.

## CLI Wallet

The CLI wallet is used to interact with the Echo blockchain and use to generate signatures.

### Running the CLI Wallet

All it takes for the CLI wallet to run is a trusted API server to connect to the blockchain. Businesses and individuals run these public API servers.
In this example, we use the public Echo node API and connect via a secured websocket connection:

For example, using the `wss://testnet.echo-dev.io/ws` Echo node websocket interface URL:

```bash
./echo_wallet -s wss://testnet.echo-dev.io/ws
```

{% hint style="warning" %}
If you get an `{"remote_chain_id":"$$REMOTE_CHAIN_ID$$","chain_id":"$$CHAIN_ID$$"}` error, when the wallet starts, it'd mean that the `genesis.json` file was changed. It can only happen
on testnet or devnet networks.

You can fix it by adding add an argument `--chain-id=$$REMOTE_CHAIN_ID$$`,
where `$$REMOTE_CHAIN_ID$$` is a chain ID that reported in the `remote_chain_id` message.
{% endhint %}

This will open the CLI wallet and will ask you to provide a passphrase for your local wallet.

Once a new wallet has been created (default wallet file is `wallet.json`), it will prompt with:

```bash
Please use the set_password method to initialize a new wallet before continuing
new >>>
```

A new wallet needs to be initialized before its first use, by setting a password using the `set_password` command:

IMPORTANT: Private data, such as a passphrase or private keys, aren't stored by the wallet.

```bash
new >>> set_password
Input private data:
supersecretpassphrase
locked >>>
```

Now the wallet can be unlocked by providing the passphrase:

```bash
locked >>> unlock
Input private data:
supersecretpassphrase
unlocked >>>
```

<!-- After this point, you can issue [any command available to the
cli-wallet](/how-to/api/cli-wallet-api/) or construct your own
transaction manually. -->

You can get a detailed list of all commands by calling the `help` command.

By pressing `TAB` you can get a list of autocomplete commands or complete current if there are no alternatives.

{% hint style="info" %}
Many calls have an obligatory `broadcast`-flag as the last argument. If this flag is `false`,
the wallet will create and sign but **not** broadcast the transaction. This can be
very useful for a cold storage setup or to verify transactions.
{% endhint %}

### Opening an RPC Port

The CLI wallet can open an RPC port, so that in be accessed by applications or scripts. This can be done via either:

* websocket RPC via the ``-r`` parameter.
* HTTP RPC via the ``-H`` parameter.

```bash
./echo_wallet -s wss://testnet.echo-dev.io/ws -H 127.0.0.1:8092 -r 127.0.0.1:8093
```
