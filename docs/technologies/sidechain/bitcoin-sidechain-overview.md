# Bitcoin Sidechain (Echo)

## General Overview

Bitcoin Sidechain (BS) is an Echo extension functioning as a gateway
between Echo blockchains and Bitcoin blockchains, which allows to use
Bitcoin within the Echo blockchain and withdraw it out of the Echo
network back into the Bitcoin network. 

The functionality is implemented by freezing the assets on the
corresponding address of the Bitcoin side and activating the
corresponding amount of funds on the Echo side (to deposit assets in
Echo). The reverse process can be carried out for withdrawing funds back
to the Bitcoin network. 

The participants of the Echo network serve as intermediaries that
implement the connection between the two blockchains. 

## User Steps

For any action on deposit or withdrawal of funds, the user must create
an account first and request a Deposit Address: 

1. register a new account in an Echo wallet;
1. set an operation: a request to create a new Deposit Address.


### Bitcoin Deposit

1. transfer the BTC in the Bitcoin network to the previously generated
   Deposit Address;
2. wait for the confirmation of the transfer to the Echo network to be
   able afterwards to use the corresponding balance in eBTC in the Echo
   network.

### Bitcoin Withdrawal

1. send eBTC in the Echo network to the Bitcoin address;
2. wait for confirmation of the transfer to be able to use the
   corresponding balance at the specified above address in the Bitcoin
   network. 


## Sidechain Operation Protocol

### Main Sections of the Protocol

1. Creation of a Bitcoin Deposit Address.
1. Processing of the deposit in Bitcoin.
1. Processing of the withdrawal in Bitcoin.

### Creation of a Bitcoin Deposit Address

1. Request of an operation to create an address.
1. Address generation

The address represents a segwit multisig (a custom script). The script
of the given address allows to return the funds to the sender in case of
gateway malfunction. 

The user generates a transaction containing the operation 'Create
Bitcoin Address' and sends the transaction to the Echo network. During
the transaction processing the user gets a new bitcoin address linked to
the user account. 


### Processing of the deposit in Bitcoin

1. monitoring of transactions to the Deposit Addresses

All the participants listen to the Bitcoin blockchain. Each of them
checks each block to find possible transactions to Deposit Addresses. 

2. Informing the network about the transaction

On receiving a Bitcoin block containing a transaction with an address
generated in Echo, the participants set an operation with the
information about the given BTC deposit to the Echo blockchain. The
operation creates a new object which stores the information about the
BTC deposit. A new object is created in case there is no such object
yet. If such an object already exists the operation calls an increase in
the value of the counter. When the object's counter has a value that
exceeds the two-thirds of the number of active participants, it can be
considered valid. When processing an Echo block, the protocol creates an
object that stores the Bitcoin transaction for transferring BTC from the
Deposit Address created by the user to the address of the funds
repository. The action is possible if the protocol contains
deposits/withdrawals which are valid. 

3. Transferring of funds to the Repository Address 

When the transaction is formed, the participants are requested to sign
the transaction, which is located in the object, with their own private
keys. As soon as the transaction is signed by 2/3 + 1 active
participants, it will be sent to the Bitcoin network (by all the
participants). 

4. Transferring of funds to the user account

When the transaction sent on the Bitcoin side is confirmed, the user in
the Echo network gets the eBTC. 

### Processing of the withdrawal in Bitcoin

The user creates a transaction containing a BTC deposit operation and
sends it to the Echo network. On the processing of this transaction, The
Echo protocol generates an object containing the information about the
deposit. When processing an Echo block, the protocol creates an object
that stores the Bitcoin transaction. Afterwards, the participants are
requested to sign the Bitcoin transaction, which is located in the
object, with their own private keys. As soon as the transaction is
signed by more than 2/3 of the active participants, it will be sent to
the Bitcoin network (by all the participants). When the transaction sent
on the Bitcoin side is confirmed, the user on the Bitcoin side can use
the received BTC. 

## Change of Funds Repository

### Problem Description

When changing the active participants, the keys from the Sidechain of
managing account should be replaced and a new address for the storage of
funds, based on the keys of the new active participants should be
created. It is necessary due to the fact that all the BTC deposited into
Echo are stored in one vout of the Funds Repository and the keys of all
the active participants are located in the script of the Funds
Repository. 

It is also necessary to make a transfer from one Funds Repository
Address to the new one. For doing this, the number of changeable active
participants for one maintenance must be limited. This was done with the
purpose to always preserve a certain number of active participants who
could sign a vin for the transfer to the new Funds Repository Address. 

One more problem is that transferring BTC from one address to another is
not that simple for the fact that it's not really clear who is to pay
the fee for the transaction in the Bitcoin network. 

The current change of funds' repository cannot be made until the
transaction on the previous change is confirmed. 

This is done for the following reasons:

Suppose the current change of funds' repository is confirmed without
waiting for the transaction on the previous change to be confirmed. When
both transactions get into the Bitcoin chain, the Bitcoin network
becomes forked and the transactions appear on one of the branches which
will subsequently be removed. The original number of the active
participants operating before the shifts remained less than it is
required to sign a new transfer to the repositories. 2. That is why it's
necessary to block the change of active participants (or funds
repository) until the transaction on the previous one is confirmed. 

According to our scenario, the change of repository address will be
performed in the following way: 

A list of new active participants is determined. At the time of
maintenance, a certain number of active participants will be changed.
The remaining number should remain sufficient for signing a transaction
to change the repository of funds. If at the time of maintenance, during
the vote counting, there is a situation in which the number of old
active participants is fewer than it is required to sign the
transaction, then there remain as many active participants as necessary
for signing. All the rest change for new ones. The remaining
participants who were supposed to be changed but did not do it, change
at the next maintenance, after the transfer to the new Funds Repository
Address is confirmed. 

- Keys of the active participants that have been removed from the list
  of active participants at the maintenance are consequently removed
  from the Sidechain of the managing account. 
- Based on the keys of the new active participants, a new Funds
  Repository Address is created. 
- Next, the network expects a BTC deposit/withdrawal. 
- As soon as a new deposit or withdrawal is made, the active
  participants whose keys are stored in the old Funds Repository Address
  sign the transaction. 
- The transaction gets the vout to the already new Funds Repository
  Address. 
- The transaction is sent to the network.
