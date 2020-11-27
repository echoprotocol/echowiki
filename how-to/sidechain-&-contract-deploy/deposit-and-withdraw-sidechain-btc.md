# How to: Deposit and withdraw sidechain BTC

## Deposit

To transfer BTC to your Echo account, you have to create `btc_deposit_address` for your account in the Echo network.

For it, call the method [create_btc_address](/api-reference/echo-wallet-api/README.md#create_btc_address-account-backup_address-broadcast). The second parameter here is the backup of your Bitcoin network account. In the mainnet, it starts with ‘1’ (`1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2`). In the test net, it starts with `m` or `n` (`mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn`)

After creating an address you can view it using the method
[get_btc_address](/api-reference/echo-wallet-api/README.md#get_btc_address-account). 
Example:

```bash
unlocked >>> get_btc_address nathan
{
  "id": "1.19.0",
  "account": "1.2.26",
  "deposit_address": {
    "address": "2NA1MLubzNsYtdWt6Qzh6aFiGbYAqasWv1Q"
  },
  "committee_member_ids_in_script": [[
      "1.2.6",
      "022baf06eb26d86d0ab247bbe1cd9518748dd88fa4d829512b971e82f9cdbef5c2"
    ],[
      "1.2.7",
      "029931c5e30c2611646588fdb9a40ad70e37e55dfee401aab619c2f5a861b6ce4a"
    ],[
      "1.2.8",
      "03b4a79d201c1220a10826f13148cf5240a667bd75cea411c0806b7b13ad3eeb14"
    ],[
      "1.2.9",
      "036a5aaa511a9a0ec7bb1b7fb24254bd1f66d78864d2fbce975a949337b4064761"
    ],[
      "1.2.10",
      "03039e925d447e6aa98160a2224e91091388659f2188988c7efc4323c925736d5f"
    ]
  ],
  "is_relevant": true,
  "backup_address": "muBbJomENuCpiaW6NtBE4byah7sQXZFoHu",
  "extensions": []
}
```
`deposit_address` is our deposit address.

Now, we can make in-network transfers using this address. To do it, you can use any wallet. For instance, here is what a transfer via bitcoin-cli looks like: 

```bash
./bitcoin-cli sendtoaddress 2NA1MLubzNsYtdWt6Qzh6aFiGbYAqasWv1Q 25
```

Normally, the funds reach your account within 24 hours. You can check your balance using the methods

[list_id_balances](/api-reference/echo-wallet-api/README.md#list_id_balances-id) and [list_account_balances](/api-reference/echo-wallet-api/README.md#list_account_balances-account). 

The balance will be expressed in eBTC.


```bash
list_account_balances nathan
9999999.99813941 ECHO
624.99892000 EBTC
```

> If the amount you see is less than the one you sent, don’t worry. In the example above, the total amount sent was 625 BTC. The transaction fee was 0.00108 BTC. The system charges this fee to reward the committee members for transaction verification. 

Also, you can view your deposits using the method
[get_account_deposits](/api-reference/echo-wallet-api/README.md#get_account_deposits-account-type).

If you want to get the btc script used to create your address, call the method
[get_btc_deposit_script](/api-reference/echo-wallet-api/README.md#get_btc_deposit_script-address).

## Withdraw

If you want to withdraw your eBTC from your Echo account to your BTC account, call the method
[withdraw_btc](/api-reference/echo-wallet-api/README.md#withdraw_btc-account-btc_addr-value-broadcast).

The balance of your account will change immediately, but it takes some time for the funds to reach the Bitcoin network. 

To get your withdrawals you can use [get_account_withdrawals](/api-reference/echo-wallet-api/README.md#get_account_withdrawals-account-type) method.
