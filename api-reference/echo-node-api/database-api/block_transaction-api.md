## Blocks and transactions

### get\_block\_header\(block\_num\)

Retrieve a block header.

#### Parameters

| Option | Description |
| :--- | :--- |
| `uint32_t block_num` | height of the block whose header should be returned |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_block_header",
        [
            "1000"
        ]
    ]
}
```

#### Returns

Header of the referenced block, or null if no matching block was found.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "previous": "000003e792f925703c5e033e0b0d0419d955cd38",
        "round": 1000,
        "timestamp": "2019-08-15T15:50:15",
        "account": "1.2.12",
        "delegate": "1.2.0",
        "transaction_merkle_root": "0000000000000000000000000000000000000000",
        "vm_root": [
            "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b42156e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
            "0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68"
        ],
        "prev_signatures": [
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 6,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "4bd5fefe4735219d3154bd773a909aca5233c0c4d881afd93a74f60a894403b501f955e49c4c058d0cab9933a463c19ddc01d093e8c76a339bbff7b5a1875d05"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 9,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "8063dc28f2d5c58119282b474e4a8aae89abbeef3b6cfc2db26e8cf929b22c3c52c01c7983df3a968286a6d48f86804d5ef283aedd433ac1f1407e5e6777f701"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 10,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "dcf2b9b38e02cdc9af772c716d2668f945e2effa3752a23dde5b3a64b27738e51eaf1847ebe2aa41d4056215db8ecc8b61504e28cb3ffa14f9675de5fc2d1b06"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 12,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "b33102eed7bafcbeffc2f10b1bfe622e888fcaaffb3a3415de35fbd8577bb7d88c2c26eea3738eee90d448116f465eb9f512fab6982adb058c0136dfad3bdf07"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 11,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "9d0505e795c4beaea4c5121be821f5b7d037142e99bc91877fad3fc2d1b635a752a5cdde2141270fbd199dee11c2ae1b35398dc31ea4cc6425defddec549220e"
            }
        ],
        "extensions": []
    }
}
```

### get\_block\_header\_batch\(block\_nums\)

Retrieve multiple block header by block numbers.

#### Parameters

| Option | Description |
| :--- | :--- |
| `vector<uint32_t> block_nums` | vector containing heights of the block whose header should be returned |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_block_header_batch",
        [
            [
                "10",
                "20",
                "30", ...
            ]
        ]
    ]
}
```

#### Returns

Array of headers of the referenced blocks, or null if no matching block was found.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        [
            10,
            {
                "previous": "00000009f7885380cc57bf4aa824d9093f370ad1",
                "round": 10,
                "timestamp": "2019-08-23T06:51:20",
                "account": "1.2.11",
                "delegate": "1.2.0",
                "transaction_merkle_root": "0000000000000000000000000000000000000000",
                "vm_root": [
                    "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b42156e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                    "0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68"
                ],
                "prev_signatures": [
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 6,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "06ff421646f117611343084c91068825390af1ad49eb4a3d4534666d08adc022e63456a7951f3c0b77748c96b26aa6ef0525844c40e3daa22289ed1ef557a903"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 11,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "c0fe3fa8fa23b179ecaa7a335e98c51e2fbb8a338caa499d1f6cb8a271fec378023e3358c8b5886ac1861b95e1a25a9b73a53afa262ce557150df85e920c0a07"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 10,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "a5d45aa849328674d459845fd566485238bc10fff5eeffc65f5f0703ae2974fe2a5d7b8a2d360d13de01c556b27c1d517180c43caf08f7557f735afc8af4ee02"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 12,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "d784f31966ca12017c2e369d6c7385a5ff68964b3eb06f3c3a955114e56196968f2c6c95be1268287fb02a7d436d7785afa2fbc6b0976b6546679b14769ab902"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 8,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "9ebe07b847ab5661bc60dfb7a0e998ee4ef1c8f8bb9be1853e0ebbeb471e1082c21f7b478d87b5048a518d1898a3649b028bebabafdd53163a4c2a2d3f1cf106"
                    }
                ],
                "extensions": []
            }
        ],
        [
            20,
            {
                "previous": "00000013749cec13c673f95aa1d1954bda6374a7",
                "round": 20,
                "timestamp": "2019-08-23T06:51:51",
                "account": "1.2.12",
                "delegate": "1.2.0",
                "transaction_merkle_root": "0000000000000000000000000000000000000000",
                "vm_root": [
                    "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b42156e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                    "0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68"
                ],
                "prev_signatures": [
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 9,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "15b0f5ef8f6c207e71bfbd60def7500325d1dc9facb3b7b3f6dbf1bb2a03e365f5228469fe67d89c25cd16b1205b5261f4f94195485df7608d9bbeeebabe700b"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 8,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "a4abd1fe9b8053cc63873807437d13151de9819f7e3e013281dc18c7c61ee126c65ae813836054d190813b1a78d73fa26f01d6c8e39343b930be9bb02ed37604"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 10,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "08926d2c80cf3324f14a5b1a3de46d1d645a0d71494e3f22953045e8b193c9e9c8b40394ccbd770a7c6a8b017ea99fec4776fed4b1b8105a92b64d4f06dd6205"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 12,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "14075233e2feac901c85e782e1a798ba56c62db796e07149c79860d41e74a17222c5842832aca4bfc1e85870d161fe8cdc7ac24707334c2bf1542b2d1689f803"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 9,
                        "_producer": 11,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "3292d61fa622c88385a0dec27b31bf92fe7dfc3c81d767d1ee576689ec3a71f2e0ee75e7d183ad5d4b76be5973927c4b08f9ffdd754226542ded48259891c800"
                    }
                ],
                "extensions": []
            }
        ],
        [
            30,
            {
                "previous": "0000001dc801dd1e87082ba87064188fc412bb63",
                "round": 30,
                "timestamp": "2019-08-23T06:52:31",
                "account": "1.2.6",
                "delegate": "1.2.0",
                "transaction_merkle_root": "0000000000000000000000000000000000000000",
                "vm_root": [
                    "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b42156e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                    "0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68"
                ],
                "prev_signatures": [
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 7,
                        "_producer": 9,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "5283b5d0c718d2c52b291ab7f8f97a53fddac6733532189599636bd33c192e49361c649fb831027e610a715f1f7f11a6e89c0361a7cc9be0f2fe1cdd389afa0a"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 7,
                        "_producer": 8,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "0d7c6bf69e6571f7947b7d17df0fd75e04d6321beb7c0f646a9b3f517d43e90d8e2bb7baa98d9924c857e4e91870f607c33ad7fc7c88c83911442ebed889ad09"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 7,
                        "_producer": 12,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "52f9a1344c3589985049bd29bd1730b387a76b427cf876fb12740fe2e7b396f433f49b45d75810cfb2ff73d6287644631d0ee95dffea1dc7da5fc641a4781706"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 7,
                        "_producer": 11,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "c16da013f5c459d93d72af24f4498004f052635b9cc652aceb33220dfd7bfab949a5f93fe2fb836a20c386727f807f06d0ed72924eaa79af8e1cbf842ccfb208"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 7,
                        "_producer": 10,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "2dd2fad713aa9163eb262e1cc54674ac8c66bb0c1a2138cf2a9d8c16a6fc7c8cb11d27df3217f312ec4053102dfa69baf0b32f6c10e030077ca6224c1b7ce600"
                    }
                ],
                "extensions": []
            }
        ]
    ]
}
```

### get\_block\(block\_num\)

Retrieve a full, signed block.

#### Parameters

| Option | Description |
| :--- | :--- |
| `uint32_t block_num` | height of the block to be returned |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_block",
        [
            "1000"
        ]
    ]
}
```

#### Returns

The referenced block, or null if no matching block was found.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "previous": "000003e792f925703c5e033e0b0d0419d955cd38",
        "round": 1000,
        "timestamp": "2019-08-15T15:50:15",
        "account": "1.2.12",
        "delegate": "1.2.0",
        "transaction_merkle_root": "0000000000000000000000000000000000000000",
        "vm_root": [
            "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b42156e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
            "0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68"
        ],
        "prev_signatures": [
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 6,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "4bd5fefe4735219d3154bd773a909aca5233c0c4d881afd93a74f60a894403b501f955e49c4c058d0cab9933a463c19ddc01d093e8c76a339bbff7b5a1875d05"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 9,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "8063dc28f2d5c58119282b474e4a8aae89abbeef3b6cfc2db26e8cf929b22c3c52c01c7983df3a968286a6d48f86804d5ef283aedd433ac1f1407e5e6777f701"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 10,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "dcf2b9b38e02cdc9af772c716d2668f945e2effa3752a23dde5b3a64b27738e51eaf1847ebe2aa41d4056215db8ecc8b61504e28cb3ffa14f9675de5fc2d1b06"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 12,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "b33102eed7bafcbeffc2f10b1bfe622e888fcaaffb3a3415de35fbd8577bb7d88c2c26eea3738eee90d448116f465eb9f512fab6982adb058c0136dfad3bdf07"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 11,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "9d0505e795c4beaea4c5121be821f5b7d037142e99bc91877fad3fc2d1b635a752a5cdde2141270fbd199dee11c2ae1b35398dc31ea4cc6425defddec549220e"
            }
        ],
        "extensions": [],
        "ed_signature": "6e1ba3b86e0dffab6a06abe3fa7725fc7bf8737773cc105957a0c671252a5c4f52e134cb65f3f81c8ba90dea3b7b5200432f755e98d8008fb0344f2da1baf90f",
        "rand": "008d90988856b11453a1727a2475f3e7ece17ca5a18dd07605200f6a56cdb18d",
        "cert": [
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 10,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "267b545c018b555a1bbf901f34ee8ded8173af60fb9e23cd6c3b152e75147327ff43b408d6574627575f29a0a6ff921812cb5008f359e888bd9d573501f4a801"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 9,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "c19e034e79c056e35b813078598cdb976e83ef0e0b957875d8d25ef6b34c28f724d7e5dd1426498a14de466f674e522ac320fbad41bb32412a5c8eb50fd72808"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 6,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "0ea7dd8a26e95ccf1b3ad24aafda694f032eacecb25f81d06fb283c60357f305d5a6ce62fa0793303b1d093c76277939aa09a1e4ae5aaeed7c19b98a87891d0c"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 8,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "34b1d6b8afaff8693117c17600686b1d759923ead90d9bdbf26eed5e02bf1caae0a095026c83245a78e4c3e0fa965e2845a6c28038af422631361e82e8e74209"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 12,
                "_producer": 7,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "44f9ab6a4729eadeb95041b57c04fff62097815779f008ca96c67f6d8756a99bad2f0e138332e0d9172cd6a7103060e95259c0e5e3a746632894f13c2f351804"
            }
        ],
        "transactions": []
    }
}
```

### get\_block\_tx\_number\(id\)

Get the total number of transactions in block.

#### Parameters

| Option | Description |
| :--- | :--- |
| `block_id_type(ripemd160) id` | ID of the block to retrieve |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_block_tx_number",
        [
            "000003e835f96c81ce14fea203ad5658f8b2f5b1"
        ]
    ]
}
```

#### Returns

If block was found total number of transaction in block, or null if no matching block was found.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": 1
}
```

### get\_block\_virtual\_ops\(block\_num\)

Get virtual ops from the block.

#### Parameters

| Option | Description |
| :--- | :--- |
| `uint32_t block_num` | height of the block to be returned |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_block_virtual_ops",
        [
            "7429"
        ]
    ]
}
```

#### Returns

Array of operation history objects, or null if no matching operation was found.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.6.2018",
            "op": [
                37,
                {
                    "fee": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "value": {
                        "amount": 10000,
                        "asset_id": "1.3.1"
                    },
                    "account": "1.2.1013",
                    "deposit_id": "1.15.0",
                    "extensions": []
                }
            ],
            "result": [
                0,
                {}
            ],
            "block_num": 1413,
            "trx_in_block": 3,
            "op_in_trx": 0,
            "virtual_op": 15129,
            "extensions": []
        }
    ]
}
```

### get\_block\_rewards\(block\_num\)

Get block rewards by number block.

#### Parameters

| Option | Description |
| :--- | :--- |
| `uint32_t block_num` | height of the block to be returned |

#### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_block_rewards",
        [
            "100"
        ]
    ]
}
```

#### Returns

Fee distribution emission, fees and map rewards.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "emission": 1000,
        "fees": 1379,
        "rewards": [
            [
                "1.2.6",
                0
            ],
            [
                "1.2.8",
                0
            ],
            [
                "1.2.9",
                0
            ],
            [
                "1.2.11",
                0
            ],
            [
                "1.2.12",
                0
            ],
            [
                "1.2.13",
                1190
            ],
            [
                "1.2.14",
                0
            ],
            [
                "1.2.15",
                1189
            ],
            [
                "1.2.17",
                0
            ],
            [
                "1.2.18",
                0
            ]
        ]
    }
}
```

### get\_transaction\(block\_num, trx\_in\_block\)

Fetch an individual transaction.

#### Parameters

| Option | Description |
| :--- | :--- |
| `uint32_t block_num` | height of the block in which the transaction resides |
| `uint32_t trx_in_block` | index of the transaction in the block |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_transaction",
        [
            "1000",
            "10"
        ]
    ]
}
```

#### Returns

A processed transaction object.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "ref_block_num": 221,
        "ref_block_prefix": 4141892275,
        "expiration": "2019-08-14T14:05:52",
        "operations": [
            [
                0,
                {
                    "fee": {
                        "amount": 20,
                        "asset_id": "1.3.0"
                    },
                    "from": "1.2.26",
                    "to": "1.2.10",
                    "amount": {
                        "amount": 1000000000,
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ]
        ],
        "extensions": [],
        "signatures": [
            "5c95aedb574a86252749031f4d5cbb790037604b8c2e01e6e6eae071cb231459a4902e2932383b14e0d61d49812a73992766c958c823cd2691c5d4d4fe803b07"
        ],
        "signed_with_echorand_key": false,
        "operation_results": [
            [
                0,
                {}
            ]
        ]
    }
}
```

### get\_recent\_transaction\_by\_id\(id\)

If the transaction has not expired, this method will return the transaction for the given ID or it will return null if it is not known. Just because it is not known does not mean it wasn’t included in the blockchain.

#### Parameters

| Option | Description |
| :--- | :--- |
| `transaction_id_type(ripemd160) id` | ID of the transaction |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_recent_transaction_by_id",
        [
            "15ec7bf0b50732b49f8228e07d24365338f9e3ab"
        ]
    ]
}
```

#### Returns

A signed transaction object.

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "ref_block_num": 27,
        "ref_block_prefix": 109608699,
        "expiration": "2019-08-14T14:22:17",
        "operations": [
            [
                21,
                {
                    "fee": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "deposit_to_account": "1.2.26",
                    "balance_to_claim": "1.8.0",
                    "balance_owner_key": "ECHO6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu",
                    "total_claimed": {
                        "amount": "1000000000000000",
                        "asset_id": "1.3.0"
                    },
                    "extensions": []
                }
            ]
        ],
        "extensions": [],
        "signatures": [
            "c621da6b014a5cf6d4533ea747f0d77908663e6b4daaa3f5041f6d176f26a947847889c467d82506da9c00316e073c2435f21a6bb6e2788996c8c0b94e93bd01"
        ],
        "signed_with_echorand_key": false,
        "operation_results": [
            [
                0,
                {}
            ]
        ]
    }
}
```

## Proposed transactions

### get\_proposed\_transactions\(id\)

Returns the set of proposed transactions relevant to the specified account id.

#### Parameters

| Option | Description |
| :--- | :--- |
| `account_id_type id` | the ID of the account |

#### Example

```javascript
{
    "id": 4,
    "method": "call",
    "params": [
        DATABASE_API_ID,
        "get_proposed_transactions",
        [
            "1.2.26"
        ]
    ]
}
```

#### Returns

```javascript
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        {
            "id": "1.5.0",
            "expiration_time": "1970-01-01T00:00:00",
            "proposed_transaction": {
                "ref_block_num": 221,
                "ref_block_prefix": 4141892275,
                "expiration": "1970-01-01T00:00:00",
                "operations": [],
                "extensions": []
            },
            "required_active_approvals": [],
            "available_active_approvals": [],
            "available_key_approvals": [],
            "extensions": []
        }
    ]
}
```