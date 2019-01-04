Block API
=========

## get_blocks(int block_num_from, int block_num_to)

Get the information about the signed blocks on the chain.

### Parameters
- *block_num_from* A block to start from
- *block_num_to* A block to end at

### Returns
A set of blocks that has the following structure:
```
[{
        transactions: [

        ]
}, ...]
```
