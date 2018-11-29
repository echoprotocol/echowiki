# asset_settle_operation

Schedules a market-issued asset for automatic settlement

Holders of market-issued assests may request a forced settlement for some amount of their asset. This means that the specified sum will be locked by the chain and held for the settlement period, after which time the chain will choose a margin posision holder and buy the settled asset using the margin's collateral. The price of this sale will be based on the feed price for the market-issued asset being settled. The exact settlement price will be the feed price at the time of settlement with an offset in favor of the margin position, where the offset is a blockchain parameter set in the global_property_object.

The fee is paid by account, and account must authorize this operation

- `account` Account requesting the force settlement. This account pays the fee.
- `amount` Amount of asset to force settle. This must be a market-issued asset.

### JSON Example 

```json
[
  17,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account": "1.2.0",
    "amount": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "extensions": []
  }
]
```