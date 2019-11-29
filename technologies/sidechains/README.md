# Echo Sidechains

[Read Full Echo Sidechains Whitepaper](https://github.com/echoprotocol/echowiki/blob/master/.gitbook/assets/echo-sidechains-whitepaper.pdf)

## Intro

A sidechain is a mechanism that allows users to transfer cryptocurrencies to other blockchains and enables the ability to return their cryptocurrencies back to the main network at any time.

By using coins in other blockchains, users can obtain access to a wider range of features and opportunities while still retaining full ownership.

## Overview

Echo's Bitcoin and Ethereum sidechains approach is based on the federated sidechain model, further enhanced by the Echo protocol. An active list of federation members (hereinafter referred to as committee members) is elected to monitor and verify cross chain transactions, thus responsible for handling the mechanism of interaction between blockchains. Main chain frozen funds are stored in a multi-signature address (in the case of Bitcoin) or a smart contract account (Ethereum) which are controlled by the committee members.

The mechanism for transferring main coins to the Echo network is as follows:

1. Users receive a personal deposit address for the main chain from the Echo network.
1. Users transfer the desired amount of main coins to the deposit address.
1. Transferring funds to this address results in freezing them on the main chain and the same amount of eBTC or eETH coins will be issued on Echo network and credited to the originator.

Echo sidechains are symmetrical, such that withdrawing main coins back to the main chain is a very similar process:

1. Users inform the Echo network of the intention to “unfreeze” a certain amount of main coins. To do this, they send withdraw operation on the Echo network, which contains information about the output amount and the recipient's address in the main chain.
1. The operation triggers the withdrawal process, as a result of which the committee members collectively unfreeze the required number of main coins. The eBTC or eETH tokens are automatically burned on the Echo side.

Echo sidechain supports similar flow to transfer Ethereum chain ERC20 tokens from/to Echo which is described in detail in the corresponding section.

A user can receive her personal deposit addresses and history of the deposits and withdrawals using the Echo DB API or Echo Wallet API. Please see the corresponding documentation for the details.

## Bitcoin Sidechain

Echo BTC sidechain allows Echo account owners to exchange their BTC with the corresponding asset in the Echo network (eBTC). User operations on the Echo chain and transactions on the Bitcoin chain trigger the processes inside the sidechain which result in various Echo operations and Bitcoin transactions signed and sent by the committee members.

## Ethereum Sidechain

Echo Ethereum sidechain allows Echo accounts owners to exchange their Ether and ERC20 tokens with the corresponding eETH asset or tokens on Echo network. A special smart contract is deployed into the Ethereum network by committee members which controls the deposited funds and tokens and provides an interface to manage them. The Ethereum sidechain tracks the events emitted by this contract and performs corresponding operations on the Echo side after the block where the transaction with the emitting call is located and confirmed on the Ethereum network.

In order to transfer ERC20 tokens from and to the Echo chain, ERC20 tokens should be registered in Echo network. Registration of the Ethereum ERC20 token deploys an ERC20 smart contract in Echo network and informs the sidechain to listen to the events of the connected ERC20 token on the Ethereum side. When a token is transferred to a deposit address on the Ethereum chain, a corresponding amount of  related tokens on the Echo side will be transferred to the user's account.
