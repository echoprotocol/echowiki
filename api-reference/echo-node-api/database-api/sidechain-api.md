## Sidechain

### get\_account\_deposits\(account, type\)

Returns all deposits, for the given account id.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account` | the id of the account to provide information about |
| `string type` | the type of the deposits may be "", "eth" or "btc" |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_account_deposits",
        [
            "1.2.21",
            ""
        ]
    ]
}
```

#### Returns

The all public deposits data stored in the blockchain.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.15.0",
            "deposit_id": 0,
            "account": "1.2.21",
            "value": 1000,
            "is_approved": true,
            "is_sent": false,
            "echo_block_number": 1654,
            "approves": [],
            "extensions": []
        },
        {
            "id": "1.22.0",
            "account": "1.2.21",
            "intermediate_deposit_id": "1.21.0",
            "tx_info": {
                "block_number": 156,
                "out": {
                    "tx_id": "dcab5ff32590b8385ef89d1b4c07f08260b3be921f56e78dbd11685cca0be1ff",
                    "index": 0,
                    "amount": 1000
                }
            },
            "block_number": 1654,
            "is_approved": true,
            "approves": [],
            "extensions": []
        }
    ]
}
```

### get\_account\_withdrawals\(account, type\)

Returns all withdrawals, for the given account id.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account` | the id of the account to provide information about |
| `string type` | the type of the withdrawals may be "", "eth" or "btc" |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_account_withdrawals",
        [
            "1.2.21",
            ""
        ]
    ]
}
```

## Sidechain Bitcoin

### get\_btc\_address\(account\)

Returns information about generated bitcoin address, if exist, for the given account id.

#### Parameters

| Option | Description |
| :--- | :--- |
| `std::string account` | the account name or id to provide information about |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_btc_address",
        [
            "nathan"
        ]
    ]
}
```

#### Returns

The public bitcoin address data stored in the blockchain

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "1.19.0",
        "account": "1.2.26",
        "deposit_address": {
            "address": "2N7zdBmx9RBMk2Lb6xt6S18Wc4xteE8zPst"
        },
        "committee_member_ids_in_script": [[
            "1.2.6",
            "024c1705f188828553da9cc3a0983b11c447a00009f84582b642fd0efd210bf197"
            ],[
            "1.2.7",
            "026e89f955990a7d6773535fade4b15ea86313d6057b89d36460301f61e1873923"
            ],[
            "1.2.8",
            "038360571d18a4eada8353278494a2336ed824be36ae690885aca8edfaa0df8cef"
            ],[
            "1.2.9",
            "02fdf1ca88a271753ce2001fa58fe26c86183ead98e479f5d813fa73a0cb56a1b3"
            ],[
            "1.2.10",
            "03e621a92197013f899b73b500280b8fb7b9de614767bc5d2e40eef7516475d98a"
            ]
        ],
        "is_relevant": true,
        "backup_address": "n4cLNDfyVPGoNFUpUEyBP8TzDPRNaVBm6E",
        "extensions": []
    }
}
```

### get\_btc\_deposit\_script\(address\)

Returns bitcoin script for generated bitcoin address, if exist, for the given address id.

#### Parameters

| Option | Description |
| :--- | :--- |
| `btc_address_id_type address` | the id of the bitcoin address to provide script |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_btc_deposit_script",
        [
            "1.19.21"
        ]
    ]
}
```

#### Returns

The bitcoin script for deposit for generated bitcoin address

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": "03e621a92197013f899b73b500280b8fb7b9de614767bc5d2e40eef7516475d98a"
    }
}
```

### get_btc_sidechain_fees()

Returns information about min withdrawal value and withdrawal fee used in bitcoin sidechain

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_btc_sidechain_fees",
        []
    ]
}
```

#### Returns

Pair of uints where the first element is min withdrawal value and the second is the withdrawal fee in satoshis

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        0, 
        0
    ]
}
```

### get\_btc\_stake\_address\(account\)

Returns information about generated bitcoin stake address, if exist, for the given account id.

#### Parameters

| Option | Description |
| :--- | :--- |
| `std::string account` | the account name or id to provide information about |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_btc_stake_address",
        [
            "nathan"
        ]
    ]
}
```

#### Returns

The public bitcoin address data stored in the blockchain

```javascript
{
  "id": "1.26.0",
  "account": "1.2.26",
  "stake_script": "76a9146334edf1175678f7905763e6b24361ab998aa23288ac52755675",
  "p2sh_address": "2N92ShU1GRnkMwMtqN86WVUEw5NwjXrJYHC",
  "extensions": []
}
```

## Sidechain Ethereum

### get\_eth\_address\(account\)

Returns information about generated ethereum address, if exist and approved, for the given account id.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account` | the id of the account to provide information about |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_eth_address",
        [
            "1.2.21"
        ]
    ]
}
```

#### Returns

The public ethereum address data stored in the blockchain

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "1.14.0",
        "account": "1.2.21",
        "eth_addr": "1134464B537884EE89cb298eEd674C9B14BCce47",
        "is_approved": true,
        "approves": [],
        "extensions": []
    }
}
```

### get_eth_sidechain_fees()

Returns information about min withdrawal value and withdrawal fee used in ethereum sidechain

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_eth_sidechain_fees",
        []
    ]
}
```

#### Returns

Pair of uints where the first element is min withdrawal value and the second is the withdrawal fee in Wei

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        0, 
        0
    ]
}
```

## Sidechain ERC20

### get\_erc20\_token\(eth\_addr\_or\_id\)

Returns information about erc20 token, if exist.

#### Parameters

| Option | Description |
| :--- | :--- |
| `string eth_addr_or_id` | the ethereum address of token in Ethereum network or the id in ECHO |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_erc20_token",
        [
            "8B5D021C528Cb0ADb9dA277D109c039dEdFd6871"
        ]
    ]
}

{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_erc20_token",
        [
            "1.16.156"
        ]
    ]
}
```

#### Returns

The public erc20 token data stored in the blockchain.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "1.17.0",
        "owner": "1.2.0",
        "eth_addr": "8B5D021C528Cb0ADb9dA277D109c039dEdFd6871",
        "contract": "1.11.0",
        "name": "erc20",
        "symbol": "ERC",
        "decimals": 0
    }
}
```

### check\_erc20\_token\(id\)

Return true if the contract exists and is ERC20 token contract registered by register_erc20_contract operation.

#### Parameters

| Option | Description |
| :--- | :--- |
| `contract_id_type id` | ID of the contract to get erc20 token |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "check_erc20_token",
        [
            "1.11.0"
        ]
    ]
}
```

#### Returns

true if the contract exists and is ERC20 token contract registered by register_erc20_contract operation, else false.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": true
}
```

### get\_erc20\_account\_deposits\(account\)

Returns all deposits, for the given account id.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account` | the id of the account to provide information about |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_erc20_account_deposits",
        [
            "1.2.0"
        ]
    ]
}
```

#### Returns

The all public erc20 deposits data stored in the blockchain.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.18.0",
            "account": "1.2.0",
            "erc20_addr": "8B5D021C528Cb0ADb9dA277D109c039dEdFd6871",
            "value": "1",
            "transaction_hash": "9742f2d928365be7591107b0d8afa701f24104acd8d5ecc32516dfab410f9c4e",
            "is_approved": true,
            "is_sent": false,
            "echo_block_number": 1654,
            "approves": []
        }
    ]
}
```

### get\_erc20\_account\_withdrawals\(account\)

Returns all approved withdrawals, for the given account id.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type account` | the id of the account to provide information about |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_erc20_account_withdrawals",
        [
            "1.2.0"
        ]
    ]
}
```

#### Returns

The all public erc20 withdrawals data stored in the blockchain.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.19.0",
            "withdraw_id": 0,
            "account": "1.2.0",
            "to": "1AFeEcE88325110488570146f2635C8615Ad0613",
            "erc20_token": "1.17.0",
            "value": "1",
            "is_approved": true,
            "is_sent": false,
            "echo_block_number": 1654,
            "approves": []
        }
    ]
}
```
