# Aggregation of participants

If you have several accounts it is often inconvenient to activate their keys in the node, since this causes adding new keys to the node configuration, as well as restarting the node.

The delegation mechanism described above can also be used to solve this problem. It is sufficient to authorize one account on the node and set it as delegate for other accounts

The steps to implement are as follows:

Suppose we have an account 1.2.514 and its private key - `5KcP5uiAByA14Koo8o9eYgoPEyB6A53n57MmGMsKaMqi7wKQYiA`.

Using `--account-info` parameter, we authorize this account on the node:

```bash
./echo_node --account-info="[\"1.2.514\", \"5KcP5uiAByA14Koo8o9eYgoPEyB6A53n57MmGMsKaMqi7wKQYiA\"]"
```

We can register multiple accounts. There are several ways to register an account. In the example below we will use the registration API provided by a different node.

First off,private and public keys will be required (keys can be generated in the following way):

```javascript
const {PrivateKey, ED25519} = require('echojs-lib');

const {privateKey} = ED25519.createKeyPair();

console.log('Private key:', PrivateKey.fromBuffer(privateKey).toWif());
console.log('Public key:', PrivateKey.fromBuffer(privateKey).toPublicKey().toPublicKeyString());
```

Example of output:

```
Private key: 5KMr5oyskAyn549FiCiXUekkNvWKxUzN7FxYCapP335V8ybU47y
Public key: ECHOAcdxnWHXa1XhGqqrJLXEBLDstVEaeGoBuTKq2u9Niyvp
```

We can create a new account using generated keys

```javascript
const {default: echo, constants} = require('echojs-lib');

const {
	WS_CONSTANTS: {
		DATABASE_API,
		NETWORK_BROADCAST_API,
		HISTORY_API,
		REGISTRATION_API,
		ASSET_API,
		LOGIN_API,
		NETWORK_NODE_API,
	}
} = constants;

const connect = async () => {
	await echo.connect('ws://echo-testnet-eu-1.echo-dev.io:6311', {
		apis: [
			DATABASE_API,
			NETWORK_BROADCAST_API,
			HISTORY_API,
			REGISTRATION_API,
			ASSET_API,
			LOGIN_API,
			NETWORK_NODE_API,
		]
	});
};

connect().then(async () => {
	const result = await echo.api.registerAccount(
		'testaccount',
		'ECHOAcdxnWHXa1XhGqqrJLXEBLDstVEaeGoBuTKq2u9Niyvp',
		'ECHOAcdxnWHXa1XhGqqrJLXEBLDstVEaeGoBuTKq2u9Niyvp',
		() => {}
	);
	console.log(result);
});
```

As a result, a new account will be registered. After receiving the account object, you can make sure that its `options.delegating_account` property is not empty. By default, the delegate is the account that registered it.

Using `ACCOUNT_UPDATE`, we can update this parameter to 1.2.514 - the account ID authorized on the node.

```javascript
const privateKey = PrivateKey.fromWif('5KMr5oyskAyn549FiCiXUekkNvWKxUzN7FxYCapP335V8ybU47y');
const newDelegatingAccount = '1.2.514';
const options = {
    fee: {asset_id: '1.3.0'},
    account: '1.2.516',
    new_options: {
        voting_account: '1.2.5',
        num_committee: 0,
        votes: [],
        delegating_account: newDelegatingAccount,
    }
};

echo.createTransaction()
    .addOperation(constants.OPERATIONS_IDS.ACCOUNT_UPDATE, options)
    .addSigner(privateKey)
    .broadcast()
    .then((result) => console.log(result))
    .catch(e => console.log(e));
```
After that, if there is a significant amount of Echo on `testaccount`’s balance, you can make sure that the account participates in consensus. For example, the account is selected as a block producer on a periodic basis. By stopping a node with an authorized parent account, you can make sure that the account does not participate in consensus.
