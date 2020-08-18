## Globals

### get\_chain\_properties\(\)

Retrieve the chain property object associated with the chain.

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_chain_properties",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "2.9.0",
        "chain_id": "ee3aa7f1a6cc08a2759c2c9844a0dd475d5e9ee5a4a032f74c6d9fa1c0b9c89e",
        "extensions": []
    }
}
```

### get\_global\_properties\(\)

Retrieve the current global property object.

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_global_properties",
        []
    ]
}
```

#### Returns

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "2.0.0",
        "parameters": {
            "current_fees": {
                "parameters": [
                    [
                        0,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        1,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        2,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        3,
                        {
                            "basic_fee": 5000,
                            "premium_fee": 2000,
                            "price_per_kbyte": 1000
                        }
                    ],
                    [
                        4,
                        {
                            "fee": 200,
                            "price_per_kbyte": 100
                        }
                    ],
                    [
                        5,
                        {
                            "fee": 300000
                        }
                    ],
                    [
                        6,
                        {
                            "fee": 200,
                            "price_per_kbyte": 100
                        }
                    ],
                    [
                        7,
                        {
                            "symbol3": 500000,
                            "symbol4": 300000,
                            "long_symbol": 5000,
                            "price_per_kbyte": 10
                        }
                    ],
                    [
                        8,
                        {
                            "fee": 5000,
                            "price_per_kbyte": 10
                        }
                    ],
                    [
                        9,
                        {
                            "fee": 5000
                        }
                    ],
                    [
                        10,
                        {
                            "fee": 50000
                        }
                    ],
                    [
                        11,
                        {
                            "fee": 2000
                        }
                    ],
                    [
                        12,
                        {
                            "fee": 2000
                        }
                    ],
                    [
                        13,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        14,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        15,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        16,
                        {
                            "fee": 2000,
                            "price_per_kbyte": 10
                        }
                    ],
                    [
                        17,
                        {
                            "fee": 2000,
                            "price_per_kbyte": 10
                        }
                    ],
                    [
                        18,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        19,
                        {
                            "fee": 50000
                        }
                    ],
                    [
                        20,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        21,
                        {
                            "fee": 10
                        }
                    ],
                    [
                        22,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        23,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        24,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        25,
                        {
                            "fee": 20
                        }
                    ],
                    [
                        26,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        27,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        28,
                        {}
                    ],
                    [
                        29,
                        {
                            "fee": 100
                        }
                    ],
                    [
                        30,
                        {}
                    ],
                    [
                        31,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        32,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        33,
                        {}
                    ],
                    [
                        34,
                        {}
                    ],
                    [
                        35,
                        {}
                    ],
                    [
                        36,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        37,
                        {
                            "fee": 200
                        }
                    ],
                    [
                        38,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        39,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        40,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        41,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        42,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        43,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        44,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        45,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        46,
                        {
                            "fee": 0,
                            "pool_fee": 500000000
                        }
                    ],
                    [
                        47,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        48,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        49,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        50,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        51,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        52,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        53,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        54,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        55,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        56,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        57,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        58,
                        {
                            "fee": 0
                        }
                    ],
                    [
                        59,
                        {}
                    ]
                ],
                "scale": 10000
            },
            "maintenance_interval": 86400,
            "maintenance_duration_seconds": 10,
            "committee_proposal_review_period": 3600,
            "maximum_transaction_size": 2097152,
            "maximum_block_size": 5242880,
            "maximum_time_until_expiration": 86400,
            "maximum_proposal_lifetime": 2419200,
            "maximum_asset_whitelist_authorities": 10,
            "maximum_asset_feed_publishers": 10,
            "maximum_authority_membership": 10,
            "max_authority_depth": 2,
            "block_emission_amount": 1000,
            "block_producer_reward_ratio": 5000,
            "committee_frozen_balance_to_activate": "100000000000",
            "committee_maintenance_intervals_to_deposit": 10,
            "committee_balance_unfreeze_duration_seconds": 2592000,
            "x86_64_maximum_contract_size": 200000,
            "frozen_balances_multipliers": [
                [
                    90,
                    13000
                ],
                [
                    180,
                    14000
                ],
                [
                    360,
                    15000
                ]
            ],
            "echorand_config": {
                "_time_generate": 1000,
                "_time_net_1mb": 2000,
                "_time_net_256b": 1500,
                "_creator_count": 10,
                "_verifier_count": 12,
                "_ok_threshold": 9,
                "_max_bba_steps": 12,
                "_gc1_delay": 0,
                "_round_attempts": 3
            },
            "sidechain_config": {
                "eth_contract_address": "9E1E1a4Bc97e8b6dB45fa9538C943761A10dac99",
                "eth_committee_update_method": {
                    "method": "f1e3eb60",
                    "gas": 1000000
                },
                "eth_gen_address_method": {
                    "method": "ffcc34fd",
                    "gas": 1000000
                },
                "eth_withdraw_method": {
                    "method": "e21bd1ce",
                    "gas": 1000000
                },
                "eth_update_addr_method": {
                    "method": "7ff203ab",
                    "gas": 1000000
                },
                "eth_withdraw_token_method": {
                    "method": "1c69c0e2",
                    "gas": 1000000
                },
                "eth_collect_tokens_method": {
                    "method": "5940a240",
                    "gas": 1000000
                },
                "eth_committee_updated_topic": "514bf7702a7d2aca90dcf3d947158aad29563a17c1dbdc76d2eae84c22420142",
                "eth_gen_address_topic": "1855f12530a368418f19b2b15227f19225915b8113c7e17d4c276e2a10225039",
                "eth_deposit_topic": "77227a376c41a7533c952ebde8d7b44ee36c7a6cec0d3448f1a1e4231398356f",
                "eth_withdraw_topic": "481c4276b65cda86cfcd095776a5e290a13932f5bed47d4f786b0ffc4d0d76ae",
                "erc20_deposit_topic": "d6a701782aaded96fbe10d6bd46445ecef12edabc8eb5d3b15fb0e57f6395911",
                "erc20_withdraw_topic": "ec7288d868c54d049bda9254803b6ddaaf0317b76e81601c0af91a480592b272",
                "ETH_asset_id": "1.3.1",
                "BTC_asset_id": "1.3.2",
                "fines": {
                    "create_eth_address": -10
                },
                "gas_price": "10000000000",
                "satoshis_per_byte": 23,
                "coefficient_waiting_blocks": 100
            },
            "erc20_config": {
                "contract_code": "60806040523480156200001157600080fd5b5060405162001fdb38038062001fdb8339810180604052810190808051820192919060200180518201929190602001805190602001909291905050506200006733620000bd640100000000026401000000009004565b82600190805190602001906200007f9291906200033a565b508160029080519060200190620000989291906200033a565b5080600360006101000a81548160ff021916908360ff160217905550505050620003e9565b620000e18160006200012764010000000002620019d7179091906401000000009004565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b62000142828262000216640100000000026401000000009004565b151515620001b8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f526f6c65733a206163636f756e7420616c72656164792068617320726f6c650081525060200191505060405180910390fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515620002e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001807f526f6c65733a206163636f756e7420697320746865207a65726f20616464726581526020017f737300000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b8260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200037d57805160ff1916838001178555620003ae565b82800160010185558215620003ae579182015b82811115620003ad57825182559160200191906001019062000390565b5b509050620003bd9190620003c1565b5090565b620003e691905b80821115620003e2576000816000905550600101620003c8565b5090565b90565b611be280620003f96000396000f3006080604052600436106100f1576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100f6578063095ea7b31461018657806318160ddd146101eb57806323b872dd14610216578063313ce5671461029b57806339509351146102cc57806340c10f191461033157806342966c681461039657806370a08231146103c357806379cc67901461041a57806395d89b4114610467578063983b2d56146104f7578063986502751461053a578063a457c2d714610551578063a9059cbb146105b6578063aa271e1a1461061b578063dd62ed3e14610676575b600080fd5b34801561010257600080fd5b5061010b6106ed565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561014b578082015181840152602081019050610130565b50505050905090810190601f1680156101785780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561019257600080fd5b506101d1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061078f565b604051808215151515815260200191505060405180910390f35b3480156101f757600080fd5b506102006107a6565b6040518082815260200191505060405180910390f35b34801561022257600080fd5b50610281600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506107b0565b604051808215151515815260200191505060405180910390f35b3480156102a757600080fd5b506102b0610861565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102d857600080fd5b50610317600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610878565b604051808215151515815260200191505060405180910390f35b34801561033d57600080fd5b5061037c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061091d565b604051808215151515815260200191505060405180910390f35b3480156103a257600080fd5b506103c1600480360381019080803590602001909291905050506109d6565b005b3480156103cf57600080fd5b50610404600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506109e3565b6040518082815260200191505060405180910390f35b34801561042657600080fd5b50610465600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a2c565b005b34801561047357600080fd5b5061047c610a3a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104bc5780820151818401526020810190506104a1565b50505050905090810190601f1680156104e95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561050357600080fd5b50610538600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610adc565b005b34801561054657600080fd5b5061054f610b8b565b005b34801561055d57600080fd5b5061059c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b96565b604051808215151515815260200191505060405180910390f35b3480156105c257600080fd5b50610601600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c3b565b604051808215151515815260200191505060405180910390f35b34801561062757600080fd5b5061065c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c52565b604051808215151515815260200191505060405180910390f35b34801561068257600080fd5b506106d7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c6f565b6040518082815260200191505060405180910390f35b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107855780601f1061075a57610100808354040283529160200191610785565b820191906000526020600020905b81548152906001019060200180831161076857829003601f168201915b5050505050905090565b600061079c338484610cf6565b6001905092915050565b6000600654905090565b60006107bd848484610f77565b610856843361085185600560008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a190919063ffffffff16565b610cf6565b600190509392505050565b6000600360009054906101000a900460ff16905090565b6000610913338461090e85600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461132b90919063ffffffff16565b610cf6565b6001905092915050565b600061092833610c52565b15156109c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260308152602001807f4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766581526020017f20746865204d696e74657220726f6c650000000000000000000000000000000081525060400191505060405180910390fd5b6109cc83836113b5565b6001905092915050565b6109e03382611574565b50565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610a368282611759565b5050565b606060028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ad25780601f10610aa757610100808354040283529160200191610ad2565b820191906000526020600020905b815481529060010190602001808311610ab557829003601f168201915b5050505050905090565b610ae533610c52565b1515610b7f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260308152602001807f4d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766581526020017f20746865204d696e74657220726f6c650000000000000000000000000000000081525060400191505060405180910390fd5b610b8881611800565b50565b610b943361185a565b565b6000610c313384610c2c85600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a190919063ffffffff16565b610cf6565b6001905092915050565b6000610c48338484610f77565b6001905092915050565b6000610c688260006118b490919063ffffffff16565b9050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610dc1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001807f45524332303a20617070726f76652066726f6d20746865207a65726f2061646481526020017f726573730000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515610e8c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001807f45524332303a20617070726f766520746f20746865207a65726f20616464726581526020017f737300000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515611042576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001807f45524332303a207472616e736665722066726f6d20746865207a65726f20616481526020017f647265737300000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561110d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f45524332303a207472616e7366657220746f20746865207a65726f206164647281526020017f657373000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b61115f81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a190919063ffffffff16565b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506111f481600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461132b90919063ffffffff16565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b60008083831115151561131c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525060200191505060405180910390fd5b82840390508091505092915050565b60008082840190508381101515156113ab576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561145a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45524332303a206d696e7420746f20746865207a65726f20616464726573730081525060200191505060405180910390fd5b61146f8160065461132b90919063ffffffff16565b6006819055506114c781600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461132b90919063ffffffff16565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561163f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001807f45524332303a206275726e2066726f6d20746865207a65726f2061646472657381526020017f730000000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b611654816006546112a190919063ffffffff16565b6006819055506116ac81600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a190919063ffffffff16565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b6117638282611574565b6117fc82336117f784600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a190919063ffffffff16565b610cf6565b5050565b6118148160006119d790919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b61186e816000611ab490919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669260405160405180910390a250565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515611980576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001807f526f6c65733a206163636f756e7420697320746865207a65726f20616464726581526020017f737300000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b8260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6119e182826118b4565b151515611a56576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f526f6c65733a206163636f756e7420616c72656164792068617320726f6c650081525060200191505060405180910390fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b611abe82826118b4565b1515611b58576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001807f526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c81526020017f650000000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b60008260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050505600a165627a7a72305820349dee86ac45cd218b5a45a2e9f0b85e882b152c7660c39dfceb517e911822ff0029",
                "create_token_fee": 1000,
                "transfer_topic": "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "check_balance_method": {
                    "method": "70a08231",
                    "gas": 1000000
                },
                "burn_method": {
                    "method": "42966c68",
                    "gas": 1000000
                },
                "issue_method": {
                    "method": "40c10f19",
                    "gas": 1000000
                }
            },
            "gas_price": {
                "price": 1,
                "gas_amount": 1000
            },
            "extensions": []
        },
        "active_committee_members": [
            [
                "1.4.0",
                "1.2.6"
            ],
            [
                "1.4.1",
                "1.2.7"
            ],
            [
                "1.4.2",
                "1.2.8"
            ],
            [
                "1.4.3",
                "1.2.9"
            ],
            [
                "1.4.4",
                "1.2.10"
            ],
            [
                "1.4.5",
                "1.2.11"
            ],
            [
                "1.4.6",
                "1.2.12"
            ],
            [
                "1.4.7",
                "1.2.13"
            ],
            [
                "1.4.8",
                "1.2.14"
            ]
        ]
    }
}
```

### get\_config\(\)

Retrieve compile-time constants.

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_config",
        []
    ]
}
```

#### Returns

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "ECHO_SYMBOL": "ECHO",
        "ECHO_ADDRESS_PREFIX": "ECHO",
        "ECHO_ED_PREFIX": "ECHO",
        "ECHO_MIN_ACCOUNT_NAME_LENGTH": 1,
        "ECHO_MAX_ACCOUNT_NAME_LENGTH": 63,
        "ECHO_MIN_ASSET_SYMBOL_LENGTH": 3,
        "ECHO_MAX_ASSET_SYMBOL_LENGTH": 16,
        "ECHO_MAX_SHARE_SUPPLY": "1000000000000000",
        "ECHO_MAX_PAY_RATE": 10000,
        "ECHO_MAX_SIG_CHECK_DEPTH": 2,
        "ECHO_MIN_TRANSACTION_SIZE_LIMIT": 1024,
        "ECHO_DEFAULT_MAX_TRANSACTION_SIZE": 524288,
        "ECHO_DEFAULT_MAX_BLOCK_SIZE": 1048576,
        "ECHO_DEFAULT_MAX_TIME_UNTIL_EXPIRATION": 86400,
        "ECHO_DEFAULT_MAINTENANCE_INTERVAL": 86400,
        "ECHO_DEFAULT_MAINTENANCE_DURATION_SECONDS": 10,
        "ECHO_DEFAULT_COMMITTEE_FREEZE_DURATION_SECONDS": 2592000,
        "ECHO_MIN_UNDO_HISTORY": 10,
        "ECHO_MAX_UNDO_HISTORY": 10000,
        "ECHO_MIN_BLOCK_SIZE_LIMIT": 4096,
        "ECHO_MIN_TRANSACTION_EXPIRATION_LIMIT": 4,
        "ECHO_BLOCKCHAIN_PRECISION": 100000000,
        "ECHO_BLOCKCHAIN_PRECISION_DIGITS": 8,
        "ECHO_DEFAULT_TRANSFER_FEE": 100000000,
        "ECHO_MAX_INSTANCE_ID": "281474976710655",
        "ECHO_100_PERCENT": 10000,
        "ECHO_1_PERCENT": 100,
        "ECHO_DEFAULT_PRICE_FEED_LIFETIME": 86400,
        "ECHO_DEFAULT_MAX_AUTHORITY_MEMBERSHIP": 10,
        "ECHO_DEFAULT_MAX_ASSET_WHITELIST_AUTHORITIES": 10,
        "ECHO_DEFAULT_MAX_ASSET_FEED_PUBLISHERS": 10,
        "ECHO_COLLATERAL_RATIO_DENOM": 1000,
        "ECHO_DEFAULT_MIN_COMMITTEE_MEMBER_COUNT": 11,
        "ECHO_MAX_COMMITTEE": 19,
        "ECHO_DEFAULT_MAX_PROPOSAL_LIFETIME_SEC": 2419200,
        "ECHO_DEFAULT_COMMITTEE_PROPOSAL_REVIEW_PERIOD_SEC": 1209600,
        "ECHO_MAX_URL_LENGTH": 127,
        "ECHO_DEFAULT_MINIMUM_FEEDS": 7,
        "ECHO_REVERSIBLE_BLOCKS_COUNT": 15,
        "ECHO_DEFAULT_MAX_X86_64_CONTRACT_SIZE": 200000,
        "ECHO_NULL_ACCOUNT": "1.2.0",
        "ECHO_COMMITTEE_ACCOUNT": "1.2.1",
        "ECHO_RELAXED_COMMITTEE_ACCOUNT": "1.2.2",
        "ECHO_NULL_AUTHORITY_ACCOUNT": "1.2.3",
        "ECHO_TEMP_ACCOUNT": "1.2.4",
        "ECHO_PROXY_TO_SELF_ACCOUNT": "1.2.5"
    }
}
```

### get\_chain\_id\(\)

Get the chain ID.

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_chain_id",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": "31cde47f6b94908c2b2ed67c3365c7f58bb744dac145ecf6dc0941e1167c34ab"
}
```

### get\_dynamic\_global\_properties\(\)

Retrieve the current dynamic global property object.

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_dynamic_global_properties",
        []
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "id": "2.1.0",
        "head_block_number": 108,
        "head_block_id": "0000006ca384bf6b3cdbbd9b6b4278390f49f44e",
        "time": "2019-10-14T10:25:31",
        "next_maintenance_time": "2019-10-14T10:30:00",
        "last_budget_time": "1970-01-01T00:00:00",
        "committee_budget": 0,
        "accounts_registered_this_interval": 0,
        "dynamic_flags": 0,
        "last_irreversible_block_num": 93,
        "extensions": []
    }
}
```

### `get\_git\_revision\(\)`

Retrieve info about git revision of running node

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_git_revision",
        []
    ]
}
```

#### Returns

```javascript
{
  "ECHO_GIT_REVISION_SHA": "e910d1a1d8f00f4c2c86d047373e68bb6c482396",
  "ECHO_GIT_REVISION_UNIX_TIMESTAMP": "5 days ago",
  "ECHO_GIT_REVISION_DESCRIPTION": "0.20-rc.0-27-ge910d1a1"
}
```