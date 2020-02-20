# Echorand API

## set\_echorand\_message\_callback(cb)

Set callback, that sends echorand notifications.

### Parameters

| Option | Description |
| :--- | :--- |
| `function<void(const variant&)> cb` | ID of the callback that the notification refers to when echorand receives a new notification |

### Example

```json
{
    "id": 4,
    "method": "call",
    "params": [
        ECHORAND_API_ID,
        "set_echorand_message_callback",
        [
            CALLBACK_ID
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