# RPC Calls

## Call format

In Echo, RPC calls are state-less and accessible via regular JSON formated RPC-HTTP-calls. The correct structure of the JSON call is

```json
{
 "jsonrpc": "2.0",
 "id": 1,
 "method": "get_accounts",
 "params": [["1.2.0", "1.2.1"]],
}
```

The get_accounts call is available in the Full Node’s database API and takes only one argument which is an array of account ids (here: ["1.2.0", "1.2.1"]).

#### Example Call with curl
Such as call can be submitted via curl:

```bash
curl --data '{"jsonrpc": "2.0", "method": "get_accounts", "params": [["1.2.0", "1.2.1"]], "id": 1}' https://echo-dev.io/rpc
```

#### Successful Calls
The API will return a properly JSON formated response carrying the same id as the request to distinguish subsequent calls.

```json
{
 "id":1,
 "result":  ..data..
}
```

#### Errors
In case of an error, the resulting answer will carry an error attribute and a detailed description:

```json
{
  "id": 0,
  "error": {
    "data": {
      "code": error-code,
      "name": " .. name of exception ..",
      "message": " .. message of exception ..",
      "stack": [ .. stack trace .. ],
    },
    "code": 1,
  },
}
```