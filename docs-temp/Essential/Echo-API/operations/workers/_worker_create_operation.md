# worker_create_operation

Create a new worker object.

- `initializer` This should be set to the initializer appropriate for the type of worker to be created.

### JSON Example

```json
[
  34,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "owner": "1.2.0",
    "work_begin_date": "1970-01-01T00:00:00",
    "work_end_date": "1970-01-01T00:00:00",
    "daily_pay": 0,
    "name": "",
    "url": "",
    "initializer": [
      0,{}
    ]
  }
]
```