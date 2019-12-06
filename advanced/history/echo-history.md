# Echo history

Two types of history are supported for contracts and accounts. The history mechanism for contracts and accounts is similar.

The object responsible for the history of accounts is [account\_transaction\_history\_object](types/common.md#account_transaction_history_object) for contract [contract\_history\_object](types/common.md#contract_history_object).

Account(contract) history is important for users and wallets even though it is not part of "core validation". Account(contract) history is maintained as a linked list stored on disk in a stack. Each account(contract) will point to the most recent account history object by ID.  When a new operation relativent to that account is processed a new account history object is allcoated at the end of the stack and intialized to point to the prior object.

This data is never accessed as part of chain validation and therefore can be kept on disk as a memory mapped file. Using a memory mapped file will help the operating system better manage / cache / page files and also accelerates load time.

When the transaction history for a particular account is requested the linked list can be traversed with relatively effecient disk access because of the use of a memory mapped stack.
