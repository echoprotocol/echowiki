Login API
=========

The functions here should be called as follows:

```
{"id": your-id, "method":"call", "params":[1,"function-name",[params...]]}
```

for example:
```
{"id": 1, "method":"call", "params":[1,"login",["", ""]]}
```


## login(string user, string password)

This must be called prior to requesting other APIs.
Other APIs may not be accessible until the client has sucessfully authenticated.

### Parameters
- *user* Username to login with
- *password* Password to login with

### Returns

True if logged in successfully, false otherwise

<!--
### block()

Retrieve the network block API indentifier.
-->

### network_broadcast()

Retrieve the network broadcast API identifier.

### database()

Retrieve the database API identifier.

### history()

Retrieve the history API identifier.

<!--
### network_node()

Retrieve the network node API identifier.
-->

### crypto()

Retrieve the cryptography API identifier.

<!--
### asset()

Retrieve the asset API identifier.
-->
