# Proposals Operations

## proposal_create_operation

The proposal_create_operation creates a transaction proposal, for use in multi-sig scenarios.

Creates a transaction proposal. The operations which compose the transaction are listed in order in `proposed_ops`, and `expiration_time` specifies the time by which the proposal must be accepted or it will fail permanently. The `expiration_time` cannot be farther in the future than the maximum expiration time set in the global properties object.

```cpp
struct proposal_create_operation : public base_operation
{
   struct fee_parameters_type { 
      uint64_t fee            = 20 * ECHO_BLOCKCHAIN_PRECISION; 
      uint32_t price_per_kbyte = 10;
   };

   asset              fee;
   account_id_type    fee_paying_account;
   vector<op_wrapper> proposed_ops;
   time_point_sec     expiration_time;
   optional<uint32_t> review_period_seconds;

   extensions_type    extensions;

   /**
   * Constructs a proposal_create_operation suitable for committee
   * proposals, with expiration time and review period set
   * appropriately.  No proposed_ops are added.  When used to
   * create a proposal to change chain parameters, this method
   * expects to receive the currently effective parameters, not
   * the proposed parameters.  (The proposed parameters will go
   * in proposed_ops, and proposed_ops is untouched by this
   * function.)
   */
   static proposal_create_operation committee_proposal(const chain_parameters& param, fc::time_point_sec head_block_time );

   account_id_type fee_payer()const { return fee_paying_account; }
   void            validate()const;
   share_type      calculate_fee(const fee_parameters_type& k)const;
};
```

### JSON Example

```json
[
   16,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "fee_paying_account": "1.2.0",
      "expiration_time": "1970-01-01T00:00:00",
      "proposed_ops": [],
      "extensions": []
   }
]
```

## proposal_update_operation

The proposal_update_operation updates an existing transaction proposal.

This operation allows accounts to add or revoke approval of a proposed transaction. Signatures sufficient to satisfy the authority of each account in approvals are required on the transaction containing this operation.

If an account with a multi-signature authority is listed in approvals_to_add or approvals_to_remove, either all required signatures to satisfy that account's authority must be provided in the transaction containing this operation, or a secondary proposal must be created which contains this operation.

NOTE: If the proposal requires only an account's active authority, the account must not update adding its owner authority's approval. This is considered an error. An owner approval may only be added if the proposal requires the owner's authority.

If an account's owner and active authority are both required, only the owner authority may approve. An attempt to add or remove active authority approval to such a proposal will fail.

```cpp
struct proposal_update_operation : public base_operation
{
   struct fee_parameters_type { 
      uint64_t fee            = 20 * ECHO_BLOCKCHAIN_PRECISION; 
      uint32_t price_per_kbyte = 10;
   };

   account_id_type               fee_paying_account;
   asset                         fee;
   proposal_id_type              proposal;
   flat_set<account_id_type>     active_approvals_to_add;
   flat_set<account_id_type>     active_approvals_to_remove;
   flat_set<eddsa::public_key_t> key_approvals_to_add;
   flat_set<eddsa::public_key_t> key_approvals_to_remove;

   extensions_type               extensions;

   account_id_type fee_payer()const { return fee_paying_account; }
   void            validate()const;
   share_type      calculate_fee(const fee_parameters_type& k)const;
   void get_required_authorities( vector<authority>& )const;
   void get_required_active_authorities( flat_set<account_id_type>& )const;
};
```

### JSON Example

```json
[
   17,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "fee_paying_account": "1.2.0",
      "proposal": "1.5.0",
      "active_approvals_to_add": [],
      "active_approvals_to_remove": [],
      "key_approvals_to_add": [],
      "key_approvals_to_remove": [],
      "extensions": []
   }
]
```

## proposal_delete_operation

The proposal_delete_operation deletes an existing transaction proposal.

This operation allows the early veto of a proposed transaction. It may be used by any account which is a required authority on the proposed transaction, when that account's holder feels the proposal is ill-advised and he decides he will never approve of it and wishes to put an end to all discussion of the issue. Because he is a required authority, he could simply refuse to add his approval, but this would leave the topic open for debate until the proposal expires. Using this operation, he can prevent any further breath from being wasted on such an absurd proposal.

```cpp
struct proposal_delete_operation : public base_operation
{
   struct fee_parameters_type { uint64_t fee =  ECHO_BLOCKCHAIN_PRECISION; };

   account_id_type   fee_paying_account;
   bool              using_owner_authority = false;
   asset             fee;
   proposal_id_type  proposal;

   extensions_type   extensions;

   account_id_type fee_payer()const { return fee_paying_account; }
   void       validate()const;
};
```

### JSON Example

```json
[
   18,
   {
      "fee": {
         "amount": 0,
         "asset_id": "1.3.0"
      },
      "fee_paying_account": "1.2.0",
      "using_owner_authority": false,
      "proposal": "1.5.0",
      "extensions": []
   }
]
```