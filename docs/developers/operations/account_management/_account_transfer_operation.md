# account_transfer_operation

transfers the account to another account while clearing the white list

In theory an account can be transferred by simply updating the authorities, but that kind of transfer lacks semantic meaning and is more often done to rotate keys without transferring ownership. This operation is used to indicate the legal transfer of title to this account and a break in the operation history.

The account_id's owner/active/voting/memo authority should be set to new_owner

This operation will clear the account's whitelist statuses, but not the blacklist statuses.

### JSON Example

```json
[
  9,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "account_id": "1.2.0",
    "new_owner": "1.2.0",
    "extensions": []
  }
]
```