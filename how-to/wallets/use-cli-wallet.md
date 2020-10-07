# How to start using the Echo Wallet

## General guidelines

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

Use `./echo_wallet --help` to see all options for running the CLI wallet.

This will open the CLI wallet and will ask you to provide a passphrase for your local wallet.

Default wallet file is `wallet.json`. Use `-w` option for changing the name of file. Once a new wallet has been created, it will prompt with:

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

You can get a detailed list of all commands by calling the `help` command.

Also you may call `help` with method name to see detailed description of method:

```text
unlocked >>> help transfer

Transfer an amount from one account to another.

Parameters:
    from: the name or id of the account sending the funds (type: const
	string &)
    to: the name or id of the account receiving the funds (type: const
	string &)
    amount: the amount to send (in nominal units - to send half of a ECHO,
	specify 0.5) (type: const string &)
    asset_symbol: the symbol or id of the asset to send (type: const string
	&)
    broadcast: true to broadcast the transaction on the network (type:
	bool)

Returns:
    the signed transaction transferring funds

Example:
    transfer 1.2.0 1.2.1 10 ECHO true

```

For using this feature, echo_wallet should be compiled with Doxygen library.

By pressing `TAB` you can get a list of autocomplete commands or complete current if there are no alternatives.

{% hint style="info" %}
Many calls have an obligatory `broadcast`-flag as the last argument. If this flag is `false`, the wallet will create and sign but **not** broadcast the transaction. This can be very useful for a cold storage setup or to verify transactions. By default `broadcast` is `false`.
{% endhint %}

### Opening an RPC Port

The CLI wallet can open an RPC port, so that in be accessed by applications or scripts. This can be done via either:

* websocket RPC via the `-r` parameter.
* HTTP RPC via the `-H` parameter.

```bash
./echo_wallet -s ws://127.0.0.1:6311/ws -H 127.0.0.1:8092 -r 127.0.0.1:8093
```
