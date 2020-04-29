# DID Management

## did\_create\_operation

This struct represents the operation to create decentralized identifier (DID).
Only the account/asset/contract owner will be able to create DIDs for these objects.

```cpp
struct did_create_operation : public base_operation
{
    struct fee_parameters_type {
        uint64_t fee = 0;
    };

    asset fee;
    account_id_type registrar;

    /// The entity to which DID will be attached
    object_id_type essence;

    /// Public keys that will be added to the DID object
    std::set<std::string> public_keys;

    void validate() const;
    account_id_type fee_payer() const { return registrar; }
};
```

### JSON Example

```json
[
  66,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "registrar": "1.2.0",
    "essence": "0.0.0",
    "public_keys": []
  }
]
```

## did\_update\_operation

This struct represents the operation to update decentralized identifier (DID).
Only the account/asset/contract owner will be able to update DIDs for these objects.

```cpp
struct did_update_operation : public base_operation
{
    struct fee_parameters_type {
        uint64_t fee = 0;
    };

    asset fee;
    account_id_type registrar;

    /// ID of the object ID to update
    std::string did_identifier;

    /// Public keys to be deleted from the DID object
    std::set<std::string> pub_keys_to_delete;

    /// Public keys to add to the DID object
    std::set<std::string> pub_keys_to_add;

    void validate() const;
    account_id_type fee_payer() const { return registrar; }
};
```

### JSON Example

```json
[
  67,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "registrar": "1.2.0",
    "did_identifier": "1.25.0",
    "pub_keys_to_delete": [],
    "pub_keys_to_add": []
  }
]
```

## did\_delete\_operation

This struct represents the operation to remove decentralized identifier (DID).
Only the account/asset/contract owner will be able to delete DIDs for these objects.

```cpp
struct did_delete_operation : public base_operation
{
    struct fee_parameters_type {
        uint64_t fee = 0;
    };

    asset fee;
    account_id_type registrar;

    /// ID of the object ID to remove
    std::string did_identifier;

    void validate() const;
    account_id_type fee_payer() const { return registrar; }
};
```

### JSON Example

```json
[
  68,{
    "fee": {
      "amount": 0,
      "asset_id": "1.3.0"
    },
    "registrar": "1.2.0",
    "did_identifier": "1.25.0"
  }
]
```
