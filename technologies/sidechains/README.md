# Echo Sidechains

[Read Full Echo Sidechains Whitepaper](https://github.com/echoprotocol/echowiki/blob/master/.gitbook/assets/echo-sidechains-whitepaper.pdf)

## Intro

Sidechain is a mechanism that allows users to transfer cryptocurrencies to other blockchains and enables the ability to return their cryptocurrencies back to the main network at any time.

By using coins in other blockchains, users can obtain access to a wider range of features and opportunities while still remaining owners of their coins in the main network without the need to trade it for other coins via exchanges.

## Overview

Echo Bitcoin and Ethereum sidechains approach is based on the federated sidechain model, further enhanced by the Echo protocol. An active list of federation members (hereinafter referred to as committee members) is elected to monitor and verify cross chain transactions, thus responsible for handling the mechanism of interaction between blockchains. Main chain frozen funds are stored in a multi-signature address (in case of Bitcoin) or smart contract account (Ethereum) which are controlled by the committee members.

The mechanism for transferring main coins to the Echo network is as follows:

1. Users receive a personal deposit address for the main chain from the Echo network.
1. Users transfer the desired amount of main coins to the deposit address.
1. Transferring funds to this address results in freezing them on the main chain and the same amount of eBTC or eETH coins will be issued on Echo network and credited to the originator.

Echo sidechains are symmetrical, such that withdrawing main coins back to the main chain is a very similar process:

1. Users inform the Echo network of the intention to “unfreeze” a certain amount of main coins. To do this, they send withdraw operation on the Echo network, which contains information about the output amount and the recipient's address in the main chain.
1. The operation triggers the withdrawal process, as a result of which the committee members collectively unfreeze the required number of main coins. The eBTC or eETH tokens are automatically burned on the Echo side.

Echo sidechain supports similar flow to transfer Ethereum chain ERC20 tokens from/to Echo which is described in detail in corresponding section.

User can receive her personal deposit addresses and history of the deposits and withdrawals using the Echo DB API or Echo Wallet API. Please see the corresponding documentation for the details.

## Bitcoin Sidechain

Echo BTC sidechain allows Echo accounts owners to exchange back and forth their BTC with the corresponding asset in Echo network (eBTC). User operations on the Echo chain and transactions on the Bitcoin chain are triggering the processes inside sidechain which result in various Echo operations and Bitcoin transaction signed and sent by the committee members.

## Ethereum Sidechain

Echo Ethereum sidechain allows Echo accounts owners to exchange back and forth their Ether and ER20 tokens with the corresponding eETH asset or tokens in Echo network. Special smart contract is deployed into Ethereum network by committee members which is controlling the deposited funds and tokens and is providing interface to manage them. Ethereum sidechain tracks the events emitted by this contract and perform corresponding operations on the Echo side after the block where the transaction with emitting call is located is confirmed on the Ethereum network.

In order to transfer ERC20 tokens from and to Echo chain ERC20 token should be registered in Echo network. Registration of Ethereum ERC20 token deploys ERC20 smart contract in Echo network and informs sidechain to listen to the events of the connected ERC20 token on Ethereum side. In the case of token transferred to deposit address in Ethereum chain, corresponding amount of  related tokens on the Echo side will be transferred to the user account.
