# Network Broadcast API

## broadcast\_transaction\(trx\)

Broadcast a transaction to the network.

The transaction will be checked for validity in the local database prior to broadcasting. If it fails to apply locally, an error will be thrown and the transaction will not be broadcast.

### Parameters

| Option | Description |
| :--- | :--- |
| `signed_transaction trx` | The transaction to broadcast |

### Example

**signed\_transaction** structure

```javascript
{
    "ref_block_num": "Least significant 16 bits from the reference block number. If
    relative_expiration is zero, this field must be zero as well.",
    "ref_block_prefix": "The first non-block-number 32-bits of the reference block ID.
    Recall that block IDs have 32 bits of block number followed by the actual block hash,
    so this field should be set using the second 32 bits in the block_id_type.",
    "expiration": "This field specifies the absolute expiration for this transaction.",
    "operations": [...],
    "signatures": [...]
}
```

### Returns

```javascript
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "c7546a1c355b914c610b897ae58ca0afdd87baca"
}
```

## broadcast\_transaction\_with\_callback\(cb, trx\)

This version of broadcast transaction registers a callback method that will be called when the transaction is included into a block. The callback method includes the transaction id, block number, and transaction number in the block.

### Parameters

| Option | Description |
| :--- | :--- |
| `confirmation_callback cb` | Transaction confirmation notifications with fields ID, block number, transaction number, processed transaction |
| `signed_transaction trx` | The transaction to broadcast |

### Returns

```javascript
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "c7546a1c355b914c610b897ae58ca0afdd87baca"
}
```

## broadcast\_transaction\_synchronous\(trx\)

Synchronous version of `broadcast_transaction_with_callback`.

### Parameters

| Option | Description |
| :--- | :--- |
| `signed_transaction trx` | The transaction to broadcast |


### Returns

```javascript
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "id": "c7546a1c355b914c610b897ae58ca0afdd87baca",
        "block_num": 1,
        "trx_num": 0,
        "trx": {
            "ref_block_num": 0,
            "ref_block_prefix": 450105350,
            "expiration": "2020-11-06T08:25:44",
            "operations": [[
                28,{
                    "fee": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "deposit_to_account": "1.2.15",
                    "balance_to_claim": "1.8.0",
                    "balance_owner_key": "ECHO5NaRTkq4uBAVGrZkD3jcTEdUxhxxJLU7hvt3p1zJyytc",
                    "total_claimed": {
                        "amount": "1000000000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
                ]
            ],
            "extensions": [],
            "signatures": [
                "916b2e3d172c2f7c5c2a39356cedef695c32570ddebd8f1eb457bd8000288e4a7afb13d3ea0f9e6980e5689b10d9da398420ab45654d97b7da407602f1dfd40e"
            ],
            "signed_with_echorand_key": false,
            "operation_results": [[
                0,{}
                ]
            ],
            "fees_collected": [{
                "amount": 0,
                "asset_id": "1.3.0"
                }
            ]
        }
    }
}
```

## broadcast\_block\(signed\_block\)

Broadcast a block to the network.

**signed\_block** structure

```javascript
{
    "previous": "previous-block-id",
    "round" : "round-id",
    "timestamp": "block-timestamp",
    "account" : "account-id",
    "transaction_merkle_root": "merkle-root",
    "vm_root": "vm-root-hash",
    "prev_signatures": "certificate signatures",
    "ed_signature": "eddsa signature",
    "rand": "rand",
    "cert": "certificate",
    "transactions": [...]
}
```

