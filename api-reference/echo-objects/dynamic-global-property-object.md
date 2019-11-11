# Dynamic global property object

Maintains global state information (committee_member list, current fees)

This is an implementation detail. The values here are calculated during normal chain operations and reflect the current values of global blockchain properties.

```cpp
class dynamic_global_property_object : public abstract_object<dynamic_global_property_object>
{
    public:
        static const uint8_t space_id = implementation_ids;
        static const uint8_t type_id  = impl_dynamic_global_property_object_type;

        uint32_t          head_block_number = 0;
        block_id_type     head_block_id;
        time_point_sec    time;
        time_point_sec    next_maintenance_time;
        time_point_sec    last_budget_time;
        share_type        committee_budget;

        /**
        * dynamic_flags specifies chain state properties that can be
        * expressed in one bit.
        */
        uint32_t dynamic_flags = 0;

        uint32_t last_irreversible_block_num = 0;

        extensions_type extensions;

        enum dynamic_flag_bits
        {
        /**
            * If maintenance_flag is set, then the head block is a
            * maintenance block.  This means
            * get_time_slot(1) - head_block_time() will have a gap
            * due to maintenance duration.
            *
            * This flag answers the question, "Was maintenance
            * performed in the last call to apply_block()?"
            */
        maintenance_flag = 0x01
        };
};
```