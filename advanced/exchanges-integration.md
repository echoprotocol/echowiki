# Exchanges integration

## Install node

First of all you need to install `echo_node`. This could be done by compiling whole project from source or download binaries matching your system. 
[How to install node](build.md)

## Launch the node

Since it is necessary to run multiple programs at the same time, Ubuntu recommends starting the program on screen or tmux.

Command to execute in the directory with node binary. It will connect to main network by default and start syncing.

```./echo_node --data-dir=datadir --rpc-endpoint=127.0.0.1:8090```

`--data-dir` set a working directory containing databases, configuration file, etc. `--rpc-endpoint` specifies JSON-RPC endpoint to listen on(accepting WebSocket and HTTP). You can use `./echo_node --help` to see all possible arguments to pass. We should pick out options for history plugin that could also be specified as process arguments and described in [config.ini](#config.ini) e.g. `--max-ops-per-account=100`

There are 2 configuration files there: `config.ini`, `log_config.ini`.

### Recommended modifications to config files

#### config.ini

```ini
# Account history: Account ID to track history for (may specify multiple times)
# track-account = 

# Account history: Maximum number of operations per account will be kept in memory
max-ops-per-account = 1000

# Contract history: Contract ID to track history for (may specify multiple times)
# track-contract = 

# Contract history: Maximum number of operations per contract will be kept in memory
max-ops-per-contract = 1000

# History: Keep only those operations in memory that are related to history tracking
partial-operations = true
```

You can specify what accounts or contracts history should be tracked with `track-account` or `track-contract` arguments e.g. `track-account = "1.2.8"`. The following two parameters will greatly reduce the memory required for the operation, the principle is not to save the historical data index which is not related to the exchange account. To make this options work correctly you should also specify `partial-operations = true` option.

`max-ops-per-account`, `max-ops-per-contract` parameters indicate how many history records are kept for each account or contract. The default value is 1000. For exchanges, if you have more deposit and withdrawal records, consider setting a larger value. Earlier data is deleted from memory and cannot be queried quickly (but still recorded on the chain).

`max-transaction-ids-to-store` parameter may to be specified to indicate how many transaction info records. No limit by default. Earlier data is deleted from memory and cannot be queried quickly (but still recorded on the chain).

> NOTE: after changing this arguments you should restart node with `--replay-blockchain` argument

#### log_config.ini

You can change level of logs of just disable some of them by editing `log_config.ini` file. We recommend to disable all but `logger.default` to reduce disk usage.  To disable specific logs set level in config to `off`. For example to disable p2p logs you should edit `log_config.ini` next way:

```ini
[logger.p2p]
level=off
appenders=p2p
```

Rotation interval is a interval of saving logs in to separate files. Every 60 minutes logs will be written in new file. Limit is interval for which logs are stored. In example logs are stored for 720 minutes(12 hours) after that the oldest logs files will be deleted. Default value is 24h.

```ini
rotation_interval = 60
rotation_limit = 720
```

## Launch wallet and connect it to the node

To launch wallet that will connect to your local node you need to specify `--server-rpc-endpoint` argument with rpc-endpoint address of the node. `--rpc-endpoint` specified to interact with wallet with JSON-RPC.

```./echo_wallet --mainnet --server-rpc-endpoint=ws://127.0.0.1:8090 --rpc-endpoint=127.0.0.1:8091```

Successful execution will show something like that:

```
Please use the set_password method to initialize a new wallet before continuing
new >>>
```

Use the `info` command to view the current node info(block height, last block time, etc.)
```
info
{
  "head_block_num": 19331,
  "head_block_id": "00004b836a67c7cf72bd9ab8109321e27e07934e",
  "head_block_age": "1 minute old",
  "next_maintenance_time": "10 hours in the future",
  "chain_id": "...",
  "active_committee_members": [[...]]
}
```

{% hint style="info" %}

* You can use `./echo_wallet --help` to see all arguments that could be specified
* The data communicated between the `echo_wallet` and the `echo_node` does not contain private data. Generally, no encryption is needed and no deliberate protection is required for the RPC port of the node (it is not necessary to add a layer of protection).
* When the `echo_wallet` is in the unlocked state, the funds in the wallet account can be transferred through the RPC port. Care must be taken to prevent unauthorized access.

{% endhint %}

[How to use cli wallet](/how-to/wallets/use-cli-wallet.md)

## Interacting with wallet with JSON-RPC 

You can interact with wallet with JSON-RPC over HTTP or WebSocket. 

WebSocket example using `wscat` tool:

```bash
wscat -c ws://127.0.0.1:8091/ws
connected (press CTRL+C to quit)
> {"method": "info", "params": [], "id": 1}
< {"id":1,"result":{"head_block_num":19331,"head_block_id":"00004b836a67c7cf72bd9ab8109321e27e07934e","head_block_age":"8 minutes old","next_maintenance_time":"10 hours in the future","chain_id":"35ba0a9b55d0eac31f5f5d90af36679cfeb742306167267c7250efbf32e6457a","active_committee_members":[["1.4.0","1.2.6"],["1.4.1","1.2.7"],["1.4.2","1.2.8"],["1.4.3","1.2.9"],["1.4.4","1.2.10"],["1.4.5","1.2.11"],["1.4.6","1.2.12"],["1.4.7","1.2.13"],["1.4.8","1.2.14"]]}}
```

HTTP example using `curl`:

```bash
» curl -X POST --data '{"method": "info", "params": [], "id": 1}' http://127.0.0.1:8091
{"id":1,"result":{"head_block_num":19331,"head_block_id":"00004b836a67c7cf72bd9ab8109321e27e07934e","head_block_age":"8 minutes old","next_maintenance_time":"10 hours in the future","chain_id":"35ba0a9b55d0eac31f5f5d90af36679cfeb742306167267c7250efbf32e6457a","active_committee_members":[["1.4.0","1.2.6"],["1.4.1","1.2.7"],["1.4.2","1.2.8"],["1.4.3","1.2.9"],["1.4.4","1.2.10"],["1.4.5","1.2.11"],["1.4.6","1.2.12"],["1.4.7","1.2.13"],["1.4.8","1.2.14"]]}}
```

## Create address for account

Create of new addresses is needed to identify deposits. Address of account is just an alias and all deposits in received by originating account. To create address for specific account you need to call `generate_account_address` method specifying name of account and *public* label. To do that you should enter command in wallet:

```
unlocked >>> generate_account_address nathan addresslabel true
{
    "ref_block_num": 15335,
    "ref_block_prefix": 614556941,
    "expiration": "2020-10-09T09:19:20",
    "operations": [
        [
            6,
            {
                "fee": {
                    "amount": 202,
                    "asset_id": "1.3.0"
                },
                "owner": "1.2.15",
                "label": "addresslabel",
                "extensions": []
            }
        ]
    ],
    "extensions": [],
    "signatures": [
        "946352e9c778b9de1d82ecb43005ee83a1ea63114cb4e2802edc97d8e7e84fc5040034423971403d270bed884c17cf3fcb68513b00348634b2ea180fe6e20003"
    ],
    "signed_with_echorand_key": false
}
```

You can also do this using `wscat`:

```bash
> {"method": "generate_account_address", "params": ["nathan", "addresslabel", true], "id": 4}
```

Or `curl`:

```bash
» curl -X POST --data '{"method": "generate_account_address", "params": ["nathan", "addresslabel", true], "id": 4}' http://localhost:8091
```

Result is generated signed transaction and equal for both:

```bash
< {"id":4,"result":{"ref_block_num":15335,"ref_block_prefix":614556941,"expiration":"2020-10-09T09:19:20","operations":[[6,{"fee":{"amount":202,"asset_id":"1.3.0"},"owner":"1.2.15","label":"addresslabel","extensions":[]}]],"extensions":[],"signatures":["946352e9c778b9de1d82ecb43005ee83a1ea63114cb4e2802edc97d8e7e84fc5040034423971403d270bed884c17cf3fcb68513b00348634b2ea180fe6e20003"],"signed_with_echorand_key":false}}
```

To verify address is created you need to call `get_account_address_by_label` method. It will return address if it will be registered and null if not. `curl` example: 

```bash 
» curl -X POST --data '{"method": "get_account_address_by_label", "params": ["1.2.15", "addresslabel"], "id": 5}' http://localhost:8091
{"id":5,"result":["a35d99f48ea42385f7057bc48a2dd79ca6d728f8"]}
```

## Track incoming transactions

### 1. Querying Deposit Account History

#### 1.1. Get history of specified address 

Use the `get_account_address_history` method to get transfers of specified address. 

```
get_account_address_history account 1.6.0 1.6.0 10

» curl -X POST --data '{"method": "get_account_address_history", "params": ["account ", "1.6.0", "1.6.0", 10], "id": 6}' http://localhost:8091
```
    
The four parameters are: account name or id, start id, stop id, limit number.

#### 1.2. Get all transfers to address operation for account

Use the `get_account_history_operations` method to get account history of specified operation.

```
get_account_history_operations account 1 1.6.0 1.6.0 10

» curl -X POST --data '{"method": "get_account_address_history", "params": ["account ", 1, "1.6.0", "1.6.0", 10], "id": 7}' http://localhost:8091
```

The four parameters are: account name or id, operation id(1 in our case), start id, stop id, limit number.

### 2. Obtaining the Current *Unable to Return Block* Number

Use the command get_dynamic_global_properties in `echo_wallet` to get the block number that cannot be rolled back:

```
get_dynamic_global_properties
{
  "id": "2.1.0",
  "head_block_number": 21955727,
  ...
  "last_irreversible_block_num": 21955709
}


» curl -X POST --data '{"method": "get_dynamic_global_properties", "params": [], "id": 8}' http://localhost:8091
```

Among them, `head_block_number` is the latest block number, and `last_irreversible_block_num` is the block number that cannot be rollback.

All transactions that included in block with number smaller or equal to current `last_irreversible_block_num` should be processed. You can store last processed block number and process transactions only from higher blocks. If result didn't reach previous stored block number then you need to chain one more request to get all needed data to process.

{% hint style="info" %}

* If number of block with operation is higher then `last_irreversible_block_num` there is a little chance that it will be reverted in fork case.
* Number of returned operations limited to 100.
* The result is an array, sorted in reverse chronological order, with the most recent record at the top.

{% endhint %}

## How to send funds from account

### 1. Check balance

Use the `list_account_balances` command to check whether the withdrawal account balance is sufficient (pay attention to the asset type and calculate the fee):

```
unlocked >>> list_account_balances withdrawal-account
```

> Note: Pay attention to asset type

### 2. Checking a validation of the Name of the Account

Use the `get_account_id` command to check whether the customer’s withdrawal account is valid:

```
>>> get_account_id test1
get_account_id test1
"1.2.15"
>>> get_account_id test12
get_account_id test12
10 assert_exception: Assert Exception
rec && rec->name == account_name_or_id:
    {}
    th_a  wallet.cpp:597 get_account


» curl -X POST --data '{"method": "get_account_id", "params": ["test1"], "id": 9}' http://localhost:8091
```

If you want to send some assets to address then you need to check that address is valid and registered. You can do this with help of `get_account_by_address` method

```
unlocked >>> get_account_by_address a35d99f48ea42385f7057bc48a2dd79ca6d728f8
"1.2.15"

» curl -X POST --data '{"method": "get_account_by_address", "params": ["a35d99f48ea42385f7057bc48a2dd79ca6d728f8"], "id": 10}' http://localhost:8091

```

### 3. Sending withdrawal

#### 3.1 Transfer to account

Use the `transfer` command to send a withdrawal transaction. Such as:

```
unlocked >>> transfer withdrawal-account to-account 100 ECHO true

» curl -X POST --data '{"method": "transfer", "params": ["withdrawal-account", "to-account", 100, "ECHO", true], "id": 11}' http://localhost:8091

```
The parameters are: source account name, destination account name, amount, currency, broadcast flag(only creates and not send transaction if it false)

The command will sign and broadcast the transaction and return detailed transaction content.

#### 3.2 Transfer to address

`transfer_to_address` command could be used to send a withdrawal transaction to address.

```
unlocked >>> transfer_to_address withdrawal-account to-account 100 ECHO true

» curl -X POST --data '{"method": "transfer_to_address", "params": ["withdrawal-account", "a35d99f48ea42385f7057bc48a2dd79ca6d728f8", 100, "ECHO", true], "id": 12}' http://localhost:8091
```

The parameters are: source account name, destination address, amount, currency, broadcast flag(only creates and not send transaction if it false)

The command will sign and broadcast the transaction and return detailed transaction content. This content consists of JSON Array: first item is JSON Object `signed_transaction` and second is a string view of `transaction_id_type`(this is hash of the transaction).

> Note: If the currency is ECHO, the number of decimal places is up to 8 digits. If it is other assets, you can view the decimal places of the asset with the precision field with the `get_asset` command.

It is recommended to record relevant data for future reference, such as transaction id, detailed transaction content in json format, etc.

### 4. Withdrawal Results Check

Use the `get_relative_account_history` command to obtain withdrawal history of withdrawal-account.

```
unlocked >>> get_relative_account_history withdrawal-account 1 100 100

» curl -X POST --data '{"method": "get_relative_account_history", "params": ["withdrawal-account", 1, 100, 100], "id": 6}' http://localhost:8091
```

The four parameters are: account name, minimum number, maximum return number, and maximum number. Numbering starts with 1.

> Note: When the maximum number of cli_wallets returned in a certain version exceeds 100, resulting in inaccurate results. Please avoid using the limit to exceed 100.

The result is an array, sorted in reverse chronological order, with the most recent record at the top.

If new records are found and the transaction’s block number is earlier than `last_irreversible_block_num`, indicating that the transaction has entered the block and cannot be rolled back;

> Note: Use the `get_block` command to query details based on the `block_num` field of the record:

```
unlocked >>> get_block 12345

» curl -X POST --data '{"method": "get_block", "params": [12345], "id": 6}' http://localhost:8091
```

In the returned result, the transaction_ids field data should contain the previous transaction id.

It is recommended to record the id (1.11.x), block_num, and trx_in_block in the above result of `get_relative_account_history` for future reference.

### 5. About Resend Failure

In some cases, after the transaction may be sent, it is not packaged into the block in time.
When using cli_wallet to sign a broadcast transaction, this field value defaults to the local system time plus 2 minutes.

If, after the network time reaches the timeout, the transaction is still not packed into the block, the transaction is discarded by all network nodes and is no longer likely to be packed.

If you got block from `get_block` method and field `invalid_trx_ids` contains id of your transaction that means that your transaction failed, so you need to resend it using [3. Sending withdrawal](#3.\ Sending\ withdrawal).

Therefore, if a transaction broadcast appears but does not appear in the account history, first check if the local system time logs.
