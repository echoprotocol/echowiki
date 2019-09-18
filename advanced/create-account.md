# Create Account

There are three ways to create an Echo account:

* Using the Echo desktop wallet.
* Using a public registrar via API.
* Using an existing account.

The easiest way to create your first account is with the echo desktop wallet. When you follow this tutorial, the wallet will automatically create and register an account for you.

{% page-ref page="../how-to/download-an-echo-wallet.md" %}

If you don't wish to download the desktop wallet, you can use the RPC API of a public registrar's node. To register through a public registrar, you must use the appropriate API method.

Details of the request can be found here: [https://dev.echo.org/developers/apis/registration-api/](https://dev.echo.org/developers/apis/registration-api/).

Finally, if you already have at least one registered account, you can register a new account by yourself by sending an account creation operation to the blockchain: [https://dev.echo.org/developers/operations/account\_management/\_account\_create\_operation/](https://dev.echo.org/developers/operations/account_management/_account_create_operation/)

## Account Name Requirements

A valid account name consists of a dot-separated sequence of one or more labels, according to the following rules:

* Each label begins with a letter.
* Each label ends with a letter, or digit.
* Each label contains only letters, digits, or hyphens.

We also require the following:

* All letters are lowercase
* Length is between \(inclusive `ECHO_MIN_ACCOUNT_NAME_LENGTH` \(set by default to `1`\) and `ECHO_MAX_ACCOUNT_NAME_LENGTH` \(set by default to `63`\).
