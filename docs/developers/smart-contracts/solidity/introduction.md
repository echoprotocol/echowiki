# Echo Ethereum VM

## Introduction

Echo has an Ethereum virtual machine (EVM) integrated, which allows for uploading and implementing smart contracts written in Solidity, on Echo network.

Solidity - is a high-level object-oriented programming language for writing smart contracts. Full documentation on it is available [here](https://solidity.readthedocs.io).

## Object IDs

Unlike Ethereum, where addresses are presented in the form of hashes, Echo uses incremental IDs in the form of triplets for account and contract identification.

### Some of the ID types in Echo network

- `1.2.x` - account
- `1.11.x` - contract
- `1.12.x` - contract performance result

### Echo IDs to Ethereum addresses conversion

In order to use the address of an account or a contract, it needs to be converted to an Ethereum address.

Ethereum address represents 20 bytes, where:

- The "short" type takes the first byte of the address. For an account and a contract it is changed into 00 and 01, respectively.
- Zeros take the next 11 bytes.
- The `uint64_t` number takes the last 8 bytes.

Short Memo:

```bash
ff0000000000000000000000ffffffffffffffff  | Conversion of decimal Echo type
[][ 11 bytes of zeros  ][   8 bytes    ]  |       to hex short type:
^ 1 byte id short type    id instance     |   2 -> 00 - account
                                          |  11 -> 01 - contract
1.2.26 = account 26 (0x1a) =              |  dd -> xx - everything else
000000000000000000000000000000000000001a  |
                                          |
1.11.5 = contract 5 =                     |
0100000000000000000000000000000000000005  |

```

## Ethereum network contracts compatibility

In the context of smart contracts, the Echo network has 2 major differences from the Ethereum network, which would not allow the use of contracts without their adaptation. Firstly, unlike the Ethereum network, the Echo network has not just one currency, but a list of assets. Secondly, each asset accuracy is different from the accuracy of Eth (18), since it can be configured specifically for each asset.

To preserve the compatibility of contracts between networks and configure the contract operation, contract creation parameters have been added to the Echo network.

### Flag of supported asset

Since Echo is a multi-asset system while Ethereum is not, it gives rise to many problems based on such asset differences as course, accuracy, balance, etc. To solve these problems, the `supported_asset_id` parameter was introduced. The parameter limits the assets, that are compatible with the contract, to the one specified in the parameter.

This parameter is optional and can be specified when creating a contract, transferring the name of the asset as the parameter `supported_asset_id`.

- If the parameter is not set, the contract can be created with any asset.
- If the parameter is set, then the contract functions can be called solely within a given asset.

### Flag of using Ethereum accuracy

In Echo contracts there was added a flag showing the need to attaining an Ethereum accuracy while working with balance sheets in contracts.

- If the flag is not set, the original accuracy of the contract asset is used when working with balance sheets.
- If the flag is set, an Ethereum accuracy is used when working with balance sheets, which is equal to 18 decimal places.

By default, this flag is set to `false`. The flag can be set when creating a contract by making `true` or `false` the parameter of `eth_accuracy`.

For example, let's take an asset `ECHO` that has 5 decimal places and, if the flag is set to `false`, then, when sending 1 ECHO, the contract will receive the amount of `100000`. And if the flag is set to `true`, when sending the same 1 ECHO, the contract will receive the amount of `10000000000000000`. The flag was added to enable full-fledged contracts written for `Ethereum`.
