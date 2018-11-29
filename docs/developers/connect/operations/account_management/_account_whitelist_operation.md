# account_whitelist_operation

This operation is used to whitelist and blacklist accounts, primarily for transacting in whitelisted assets

Accounts can freely specify opinions about other accounts, in the form of either whitelisting or blacklisting them. This information is used in chain validation only to determine whether an account is authorized to transact in an asset type which enforces a whitelist, but third parties can use this information for other uses as well, as long as it does not conflict with the use of whitelisted assets.

An asset which enforces a whitelist specifies a list of accounts to maintain its whitelist, and a list of accounts to maintain its blacklist. In order for a given account A to hold and transact in a whitelisted asset S, A must be whitelisted by at least one of S's whitelist_authorities and blacklisted by none of S's blacklist_authorities. If A receives a balance of S, and is later removed from the whitelist(s) which allowed it to hold S, or added to any blacklist S specifies as authoritative, A's balance of S will be frozen until A's authorization is reinstated.

This operation requires authorizing_account's signature, but not account_to_list's. The fee is paid by authorizing_account.

### JSON Example

```json
[
  7,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "authorizing_account": "1.2.0",
    "account_to_list": "1.2.0",
    "new_listing": 0,
    "extensions": []
  }
]
```