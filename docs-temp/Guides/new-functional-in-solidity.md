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