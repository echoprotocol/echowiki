# How to: Make a transfer between accounts

Существует два варианта для перевода assets: можно переводить с аккаунта на аккаунт или же с аккаунта на адрес.

> Адрес - это ripemd160 хеш, который соответсвует определенному аккаунту.

## 1. Перевод на аккаунт.

Для перевода с аккаунта на аккаунт необходимо отправить операцию [transfer_to_address_operation](../../api-reference/echo-operations/asset-transfer.md#transfer).

Для этого можно использовать Wallet API [transfer](../../api-reference/echo-wallet-api/README.md##transfer-from-to-amount-asset_symbol-broadcast).

Пример:
```
transfer 1.2.0 1.2.1 10 ECHO true
```

## 2. Перевод на адрес.

### Шаг 1. Создаем адрес(Получатель создает адрес).

Для этого используем Wallet API [generate_account_address](../../api-reference/echo-wallet-api/README.md#generate_account_address-owner_account-label-broadcast).

```
generate_account_address nathan label true
```

### Шаг 2. Получаем через Wallet API адрес.

Для этого используем Wallet API [get_account_addresses](../../api-reference/echo-wallet-api/README.md#get_account_addresses-account_id-from-limit).

```
get_account_addresses 1.2.26 0 10
```

### Шаг 3. Перевод.

Для перевода с аккаунта на адрес необходимо отправить операцию [transfer_to_address_operation](../../api-reference/echo-operations/asset-transfer.md#transfer_to_address_operation).

Для этого используем Wallet API [transfer_to_address](../../api-reference/echo-wallet-api/README.md#transfer_to_address-from-address-amount-asset_symbol-broadcast).

```
transfer_to_address 1.2.26 f149bd2883b1179965bd6706092573be4d68fec8 10 ECHO true
```
