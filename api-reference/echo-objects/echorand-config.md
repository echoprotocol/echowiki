# Echorand config

## Configuration parameters for EchoRand algorithm implementation

```cpp
struct config
{
   unsigned _time_generate  = 0;    ///< timeout in mills to generate block on GC1
   unsigned _time_net_1mb   = 0;    ///< timeout in mills for 1Mb message spreads over the network
   unsigned _time_net_256b  = 0;    ///< timeout in mills for 256b message spreads over the network
   unsigned _creator_count  = 0;    ///< number of max block creators for this node
   unsigned _verifier_count = 0;    ///< number of max block verifiers for this node
   unsigned _ok_threshold   = 0;    ///< threshold to made ok decision, recommended eq. 0.69 * _creator_count
   unsigned _max_bba_steps  = 0;    ///< max number of BBA steps
   unsigned _gc1_delay      = 0;    ///< delay before sending GC1 messages in milliseconds
   unsigned _round_attempts = 0;    ///< number of max attempts to generate non-empty block on round before stop EchoRand
};
```