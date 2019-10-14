# Register account
## Generate key pair
To create account you need to generate new private key. This can be easily done with `create_eddsa_keypair` command which will output public and private keys respectively.

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
### Setup for registrar's node
Enable `registration` plugin and specify `registrar-account`.

`registrar-account` is the ID of account on this node whose private key should imported with `account-info`. They would accept registration request and create transaction to register new accounts.

In this example we will use `nathan` (`1.2.15`) account as our registrar.

{% tabs %}
{% tab title="CLI" %}
```bash
./echo_node \
    --plugins account_history,echorand,registration \
    --registrar-account \"1.2.15\" \
    --account-info [\"1.2.15\","5JjHQ1GqTbqVZLdTB3QRqcUWA6LezqA65iPJbq5craE6MRc4u9K"]
```
{% endtab %}

{% tab title="Config file" %}
```ini
# datadir/config.ini
plugins = account_history,echorand,registration
registrar-account = "1.2.15"
account-info = ["1.2.15", "5JjHQ1GqTbqVZLdTB3QRqcUWA6LezqA65iPJbq5craE6MRc4u9K"]
```
{% endtab %}
{% endtabs %}

Registrar account should have some CORE asset balance to send transactions. On private devnet you can import balance if it's not imported yet.

```
import_key nathan
5JjHQ1GqTbqVZLdTB3QRqcUWA6LezqA65iPJbq5craE6MRc4u9K
import_balance nathan true
[5JjHQ1GqTbqVZLdTB3QRqcUWA6LezqA65iPJbq5craE6MRc4u9K]
```

### Sending request
Firstly you need to connect your wallet to the node with enabled registation API. When this is done you can send a registration request.

Method `register_account_with_api` accepts new account's name, active public key and echorand public key.

In this example we will request to register `foobar` account with `ECHOHFABt7AMmNdQT3bPDSfSLCDmUTddxFmaWp81CNQaCqKc` public keys.

> `register_account_with_api <new account name> <active public key> <echorand public key>`

```
register_account_with_api foobar ECHOHFABt7AMmNdQT3bPDSfSLCDmUTddxFmaWp81CNQaCqKc ECHOHFABt7AMmNdQT3bPDSfSLCDmUTddxFmaWp81CNQaCqKc
```

# Import account
When new account created or you want to add it to another wallet you need to import it to the wallet.

> `import_key <name> <private key>`

```
import_key foobar
5JonrZyVnEVYZGDWykH8KAMSkq2qULNtW6agCuWgAApgHh8QNQk
```