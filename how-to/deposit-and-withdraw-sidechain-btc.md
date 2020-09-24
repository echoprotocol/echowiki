# How to: Deposit and withdraw sidechain BTC

## Deposit

Чтобы перевести BTC на свой аккаунт в сети Echo, необходимо создать `btc_deposit_address` для вашего аккаунта на стороне Echo. 

Для этого нужно вызвать метод [create_btc_deposit_address](/api-reference/echo-wallet-api/README.md#create_btc_deposit_address-account-backup_address-broadcast). Второй параметр - это backup P2PKH адрес вашего аккаунта в Bitcoin сети. На mainnet он начинается с цифры `1` - `1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2`, на tesnet он начинается с `m` или `n` - `mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn`.

После создания адреса вы можете посмотреть его при помощи метода [get_btc_address](/api-reference/echo-wallet-api/README.md#get_btc_address-account). Пример адреса:

```bash
unlocked >>> get_btc_address nathan
{
  "id": "1.19.0",
  "account": "1.2.26",
  "deposit_address": {
    "address": "2NA1MLubzNsYtdWt6Qzh6aFiGbYAqasWv1Q"
  },
  "committee_member_ids_in_script": [[
      "1.2.6",
      "022baf06eb26d86d0ab247bbe1cd9518748dd88fa4d829512b971e82f9cdbef5c2"
    ],[
      "1.2.7",
      "029931c5e30c2611646588fdb9a40ad70e37e55dfee401aab619c2f5a861b6ce4a"
    ],[
      "1.2.8",
      "03b4a79d201c1220a10826f13148cf5240a667bd75cea411c0806b7b13ad3eeb14"
    ],[
      "1.2.9",
      "036a5aaa511a9a0ec7bb1b7fb24254bd1f66d78864d2fbce975a949337b4064761"
    ],[
      "1.2.10",
      "03039e925d447e6aa98160a2224e91091388659f2188988c7efc4323c925736d5f"
    ]
  ],
  "is_relevant": true,
  "backup_address": "muBbJomENuCpiaW6NtBE4byah7sQXZFoHu",
  "extensions": []
}
```
`deposit_address` - наш депозит адрес.

Далее мы можем переводить средства в сети Bitcoin на этот адрес. Для этого можно использовать любой кошелёк. Например, перевод через bitcoin-cli будет выглядить следующим образом:

```bash
./bitcoin-cli sendtoaddress 2NA1MLubzNsYtdWt6Qzh6aFiGbYAqasWv1Q 25
```

Средства дойдут на ваш аккаунт примерно через сутки. Проверить свой баланс можно методами [list_id_balances](/api-reference/echo-wallet-api/README.md#list_id_balances-id) and [list_account_balances](/api-reference/echo-wallet-api/README.md#list_account_balances-id). Баланс будет отображаться в eBTC.

```bash
list_account_balances nathan
9999999.99813941 ECHO
624.99892000 EBTC
```

> Не пугайтесь, если пришло чуть меньше средств, чем вы отправили. В данном примере отправляли суммарно 625 BTC. 0.00108 BTC было взято коммиссии, чтобы покрыть fee в BTC за отправку транзакций членами коммитета.

Также вы можете наблюдать все ваши депозиты методом [get_account_deposits](/api-reference/echo-wallet-api/README.md#get_account_deposits-account-type).

Если вы хотите получить скрипт btc, который использовался для создания вашего адреса, вы можете использовать метод [get_btc_deposit_script](/api-reference/echo-wallet-api/README.md#get_btc_deposit_script-address).

## Withdraw

Если вы решите совершить вывод ваших eBTC с вашего Echo аккаунта в Bitcoin, необходимо вызвать метод [withdraw_btc](/api-reference/echo-wallet-api/README.md#withdraw_btc-account-btc_addr-value-broadcast).

Баланс с вашего аккаунта спишется сразу, а в Bitcoin сети средства придут через определенное время.

Чтобы увидеть все ваши выводы, используйте метод [get_account_withdrawals](/api-reference/echo-wallet-api/README.md#get_account_withdrawals-account-type).


