# Echorand monitoring

## Подписка на события

### Network Node Api

`void set_consensus_message_callback( std::function<void(const variant&)> )`

Устанавливается callback, с помощью которого отправляются нотификации о старте раунда и получении блока от продьюсеров. Типы нотификаций:

* Нотификация о старте раунда (round_started)

```json
{
    "type": 1,
    "round": current_round
}
```

* Нотификация о пришедшем блоке от продьюсера

```json
{
    "type": 2,
    "round": 0,
    "producer": 7, //int
    "rand": "d5c8994382576e1f577eee5239dc3adc7ddddba4bc2405eda73bb3aa7faa76c7",
    "block_hash": "000e8c18dd97194139e8b4d680c8c3636deb0016"
}
```

`producer` - содержит instance(3 цифра триплета) аккаунта, выпустившего блок. 7 соответствует account_id_type "1.2.7"

`rand` - содержит rand текущего блока. `sha256` хэш

`block_hash` - содержит хэш текущего блока. `ripemd160` хэш

### Database API

Так же для получения других данных необходимо использовать уже имеющийся в `database_api` функционал, а именно:

* `void set_block_applied_callback( std::function<void(const variant& block_id)> cb );`

Используется для получения блоков, которые применяются в результате работы `echorand`

* `set<account_id_type> get_current_verifiers(const uint32_t step_num)const;`

`step_num` - номер шага, с которого необходимо получить верифаеров.

Используется для получения идентификаторов верифаеров текущего раунда с шага(нумерация начинается с 1), переданного в параметры