# Running echo_node

>bin/echo_node -s 195.201.164.54:6310 --echorand --account-info=[account_id, WIF_private_key]

`-s 195.201.164.54:6310` option is required to connect to current test network

`--echorand` is required to start with echorand consensus

To start participating in consensus you should add option `--account-info=[account_id, EDDSA_private_key]`. Where `account_id` is ID of your account and `EDDSA_private_key` is ed215519 key that you registered with

See `-h` for more details