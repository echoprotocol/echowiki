# Network Node API

## get\_info()

Return general network information, such as p2p port.

### Example

```json
{
    "id": 1,
    "method": "call",
    "params": [
        NETWORK_NODE_API_ID,
        "get_info",
            [
            ]
    ]
}
```

### Returns

```json
{
    "id": 4,
    "result": {
        "listening_on": "0.0.0.0:6310",
        "accept_incoming_connections": true,
        "node_public_key": "030ae110268bca710e5a5893a7125b3c162df95bf910c9d557b8e0438c735fac19",
        "node_id": "cb65a2ec8e7740f1731aba0b5d17885c85ba43648264a960223e2e4d79926f163f",
        "firewalled": "unknown",
        "connection_count": 1
    }
}
```

## add\_node(ep)

Connect to a new peer.

### Parameters

| Option | Description |
| :--- | :--- |
| `endpoint ep` | The IP/Port of the peer to connect to |

### Example

```json
{
    "id": 1,
    "method": "call",
    "params": [
        NETWORK_NODE_API_ID,
        "add_node",
            [
                "0.0.0.0:6310"
            ]
    ]
}
```

## get\_connected\_peers

Get status of all current connections to peers.

### Example

```json
{
    "id": 1,
    "method": "call",
    "params": [
        NETWORK_NODE_API_ID,
        "get_connected_peers",
            [
            ]
    ]
}
```

### Returns

```json
{
    "id": 4,
    "result": [
        {
            "version": 0,
            "host": "52.59.222.220:6310",
            "info": {
                "addr": "52.59.222.220:6310",
                "addrlocal": "172.17.0.2:6310",
                "services": "00000001",
                "lastsend": 1580903464,
                "lastrecv": 1580903464,
                "bytessent": 10117056,
                "bytesrecv": 9415728,
                "conntime": "2020-01-30T14:51:52",
                "pingtime": "",
                "pingwait": "",
                "version": "",
                "subver": "ECHO Reference Implementation",
                "inbound": true,
                "firewall_status": "firewalled",
                "startingheight": "",
                "banscore": "",
                "syncnode": "",
                "fc_git_revision_sha": "d8b66d89df2b86621dc978b0f68dafc2443f18b0 (same as ours)",
                "fc_git_revision_unix_timestamp": "2020-01-23T09:04:16",
                "fc_git_revision_age": "13 days ago (same as ours)",
                "platform": "linux",
                "current_head_block": "000000465377e3b43844d40620da5e9ffb210821",
                "current_head_block_number": 70,
                "current_head_block_time": "2020-01-30T15:00:48"
            }
        }
    ]
}
```

## get\_potential\_peers

Return list of potential peers.

### Example

```json
{
    "id": 1,
    "method": "call",
    "params": [
        NETWORK_NODE_API_ID,
        "get_potential_peers",
            [
            ]
    ]
}
```

### Returns

```json
{
    "id": 4,
    "result": [
        {
            "endpoint": "127.0.0.1:13376",
            "last_seen_time": "2020-02-05T12:03:15",
            "last_connection_disposition": "last_connection_succeeded",
            "last_connection_attempt_time": "2020-02-05T12:03:15",
            "number_of_successful_connection_attempts": 1,
            "number_of_failed_connection_attempts": 0
        },
        {
            "endpoint": "127.0.0.1:13377",
            "last_seen_time": "2020-02-05T12:03:15",
            "last_connection_disposition": "last_connection_handshaking_failed",
            "last_connection_attempt_time": "2020-02-05T12:03:15",
            "number_of_successful_connection_attempts": 1,
            "number_of_failed_connection_attempts": 0
        },
        {
            "endpoint": "127.0.0.1:13378",
            "last_seen_time": "2020-02-05T12:03:15",
            "last_connection_disposition": "last_connection_succeeded",
            "last_connection_attempt_time": "2020-02-05T12:03:15",
            "number_of_successful_connection_attempts": 1,
            "number_of_failed_connection_attempts": 0
        },
        {
            "endpoint": "127.0.0.1:13379",
            "last_seen_time": "2020-02-05T12:03:15",
            "last_connection_disposition": "last_connection_succeeded",
            "last_connection_attempt_time": "2020-02-05T12:03:15",
            "number_of_successful_connection_attempts": 1,
            "number_of_failed_connection_attempts": 0
        }
    ]
}
```

## get\_advanced\_node\_parameters

Get advanced node parameters, such as desired and max number of connections.

### Example

```json
{
    "id": 1,
    "method": "call",
    "params": [
        NETWORK_NODE_API_ID,
        "get_advanced_node_parameters",
            [
            ]
    ]
}
```

### Returns

```json
{
    "id": 4,
    "result": {
        "peer_connection_retry_timeout": 30,
        "desired_number_of_connections": 20,
        "maximum_number_of_connections": 200,
        "maximum_number_of_blocks_to_handle_at_one_time": 200,
        "maximum_number_of_sync_blocks_to_prefetch": 2000,
        "maximum_blocks_per_peer_during_syncing": 200
    }
}
```

## set\_advanced\_node\_parameters(params)

Set advanced node parameters, such as desired and max number of connections.

### Parameters

| Option | Description |
| :--- | :--- |
| `variant_object params` | a JSON object containing the name/value pairs for the parameters to set |

### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        NETWORK_NODE_API_ID,
        "set_advanced_node_parameters",
        [
            {
                "maximum_number_of_connections": 50
            }
        ]
    ]
}
```

### Returns

```json
{
    "id": 4,
    "result": null
}
```