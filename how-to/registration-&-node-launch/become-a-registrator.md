# How to become a registrar and start earn money with Echo

Every network participant who has launched their own node can participate in the consensus by providing an API for the registration of new accounts on the network.

## Step 1. Restrict API

You can restrict API's to particular users by specifying an `api-access` file in `config.ini` or by using the `--api-access /full/path/to/api-access.json` startup node command.
Here's example which allows only `registration_api` for all without any password:

```json
{
   "permission_map" :
   [
      [
         "*",
         {
            "password_hash_b64" : "*",
            "password_salt_b64" : "*",
            "allowed_apis" : ["registration_api"]
         }
      ]
   ]
}
```
> Note: you can allow other API to be used by indicating a password to filter access. You can read more about this in the README.md of the project.

## Step 2. Node launching

Launching a node is described in [this article](run_node_and_start_staking.md).

It is necessary to specify the configuration for `registration plugin`, therefore, the node launch command itself will change slightly (the rest will remain as in the article above):

- `--plugins="registration"` - enable registration plugin
- `--registrar-account "1.2.26"` - ID of registrar account on this node (should be imported as account-info)
- `--registration-difficulty 20` - complexity of POW task to register account. Default is 20

```bash
./echo_node --rpc-endpoint="0.0.0.0:8090" --account-info="[\"1.2.514\", \"5KcP5uiAByA14Koo8o9eYgoPEyB6A53n57MmGMsKaMqi7wKQYiA\"]" --plugins="registration" --registrar-account=\"1.2.514\" --registration-difficulty=20 --api-access "api-access.json"
```

## Step 3. Calling API

Now it is possible to distribute the API link:

```
http://52.59.220.213:8090/rpc

52.59.220.213 - public ip of your node
8090 - rpc port of your node
```

Example of `request_registration_task` call:

```json
{"jsonrpc": "2.0", "params": ["registration", "request_registration_task", []], "method": "call", "id": 1}
```

Using curl:

```bash
curl --data '{"jsonrpc": "2.0", "params": ["registration", "request_registration_task", []], "method": "call", "id": 1}' http://localhost:8090/rpc
```

In [this file](../../api-reference/echo-node-api/registration-api.md) described all Registration API methods. 
