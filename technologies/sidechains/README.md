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

Echo BTC sidechain allows Echo account owners to exchange their BTC with the corresponding asset in the Echo network (eBTC). User operations on the Echo chain and transactions on the Bitcoin chain trigger the processes inside the sidechain which result in various Echo operations and Bitcoin transactions signed and sent by the committee members. The Bitcoin sidechain tracks the deposits and withdrawals to and from its adresses and performs corresponding operations on the Echo side after the block where the transaction with the deposit or withdrawal is located and confirmed on the Bitcoin network.

### Fee payment

All fees below are specified in bytes, which are calculated based on transactions virtual sizes. Fees in
satoshi and approximate fees in USD are provided in the table below as well.

| | Deposit fee |  Withdrawal fee | Minimum deposit | Minimum withdrawal |
|---|---|---|---|---|
| Bytes | 1000 | 1000 | 10000 | 10000 |
| Satoshi | 12000 | 12000 | 120000 | 120000 |
| USD(appox) | 0.98 | 0.98 | 9.8 | 9.8 |

Satoshi per byte is defined to be equal to 12 initially, which will allow the transactions to be mined in the
nearest blocks. All parameters (fees, minumums and satoshi per byte) are defined in the Echo config and
can be increased or decreased by commiittee members.

### Fee calculations

Below are the calculations of the sizes of the transactions in the case of low activity,
i.e. SMA transactions include only one deposit or one withdrawal. Resulting numbers shows that in such
case there will be almost no profit, even some loss in the case of 19 committee members.

| Committee member count | Deposit to intermediate |  Intermediate to SMA | Total size for deposit | Withdrawal | Total size |
|---|---|---|---|---|---|
| 5 | 243 | 460 | 703 | 294 | 997 |
| 10 | 341 | 657 | 998 | 393 | 1391 |
| 15 | 421 | 890 | 1311 | 509 | 1820 |
| 19 | 492 | 1032 | 1524 | 581 | 2105 |

### Decrease of fees

Fees can be decreased in the future in case of activity growth. Fee calculations for
more active deposit/withdrawals distibution provided below for the deposit fee 750 bytes and withdrawal
fee 750 bytes.

| Distribution | Deposit + withdrawal count | Profit/loss |
|---|---|---|
| 10% | 1 | -3025 |
| 20% | 2 | -1340 |
| 40% | 4 | 16160 |
| 20% | 6 | 17500 |
| 10% | 8 | 13460 |

Overall profit after 100 SMA aggregating transactions during 17 days will be 42755 bytes. All the possible profit remaining on the SMA address will allow to use CPFP or to update SMA address in case of committee members update.

## Ethereum Sidechain

Echo Ethereum sidechain allows Echo accounts owners to exchange their Ether and ERC20 tokens with the corresponding eETH asset or tokens on Echo network. A special smart contract is deployed into the Ethereum network by committee members which controls the deposited funds and tokens and provides an interface to manage them. The Ethereum sidechain tracks the events emitted by this contract and performs corresponding operations on the Echo side after the block where the transaction with the emitting call is located and confirmed on the Ethereum network.

In order to transfer ERC20 tokens from and to the Echo chain, ERC20 tokens should be registered in Echo network. Registration of the Ethereum ERC20 token deploys an ERC20 smart contract in Echo network and informs the sidechain to listen to the events of the connected ERC20 token on the Ethereum side. When a token is transferred to a deposit address on the Ethereum chain, a corresponding amount of  related tokens on the Echo side will be transferred to the user's account.

### Fee payment

All fees below are calculated based on ethereum gas unit. Fees in GWei and approximate fees in USD
are provided in the table below as well. Please note that additional gas will be charged from the user’s
Ethereum account for transfers to sidechain addresses in Ethereum network. Deposit fee is intended to
cover gas spended for deposit contract deployement in Ethereum network so it will be charged only for
the first transfer to the address of that contract, subsequent deposits will be free of charge. Withdrawal
fees will be divided and setteled on committee members’ accounts in eETH asset.

| Operation | Gas | Gwei (gas price 4 Gwei) | USD (approx) |
|---|---|---|---|
| Deposit fee (first deposit for account) | ~540,000 | 2,160,000 | 0.3 |
| Deposit fee (subsequent deposits) | 0 | 0 | 0 |
| Minimum deposit | Deposit fee + 250,000 | 3,160,000 (1,000,000) | 0.4 (0.1) |
| Withdraw fee | 1,000,000 | 4,000,000 | 0.5 |
| Minimum withdrawal  | 2,000,000 | 8,000,000 | 1 |

Gas price is defined to be equal to 4 GWei initially, which will allow the transactions to be mined in the
nearest blocks. All parameters (fees, minumums and gas price) are defined in the Echo config and can be
increased or decreased by committee members.

ER20 tokens deposits and withdrawals are free of charge. Fees related to the ERC20 smart contract calls
on the Echo side are covered by the fee pool of the contract.
