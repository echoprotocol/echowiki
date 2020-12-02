# How to transfer assets to Ethereum ERC20

You may transfer ECHO, EBTC assets to Ethereum ERC20 token.

First of all use the methods [check_erc20_token](/api-reference/echo-wallet-api/README.md#check_erc20_token-id) and [get_erc20_token](/api-reference/echo-wallet-api/README.md#get_erc20_token-eth_addr_or_id) to check if the ERC20 token was successful registered from starting the network. `1.16.0` and `1.16.1` objects should be ECHO and EBTC assets accordingly.

```bash
unlocked >>> check_erc20_token 1.11.0
true
unlocked >>> get_erc20_token 1.16.0
{
  "id": "1.16.0",
  "owner": "1.2.5",
  "eth_addr": "E3E87ec35500a8E2eeD1d1Be2E2dA1B7A8101aa9",
  "contract": "1.11.0",
  "name": "EchoToken",
  "symbol": "ECHO",
  "decimals": 8,
  "extensions": []
}

unlocked >>> get_erc20_token 1.16.1
{
  "id": "1.16.1",
  "owner": "1.2.5",
  "eth_addr": "E3E87ec35500a8E2eeD1d1Be2E2dA1B7A8101aa9",
  "contract": "1.11.1",
  "name": "EbtcToken",
  "symbol": "EBTC",
  "decimals": 8,
  "extensions": []
}
```

> `eth_addr` is address of Ethereum ERC20 contract. On this address you find assets after transferring and use it.

After that you need to create ethereum address. How to do that reed beginning of this doc [Ethereum Sidechain](deposit-and-withdraw-sidechain-eth.md).

When you create your ethereum addreess, you may transfer assets to Ethereum:

```bash
unlocked >>> transfer_to_eth_erc20 nathan bC384aBfDd339BCf2f9e68Ea3858C04563ef012C 100 ECHO true
or
unlocked >>> transfer_to_eth_erc20 nathan bC384aBfDd339BCf2f9e68Ea3858C04563ef012C 20 EBTC true
```

To view transfers to Ethereum, use method [get_erc20_account_withdrawals](/api-reference/echo-wallet-api/README.md#get_erc20_account_withdrawals-account).

```bash
unlocked >>> get_erc20_account_withdrawals 1.2.26
[{
    "id": "1.18.0",
    "withdraw_id": 0,
    "account": "1.2.26",
    "to": "bC384aBfDd339BCf2f9e68Ea3858C04563ef012C",
    "erc20_token": "1.16.0",
    "value": "10000000000",
    "is_approved": false,
    "is_sent": false,
    "echo_block_number": 76,
    "approves": [],
    "extensions": []
  }
]
```

After certain time flags `is_sent` and `is_approved` will be `true`. It means transfer was successfull and you may use your asset on Ethereum ERC20 contract. To check your balance on contract send transaction with `balanceOf` in Ethereum network.

How to return assets to Echo network read [here](deposit-and-withdraw-sidechain-erc20.md#deposit).
