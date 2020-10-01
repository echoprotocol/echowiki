# How to: Deposit and withdraw sidechain ETH

## Deposit

To transfer ETH to your Echo account, create `eth_deposit_address` for your Echo account.

Firstly, call the method [create_eth_address](/api-reference/echo-wallet-api/README.md#create_eth_address-account-broadcast).

After creating an address, you can view it using the method [get_eth_address](/api-reference/echo-wallet-api/README.md#get_eth_address-account). 

Address example:

```bash
unlocked >>> get_eth_address 1.2.26
{
  "id": "1.13.0",
  "account": "1.2.26",
  "eth_addr": "a8463718d2E25d77082cBA75FCF5F9aD5D442d0D",
  "is_approved": true,
  "transaction_hash": "ee4cb190626cd4b75eb7becc2729c8b8caca1c8ffbd4994fd6e83e874dfa3436",
  "approves": [],
  "extensions": []
}
```

The required field is `eth_addr`: `0xde0b295669a9fd93d5f28d9ec85e40f4cb697Bae`.

Then, let’s see how to transfer our Ethereum funds to this address. For it, you may use any wallet.

The funds will reach your account after the transaction gets the required number of validations. To check your balance, use these methods [list_id_balances](/api-reference/echo-wallet-api/README.md#list_id_balances-id) and [list_account_balances](/api-reference/echo-wallet-api/README.md#list_account_balances-id).

The balance will be expressed in `eETH`.

```bash
unlocked >>> list_account_balances 1.2.26
9810000.04653451 ECHO
0.050000 EETH
```

Also, you can watch over your deposits using this method [get_account_deposits](/api-reference/echo-wallet-api/README.md#get_account_deposits-account-type).

```bash
unlocked >>> get_account_deposits 1.2.26 eth
[{
    "id": "1.14.0",
    "deposit_id": 7,
    "account": "1.2.26",
    "value": 50000,
    "is_approved": true,
    "is_sent": true,
    "echo_block_number": 65,
    "transaction_hash": "e200bd56e15fc6acf01c802c6dacc18a9f14c2c6db753ad79df5dab86585e7fb",
    "approves": [],
    "extensions": []
  }
]
```

## Withdraw

If you decide to withdraw your eETH from the Echo network back to Ethereum, call the method [withdraw_eth](/api-reference/echo-wallet-api/README.md#withdraw_eth-account-eth_addr-value-broadcast).

Just indicate the address in the Ethereum network where you are sending the funds to.

```bash
unlocked >>> withdraw_eth 1.2.26 D742C3fA5957De7c08A9F4981e9e8b3FdfC879C6 50000 true 
{
  "ref_block_num": 67,
  "ref_block_prefix": 4041619182,
  "expiration": "2020-09-23T15:13:08",
  "operations": [[
      44,{
        "fee": {
          "amount": 0,
          "asset_id": "1.3.0"
        },
        "account": "1.2.26",
        "eth_addr": "D742C3fA5957De7c08A9F4981e9e8b3FdfC879C6",
        "value": 50000,
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "1562237885f0978708a7c9a2333fd8f0434621060c1055d2b0362db8cc2e38fe7d1c090facdfa33895ad15bf7554615fb124ca8e3d86a3dda33e5eaf1662e606"
  ],
  "signed_with_echorand_key": false
}
```

Though your account balance will be corrected at once, it will take some time for the funds to reach the Ethereum network.

To view all your withdrawals, use the method [get_account_withdrawals](/api-reference/echo-wallet-api/README.md#get_account_withdrawals-account-type).

```bash
unlocked >>> get_account_withdrawals 1.2.26 eth
[{
    "id": "1.15.0",
    "withdraw_id": 0,
    "account": "1.2.26",
    "eth_addr": "D742C3fA5957De7c08A9F4981e9e8b3FdfC879C6",
    "value": 50000,
    "fee": 4000,
    "is_approved": false,
    "is_sent": true,
    "echo_block_number": 68,
    "approves": [],
    "extensions": []
  }
]
```
