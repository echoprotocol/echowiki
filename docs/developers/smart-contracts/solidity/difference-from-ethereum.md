
# Diffecence from Ethereum

Для поддержки различных типов ассетов в контрактах были доработаны как компилятор solidity (solc), так и сама виртуальная машина Ethereum. В следствии чего для использования нового функционала, добавленного в Echo, смарт-контракты требуется компилировать именно с помощью модифицированного компилятора solidity.

## Новые функции в solidity
### `assetbalance`
Через обращение к адресу, возвращает баланс в указанном ассете.

```
uint assetbalance(string assetId)
```
- `assetId` - string, id ассета(в формате триплета, например "1.3.0").

Пример:
```
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
Через обращение к адресу, переводит на него определённую сумму в указанном ассете.

```
void transferasset(uint value, uint assetId)
```
- `value` - uint, сумма перевода.
- `assetId` - uint, ID ассета перевода(в формате uint256).

Пример:
```
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

### `db.property`
Возвращает значение указанного поля указанного объекта в блокчейне.

```
bytes property(string idAndProperty)
```
- `idAndProperty` - string, id объекта и запрашиваемое поле(например "1.2.5 lifetime_referrer_fee_percentage").

Пример:
```
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

### `db.convert`
Конвертирует объект не превышающий 32 байта в uint256.

```
uint convert(bytes data)
```
params:
- `data` - bytes, конвертируемый объект.

Пример:
```
contract convert {
    bytes public data;
    uint public value;
    function getPropertyAndConvert(string idAndProperty) {
        data = db.property(idAndProperty);
        value = db.convert(data);
    }
}
```

### `msg.idasset`
Возвращает ID ассета с которым была вызвана транзакция создания или вызова контракта в формате uint.

Пример:
```
contract transfer {
    function transfer(address addr, uint value) {
        addr.transferasset(value, msg.idasset);  
    }
}
```

## Способы использования

### Использовать Echo Solc

Для компиляции контрактов с дополнительными методами вы можете использовать расширенный компилятор Solc - [https://github.com/echoprotocol/solc](https://github.com/echoprotocol/solc).

### Использовать предустановленные контракты

В сеть Echo при старте сети через genesis-блок устанавливаются предустановленные контракты, реализующие интерфейс для использования дополнительных методов. Вы можете использовать этот контракт и его интерфейс для вызова методов Echo.

#### Адреса контрактов

#### Интерфейсы контрактов

#### Пример использования