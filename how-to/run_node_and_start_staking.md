# How to run node in 5 minutes and start staking

Для начала  необходимо скачать и распаковать архив с двоичными файлами Echo. Вы можете найти их [здесь]().

Следующим шагом необходимо запустить полную ноду, если вы хотите участвовать в консенсусе.

```bash
./echo_node --rpc-endpoint="0.0.0.0:8090" --account-info="[\"1.2.514\", \"5KcP5uiAByA14Koo8o9eYgoPEyB6A53n57MmGMsKaMqi7wKQYiA\"]"
```

`--account-info` - первый параметр это ID вашего акаунта, второй - ED215519 ключ, который вам был выдан для аккаунта.

> Если вы не хотите поднимать свою полную ноду, но хотите принимать участие в консенсусе через делегирование, вы можете подключить echo_wallet к уже существующим публичным нодам, которые участвуют в блокчейне. Эти публичные ноды запущены как предприятиями, так и частными лицами.

Далее нужно запусть echo_wallet, подключиться к ноде и создать собственный кошелёк. Прочитать об этом можно [здесь](/how-to/use-cli-wallet.md#Use_CLI_Wallet)

> Для того, чтобы начать участвовать в staking, у вас должен быть зарегистрирован аккаунт в блокчейне. И на нём необходимо иметь баланс в ECHO. Документ по регистрации аккаунта можно найти [здесь](/how-to/register-account.md#Register_account).

После всех этих действий вы можете принимать участия в консенсусе. Для этого вам необходимо заморозить ECHO на определённый срок. Чтобы посмотреть на сколько дней вы можете заморозить свои средства и какой будет повышающий коэффициент, вызовите `get_global_properties` и найдите поле `frozen_balances_multipliers` в полученном объекте. Первое число в мапе - на сколько вы можете заморозить свои средства, второе - какой повышающий коэффициент будет при такой заморозке(умноженный на 100).

```bash
"frozen_balances_multipliers": [
      [90, 13000],
      [180, 14000],
      [360, 15000]
]
```

Из примера выше следует, что при заморозке на 360 дней множитель будет 150%.

> Чем больше ECHO и чем длинее срок их заморозки, тем у вас больше шансов учавствовать в стейкинге.

После всего выше перечисленного можно вызывать метод заморозки средств:
```bash
unlocked >>> freeze_balance your_acc 10 ECHO 180 true
```

Если операция прошла успешно, то в консоли вы увидите такой лог с транзакцией:

```bash
{
  "ref_block_num": 22958,
  "ref_block_prefix": 2180469415,
  "expiration": "2020-09-15T10:33:04",
  "operations": [[
      29,{
        "fee": {
          "amount": 0,
          "asset_id": "1.3.0"
        },
        "account": "1.2.26",
        "amount": {
          "amount": 1000000000,
          "asset_id": "1.3.0"
        },
        "duration": 180,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "95e69b06f79e08416504ab709a6491208ff6a88fa09c5c3223e57ef7e72088e9daa458af2cbb51ab00d78a9211fc3129fd9b98e4ec80e1cf8f2a1568a13e9b00"
  ],
  "signed_with_echorand_key": false
}
```

Вы можете посмотреть свои замороженные балансы:

```bash
unlocked >>> list_frozen_balances nathan
[{
    "id": "1.9.0",
    "owner": "1.2.26",
    "balance": {
      "amount": 1000000000,
      "asset_id": "1.3.0"
    },
    "multiplier": 14000,
    "unfreeze_availability_time": "2020-09-11T08:46:40",
    "extensions": []
  }
]
```
## Делегирование стека

Аккаунт может делегировать отправку сообщений от своего имени другому акккаунту. Это второй вариант участия в консенсусе - делегирование. Делегируя право на отправку сообщений учетной записи, авторизованной на узле, вы можете получить часть вознаграждения за сообщение, которое было отправлено от имени вашей учетной записи.

ID делегата можно увидеть в объекте аккаунта. Поле `options.delegating_account`.

```bash
unlocked >>> get_account myacc
{
  "id": "1.2.503",
  "membership_expiration_date": "1970-01-01T00:00:00",
  "registrar": "1.2.8",
  "referrer": "1.2.8",
  "lifetime_referrer": "1.2.8",
  "lifetime_referrer_fee_percentage": 3000,
  "referrer_rewards_percentage": 7500,
  "name": "myacc",
  "active": {
    "weight_threshold": 1,
    "account_auths": [],
    "key_auths": [[
        "ECHOB3uKK5kjHrKSszvxpCjrHf9yMzXEfWXwyWmHyFENaVux",
        1
      ]
    ]
  },
  "echorand_key": "ECHOB3uKK5kjHrKSszvxpCjrHf9yMzXEfWXwyWmHyFENaVux",
  "options": {
    "voting_account": "1.2.5",
    "delegating_account": "1.2.8",
    "num_committee": 0,
    "votes": [],
    "extensions": []
  },
  "statistics": "2.6.503",
  "whitelisting_accounts": [],
  "blacklisting_accounts": [],
  "whitelisted_accounts": [],
  "blacklisted_accounts": [],
  "active_special_authority": [
    0,{}
  ],
  "top_n_control_flags": 0,
  "extensions": []
}
```

По умолчанию аккаунт, который зарегистрировал ваш акканут, становится вашим делегатом.

Делегатом аккаунта `1.2.503` из примера выше является аккаунт `1.2.8`.

Поменять делегата можно следующим образом:

```bash
Пример изменения, которого ещё нету.
```
