<!-- markdownlint-disable md033 -->

# EchoRand Algorithm

Technical description of block generation in a distributed blockchain of the **Echo** project.

The theoretical solution [Algorand v9][algorand-v9], which describes the achieving of a decentralized consensus based on solving the Byzantine Generals' Problem, was used as the basis for the **EchoRand** algorithm.

The theoretical solution [Algorand v9][algorand-v9] presents several possible variants of the algorithm. **EchoRand** is based on the variant named **Algorand′2**, implemented with certain modifications.

Namely:

* The way to determine participation of a specific party in a particular step is changed
* Denial of the one-time keys model and deriving keys model for signing network messages
* The method of generating a random shared state in the third step of the BBA algorithm is changed

## General requirements for the algorithm and its implementation

Basic requirements deriving from the [marketing description][echo-wp] **Echo**:

* Maximizing network bandwidth that specifies the number of transactions per second
* Minimizing of network and computing resources for the optimization of network operations
* Decentralization - all decisions within the network are made by a consensus of a node group
* High resistance to any malicious actions in regard to the network itself and its users

Practical requirements, conditions and goals:

* Maximum simplicity source code
* Isolation of the algorithm source code from the rest of the code of the project **Echo**
* Programmed division of the `gc` и `bba` step. This will allow to replace the algorithm of reaching the Byzantine consensus, if necessary.

## Algorithm objects

* **Network node** - a server, with running `echo_node` process, local configuration and database. A physical network unit with one running instance of **EchoRand**
* **Local configuration** - a certain set of parameters accessible only to the running network node.
* **Base (database)** - a blockchain with a certain set of blocks, possibly "lagging behind" the state of most other network nodes. It stores public EDS keys of all the participants of the algorithm operation.
* **Block (block of data)** - logical database unit for storing a transaction set and the related data, that can be verified by external means
* **Transaction** - in the context of this particular algorithm, it is a certain block of data that can be verified by external means
* **Participant** - a set of [EdDSA][] private/public keys and an account balance within the **Echo** network. Basically it's an **Echo** network user, specially registered on a specific network node. One user can be registered as a participant only on a single network node at a given time. On one network node permits registration of several participants.

## Algorithm parameters

The following algorithm parameters are set by constants, or configured at the **echo_node** startup and, possibly, adjusted within certain limits during the process of the algorithm operation.

|Designation|Description|
|:---:|---|
| $Λ$ | "large" interval, the average time required to distribute a 1MB message across the **Echo** network |
| $λ$ | "small" interval, the average time required to distribute a 256Bit message across the **Echo** network |
| $N_{g}$ | the number of block producers in a round, used in the function $VRF(r, 1)$ |
| $N_{c}$ | the number of block verifiers in a round, used in the function $VRF(r, s), s > 1$ |
| $t_{h}$ | the threshold for making a positive decision when verifying, and can be selected by $0.69*N_{c}$ |
| $μ$ | $4 + 3*k, k > 0$ - maximum number of algorithm steps after which an empty new block is created |

<!-- ## Parameter selection

-

### Λ и λ interval selection

-

### The number of participants $N_{g}$, $N_{c}$

-

### Selection of the maximum number of the algorithm steps (μ)

- -->

## Cryptographic device

### Algorithms

* [EdDSA][] - deterministic algorithm for creating and verifying electronic digital signature
    * public key: 32 bytes (256 bits)
    * private key: 32 bytes (256 bits)
    * signature: 64 bytes (512 bits)
* [SHA-256][] - cryptographic hash algorithm
    * hash: 32 bytes (256 bits)
    * sequence function on a hashset (`std::less<hash_t, hash_t>`)
* [VRF][] - verifiable random function

### VRF building

#### To identify active participants

The verifiable random function at each **r** round and on each **s** step is built iteratively, in the following way:

$$1. VRF_{0}(r, s) = SHA256(Q_{r-1}, r, s)$$
$$2. VRF_{n}(r, s) = SHA256(VRF_{n-1}(r, s))$$

The result of the function operation is an array of random values of size **$N_{g}$**:

$$VRF(r, s) = { VRF_{0}(r, s), VRF_{1}(r, s), ... }$$

A specific participant is calculated from the **$VRF_{i}(r, s)$** hash in a way as to make the probability of selecting a participant as active proportional to its current balance in the system.

**$VRFN(r,s)$** set is an array of indexes, different for each network node, and in case **$i ∈ VRFN(r,s)$**, we calculate the ID of the user who is the participant for the given round and step on a selected node out of the function **$VRF_{i}(r, s)$**.

In other words, **$VRFN$** is a selection of participants from **$VRF$** who act on a particular node, round and step.

At the same round and step  but on different network nodes of the algorithm, the **$VRFN$** selections will be different, while the **$VRF$** selection will be the same.

#### To generate a random round value

The starting vector **$Q(0)$** is selected randomly at blockchain database initialization.

Then, at creation of a new block the **$Q_{r}$** vector is calculated the following way:

1. **$Q_{r} = H( signQ_{r-1}, r )$**, if the **$B(R)$** block is not empty.
1. **$Q_{r} = H( Q_{r-1}, r )$**, if the **$B(R)$** block is empty.

> The signature in the case № **1** uses a private key of the participant who creates the block

#### To generate a random value on r = 7,10,13,... BBA step

$BBARAND(s) = lsb( SHA256( Q_{r-1}, r ) )$

## Notation keys

|Designation|Description|
|:---:|---|
| **$N$** | number of nodes |
| **$sign(x)$** | signature [EdDSA][] |
| **$H(x)$** | hash [SHA-256][] |
| **$r$** >= 1 | current round of the algorithm, which is virtually equal to the number of blocks in the database plus one |
| **$s$** >= 1 | current step number of the algorithm in the round |
| **$B_{r}$** | block created in the **r** round, which equals to { **$r$**, **$producer-id$**, **$Q_{r}$**, **$HB_{r}$**, **$HB_{r-1}$**, **$sigB$**, **$PAY_{r}$**, **$CERT_{Br}$** } |
| **$HB_{r}$** | **$B_{r}$** block hash |
| **PAY<sup>r</sup>** | set of transactions in the **$B_{r}$** block  |
| **$Q_{r}$** | shared random vector of the **$r$** round |
| **$signQ_{r}$** | signature of a random vector of the **$r$** round |
| **$signB_{r}$** | signature of a block of the **$r$** round |
| **$l(r)$** | round **$r$** leader - determines **$PAY_{r}$**, creates **$B_{r}$** and determines **$Q_{r}$** |
| **$CERT_{r}$** | **$B_{r}$** block certificate, formed out of a set of **$bba_signature$** messages |
| **$VRF(r, s)$** | ordered set of participants who act in step **$s$** of  round **$r$** |
| **$VRFN(r, s)$** | ordered set of indexes of **$VRF(r, s)$** participants who are registered on the current node and participate in step **$s$** of round **$r$** |

An instance of the **EchoRand** algorithm is understood as an implementation of the algorithm that is performed on a certain node of **Echo** network.

## VRF(r, s) function

<!-- The function building is described in the document [ECHO: Model of Functioning of Distributed Ledger][echo-model], in the form of an interval tree for all the known participants in the system. -->

The function returns a list of participants of a given length of round **r** and step **s**, which is the same for all the nodes in the network.

It should be noted that the function uses a fixed state of blockchain database to calculate the participants' balances. In the general case, this function can use a state of the round **max{0, r - k}**, где **k = 1,...**.

To calculate the function, a random vector of the **Q(r-k)** round is required.

## Algorithm description

The outline of the algorithm operation for round **r** and a fixed participant.

Any use of the **sign(x)** function requires the use of a private key of this fixed participant, which is available for the instance of the **EchoRand** algorithm.

Public keys of all the **Echo** network participants are supposed to be available on each node of the network.

It is beyond the scope of this document to describe the mechanism of participants registration on a node, the compliance with their accounts within **Echo** network and the process of distributing their public keys.

### Getting started

#### 0. Preparation

**Input data**:

* **Q_{r-1}** from **CERT_{r-1}**

The round **R_{r}**, which launches step 1 and step 2, described below, is created.

#### 1. Candidate blocks generation

**Input data**:

* **HB_{r-1}** from **CERT_{r-1}**
* **A_{1}**, **N_{1}** from the context of the round

1. **Start**: right after determining **CERT_{r-1}**
1. **Verification**:
    1. If **N_{1}=∅**, complete the step
    1. select participant index with **n = N_{1}[0]** as a creator of this block on the node
    1. get actual ID of the the participant in the blockchain: **id_{1} = A_{1}[n]**
    1. through **id_{1}** get all the private keys of a participant
1. **Block assembly**:
    1. if all the previous blocks **B(k), k=1..r-1** are available, build **PAY<sup>r</sup>**
    1. if at least one of the previous blocks is unavailable, build **PAY<sup>r</sup> = ∅**
    1. If **PAY<sup>r</sup> != ∅**, create a new block **B_{r} = { r, PAY<sup>r</sup>, Q_{r-1}, signQ_{r-1}, HB_{r-1} }**
1. **Communication**: generation, signature and a simultaneous message sending:
    1. sign with the key **id_{1}** and send **gc_block** = **{ r, id_{1}, B_{r}, signB_{r} }**
    1. sign with the key **id_{1}** and send **gc_signature** = **{ r, id_{1}, signQ_{r-1}, HB_{r} }**

### Developing an evaluation agreement (GC)

#### 2. Leader selection (voting)

**Input data**:

* **HB_{r-1}**, **Q_{r-1}** from **CERT_{r-1}**
* **A_{1}**, **A_{2}**, **N_{2}** from the context of the round

**v** - a local structure of a step that stores the hash of the block and the ID of the leader, who created the block.

The empty set symbol assigned to the elements **v** means "empty block" and "unknown leader".
In the application, it can be a predefined constant or a separate flag in the data structure.

1. **Start**: right after defining **CERT_{r-1}**
1. **Timer**: schedule the timer after the time equal to **2 * λ**, by a trigger:
    1. To define **l**, as **id** from the received messages in **ctx[id]** with a minimum index of **A_{1}**
    1. if the local cache for **l** has the block **B_{r}**
        1. **v = { ctx[l].HB, l }**
        1. go to **Communication**
1. **Timer**: schedule the timer after the time equal to **λ + Λ**, by a trigger:
    1. **v = { ∅, ∅ }**
    1. go to **Communication**
1. **Network**: subscribe to network messages **gc_block**, **gc_signature** at the start of a step
    1. after receiving a message **gc_block** of the round **r**
        1. verify the round number in the message
        1. verify the message step equals **1**
        1. verify that **msg.id ∈ A_{1}** and get the user's public key
        1. verify the signature of the whole message
        1. verify that **msg.block** is correct
            1. verify the block's round for equality to the current
            1. verify **producer-id** ∈ A_{1}**
            1. verify **Q_{r}** from the block, if it already has the **gc_signature**
            1. verify the block signature using **producer-id** of the block
            1. verify **HB_{r-1}** from the block for equality to the local one from **CERT_{r-1}**
            1. verify the correctness of **PAY<sup>r</sup>** in the block
        1. If **ctx[msg.id]** already exists
            1. verify **ctx[msg.id].HB == H(msg.block)**
        1. If it does not exist, save **msg.id, msg.block** in the context of the round:
            1. **ctx[msg.id].B = msg.block**
            1. **ctx[msg.id].HB = H(msg.block)**
        1. if **l** and **l == id** are installed:
            1. **v = { ctx[l].HB, l }**
            1. go to **Communication**
    1. after receiving a message **gc_signature** of the round **r**
        1. verify the round number in the message
        1. verify that **msg.id ∈ A_{1}** and get the user's public key
        1. verify the signature of the whole message
        1. **msg.block_hash = ∅**: verify **msg.rand** for equality to the local one from **CERT_{r-1}**
        1. **msg.block_hash != ∅**: verify the signature **msg.rand** using **Q_{r-1}** from **CERT_{r-1}**
        1. Save **msg.id => ∅** in the context of the round, if it’s not saved yet:
            1. **ctx[msg.id].B = ∅**
            1. **ctx[msg.id].HB = msg.block_hash**
            1. **ctx[msg.id].rand = msg.rand**
1. **Communication**: generating, signing and sending of messages
    1. stop timers, **do not** unsubscribe from network messages
    1. if **N_{2} = ∅**, end the step
    1. **∀n_{2} ∈ N_{2}**:
        1. get real user’s ID in the blockchain: **id_{2} = A_{2}[n_{2}]**
        1. sign with the key **id_{2}** and send
            1. if **v != ∅**: **gc_proposal** = **{ r, 2, id_{2}, v }**
            1. if **v == ∅**: **gc_proposal** = **{ r, 2, id_{2}, ∅ }**

#### 3. Choosing the leader (vote counting)

**Input data**: **A_{2}**, **A_{3}**, **N_{3}** from the context of the round

**Start**: right after defining **CERT_{r-1}**

**v** - a local structure of a step that stores the hash of the block and the ID of the leader, who created the block.

1. **Timer**: schedule the timer after the time equal to **3 * λ + Λ**, by a trigger:
    1. **v = { ∅, ∅ }**
    1. go to **Communication**

1. **Network**: subscribe to network messages **gc_proposal** at the start of a step, after receiving
    1. verify the round number and the step number in the message
    1. verify that **msg.id ∈ A_{2}** and get the user's public key
    1. verify the signature of the whole message
    1. verify that **msg.v = { msg.block_hash, msg.leader }** is in the context of the round.
    It should be collected in the context in the previous step, as a result of **gc_block** and **gc_signature** message processing.
        1. **∃ ctx[msg.leader]** - a record for such a potential leader exists in the context
        1. **ctx[msg.leader].HB == msg.block_hash** - the block hash coincides
    1. **ctx[msg.leader].v3.push(msg.id)**, where **v3** is *unordered_set*
    1. if the counter is more than the threshold **$`t_{h}`$**: **ctx[msg.leader].v3.size() > $`t_{h}`$**
        1. **v = { msg.block_hash, msg.leader }**
        1. go to **Communication**

1. **Communication**: generating, signing and sending of messages
    1. stop timers, unsubscribe from network messages
    1. if **N_{3} = ∅**, end the step
    1. **∀n_{3} ∈ N_{3}**:
        1. get real user’s ID in the blockchain: **id_{3} = A_{3}[n_{3}]**
        1. sign with the user’s key **id_{3}** and send **gc_proposal** = **{ r, 3, id_{3}, v }**

#### 4. Primary assessment of vote counting

**Start**: right after finishing the step **3**

**Input data**: **A_{3}**, **A_{4}**, **N_{4}** from the context of the round

1. **Timer**: schedule the timer after the time equal to **2 * λ**, by a trigger:
    1. if **∃l | ctx[l].v4.size() > $`t_{h}/2`$**: **v = { ctx[l].HB, l }**
        1. otherwise: **v = { ∅, ∅ }**
    1. **b = 1**
    1. go to **Communication**

1. **Network**: subscribe to network messages **gc_proposal** at the start of a step, after receiving
    1. verify the round number and the step number in the message
    1. verify that **id ∈ A_{3}** and get the user's public key
    1. verify the signature of the whole message
    1. **msg.v = { msg.block_hash, msg.leader }**
    1. **msg.v != { ∅, ∅ }**: verify that **msg.v** is in the context of the round (should be collected in step 2)
        1. **∃ ctx[msg.leader]** - a record for such a potential leader exists in the context
        1. **ctx[msg.leader].HB == msg.block_hash** - the block hash coincides
        1. **ctx[msg.leader].v4.push(msg.id)**, **v4** is *unordered_set*
        1. if **ctx[msg.leader].v4.size() > $`t_{h}`$**
            1. **v = { msg.block_hash, msg.leader }**, **b = 0**
            1. go to **Communication**
    1. **msg.v == { ∅, ∅ }**
        1. **ctx.ve4.push(msg.id)**, **ve4** is *unordered_set* (**v**alue **e**mpty)
        1. if **ctx.ve4.size() > $`t_{h}`$**
            1. **v = { ∅, ∅ }**, **b = 1**
            1. go to **Communication**

1. **Communication**: generating, signing and sending of messages
    1. stop timers, unsubscribe from network messages
    1. if **N_{4} = ∅**, end the step
    1. **∀ n_{4} ∈ N_{4}**:
        1. get real user’s ID in the blockchain: **id_{4} = A_{4}[n_{4}]**
        1. sign with the user’s key **id_{4}** and send **bba_signature** = **{ r, 4, id_{4}, b, v, sign(0, v) }**

### Reaching the Binary Byzantine Agreement (BBA)

There are several classes of algorithms for reaching the Byzantine Agreement. The one which is used in **echorand** is based on the use of a shared random value.

The central idea of the algorithm is the following. At each step of the algorithm, network nodes сan be divided into two sets:

1. nodes that received a sufficient number of messages during the previous round(s) (with a certain equal value), allowing them to offer this value as a solutions.

1. nodes that received two solution variants and can not give preference to either of them.

In the latter case, undecided nodes use [VRF][] to generate a shared random value from the **{0, 1}** set for making and sending their decisions. And since the random value will be the same for all the "uncertain" nodes, all such nodes will make just the same decision.

Designations used for data storage:

* **bba0** - messages with a **non-empty** block and a vote equal to **1**
* **bba1** - messages with a **non-empty** block and a vote equal to **0**
* **bbae0** - messages with an **empty** block and a vote equal to **0**
* **bbae1** - messages with an **empty** block and a vote equal to **1**

#### 5. Step one: coin == 0

**Step**: **$`5 \le s \le μ; \space s - 2 \equiv 0 \bmod 3 \space (s = 5,8,11,...)`$**

**Start**: right after the step **s ≡ 1 mod 3, s > 3** ends

**Input data**:

* **A_{s-1}, N_{s-1}, A_{s}, N_{s}** from the context of the round
* **HB_{r-1}**, **Q_{r-1}** из **CERT_{r-1}** - to generate an empty block

**b** - local step flag that is sent in the **value** field of the **bba_signature** message.

1. **Timer**: schedule the timer after the time equal to **2 * λ**, by a trigger:
    1. **b = 0**
    1. go to **Communication**

1. **Network**: subscribe to network messages **bba_signature** at the start of a step, after receiving
    1. verify that **msg.id ∈ A_{s-1}** and get the user's public key
    1. verify the signatures of the whole message
    1. **msg.v = { msg.block_hash, msg.leader }**
    1. **msg.v != { ∅, ∅ }**:
        1. **∃ ctx[msg.leader]** - a record for such a potential leader exists in the context
        1. **ctx[msg.leader].HB == v.HB_{r}** - the block hash coincides
        1. **msg.value == 0**: **ctx[v.l].bba0[msg.s].push(msg.id, msg)**, where **bba0** array *unordered_map*
        1. **msg.value == 1**: **ctx[v.l].bba1[msg.s].push(msg.id, msg)**, where **bba1** array *unordered_map*
    1. **msg.v == { ∅, ∅ }**:
        1. **msg.value == 0**: **ctx.bbae0[msg.s].push(msg.id, msg)**, **bbae0** is an array *unordered_map*
        1. **msg.value == 1**: **ctx.bbae1[msg.s].push(msg.id, msg)**, **bbae1** is an array *unordered_map*
    1. if **∀ s >= 5 && s - 2 ≡ 0 mod 3** (**s == 5,8,11,...**) - **Ending Condition 0**
        1. if **∃l | ctx[l].bba0[s-1].size() > $`t_{h}`$**:
            1. **B_{r} = ctx[l].B**
            1. **Q_{r}** is calculated from **ctx[l].signQ**, specified in step 2
            1. **CERT_{r}** is generated from **ctx.bba1[s-1], ctx.bbae1[s-1], ctx.bba0[s-1], ctx.bbae0[s-1]**
            1. **b = 0<sup>*</sup>**
            1. **END OF THE ROUND!!!**
    1. if **∀ s >= 6 && s - 2 ≡ 1 mod 3** (**s == 6,9,12,...**) - **Ending Condition 1**
        1. if $`\sum_{n}ctx[n].bba1[s-1].size() + ctx.bbae1[s-1].size() > t_{h}`$:
            1. **B_{r} = ∅**
            1. **Q_{r}* is calculated from **Q_{r-1}**
            1. **CERT_{r}** is generated from **ctx.bba1[s-1], ctx.bbae1[s-1], ctx.bba0[s-1], ctx.bbae0[s-1]**
            1. **b = 1<sup>*</sup>**
            1. **END OF THE ROUND!!!**
    1. if $`\sum_{n}ctx[n].bba1[s-1].size() + ctx.bbae1[s-1].size() > t_{h}`$: **b = 1** и к **Communication**
    1. if $`\sum_{n}ctx[n].bba0[s-1].size() + ctx.bbae0[s-1].size() > t_{h}`$: **b = 0** и к **Communication**

1. **Communication**: generating, signing and sending of messages
    1. stop timers, **do not** unsubscribe from network messages
    1. stop verifying the last two conditions from the previous point
    1. if **N_{s} = ∅**, end the step
    1. **∀n_{s} ∈ N_{s}**:
        1. get real user’s ID in the blockchain: **id_{s} = A4[n_{s}]**
        1. sign with the key **id_{s}** and send **bba_signature** = **{ r, s, id_{s}, b, v, sign(b, v) }**
        1. where **v** is the value calculated in step 4

#### 6. Step two: coin== 1

**Step**: **$`6 \le s \le μ; \space s - 2 \equiv 1 \bmod 3 \space (s = 6,9,12,...)`$**

**Start**: right after the step **s ≡ 2 mod 3, s > 3** ends

**Input data**:

* **A_{s-1}, N_{s-1}, A_{s}, N_{s}** from the context of the round
* **HB_{r-1}**, **Q_{r-1}** из **CERT_{r-1}** - to generate an empty block

**b** - local step flag that is sent in the **value** field of the **bba_signature** message.

1. **Timer**: schedule the timer after the time equal to **2 * λ**, by a trigger:
    1. **b = 1**
    1. go to **Communication**

1. **Network**: subscribe to network messages **bba_signature** at the start of a step, after receiving
    1. verify that **msg.id ∈ A_{s-1}** and get the user's public key
    1. verify the signatures of the whole message
    1. **msg.v = { msg.block_hash, msg.leader }**
    1. **msg.v != { ∅, ∅ }**: like in step **5**
    1. **msg.v == { ∅, ∅ }**: like in step **5**
    1. if **∀ s >= 5 && s - 2 ≡ 0 mod 3** (**s == 5,8,11,...**): like in step **5** - **Ending Condition 0**
    1. if **∀ s >= 6 && s - 2 ≡ 1 mod 3** (**s == 6,9,12,...**): like in step **5** - **Ending Condition 1**
    1. if $`\sum_{n}ctx[n].bba0[s-1].size() > t_{h}`$: **b = 0** and go to **Communication**

    > $`\sum_{n}ctx[n].bba1[s-1].size() > t_{h}`$ in this step there's no need to verify how it's done in the other
    > steps. In this particular step, the condition is equal to the condition of **Ending Condition 1**.

1. **Communication**: like in step **5**

#### 7. Step three: coin = shared random value

**Step**: **$`7 \le s \le μ; \space s - 2 \equiv 2 \bmod 3 \space (s = 7,10,13,...)`$**

**Start**: right after the step **s ≡ 0 mod 3, s > 3** ends

**Input data**:

* **A_{s-1}, N_{s-1}, A_{s}, N_{s}** from the context of the round
* **HB_{r-1}**, **Q_{r-1}** из **CERT_{r-1}** - to generate an empty block

**b** - local step flag that is sent in the **value** field of the **bba_signature** message.

1. **Timer**: schedule the timer after the time equal to **2 * λ**, by a trigger:
    1. **b = BBA_RAND(r)**
    1. go to **Communication**

1. **Network**: subscribe to network messages **bba_signature** at the start of a step, after receiving
    1. verify that **msg.id ∈ A_{s-1}** and get the user's public key
    1. verify the signatures of the whole message
    1. **msg.v = { msg.block_hash, msg.leader }**
    1. **msg.v != { ∅, ∅ }**: like in step **5**
    1. **msg.v == { ∅, ∅ }**: like in step **5**
    1. if **∀ s >= 5 && s - 2 ≡ 0 mod 3** (**s == 5,8,11,...**): like in step **5** - **Ending Condition 0**
    1. if **∀ s >= 6 && s - 2 ≡ 1 mod 3** (**s == 6,9,12,...**): like in step **5** - **Ending Condition 1**
    1. if $`\sum_{n}ctx[n].bba1[s-1].size() + ctx.bbae1[s-1].size() > t_{h}`$: **b = 1** go to **Communication**
    1. if $`\sum_{n}ctx[n].bba0[s-1].size() + ctx.bbae0[s-1].size() > t_{h}`$: **b = 0** go to **Communication**

1. **Communication**: like in step **5**

#### Nodes that have completed the round

Problem:

* a node has already completed the round
* the other nodes are still performing the subsequent steps

If the node, that has already completed the round, should send **bba** messages to the subsequent steps with evaluation
(which means, that **N_{s}** in it is non-empty at some subsequent steps), then the choice of such a node, that has completed the round, must somehow be among the other nodes.

Solution: Step **bba** emulation

**Input data**:

* last value **b**
* selected block **v = { block_hash, leader }**

1. if there are no messages from the previous step and the other nodes - complete the step and the round
1. otherwise:
    1. register the messages from the other nodes for the current round/step
    1. if **N_{s} != ∅**, send the **bba_signature** messages with their choice

### Getting a new block by all the members of the network

All the network nodes perform the round steps. Messages are sent to the network only by the nodes that have already their participants selected at a given step using the **VRFN(r,s)** algorithm.

Thus, all the network nodes reach the end of the round at one of the stages of the **BBA** algorithm and get a formed **CERT_{r}**.

If the value **ctx[l].B != ∅**, then the block is received.
If the value **ctx[l].B == ∅**, then:

* **ctx[l].signQ == Q_{r-1}** means that an empty block has been created.
* **ctx[l].signQ != Q_{r-1}** means that a non-empty block has been created and the node has not received it.

## Network interaction

### Message format

Each message is entirely signed with the [EdDSA][] key of the participant who creates the message, i.e, basically, there is always a **message_signature** field in a message.

Separate fields or groups of fields are also signed with an [EdDSA][] key of the participant who creates the message.

Such a "double" signature is essential, since the signatures of certain groups of fields are later used in [VRF][] to generate a random round value, and in the signature set **CERT_{r}**.

#### 1. gc_block (candidate block)

This message is sent in step **1**, in the case of creating a block with a non-empty set of transactions.

|Field|Description|
|---|---|
| **round** | current round |
| **step** | current step |
| **id** | ID of the participant who created the block |
| **signature** | signature of the message with the participant’s key **id** |
| **block** | a block containing: the current round, the participant's ID, the block signature, etc. |

#### 2. gc_signature (random value signature)

This message is sent during step **1**, if there is at least one participant for the node for this step.

|Field|Description|
|---|---|
| **round** | current round |
| **step** | current step |
| **id** | ID of the participant who created the block |
| **signature** | signature of the message with the participant’s key **id** |
| **rand** | **signQ_{r}** - signature of a random previous round vector with the participant’s key **id** |
| **block_hash** | new block hash |
| **prev_rand** | **signQ_{r}** signature of a random vector of the round from the previous block |
| **prev_block_hash** | previous block hash |

#### 3. gc_proposal (selection of a leader and a block)

This message is sent during step **2** and step **3**, if there is at least one participant for the node for this step.

|Field|Description|
|---|---|
| **round** | current round |
| **step** | current step |
| **id** | ID of the participant who created the block |
| **signature** | signature of the message with the participant’s key **id** |
| **block_hash** | selected block hash |
| **leader** | ID of a selected leader, who created the block |

#### 4. bba_signature (BBA step results)

This message is sent during step **4** and all the subsequent steps of the algorithm, if there is at least one participant for the node for this step.

|Field|Description|
|---|---|
| **round** | current round |
| **step** | current step |
| **id** | ID of the participant who created the message |
| **value** | evaluation within the **BBA** algorithm, 0 or 1 |
| **block_hash** | selected block hash |
| **leader** | ID of a selected leader, who created the block |
| **_bba_sign** | signature for the fields **round**, **step**, **value**, **block_hash**, **leader** with the participant’s key **id** |
| **signature** | signature for the fields **value**, **block_hash**, **leader** with the participant’s key **id** |

### Message processing

Network message processing launched in step**2** does not stop at the completion of the step, but continues till the end of the round.

Network message processing for steps **BBA** (**s = 5,...**) is practically the same and does not depend on the step number.

On these steps the network handlers difference lies in a subsequent analysis of the internal counters of round context. Consequently, the network processing for these steps can be effectively implemented in the base class.

### Messages distribution

The first received **gc_block** message, node **gc_signature** forwards always.

All the subsequent **gc_block** messages, **gc_signature**, that the node receives, should only be forwarded if the **id** of the participant in this message has the smallest index in array **A_{step}**, among all the received messages of this class.

The rest of the round messages are processed and forwarded by the node only in case if:

* the node has received this message for the first time
* the message passes all the verification stages

## Exceptional situations

### No network

The steps of the algorithm will not receive messages, and an exit from a steps will only be possible when the timer triggers.

Since currently the **end of the round** occurs only as a reaction to the incoming message, the **BBA** steps will be implemented in a loop till reaching the **μ**constant. As a result, an empty block will be generated.

### Network recovery

The nodes that will enter the round in the middle, as a result of network recovery, will contain incomplete data in the context of the round. As a consequence, they will generate either *incorrect* evaluation, or vote for an empty block.

In each of these options the nodes will act as intruder nodes. As a result, the information coming from such nodes will be filtered by the **bba** algorithm.

Due to incomplete data in the local contexts, such nodes will complete the round:

* with an invalid block
* with an empty block

There will be a ramification that will occur automatically, when the rest of the network goes forwards in the process of generating new blocks

### Incomplete blockchain base in a node

The case, when the local database of a node is "catching up" with the network database.

In doing so, the algorithm cannot work due to the fact that there are no values:

* **HB_{r-1}** - hash of the last block created
* **Q_{r-1}** - random value of the last round of the algorithm

It is required to determine the moment when the local database have “caught up” with the network database and have launched a round of the algorithm.

### Absence of active participants in a step

A set of participants is calculated using [VRF][] and does not depend on actual presence of the participants in the network.There can be a situation when there are no active participants for an algorithm step.

### Allowing for ramification

Based on [algorand-v9][] (9. Handling Forks, page 70)

[echo-wp]: https://drive.google.com/file/d/1y1VCfvM8czq-BaTgEl0AuctAbGzV_S93/view
[algorand-v9]: https://drive.google.com/file/d/1dohyg2LMNxHFzzTc5VpUwm_qjegBPKe2
[EdDSA]: https://en.wikipedia.org/wiki/EdDSA
[SHA-256]: https://en.wikipedia.org/wiki/SHA-2
[VRF]: https://en.wikipedia.org/wiki/Verifiable_random_function
