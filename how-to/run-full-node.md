# How to run and use Echo

## Run and use Echo node

In order to run a full node that we can connect to, we need to open the
RPC interface, this can be done by:

```
./bin/echo_node --rpc-endpoint="0.0.0.0:8090"
```

This will open port `8090` and make it available over the internet (unless you run behind a router/firewall).
If you want it to be open for your machine only, replace `0.0.0.0` by `localhost`.

Note, that the full node needs to synchronize the blockchain with the network first, which may take a few minutes.

To start participating in consensus you should add option `--account-info=[account_id, EDDSA_private_key]`. Where `account_id` is ID of your account and `EDDSA_private_key` is ed215519 key that you registered with.

```
./bin/echo_node --rpc-endpoint="0.0.0.0:8090" --account-info=["1.6.2", "DET67rm27uYRVMQdN88EkpHE6LVVgivM8d8AmbkpauBFDuy"]
```

See `-h` for more details

## Run and use Echo cli-wallet

The Cli-Wallet is used to interact with the blockchain. Everything that adds new data to the blockchain requires a signature from a private key.
These signed transactions can be produced by the cli-wallet.

### Executing the cli-wallet

All it takes for the cli-wallet to run is a trusted API server to interface with the blockchain. These public API servers are run by businesses and [individuals](#run-and-use-echo-node). In this example, we use the public API node of Echo and connect via secured websocket connection but you can to change the url to your private node:

Url which we will use in example:

```
wss://echo-dev.io/ws
```

```text
./bin/echo_wallet -s wss://echo-dev.io/ws
```

This will open the cli-wallet and unless you already have a local
wallet, will ask you to provide a passphrase for your local wallet.

Once a new wallet has been created (default wallet file is ``wallet.json``),
it will prompt with

```text
Please use the set_password method to initialize a new wallet before continuing
new >>> 
```

As said, a new wallet needs to be initialized before use. Password is set with `set_password` command:

> Private data, such as passphrase or private key, is not echoed by the wallet

```text
new >>> set_password 
Input private data:
supersecretpassphrase
locked >>>
```

Now the wallet can be `unlock`ed by providing the passphrase:

```text
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

> Many calls have a obligatory ``broadcast``-flag as last
          argument. If this flag is ``false``, the wallet will construct
          and sign, but **not** broadcast the transaction. This can be
          very useful for a cold storage setup or to verify
          transactions.

### Opening RPC port

The cli-wallet can open a RPC port so that you can interface your
application with it. You have the choices of

* websocket RPC via the ``-r`` parameter, and
* HTTP RPC via the ``-H`` parameter:

```text
./bin/echo_wallet -s wss://echo-dev.io/ws -H 127.0.0.1:8092 -r 127.0.0.1:8093
```