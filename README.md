---
description: Echo is a network for building smart contracts and decentralized applications that work with Bitcoin.

---

# Introducing Echo

Welcome to the Echo docs! While Echo has been in development for 24+ months, please be aware that it is still early-stage, experimental technology. As such, please note that the current documentation is still being expanded and may change rapidly as new software versions are released. If you see anything you think should be changed, you're welcome to [submit a pull request](https://github.com/echoprotocol/echowiki).

## What is Echo?

Echo is a network for creating sovereign, decentralized applications that work with Bitcoin. Echo is advancing the usability, flexibility and functionality for smart contracts. Echo includes several main features:

### EVM Support

Echo implements the Ethereum Virtual Machine (EVM), allowing you to build smart contracts using Solidity and the tools, libraries and IDEs that support Solidity. You can even port an existing Ethereum decentralized application to Echo with few or no changes required - deploy the exact same bytecode. Read more:

{% page-ref page="technologies/evm-support/README.md" %}

### PoWR Consensus

A fast, final and scalable BFT consensus mechanism using Proof of Weighted Randomness (PoWR) also known as EchoRand. EchoRand uses a Verifiable Random Function (VRF) to randomly select a pool of block producers and block verifiers proportionally to their stake to validate each new set of transactions.

{% page-ref page="technologies/powr-echorand/README.md" %}

### x64 Virtual Machine

Echo implements a new, blockchain-specific x86-64 virtual machine allowing developers to write and deploy smart contract in higher level languages. With Echo, smart contracts can be written both in Solidity and in more familiar and convenient languages, such as C, C++, Rust, Go and many more.

{% page-ref page="technologies/x86-64-virtual-machine/README.md" %}

### Bitcoin Sidechain

Echo implements a Bitcoin sidechain, allowing you to use deposit and withdraw BTC from the Echo network. Through the sidechain, you can build smart contract and applications that interact with BTC , such as decentralized finance (DeFi) applications including stablecoins that are collateralized with Bitcoin.

{% page-ref page="technologies/sidechain/bitcoin-sidechain.md" %}

## Current Status

The project is currently under heavy development and testing as early-stage experimental software. Currently, the Echo testnet supports the following actions:

* Register an account.
* Participate in the EchoRand consensus.
* Create and issue new assets.
* Transfer assets.
* Deploy and access smart contracts written in Solidity with the  EVM.
* Deploy and access smart contracts written in С++ via x64 VM.
* Create and use account addresses.
* Launch your node and access its API to communicate with the blockchain.

View the current status of the Echo testnet with the [Echo explorer](https://explorer.echo.org).

## Getting Started with EchoRand

{% page-ref page="how-to/download-an-echo-wallet.md" %}

{% page-ref page="how-to/deploy-a-solidity-contract.md" %}

{% page-ref page="how-to/interact-with-a-smart-contract.md" %}

{% page-ref page="how-to/install-full-node.md" %}

## Using Echo

You can start using Echo right now by downloading a wallet to create an account and manage assets using the wallet. The following wallets are currently available:

* [Echo Desktop Wallet](https://github.com/echoprotocol/echo-wallet) - a cross-platform wallet supporting contract operations
* [Blip](https://github.com/echoprotocol/blip-wallet) - a user-friendly, cross-platform desktop wallet build with Electron
* [Echo Bridge Browser Extension](https://chrome.google.com/webstore/detail/echo-bridge/ginklfodpcgldnicehmlpehfmgjhbdcl)
* [iOS Wallet](https://itunes.apple.com/us/app/echo-wallet/id1447877175?mt=8)
* [Android Wallet](https://play.google.com/store/apps/details?id=org.echo.wallet&hl=en)

Use the Echo block explorer to keep track of the blocks and transactions:

* Echo Explorer \(testnet\) - [https://explorer.echo.org](https://explorer.echo.org)

To interact with the blockchain as a developer, you have the following libraries and SDKs at your disposal:

* [echojs-lib](https://github.com/echoprotocol/echojs-lib) - A javascript Echo library for node.js and browsers
* [echopy-lib](https://github.com/echoprotocol/echopy-lib) - Python Library for Echo Blockchain
* [echo-unity-lib](https://github.com/echoprotocol/echo-unity-lib) - Unity library for Echo
* [echo-ios-framework](https://github.com/echoprotocol/echo-ios-framework) - Pure Swift Echo framework for iOS
* [echo-android-framework](https://github.com/echoprotocol/echo-android-framework) - Pure Kotlin Echo framework for Android
