# limit_order_cancel_operation

Used to cancel an existing limit order. Both fee_pay_account and the account to receive the proceeds must be the same as order->seller.

Returns the amount actually refunded.

### JSON Example

```json
[
  2,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "fee_paying_account": "1.2.0",
    "order": "1.7.0",
    "extensions": []
  }
]
```