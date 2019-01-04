# Network Node API

### OBTAIN NETWORK INFORMATION

`fc::variant_object graphene::app::network_node_api::get_info() const`

Returns general network information, such as p2p port.

`std::vector<net::peer_status> graphene::app::network_node_api::get_connected_peers() const`

Get status of all current connections to peers.

`std::vector<net::potential_peer_record> graphene::app::network_node_api::get_potential_peers() const`

Return list of potential peers.

`fc::variant_object graphene::app::network_node_api::get_advanced_node_parameters() const`

Get advanced node parameters, such as desired and max number of connections.

### CHANGE NETWORK SETTINGS

`void graphene::app::network_node_api::add_node(const fc::ip::endpoint &ep)`

Connect to a new peer

Parameters:

    ep: The IP/Port of the peer to connect to

`void graphene::app::network_node_api::set_advanced_node_parameters(const fc::variant_object &params)`

Set advanced node parameters, such as desired and max number of connections.

Parameters:

    params: a JSON object containing the name/value pairs for the parameters to set

`void set_consensus_message_callback( std::function<void(const variant&)> );`

Set callback, that sends echorand notifications.
