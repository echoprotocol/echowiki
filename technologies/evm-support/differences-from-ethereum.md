# Differences from Ethereum

## Working with Gas in Echo

A rather common problem when working with contracts on the Ethereum network is a transaction error due to the lack of Gas. The period between estimating the required Gas to perform a transaction and the actual performing of a transaction on the blockchain may last long, while, in the meantime, the state of the contract may have changed, which in its turn may result in an increase in the quantity of the required Gas.

In order to minimize the risk, the mechanism of transaction fee payment for the Echo contract has been changed. The Gas cost estimation mechanism has also been changed - the parameter cannot be transferred by a user, it's a network configuration parameter that can be changed by the committee.

### Transaction fee amount estimation

For transaction fee amount estimation, Echo uses the following method [get\_required\_fees](https://wiki.echo-dev.io/developers/apis/database-api/#get_required_feesops-id). In responding to the request, when creating or executing a contract, Echo performs the following actions:

* estimates the required amount of Gas to execute or create a contract;
* transfers Gas to the amount in a specified asset, based on the exchange rate of the asset and the cost of a Gas unit;
* adds an additional fee to the received amount for the creation of an operation and the size of an operation;
* returns the resulting value in a form of query result.

The resulting value is indicated as `fee.amount` in the operation, just the same way as the other types of operations..

### Performing an operation

When performing an operation, the Gas amount is determined by the formula `Fee Amount / Gas Price`, where `Fee Amount` is the entire commission amount, including the commission for the creation and the size of an operation. This mechanism allows to block the fluctuations in the required Gas in case of a slight change in a state of the contract at the time between the commission estimation and the operation execution.

## New features in solidity

To support various types of assets in contracts, both the solidity compiler \(solc\) and the Ethereum Virtual Machine have been refined. As a result, to use the new functionality added to Echo smart contracts, it is required to compile using the modified solidity compiler.

### Functions

#### `assetbalance`

By referring to the address, it returns the balance in the specified asset.

```cpp
uint assetbalance(string assetId)
```

* `assetId` - string, id ассета\(in a triplet format, for instance "1.3.0"\).

Example:

```cpp
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

#### `transferasset`

By referring to the address, it transfers a certain amount in the specified asset.

```cpp
void transferasset(uint value, uint assetId)
```

* `value` - uint, transfer amount.
* `assetId` - uint, transfer asset ID \(in a format of uint256\).

Example:

```cpp
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

#### `db.property`

Returns the value of the field of a specified object in the blockchain.

```cpp
bytes property(string idAndProperty)
```

* `idAndProperty` - string, object ID and the requested field\(for instance "1.2.5 lifetime\_referrer\_fee\_percentage"\).

Example:

```cpp
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

#### `db.convert`

Converts an object, that should not exceed 32 bytes, into uint256.

```cpp
uint convert(bytes data)
```

params:

* `data` - bytes, convertible object.

Example:

```cpp
contract convert {
    bytes public data;
    uint public value;
    function getPropertyAndConvert(string idAndProperty) {
        data = db.property(idAndProperty);
        value = db.convert(data);
    }
}
```

#### `msg.idasset`

Returns the asset ID, with the help of which the transaction of creating or invoking a contract was created, in the uint format.

Example:

```cpp
contract transfer {
    function transfer(address addr, uint value) {
        addr.transferasset(value, msg.idasset);  
    }
}
```

#### `addr.isCommittee`

Verifies if the address is an active witness, and returns the corresponding `bool` value.

Example:

```cpp
contract A {
    function f(address addr) returns (bool) {
        return addr.isCommittee;
    }
}
```

#### `edverify`
A function used to verify multiple eddsa signatures required to authorize a single account.

`edverify(address addr, bytes memory data, bytes memory signatures)`
- `address addr` - address of authority;
- `bytes memory data` - byte array of arbitrary data;
- `bytes memory signatures` - packed byte array of signatures. Length must be a product of 64.

Example:
```bash
pragma solidity ^0.5.0;
contract C {
    function f(address a, bytes memory d, bytes memory s) public view returns (bool) {
        return edverify(a, d, s);
    }
}
```

### Ways to use

#### Use Echo Solc

To compile contracts with additional methods, an advanced Solc compiler can be used - [https://github.com/echoprotocol/solc](https://github.com/echoprotocol/solc).

#### Use predefined contracts

When starting the network via the Genesis-block, the Echo network uses predefined contracts that create an interface for using additional methods. This contract and its interface can be used to call the Echo methods.

**Contract addresses**

**Contract interfaces**

**Usage example**

