# Функционал наград за блок

## Общее описание

C каждым блоком помимо суммы комиссий происходит эмиссия новых монет. Сумма `block_emission_amount` - параметр в [chain_parameters](../api-reference/echo-objects/chain-parameters.md).

Награда за блок распределяется между продюсером и верифаерами после применения следующего блока, в который попадает сертификат. Сумма рассчитывается и записывается в опции аккаунта, но будет начислена на баланс во время ближайшего обслуживания.

Начисление наград происходит во время `maintenance_interval` со следующими правилами:

1. В [chain_parameters](../api-reference/echo-objects/chain-parameters.md) добавлено поле `block_producer_reward_ratio`. Следовательно, продюсеру начисляется `block_producer_reward_ratio` процентов, а верифаерам оставшаяся часть. Часть награды верифаеров распределяются между ними пропорционально их балансу.

2. Cообщения выпущенные с помощью бэкап механизма(если в сети нет ни делегата, ни верифаера, а сообщение выпустил член комитета) - не учитываются при распределении награды. Если сертификат состоит только из сообщений бэкапов - вся награда отдаётся продюсером.

3. Если сообщение было выпущено делегатом, то он получит долю, указанную в опциях аккаунта как `active_delegate_share`. Это значение выставляется на момент обновления делегата равным значению, которое указывает на процент из опций делегата.

4. В случае, погрешности вычислений в пропорциях, излишки начисляются продюсеру.

## Используемые операции

Виртуальная операция, указывающая на выплату наград за блок - [block\_reward\_operation](../api-reference/echo-operations/block-reward.md#block_reward_operation). В которой будет сумма за весь прошлый период.

<!-- TODO: Review ENG version -->
# Eng version

# Block rewards

## General Description

Each block, in addition to the amount of commissions, new coins are issued. The sum `block_emission_amount` - parameter in [chain_parameters](../api-reference/echo-objects/chain-parameters.md).

Reward for the block is distributed between the producer and the verifiers after the next block, in which the certificate gets. The amount is calculated and recorded in the account options, but will be added to the balance during the next service.

Accrual of rewards occurs during `maintenance_interval` with the following rules:

1. In [chain_parameters](../api-reference/echo-objects/chain-parameters.md) added field `block_producer_reward_ratio`. Consequently, the producer is charged with `block_producer_reward_ratio` percent, and the rest of the rest is assigned to verifiers. Part of the reward for verifiers is distributed among them in proportion to their balance.

2. Messages issued by the backup mechanism (if there is no delegate or verifier on the network and the message is issued by a committee member) are not taken into account when distributing the award. If the certificate consists only of backup messages, the whole award is given by the producer.

3 If the message was issued by a delegate, the delegate will receive the share specified in the account options as `active_delegate_share`. This value is set at the time the delegate is updated to a value that indicates the percentage of the delegate options.

4. In case of calculation errors in proportions, the excess is charged to the producer.

## API Methods and Operations

Virtual operation that indicates payout of block reward - [block\_reward\_operation](../api-reference/echo-operations/block-reward.md#block_reward_operation).
