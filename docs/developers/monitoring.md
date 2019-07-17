# Echorand monitoring

## Newsletter subscription

### Network Node Api

`void set_consensus_message_callback( std::function<void(const variant&)> )`

We need to install a callback, with the help of which the notifications about the start of the round and about the obtaining of the block from the producers are sent. Types of notifications:

* Notifications about the start of the round (round_started)

```json
{
    "type": "round_started",
    "round": 1337
}
```

* Notification about the arrived block from a producer

```json
{
    "type": "block_produced",
    "round": 1337,
    "producer": 7, //int
    "rand": "06e67aa50b707d87da9150fa54d29aec1bed575866550e78301712826ca4c86a",
    "block_hash": "0000035f1b3e741643485fbbad7bc0033c5d6d76"
}
```

`producer` - contains an instance (3 is the triplet number) account, that issued a block. 7 corresponds to account_id_type "1.2.7"

`rand` - contains a rand of the current block. `sha256` hash

`block_hash` - contains the hash of the current block. `ripemd160` hash

* Notifications about the start of gc

```json
{
    "type": "gc_started",
    "round": 1337
}
```

* Notifications about the start of bba

```json
{
    "type": "bba_started",
    "round": 1337
}
```

### Database API

Also, to receive other data, it is necessary to use the functionality already existing in `database_api`, namely:

* `void set_block_applied_callback( std::function<void(const variant& block_id)> cb );`

Used to get blocks that are applied as a result of `echorand` operation

* `set<account_id_type> get_current_verifiers(const uint32_t step_num)const;`

`step_num` - step number, from which you need to get verifiers.

Used to get the ID of the verifiers of the current round, from the step (the numbering starts with 1) transferred to the parameters
