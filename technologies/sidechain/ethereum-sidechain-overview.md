# Ethereum Sidechain

## General Overview

Ethereum Sidechain (ES) is an Echo extension that implements the gateway
between the Echo and Ethereum blockchains. The extension allows to use
Ethereum currency and its ERC20 tokens within the Echo blockchain, as
well as to withdraw them out of the Echo network back to the Ethereum
network. 

The functionality is implemented by freezing the assets on the
corresponding contract of the Ethereum side and by activating the
corresponding amount of funds on the Echo side (for depositing Echo
assets) and the reverse process for withdrawing the funds back to the
Ethereum network. 

The members of the Echo network committee are the intermediaries that
implement the connection of the two blockchains. The main gateway
element is the Solidity contract in the Ethereum network, that is
responsible for generating wallet addresses and for the processing of
incoming and outgoing payments. 

## User Steps

For any action on funds depositing or withdrawing the user must create
an account and request a wallet address first: 

1. Register a new account in any Echo wallet 
1. Send an operation to the network, which is a request to create a new wallet address
1. Wait for confirmation about address creation

### Ethereum Deposit

1. Transfer ETH to the earlier generated address in the Ethereum network 
2. Wait for confirmation of the transfer and get the opportunity to use
   the corresponding balance in eETH in the Echo network 

### ERC20 Token Deposit

> the gateway supports only the ERC20 tokens whose addresses have been
> submitted for the support. The mechanism is described below

1. Transfer the ERC20 token to the earlier generated address in the
   Ethereum network 
2. Wait for confirmation of the transfer and get the opportunity to use
   the corresponding balance in the corresponding ERC20 token in the
   Echo network

### Ethereum Withdrawal

1. Send eETH to the Ethereum address of the Echo network 
2. Wait for confirmation of the transfer and get the opportunity to use
   the corresponding balance on the specified above address in the
   Ethereum network 

### ERC20 Token Withdrawal

1. Call the `approve` ERC20 method of the token, specifying the amount
   to be withdrawn. Then call the `withdraw` method of the service
   contract, indicating the token, the amount and the address in the
   Ethereum network to which the tokens should be withdrawn. This step
   implies the presence of two operations that can be running on the
   background of the application, which allows the user to perform them
   by specifying only the amount of funds and the output address
2. Wait for confirmation of the transfer and get the opportunity to use
   the corresponding balance on the above-specified address in the
   corresponding ERC20 token in the Ethereum network 

## Sidechain Work Protocol

Main Sections of the Protocol

1. Ethereum wallet address creation
1. Ethereum deposit processing
1. ERC20 token deposit processing
1. Ethereum withdrawal processing
1. ERC20 token withdrawal processing

### Ethereum Wallet Address Creation

The address creation includes 3 steps:

1. a request to create an address
1. address generation
1. confirmation of the created address

#### Submitting a request to create an address

Using the `sidechain_create_address` operation, the user notifies the
network about the intention to receive an Ethereum wallet address
`eth_receive_address`. This operation is a sidechain type operation (an
Ethereum sidechain in this case).

> To provide an opportunity to use Sidechain without having a balance in
> the Echo network creation of a `sidechain_create_address` operation is
> commission-free, however the user can call the operation for an
> account only once

#### Address generation

Committee members are subscribed to the `sidechain_create_address` type
of operations. When requesting an address, a committee member selected
with VRF sends a request to the Ethereum network (calls the Ethereum
contract) to create a wallet address linked to the account in the Echo
network.

#### Confirmation of the created address

Calling the contract creates an event on the Ethereum side with
information about the new address. Each member of the committee catches
this event in the Ethereum network and creates a corresponding operation
on the Echo network. 

Address `eth_receive_address` will already be created after the very
first message from one of the committee members and can be used then for
the balance replenishment. However, the users are advised not to use the
address until it receives confirmation from `3/2 n + 1` of the committee members,
where 'n' is the number of active members of the committee. This
restriction is only a recommendation and does not limit the use of the
address at the protocol level in any way.

### Ethereum Deposit Processing

As a result of the Ethereum assets transfer to `eth_receive_address`,
the contract creates an event in the Ethereum network. This event is
processed by all members of the committee, and each of them also creates
an operation with information about the deposit of funds in the Echo
network. After `3/2 n + 1` of the committee members send a message about
funds admission, the funds will be credited to the corresponding Echo
account.

The result of depositing Ethereum into the Echo network is the
availability of the eETH balance on the account in the Echo network. 

### ERC20 Token Deposit Processing

ERC20 is a Solidity contract standard that involves methods for
obtaining an account balance and assets transfer. In the Echo network,
it is represented by a similar type of contract. 

The transfer of ERC20 tokens to the Echo network is implemented in the
following way: 

1. Token contract creation on the Echo network
1. Fee pool replenishment
3. Transfer of the assets to `eth_receive_address` in the Ethereum
   network

#### Token contract creation on the Echo network

First of all, the potential owner of a token contract on the Ethereum
side should activate the ability to use its tokens on the Echo side. To
do this, call the `sidechain_create_token` operation. In the operation,
specify the ERC20 contract address in the Ethereum network. The
operation has a non-zero commission.

As a result of this operation, the committee members make a request for
a contract with the specified address in the Ethereum network, verify it
for compliance with the ERC20 interface (the contract must contain all
methods and events included in the ERC20 standard). Each of the
participants sends feed with information about the contract to the Echo
network and upon receiving the feed from `3/2 n + 1` of the committee
members the Echo network generates a mintable ERC20 token. Only the
committee account has the right to issue this type of tokens.

The contract address in the Ethereum network gets tied to the contract
ID in the Echo network. 

Subsequent `sidechain_create_token` operations with the identical
contract address are not processed by the committee members.

#### Fee pool replenishment

For reimbursement of the ERC20 tokens withdrawal costs, the token
contract on the Echo side must have a non-zero fee pool balance. Any
account can replenish this balance. The withdrawal of ERC20 tokens to
the Ethereum network will be possible only if there is a sufficient
balance on the fee pool to cover the costs of the withdrawal
transaction. 

#### Transfer of the assets in the Echo network

When the contract bundle is added, as it is described above, the
committee members start monitoring all the `Transfer` events of the
contract in the Ethereum network. When a new `Transfer` event arrives
all the committee members start feeding information about the event to
the Echo network. The recipient of such an event is one of the
`eth_receive_address` of the Echo network. On receiving feed from `3/2 n
\+ 1` of the committee members (n behalf of the committee account) a
previously linked ERC20 contract s called with a request to mint the
required number of tokens for the account tied to `eth_receive_address`.

The result of depositing an ERC20 token into the Echo network is s the
availability of the corresponding ERC20 token on the account in the Echo
network. 

### Ethereum withdrawal processing

1. withdrawal of funds by the user
1. signing by committee members
1. sending of the withdrawal to the Ethereum network
1. confirmation of the withdrawal

#### Withdrawal of funds by the user

Transfer of eETH with the specified recipient of the following format
`0x00000000000000000000000000000000000000` will be perceived by the
network as a withdrawal of ETH to the Ethereum network.

#### Signing by committee members

On receiving a block with an eETH withdrawal operation each member of
the committee forms a signature that includes a withdrawal ID, the
amount of funds, the recipient address, and the sender's ID. The
signature is sent to the Echo network by the corresponding
'sidechain_propose_signature' operation. 

#### Sending of the withdrawal to the Ethereum network

On receiving the required number of signatures `(3/2 n + 1)` the
committee member, selected through the VRF, calls the `withdrow` method
in the Echo contract on the Ethereum side.

#### Confirmation of the withdrawal

Calling a contract on the Ethereum side calls an event. Each committee
member proxy this event into an operation of the Echo network. Upon
receiving the required number of operations (3/2 n + 1) the withdrawal
is considered closed. The amount of eETH that equals to the withdrawn
amount gets burned. 

### ERC20 token withdrawal processing

1. withdrawal preparation
1. withdrawal request
1. signature forming by committee members
1. sending of the withdrawal to the Ethereum network
1. confirmation of the withdrawal

#### Withdrawal preparation

To withdraw tokens, the user must allow the system account to transfer
the required amount of funds to the user address. This is implemented by
calling the 'approve' method, specifying the required funds for
withdrawal and the system contract address as the recipient. 

#### Withdrawal request

The user must call the `withdrow` method of the system contract,
specifying the token address, the withdrawal amount and the address to
which the token should be withdrawn. The contract, using the
'transferFrom' method, transfers the funds to its address, and, using
the 'burn' method, burns the received tokens. Afterwards, the contract
sends an event to the network, which informs the committee members about
the need to withdraw the token.

#### Signature forming by committee members

On receiving a block with the event about the need to withdraw a token
each member of the committee forms a signature that includes the
withdrawal ID, the amount of funds, the recipient's address, the
sender's ID and the token address. The signature is sent to the Echo
network by the corresponding `sidechain_propose_signature` operation.

#### Sending of the withdrawal to the Ethereum network

When receiving the required number of signatures `(3/2 n + 1)` a
committee member selected through the VRF calls the `withdraw` method in
the Echo contract on the Ethereum side.

#### Confirmation of the withdrawal

Calling a contract on the Ethereum side calls an event. Each committee
member proxy this event into an operation of the Echo network. Upon
receiving the required number of operations `(3/2 n + 1)` the withdrawal
is considered closed.

## Additional functionality

### Commission reimbursement

Performing transactions with the creation of a new wallet address and
withdrawal of funds require some ETH expenses on the side of the
Ethereum network. Initially, the commission is paid by a committee
member who calls the transaction in the Ethereum network. 

The reimbursement occurs at the time of money withdrawal by the user. In
case the user has not yet settled the debt for the creation of a new
wallet address, the final withdrawal amount of Ethereum to the final
address will be decreased by the cost of creating a new wallet address
and the cost of the withdrawal transaction. Thus, the committee members
receive the spent amount of ETH in the Ethereum network. 

Considering that not all the transactions on address creation will be
reimbursed, the reimbursement of expenses will be refunded partly by the
percentage of the commission for the operations in the Echo network. 

The commission for token withdrawal transactions is reimbursed in eETH
on the Echo side by writing it off from the fee pool balance to the
committee member’s balance. 

## Exceptional Situations

### Account Name Format `0x00000000000000000000000000000000000000`

To exclude situations where the address in the Ethereum network and the
name of the account on the Echo side overlap, it is prohibited to create
account names equal to the cryptocurrency address formats. 

- `0x0000000000000000000000000000000000000000` (Ethereum addresses)
- `0000000000000000000000000000000000` (UTXO addresses)

### Transfer of an asset other than eETH to an Ethereum address

In order to prevent a situation in which the user transfers an asset
other than eETH to an Ethereum address, this type of address allows to
transfer eETH only. 

### Fork procession on the Ethereum side

Since the Ethereum side implies the possibility of forks, all events
from the network must be transmitted to the Echo network with a lag of N
blocks, where 'N' is a parameterized value. 

### Unconscionable work of the committee member

#### False wallet address

Since a committee member can send an operation about a new wallet
address specifying it wrong, the network must select and save the
address that has more confirmations. A confirmed address is the one that
has collected `3/2 n + 1` votes of the committee members. 

#### The selected by VRF participant does not send a transaction to the Ethereum network

The protocol provides a predefined time slot tied to the number of
blocks for which a committee member must send a transaction to the
Ethereum network, while all the others receive an event about the
transaction. In case when for the prespecified time interval the
committee members do not receive the event, a new participant is
selected to send the transaction to the network. 

When a slot is skipped, a committee member finds an increment of the
skipped slot. Anyone can see the information, which can become the
reason for voting for another committee member. 

The number of blocks of a slot is a parameterizable value.

#### Ability to use eETH without additional asset

eETH is a full-fledged asset in the Echo network, which provides the
possibility to pay commission fees for operations. The fee pool of the
asset is not replenished, while the commission fee paid in eETH is
distributed according to the accepted protocol, similar to the
distribution of the commission fees in ECHO. 

The amount of the commission depends on the eETH -> ECHO exchange rate,
which is set by the committee members using the feed functionality. 

#### Changing committee members on Echo's side

In order to change committee members on Echo, you need to change the
public keys of the contract on Ethereum. To do this, each of the current
members of the committee sends an operation on the network with their
signature approving the change of members. 

After 3 / 2n + 1 votes of the current participants have been added to
the network, the last added committee member sends a transaction to the
Ethereum network, calling the contract's ‘changeCommittee’ method. 

Calling the contract creates an event on the Ethereum side with
information about a new list of committee members. Each member of the
committee catches this event in the Ethereum network and creates a
corresponding operation on the Echo network. 

The new committee member becomes active only in case the network has
received 3/2 n + 1 messages about the event on the Ethereum network. 

Information on how to become a member of the committee can be found in
the corresponding section - Become the committee member 
