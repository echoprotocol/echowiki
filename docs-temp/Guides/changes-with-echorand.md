# Изменения в работе с блокчейном после введения echorand

## Регистрация аккаунта

Регистрация осуществляется на блокчейн ноде с помощью [API](/docs/Essential/Echo-API/Registration-API.md)

## Выпуск блоков

Теперь блоки выпускаются аккаунтами, поэтому в структуру блока(`block_header`) добавились поля: 

* `account_id_type account` - аккаунт, подписавший(выпустивший блок)
* `uint64_t round` - номер раунда(номер блока)
* `fc::sha256 rand` - используется для подписи блока
* `certificate_t cert` - сертификат блока

```cpp
    struct block_signature_t
    {
        unsigned                      _step;          ///< step# at which the signature was created
        uint8_t                       _value;         ///< BBA mark
        unsigned                      _signer;        ///< verifier, who created (signs) this signature
        fc::array<unsigned char, 64>  _bba_sign;      ///< signature for (round, step, value, block_hash, leader/producer)
    };

    struct certificate_t
    {
        fc::sha256                   _rand;          ///< block rand quantity
        fc::ripemd160                _block_hash;    ///< block hash for block described by the cert
        unsigned                     _producer;      ///< leader, who created block
        vector<block_signature_t>    _signatures;    ///< certificate signatures
    }
```

REFLECT, отображающий порядок сериализации:

```cpp
FC_REFLECT( graphene::chain::transaction, (ref_block_num)(ref_block_prefix)(expiration)(operations)(extensions) )
FC_REFLECT_DERIVED( graphene::chain::signed_transaction, (graphene::chain::transaction), (signatures)(ed_signature) )
FC_REFLECT_DERIVED( graphene::chain::processed_transaction, (graphene::chain::signed_transaction), (operation_results) )
```

## Транзакции

Для осуществления подписи транзакции регистрации с помощью `eddsa` ключа в транзакцию было добавлено поле `optional<fc::array<unsigned char, 64>> ed_signature`.

Обновленные рефлекты, отражающие порядок при сериализации\десериализации:

```cpp
FC_REFLECT( graphene::chain::transaction, (ref_block_num)(ref_block_prefix)(expiration)(operations)(extensions) )
FC_REFLECT_DERIVED( graphene::chain::signed_transaction, (graphene::chain::transaction), (signatures)(ed_signature) )
FC_REFLECT_DERIVED( graphene::chain::processed_transaction, (graphene::chain::signed_transaction), (operation_results) )
```

## Операции и объекты

### account_options

В операциях и объектах, связанных с аккаунтом содержатся поля типа `account_options`. В последнем было добавлено поле `account_id_type delegating_account`, отвечающий за делегацию прав по выпуску блока. При указании `GRAPHENE_PROXY_TO_SELF_ACCOUNT ("1.2.5")` - делегация отключена. При регистрации устанавливается аккаунт, зарегистрировавший текущий.

REFLECT, отображающий порядок сериализации:

```cpp
FC_REFLECT(graphene::chain::account_options, (memo_key)(voting_account)(delegating_account)(num_witness)(num_committee)(votes)(extensions))
```

### account_object

Добавилось поле `eddsa::public_key_t ed_key`, в котором хранится `ed25519` ключ, необходимый для `echorand`.

Так же стоит обратить внимание, что изменилась структура `new_options`. Описано выше.

REFLECT, отображающий порядок сериализации:

```cpp
FC_REFLECT( graphene::chain::account_update_operation,
            (fee)(account)(owner)(active)(ed_key)(new_options)(extensions)
          )

```

### account_create_operation

Добавилось поле `eddsa::public_key_t ed_key`.

Так же стоит обратить внимание, что изменилась структура `new_options`. Описано выше.

REFLECT, отображающий порядок сериализации:

```cpp
FC_REFLECT( graphene::chain::account_create_operation,
            (fee)(registrar)
            (referrer)(referrer_percent)
            (name)(owner)(active)(ed_key)(options)(extensions)
```

### account_update_operation

Добавилось поле `optional<eddsa::public_key_t> ed_key`.

Так же стоит обратить внимание, что изменилась структура `new_options`. Описано выше.

REFLECT, отображающий порядок сериализации:

```cpp
FC_REFLECT( graphene::chain::account_update_operation,
            (fee)(account)(owner)(active)(ed_key)(new_options)(extensions)
          )

```