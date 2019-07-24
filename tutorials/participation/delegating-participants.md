# Delegation of participation

Аккаунт может делигировать отправку сообщений от своего имени другому аккаунту. 
Это означает, что вторым вариантом участия в консненсусе является делегация - делегировав право выпуска сообщений аккаунту, который авторизован на узле, вы сможете получать часть награды за сообщение, которое было выпущено от имени вашего аккаунта.

Узнать идентификатор аккаунта, кому делегирован выпуск, можно получив объект аккаунта. 
Идентификатор будет находится по пути `options.delegating_account`.

{% tabs %}
{% tab title="CLI Wallet" %}

```
unlocked >>> get_account myacc
{
  "id": "1.2.503",
  "membership_expiration_date": "1970-01-01T00:00:00",
  "registrar": "1.2.8",
  "referrer": "1.2.8",
  "lifetime_referrer": "1.2.8",
  "network_fee_percentage": 2000,
  "lifetime_referrer_fee_percentage": 3000,
  "referrer_rewards_percentage": 7500,
  "name": "myacc",
  "active": {
    "weight_threshold": 1,
    "account_auths": [],
    "key_auths": [[
        "ECHOB3uKK5kjHrKSszvxpCjrHf9yMzXEfWXwyWmHyFENaVux",
        1
      ]
    ]
  },
  "echorand_key": "ECHOB3uKK5kjHrKSszvxpCjrHf9yMzXEfWXwyWmHyFENaVux",
  "options": {
    "voting_account": "1.2.5",
    "delegating_account": "1.2.8",
    "num_committee": 0,
    "votes": [],
    "extensions": []
  },
  "statistics": "2.6.503",
  "whitelisting_accounts": [],
  "blacklisting_accounts": [],
  "whitelisted_accounts": [],
  "blacklisted_accounts": [],
  "active_special_authority": [
    0,{}
  ],
  "top_n_control_flags": 0,
  "extensions": []
}
unlocked >>>
```
{% endtab %}

{% tab title="echojs-lib" %}
```javascript
const { default: echo } = require('echojs-lib');

const connect = async () => {
	await echo.connect('ws://127.0.0.1:6311');
};

connect().then(async () => {
    const account = await echo.api.getAccountByName('myacc');
    console.log(account);
});
```

```json
{
  "id": "1.2.503",
  "membership_expiration_date": "1970-01-01T00:00:00",
  "registrar": "1.2.8",
  "referrer": "1.2.8",
  "lifetime_referrer": "1.2.8",
  "network_fee_percentage": 2000,
  "lifetime_referrer_fee_percentage": 3000,
  "referrer_rewards_percentage": 7500,
  "name": "myacc",
  "active": {
    "weight_threshold": 1,
    "account_auths": [],
    "key_auths": [
      [
        "ECHOB3uKK5kjHrKSszvxpCjrHf9yMzXEfWXwyWmHyFENaVux",
        1
      ]
    ]
  },
  "echorand_key": "ECHOB3uKK5kjHrKSszvxpCjrHf9yMzXEfWXwyWmHyFENaVux",
  "options": {
    "voting_account": "1.2.5",
    "delegating_account": "1.2.8",
    "num_committee": 0,
    "votes": [],
    "extensions": []
  },
  "statistics": "2.6.503",
  "whitelisting_accounts": [],
  "blacklisting_accounts": [],
  "whitelisted_accounts": [],
  "blacklisted_accounts": [],
  "active_special_authority": [
    0,
    {}
  ],
  "top_n_control_flags": 0,
  "extensions": []
}
```

{% endtab %}

{% endtabs %}

Из информации, полученной выше, следует, что аккаунт `1.2.8` может выпускать сообщения от имени аккаунта `1.2.503`.

Идентификатор делегата может быть изменен:

```javascript
const privateKey = PrivateKey.fromWif(YOUR_WIF);
const newDelegatingAccount = '1.2.500';
const options = {
    fee: {asset_id: '1.3.0'},
    account: '1.2.503',
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
    .broadcast();
```

В результате аккаунт, которому будет делигировано выпускать сообщения - аккаунт с ID `1.2.500`.
