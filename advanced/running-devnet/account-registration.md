# Account registration

This section will describe how to enable Registration API on your node.

Usage example can be found in the ["Get Started" section](/how-to/registration-&-node-launch/register-account.md).

## Setup for registrar's node
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

Registrar account should have some ECHO asset balance to send registration transaction. 
