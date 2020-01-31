# Echo TestRPC protocol

Echo TestRPC provides separate executable designed to make testing faster and easier.

* Transactions are applied instantly and have no cost.
* Simplified block generation mechanism
* Accounts can be re-cycled, reset and instantiated with a fixed amount of any asset.
* Chain parameters and gas price can be modified.

Echo TestRPC API is based on Ethereum TestRPC protocol and extends JSON API.  
More details on the API can be found on [TestRPC API page](methods.md).

New block generates instantly after push or transaction if miner enabled. When miner is disabled blocks wouldn't be generated. Echorand consensus and block generator are disabled in TestRPC.

By-default all plugins are disabled, but can be enabled in config or program arguments. Echorand and network APIs are not supported.  
To enable plugin specify it in config options `plugins`, for example `--plugins="sidechain,history"`. All supported APIs are always enabled.  
Lists of supported plugins and APIs:
- Plugins: history, registration, sidechain, snapshot, json_rpc
- APIs: login_api, block_api, database_api, history_api, asset_api, registration_api, json_rpc_api


Integrated test wallet can create accounts with specified balance during TestRPC startup.  
To add inital account with balance should be specifieds `init-balances` option. For example `--init-balances=[1000, 2000, 3000]`. Also available `accounts` option that creates addintional accounts and splits all initial balance between them equally. For example `--acounts=5`
