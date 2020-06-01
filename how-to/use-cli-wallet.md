# Use CLI Wallet

In order to use the CLI Wallet, you must have an Echo full node running with an RPC port exposed. If you don't have a full node running yet, follow the installation tutorial.

{% page-ref page="../how-to/install-full-node.md" %}

 To run a full node that we can connect to, we need to open the RPC interface, this can be done by:

```bash
./echo_node --rpc-endpoint=127.0.0.1:6312 --testnet
```

This will open port `6312`.

## CLI Wallet

The CLI wallet is used to interact with the Echo blockchain and use to generate signatures.

### Running the CLI Wallet

All it takes for the CLI wallet to run is a trusted API server to connect to the blockchain. Businesses and individuals run these public API servers.

```bash
./echo_wallet -s wss://testnet.echo-dev.io/ws
```

In this example, we use the public Echo node API and connect via a secured websocket connection. But you can also use your local node IP and PORT like this:

```bash
./echo_wallet -s ws://127.0.0.1:6311/ws
```

{% hint style="warning" %}
If you get an `{"remote_chain_id":"$$REMOTE_CHAIN_ID$$","chain_id":"$$CHAIN_ID$$"}` error, when the wallet starts, it'd mean that the `genesis.json` file was changed. It can only happen on testnet or devnet networks.

You can fix it by adding add an argument `--chain-id=$$REMOTE_CHAIN_ID$$`, where `$$REMOTE_CHAIN_ID$$` is a chain ID that reported in the `remote_chain_id` message.
{% endhint %}

This will open the CLI wallet and will ask you to provide a passphrase for your local wallet.

Once a new wallet has been created \(default wallet file is `wallet.json`\), it will prompt with:

```bash
Please use the set_password method to initialize a new wallet before continuing
new >>>
```

A new wallet needs to be initialized before its first use, by setting a password using the `set_password` command:

IMPORTANT: Private data, such as a passphrase or private keys, aren't stored by the wallet.

```bash
new >>> set_password
Input private data:
TYPE_YOUR_SECRET_PASSWORD_HERE
locked >>>
```

Now the wallet can be unlocked by providing the passphrase:

```bash
locked >>> unlock
Input private data:
supersecretpassphrase
unlocked >>>
```

Once the wallet has been unlocked, you can import an existing account. If you do not have an account yet, follow the account creation and key importing tutorial.

{% page-ref page="./register-account.md" %}

If you do not import an account, the `wallet.json` file will not be created and you will have to `set_password` again next time you open the wallet. 

You can get a detailed list of all commands by calling the `help` command.

By pressing `TAB` you can get a list of autocomplete commands or complete current if there are no alternatives.

{% hint style="info" %}
Many calls have an obligatory `broadcast`-flag as the last argument. If this flag is `false`, the wallet will create and sign but **not** broadcast the transaction. This can be very useful for a cold storage setup or to verify transactions.
{% endhint %}

### Opening an RPC Port

The CLI wallet can open an RPC port, so that in be accessed by applications or scripts. This can be done via either:

* websocket RPC via the `-r` parameter.
* HTTP RPC via the `-H` parameter.

```bash
./echo_wallet -s ws://127.0.0.1:6311/ws -H 127.0.0.1:8092 -r 127.0.0.1:8093
```
