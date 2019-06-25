# proposal_delete_operation

The proposal_delete_operation deletes an existing transaction proposal.

This operation allows the early veto of a proposed transaction. It may be used by any account which is a required authority on the proposed transaction, when that account's holder feels the proposal is ill-advised and he decides he will never approve of it and wishes to put an end to all discussion of the issue. Because he is a required authority, he could simply refuse to add his approval, but this would leave the topic open for debate until the proposal expires. Using this operation, he can prevent any further breath from being wasted on such an absurd proposal.

### JSON Example

```json
[
  22,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "fee_paying_account": "1.2.0",
    "using_owner_authority": false,
    "proposal": "1.10.0",
    "extensions": []
  }
]
```