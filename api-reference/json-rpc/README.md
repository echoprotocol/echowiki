# Echo JSON RPC

The Ethereum node provides the [JSON RPC interface](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-methods), which is used by libraries such as Web3, as well as applications directly. The goal is to implement an interface that will work with requests and responses of a similar format. This is necessary to facilitate the migration of applications from the Ethereum platform to Echo.

## Echo implementation

In Echo JSON RPC implemented via additional plugin that enables with help of `--plugins=jsonrpc`. If you enables plugin, you must also specify endpoint that webserver should listen with option `--ethrpc-endpoint`, for example `--ethrpc-endpoint=0.0.0.0:8092`. Plugin starts a webserver and binds implemented api on every connection. That api implements described [methods](methods-list.md) converting Echo data format tio specified one. 
