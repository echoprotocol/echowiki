# Block rewards

## General Description

Reward for the block consists of commissions and new coins issued for the block. 
The amount of issued coins `block_emission_amount` - is parameter in [chain_parameters](../api-reference/echo-objects/chain-parameters.md).

When the next block is generated, reward for the current block is distributed between the producer and the verifiers based on the certificate of the current block. 
Amounts are calculated and recorded in the accounts options, but actual deposits will take place during the next maintenance.

Distribution of rewards occurs during `maintenance_interval` according to the following rules:

- Producer get `block_producer_reward_ratio` percent of block reward, and the rest of the reward is distributed between verifiers. 
   - field `block_producer_reward_ratio` is defined in [chain_parameters](../api-reference/echo-objects/chain-parameters.md) . 
- Verifiers rewards are distributed proportional to their balances.
- Messages issued by the backup mechanism (if there is no delegate or verifier on the network and the message is issued by a committee member) 
are ignored during awards distributing. If the certificate consists only of mentioned types of messages, the whole award is given to the producer.
- For verification of the message delegate will receive share of reward based on account option `active_delegate_share`. 
This value indicates the percentage of reward received by delegate.
- In case of floating point errors in shares calculations, the excess will be deposited to the producer.

## API Methods and Operations

Virtual operation that indicates payment of block reward - [block\_reward\_operation](../api-reference/echo-operations/block-reward.md#block_reward_operation).
