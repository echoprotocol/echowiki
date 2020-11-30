# Participation of users with non-ECHO assets.

## Short answer.

Echo has different assets that allows you to participate in consensus: when selecting producers and verifiers such assets converts by rate to core asset(the more asset you have the greater your chance to become producer/verifier).

Example of such assets is `SBTC` and `SETH`.

## Long answer.

Here are excerpts from the implementation of the system.

### `chain_parameters`

In `chain_parameters` stored field `consensus_assets`. In this field stored the set of assets that can take part in consensus.

> Field `consensus_assets` can be changed by committie members by `committee_member_update_global_parameters_operation`.

### `global_property_object`

In `global_property_object` stored field `consensus_assets_prices`.  In this field stored the set of prices (exchange rates to core asset) that used for each asset.

> Field `consensus_assets_prices` changes on maintanance. It recalculates according to asset's field `core_exchange_rate`.

### `asset_object` and `asset_options`

In `asset_object` stored field `asset_options options`. In `options` stored `core_exchange_rate` with the price (exchange rates to core asset) that used for that asset.

> Field `core_exchange_rate` changes by `asset_update_operation` or set on asset creation.

### In final

While selecting next producers/verifiers assets from `consensus_assets` changes to core asset by rates from `consensus_assets_prices` and such assets have the same rights as core asset after exchange.

So, by this way, users that holds assets from `consensus_assets` can participate in consensus.
