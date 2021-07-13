# Differences from Ethereum

## Working with Gas in Echo

A rather common problem when working with contracts on the Ethereum network is a transaction error due to the lack of Gas. The period between estimating the required Gas to perform a transaction and the actual performing of a transaction on the blockchain may last long, while, in the meantime, the state of the contract may have changed, which in its turn may result in an increase in the quantity of the required Gas.

In order to minimize the risk, the mechanism of transaction fee payment for the Echo contract has been changed. The Gas cost estimation mechanism has also been changed - the parameter cannot be transferred by a user, it's a network configuration parameter that can be changed by the committee.

### Transaction fee amount estimation

For transaction fee amount estimation, Echo uses the following method [get\_required\_fees](/api-reference/echo-node-api/database-api/authority-api.md#get_required_fees-ops-id). In responding to the request, when creating or executing a contract, Echo performs the following actions:

- estimates the required amount of Gas to execute or create a contract;
- transfers Gas to the amount in a specified asset, based on the exchange rate of the asset and the cost of a Gas unit;
- adds an additional fee to the received amount for the creation of an operation and the size of an operation;
- returns the resulting value in a form of query result.

The resulting value is indicated as `fee.amount` in the operation, just the same way as the other types of operations..

### Performing an operation

When performing an operation, the Gas amount is determined by the formula `Fee Amount / Gas Price`, where `Fee Amount` is the entire commission amount, including the commission for the creation and the size of an operation. This mechanism allows to block the fluctuations in the required Gas in case of a slight change in a state of the contract at the time between the commission estimation and the operation execution.

## New features in solidity

To support various types of assets in contracts, both the solidity compiler (solc) and the Ethereum Virtual Machine have been refined. As a result, to use the new functionality(all functions described below but `ecrecover`) added to Echo smart contracts, it is required to compile using the modified solidity compiler [solc-bin](https://github.com/echoprotocol/solc-bin).

### Functions

#### `assetbalance`

By referring to the address, it returns the balance in the specified asset.

```cpp
uint assetbalance(string assetId)
```

- `assetId` - string, id ассета(in a triplet format, for instance "1.3.0").

Example:

```cpp
contract assetbalance {
    uint public balance;
    function saveBalance(address addr, uint64 assetId) public {
        balance = addr.assetbalance(assetId);
    }
}

contract assetbalance2 {
    uint public balance;
    function saveBalance() public {
        address addr = 0x0000000000000000000000000000000000000005;
        balance = addr.assetbalance(1);
    }
}

```

#### `transferasset`

By referring to the address, it transfers a certain amount in the specified asset.

```cpp
void transferasset(uint value, uint assetId)
```

- `value` - uint, transfer amount.
- `assetId` - uint, transfer asset ID (in a format of uint256).

Example:

```cpp
contract transferasset {
    function transfer(address payable addr, uint value, uint assetId) public {
        addr.transferasset(value, assetId);
    }
}

contract transferasset2 {
    function transfer() public {
        address payable addr = 0x0000000000000000000000000000000000000003;
        addr.transferasset(100000, 1);
    }
}
```

#### `db.property`

Returns the value of the field of a specified object in the blockchain.

```cpp
bytes property(string idAndProperty)
```

- `idAndProperty` - string, object ID and the requested field(for instance "1.2.5 lifetime_referrer_fee_percentage").

Example:

```cpp
contract property {
    bytes public data;
    function getProperty(string memory idAndProperty) public {
        data = db.property(idAndProperty);
    }
}

contract property2 {
    bytes public data;
    function getProperty() public {
        data = db.property("1.2.5 options.delegate_share");
    }
}
```

#### `db.convert`

Converts an object, that should not exceed 32 bytes, into uint256.

```cpp
uint convert(bytes data)
```

params:

- `data` - bytes, convertible object.

Example:

```cpp
contract convert {
    bytes public data;
    uint public value;
    function getPropertyAndConvert(string memory idAndProperty) public {
        data = db.property(idAndProperty);
        value = db.convert(data);
    }
}
```

#### `msg.idasset`

Returns the asset ID, with the help of which the transaction of creating or invoking a contract was created, in the uint format.

Example:

```cpp
contract transferContract {
    function transfer(address payable addr, uint value) public {
        addr.transferasset(value, msg.idasset);  
    }
}
```

#### `addr.isCommittee`

Verifies if the address is an active witness, and returns the corresponding `bool` value.

Example:

```cpp
contract A {
    function f(address addr) public returns (bool) {
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
```cpp
contract C {
    function f(address a, bytes memory d, bytes memory s) public view returns (bool) {
        return edverify(a, d, s);
    }
}
```

#### `ecrecover`

A function used to recover the echo account address associated with the its public key from elliptic curve signature. Returns echo account address or zero on error.

First, you need to associate the evm address generated from the existing private key with the existing account in the echo using the operation [evm_address_register_operation](/api-reference/echo-operations/account-management.md#evm_address_register_operation). Next, you need to sign the message with this private key. The account address in the echo will be received from this signature.

`ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s)`
- `bytes32 hash` - hash of the message
- `uint8 v` - final 1 byte of signature
- `bytes32 r` - first 32 bytes of signature
- `bytes32 s` - second 32 bytes of signature

Example:
```cpp
contract C {
    function recover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public returns (address)  {
        return ecrecover(hash, v, r, s);
    }
}
```

#### `ecrecovernative`

A function that is working just as in Ethereum and only restores address from a signature.

`ecrecovernative(bytes32 hash, uint8 v, bytes32 r, bytes32 s)`
- `bytes32 hash` - hash of the message
- `uint8 v` - final 1 byte of signature
- `bytes32 r` - first 32 bytes of signature
- `bytes32 s` - second 32 bytes of signature

Example:
```cpp
contract C {
    function recover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public returns (address)  {
        return ecrecovernative(hash, v, r, s);
    }
}
```

### Call with context

In order to be able to make an external call to the contract, for which the supported asset type is rigidly set, with another asset type, methods have been added for calling with changing the asset type in the context.

Available since version 0.6.0 of solidity.

#### `callwithcontext`

External call of contract with change asset type for context of callee.

```cpp
(bool success, bytes memory data) callwithcontext(bytes bytes, uint assetId)
```

* `bytes` - bytes, bytes of call.
* `assetId` - uint, new assetId for context of callee, only for current call.

Example:

```cpp
contract Call {
    function call_with_context() {
        address addr = 0x0100000000000000000000000000000000000003;
        uint newAssetId = 5;
        addr.callwithcontext(abi.encodeWithSignature("tr()"), newAssetId);
    }
}
```

#### `callcodewithcontext`

External call code of contract with change asset type for context of callee.

Function `callcode` and `callcodewithcontext` is now disallowed (in favor of `delegatecall` and `delegatecallwithcontext`). It is still possible to use it via inline assembly.

```cpp
(bool success, bytes memory data) callcodewithcontext(bytes bytes, uint assetId)
```

* `bytes` - bytes, bytes of call.
* `assetId` - uint, new assetId for context of callee, only for current call.

Example:

```cpp
contract Call {
    function call_with_context() {
        address addr = 0x0100000000000000000000000000000000000003;
        uint newAssetId = 5;
        addr.callcodewithcontext(abi.encodeWithSignature("tr()"), newAssetId);
    }
}
```

#### `delegatecallwithcontext`

External delegate call of contract with change asset type for context of callee.

```cpp
(bool success, bytes memory data) delegatecallwithcontext(bytes bytes, uint assetId)
```

* `bytes` - bytes, bytes of call.
* `assetId` - uint, new assetId for context of callee, only for current call.

Example:

```cpp
contract Call {
    function call_with_context() {
        address addr = 0x0100000000000000000000000000000000000003;
        uint newAssetId = 5;
        addr.delegatecallwithcontext(abi.encodeWithSignature("tr()"), newAssetId);
    }
}
```

#### `staticcallwithcontext`

External static call of contract with change asset type for context of callee.

```cpp
(bool success, bytes memory data) staticcallwithcontext(bytes bytes, uint assetId)
```

* `bytes` - bytes, bytes of call.
* `assetId` - uint, new assetId for context of callee, only for current call.

Example:

```cpp
contract Call {
    function call_with_context() {
        address addr = 0x0100000000000000000000000000000000000003;
        uint newAssetId = 5;
        addr.staticcallwithcontext(abi.encodeWithSignature("tr()"), newAssetId);
    }
}
```

### Ways to use

#### Use predefined contracts

When starting the network via the Genesis-block, the Echo network uses predefined contracts that create an interface for using additional methods. This contract and its interface can be used to call the Echo methods.

**Contract addresses**

**Contract interfaces**

**Usage example**

