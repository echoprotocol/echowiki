# EchoRand Architecture

## General description

|Class|Role|
|---|---|
|Step|algorithm implementation step|
|Round|step manager within the algorithm round|
|Agreement|round manager and the front-end of the algorithm|
|Options|initial parameters of the algorithm|
|Network message classes|communication links between network nodes|

### Algorithm

`agreement` class is the main algorithm implementation class - an interface for external use.

The class implements the following functionality:

* storage of configuration parameters, such as:
  * parameters for the algorithm operation (maximum number of steps, timeouts, etc.);
  * **$Q (r-1)$** initial value (random variable from the previous block);
  * **$HB (r-1)$** initial value ([SHA-256] [] hash address of the previous block);
  * access interface to public keys of the relevant parties for verifying the signature;
  * block validation interface;
  * each party's private keys on the node.
* configuration settings;
* start-up and shutdown of the algorithm operation as a whole.

As part of the algorithm operation:

* start of rounds;
* storing links to the rounds;
* suspension of a round to add a new block to the database blockchain;
* initial reception of network messages and their transfer to the corresponding rounds;
* providing the rounds with links to specific interfaces, through the adapter implementation.

### Round

All steps of the algorithm are implemented within the context of a particular round.

Each round has its own number.

Functionality:

* owns all its steps and shared data. Algorithm steps generate the shared data, save and exchange them, where necessary, through the round;
* receives network messages from `agreement` and transfers them to the corresponding step of the algorithm;
* forwards network messages to the other nodes in accordance with the algorithm described in the [technical description](echorand / tech);
* runs the steps of the algorithm;
* waits for the notification of a step suspension and decides on the start of the next step or the end of the round;
* notifies `agreement` about its suspension.

The round can be ended only from the `bba` steps.

The result of the ended round is the new block's signature and, optionally, the new block itself.

If the round is ended without a block, a new round starts, while the ongoing round is waiting for a new block to arrive
launching a specific  `step_finish` step. The decision is made by `agreement`,
analyzing the operation results of the round that sent the notification of suspension.

It should be noted that theoretically there might be a situation where there are several
rounds in `step_finish`, and thus several blocks. Via the network there can arrive the block **n**, while the block **n-1**
is still in `step_finish` - tail fragmentation blockchain. Such a situation should be foreseen
in the `agreement` class. For example, by entering a variable of the state of the round, which takes the following values:

* gets implemented;
* waits for a block;
* waits to be added to blockchain.

### Steps

Each step of the algorithm must be implemented asynchronously, responding simultaneously to the timer events
and events of the network, such as network messages arrival.

Each step of the algorithm has its own number.

All steps of the algorithm are divided into groups: `gc`, `gc-bba` and `bba`, each of which shows
significantly different behavior.

The steps of the `gc` group start all together with the start of the round and work simultaneously.

The only `gc-bba` group step starts after the end of the last step of the `gc` group.

>This refers to the last step by number, not the last step that was ended.
>
>However, the timeouts for the steps are chosen in such a way that the last step by number
actually becomes the last ended step of the group `gc`.

The steps of the `bba` group start immediately after the end of the `gc-bba` step and work sequentially, one after the other
till the end of the round, or till reaching a certain step limit. The step limit for the group `bba`
is set from the outside of the algorithm implementation, as a configuration parameter.

### Auxiliary functionality

#### Algorithm parameters

The structure used during the initialization of the `agreement` class and for the subsequent
storing of parameters inside the class. In general, it's always possible to get the `agreement`
from the structure privately.

#### Messaging Interface

It can be implemented as a separate interface.

Also, if you have a base class for all network messages, it can be also implemented
through a simple transfer of a functor to the `agreement` class. Pretty much like this:

```cpp
using network_sender_t = std::function<bool (const graphene::net::echorand_message&)>;
network_sender_t _send_message;
bool send_message(graphene::net::echorand_message& msg) { _send_message(msg); }
```

#### Interface for creating a new block

At the end of the round `agreement` class should add a new block to the local database.

For interacting with the `Graphene API`, the same mechanism
as with the messaging interface can be envisaged.

```cpp
using block_handler_t = std::function<bool (const graphene::chain::signed_block&)>;
void send_message(const graphene::net::echorand_message& msg) const noexcept;
```

#### Interface for the block validation check

During the operation of the algorithm, it's necessary to check the validation of the arrived block. Basically it means
to check its transactions using the `Graphene API`.

Such an interface can also be implemented like the interface for creating a new block described in the previous point.

```cpp
using block_handler_t = std::function<bool (const graphene::chain::signed_block&)>;
void check_block(const graphene::chain::signed_block& block) const noexcept;
```

#### Interface for getting information about the involved parties

At the start of the round, and at the start of the following series of the `bba` steps, you will need to receive
a list of the involved parties with their keys. Local parties on the network node need
a pair of keys - a private and a public one, for remoted parties only a public key is required.

Such an interface can also be implemented like the one described in the previous point.

```cpp
using witness_getter_t = std::function<witnesses_t (unsigned, unsigned)>;
witnesses_t get_witnesses(unsigned round_id, unsigned step_id) const noexcept;
```

#### Network message classes

Get implemented separately within the corresponding `Graphene API` modules.

If `Graphene API` allows, it's better to implement the message classes as a hierarchy:

```mermaid
graph TD;
  echorand_message-->echorand_gc_proposal;
  echorand_message-->echorand_gc_signature;
  echorand_message-->echorand_bba_signature;
```

### Initialization

The object `agreement` is created in the `graphene::app::application` class constructor using the `echo::randopt` structure.

The `graphene::app::application` class controls the switching on and off function of the `agreement` algorithm rounds depending on
the block synchronization process activity. If necessary, it changes **Q(r-1)** и **HB(r-1)** in the parameters of `agreement`
after synchronization before running the algorithm.

`graphene::app::application` class transfers all the messages coming through the `echorand_message` network to the `agreement` class.

It's also required to consider modifications of the private keys of the involved parties on the node in the `agreement` class parameters.

Since the `fc::schedule` interface is used, all the rounds and steps should be created like the `std::shared_ptr`, must be inherited
from `std::enable_shared_from_this<...>` and, when scheduling an event from the timer, must use the following scheme:

```cpp
auto pThis = shared_from_this();
fs::schedule( [pThis, this](){ onTimer(); }, timeout );
```

which will be done in the base class of the step, for the timer functionality implementation.

### Functioning

After the start, the `agreement` class creates a round. In the constructor the round creates three steps: `step_gc1`, `step_gc2`, `step_gc3`.

The steps are run automatically, by a round. In their corresponding constructors, if necessary, they produce the necessary
preliminary calculations and become scheduled for the timers.

The algorithm receives network messages from the application and sends them to the corresponding round with their relevant number. The round sends
them to the specified step, in accordance with the step number in the message.

As soon as a result of a network message or when the timer goes off a step decides to end,
it saves the results of its work in a round. After this, the step marks the fact that it's over inside itself
and reports this to the round. Then, the round removes this step from its collection.

Most likely, the end of the step will be a result of a network message. In this case,
the event will still be recorded on the timer and, therefore, will keep the step in memory. Unfortunately,
in the `Graphene API` the timer functors cannot be canceled and they always work. In this case,
after the timer goes off, the processing event will see that the step is marked as completed
and will simply exit. As a result, the step will be removed from memory.

Another option is to stop the algorithm. In this case, the `Graphene App` application library calls a method of ending the algorithm. This method will remove all the rounds. The rounds will remove all the steps, marking them as completed. In case some steps remain registered on the timers, after a while they will be removed from memory, as it is described above.

## Schemes

### Inheritance schemes

```mermaid
graph TD;
  options;
  options-->agreement;
  round;
  step("step [abstract]")-->step_gc("step_gc [abstract]");
  step-->step_bba("step_bba [abstract]");
  step_gc-->step_gc1;
  step_gc-->step_gc2;
  step_gc-->step_gc3;
  step_gc-->step_gc_bba;
  step_gc-->step_finish;
  step_bba-->step_bba1;
  step_bba-->step_bba2;
  step_bba-->step_bba3;
```

### Ownership scheme

```mermaid
graph LR;
  agreement==shared==>round;
  agreement--contains-->options;
  round==shared==>step;
  step-.weak.->round;
  fc::schedule==shared==>step
```

## Class descriptions

All classes are mentioned in the `echo::rand` namespace.

Only basic architecture classes are demonstrated.

```cpp
/// configuration options for echorand protocol
struct options
{
    using network_sender_t = std::function<bool (const message&)>;
    using block_producer_t = std::function<payset_t (const block_context_t&)>;
    using block_handler_t = std::function<bool (const block_t&)>;
    using verifiers_getter_t = std::function<verifiers_t (uint64_t, unsigned, unsigned)>;

    unsigned            _time_net_1mb   = 0;    ///< timeout in mills for 1Mb message spreads over the network
    unsigned            _time_net_256b  = 0;    ///< timeout in mills for 256b message spreads over the network
    unsigned            _creator_count  = 0;    ///< number of max block creators for this node
    unsigned            _verifier_count = 0;    ///< number of max block verifiers for this node
    unsigned            _ok_threshold   = 0;    ///< threshold to made ok decision, recommended eq. 0.69 * _creator_count
    unsigned            _max_bba_steps  = 0;    ///< max number of BBA steps
    fc::sha256          _last_rand;             ///< Q(r-1) of last block
    fc::sha256          _last_block_hash;       ///< hash of last block
    uint64_t            _last_round     = 0;    ///< last number of round
    bool                _bba_enabled    = true; ///< enables BBA part, otherwise runs onlyy GC part
    block_handler_t     _save_block;            ///< saver for new blocks into chain db
    network_sender_t    _send_message;          ///< sender for network messages
    block_handler_t     _check_block;           ///< checker for received blocks
    verifiers_getter_t  _get_verifiers;         ///< get info about all verifiers scheduled for given round/step
    block_producer_t    _produce_block;         ///< producer of new block for echorand algorithm
};
```

### echo::rand::agreement

```cpp
/// declaration of echorand agreement instance
class agreement : private options
{
public:
    using rounds = std::map<uint64_t, std::shared_ptr<round>>;

    /// constructs echorand instance from options structure and
    /// automatically starts new round
    agreement(const options& arg);

    /// stops running rounds and stops echorand instance
    ~agreement();

    unsigned time_net_1mb() const noexcept;       ///< timeout in mills for 1Mb message spreads over the network
    unsigned time_net_256b() const noexcept;      ///< timeout in mills for 256b message spreads over the network
    unsigned creator_count() const noexcept;      ///< number of max block creators for this node
    unsigned verifier_count() const noexcept;     ///< number of max block verifiers for this node
    unsigned ok_threshold() const noexcept;       ///< threshold to make ok decision, recommended eq. 0.69 * _creator_count
    unsigned max_bba_steps() const noexcept;      ///< max number of BBA steps
    const fc::sha256& last_rand() const noexcept; ///< Q(r-1) of last block
    const fc::sha256& last_block_hash() const noexcept;    ///< hash of last block
    uint64_t last_round() const noexcept;         ///< last number of round

    bool bba_enabled() const noexcept;            ///< enables BBA part, otherwise runs onlyy GC part

    rounds::const_iterator begin() const noexcept;   ///< returns an iterator to the first round
    rounds::const_iterator end() const noexcept;     ///< returns an iterator past the last round

    const round& get(uint64_t round_id) const;       ///< get round by its number/id,
                                                        ///< @throws std::out_of_range if not found

    /// event handler for echorand messages from network,
    /// make decision to forward message using send_message
    /// as a result of internal call to round::handle_message
    void dispatch_message(const message& msg);

    /// broadcast echorand message to network
    void send_message(const message& msg) const;

    /// produce new block at local echo node
    payset_t produce_block(const block_context_t& ctx) const;

    /// check given block
    bool check_block(const block_t& block) const;

    /// get info about all verifiers scheduled for given round/step
    verifiers_t get_verifiers(uint64_t round_id, unsigned step_id) const;

    /// finishes round with certificate
    void finish(uint64_t round_id, const certificate_t& cert);

    /// finishes round with block
    void finish(uint64_t round_id, const block_t& block);

private:
    rounds      _rounds;

    round& start_next_round();
};
```

### echo::rand::round

```cpp
/// represents single round of echorand algorithm
class round : public std::enable_shared_from_this<round>
{
private:
    /// starts first three steps of GC
    round(uint64_t round_id, agreement& a);

public:
    using steps = std::unordered_map<unsigned,std::shared_ptr<step>>;

    /// starts new round of echorand algorithm
    static std::shared_ptr<round> start(uint64_t round_id, agreement& a);

    /// finishes and destroys all steps (if any)
    ~round();

    agreement& parent() const;               ///< parent class
    uint64_t id() const;                     ///< id of round
    const fc::sha256& prev_rand() const;         ///< Q(r-1) of last block
    const fc::sha256& prev_block_hash() const;   ///< hash of last block
    steps::const_iterator begin() const;     ///< begin iterator to active steps
    steps::const_iterator end() const;       ///< end iterator to active steps

    const step& get(unsigned step_id) const; ///< get step by its number/id,
                                                ///< @throws std::out_of_range if not found

    /// get typed step by its number/id
    ///< @throws std::out_of_range if not found
    ///< @throws std::bad_cast on case of wrong type
    template<typename _Step>
    const _Step& get(unsigned step_id = 0) const
    {
        if(step_id == 0)
            return dynamic_cast<const _Step&>(get(resolve_id_t<_Step>::id));
        else
            return dynamic_cast<const _Step&>(get(step_id));
    }

    /// broadcast echorand message to network and to related steps
    template<typename _Msg>
    void send_message(const _Msg& msg)
    {
        if(send_message_internal(msg))
            return;
        _messages.emplace_back(std::make_unique<_Msg>(msg));
    }

    /// dispatch received echorand message to steps
    result_t dispatch_message(const message& msg);

    /// finish step, start next if required
    void finish(unsigned step_id);

    /// finish step with certificate
    void finish(unsigned step_id, const certificate_t& cert);

    /// finish step with block
    void finish(unsigned step_id, const block_t& b);

    /// generated certificate
    const certificate_t* certificate() const;

    /// generated block
    const block_t* const block() const;

    /// empty block for this round
    const block_t& empty_block() const;

    /// empty block hash for this round
    const fc::sha256& empty_block_hash() const;

private:
    using certificate_ptr = std::unique_ptr<certificate_t>;
    using block_ptr = std::unique_ptr<block_t>;
    using block_hash_ptr = std::unique_ptr<fc::sha256>;
    using messages = std::deque<std::unique_ptr<message>>;

    const uint64_t      _id;          ///< id of round, initialized from a.last_round() + 1
    const fc::sha256    _prev_rand;   ///< Q(r-1) of last block
    const fc::sha256    _prev_block_hash;   ///< hash of last block
    agreement&          _parent;      ///< parent class
    steps               _steps;       ///< collection of active steps
    certificate_ptr     _certificate; /// certificate for block, generated at this round
    block_ptr           _block;       ///< block generated at this round
    messages            _messages;    ///< message cache for dispatching to the next step at this node

    mutable block_ptr      _empty_block;      ///< empty block for this round
    mutable block_hash_ptr _empty_block_hash; ///< hash of empty block

    /// broadcast echorand message to network and to related steps
    /// @returns true - if message was successfully dispatched to next local step
    bool send_message_internal(const message& msg);

    /// start step with specified id
    void start(unsigned step_id);

    /// wait block, start finish step at the place of GC2 step
    void wait_block();
};
```

### echo::rand::step

```cpp
/// base for all steps of echorand algorithm
class step : public std::enable_shared_from_this<step>
{
protected:
    /// initialize base instance
    step(std::shared_ptr<round> r, unsigned step_id);

public:
    virtual ~step(); ///< destruct virtually, do nothing

    std::shared_ptr<round> parent() const; ///< parent round
    unsigned round_id() const;             ///< round id
    unsigned id() const;                   ///< step id, fixed for gc and gc_bba, variable for bba steps
    bool finished() const;                 ///< indicates this step is already finished

    /// fired when echorand message received from network
    virtual result_t handle_message(const message& msg);

    /// finish this step by setting finished only
    void set_finished();

protected:
    /// step initialization
    virtual void init() {}

    /// sets timer_expired event to fire in specified number of milliseconds
    void set_timer(unsigned mills, const char* desc = nullptr);

    /// timer event handler
    virtual void timer_expired() {}

    /// finish this step by setting finished and
    /// try to signal parent round about this step is finished
    void finish();

    /// finish step with certificate
    void finish(const certificate_t& cert);

    /// finish step with block
    void finish(const block_t& b);

    /// @return verifiers for this step
    verifiers_t verifiers(bool local = true) const;

    /// setup common message header and sign message
    void prepare_message(message& m, unsigned producer) const;

private:
    const unsigned                _round_id;            ///< round id
    const unsigned                _id;                  ///< id of this step
    const std::weak_ptr<round>    _parent;              ///< ptr to parent round
    bool                          _finished = false;    ///< this step finished?
    verifiers_t                   _step_verifiers;      ///< verifiers for this step
    verifiers_t                   _msg_verifiers;       ///< verifiers for network messages (prev step)

    void timer_handler();
};

/// factory class to start steps with automatic initialization
template<typename _Step>
class step_t final : public _Step
{
protected:
    template<typename ..._Args>
    step_t(_Args&&... args)
    :   _Step(std::forward<_Args>(args)...)
    {}

public:
    using type = step_t<_Step>;
    using shared_ptr = std::shared_ptr<type>;

    /// factory method to start steps
    template<typename ..._Args>
    static shared_ptr start(_Args&&... args)
    {
        auto s = shared_ptr(new type(std::forward<_Args>(args)...));
        s->init();
        if(s->finished())
            return {};
        return s;
    }
};
```

## The EchoRand Mechanism

![echorand-steps.png](./echorand-steps.png)

### Legend

|  Designation | Description                                                                                                                               |
| :----------: | ------------------------------------------------------------------------------------------------------------------------------------------|
|     $msg$    | message of the participant of a step transmitted between nodes                                                                            |
|   $sig(x)$   | EdDSA signature of $x$                                                                                                                    |
|    $H(x)$    | SHA-256 hash of $x$                                                                                                                       |
|     $r$      | current round of the algorithm, which is equivalent to the number of blocks in the database plus one. $r >= 1$                            |
|     $s$      | current step number of the algorithm in the round. $s >= 1$                                                                               |
|   $B_r$      | block created in round $r$, which equals to \{ $r$, $ID_\{producer\}$, $Q_r$, $H(B_r)$, $H(B_\{r-1\})$, $sig(B_r)$, $PAY_r$, $CERT_r$ \}  |
|  $H(B_r)$    | hash of $B_r$                                                                                                                             |
|  $PAY_r$     | set of transactions contained in block $B_r$                                                                                              |
|   $Q_r$      | shared randomness seed of round $r$                                                                                                       |
| $sig(Q_r)$   | signature of a random vector of the $r$ round                                                                                             |
| $sig(B_r)$   | signature of a block of the $r$ round                                                                                                     |
|    $l(r)$    | round $r$ leader - determines $PAY_r$, creates $B_r$ and determines $Q_r$                                                                 |
|  $CERT_r$    | $B_r$ block certificate, formed out of a set of `bba_signature` messages                                                                  |
| $VRF(r, s)$  | set of participants who act in step $s$ of round $r$                                                                                      |
|     $id$     | account identifier in the blockchain                                                                                                      |
|    $A_s$     | array of account identifiers selected as participants at the step $s$                                                                     |
|    $N_s$     | array of $A_s$ indexes which correspond to the identifiers of users authorized on the current node in the step $s$                        |
|     $l$      | identifier of the producer who is the leader in this round                                                                                |
|    $ctx$     | context of current round, an object which contains all received messages for the round                                                    |

### Parameters

The following algorithm parameters are set by constants, or configured at the **echo_node** startup and can potentially be adjusted within certain limits during the process of the algorithm operation.

| Designation | Description                                                                                      |
| :---------: | ------------------------------------------------------------------------------------------------ |
|     $Λ$     | "large" interval, the average time required to distribute a 1 MB message across Echo network     |
|     $λ$     | "small" interval, the average time required to distribute a 256 bit message across Echo network  |
|    $N_g$    | the number of block producers in a round, used in the function $VRF(r, 1)$                       |
|    $N_c$    | the number of block verifiers in a round, used in the function $VRF(r, s), s > 1$                |
|    $t_h$    | threshold for making positive decision during verifying, set by default to $0.69*N_c$            |
|     $μ$     | $4 + 3*k, k > 0$ - maximum number for algorithm steps, upon reached new empty block is created   |

### Other Terms

- **Executor** - the network account selected in the step of the round for performing a specific consensus action
- **Local configuration** - a certain set of parameters accessible only to the running network node.
- **Base (database)** - a blockchain with a certain set of blocks, possibly "lagging behind" the state of most other network nodes. It stores public EDS keys of all the participants of the algorithm operation.
- **Participant** - a set of EdDSA private/public keys and an account balance within the **Echo** network. Basically
it's an **Echo** network user, specially registered on a specific network node. A user can be registered as a participant
only on a single network node at a given time. A network node permits registration of several participants.

### Getting started

#### 0. Preparation

**Input data**:

* $Q_{r-1}$ from $CERT_{r-1}$

The round $R_r$, which launches step 1 and step 2, described below, is created.

#### 1. Candidate blocks generation

**Input data:**

* $H(B_{r-1})$ from $CERT_{r-1}$
* $A_1$, $N_1$ from the context of the round

**Start:**

Right after determining $CERT_{r-1}$

**Steps:**

1. **Verification**:
    1. If $N_{1} = ∅$, complete the step
    1. Select participant index $n ∈ N_{1}$, which generates the smallest $Q_r = sig(Q_{r-1}, r)$, as a creator of new block on the node
    1. Get actual ID of the participant in the blockchain: $id_{1} = A_{1}[n]$
    1. Through $id_{1}$ get all the private keys of a participant
1. **Block assembly**:
    1. If all the previous blocks $B(k), k=1..r-1$ are available, build $PAY_r$
    1. If at least one of the previous blocks is unavailable, build $PAY_r = ∅$
    1. If $PAY_r != ∅$, create a new block $B_r = { r, PAY_r, Q_r, H(B_{r-1}) }$
1. **Communication**:
    1. Sign with the key $id_1$ and send `gc_signature` = { $r$, $id_1$, $Q_r$, $H(B_{r})$ }
    1. Sign with the key $id_1$ and send `gc_block` = { $r$, $id_1$, $B_r$ }

### Developing an evaluation agreement (GC)

#### 2. Leader selection (voting)

**Input data**:

* $H(B_{r-1})$, $Q_{r-1}$ from $CERT_{r-1}$
* $A_{1}$, $A_{2}$, $N_{2}$ from the context of the round

**v** - local structure to store information about leader candidate: producer ID and corresponding block hash.

The empty set symbol assigned to the elements **v** means "empty block" and "unknown leader".
In the application, it can be a predefined constant or a separate flag in the data structure.

**Start:**

right after defining $CERT_{r-1}$

**Steps:**

1. **Timer**: schedule the timer after the time equal to $2 * λ$, by a trigger:
    1. Define $l$ as $id$ existent in $ctx[id]$ with a minimum $Q_{r}$
    1. if the local cache for $l$ has the block $B_{r}$
        1. $v = \\{\ ctx[l].H(B_{r}),\ l\ \\}$
        1. go to **Communication**
1. **Timer**: schedule the timer after the time equal to $λ + Λ$, by a trigger:
    1. $v = \\{\ ∅, ∅\ \\}$
    1. go to **Communication**
1. **Network**: subscribe to network messages `gc_block`, `gc_signature` at the start of a step
    1. after receiving a message `gc_block` of the round $r$
        1. verify the round number in the message
        1. verify the message step, must be equal to `1`
        1. verify that $msg.id ∈ A_{1}$ and get the user's public key
        1. verify the signature of the whole message
        1. verify that $msg.block$ is correct
            1. verify the block's round for equality to the current
            1. verify `producer-id` is from $A_{1}$
            1. verify $Q_{r}$, if it already has the `gc_signature`
            1. verify the block signature using `producer-id` of the block
            1. verify $HB_{r-1}$ from the block for equality to the local one from $CERT_{r-1}$
            1. verify the correctness of $PAY_{r}$ in the block
        1. If $ctx[msg.id]$ already exists
            1. verify $ctx[msg.id].H(B_{r}) == H(msg.block)$
        1. If it does not exist, save `msg.id, msg.block` to the context of the round:
            1. $ctx[msg.id].B = msg.block$
            1. $ctx[msg.id].H(B_{r}) = H(msg.block)$
        1. if $l$ defined and $l == id$:
            1. $v = \\{\ ctx[l].H(B_{r}),\ l\ \\}$
            1. go to **Communication**
    1. after receiving a message `gc_signature` of the round **r**
        1. verify the round number in the message
        1. verify that $msg.id ∈ A_1$ and get the user's public key
        1. verify the signature of the whole message
        1. $msg.block\\_hash = ∅$: verify `msg.rand` for equality to the local one from $CERT\_{r-1}$
        1. $msg.block\\_hash\ != ∅$: verify the signature `msg.rand` using $Q\_{r-1}$ from $CERT\_{r-1}$
        1. Save $msg.id => ∅$ in the context of the round, if it’s not saved yet:
            1. $ctx[msg.id].B = ∅$
            1. $ctx[msg.id].HB = msg.block\\_hash$
            1. $ctx[msg.id].rand = msg.rand$
1. **Communication**: generating, signing and sending of messages
    1. stop timers, **do not** unsubscribe from network messages
    1. if $N_{2} = ∅$, end the step
    1. $∀n_{2} ∈ N_{2}$:
        1. get real user’s ID in the blockchain: $id_2 = A_{2}[n_{2}]$
        1. sign with the key of $id_{2}$ and send
            1. if $v\ != ∅$: `gc_proposal` = { r, 2, $id_2$, v }
            1. if $v == ∅$: `gc_proposal` = { r, 2, $id_2$, ∅ }

#### 3. Choosing the leader (vote counting)

**Input data**:

* $A_{2}$, $A_{3}$, $N_{3}$ from the context of the round

**Start**:

right after defining $CERT_{r-1}$

**v** - a local structure of a step that stores the hash of the block and the ID of the leader, who created the block.

1. **Timer**: schedule the timer after the time equal to $3 * λ + Λ$, by a trigger:
    1. `v` = { ∅, ∅ }
    1. go to **Communication**

1. **Network**: subscribe to network messages `gc_proposal` at the start of a step, after receiving
    1. verify the round number and the step number in the message
    1. verify that $msg.id ∈ A_{2}$ and get the user's public key
    1. verify the signature of the whole message
    1. verify that $msg.v = \\{\ msg.block\\_hash, msg.leader\ \\}$ is in the context of the round.
    It should be collected in the context in the previous step, as a result of `gc_block` and `gc_signature` message processing.
        1. $∃ ctx[msg.leader]$ - a record for such a potential leader exists in the context
        1. $ctx[msg.leader].H(B) == msg.block\\_hash$ - the block hash coincides
    1. $ctx[msg.leader].v3.push(msg.id)$, where $v3$ is *unordered_set*
    1. if the counter is more than the threshold $t_{h}$: $ctx[msg.leader].v3.size() > t_{h}$
        1. `v = { msg.block_hash, msg.leader }`
        1. go to **Communication**

1. **Communication**: generating, signing and sending of messages
    1. stop timers, unsubscribe from network messages
    1. if $N_{3} = ∅$, end the step
    1. $∀n_{3} ∈ N_{3}$:
        1. get real user’s ID in the blockchain: $id_3 = A_3[n_3]$
        1. sign with the user’s key $id_3$ and send `gc_proposal` = { r, 3, $id_3$, v }

#### 4. Primary assessment of vote counting

**Start**: right after finishing the step `3`

**Input data**: $A_{3}$, $A_{4}$, $N_{4}$ from the context of the round

1. **Timer**: schedule the timer after the time equal to $2 * λ$, by a trigger:
    1. if $∃l\ |\ ctx[l].v4.size() > t_{h}/2$: $v = \\{\ ctx[l].HB,\ l\ \\}$
        1. otherwise: $v = \\{\ ∅, ∅\ \\}$
    1. $b = 1$
    1. go to **Communication**

1. **Network**: subscribe to network messages `gc_proposal` at the start of a step and on receiving
    1. verify the round number and the step number in the message
    1. verify that $id ∈ A_{3}$ and get the user's public key
    1. verify the signature of the whole message
    1. `msg.v = { msg.block_hash, msg.leader }`
    1. `msg.v != { ∅, ∅ }`: verify that `msg.v` is in the context of the round (should be collected in step 2)
        1. `∃ ctx[msg.leader]` - a record for such a potential leader exists in the context
        1. `ctx[msg.leader].H(B) == msg.block_hash` - the block hash coincides
        1. `ctx[msg.leader].v4.push(msg.id)`, `v4` is *unordered_set*
        1. if $ctx[msg.leader].v4.size() > t_{h}$
            1. `v = { msg.block_hash, msg.leader }`, `b = 0`
            1. go to **Communication**
    1. `msg.v == { ∅, ∅ }`
        1. `ctx.ve4.push(msg.id)`, `ve4` is *unordered_set* (**v**alue **e**mpty)
        1. if $ctx.ve4.size() > t_{h}$
            1. `v = { ∅, ∅ }`, `b = 1`
            1. go to **Communication**

1. **Communication**: generating, signing and sending of messages
    1. stop timers, unsubscribe from network messages
    1. if $N_{4} = ∅$, end the step
    1. $∀\ n_{4} ∈ N_{4}$:
        1. get real user’s ID in the blockchain: $id_4 = A_4[n_{4}]$
        1. sign with the user’s key $id_4$ and send `bba_signature` = { r, 4, $id_4$, b, v, sign(v) }

### Reaching the Binary Byzantine Agreement (BBA)

There are several classes of algorithms for reaching the Byzantine Agreement. The one which is used in **echorand** is based on the use of a shared random value.

The central idea of the algorithm is the following. At each step of the algorithm, network nodes сan be divided into two sets:

1. nodes that received a sufficient number of messages during the previous round(s) (with a certain equal value), allowing them to offer this value as a solutions.
1. nodes that received two solution variants and can not give preference to either of them.

In the latter case, undecided nodes use VRF to generate a shared random value from the `{0, 1}` set for making and sending their decisions. And since the random value will be the same for all the "uncertain" nodes, all such nodes will make just the same decision.

Designations used for data storage:

* `bba0` - messages with a `non-empty` block and a vote equal to `0`
* `bba1` - messages with a `non-empty` block and a vote equal to `1`
* `bbae0` - messages with an `empty` block and a vote equal to `0`
* `bbae1` - messages with an `empty` block and a vote equal to `1`

#### 5. Step one: coin == 0

**Step**: $5 \le s \le μ; \space s - 2 \equiv 0 \bmod 3 \space (s = 5,8,11,...)$

**Start**: right after the step $s ≡ 1\ mod\ 3, s > 3$ ends

**Input data**:

* $A_{s-1}$, $N_{s-1}$, $A_{s}$, $N_{s}$ from the context of the round
* $HB_{r-1}$, $Q_{r-1}$ из $CERT_{r-1}$ - to generate an empty block

$b$ - local step flag that is sent in the `value` field of the `bba_signature` message.

1. **Timer**: schedule the timer after the time equal to $2 * λ$, by a trigger:
    1. $b = 0$
    1. go to **Communication**

1. **Network**: subscribe to network messages `bba_signature` at the start of a step, after receiving
    1. verify that $msg.id ∈ A_{s-1}$ and get the user's public key
    1. verify the signatures of the whole message
    1. $msg.v = \\{\ msg.block_hash, msg.leader\ \\}$
    1. $msg.v\ != \\{\ ∅, ∅\ \\}$:
        1. $∃\ ctx[msg.leader]$ - a record for such a potential leader exists in the context
        1. $ctx[msg.leader].HB == v.HB_{r}$ - the block hash coincides
        1. $msg.value == 0$: $ctx[v.l].bba0[msg.s].push(msg.id, msg)$, where $bba0$ array *unordered_map*
        1. $msg.value == 1$: $ctx[v.l].bba1[msg.s].push(msg.id, msg)$, where $bba1$ array *unordered_map*
    1. $msg.v == \\{\ ∅, ∅\ \\}$:
        1. $msg.value == 0$: $ctx.bbae0[msg.s].push(msg.id, msg)$, $bbae0$ is an array *unordered_map*
        1. $msg.value == 1$: $ctx.bbae1[msg.s].push(msg.id, msg)$, $bbae1$ is an array *unordered_map*
    1. if $∀\ s >= 5\ \\&\\&\ s - 2 ≡ 0\ mod\ 3$ $(s == 5,8,11,...)$ - **Ending Condition 0**
        1. if $∃l\ |\ ctx[l].bba0[s-1].size() > t_{h}$:
            1. $B_{r} = ctx[l].B$
            1. $Q_{r}$ is calculated from $ctx[l].signQ$, specified in step 2
            1. $CERT_{r}$ is generated from $ctx.bba1[s-1]$, $ctx.bbae1[s-1]$, $ctx.bba0[s-1]$, $ctx.bbae0[s-1]$
            1. $b = 0^*$
            1. **END OF THE ROUND!!!**
    1. if $∀\ s >= 6\ \\&\\&\ s - 2 ≡ 1\ mod\ 3$ $(s == 6,9,12,...)$ - **Ending Condition 1**
        1. if $\sum_{n}ctx[n].bba1[s-1].size() + ctx.bbae1[s-1].size() > t_{h}$:
            1. $B_{r} = ∅$
            1. $Q_{r}$ is calculated from $Q_{r-1}$
            1. $CERT_{r}$ is generated from $ctx.bba1[s-1]$, $ctx.bbae1[s-1]$, $ctx.bba0[s-1]$, $ctx.bbae0[s-1]$
            1. $b = 1^*$
            1. **END OF THE ROUND!!!**
    1. if $\sum_{n}ctx[n].bba1[s-1].size() + ctx.bbae1[s-1].size() > t_{h}$: $b = 1$, go to **Communication**
    1. if $\sum_{n}ctx[n].bba0[s-1].size() + ctx.bbae0[s-1].size() > t_{h}$: $b = 0$, go to **Communication**

1. **Communication**: generating, signing and sending of messages
    1. stop timers, **do not** unsubscribe from network messages
    1. stop verifying the last two conditions from the previous point
    1. if $N_{s} = ∅$, end the step
    1. $∀n_{s} ∈ N_{s}$:
        1. get real user’s ID in the blockchain: $id_{s} = A4[n_{s}]$
        1. sign with the key $id_{s}$ and send $bba\\_signature = \\{\ r, s, id\_{s}, b, v, sign(b, v)\ \\}$
        1. where $v$ is the value calculated in step 4

#### 6. Step two: coin == 1

**Step**: $6 \le s \le μ; \space s - 2 \equiv 1 \bmod 3 \space (s = 6,9,12,...)$

**Start**: right after the step $s ≡ 2\ mod\ 3, s > 3$ ends

**Input data**:

* $A_{s-1}$, $N_{s-1}$, $A_{s}$, $N_{s}$ from the context of the round
* $HB_{r-1}$, $Q_{r-1}$ из $CERT_{r-1}$ - to generate an empty block

$b$ - local step flag that is sent in the $value$ field of the `bba_signature` message.

1. **Timer**: schedule the timer after the time equal to $2 * λ$, by a trigger:
    1. $b = 1$
    1. go to **Communication**

1. **Network**: subscribe to network messages `bba_signature` at the start of a step, after receiving
    1. verify that $msg.id ∈ A_{s-1}$ and get the user's public key
    1. verify the signatures of the whole message
    1. $msg.v = \\{\ msg.block_hash, msg.leader\ \\}$
    1. $msg.v\ != \\{\ ∅, ∅\ \\}$: like in step $5$
    1. $msg.v == \\{\ ∅, ∅\ \\}$: like in step $5$
    1. if $∀ s >= 5\ \\&\\&\ s - 2 ≡ 0\ mod\ 3$ $(s == 5,8,11,...)$: like in step $5$ - **Ending Condition 0**
    1. if $∀ s >= 6\ \\&\\&\ s - 2 ≡ 1 mod 3$ $(s == 6,9,12,...)$: like in step $5$ - **Ending Condition 1**
    1. if $\sum_{n}ctx[n].bba0[s-1].size() > t_{h}$: $b = 0$ and go to **Communication**

1. **Communication**: like in step **5**

> $\sum_{n}ctx[n].bba1[s-1].size() > t_{h}$ in this step there's no need to verify how it's done in the other steps. In this particular step, the condition is equal to the condition of **Ending Condition 1**.

#### 7. Step three: coin = shared random value

**Step**: $7 \le s \le μ; \space s - 2 \equiv 2 \bmod 3 \space (s = 7,10,13,...)$

**Start**: right after the step $s ≡ 0\ mod\ 3, s > 3$ ends

**Input data**:

* $A_{s-1}$, $N_{s-1}$, $A_{s}$, $N_{s}$ from the context of the round
* $HB_{r-1}$, $Q_{r-1}$ из $CERT_{r-1}$ - to generate an empty block

$b$ - local step flag that is sent in the `value` field of the `bba_signature` message.

1. **Timer**: schedule the timer after the time equal to $2 * λ$, by a trigger:
    1. $b = BBA\\_RAND(r)$
    1. go to **Communication**

1. **Network**: subscribe to network messages `bba_signature` at the start of a step, after receiving
    1. verify that $msg.id ∈ A_{s-1}$ and get the user's public key
    1. verify the signatures of the whole message
    1. $msg.v = \\{\ msg.block_hash, msg.leader\ \\}$
    1. $msg.v\ != \\{\ ∅, ∅\ \\}$: like in step $5$
    1. $msg.v == \\{\ ∅, ∅\ \\}$: like in step $5$
    1. if $∀\ s >= 5\ \\&\\&\ s - 2 ≡ 0\ mod\ 3$ $(s == 5,8,11,...)$: like in step $5$ - **Ending Condition 0**
    1. if $∀\ s >= 6\ \\&\\&\ s - 2 ≡ 1\ mod\ 3$ $(s == 6,9,12,...)$: like in step $5$ - **Ending Condition 1**
    1. if $\sum_{n}ctx[n].bba1[s-1].size() + ctx.bbae1[s-1].size() > t_{h}$: $b = 1$, go to **Communication**
    1. if $\sum_{n}ctx[n].bba0[s-1].size() + ctx.bbae0[s-1].size() > t_{h}$: $b = 0$, go to **Communication**

1. **Communication**: like in step $5$

#### Nodes that have completed the round

Problem:

* a node has already completed the round
* the other nodes are still performing the subsequent steps

If the node, that has already completed the round, should send $bba$ messages to the subsequent steps with evaluation
(which means, that $N_{s}$ in it is non-empty at some subsequent steps), then the choice of such a node, that has completed the round, must somehow be among the other nodes.

Solution: Step $bba$ emulation

**Input data**:

* last value $b$
* selected block $v = \\{\ block\\_hash,\ leader\ \\}$

1. if there are no messages from the previous step and the other nodes - complete the step and the round
1. otherwise:
    1. register the messages from the other nodes for the current round/step
    1. if $N_{s}\ != ∅$, send the `bba_signature` messages with their choice

### Getting a new block by all the members of the network

All the network nodes perform the round steps. Messages are sent to the network only by the nodes that have already their participants selected at a given step using the $VRFN(r,s)$ algorithm.

Thus, all the network nodes reach the end of the round at one of the stages of the $BBA$ algorithm and get a formed $CERT_{r}$.

If the value $ctx[l].B\ != ∅$, then the block is received.
If the value $ctx[l].B == ∅$, then:

* $ctx[l].signQ == Q_{r-1}$ means that an empty block has been created.
* $ctx[l].signQ != Q_{r-1}$ means that a non-empty block has been created and the node has not received it.

### Fallback service

In rare cases, a number of active network nodes may be below $t_h$. In such a case ECHO network will always generate empty block. To prevent this behavior, root
committee is introduced. If network node, participating in round steps, is inactive - selected committee member will generate appropriate step
message on behalf of this member.

In such a case message will have non-empty **fallback** field and message itself will be signed by the key of committee member.

Handling of such messages will be done at appropriate steps with prioritizing of originally generated messages.

Prioritizing can be done in both ways:

* **GC related steps** - wait original messages and collect fallback ones too. After some timeout fallback messages will be taken into account.
* **BBA steps** - fallback messages collected and counted as original ones. Original messages override fallback ones if any.

## Network interaction

### Message format

Each message is entirely signed with the EdDSA key of the participant who creates the message, i.e, basically, there is always a `message_signature` field in a message.

Separate fields or groups of fields are also signed with an EdDSA key of the participant who creates the message.

Such a "double" signature is essential, since the signatures of certain groups of fields are later used in VRF to generate a random round value, and in the signature set $CERT_{r}$.

#### 0. Common message header

Following fields are included in any message, if not specially mentioned.

| Field                | Description                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------|
| **round**            | current round                                                                                             |
| **step**             | current step                                                                                              |
| **id**               | ID of the participant who created the block                                                               |
| **fallback**         | fallback ID of the participant who created the block on behalf of ID                                      |
| **signature**        | signature of the message with the participant’s key $id$                                                  |

#### 1. gc_block (candidate block)

This message is sent in step `1`, in the case of creating a block with a non-empty set of transactions.

| Field                | Description                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------|
| **block**            | a block containing: the current round, the participant's ID, the block signature, etc.                    |

#### 2. gc_signature (random value signature)

This message is sent during step `1`, if there is at least one participant for the node for this step.

| Field                | Description                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------|
| **rand**             | $signQ_r$ - signature of a random previous round vector with the participant’s key $id$                   |
| **block_hash**       | new block hash                                                                                            |
| **prev_rand**        | $signQ_r$ signature of a random vector of the round from the previous block                               |
| **prev_block_hash**  | previous block hash                                                                                       |

#### 3. gc_proposal (selection of a leader and a block)

This message is sent during step `2` and step `3`, if there is at least one participant for the node for this step.

| Field                | Description                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------|
| **block_hash**       | selected block hash                                                                                       |
| **leader**           | ID of a selected leader, who created the block                                                            |

#### 4. bba_signature (BBA step results)

This message is sent during step `4` and all the subsequent steps of the algorithm, if there is at least one participant for the node for this step.

| Field                | Description                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------|
| **value**            | evaluation within the `BBA` algorithm, 0 or 1                                                             |
| **block_hash**       | selected block hash                                                                                       |
| **leader**           | ID of a selected leader, who created the block                                                            |
| **bba_sign**         | signature for the fields `round`, `step`, `value`, `block_hash`, `leader` with the participant’s key $id$ |

#### 5. round_info (round start synchronization)

This message is sent to synchronize start of new round over the ECHO network. It does not contain common message header.

| Field                | Description                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------|
| **round**            | just finished round                                                                                       |
| **rand**             | $signQ_r$ signature generated at finished round                                                           |


[algorand-v9]: https://drive.google.com/file/d/1dohyg2LMNxHFzzTc5VpUwm_qjegBPKe2
[echo-wp]: https://drive.google.com/file/d/1y1VCfvM8czq-BaTgEl0AuctAbGzV_S93/view
[SHA-256]: https://en.wikipedia.org/wiki/SHA-2
