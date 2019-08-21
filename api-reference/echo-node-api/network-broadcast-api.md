# Network broadcast API

### broadcast_transaction(trx)

Broadcast a transaction to the network.

The transaction will be checked for validity in the local database prior to broadcasting. If it fails to apply locally, an error will be thrown and the transaction will not be broadcast.

#### Parameters

| Option                   | Description                  |
|--------------------------|:-----------------------------|
| `signed_transaction trx` | The transaction to broadcast |

#### Example

**signed_transaction** structure

```json
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

### broadcast_transaction_with_callback(cb, trx)

This version of broadcast transaction registers a callback method that will be called when the transaction is included into a block.
The callback method includes the transaction id, block number, and transaction number in the block.

#### Parameters

| Option                     | Description                                                                                                    |
|----------------------------|:---------------------------------------------------------------------------------------------------------------|
| `confirmation_callback cb` | Transaction confirmation notifications with fields ID, block number, transaction number, processed transaction |
| `signed_transaction trx`   | The transaction to broadcast                                                                                   |

### broadcast_transaction_synchronous(trx)

Synchronious version of `broadcast_transaction_with_callback`.

#### Parameters

| Option                   | Description                  |
|--------------------------|:-----------------------------|
| `signed_transaction trx` | The transaction to broadcast |

### broadcast_block(signed_block)

Broadcast a block to the network.

**signed_block** structure

```json
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