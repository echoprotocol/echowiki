# How to: How can I register an account on Echo?

## Generate key pair
To create account you need to generate new set of public and private keys. This can be easily done with `create_eddsa_keypair` command which will output public and private keys respectively.

```
create_eddsa_keypair 
[
  "ECHOHFABt7AMmNdQT3bPDSfSLCDmUTddxFmaWp81CNQaCqKc",
  "5JonrZyVnEVYZGDWykH8KAMSkq2qULNtW6agCuWgAApgHh8QNQk"
]
```

## Via owned account
If you have access to account with some balance, then you can register new ones by yourself.

In this example we will request to register `foobar` account with `ECHOHFABt7AMmNdQT3bPDSfSLCDmUTddxFmaWp81CNQaCqKc` public keys.

> `register_account <new account name> <public key> <registrar account> true`

```
register_account foobar ECHOHFABt7AMmNdQT3bPDSfSLCDmUTddxFmaWp81CNQaCqKc nathan true
```

## Via registrar
If you are connected to node with registrations service set up, you can send a free registration request with `register_account_with_api` command.

`register_account_with_api` accepts new account's name, active public key and echorand public key.

In this example we will request to register `foobar` account with `ECHOHFABt7AMmNdQT3bPDSfSLCDmUTddxFmaWp81CNQaCqKc` public keys.

> `register_account_with_api <new account name> <active public key> <echorand public key>`

```
register_account_with_api foobar ECHOHFABt7AMmNdQT3bPDSfSLCDmUTddxFmaWp81CNQaCqKc ECHOHFABt7AMmNdQT3bPDSfSLCDmUTddxFmaWp81CNQaCqKc
```

## Via import
If you already have an account, then you can simply import it to your wallet with private key.

`import_key` accepts account name and account's private key. 

> `import_key <account_name> <private_key>`. 
The `<private_key>` will need to be entered in a separate line after the prompt

```
import_key nathan
5JonrZyVnEVYZGDWykH8KAMSkq2qULNtW6agCuWgAApgHh8QNQk
```

### Importing balance
If you have initial balance embed into genesis you can import it to your account. This can be done with `import_balance` which accepts recipient account name and private keys of initial balances.

> `import_balance <recipient_account_name> true [<private_keys>]`. 
The array with keys `[<private_keys>]` related to `<recipient_account_name>` will need to be entered in a separate line after the prompt.

```
import_balance nathan true
[5JonrZyVnEVYZGDWykH8KAMSkq2qULNtW6agCuWgAApgHh8QNQk]
```

### Private devnet test account
On devnet you can import test account with balance if it's not imported yet.

```
import_key nathan
5JjHQ1GqTbqVZLdTB3QRqcUWA6LezqA65iPJbq5craE6MRc4u9K
import_balance nathan true
[5JjHQ1GqTbqVZLdTB3QRqcUWA6LezqA65iPJbq5craE6MRc4u9K]
```
