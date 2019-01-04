# blind_transfer_operation

Transfers from blind to blind.

There are two ways to transfer value while maintaining privacy:
1. account to account with amount kept secret
2. stealth transfers with amount sender/receiver kept secret

When doing account to account transfers, everyone with access to the memo key can see the amounts, but they will not have access to the funds.
When using stealth transfers the same key is used for control and reading the memo.
This operation is more expensive than a normal transfer and has a fee proportional to the size of the operation.

All assets in a blind transfer must be of the same type: `fee.asset_id`.
The fee_payer is the temp account and can be funded from the blinded values.
Using this operation you can transfer from an account and/or blinded balances to an account and/or blinded balances.

### JSON Example

```json
[
  40,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "inputs": [],
    "outputs": []
  }
]
```