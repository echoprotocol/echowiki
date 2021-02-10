# How to: How to create your own asset with Echo

## General guidelines

To create your own currency (customer or market asset) and start trading it on an exchange, first you need to deposit BTC, ETH or Echo to your account. The amount we charge depends on the name length of your asset.

## New asset creation example

To create an `asset` use [echo wallet](use-cli-wallet.md).

1. If you have no account in the Echo network, create it using [register_account](register-account.md).

2. Import your account private key to [import_key](../api-reference/echo-wallet-api/README.md#import_key-account_name_or_id-priv_key).

3. Create a new asset using [create_asset](../api-reference/echo-wallet-api/README.md#create_asset-issuer-symbol-precision-asset_opts-bitasset_opts-broadcast)
