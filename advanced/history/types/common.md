# Types

## operation_history_object

Tracks the history of all logical operations on blockchain state.

All operations and virtual operations result in the creation of an operation_history_object that is maintained on disk as a stack. Each real or virtual operation is assigned a unique ID / sequence number that it can be referenced by.

Note:
   * by default these objects are not tracked, the plugin must be loaded fore these objects to be maintained.
   * this object is READ ONLY it can never be modified

```cpp
class operation_history_object
{
   public:
      operation         op;
      operation_result  result;
      /** the block that caused this operation */
      uint32_t          block_num = 0;
      /** the transaction in the block */
      uint16_t          trx_in_block = 0;
      /** the operation within the transaction */
      uint16_t          op_in_trx = 0;
      /** any virtual operations implied by operation in block */
      uint16_t          virtual_op = 0;

      extensions_type   extensions;
};
```

## account_transaction_history_object

A node in a linked list of operation_history_objects.

```cpp
class account_transaction_history_object
{
   public:
      account_id_type           account; /// the account this operation applies to
      operation_history_id_type operation_id;
      uint64_t                  sequence = 0; /// the operation position within the given account
      account_transaction_history_id_type next;

      extensions_type extensions;
};
```

## contract_history_object

Description is similar [account\_transaction\_history\_object](common.md#account_transaction_history_object).

```cpp
class contract_history_object
{
   public:
      contract_id_type          contract; /// the contract this operation applies to
      operation_history_id_type operation_id;
      uint64_t                  sequence = 0; /// the operation position within the given contract
      contract_history_id_type  next;

      extensions_type           extensions;
};
```