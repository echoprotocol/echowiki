# EchoRand

EchoRand is the consensus mechanism used by the Echo protocol to provide very fast and final consensus. By randomly selecting validators for each block rather than forcing every node to validate every block, EchoRand minimizes the resource requirements of running a node without compromising speed or security.

The basis for the **EchoRand** algorithm is the [Algorand v9][algorand-v9] theoretical work, a Byzantine agreement protocol proposed by Jing Chen, Sergey Gorbunov, Silvio Micali, and Georgios Vlachos. Algorand v9
describes a algorthim for reaching consensus in a decentralized network by with Byzantine fault tolerance. In the [Algorand v9][algorand-v9] paper, several possible varations of the algorithm are presented. **Algorand’2** is chosen as the basis for **EchoRand**. EchoRand combines techniques from early proof of stake blockchains like Bitshares as well as delegated proof of stake blockchains like EOS with the cryptographic sortition of Algorand v9. EchoRand also introduces a novel incentive and delegation scheme to increase network security.

## Background

The ability to reach network-wide agreement about the next suitable set of transactions and adding them to the ledger (e.g. the blockchain) is a critical property of any distributed ledger. This property has important implications for the censorship-resistance and resiliency of the network, as an adversary who disrupts this consensus process can prevent any new economic activity from happening on the protocol. The task of determining which actor (or committee of actors) in a decentralized network have the right to propose new blocks for addition to the ledger has been addressed by different protocols:

- **Proof of Work (PoW)**: The actors with the highest computational power compete for the ability to add blocks, massive real world hardware and electricity cost to participate in block generation ("mining"). Anyone can permissionlessly join or leave this competition by adding their computing power to the network. The network functions properly as long as 51% of computing power ("hash rate") is held by honest actors.
- **Proof of Stake (PoS)**: Network actors can lock ("stake") some or all of their token balance as a security deposit in order to earn the right to participate in block production. Their participation is proportional to the amount of tokens staked, and this token deposit can be destroyed ("slashed") if they are proven to harm the network. The network is secure as long as 51% of the locked currency is staked by honest actors.
- **Delegated Proof of Stake (dPoS)**: A fixed-size committee of actors has the ability to generate and verify blocks. Actors can only join this committee by vote of the entire network and votes are weighted by the amount of tokens that each network actor holds. This model most clearly parallels a representative democracy, where elected leaders are known publicly and are competing to offer the best service to the network so they will continue to be elected. The security assumption is that at least 51% of the committee members elected by the network votes are honest actors.
- **Proof of Weighted Randomness (PoWR)**: A small committee of block producers or block validators are chosen randomly from the entire set of network actors. There is no requirement to lock up or "stake" currency, add computing power, or earn the votes of other users - every network user is eligible. The likelihood of being randomly selected for the committee is proportional to a user's balance of tokens. This committee exists only for a single block, and a new committee is randomly chosen for each new block of transactions. The network remains secure as long as at least 33% of tokens are held by honest actors.

## Design Goals

In designing any distributed consensus system, one of the biggest challenges is balancing transaction throughput with centralization. On one end of the spectrum, Bitcoin is limtied to ~7 transactions per second in order to minimize the resource requirements necessary to run a full validating node. On the other end, EOS requires 21 elected block producers to maintain extremely sophisticated hardware setups, getting high transaction throughput at the cost of increased centralization.

However, this tradeoff between centralization and throughput in not fundamental. Blockchains rely on the assumption that a majority of the network is always honest. If that is the case, it follows that a random sample of the network should also consist mostly of honest nodes (provided, of course, that the sample is large enough). That is the principle that Echo relies on.

Rather than forcing every node to verify every transaction, Echo selects a random set of validators for every block. As long as enough imoqie validators attest that the block is valid, every other node on the network can accept it without needing to conduct their own verification. This allows Echo to achieve high throughput without requiring each individual node to verify every transaction like Bitcoin or compute every virtual machine state change like Ethereum.

The major goal for creating the EchoRand consensus mechanism is to reduce of amount of explicit synchronization needed for reaching consensus in a distributed ledger. Other design goals include:

- Maximizing network throughput in terms of number of transactions per second for fixed bandwidth
- Minimization of bandwidth and compute resources needed for the optimization of network operations
- Decentralization - all decisions within the network are made by a consensus of the network participants
- High resistance to any malicious actions by any network actors, including failure to propogate messages and sending contradictory messages
- Fast finality, meaning that once transaction has been succesfully added to a block, it cannot be reverted
- Resistance to blockchain forks and reorganizations

Practical requirements, conditions and goals:

- Source code that is as simple and easy to audit as possible
- Isolation of the consensus algorithm implementation from other aspects of the network
- Programmatic separation of the **Graded Consesus** (GC) and **Binary Byzatine Agreement** (BBA) steps, to allow each to be changed or replaced independently

## Overview

In EchoRand, as in other distributed consensus systems, sets of network transactions are organized into a **block**, which is logical database unit for storing a transaction set and the related data (e.g. signatures), that can be verified by external means.

EchoRand is based on the concept of splitting the process of adding a new block of transactions to the distributed ledger into separate parts and randomly assigning each role to a set of nodes. A **network node** is a server running the `echo_node` process (with a local configuration and database), connected to other Echo network nodes and running an instance of EchoRand consensus.

There are three distinct roles in EchoRand consensus:

- **Producers** are a set of nodes responsible for the construction of a new block from unconfirmed transactions. Producers propose the next block to be added to the distributed ledger.
- **Verifiers** are a set of nodes responible for validating a block proposed by the producers and reaching Byzantine agreement among the set of verifiers about which proposed block to add to the distributed ledger.
  delegated to verifie and choose the next block of the network. Different for each consensus step
- **Acceptors** are all other network nodes. They play a passive role, simply accepting an approved block signed by validators and appending the block to their own local instance of distributed ledger.

EchoRand consensus is performed in rounds, with either a new block of transactions or an empty block being appended to the distributed ledger after each round. At each round, a new set of producers and verifiers is selected from all nodes in the network in such a way that:

- The distribution of roles for the round is not known to any node in the network before the round begins.
- The assignement of roles for the round can be computed independently by every network node, without the need for any explicit communication or network-wide coordination to occur.
- The distribution of roles for any future round can not be predicted in advance by any of network node.

To accomplish this deterministic yet random assignment of roles, EchoRand uses a **verifiable random function (VRF)**, which is pseudo-random function that provides publicly verifiable proofs of its outputs' correctness, originally introduced by Mikali, Rabin and Wadhan. Using a VRF, each network node can independenly check if it is assigned the role of a producer or verifier for a given round and send cryptographically proof of that assignment to other network nodes along with the proposed next block (for producers) or signed next block (for verifiers).

The size of sets of producers and verifiers is globally-known and configurable. It can be dynamically adjusted to accomplish the best trade off between security and performance. As a safeguard against Sybil attacks, each node's probability of becoming a verifier or a producer for the round is directly proportional to that node's account balance.

In contrast to Delegated Proof-of-Stake, where only a limited set of selected users makes decisions on the network progress, thus, bringing centralization and undesired trust into the network, EchoRand brings complete decentralization through involvement of all users, produces trust through verifiable randomness and
delivers performance by limiting the number of users required for decision making to a reasonable number.

Each EchoRand block contains a list of proposed transactions and randomness seed. That seed is generated and

- Every user in the system can verify that seed was generated by producer in accordance with network rules and thus was not manipulated by the producer.
- There is no way to predict what seed should be generated by each producer before its reception from producer.

A round in EchoRand starts with receipt of the latest approved block and its randomness seed. That seed is then used to generate secondary random numbers. Using the same publicly known deterministic algorithm on every node of the network and the same seed as an input for that algorithm, the same set of secondary random numbers is independently generated for each round on each node of the network without any explicit communication between nodes. Each node in EchoRand network maintains special uniformly organized ordered map of accounts and their balances. Using secondary random numbers and publicly known algorithm, each node in the network can independently identify the set of producers and verifiers for the round.

Distribution of roles for the round is performed before application of transactions received with the last approved block. Therefore, the producer, who generates both the seed and the set of transactions, is unable to manipulate transactions in the proposed set to affect distribution of roles for the next round. At the same time, producer is unable to manipulate seed for the next round, because its generation is verifiable.

Once roles are assigned, producers propose blocks, verifiers reach consensus using one of BFT variants on one of the proposed blocks, and approve it by signing. The signed block is broadcasted to the network and accepted by other users (acceptors).

## Other Terms

The following components underlie EchoRand:

### whitepaper.md

- **executor** - the network account selected in the step of the round for performing a specific consensus action
- **round seed** - a pseudo-random value changed on each block. It serves as the basis for generating the verifiers set and block producers.
- **Graded Consensus** - one of the consensus stages, at which
  each verifier must announce their preliminary block determination regarding the current block
- **Binary Byzantine Agreement (BBA)** - a solution of the Byzantine Agreement problem, which has transfer of binary data between participants and reconciliation of results with the overall picture in its basis.

### In-a-nutshell.md

- **Graded consensus** - the stage of consensus at which each of the verifier must declare their preliminary decision
- **Byzantine agreement problem** - is a condition of a computer system, particularly distributed computing systems, where components may fail and there is imperfect information on whether a component has failed. The term takes its name from an allegory, the "Byzantine Generals' Problem", developed to describe this condition, where actors must agree on a concerted strategy to avoid catastrophic system failure, but some of the actors are unreliable.
- **Binary Byzantine Agreement (BBA)** - solution of the problem of the Byzantine agreement which is based on the transfer of binary data between the participants

### general-view.md

- **Local configuration** - a certain set of parameters accessible only to the running network node.
- **Base (database)** - a blockchain with a certain set of blocks, possibly "lagging behind" the state of most other network nodes. It stores public EDS keys of all the participants of the algorithm operation.
- **Transaction** - in the context of this particular algorithm, it is a certain block of data that can be verified by external means
- **Participant** - a set of [EdDSA][] private/public keys and an account balance within the **Echo** network. Basically it's an **Echo** network user, specially registered on a specific network node. One user can be registered as a participant only on a single network node at a given time. On one network node permits registration of several participants.

### Legend

| Designation  | Description                                                                                                                                                 |
| :----------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   $r$ >= 1   | the current round of the algorithm, it is actually equal to the number of blocks in the base plus 1                                                         |
|   $s$ >= 1   | the current number of the algorithm step in the round                                                                                                       |
|    $Q_r$     | **r** round seed                                                                                                                                            |
| $VRF(r, s)$  | an ordered plurality of executors who participate in **s** step of **r** round                                                                              |
| $VRFN(r, s)$ | an ordered indexes plurality of executors indexes from $VRF(r, s)$, who are registered at the current node and participate in **s** step of the **r** round |

## Algorithm parameters

The following algorithm parameters are set by constants, or configured at the **echo_node** startup and can potentially be adjusted within certain limits during the process of the algorithm operation.

| Designation | Description                                                                                            |
| :---------: | ------------------------------------------------------------------------------------------------------ |
|     $Λ$     | "large" interval, the average time required to distribute a 1MB message across the **Echo** network    |
|     $λ$     | "small" interval, the average time required to distribute a 256Bit message across the **Echo** network |
|   $N_{g}$   | the number of block producers in a round, used in the function $VRF(r, 1)$                             |
|   $N_{c}$   | the number of block verifiers in a round, used in the function $VRF(r, s), s > 1$                      |
|   $t_{h}$   | the threshold for making a positive decision when verifying, and can be selected by $0.69*N_{c}$       |
|     $μ$     | $4 + 3*k, k > 0$ - maximum number of algorithm steps after which an empty new block is created         |

## Cryptographic device

### Algorithms

- [EdDSA][] - deterministic algorithm for creating and verifying electronic digital signature
  - public key: 32 bytes (256 bits)
  - private key: 32 bytes (256 bits)
  - signature: 64 bytes (512 bits)
- [SHA-256][] - cryptographic hash algorithm
  - hash: 32 bytes (256 bits)
  - sequence function on a hashset (`std::less<hash_t, hash_t>`)
- [VRF][] - verifiable random function

### VRF

The concept of verifiable random function (VRF) was introduced by Mikali, Rabin and Wadhan. This is a pseudo-random function that provides publicly verifiable evidence for the correctness of its conclusion. For a given input value `x`, the owner of the secret key`SK` can calculate the value of the function $y = F_{SK}(x)$ and the proof $P_{SK}(x)$. Using the proof and public key $PK = g^{SK}$, everyone can verify that the value of $y = F_{SK}(x)$ is indeed calculated correctly, but this information cannot be used to search for the secret key.

The use of VRF in EchoRand is as follows - having a pseudo-random value for each $Q_r$ round and the VRF function, each of the network nodes can determine the list of $VRF(r, s)$ executors in **s** step of **r** round, and based on it, perform the necessary actions if the authorized account on the node is part of $VRF(r, s)$, and as well verify whether the participants have the right to act at this step.

#### Definitions of Active Performers

The checked random function at each **r** round and **s** step is built iteratively, as follows:

$$1. VRF_{0}(r, s) = SHA256(Q_{r-1}, r, s)$$
$$2. VRF_{n}(r, s) = SHA256(VRF_{n-1}(r, s))$$

The result of this function is an array of random values:

$$VRF(r, s) = { VRF_{0}(r, s), VRF_{1}(r, s), ... }$$

A specific executor is calculated from the $VRF_i(r, s)$ hash in such a way, that the probability of the choice of the participant as active, is proportional to his balance in the system at the time of the `r - 2` block.

$VRFN (r,s)$ set is an array of indexes that is different for each node of the network, and if $i ∈ VRFN (r,s)$, then the user ID is calculated from $VRF_i (r,s)$ that is the executor for the given round and step at the selected node.

In other words, $VRFN$ is a selection of those executors from $VRF$, who are authorized at the current node and must be executed on a specific round and step.

At different network nodes, at the same round and step of the algorithm, the $VRFN$ pluralities will be different, and the $VRF$ plurality will be the same.

#### Round Random Value - Round Seed - Generation

The $Q(0)$ initial vector is randomly selected while the database is initialized.

Further, the $Q_ {r}$ vector is calculated as follows while creating a new block:

For a non-empty block $B(R)$:

$$Q_{r} = H( signQ_{r-1}, r )$$

In this case, the signature uses the private key of the participant that creates the block.

In case $B(R)$ block is empty:

$$Q_{r} = H( Q_{r-1}, r )$$

#### Generating a random value at s = 7,10,13, ... BBA step

$$BBARAND(s) = lsb( SHA256( Q_{r-1}, r ) )$$

## The EchoRand Mechanism

![echorand-steps.png](./echorand-steps.png)

### Tyler Blog

EchoRand consists of three main steps:

1. Cryptographic Sortition
2. Block Generation
3. Best Block Voting and Application

## Cryptographic Sortition

For each block, a new list of possible producers is determined with the help of verifiable random function (VRF). The mechanism is as follows: for the `nth` block, we have a hash, which is the result of the previous block hash signing by the producer. Since the producer can’t affect the result of the hash function (as the data that is hashed and the private key are strictly defined), and the hashing is checked using public key, we receive a new pseudo-random number in each block. This number (hash) from the `n` block is used as a random index definition for selecting the first producer on the list to generate a block. The index of this producer is used to get the next producer on the list, etc. until a complete list of those who will offer the block is set up.
Since all input data for the VRF is already included in the previous blocks, each node in the network determines the list of producers independently, and it is the same for everyone (deterministic).
Each network node generates a list of producers for the current block and if the authorized account on the node is one from the list, it generates and sends the block to the network.

### Block generation

A certain number of accounts (a block creators set) generates a block.

The block creators set is determined by each block with the help of verifiable random function (VRF). As a result, each network node receives a $VRF(r, s)$ set and a $VRFN(r, s)$ subset - a list of accounts authorized at this node. If $VRFN(r, s)$ is not empty, the node issues a block proposal based on the transactions that are in the node mempool.

#### INSERT VRF STUFF HERE

### Voting for the best block (Graded consensus)

Voting for the choice of the best block takes place in two stages, which is divided into steps. At each step of each stage, the protocol selects a new set of verifiers - accounts that must perform an action according to the step of the consensus. The selection of verifiers is similar to the selection process for block producers, using a VRF on input data from a previous block.

It consists of 3 steps. At this stage, the goal of the verifiers is to vote and announce to the network, which of the producers they consider to be the best candidate for the current block.

#### Step 1 - the voting

Each of the selected verifiers tells the network which of the blocks they consider preferable for the current round.

#### Step 2 - vote count

Based on the messages received from step 1, to determine which of the producers got more votes and to announce it to the network. (it is done by each of the verifiers).

#### Step 3 - primary evaluation of the vote count

Having the voting results of the previous steps, the nodes know, whether the network was able to agree on the choice of the producer for the current round. Each verifier forms a message including information on the result(agreed or not) and what exactly they have agreed on, and sends the message to the network.

After this step, all nodes in the network have a preliminary idea of whether the producer of the unit has been determined or not. In an honest network, this would be enough to complete the round. But since we allow the possibility of unscrupulous participants, the network needs to verify the data. This is the objective of the next stage.

### FROM TYLER BLOG

### Graded Consensus

This stage consists of three steps. At this stage, the goal of the verifiers is to vote and announce to the network which of the potential next blocks broadcast by producers they consider to be the best candidate for addition to the network.

### Step 1 - Voting

Each of the selected verifiers tells the network which of the blocks they consider preferable for the current round.

### Step 2 - Vote Counting

Based on the messages received from other verifiers in step 1, each verifier tallies the votes to determine which of the potential blocks got the most votes and announces the results of their count to the entire network.

### Step 3 - Primary evaluation of the vote count

After receiving the voting results of the previous steps, all nodes know whether the verifiers were able to agree on the choice of the best block for the current round. Each verifier creates a message including information on the outcome (whether an agreement was reached or not) and the details of the block agreement and broadcasts this message to the network.

After this step, all nodes in the network have a preliminary idea of whether the best block has been determined or not. In an honest network, this would be enough to complete the round and append the block to the existing ledger. But since we allow the possibility of unscrupulous participants, the network needs an additional step to verify the data. This is the objective of the next stage.

### Reaching Binary Byzantine agreement (BBA)

At each step of the algorithm work, the nodes in the network can be divided into two pluralities:

- nodes that have received a sufficient number of messages in the previous round(s) (with some identical value), allowing them to offer this value as a solution.
- nodes that have received two solutions in messages and can’t give preference to any of them.

In the latter case, undecided nodes use VRF to generate a shared random number from the plurality {0, 1} to make a decision and to send it. Since the random number will be the same for all "unsure" nodes, all such nodes will take identical decision.

The stage consists of cycles, which include 3 steps each. At each step, a new set of verifiers sends their vision of the vote result vote in binary form. If as a result of the cycle (3 steps) 2/3 + 1 verifiers agree, the block is applied. If not, the cycle starts again.

If in 4 cycles (12 different sets of verifiers participate in them) the network didn’t manage to come to a common opinion, an empty block is used in the network and the next round starts from the very first step - block generation.

## Block application by the network participants

All network nodes receive all messages sent by producers and verifiers at all stages of the consensus. Accordingly, each of their nodes at the time of the consensus ending determines its end for itself, and understands which block to apply and add to the chain. It means, the final message with the resulting information isn’t sent by anyone, as it’s not necessary.

## Branching permission

The number of steps of the algorithm and dependence on the whole accounts database makes the possibility of branching unlikely.
However, EchoRand still has a branch permission mechanism.
The branching permission takes place according to one of the following scenarios:

To switch to the longest chain in the presence of several chains.

- If there is more than one long chain, to follow the one, in which the last block is not empty. If all of them have empty blocks in the end, to check the second and subsequent blocks from the end to the first non-empty block.
- If there is more than one long chain with non-empty blocks in the end of a R-length chain, to follow the one in which the r block has the smallest hash value.

## Network protocol optimization

To reduce the number of messages with information about the block proposal, the following optimizations are implemented in the protocol:

- if the network node receives a block proposal that is not the first for the round and is not better than the previous one, the node does not send a message about it to the other nodes.
- If several participants are authorized on the node for the block generation round, the node itself determines which of the blocks is the best candidate and sends a network proposal only to one block.

## Network interaction

### Message format

Each message is entirely signed with the [EdDSA][] key of the participant who creates the message, i.e, basically, there is always a **message_signature** field in a message.

Separate fields or groups of fields are also signed with an [EdDSA][] key of the participant who creates the message.

Such a "double" signature is essential, since the signatures of certain groups of fields are later used in [VRF][] to generate a random round value, and in the signature set **CERT\_{r}**.

#### 1. gc_block (candidate block)

This message is sent in step **1**, in the case of creating a block with a non-empty set of transactions.

| Field         | Description                                                                            |
| ------------- | -------------------------------------------------------------------------------------- |
| **round**     | current round                                                                          |
| **step**      | current step                                                                           |
| **id**        | ID of the participant who created the block                                            |
| **signature** | signature of the message with the participant’s key **id**                             |
| **block**     | a block containing: the current round, the participant's ID, the block signature, etc. |

#### 2. gc_signature (random value signature)

This message is sent during step **1**, if there is at least one participant for the node for this step.

| Field               | Description                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **round**           | current round                                                                                  |
| **step**            | current step                                                                                   |
| **id**              | ID of the participant who created the block                                                    |
| **signature**       | signature of the message with the participant’s key **id**                                     |
| **rand**            | **signQ\_{r}** - signature of a random previous round vector with the participant’s key **id** |
| **block_hash**      | new block hash                                                                                 |
| **prev_rand**       | **signQ\_{r}** signature of a random vector of the round from the previous block               |
| **prev_block_hash** | previous block hash                                                                            |

#### 3. gc_proposal (selection of a leader and a block)

This message is sent during step **2** and step **3**, if there is at least one participant for the node for this step.

| Field          | Description                                                |
| -------------- | ---------------------------------------------------------- |
| **round**      | current round                                              |
| **step**       | current step                                               |
| **id**         | ID of the participant who created the block                |
| **signature**  | signature of the message with the participant’s key **id** |
| **block_hash** | selected block hash                                        |
| **leader**     | ID of a selected leader, who created the block             |

#### 4. bba_signature (BBA step results)

This message is sent during step **4** and all the subsequent steps of the algorithm, if there is at least one participant for the node for this step.

| Field          | Description                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| **round**      | current round                                                                                                         |
| **step**       | current step                                                                                                          |
| **id**         | ID of the participant who created the message                                                                         |
| **value**      | evaluation within the **BBA** algorithm, 0 or 1                                                                       |
| **block_hash** | selected block hash                                                                                                   |
| **leader**     | ID of a selected leader, who created the block                                                                        |
| **\_bba_sign** | signature for the fields **round**, **step**, **value**, **block_hash**, **leader** with the participant’s key **id** |
| **signature**  | signature for the fields **value**, **block_hash**, **leader** with the participant’s key **id**                      |

### Message processing

Network message processing launched in step**2** does not stop at the completion of the step, but continues till the end of the round.

Network message processing for steps **BBA** (**s = 5,...**) is practically the same and does not depend on the step number.

On these steps the network handlers difference lies in a subsequent analysis of the internal counters of round context. Consequently, the network processing for these steps can be effectively implemented in the base class.

### Messages distribution

The first received **gc_block** message, node **gc_signature** forwards always.

All the subsequent **gc_block** messages, **gc_signature**, that the node receives, should only be forwarded if the **id** of the participant in this message has the smallest index in array **A\_{step}**, among all the received messages of this class.

The rest of the round messages are processed and forwarded by the node only in case if:

- the node has received this message for the first time
- the message passes all the verification stages

## Exceptional situations

### No network

Steps of the algorithm will not receive messages and all exits from the steps will occur only when the timer is triggered.

Since the end of the round at the moment occurs only as a reaction to an incoming message, the BBA steps
will be executed in a loop until reaching the **μ** constant. As a result, an empty block will be generated.

### Network Restoring

Nodes that as a result of network recovery will enter the round in the middle, will contain incomplete data
in their round contexts. As a result, they will either generate incorrect estimates or vote for an empty block.

In each of these options, the nodes will behave as node-intruder. As a result, information from such
nodes will be filtered by the BBA algorithm.
Due to incomplete data in local contexts, such nodes will complete the round:

- with a wrong block
- with an empty block

A branching, which will be automatically resolved when the rest of the network goes ahead in the process of generating new blocks, will occur.

### Network recovery

The nodes that will enter the round in the middle, as a result of network recovery, will contain incomplete data in the context of the round. As a consequence, they will generate either _incorrect_ evaluation, or vote for an empty block.

In each of these options the nodes will act as intruder nodes. As a result, the information coming from such nodes will be filtered by the **bba** algorithm.

Due to incomplete data in the local contexts, such nodes will complete the round:

- with an invalid block
- with an empty block

There will be a ramification that will occur automatically, when the rest of the network goes forwards in the process of generating new blocks

### An incomplete blockchain base in node

It’s the case in which the local database of the node is catching up with the network database.
In this case, the algorithm cannot work due to the fact that there are no values:

- $HB_{r-1}$ - is hash of the last created block
- $Q_{r-1}$ - is a random value of the last round of the algorithm

It is required to determine the moment when the local database will “catch up” with the network database and launch a round of the algorithm.

### Lack of active performers in the step

A participants set makes calculations using VRF and does not depend on the actual presence of participants in the network.
There may be a situation when for some step of the algorithm there are no active performers.
In this case, the active members of the network at the expiration of the timeout simply go to the next step or use an empty block, in case it was the last step.

### Allowing for ramification

Based on [algorand-v9][] (9. Handling Forks, page 70)

## Delegation of participation in consensus

The participants on the rounds are the accounts, but to participate in the consensus, the active node is needed, since only having the current network status and the availability of free transactions in the mempool allows one to determine the sets of the performers, to collect and check messages.

Given that most accounts do not have the ability to maintain an active node in the network, but can be selected to participate in the round, the protocol implements the mechanism for delegating participation in consensus to other accounts. This means that an `A` account can set for itself a trusted `B` account with a knowingly running node in the network and thereby give the `B` account an opportunity to issue consensus messages at the moment when the `A` account was selected by the participant.

By default, the `B` trusted account for the `A` account becomes the account that registered the `B` account in the network.

### Tyler Blog

All users are eligible to participate in every lottery to determine if they have a "winning ticket" to serve as a block producer or verifier for each block. The only requirement is that after every block is finalized, each user must independently run the VRF computation to generate a "lottery ticket" for the next block. This requires that the user have an online node that's connected to the rest of the network and the ability to sign new blocks with their private key. Although EchoRand is designed to be minimally resource intensive for node operators, the protocol recognizes that every user may not be able to run their own node, and provides a way to "delegate" the block production role to another node by providing a type of secret key called a delegation key, which allows another user to participate in consensus on their behalf but not spend funds from their account. Because of these feature, every user should be able to participate in the consensus mechanism either by operating their own node or by delegating that right.

## Security and Performance

Because the selection of block producers and verifiers is weighted by the users balance of tokens, EchoRand transforms the typical byzantine fault tolerance requirement of 2/3rd of honest nodes to a more sybil-resistant requirement that **2/3rds of tokens** are held by honest nodes. This assumption is also improved because the nodes with the highest token balances have the most "skin in the game", and thus the most economic value to lose of the network is attacked. As long as 2/3rds of tokens are held by honest nodes participating in consensus, the network will run at maximum performance, with no loss of capacity.

In the case that **less than 2/3rds of tokens are held by honest users** participating in consensus, the network will begin to suffer from degraded performance in the form of empty blocks being added to the ledger. As this honest participation rate declines from 67% to 33%, the statistical probability of empty blocks being added to the ledger increases linearly from 0 to 100%.

With more than 67% of tokens held by an attacker, the attacker could continually disrupt the consensus mechanism and prevent new blocks from being added to the ledger or censor transactions, just as an attacking miner with 51% of hash rate in a proof of work-based currency.

## Incentives

Unlike Algorand, EchoRand introduced a formal incentive scheme to reward users for participating in the consensus process either by running a full node or delegating to another node. This incentive scheme is designed to balance the optimal security and performance of EchoRand network by incentivizing more nodes to participate in consensus whenever performance drops below optimal levels, while maintaining adequate security and decentralization.

Under this incentive mechanism, the block producers which generate a block which is successfully added to the ledger are reward with some newly created tokens, similarly to a block reward in Bitcoin. Additionally, all verifiers who participated in the voting and validation process of a successful block are also rewarded with a smaller amount of newly created tokens. In the case that an empty block is added to the network, no nodes receive a block reward.

When the network begins to generate empty blocks due to failure of consensus (whether because of an attacker or through low participation in consensus by honest users), the protocol increases the block reward (which inflates the entire token supply) in order to incentivize more rational users to participate in consensus. When the performance returns to the acceptable threshold, the block reward is decreased over time until it returns to the minimum inflation rate.

> Creating an account in the Echo network requires creating a corresponding transaction added to the block

[algorand-v9]: https://drive.google.com/file/d/1dohyg2LMNxHFzzTc5VpUwm_qjegBPKe2
[echo-wp]: https://drive.google.com/file/d/1y1VCfvM8czq-BaTgEl0AuctAbGzV_S93/view
[algorand-v9]: https://drive.google.com/file/d/1dohyg2LMNxHFzzTc5VpUwm_qjegBPKe2
[eddsa]: https://en.wikipedia.org/wiki/EdDSA
[sha-256]: https://en.wikipedia.org/wiki/SHA-2
[vrf]: https://en.wikipedia.org/wiki/Verifiable_random_function
