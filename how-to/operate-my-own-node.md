# How to: Operate my own ECHO node

Для начала необходимо [собрать проект](../advanced/build.md).

Далее мы можем запускать `echo_node` и взаимодействовать с нодой при помощи RPC запросов через HTTP.
Для этого можно использовать [`echo_wallet`](use-cli-wallet.md) или же какую-то стороннюю программу (например, `curl`).

## Start node

Запуск ноды можно осуществлять с разными параметрами.
Параметры передаются как через аргументы командной строки, так и через конфигурационный файл.

### Синтаксис командной строки

```bash
./echo_node --key1=value1 --key2 value2 -k v --key3=["value1", "value2"]
```

### Синтаксис конфигурационного файла

```ini
# this is comment
key = value
```

> `key` - это аргумент командной строки без префиксного тире

### Описание аргументов и примеры

#### 1. Print help message

```bash
> ./echo_node -h
```

#### 2. Указагие пути к data dir
Data directory содержит конфигурационный файл, базы данных и т.д.

```bash
> ./echo_node -d /tmp/echo_dir
> ./echo_node --datadir /tmp/echo_dir
```

#### 3. Включить плагин sidechain

```bash
> ./echo_node --sidechain
```

#### 4. Включить опции тестнета

```bash
> ./echo_node --testnet
```

#### 5. Включить опции девнета

```bash
> ./echo_node --devnet
```

#### 6. Включить опции девнета

```bash
> ./echo_node --devnet
```

#### 7. Print version

```bash
> ./echo_node -v
> ./echo_node --version
```

#### 8. Encrypt keys
Run interactive mode to encrypt keys and save them in keys file.

```bash
> ./echo_node --configure-keys
```

#### 9. Config seeds only
Использовать seeds только из конфига (не использовать встроенные seeds).

```bash
> ./echo_node --configure-keys
```

#### 10. Create genesis json
Create a genesis.json at corresponding datadir. Depending on which options preset is selected (mainnet or testnet) it will output different Genesis State.

```bash
> ./echo_node --create-genesis-json
```

#### 11. Create example genesis json
Path to create an example Genesis State at. If a well-formed JSON file exists at the path, it will be parsed and any missing fields in a Genesis State will be added, and any unknown fields will be removed. If no file or an invalid file is found, it will be replaced with an example Genesis State.

```bash
> ./echo_node --example-genesis-json /tmp/echo_dir
```

#### 12. Replay blockchain
Rebuild object graph by replaying all blocks.

```bash
> ./echo_node --replay-blockchain
```

#### 14. Resync blockchain
Delete all blocks and re-sync with network from scratch.

```bash
> ./echo_node --replay-blockchain
```

#### 15. Force validate
Force validation of all transactions.

```bash
> ./echo_node --force-validate
```

#### 16. Replace timestamp
Replace timestamp from genesis.json with current time plus this many seconds (experts only!).

```bash
> ./echo_node --genesis-timestamp 10
```

#### 17. P2P endpoit
Endpoint for P2P node to listen on.

```bash
> ./echo_node --p2p-endpoint 127.0.0.1:13375
```

#### 17. Seed node
P2P nodes to connect to on startup (may specify multiple times).

```bash
> ./echo_node --seed-node "127.0.0.1:13376" -s "127.0.0.1:13377"
```

#### 18. Seed nodes
JSON array of P2P nodes to connect to to on startup.

```bash
> ./echo_node --seed-nodes "[127.0.0.1:13376, 127.0.0.1:13377]"
```

#### 19. Block checkpoint
Pairs of [BLOCK_NUM,BLOCK_ID] that should be enforced as checkpoints.

```bash
> ./echo_node --checkpoint "[10, 0000004184e6200e609bca12f8f54a1cf55704cb]"
```

#### 20. RPC endpoint
Endpoint for websocket RPC to listen on.

```bash
> ./echo_node --rpc-endpoint "127.0.0.1:8090"
```

#### 21. RPC domains
Domains from which to accept cross origin requests.

```bash
> ./echo_node --rpccorsdomain example.com
```

#### 22. RPC TLS endpoint
Endpoint for TLS websocket RPC to listen on.

```bash
> ./echo_node --rpc-tls-endpoint "127.0.0.1:8089"
```

#### 23. TLS certificate
The TLS certificate file for this server.

```bash
> ./echo_node --server-pem /tmp/echo_dir/server.pem
```

#### 24. TLS certificate password
Password for this certificate.

```bash
> ./echo_node --server-pem-password /tmp/echo_dir/server.pem
```

#### 25. Genesis JSON file
File to read Genesis State from.

```bash
> ./echo_node --genesis-json /tmp/echo_dir/genesis.json
```

#### 26. API JSON file
JSON file specifying API permissions.

```bash
> ./echo_node --api-access /tmp/echo_dir/api.json
```

#### 27. Plugins activation
Comma-separated list of plugins which will be activated in addition to default.

```bash
> ./echo_node --plugins="sidechain,registration,shapshot"
```

#### 28. P2P compression
Compress communication channels for this P2P node.

```bash
> ./echo_node --p2p-compress
```

#### 28. P2P encryption
Encrypt communication channels for this P2P node.

```bash
> ./echo_node --p2p-encrypt
```

#### 29. Start echorand
Enable Echorand, even if the chain is stale.

```bash
> ./echo_node --start-echorand
```

#### 30. Start echorand
Pairs of [AccountID, WIF private key] (may specify multiple times).

```bash
> ./echo_node --account-info ["1.2.6", "5JwnAdjJWufcv5c2xiEy1Ht8JUfND3o232JTbL2kze4TLhCJEcC"]
```

#### 31. Sidechain committeeman
Sidechain: Pair of [account_id, eth_private_key] that should correspond to committee account (may be specified multiple times).

```bash
> ./echo_node --sidechain-eth-committeeman ["1.2.6", "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f"]
```

#### 32. RPC address of Ethereum node

```bash
> ./echo_node --eth-rpc-ip 127.0.0.1
```

#### 33. RPC port of Ethereum node

```bash
> ./echo_node --eth-rpc-port 183332
```

#### 34. Disable Ethereum service

```bash
> ./echo_node --sidechain-eth-disable
```

#### 35. Run btc sidechain for Bitcoin testnet
Run btc sidechain for Bitcoin testnet.

```bash
> ./echo_node --sidechain-btc-testnet
```

#### 36. BTC sidechain committeeman
Sidechain: Tuple of [account_id, WIF BTC private key] (may specify multiple times).

```bash
> ./echo_node --sidechain-btc-committeeman ["1.2.6", "5HueCGU8rMjxEXxiPuD5BDk_SAMPLE_PRIVATE_KEY_DO_NOT_IMPORT_u4MkFqeZyd4dZ1jvhTVqvbTLvyTJ"]
```

#### 37. BTC sidechain committeeman
```bash
> ./echo_node --btc-rpc-ip 127.0.0.1
```

#### 33. RPC port of BTC node

```bash
> ./echo_node --btc-rpc-port 183332
```

#### 33. RPC user of BTC node

```bash
> ./echo_node --btc-rpc-user user
```

#### 33. RPC password of BTC node

```bash
> ./echo_node --btc-rpc-user password
```

#### 34. Disable BTC service

```bash
> ./echo_node --sidechain-btc-disable
```

#### 35. Registrator account
ID of registrar account on this node (should be imported as account-info).

```bash
> ./echo_node --registrar-account "1.2.6"
```

#### 36. Registration difficult
Complexity of POW task to register account.

```bash
> ./echo_node --registration-difficulty 10
```

#### 37. Track account history
Account ID to track history for (may specify multiple times).

```bash
> ./echo_node --track-account "1.2.6"
```

#### 38. Maximum number of ops per account in history
Maximum number of operations per account will be kept in memory.

```bash
> ./echo_node --max-ops-per-account 1000
```

#### 37. Track contract history
Contract ID to track history for (may specify multiple times).

```bash
> ./echo_node --track-contract "1.2.6"
```

#### 38. Maximum number of ops per contract in history
Maximum number of operations per contract will be kept in memory.

```bash
> ./echo_node --max-ops-per-contract 1000
```

#### 39. Partial operation storing
Keep only those operations in memory that are related to history tracking.

```bash
> ./echo_node --partial-operations true
```

#### 40. Endpoint for EthRPC
Endpoint for EthRPC to listen on.

```bash
> ./echo_node --ethrpc-endpoint 0.0.0.0:9091
```

#### 41. Lifetime of registration tasks(in blocks)

```bash
> ./echo_node --ethrpc-registration-task-lifetime 20
```

#### 42. Block number after which to do a snapshot

```bash
> ./echo_node --snapshot-at-block 10
```

#### 43. Block time (ISO format) after which to do a snapshot

```bash
> ./echo_node --snapshot-at-time 2020-08-09T18:31:42
```

#### 44. Pathname of JSON file where to store the snapshot

```bash
> ./echo_node --snapshot-to /tmp/echo/snap.json
```

## Connect to node

Для осуществления операций необходимо подключиться к ноде. Здесь мы рассматрим подключение через `curl`.

Пример:

```bash
curl --data '{"jsonrpc": "2.0", "params": ["database", "get_account_by_name", ["nathan"]], "method": "call", "id": 1}' http://localhost:8090/rpc
```

Здесь мы делает запрос на Database API, метод `get_account_by_name` с аргументом `"nathan"`.

Ответ:
```json
{"id":1,"jsonrpc":"2.0","result":{"id":"1.2.26","registrar":"1.2.4","name":"nathan","active":{"weight_threshold":1,"account_auths":[],"key_auths":[["ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",1]]},"echorand_key":"ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu","active_delegate_share":2000,"options":{"delegating_account":"1.2.5","delegate_share":2000,"extensions":[]},"statistics":"2.5.26","whitelisting_accounts":[],"blacklisting_accounts":[],"whitelisted_accounts":[],"blacklisted_accounts":[],"active_special_authority":[0,{}],"top_n_control_flags":0,"accumulated_reward":[],"extensions":[]}}
```

В описании API методов есть тело для RPC запроса.

## Stop ECHO node

Что бы остановить ноду необходимо отправить ей SIGINT сигнал или же, простым языком, нажать Ctrl + C.

