# Asset Fee Pool

## General Description

Issuers may optionally maintain a Fee Pool. The Fee Pool is a pool of ECHO and an exchange rate at which the issued asset may be converted into ECHO. When a user wishes to pay a network fee with the asset, the fee pool will step in to convert the asset into ECHO at the rate that the issuer has specified. This means that issuers may charge a premium every time users opt to use their asset to pay network fees rather than paying them directly with ECHO.

## Operations Description

### Balance replenishment - `asset_fund_fee_pool_operation`

By using this operation, any network user has the ability to replenish the asset fee pool balance. This operation is irreversible - the balance transferred to this asset fee pool can be spent only when having paid a commission in this asset when sending transactions on the network. It is impossible to recover (withdraw) the balance from the pool. 

An asset fee pool can only be replenished in Echo.

If there is a non-zero balance on the pool, the `get_required_fees` 
request will return an object having the fee and user fee.

```
Example1: 
If the commission fee is 0.1 echo and the pool holds 0.1 echo
Object1: fee = 0.1 echo, user fee = 0 echo.

Example2:
If the commission fee is 1 echo and the pool holds 0.98 echo
Object2: fee = 1 echo, user fee = 0.02 echo.
```

### Whitelisting and Blacklisting: `account\_whitelist\_operation`

Accounts can freely specify opinions about other accounts, in the form of either whitelisting or blacklisting them. This information is used in chain validation only to determine whether an account is authorized to transact in an asset type which enforces a whitelist, but third parties can use this information for other uses as well, as long as it does not conflict with the use of whitelisted assets.

An asset which enforces a whitelist specifies a list of accounts to maintain its whitelist, and a list of accounts to maintain its blacklist. In order for a given account A to hold and transact in a whitelisted asset S, A must be whitelisted by at least one of S's whitelist\_authorities and blacklisted by none of S's blacklist\_authorities. If A receives a balance of S, and is later removed from the whitelist\(s\) which allowed it to hold S, or added to any blacklist S specifies as authoritative, A's balance of S will be frozen until A's authorization is reinstated.d