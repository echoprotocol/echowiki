# How to: Operate my own ECHO node

To begin with, you need to [build the project](../advanced/build.md).

Then, we can start `echo_node` and interact with this node using RPC requests over HTTP or WebSocket. For it, you can use [`echo_wallet`](use-cli-wallet.md) or a third-party program like `curl` or `wscat`.

## Start node

You can start a node with different parameters. The parameters are passed using the command-line or the configuration file.

### Command-line syntax

```bash
./echo_node --key1=value1 --key2 value2 -k v --key3=["value1", "value2"]
```

### Configure file syntax

```ini
# this is comment
key = value
```

> `key` is the argument without a dash 

### Arguments: description and examples

#### Print help message

```bash
> ./echo_node -h
```

#### Change data directory path
The data directory contains the configure file, databases, and more.

```bash
> ./echo_node -d /tmp/echo_dir
> ./echo_node --datadir /tmp/echo_dir
```

#### Activate the testnet options

```bash
> ./echo_node --testnet
```

#### Activate the Devnet options

```bash
> ./echo_node --devnet
```

#### Print version

```bash
> ./echo_node -v
> ./echo_node --version
```

#### Encrypt keys
Run interactive mode to encrypt keys and save them in keys file.

```bash
> ./echo_node --configure-keys
```

#### Config seeds only
Use the config seed only (do not use built-in and received seeds). 

```bash
> ./echo_node --config-seeds-only 
```

#### Create genesis json
Create a genesis.json at corresponding datadir. Depending on which options preset is selected (mainnet or testnet) it will output different Genesis State.

```bash
> ./echo_node --testnet --create-genesis-json --data-dir datadir
```

#### Create example genesis json
Path to create an example Genesis State at. If a well-formed JSON file exists at the path, it will be parsed and any missing fields in a Genesis State will be added, and any unknown fields will be removed. If no file or an invalid file is found, it will be replaced with an example Genesis State.

```bash
> ./echo_node --example-genesis-json /tmp/echo_dir
```

#### Replay blockchain
Rebuild object graph by replaying all blocks.

```bash
> ./echo_node --replay-blockchain
```

#### Resync blockchain
Delete all blocks and re-sync with network from scratch.

```bash
> ./echo_node --resync-blockchain
```

#### Force validate
Force validation of all transactions.

```bash
> ./echo_node --force-validate
```

#### Replace timestamp
Replace timestamp from genesis.json with current time plus this many seconds (experts only!).

```bash
> ./echo_node --genesis-timestamp 10
```

#### P2P endpoit
Endpoint for P2P node to listen on.

```bash
> ./echo_node --p2p-endpoint 127.0.0.1:13375
```

#### Seed node
P2P nodes to connect to on startup (may specify multiple times).

```bash
> ./echo_node --seed-node "127.0.0.1:13376" -s "127.0.0.1:13377"
```

#### Seed nodes
JSON array of P2P nodes to connect to to on startup.

```bash
> ./echo_node --seed-nodes "[127.0.0.1:13376, 127.0.0.1:13377]"
```

#### Block checkpoint
Pairs of [BLOCK_NUM,BLOCK_ID] that should be enforced as checkpoints.

```bash
> ./echo_node --checkpoint "[10, 0000004184e6200e609bca12f8f54a1cf55704cb]"
```

#### RPC endpoint
Endpoint for websocket RPC to listen on.

```bash
> ./echo_node --rpc-endpoint "127.0.0.1:8090"
```

#### RPC domains
Domains from which to accept cross origin requests.

```bash
> ./echo_node --rpccorsdomain example.com
```


#### Genesis JSON file
File to read Genesis State from.

```bash
> ./echo_node --genesis-json /tmp/echo_dir/genesis.json
```

#### API JSON file
JSON file specifying API permissions.

```bash
> ./echo_node --api-access /tmp/echo_dir/api.json
```

#### Plugins activation
Comma-separated list of plugins which will be activated in addition to default.

```bash
> ./echo_node --plugins="sidechain,registration,shapshot"
```

#### P2P compression
Compress communication channels for this P2P node.

```bash
> ./echo_node --p2p-compress
```

#### P2P encryption
Encrypt communication channels for this P2P node.

```bash
> ./echo_node --p2p-encrypt
```

#### Start echorand
Enable Echorand, even if the chain is stale.

```bash
> ./echo_node --start-echorand
```

#### Account info
Pairs of [AccountID, WIF private key] (may specify multiple times).

```bash
> ./echo_node --account-info ["1.2.6", "5JwnAdjJWufcv5c2xiEy1Ht8JUfND3o232JTbL2kze4TLhCJEcC"]
```

#### Sidechain committeeman
Sidechain: Pair of [account_id, eth_private_key] that should correspond to committee account (may be specified multiple times).

```bash
> ./echo_node --sidechain-eth-committeeman ["1.2.6", "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f"]
```


#### Activate the sidechain plug-in

```bash
> ./echo_node --sidechain
```


#### RPC address of Ethereum node for sidechain

```bash
> ./echo_node --eth-rpc-ip 127.0.0.1
```

#### RPC port of Ethereum node for sidechain

```bash
> ./echo_node --eth-rpc-port 183332
```

#### Disable Ethereum service

```bash
> ./echo_node --sidechain-eth-disable
```

#### Run btc sidechain for Bitcoin testnet
Run btc sidechain for Bitcoin testnet.

```bash
> ./echo_node --sidechain-btc-testnet
```

#### BTC sidechain committeeman
Sidechain: Tuple of [account_id, WIF BTC private key] (may specify multiple times).

```bash
> ./echo_node --sidechain-btc-committeeman ["1.2.6", "5HueCGU8rMjxEXxiPuD5BDk_SAMPLE_PRIVATE_KEY_DO_NOT_IMPORT_u4MkFqeZyd4dZ1jvhTVqvbTLvyTJ"]
```

#### RPC ip of BTC node
```bash
> ./echo_node --btc-rpc-ip 127.0.0.1
```

#### RPC port of BTC node

```bash
> ./echo_node --btc-rpc-port 183332
```

#### RPC user of BTC node

```bash
> ./echo_node --btc-rpc-user user
```

#### RPC password of BTC node

```bash
> ./echo_node --btc-rpc-user password
```

#### Disable BTC service

```bash
> ./echo_node --sidechain-btc-disable
```

#### Registrar account
ID of registrar account on this node (should be imported as account-info).

```bash
> ./echo_node --registrar-account "1.2.6"
```

#### Registration difficult
Complexity of POW task to register account.

```bash
> ./echo_node --registration-difficulty 10
```

#### Lifetime of registration tasks(in blocks)

```bash
> ./echo_node --ethrpc-registration-task-lifetime 20
```

#### Track account history
Account ID to track history for (may specify multiple times).

```bash
> ./echo_node --track-account "1.2.6"
```

#### Maximum number of ops per account in history
Maximum number of operations per account will be kept in memory.

```bash
> ./echo_node --max-ops-per-account 1000
```

#### Track contract history
Contract ID to track history for (may specify multiple times).

```bash
> ./echo_node --track-contract "1.2.6"
```

#### Maximum number of ops per contract in history
Maximum number of operations per contract will be kept in memory.

```bash
> ./echo_node --max-ops-per-contract 1000
```

#### Partial operation storing
Keep only those operations in memory that are related to history tracking.

```bash
> ./echo_node --partial-operations true
```

#### Endpoint for EthRPC
Endpoint for EthRPC to listen on.

```bash
> ./echo_node --ethrpc-endpoint 0.0.0.0:9091
```

#### Block number after which to do a snapshot

```bash
> ./echo_node --snapshot-at-block 10
```

#### Block time (ISO format) after which to do a snapshot

```bash
> ./echo_node --snapshot-at-time 2020-08-09T18:31:42
```

#### Pathname of JSON file where to store the snapshot

```bash
> ./echo_node --snapshot-to /tmp/echo/snap.json
```

## Connect to node

To perform operations, we need to connect to the node. Below we consider connecting via `curl`.

Example:

```bash
curl --data '{"jsonrpc": "2.0", "params": ["database", "get_account_by_name", ["nathan"]], "method": "call", "id": 1}' http://localhost:8090/rpc
```

Here, we request the Database API using the method `get_account_by_name` with the argument "nathan"

Response:
```json
{"id":1,"jsonrpc":"2.0","result":{"id":"1.2.26","registrar":"1.2.4","name":"nathan","active":{"weight_threshold":1,"account_auths":[],"key_auths":[["ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",1]]},"echorand_key":"ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu","active_delegate_share":2000,"options":{"delegating_account":"1.2.5","delegate_share":2000,"extensions":[]},"statistics":"2.5.26","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"active_special_authority":[0,{}],"top_n_control_flags":0,"accumulated_reward":[],"extensions":[]}}
```

In the API methods description, you can find the RPC request body. 

## Stop ECHO node

To stop the node, send it the SIGINT signal (use Ctrl + C shortcut).

