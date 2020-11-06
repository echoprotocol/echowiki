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
            "75"
        ]
    ]
}
```

#### Returns

Header of the referenced block, or null if no matching block was found.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "previous": "0000004abf11056270d24459abe3a58516d99cee",
        "round": 75,
        "attempt": 2,
        "timestamp": "2019-11-26T13:54:37",
        "account": "1.2.11",
        "delegate": "1.2.0",
        "transaction_merkle_root": "4346203bfbd5139e1ee6167b1ad79cb6be752934",
        "vm_root": [
            "002b44168e591a0a984350ca8f56776a98c3b6b64351cd0bbef52cf8615d990cece9f0bcd9205c170ed67dbabad0b643482e0ea87650abeb172a47656b53bc53",
            "0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68"
        ],
        "prev_signatures": [
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 9,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "c2c1d7e758306154ab5038c97f20e0c034c51be35e084fef0361299a641a258021dbf6ddba764ce33532c51e1d1a9df19bba90ed5b5e5d0731fffdc5892f9c01"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 8,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "81105a4baa83e5f2d90703b5fa644fa9284134352401e947aa97c30f8d1ae9fc22add66d0c911ee927f032a3bfb56ff6c93ae8962eeb116f58323984e12a3409"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 7,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "4166ca7d166eacbede077e3ddb8ad5babf4394437df9a990072b5fecd1910d5caaebcf5b19134e6e28124f42e227ea6f4474798e0a724cb3c3837949cecf9808"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 14,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "4b59f6ee279947650777cee665c90d07de412eb8b0ad700a2971994751b061c4e03c3b94f5cd402c7a96df0861de6561573c3f11788820a854436ccea94bce02"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 15,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "1387f12d74152386aa4040f66688de9b45c94a6631d26108ce0b07aa1ca6261934931bd16cde22ad953915957caa9de6ba1bd7ddcf98d73eedfc27d560842108"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 13,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "81cf173e6aa13e5734be6f49c80db6bac62eb4e8197783ed33ad8db14c1c2c9728ac82687563c087932958ca13c82c6273440cd73e92332947985622c9ca3501"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 6,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "bef6e45a768e9a9580d8d844c0b26ca34bac69dd1bb5d5023d6ba511ba42bf47f6d2152f0577cbc3961c7b7d09e935fb79e95d06ee60a0e8054d3e44d8b4770a"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 12,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "b3403176506658346a0445bc97f31a12bbbac8e4e7a523e87dbd63254e29def3dee69d7ad55e4c4972d5d1dfa4b09432e2ac01573a75f50931c70aff38c6670d"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 11,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "b26cf526fca6f9da9bbb6b70f35281266876705db200590562720fe1d85fffa54231d00139f937665dfaef40afdbe33abb4447296d0ac62de7ea3ae509bd6c0e"
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

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": [
        [
            10,
            {
                "previous": "00000009d9f26ac464ce30713bfdf9213d62bf72",
                "round": 10,
                "attempt": 0,
                "timestamp": "2019-11-26T13:49:47",
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
                        "_leader": 13,
                        "_producer": 9,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "e7da3962836ed729e1d9328e202b7b9d1f1c02fd58070f8100ab157c628b8adfe4114a9e59674704ef1f08a22adb4ce6130106829782c688a25d53154d36f906"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 13,
                        "_producer": 8,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "dd49d2ea30a2a74974ded7acd48189e96eb48c7df1adc8cdb2235f8c1b455a189ce663919efc51b88a916a5c66cc38b2c28ab6033e272928ddfde78c5d97e80e"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 13,
                        "_producer": 7,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "9be2a70db76e3ecde06efd49df86ade1f52fa7424a6893984efaff468c63be7adb49753386a2d7cdd1716be2dd9e209dc68e38a0d803200d9cb94e87a622070a"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 13,
                        "_producer": 13,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "658ed2e7afc2e2628657c813534b86984a5cb177c5524eca2a6b1d025476d42fb3172cbc1f4f9226df71edcffb2928e5efafa877b3bf467700327f290f40900b"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 13,
                        "_producer": 6,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "1578503a6137344d4a340419d5f475e4ca46610e333e8d1ce87eb53719f2489f32d9efc37fe56e218135a5c69c64e00677e3eb819b4c9d0fadc2ba29c646a70d"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 13,
                        "_producer": 14,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "640a7abccdfbd3f0f9846a0f876f6d6902487f87faca92eebe54a496e6397f04840735f308daab62ef264e09d67026926aefca4de56aa982a1c98f34de772807"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 13,
                        "_producer": 12,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "5b848ee65c860c7a088c62674b96227eddf7ad0b9927c7c3833419a1dc282addc29bc898ca55aed09bb8d2c7fc183fd411f41f947e17493ec62c0418b5ab870e"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 13,
                        "_producer": 15,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "220d9ae9d5a10a773883e2d638fac8d01480c1a0368919e18120c32930cad067e3e5b02d25636bb9d43b762d9f2e1ed7a7fdc3336fba31a2fc4454ce5ff7ea0a"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 13,
                        "_producer": 11,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "1280197b49fafc2877b3813fdb51656df76440d42d993eae72a3d9da19e20f1ac79354ba6d769476888a47de44a5d1d445557084eecf5a677363009957276f06"
                    }
                ],
                "extensions": []
            }
        ],
        [
            20,
            {
                "previous": "000000134026b7af365a7785c1363c611ef44f1c",
                "round": 20,
                "attempt": 0,
                "timestamp": "2019-11-26T13:50:27",
                "account": "1.2.10",
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
                        "_leader": 10,
                        "_producer": 7,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "53640c1ed6683a1b488063dc4d053b8c523035c5ee73769d0901ed22cd75dbde96f1e94acae8df0e899925bec9779643790108a38c551db2ba54a2bc0520130d"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 10,
                        "_producer": 9,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "e989298932fc04961b99d7a934c9cbb49f3aed85d01ef5ad32741ffbbb6ee0cd3d0149a818865f2938d743f3b8206a7bf8edec077fde4ef731e2a5b88e81f004"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 10,
                        "_producer": 8,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "2e98aa7487be46db65520c1bfaf77b4d1886e2d34f162cd71e57533687d6bcf6059ef322cc58ca3aa17ad7bd664f36b50ebf843f1ec4699220cf9268306c7d04"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 10,
                        "_producer": 11,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "987d3d7fab249bfa1ef567128d4ea817ad82adbbb999c21e90d236593c474cc9db36ff776741d73df43a430a9f3f192baf9b41c3e8fe9d6d1f53d1ebb19c6903"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 10,
                        "_producer": 13,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "3245cc0bf37dc2952fb35aba1bc7f410d9e8e04db917c8b8b8391487c1071911f874a471e5fcc97c405944ca13c135a39850bdae71d417a615f6fab627435202"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 10,
                        "_producer": 12,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "4e96442065c1a4ffc13416de21004d626d99d0a8edab8721b773cbfba901b3e819920b94d9a61c6f18df495bf6edb43cd071c15115140c6969eb979e730da60e"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 10,
                        "_producer": 14,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "7965ba7193694a9fd20f69c820d6402d66f5c2c9f8873ccfed8939b2128d11f446666f5a8aa400262b144346e8d21e6df61e81a85bf442069861b527c60e6d04"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 10,
                        "_producer": 15,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "c7c6030fd3b172cbb9c13c7d799db95f6e930dd098fd5d6303a2a3819745e7d60f220fb64badce54d8b8bb8b56f4d0370db30898d9a9d9f74b62bcec25e16a09"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 10,
                        "_producer": 10,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "b92196d8ec8f988a1fb5780f2f23cd55cfa77a5d245240f06ba467c5aa419e67c01c92b2d3bedc904e87f897445487ae94bd4ece2816919d8a0a4f0aa1017008"
                    }
                ],
                "extensions": []
            }
        ],
        [
            30,
            {
                "previous": "0000001daaabe07d7e1b0ed10dda968653eafdf1",
                "round": 30,
                "attempt": 0,
                "timestamp": "2019-11-26T13:51:08",
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
                        "_leader": 15,
                        "_producer": 9,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "c6b758b24747078900bd38660fdf5c435bbc3656de6f5fcf4e612232479c06080d79f1287c27b7d617c8a3f411cdd6decbeff1b0b40cc9ba31f510502815c10b"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 15,
                        "_producer": 8,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "66a7bc3cac01f4a8cb0139c3b11c846f5b487021d189225638bd3d16e5f1ce95195ab6554a5c0b6b7878e401b97b53f644420eeaed9a9ca92c2b4fc1ac7baf0d"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 15,
                        "_producer": 7,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "62c88137c9888c779b134eec9102a90d6c43c9e01e6b149effac8cb51ecd77b87f9d5a376b47c485ab4171f2e456410698c8d9af4dd50a97e9c446882cb4e604"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 15,
                        "_producer": 13,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "4fe2c0568ae379efdd40790c35263bb71eca1e3bef8c998885c0527b257e33e804083f93c2ddd97d7ffea9e70dfcad453f0f5c3d84ec6699a9f5d9281bfb1700"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 15,
                        "_producer": 6,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "e7d7e90619c0e61f4c4073b20404d494dd6db09809c6e64a4a05f2b82226b013c22021f52c6493f7dfa527fcc1fd4e41505c4e8b4983bb7aaa84cd73e2813b08"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 15,
                        "_producer": 15,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "64bf9fcbdc84905b93dbb8f2a99d47af9b0d8fd9080f155ed452d718378026ab7a613882a78eff8f2c033f04c2f7d7232f2e5735daa429d03a5045338bc8cc06"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 15,
                        "_producer": 12,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "8410d2eae74d8e925631596267a19c64725fffe7e186aba035ac8b18a96e3d04f7c868ce148d9bfde9b0df23e0909f87ad41e7723b2615838f3e57f78186cd08"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 15,
                        "_producer": 14,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "2b4184d0b615000ff44e3c4b7e2518f7ceb8a67376abb53aac4496b61e9e895f9c77b0effc7bd8f17795c847e8be49b835a1914ea06df3a2a09a85e457c87d09"
                    },
                    {
                        "_step": 4,
                        "_value": 0,
                        "_leader": 15,
                        "_producer": 11,
                        "_delegate": 0,
                        "_fallback": 0,
                        "_bba_sign": "ecf1272e2d300c35628cefb84c24e4e3ed67a04825e69a132a80f9863f06341ebdab72118ea6e2fa3079016f8171974ba56d040dbcc417946253fb689913120b"
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
            "75"
        ]
    ]
}
```

#### Returns

The referenced block, or null if no matching block was found.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "previous": "0000004abf11056270d24459abe3a58516d99cee",
        "round": 75,
        "attempt": 2,
        "timestamp": "2019-11-26T13:54:37",
        "account": "1.2.11",
        "delegate": "1.2.0",
        "transaction_merkle_root": "4346203bfbd5139e1ee6167b1ad79cb6be752934",
        "vm_root": [
            "002b44168e591a0a984350ca8f56776a98c3b6b64351cd0bbef52cf8615d990cece9f0bcd9205c170ed67dbabad0b643482e0ea87650abeb172a47656b53bc53",
            "0.9a71ff66a2f503e4e96c4e9a2521d6a710f2d373b422332029da170d78fa1a68"
        ],
        "prev_signatures": [
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 9,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "c2c1d7e758306154ab5038c97f20e0c034c51be35e084fef0361299a641a258021dbf6ddba764ce33532c51e1d1a9df19bba90ed5b5e5d0731fffdc5892f9c01"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 8,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "81105a4baa83e5f2d90703b5fa644fa9284134352401e947aa97c30f8d1ae9fc22add66d0c911ee927f032a3bfb56ff6c93ae8962eeb116f58323984e12a3409"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 7,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "4166ca7d166eacbede077e3ddb8ad5babf4394437df9a990072b5fecd1910d5caaebcf5b19134e6e28124f42e227ea6f4474798e0a724cb3c3837949cecf9808"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 14,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "4b59f6ee279947650777cee665c90d07de412eb8b0ad700a2971994751b061c4e03c3b94f5cd402c7a96df0861de6561573c3f11788820a854436ccea94bce02"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 15,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "1387f12d74152386aa4040f66688de9b45c94a6631d26108ce0b07aa1ca6261934931bd16cde22ad953915957caa9de6ba1bd7ddcf98d73eedfc27d560842108"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 13,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "81cf173e6aa13e5734be6f49c80db6bac62eb4e8197783ed33ad8db14c1c2c9728ac82687563c087932958ca13c82c6273440cd73e92332947985622c9ca3501"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 6,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "bef6e45a768e9a9580d8d844c0b26ca34bac69dd1bb5d5023d6ba511ba42bf47f6d2152f0577cbc3961c7b7d09e935fb79e95d06ee60a0e8054d3e44d8b4770a"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 12,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "b3403176506658346a0445bc97f31a12bbbac8e4e7a523e87dbd63254e29def3dee69d7ad55e4c4972d5d1dfa4b09432e2ac01573a75f50931c70aff38c6670d"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 8,
                "_producer": 11,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "b26cf526fca6f9da9bbb6b70f35281266876705db200590562720fe1d85fffa54231d00139f937665dfaef40afdbe33abb4447296d0ac62de7ea3ae509bd6c0e"
            }
        ],
        "extensions": [],
        "ed_signature": "584a7c6ed652446b9db2bd8224463850f2d634d1dff873e8296e6820ca40dd15b5f4cdb144ae226231ebf7a93b6c508b953f4b7609250ad8cc72f00e9e829f07",
        "rand": "6a9ce5d9989fbca417db32dad701b3c805a3a64cb8e6b50753cdc53759071737",
        "cert": [
            {
                "_step": 4,
                "_value": 0,
                "_leader": 11,
                "_producer": 7,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "02a3cca6c7562b9c23a55695c489ab7e770ceb1af89153be5c770ca0cc69d6beba87be580a954125bb0e3f530ec1aded2d66c3faef11eea4c5f73b4228862b0d"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 11,
                "_producer": 8,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "6fb9049a851b45b2c5c2e63771993d083ae172539d61d9fe5277cfb9db61fdb790d0f5a9ef4bdc139262f60ecb370558dbaa805768976b8522a2aca35abecc0c"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 11,
                "_producer": 9,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "58f28a9a60cbbe574fb637c9c9da649b7091188d5a6e89c12d9a081d2ccfb7635f05b2f53a27cc2e1d2132205afa759c05805ef5d02e92224fd7fbd5fd7f8d08"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 11,
                "_producer": 12,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "abdc1cd5f5727c5dada7562ef90853ecac60f51ba3c5aaffb6d461b88d06d3d96b92f57c69fe89e752b6b6be43b155854c703b7790c3834342cd1706738b490d"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 11,
                "_producer": 11,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "728923637a3b62ed08ca30f692137b97d0d58f4b15f2662c344a5ae9faf163a0ffab6803c993577bb52c64b3bd776b799a9c49f0e56db05d4c8b4bc60fe8ec02"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 11,
                "_producer": 13,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "8ad6904facbbd56b898b77ccab4d5307a098d41f0421bdca6cfa55924cbecfd72fbc15dfb5c6642d4c61817b228414f6e525e6b938a932d00940b6b6e915240e"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 11,
                "_producer": 14,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "4dd7dd264c8183b56c22892ebdfa004d26ec8ff7d635ebcae370c6acfdca1b8468884ca46c087179dc3c1182536d55802958e10d9941e90f70afd70acdd23105"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 11,
                "_producer": 15,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "dfe9a82f1b9db6b29de3393ec7c51053b0361ab3ba309285107f4acbfcd75bf5307ff22635316c671963f766ea2e1058f50fa2d440bb48a3ab68d55dc200b40e"
            },
            {
                "_step": 4,
                "_value": 0,
                "_leader": 11,
                "_producer": 10,
                "_delegate": 0,
                "_fallback": 0,
                "_bba_sign": "8d1c9c26a9b8c3aab77711f7ae544d158605966a3a4816422d2ce6a0c294cdba7595f4da768396db5bedc7300e546fbef33791a458d4f6186b243f0d8f970305"
            }
        ],
        "transactions": [
            {
                "ref_block_num": 36,
                "ref_block_prefix": 764926637,
                "expiration": "2019-11-26T14:01:36",
                "operations": [
                    [
                        31,
                        {
                            "fee": {
                                "amount": 381,
                                "asset_id": "1.3.0"
                            },
                            "registrar": "1.2.15",
                            "value": {
                                "amount": 1,
                                "asset_id": "1.3.0"
                            },
                            "code": "60806040526101e2806100136000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e1a7d4d14610051578063d0e30db01461007e575b600080fd5b34801561005d57600080fd5b5061007c60048036038101908080359060200190929190505050610088565b005b610086610143565b005b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156100ce573d6000803e3d6000fd5b503073ffffffffffffffffffffffffffffffffffffffff16317fe8d947d7ebdd7b8b8fa2ad2022c7591418ac32d8c29c5f8a8fc9de52ffa5409260405160405180910390a2807f4e70a604b23a8edee2b1d0a656e9b9c00b73ad8bb1afc2c59381ee9f69197de760405160405180910390a250565b347f4d6ce1e535dbade1c23defba91e23b8f791ce5edc0cc320257a2b364e4e3842660405160405180910390a23073ffffffffffffffffffffffffffffffffffffffff16317fe8d947d7ebdd7b8b8fa2ad2022c7591418ac32d8c29c5f8a8fc9de52ffa5409260405160405180910390a25600a165627a7a72305820a27dfc236191402eef3cee43c9a20e3a01fe184eba3625103e93c636009a93fb0029",
                            "eth_accuracy": false,
                            "extensions": []
                        }
                    ]
                ],
                "extensions": [],
                "signatures": [
                    "7f9bbe70a45197e9d01ecf35b8f42965ec9689b298223b8bed6895325dbdda6adedba3db491620d78d1022b2feb7d53c2d5e622b8f2f47d9af1c5a3be75dd603"
                ],
                "signed_with_echorand_key": false,
                "operation_results": [
                    [
                        1,
                        "1.12.1000"
                    ]
                ],
                "fees_collected": 381
            },
            {
                "ref_block_num": 36,
                "ref_block_prefix": 764926637,
                "expiration": "2019-11-26T14:01:37",
                "operations": [
                    [
                        31,
                        {
                            "fee": {
                                "amount": 381,
                                "asset_id": "1.3.0"
                            },
                            "registrar": "1.2.15",
                            "value": {
                                "amount": 1,
                                "asset_id": "1.3.0"
                            },
                            "code": "60806040526101e2806100136000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e1a7d4d14610051578063d0e30db01461007e575b600080fd5b34801561005d57600080fd5b5061007c60048036038101908080359060200190929190505050610088565b005b610086610143565b005b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156100ce573d6000803e3d6000fd5b503073ffffffffffffffffffffffffffffffffffffffff16317fe8d947d7ebdd7b8b8fa2ad2022c7591418ac32d8c29c5f8a8fc9de52ffa5409260405160405180910390a2807f4e70a604b23a8edee2b1d0a656e9b9c00b73ad8bb1afc2c59381ee9f69197de760405160405180910390a250565b347f4d6ce1e535dbade1c23defba91e23b8f791ce5edc0cc320257a2b364e4e3842660405160405180910390a23073ffffffffffffffffffffffffffffffffffffffff16317fe8d947d7ebdd7b8b8fa2ad2022c7591418ac32d8c29c5f8a8fc9de52ffa5409260405160405180910390a25600a165627a7a72305820a27dfc236191402eef3cee43c9a20e3a01fe184eba3625103e93c636009a93fb0029",
                            "eth_accuracy": false,
                            "extensions": []
                        }
                    ]
                ],
                "extensions": [],
                "signatures": [
                    "77563fdbee2579c603c14fda65baa3b98d4f65c73a33c2a7167b41abc919d60cd55f961db3f5d6555fa19d3c3e0029dbacc2489017b1593ab1122da30bbe5904"
                ],
                "signed_with_echorand_key": false,
                "operation_results": [
                    [
                        1,
                        "1.12.1001"
                    ]
                ],
                "fees_collected": 381
            }
        ]
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

### get\_transaction\_by\_id\(id\)

Returns the transaction for the given ID.

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
        "get_transaction_by_id",
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