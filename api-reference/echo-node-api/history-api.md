History API
===========

#### get_account_history(account, stop, limit = 100, start)

Get operations relevant to the specificed account.

##### Parameters

- *account* the account whose history should be queried
- *stop* ID of the earliest operation to retrieve
- *limit* maximum number of operations to retrieve (must not exceed 100)
- *start* ID of the most recent operation to retrieve

##### Returns

A list of operations performed by account, ordered from most recent to oldest.


#### get_relative_account_history(account, stop = 0, limit = 100, start = 0)

Get operations relevant to the specified account referenced by an event numbering specific to the account.
The current number of operations for the account can be found in the account statistics (or use 0 for start).

##### Parameters

- *account* The account whose history should be queried
- *stop* Sequence number of earliest operation. 0 is default and will query 'limit' number of operations.
- *limit* Maximum number of operations to retrieve (must not exceed 100)
- *start* Sequence number of the most recent operation to retrieve. 0 is default, which will start querying from the most recent operation.

##### Returns

A list of operations performed by account, ordered from most recent to oldest.

#### get_account_history_operations(account, operation_id, start, stop, limit = 100)

Get only asked operations relevant to the specified account.

##### Parameters
- *account*	The account whose history should be queried
- *operation_id* The ID of the operation we want to get operations in the account( 0 = transfer , 1 = limit order create, ...)
- *stop* ID of the earliest operation to retrieve
- *limit* Maximum number of operations to retrieve (must not exceed 100)
- *start* ID of the most recent operation to retrieve

##### Returns

A list of operations performed by account, ordered from most recent to oldest.

#### get_contract_history(contract, stop, limit, start)

Get operations relevant to the specificed contract.

##### Parameters

- *account* The contract whose history should be queried
- *stop* ID of the earliest operation to retrieve
- *limit* Maximum number of operations to retrieve (must not exceed 100)
- *start* ID of the most recent operation to retrieve

##### Returns

A list of operations performed by contract, ordered from most recent to oldest.
