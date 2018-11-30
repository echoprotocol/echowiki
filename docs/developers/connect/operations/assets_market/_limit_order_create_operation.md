# limit_order_create_operation

Instructs the blockchain to attempt to sell one asset for another.

The blockchain will atempt to sell amount_to_sell.asset_id for as much min_to_receive.asset_id as possible.  The fee will be paid by the seller's account.  Market fees will apply as specified by the issuer of both the selling asset and the receiving asset as a percentage of the amount exchanged. If either the selling asset or the receiving asset is white list restricted, the order will only be created if the seller is on the white list of the restricted asset type. Market orders are matched in the order they are included in the block chain.

### JSON Example

```json
[
  1,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "seller": "1.2.0",
    "amount_to_sell": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "min_to_receive": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "expiration": "2106-02-07T06:28:15",
    "fill_or_kill": false,
    "extensions": []
  }
]
```