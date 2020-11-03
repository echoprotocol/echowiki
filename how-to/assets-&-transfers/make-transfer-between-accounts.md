# How to: Make a transfer between accounts

There are two options for assets transfer: they can be transferred from account to account or from account to address.

> The address is the ripemd160 hash, which corresponds to a certain account.

## 1. Transfer to account.

To perform a transfer to account, it is necessary to send an operation [transfer_to_address_operation](../../api-reference/echo-operations/asset-transfer.md#transfer).

To do so, you can use Wallet API [transfer](../../api-reference/echo-wallet-api/README.md##transfer-from-to-amount-asset_symbol-broadcast).

Example:

```
transfer 1.2.0 1.2.1 10 ECHO true
```

## 2. Transfer to address.

### Step 1. Create an address(The recipient creates an address).

To do so, we use Wallet API [generate_account_address](../../api-reference/echo-wallet-api/README.md#generate_account_address-owner_account-label-broadcast).

```
generate_account_address nathan label true
```

### Step 2. Get an address using Wallet API.

To do so, we use Wallet API [get_account_addresses](../../api-reference/echo-wallet-api/README.md#get_account_addresses-account_id-from-limit).

```
get_account_addresses 1.2.26 0 10
```

### Step 3. Transfer.

To transfer from account to address, you need to send an operation [transfer_to_address_operation](../../api-reference/echo-operations/asset-transfer.md#transfer_to_address_operation).

To do so, we use Wallet API [transfer_to_address](../../api-reference/echo-wallet-api/README.md#transfer_to_address-from-address-amount-asset_symbol-broadcast).

```
transfer_to_address 1.2.26 f149bd2883b1179965bd6706092573be4d68fec8 10 ECHO true
```
