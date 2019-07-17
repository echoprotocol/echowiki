# Create Account

## Options of account creation

There are 2 options to create an account in Echo network:

* use public registrar
* use your account

In the first case, you will use the RPC API of the node running by someone, who provided the opportunity to register accounts through it. To register through a public registrar, you must use the appropriate api method. Details of the request you can find here - [https://dev.echo.org/developers/apis/registration-api/](https://dev.echo.org/developers/apis/registration-api/).

Also, if you already have an account, you can register a new account yourself by sending an account creation operation to the blockchain. [https://dev.echo.org/developers/operations/account\_management/\_account\_create\_operation/](https://dev.echo.org/developers/operations/account_management/_account_create_operation/)

You can also use the desktop wallet. For example, Blip Wallet allows you to use both registry options.

## Name requirements

A valid name consists of a dot-separated sequence of one or more labels consisting of the following rules:

* Each label is three characters or more
* Each label begins with a letter
* Each label ends with a letter or digit
* Each label contains only letters, digits or hyphens

In addition, we require the following:

* All letters are lowercase
* Length is between \(inclusive\) `ECHO_MIN_ACCOUNT_NAME_LENGTH` \(now = 1\)

  and `ECHO_MAX_ACCOUNT_NAME_LENGTH` \(now = 63\) 

