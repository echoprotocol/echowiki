# Key Config API

Echo console lets you add multiple private keys to an encrypted file.

To enter this mode add the flag `--configure-keys` to Echo node.

On the first run, when keys file wasn't created yet, you would need to specify a password which will be used to encrypt future keys. This is done by calling `set_password` command and entering your secret passphrase. You can change your password using the same command. When the keys file is already generated password should be entered to unlock the keys file using the `set_password` command.

To add a new key, you would need to call either `add_echorand_key` or `add_sidechains_keys` command.

To exit the console, use the `exit`. In the case that you don't want to save any changes, use the `Ctrl-C` instead.

You can type help in Echo Console to get more information.

### `set_password key`
Set password to access to key configure.

| Option | Description |
| :--- | :--- |
| `string key` | The new password for key configure |
```
set_password your_pass
```

### `add_echorand_key acc_id key`
Add echorand key to key configure.

| Option | Description |
| :--- | :--- |
| `account_id_type acc_id` | The account for the key to be added. |
| `eddsa::private_key key` | The echorand key for the account to be added. |
```
add_echorand_key 1.2.20 5HwpXsbr189pLqgMjprA5xGvYXXGUQxtFr4KFTk4QfPdppaYBD7
```

### `add_sidechains_keys acc_id btc_key eth_key`
Add sidechain key to key configure.

| Option | Description |
| :--- | :--- |
| `account_id_type acc_id` | The Account for the key to be added. |
| `string btc_key` | The bitcoin key for the account to be added. Must be WIF compressed format. |
| `string eth_key` | The ethereum key for the account to be added. |
```
add_sidechains_keys 1.2.20 L1aW4aubDFB7yfras2S1mN3bqg9nwySY8nkoLmJebSLD5BWv3ENZ 2f0204146707c571c2db7bcf4a706f7b91b09b72e569374ca84fed395b2e897c
```

### `rm_echorand_key_by_account acc_id`
Remove echorand key by account from key configure.

| Option | Description |
| :--- | :--- |
| `account_id_type key` | The account whose echorand key will be removed. |
```
rm_echorand_key_by_account 1.2.20
```

### `rm_echorand_key_by_echo_key key`
Remove echorand key by key from key configure.

| Option | Description |
| :--- | :--- |
| `eddsa::private_key_t key` | The echorand key whose will be removed. |
```
rm_echorand_key_by_echo_key 5KHhuLpRqLJVW7Bj9WVdkuyfWTf9yJFiY8K4Dqga8htHVFkwyHo
```

### `rm_sidechains_keys_by_account acc_id`
Remove sidechain key by account from key configure.

| Option | Description |
| :--- | :--- |
| `account_id_type key` | The account whose sidechain key will be removed. |
```
rm_sidechains_keys_by_account 1.2.20
```

### `rm_sidechains_keys_by_btc key`
Remove sidechain key by bitcoin key from key configure.

| Option | Description |
| :--- | :--- |
| `string key` | The bitcoin key contained in the sidechain key whose will be removed. |
```
rm_sidechains_keys_by_btc L1aW4aubDFB7yfras2S1mN3bqg9nwySY8nkoLmJebSLD5BWv3ENZ
```

### `rm_sidechains_keys_by_eth key`
Remove sidechain key by ethereum key from key configure.

| Option | Description |
| :--- | :--- |
| `string key` | The ethereum key contained in the sidechain key whose will be removed. |
```
rm_sidechains_keys_by_eth d5ce0a11e8e38515e4099f5d34931ad0ca57cabf91abb893d09a00af8fef412c
```

### `list`
The list of all added accounts.

```
list
```

### `help`
The list of all exist commands and them descriptions.

```
help
```