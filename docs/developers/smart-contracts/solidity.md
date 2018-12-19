# Solidity

Solidity - язык программирования смарт-контрактов для платформы Ethereum, сам язык похож на JavaScript. Полную документацию по нему можно найти [тут](https://solidity.readthedocs.io).

## Intro
### Важные типы ID

- `1.2.x` - аккаунт
- `1.16.x` - контракт
- `1.17.x` - результат выполнения контракта

### Конвертация идентификаторов ECHO в адреса Ethereum

- Первый байт адреса занимает тип. Для аккаунта и контракта он заменяется на 00 и 01 соответственно.
- Следующие 11 байт занимают нули.
- Последние 8 байт занимает `uint64_t` число.

Краткая памятка:
```
ff0000000000000000000000ffffffffffffffff  | Conversion of decimal ECHO type
[][ 11 bytes of zeros  ][   8 bytes    ]  |       to hex short type:
^ 1 byte id short type    id instance     |   2 -> 00 - account
                                          |  16 -> 01 - contract
1.2.26 = account 26 (0x1a) =              |  dd -> xx - everything else
000000000000000000000000000000000000001a  |
                                          |
1.16.5 = contract 5 =                     |
0100000000000000000000000000000000000005  |

```

### Дополнительные возможности Ethereum при использовании с ECHO

Для поддержки различных типов ассетов в контрактах были доработаны как компилятор solidity, так и сама виртуальная машина ethereum.

Добавлены следующие опкоды, генерируемые solidity:

- `IDASSET` - позволяет получить `ID` ассета по его имени.
- `PROPERTY` + `CONVERT` - позволяет получать настройки сети от ECHO-сервера
- `ASSETBALANCE` - позволяет узнать баланс данного ассета.
- `CALLASSET` - позволяет переводить деньги в указанном ассете.

### Флаг поддерживаемого ассета, флаг приведения точности

При создании контракта, можно указать `supported_asset_id` - тип ассета, работу с которым и ни с каким другим будет поддерживать новый контракт.

## Creating a smart contract
### With the ethereum toolchain
Контракт можно скомпилировать с помощью [Remix](https://remix.ethereum.org/) прямо в браузере, однако в таком случае не будут доступны опкоды, добавляемые Echo.

При получении баланса или операциях по переводу, будет использоваться тип ассета из ассета транзакции. 
              
### With solc customized for ECHO
С помощью модифицированного компилятора [solc](https://gitlab.pixelplex.by/631_echo/solidity) можно скомпилировать
контракт с поддержкой нового функционала ECHO.
[Инструкции](https://solidity.readthedocs.io/en/latest/installing-solidity.html#building-from-source)
по сборке и использованию аналогичны обычному solc.

## Uploading a smart contract
### Running the contract operation

Для загрузки контракта используется [эта операция](../connect/operations/contract_operations/_contract_operation.md).

### An example with echo_wallet
Для примера будем использовать следующий простой контракт:
```solidity
contract C {
    function foo() public pure returns (string)  {
        return "Hello, ECHO";
    }
}
```
### Additional Capability in Solidity

# `address`
В класс `address` добавлены методы `assetbalance` и `transferasset`.
### `assetbalance`
Через обращение к адресу, возвращает баланс указанного ассета .

```java
uint assetbalance(string assetId)
```
params:
- assetId - string, id ассета(в формате триплета, например "1.3.0").
 
 return:
- uint, баланс указанного ассета.

Example:
```ruby
contract assetbalance {
    uint public balance;
    function saveBalance(address addr, string assetId) {
        balance = addr.assetbalance(assetId);
    }
}

contract assetbalance2 {
    uint public balance;
    function saveBalance() {
        address addr = 0x0000000000000000000000000000000000000005;
        balance = addr.assetbalance("1.3.1");
    }
}

```

### `transferasset`
Через обращение к адресу, переводит на него определённую сумму ассета.

```java
void transferasset(uint value, uint assetId)
```
params:
- value - uint, сумма перевода.
- assetId - uint, ID ассета перевода(в формате uint256).

Example:
```ruby
contract transferasset {
    function transfer(address addr, uint value, uint assetId) {
        addr.transferasset(value, assetId);
    }
}

contract transferasset2 {
    function transfer() {
        address addr = 0x0000000000000000000000000000000000000003;
        addr.transferasset(100000, 1);
    }
}
```

# `db`
Был добавлен интерфейс `db` для работы с чейном ECHO, включающий в себя методы `property` и `convert`.

### `property`
Возвращает значение указанного поля указанного объекта в блокчейне.

```java
bytes property(string idAndProperty)
```
params:
- idAndProperty - string, id объекта и запрашиваемое поле(например "1.2.5 lifetime_referrer_fee_percentage").
 
 return:
- bytes, запрашиваемый объект.

Example:
```ruby
contract property {
    bytes public data;
    function getProperty(string idAndProperty) {
        data = db.property(idAndProperty);
    }
}

contract property2 {
    bytes public data;
    function getProperty() {
        data = db.property("1.2.5 options.memo_key");
    }
}
```

### `convert`
Конвертирует объект не превышающий 32 байта в uint256.

```java
uint convert(bytes data)
```
params:
- data - bytes, конвертируемый объект.
 
 return:
- uint, конвертируемый объект в формате uint.

Example:
```ruby
contract convert {
    bytes public data;
    uint public value;
    function getPropertyAndConvert(string idAndProperty) {
        data = db.property(idAndProperty);
        value = db.convert(data);
    }
}
```

# `msg`
В интерфейс `msg` добавлен член `idasset`
### `idasset`
Хранит ID ассета с которым был создан контракт в формате uint.

Example:
```ruby
contract transfer {
    function transfer(address addr, uint value) {
        addr.transferasset(value, msg.idasset);  
    }
}
```

### Flag of supported asset

    В ECHO в контракты был добавлен опциональный флаг отображающий с каким именно ассетом может работать данный контракт.

    - Если флаг не установлен, контракт может быть вызван с любым ассетом.
    - Если флаг установлен, то вызовы функций контракта могут быть осуществлены исключительно с данным ассетом.

По default данный флаг не выставлен. Флаг можно выставить при создании контракта передав название ассета в качестве параметра `supported_asset_id`.

Флаг был добавлен для возможности полноценной поддержки контрактов написанных для `Ethereum`. При его отсутствии контракту будет неважно какой ассет на него придёт и это являлось проблемой. При указании конкретного ассета в качестве `supported_asset_id` параметра при создании контракта мы исключаем возможность отправлять на него любой другой ассет выбрасывая исключение.

### Flag of using Ethereum accuracy

    В ECHO в контракты был добавлен флаг отображающий необходимость приведения к Ethereum точности при работе с балансами в контрактах.

    - Если флаг не установлен, при работе с балансами используется оригинальная точность ассета контракта.
    - Если флаг установлен, при работе с балансами используется Ethereum точность равная 18 знакам после запятой.

По default данный флаг выставлен в `false`. Флаг можно выставить при создании контракта передав `true` или `false` в качестве параметра `eth_accuracy`.

К примеру, допустим ассет `ECHO` у нас имеет 5 знаков после запятой и если флаг будет установлен в `false` то при отправке 1 ECHO в контракт придёт сумма `100000`, если же флаг будет установлен в `true` при отправке того же 1 ECHO придёт сумма `1000000000000000000`. Флаг был добавлен для возможности полноценной работы контрактов написанных для `Ethereum`.

## Create Smart Contract

Воспользуемся solc чтобы скомпилировать наш контракт:
```
$ solc contract.sol --bin --hashes
Binary:
608060405234801561001057600080fd5b5061013f806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c298557814610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600b81526020017f48656c6c6f2c204543484f0000000000000000000000000000000000000000008152509050905600a165627a7a72305820fc3c8a0ba561c44ac4e7360f35310d7f136c73d1902fb3d0309a4b927e4f45720029
Function signatures:
fc68521a: f(address)
```

Предполагается, что на аккаунте кошелька есть деньги.
Создаем контракт:
```
create_contract nathan "608060405234801561001057600080fd5b5061013f806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c298557814610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600b81526020017f48656c6c6f2c204543484f0000000000000000000000000000000000000000008152509050905600a165627a7a72305820fc3c8a0ba561c44ac4e7360f35310d7f136c73d1902fb3d0309a4b927e4f45720029" 0 ECHO 1 2000000 "" true true
```

Сигнатура этого метода выглядит так:  
```
create_contract(
    string registrar_account, string code,
    uint64_t value, string asset_type,
    uint64_t gasPrice, uint64_t gas,
    string supported_asset_id,
    bool broadcast, bool save_wallet
    )
```

- `registrar_account` - аккаунт владельца контракта
- `code` - строка с байт-кодом контракта в hex-виде
- `value` и `asset_type` - количество и типа ассета, передающиеся в транзакции
- `gasPrice` и `gas` - цена и количество газа
- `supported_asset_id` - ограничение ассетов данного контракта до

После вызова функции, можно подтвердить, что контракт создался с помощью `get_all_contracts`

## Application Programming Interface (API)
### Call smart contracts

Вызов функций контракта происходит через `call_contract`, который получает следующие аргументы:

- Имя аккаунта владельца
- ID контракта
- HEX-код функции для вызова
- Средства, передаваемые при вызове
- Цена на gas
- Gas, передаваемый при вызове
- Нужно ли распространять транзакцию по сети (по умолчанию `false`)
- Нужно ли сохранять транзакцию в кошельке (по умолчанию `true`)

Пример вызова созданного ранее контракта:

```
call_contract nathan 1.16.0 "c2985578" 0 ECHO 1 2000000 true true
```

### Get result of deployment or call

Для получения результатов выполнения контрактов используется функция `get_contract_result(contract_result_id id)`, принимающая id результатов контрактов, например `1.17.2`.

Результатом будет либо `echo::evm::result_t`, либо `echo::x86::result_t` в зависимости от ВМ.

### Get properties from Smart Contract

Функция `get_property` позволяет получать значения любых элементов в чейне.

Она принимает параметром строку, вида `<id> <path>`, где `<id>` - это триплет идентификатора объекта, а `<path>` - "путь" из имён полей или индексов.

Примеры:
```
get_property("1.2.26 name") - имя аккаунта номер 26
get_property("1.17.2 contracts_id.1.instance") - номер второго контракта в результатах выполнения контракта номер 2

```

### Internal transactions

### Subscribe to Smart Contract Events

Для подписи на события контрактов используется метод database_api  
`subscribe_contract_logs(uint32_t id, contract_id_type contract_id, uint32_t from, uint32_t to)`.

- `id` - произвольный идентификатор, который будет возвращен вместе с событием;
- `contract_id` - идентификатор контракта, на события которого подписываются;
- `from` и `to` - диапазон блоков, в котором прослушиваются события;

При вызове этого метода, он вернет все уже имеющиеся события в указанном диапазоне, также как и метод `get_contract_logs`.

Пример подписи на события используя wscat:
```
> {"id":1, "method":"subscribe_contract_logs", "params":[1337,"1.16.0",1,200]}
< {"id":1,"jsonrpc":"2.0","result":[]}

# call contract in echo_wallet

< {"method":"notice","params":[1337,[[{"address":"0100000000000000000000000000000000000000","log":["a887d9f447f44f095186fc4a0bef9914881f330f24d2a2f63242c4c05eb26ee0"],"data":"000000000000000000000000000000000000000000000000000000000000001a"}]]]}
```

## Fees
// TODO

## Hello world!
