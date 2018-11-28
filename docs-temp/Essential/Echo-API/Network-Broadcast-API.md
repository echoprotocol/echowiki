Network broadcast API
=====================

## broadcast_transaction(signed_transaction)

Broadcast a transaction to the network.

The transaction will be checked for validity in the local database prior to broadcasting. If it fails to apply locally, an error will be thrown and the transaction will not be broadcast.

### Parameters

signed_transaction has the following structure:
```
{
    ref_block_num: "Least significant 16 bits from the reference block number. If
    relative_expiration is zero, this field must be zero as well.",

    ref_block_prefix: "The first non-block-number 32-bits of the reference block ID.
    Recall that block IDs have 32 bits of block number followed by the actual block hash,
    so this field should be set using the second 32 bits in the block_id_type",

    expiration: absolute-expiration-of-the-transaction,

    operations: [...],
    signatures: [...]
}
```

## broadcast_block(signed_block)

Broadcast a block to the network.

### Parameters

signed_block has the following structure:

```
{
    previous: previous-block-id,
    timestamp: block-timestamp,
    witness: "witness-id",
    transaction_merkle_root: "merkle-root",
    state_root_hash: "hash",
    result_root_hash: "result-hash",
    witness_signature: "sig",
    ed_signature: "eddsa signature",
    verifications: [{witness-id, witness-signature}, ...],
    round: round-id,
    rand: rand,
    cert: "certificate",
    transactions: [ ... ]
}
```

## broadcast_transaction_synchronous (trx)

Synchronious version of ~broadcast_transaction~


## broadcast_transaction_with_callback(callback, trx )

This version of broadcast transaction registers a callback method that will be called when the transaction is included into a block.
The callback method includes the transaction id, block number, and transaction number in the block.
