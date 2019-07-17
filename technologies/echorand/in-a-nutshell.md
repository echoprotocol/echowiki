# EchoRand. In a nutshell

## Terms

- **Producers** - a list of accounts delegated to offer the next block of the network. Different for each block
- **Verifiers** - a list of accounts delegated to verifie and choose the next block of the network. Different for each consensus step
- **Verifiable random function (VRF)** - pseudo-random function that provides publicly verifiable proofs of its outputs' correctness
- **Graded consensus** - the stage of consensus at which each of the verifier must declare their preliminary decision
- **Byzantine agreement problem** - is a condition of a computer system, particularly distributed computing systems, where components may fail and there is imperfect information on whether a component has failed. The term takes its name from an allegory, the "Byzantine Generals' Problem", developed to describe this condition, where actors must agree on a concerted strategy to avoid catastrophic system failure, but some of the actors are unreliable.
- **Binary Byzantine Agreement (BBA)** - solution of the problem of the Byzantine agreement which is based on the transfer of binary data between the participants
- **Network node** - a server, with running echo_node process, local configuration and database. A physical network unit with one running instance of EchoRand
- **Block (block of data)** - logical database unit for storing a transaction set and the related data, that can be verified by external means

## Main stages of consensus

Echorand consists of the following steps:

- Block generation by producers
- Voting for the best block
- Block application

### Block generation

A certain number of accounts (producers) generates a block.

For each block, a new list of producers is determined with the help of Verifiable Random Function (VRF). The mechanism is as follows: in the `n` block, we have a hash, which is the result of the previous block hash signing by the producer. Since the producer can’t affect the result of the hash function (the data that he hashes and the private key are strictly defined), and the hashing is checked using public key, we receive a new pseudo-random number in each block. This number (hash) from the `n` block is used as a random index definition for selecting the first producer on the list to generate a block. The index of this producer is used to get the next producer on the list, etc. until a complete list of those who will offer the block is set up.

Since all input data are already in the previous blocks, each node in the network determines the list of producers independently, and it is the same for everyone.

The network node generates a list of producers of this block and if the authorized account on the node is one from the list, it generates and sends the block to the network.

### Voting for the best block

Voting for the choice of the best block takes place in 2 stages, which in their turn are divided into steps. At each step of each stage, it selects a new set of verifiers - accounts that must perform an action according to the step of the consensus. The choice of verifiers is similar to the choice of the producers.

#### Stage 1 (Graded Consensus)

It consists of 3 steps. At this stage, the goal of the verifiers is to vote and announce to the network, which of the producers they consider to be the best candidate for the current block.

##### Step 1 - the voting

Each of the selected verifiers tells the network which of the blocks they consider preferable for the current round.

##### Step 2 - vote count

Based on the messages received from step 1, to determine which of the producers got more votes and to announce it to the network. (it is done by each of the verifiers).

##### Step 3 - primary evaluation of the vote count

Having the voting results of the previous steps, the nodes know, whether the network was able to agree on the choice of the producer for the current round. Each verifier forms a message including information on the result(agreed or not) and what exactly they have agreed on, and sends the message to the network.

After this step, all nodes in the network have a preliminary idea of whether the producer of the unit has been determined or not. In an honest network, this would be enough to complete the round. But since we allow the possibility of unscrupulous participants, the network needs to verify the data. This is the objective of the next stage.

#### Stage 2 - reaching Binary Byzantine agreement (BBA)

At each step of the algorithm work, the nodes in the network can be divided into two pluralities:

- nodes that have received a sufficient number of messages in the previous round(s) (with some identical value), allowing them to offer this value as a solution.
- nodes that have received two solutions in messages and can’t give preference to any of them.

In the latter case, undecided nodes use VRF to generate a shared random number from the plurality {0, 1} to make a decision and to send it. Since the random number will be the same for all "unsure" nodes, all such nodes will take identical decision.

The stage consists of cycles, which include 3 steps each. At each step, a new set of verifiers sends their vision of the vote result vote in binary form. If as a result of the cycle (3 steps) 2/3 + 1 verifiers agree, the block is applied. If not, the cycle starts again.

If in 4 cycles (12 different sets of verifiers participate in them) the network didn’t manage to come to a common opinion, an empty block is used in the network and the next round starts from the very first step - block generation.

### Block application

All network nodes receive all messages sent by producers and verifiers at all stages of the consensus. Accordingly, each of their nodes at the time of the consensus ending determines its end for itself, and understands which block to apply and add to the chain. It means, the final message with the resulting information isn’t sent by anyone, as it’s not necessary.
