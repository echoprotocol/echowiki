# EchoJS-lib

EchoJS-lib is a JavaScript library for integrating Node.js or browser applications with the Echo blockchain.

Repository: [https://github.com/echoprotocol/echojs-lib](https://github.com/echoprotocol/echojs-lib)

Npm: [https://www.npmjs.com/package/echojs-lib](https://www.npmjs.com/package/echojs-lib)

For the library to work, you need a blockchain node with an open port for RPC requests. This parameter is indicated by the argument `--rpc-endpoint` when starting the node. If you don’t need public access to the blockchain (for example, your Node.js application is on the same server as the blockchain node), you should specify the local ip - 127.0.0.1. As an example - `--rpc-endpoint =" 127.0.0.1:8090 "`. Or use `0.0.0.0` for make public access - `--rpc-endpoint="0.0.0.0:8090"`

## Install the library

This library can be obtained through npm:

```bash
npm install echojs-lib
```

## Usage

The actual information about usage of this library you can find in the [README.md](https://github.com/echoprotocol/echojs-lib/blob/master/README.md) document in the [repository](https://www.npmjs.com/package/echojs-lib).