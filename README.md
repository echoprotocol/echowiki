# Introduction

Welcome to the Echo Docs!

Please note that the current version of the documentation is not final and will change soon.

## What is Echo?

Echo is a generalized smart contract protocol that enables efficient decentralized computing. It provides the infrastructure and developer tooling necessary to build and deploy scalable, high-performing decentralized applications.

Echo includes several main modules:

### PoWR Consensus

Fast, final and scalable BFT consensus using Proof of Weighted Randomness (PoWR) also known as EchoRand. EchoRand uses a Verifiable Random Function (VRF) to randomly select a pool of block producers and block verifiers proportionally to their stake to validate each new set of transactions.

### x64 Virtual Machine & EVM

Integrated virtual machines allow you to use smart contracts on the Echo network. Smart contracts can be written both in Solidity and in more familiar and convenient languages, such as C, C++, Rust, Go and many more.

### Bitcoin and Ethereum Sidechains

The sidechain mechanism integrated into the protocol allows you to access BTC and ETH within the Echo network, using built-in two-way pegging, thus enabling their direct use in Echo smart contracts and enabling the development of new DeFi technologies and products.

## Current Status

The project is currently under heavy development and testing.

Therefore, some of the functionality isn't available on the testnet, yet. At the time of writing, Echo testnet supports the following:

* Register an account.
* Participate in the EchoRand consensus.
* Create and issue new assets.
* Transfer assets.
* Deploy and access smart contracts written in Solidity via EVM.
* Deploy and access smart contracts written in С++ via x64 VM.
* Create and use account addresses.
* Launch your node and access its API to communicate with the blockchain.

## Getting Started

To get acquainted with how to start using Echo, you can visit the [How To](how-to/) section.

## Technology Details

You can read more about how the Echo works and how it works from the inside. You can follow the links below:

* PoWR EchoRand
  * [In a nutshell](technologies/powr-echorand/in-a-nutshell.md) - a brief description of the principles of consensus
  * [Overview](technologies/powr-echorand/overview.md) - detailed description of the mechanism with all the subtleties and nuances
  * [Architecture](technologies/powr-echorand/architecture.md) - low-level detailed description of exactly how the idea was implemented in the code

## Using Echo

You can start using Echo right now. For starters, you can use wallets to create an account and manage assets on it. The following wallets are currently available:

* Echo Desktop Wallet
* Blip
* Echo Bridge Extension

Use the Echo block explorer to keep track of the blocks and transactions:

* Echo Explorer (testnet) - [https://explorer.echo.org](https://explorer.echo.org)

To interact with the blockchain at the code level, you have the following libraries and SDKs at your disposal:

* [echojs-lib](https://github.com/echoprotocol/echojs-lib) - A javascript Echo library for node.js and browsers
* [echopy-lib](https://github.com/echoprotocol/echopy-lib) - Python Library for Echo Blockchain
* [echo-unity-lib](https://github.com/echoprotocol/echo-unity-lib) - Unity library for Echo
* [echo-ios-framework](https://github.com/echoprotocol/echo-ios-framework) - Pure Swift Echo framework for iOS
* [echo-android-framework](https://github.com/echoprotocol/echo-android-framework) - Pure Kotlin Echo framework for Android
