# Echorand monitoring

## Подписка на события

### Network Node Api

`void set_consensus_message_callback( std::function<void(const variant&)> )`

Устанавливается callback, с помощью которого отправляются нотификации о старте раунда и получении блока от продьюсеров. Типы нотификаций:

* Нотификация о старте раунда (round_started)

```json
{
    "type": "round_started",
    "round": 1337
}
```

* Нотификация о пришедшем блоке от продьюсера

```json
{
    "type": "block_produced",
    "round": 1337,
    "producer": 7, //int
    "rand": "06e67aa50b707d87da9150fa54d29aec1bed575866550e78301712826ca4c86a",
    "block_hash": "0000035f1b3e741643485fbbad7bc0033c5d6d76"
}
```


`producer` - содержит instance(3 цифра триплета) аккаунта, выпустившего блок. 7 соответствует account_id_type "1.2.7"

`rand` - содержит rand текущего блока. `sha256` хэш

`block_hash` - содержит хэш текущего блока. `ripemd160` хэш

* Нотификация о старте gc 

```json
{
    "type": "gc_started",
    "round": 1337
}
```
* Нотификация о старте bba 

```json
{
    "type": "bba_started",
    "round": 1337
}
```

### Database API

Так же для получения других данных необходимо использовать уже имеющийся в `database_api` функционал, а именно:

* `void set_block_applied_callback( std::function<void(const variant& block_id)> cb );`

Используется для получения блоков, которые применяются в результате работы `echorand`

* `set<account_id_type> get_current_verifiers(const uint32_t step_num)const;`

`step_num` - номер шага, с которого необходимо получить верифаеров.

Используется для получения идентификаторов верифаеров текущего раунда с шага(нумерация начинается с 1), переданного в параметры