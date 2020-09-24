# How to: Deposit and withdraw sidechain ERC20

Прежде всего вам нужно создать токен на стороне Ethereum. Затем его нужно зарегистрировать в сети Echo. Для этого надо вызывать метод [register_erc20_token](/api-reference/echo-wallet-api/README.md#register_erc20_token-account-eth_addr-name-symbol-decimals-broadcast).

```bash
unlocked >>> register_erc20_token 1.2.26 e3e87ec35500a8e2eed1d1be2e2da1b7a8101aa9 TestToken tToken 6 true
{
  "ref_block_num": 71,
  "ref_block_prefix": 3321012214,
  "expiration": "2020-09-24T13:58:20",
  "operations": [[
      50,{
        "fee": {
          "amount": 500500,
          "asset_id": "1.3.0"
        },
        "account": "1.2.26",
        "eth_addr": "E3E87ec35500a8E2eeD1d1Be2E2dA1B7A8101aa9",
        "name": "TestToken",
        "symbol": "tToken",
        "decimals": 6,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "00cbeb44072ff7d317bf95e8523ca7bab120c5289677e662ebcdf7621709d5b12c0924e90fa9548f08c1b1f5e8895d8b3b34a702eb02292c3e5da48478ad6001"
  ],
  "signed_with_echorand_key": false
}
```

Проверить, что токен успешно зарегестрирован, можно методами [get_erc20_token](/api-reference/echo-wallet-api/README.md#get_erc20_token-eth_addr_or_id) и [check_erc20_token](/api-reference/echo-wallet-api/README.md#check_erc20_token-id).

```bash
unlocked >>> check_erc20_token 1.11.0
true
unlocked >>> get_erc20_token e3e87ec35500a8e2eed1d1be2e2da1b7a8101aa9
{
  "id": "1.16.0",
  "owner": "1.2.26",
  "eth_addr": "E3E87ec35500a8E2eeD1d1Be2E2dA1B7A8101aa9",
  "contract": "1.11.0",
  "name": "TestToken",
  "symbol": "tToken",
  "decimals": 6,
  "extensions": []
}
```

## Deposit

После того как токен зарегестрирован, необходимо создать депозит адрес. Об этом можно почитать в документе о [Ethereum Sidechain](deposit-and-withdraw-sidechain-eth.md). После чего необходимо перевести токены на полученный депозит адрес. 

Средства дойдут на ваш аккаунт после того, как получат достаточное количество подтверждений.

Также вы можете наблюдать все ваши ERC20 депозиты методом [get_erc20_account_deposits](/api-reference/echo-wallet-api/README.md#get_erc20_account_deposits-account).

```bash
unlocked >>> get_erc20_account_deposits 1.2.26
[{
    "id": "1.17.0",
    "account": "1.2.26",
    "erc20_addr": "E3E87ec35500a8E2eeD1d1Be2E2dA1B7A8101aa9",
    "value": "1000000",
    "transaction_hash": "28e51756d63d86e3437374933fb3509dc0ff7c84e6f9c9c1c745d9c6172bb4ab",
    "is_approved": true,
    "is_sent": true,
    "echo_block_number": 73,
    "approves": [],
    "extensions": []
  }
]
```

## Withdraw

Если вы решите вернуть свой ERC20 токены обратно в сеть Ethereum, для этого необходимо вызвать метод [withdraw_erc20_token](/api-reference/echo-wallet-api/README.md#withdraw_erc20_token-account-to-erc20_token-value-broadcast). Вы просто должны указать адрес в сети Ethereum, на который хотите перевести средства.

```bash
unlocked >>> withdraw_erc20_token 1.2.26 d742c3fa5957de7c08a9f4981e9e8b3fdfc879c6 1.16.0 1000000 true
{
  "ref_block_num": 75,
  "ref_block_prefix": 1526499872,
  "expiration": "2020-09-24T14:05:12",
  "operations": [[
      53,{
        "fee": {
          "amount": 0,
          "asset_id": "1.3.0"
        },
        "account": "1.2.26",
        "to": "D742C3fA5957De7c08A9F4981e9e8b3FdfC879C6",
        "erc20_token": "1.16.0",
        "value": "1000000",
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "fe92d335296ad6679e73588e5930c5071ba736bbfc1b056e47fbfea85d76e1b1692f62bb2eb968be9f9dea2cefcd3167dd940d878f26d72dc933f194ce70550b"
  ],
  "signed_with_echorand_key": false
}
```

Баланс с вашего аккаунта спишется сразу, а в Ethereum сети средства придут через определенное время.

Чтобы увидеть все ваши ERC20 выводы, используйте метод [get_erc20_account_withdrawals](/api-reference/echo-wallet-api/README.md#get_erc20_account_withdrawals-account).

```bash
unlocked >>> get_erc20_account_withdrawals 1.2.26
[{
    "id": "1.18.0",
    "withdraw_id": 0,
    "account": "1.2.26",
    "to": "D742C3fA5957De7c08A9F4981e9e8b3FdfC879C6",
    "erc20_token": "1.16.0",
    "value": "1000000",
    "is_approved": true,
    "is_sent": true,
    "echo_block_number": 76,
    "transaction_hash": "0000000000000000000000000000000000000000000000000000000000000000",
    "approves": [],
    "extensions": []
  }
]
```


