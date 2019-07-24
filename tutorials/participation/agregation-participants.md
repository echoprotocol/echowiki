# Aggregation of participants

Имея несколько аккаунтов зачастую является неудобным активировать их ключи в узле, так как это влечет добавление новых ключей в конфигурацию узла, а также его перезапуск.

Механизм делигирования, описанный выше, также может быть использован для решения данной проблемы.
Для этого достаточно авторизовать на узле один аккаунт и остальным аккаунтам делигировать выпуск сообщений на него.

Шаги реализации такого подхода будут следующие:

Предположим, мы имеем аккаунт `1.2.514` и приватный ключ от него - `5KcP5uiAByA14Koo8o9eYgoPEyB6A53n57MmGMsKaMqi7wKQYiA`.

Используя параметр `--account-info` авторизуем данный аккаунт на узле:

```bash
./echo_node --account-info="[\"1.2.514\", \"5KcP5uiAByA14Koo8o9eYgoPEyB6A53n57MmGMsKaMqi7wKQYiA\"]"
```

Мы можем зарегистрировать несколько аккаунтов.
Есть несколько способов зарегистрировать аккаунт. В примере ниже мы будем использовать registration API, предоставленное другим узлом.

В первую очередь поднадобится приватный и публичный ключ, которые могут быть сгенерированы следующим способом:

```javascript
const {PrivateKey, ED25519} = require('echojs-lib');

const {privateKey} = ED25519.createKeyPair();

console.log('Private key:', PrivateKey.fromBuffer(privateKey).toWif());
console.log('Public key:', PrivateKey.fromBuffer(privateKey).toPublicKey().toPublicKeyString());
```

Пример вывода:

```
Private key: 5KMr5oyskAyn549FiCiXUekkNvWKxUzN7FxYCapP335V8ybU47y
Public key: ECHOAcdxnWHXa1XhGqqrJLXEBLDstVEaeGoBuTKq2u9Niyvp
```

Использя полученные выше ключи можем создать аккаунт

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

В рузультате будет зарегистрирован новый аккаунт. Получив объект аккаунта можно убедиться, что у него не пустое свойство `options.delegating_account`. 
По умолчанию значением делегата является идентификатор аккаунта, который его зарегистрировал.

Используя `ACCOUNT_UPDATE` мы можем обновить это значение на `1.2.514` - ID аккаунта, авторизованного на узле.

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

После чего при наличии значительной суммы на аккаунте `testaccount` можно убедиться, что аккаунт участвует в консенсусе. 
К примеру - аккаунт периодически выбирается в роли продюсера блока.
Остановив узел с авторизованным родителем можно убедиться в том, что без запущенного узла родителя аккаунт не будет являться участником консенсуса.
