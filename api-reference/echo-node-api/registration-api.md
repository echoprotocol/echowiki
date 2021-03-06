# Registration API

## request_registration_task

Request connected node to register account.

### Example

This query return data needed for calculating pow algorithm.

```json
{
    "id": 1,
    "method": "call",
    "params": [
        REGISTRATION_API_ID,
        "request_registration_task",
        [
        ]
    ]
}
```

### Response

| Option | Description |
| :--- | :--- |
| `block_id_type block_id` | gives a block_id for sha256 calculating |
| `uint64_t rand_num` | gives a salt for sha256 calculating |
| `uint16_t difficulty` | gives a pow complexity |

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result":
    {
        "block_id": "00000a82ec7bc3735ae45a3e5d75dc06c740b04d",
        "rand_num": "3323422951117619593",
        "difficulty": 20
    }
}
```

## submit_registration_solution callback name active echorand_key evm_address nonce rand_num

Submit PoW task solution to register account.

You need to calcualte `hash = sha256(block_id.to_bytes() + rand_num.to_bytes() + nonce.to_bytes())` untill you get first `difficulty` bits of hash equal to `0`. Only `nonce` should be changed. After you get suitable nonce you can form a request.
`difficulty`, `block_id` and `rand_num` is taken from `request_registration_task` response.

### Parameters

| Option | Description |
| :--- | :--- |
| `variant_callback_t callback` | gives a notification whenever transaction for registation account broadcasted |
| `string name` | name of account |
| `public_key_t active` | active ed25519 key |
| `public_key_t echorand_key` | ed25519 key for echorand |
| `optinal<eth_address_t> evm_address` | evm address that will be assosiated with account. could be specified as null |
| `uint64_t nonce` | used for verification of pow algorithm |
| `uint64_t rand_num` | used as salt for sha256 and id for request_registration_task query |

### Example

```json
{
    "id": 1,
    "method": "call",
    "params": [
        REGISTRATION_API_ID,
        "submit_registration_solution",
            [
                CALLBACK_ID,
                "account_name",
                "ECHODvHDsAfk2M8LhYcxLZTbrNJRWT3UH5zxdaWimWc6uZkH",
                "ECHODvHDsAfk2M8LhYcxLZTbrNJRWT3UH5zxdaWimWc6uZkH",
                "517CF26a16127c4A58072FB7C24D1140F1b63A67"
                NONCE,
                RAND_NUM
            ]
    ]
}
```

### Response example

`true` means that client sends correct nonce. If result is `false` it means nonce or rand_num is incorrect or time for calculating is expired.

```json
{
    "id":0,
    "jsonrpc":"2.0",
    "result":true
}
```

### Notice example

```json
{
    "method": "notice",
    "params": [
        CALLBACK_ID,
        [
            {
                "block_num": 1248363,
                "tx_id": "8b5172b6c95db447ee4b1ca4cd076651189442dd",
                "registered_account_id": "1.2.17"
            }
        ]
    ]
}
```

## get_registrar

Get the registrar account.

### Example

```json
{
    "id": 1,
    "method": "call",
    "params": [
        REGISTRATION_API_ID,
        "get_registrar",
            [
            ]
    ]
}
```

### Response example

Account ID of the registrant.

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": "1.2.15"
}
```
