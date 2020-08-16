{% hint style="warning" %}
Is now in the development stage.
{% endhint %}

# DID API

## get\_did\_object\(id\)

Getting did object.

### Parameters

| Option | Description |
| :--- | :--- |
| `const string& id` | Identifier for did object |

### Example

```javascript
{
  "jsonrpc": "2.0",
  "params": [
    "did",
    "get_did_object",
    [
      "255.1.25.0"
    ]
  ],
  "method": "call",
  "id": 1
}
```

### Returns

Did object in json view. If there is no object, an empty DID Document will be returned.

```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "{\"@context\":\"https://w3id.org/did/v1\",\"id\":\"did:echo:255.1.25.0\",\"publicKey\":[{\"id\":\"did:echo:255.1.25.0\",\"type\":\"Ed25519VerificationKey2018\",\"publicKeyBase58\":\"6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu#key-1\"}],\"authentication\":[{\"type\":\"Ed25519SignatureAuthentication2018\",\"publicKey\":\"did:echo:255.1.25.0#key-1\"}]}"
}
```

## get\_key(id\_string\)

Get the verification method and public key for a specific key identifier.

### Parameters

| Option | Description |
| :--- | :--- |
| `const string& id_string` | Key identifier |

### Example

```javascript
{
  "jsonrpc": "2.0",
  "params": [
    "did",
    "get_key",
    [
      "did:echo:255.1.25.0#key-1"
    ]
  ],
  "method": "call",
  "id": 1
}
```

### Returns

Verification method and public key. If there is no object, an empty "null" will be returned.

```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    "Ed25519VerificationKey2018",
    "6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu"
  ]
}
```

## get\_keys(id\_string\)

Get the list verification methods and public keys for a specific did identifier.

### Parameters

| Option | Description |
| :--- | :--- |
| `const string& id_string` | Did identifier |

### Example

```javascript
{
  "jsonrpc": "2.0",
  "params": [
    "did",
    "get_keys",
    [
      "did:echo:255.1.25.0"
    ]
  ],
  "method": "call",
  "id": 1
}
```

### Returns

List verification methods and public keys. If there is no object, an empty "null" will be returned.

```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    [
      "Ed25519VerificationKey2018",
      "6XS3BMVnEHAzo1PhHWt9vndrZn2P27tCbU9WdqCM8sJu"
    ]
  ]
}
```
