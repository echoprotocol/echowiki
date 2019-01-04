# proposal_update_operation

The proposal_update_operation updates an existing transaction proposal.

This operation allows accounts to add or revoke approval of a proposed transaction. Signatures sufficient to satisfy the authority of each account in approvals are required on the transaction containing this operation.

If an account with a multi-signature authority is listed in approvals_to_add or approvals_to_remove, either all required signatures to satisfy that account's authority must be provided in the transaction containing this operation, or a secondary proposal must be created which contains this operation.

NOTE: If the proposal requires only an account's active authority, the account must not update adding its owner authority's approval. This is considered an error. An owner approval may only be added if the proposal requires the owner's authority.

If an account's owner and active authority are both required, only the owner authority may approve. An attempt to add or remove active authority approval to such a proposal will fail.

### JSON Example

```json
[
  23,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "fee_paying_account": "1.2.0",
    "proposal": "1.10.0",
    "active_approvals_to_add": ["1.2.0"],
    "active_approvals_to_remove": ["1.2.0"],
    "owner_approvals_to_add": ["1.2.0"],
    "owner_approvals_to_remove": ["1.2.0"],
    "key_approvals_to_add": ["ECHO1111111111111111111111111111111114T1Anm"],
    "key_approvals_to_remove": ["ECHO1111111111111111111111111111111114T1Anm"],
    "extensions": []
  }
]
```