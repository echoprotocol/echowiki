# Create Account

There are two options to create an Echo account:

* Using a public registrar.
* Using an existing account.

In the first case, you will use the RPC API of the public registrar's node. To register through a public registrar, you must use the appropriate API method.

Details of the request you can find here: [https://dev.echo.org/developers/apis/registration-api/](https://dev.echo.org/developers/apis/registration-api/).

Alternatively, using an existing account, you can register a new account by yourself by sending an account creation operation to the blockchain: [https://dev.echo.org/developers/operations/account\_management/\_account\_create\_operation/](https://dev.echo.org/developers/operations/account_management/_account_create_operation/)

You can also use the Echo desktop wallet. For example, Echo Blip Wallet provides both of the registration options.

## Account Name Requirements

A valid account name consists of a dot-separated sequence of one or more labels, according to the following rules:

* Each label is three characters or more.
* Each label begins with a letter.
* Each label ends with a letter, or digit.
* Each label contains only letters, digits, or hyphens.

We also require the following:

* All letters are lowercase
* Length is between \(inclusive `ECHO_MIN_ACCOUNT_NAME_LENGTH` \(set by default to `1`\) and `ECHO_MAX_ACCOUNT_NAME_LENGTH` \(set by default to `63`\).

