# Generate Address

## General Description

The payment identification mechanism in Echo is implemented by creating unique addresses for a single account. This enables receiving payments to a single account, providing users with different addresses to identify them or identify the product/object this payment is related to.

Generated addresses are an alias for an account and are regarded by the network as transfers between the sender and the recipient’s account who owns this address. Addresses can only be used to receive payments and cannot be used to send outgoing payments.

## API Methods and Operations

### Generation

To generate an address, the `account_address_create_operation` must be sent from the account you want to create a new address for. Using this operation, you can specify a `label` - a string value that will be bound to the generated address.

IMPORTANT: the `label` associated with the address will be seen by all members of the network and is not a private information.

### List All Addresses

In order to get the list of addresses for the account, use the API method `get_account_addresses(account_id,from,limit)`. The method will return all the addresses associated with the account and their labels if they were specified.

### Find an Account by Its Address

Use the API method `get_account_by_address(address)` to find an account by its address.

