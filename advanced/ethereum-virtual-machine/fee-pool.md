# Smart Contract Fee Pool

## General Description

**Smart Contract Fee Pool** is a mechanism that allows users of a
contract-based app to use contract calls at the expense of the pool
balance that is replenished by someone else. In one case, it could be
the owner of the contract and the app itself. This mechanism enables to
minimize the threshold for new users running the app, allowing to
eliminate the stage when in order to use the contract, the user must
first make sure of a non-zero balance on one of the assets by which the
commission fee can be paid. In particular, this problem stands out the
most when using ERC20 tokens. In this case in order to transfer a token,
the user needs to have an additional balance. 

## Operations Description

### Balance replenishment - `contract_fund_fee_pool_operation`

By using this operation, any network user has the ability to replenish
the contract balance pool. This operation is irreversible - the balance
transferred to this contract pool can be spent only when calling the
contract. It is impossible to recover (withdraw) the balance from the
pool. 

A contract pool can only be replenished in Echo.

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

### Whitelisting and Blacklisting: `contract_whitelist_operation`

The contract has a whitelist and a blacklist. These are lists of
accounts edited by the owner of the contract. In the case when at least
one account has been added to the whitelist, sending transactions
through the fee pool will be available only to the accounts added to the
whitelist. If the whitelist is empty, any network account can use the
contract's fee pool.

Accounts added to the blacklist cannot use this contract for free, even
if there is a non-zero balance on the fee pool. 

The contract_whitelist_operation allows to add an account to one of
these lists, or exclude it from both of them. Only the owner of the
contract (the account that created it) has access to the
contract_whitelist_operation.

## API Methods Description

### Returning the Whitelist and Blacklist: `get_contract_pool_whitelist`

The [get_contract_pool_whitelist](/api-reference/echo-node-api/database-api.md#get_contract_pool_balance-id) method returns both the whitelist and
blacklist for the specified contract. 

### Returning the Fee Pool Balance: `get_contract_pool_balance`

The [get_contract_pool_balance](/api-reference/echo-node-api/database-api.md#get_contract_pool_whitelist-id) method returns the current fee pool
balance for the specified contract.
