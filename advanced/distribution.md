# Distribution stages

## Initial distribution 

10% is distributed as vesting balances(1 year) and initial balances to committee.

## Phase 1: Decentralization

Decentralization phase is needed to stimulate users to participate in consensus and run their own nodes. During this stage planned to distribute 2% of total supply during 1 month. To participate in consensus user need funds:
1. Get some [EETH(Echo ETH)](/how-to/sidechain-&-contract-deploy/deposit-and-withdraw-sidechain-eth.md) or [EBTC(Echo BTC)](/how-to/sidechain-&-contract-deploy/deposit-and-withdraw-sidechain-btc.md) assets with sidechain mechanism. 
2. Get some [SETH(Stake ETH)](/how-to/sidechain-&-contract-deploy/how-to-use-eth-stake.md) and [SBTC(Stake BTC)](/how-to/sidechain-&-contract-deploy/how-to-use-btc-stake.md) assets using stake sidechain. 

The main difference is that stake sidechain assets cannot be transferred on the Echo network and can be returned from Ethereum, or Bitcoin without interacting with Echo at all. Each asset has it's own price. That price is recorded on maintenance and stored in `global_property_object.consensus_assets_prices`. All that assets are converted to ECHO using that prices. During each maintenance, a new price is fixed and all balances in these assets are recalculated.

## Phase 2: Liquidity

88% is distributed during 11 month with help of liquidity system. TBD