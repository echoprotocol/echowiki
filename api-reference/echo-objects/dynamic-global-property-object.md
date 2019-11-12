# Dynamic global property object

Maintains global state information (committee_member list, current fees)

This is an implementation detail. The values here are calculated during normal chain operations and reflect the current values of global blockchain properties.

```cpp
class dynamic_global_property_object
{
    uint32_t       head_block_number = 0;
    block_id_type  head_block_id;
    time_point_sec time;
    time_point_sec next_maintenance_time;
    time_point_sec last_budget_time;
    share_type     committee_budget;

    /**
    * dynamic_flags specifies chain state properties that can be
    * expressed in one bit.
    */
    uint32_t dynamic_flags = 0;

    uint32_t last_irreversible_block_num = 0;

    extensions_type extensions;
};
```

## Types

**block_id_type** is a 160-bit cryptographic hash function

**share_type** it's just a number with automatic checks for integer overflow and default initialization