# DID API

## Decentralized Identifiers

DID - is a new type that enables decentralized identification.

Conventional identity management systems are based on centralized authorities such as corporate directory services, certificate authorities, or domain name registries. From the standpoint of cryptographic trust verification, each of these centralized authorities serves as its own root of trust. To make identity management work across these systems requires implementing federated identity management.

The emergence of distributed ledger technology (DLT) and blockchain technology provides the opportunity for fully decentralized identity management. In a decentralized identity system, entities (that is, discrete identifiable units such as, but not limited to, people, organizations, and things) are free to use any shared root of trust. Globally distributed ledgers, decentralized P2P networks, or other systems with similar capabilities, provide the means for managing a root of trust without introducing a centralized authority or a single point of failure. In combination, DLTs and decentralized identity management systems enable any entity to create and manage their own identifiers on any number of distributed, independent roots of trust.

See the full details on DID in the [official documentation](https://www.w3.org/TR/did-core/).

## DID in ECHO network

DID Document is created from ECHO protocol object.
We have added 3 types of operations for DID Document: create, update, delete.

Currently, ECHO DID supports 3 types:

1. Account DID.
2. Asset DID.
3. Contract DID.

All created keys will be verified for compliance with `Base58` encoding and must be derived from `Ed25519` algorithm.

## Method Specific Identifier

The method specific identifier is composed of network type and id of object at ECHO network.

Network type can be '0' for mainnet, '1' for testnet and '2' for devnet. Next goes triplet of numbers devided by points: id of object at ECHO network.

> Note: if it's not one of this networks, value will be '255'.

```
echo-did = "did:echo:" echo-specific-idstring
echo-specific-idstring = [ echo-network  ":" ] echo-object-id
echo-network  = "0" / "1" / "2" / "255"
echo-object-id  = 1*DIGIT "." 1*DIGIT "." 1*DIGIT
```

### Example

Example `echo` DIDs:

 * `did:echo:0.1.25.2`
 * `did:echo:1.1.25.1`
 * `did:echo:2.1.25.0`

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
