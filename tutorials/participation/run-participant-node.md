# Run node as a participant

Every user can opt to participate in the consensus. To do this, you must have a running node with an account or accounts authorized in it.

To start participating in EchoRand consensus, you should add the option --account-info="[\"account_id\", \"echorand_private_key\"]". Where account_id is ID of your account and echorand_private_key is the ED215519 key that you have been issued with.

```bash
./echo_node --rpc-endpoint="0.0.0.0:8090" --account-info="[\"1.2.514\", \"5KcP5uiAByA14Koo8o9eYgoPEyB6A53n57MmGMsKaMqi7wKQYiA\"]"
```

`--account-info` argument can be used multiple times to give the node access to numerous accounts.

{% hint style="info" %}

You can also specify the private key(s) in the [configuration file](https://github.com/echoprotocol/echowiki/tree/baca73a3ccc555edddbb68c221cbf5d08bbde51a/how-to/advanced/config.md).

{% endhint %}

Starting from version 0.9.0, private keys can be specified via Echo console. This allows you to use private keys in a more secure manner since the keys are saved to a file in an encrypted format and a password must be provided to decrypt and use them.
