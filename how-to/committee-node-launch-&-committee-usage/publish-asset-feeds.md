# How to: Echo committee publishes new rates for ETH and BTC

Committee members can publish feeds for committee fed asset via method in wallet api.

```bash
unlocked >>> publish_asset_feed 1.2.6 "EETH" {"base": {"amount": 1, "asset_id": "1.3.1"}, "quote": {"amount": 2, "asset_id": "1.3.0"}} true 
{
  "ref_block_num": 82,
  "ref_block_prefix": 3601599606,
  "expiration": "2020-09-27T17:05:18",
  "operations": [[
      14,{
        "fee": {
          "amount": 100,
          "asset_id": "1.3.0"
        },
        "publisher": "1.2.6",
        "asset_id": "1.3.1",
        "core_exchange_rate": {
          "base": {
            "amount": 1,
            "asset_id": "1.3.1"
          },
          "quote": {
            "amount": 2,
            "asset_id": "1.3.0"
          }
        },
        "extensions": []
      }
    ]
  ],
  "extensions": [],
  "signatures": [
    "3d273f96b55449de25cdbc6ce598b9c876ef73ecfe0423d6aedb1e185a51e11d90f14081d81284367fd6dc2956eeda383b22eb83a1057db3e200fdc1f334900b"
  ],
  "signed_with_echorand_key": false
}
```
