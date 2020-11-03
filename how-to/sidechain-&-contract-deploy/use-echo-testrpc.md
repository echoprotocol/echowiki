# How to: Use Echo testrpc

Echo TestRPC is similar to Ethereum TestRPC and implements its API.  
Echo TestRPC is a fast and customizable blockchain emulator. It allows making calls to the blockchain without the overheads of running an actual Echo node.

* Accounts have a starting balance and are not needed in faucet or mining
* Allows to use API testRPC through web3

> Unlike the Echo node, Echo testRPC is used for testing purposes only, for example, to deploy and invoke a contract.

The list of supported methods can be found [here](../../api-reference/testrpc/README.md).

## How to launch

```
./echo_testrpc
```

This command is enough to start the emulator with 10 start accounts.
Several additional options can be specified(you can check everything through `-h`), for example:

- `--init-balances arg` - Initial balances list. Account would be created for every specified balance.
- `--accounts` - Count of initial accounts to create.

## An example of working with Echo testRPC

As an example, we will deploy and call a simple contract.

```solidity
contract greeter {
    function greet() constant returns (string) {
        return "Hello";
    }
}
```


### Step 1. Compilation

In this case, any convenient option can be used, for example, [Remix IDE](https://remix.ethereum.org/). More details can be found [here](deploy-a-solidity-contract.md).

We will get the bytecode:

```
608060405234801561001057600080fd5b5061013f806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063cfae321714610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600581526020017f48656c6c6f0000000000000000000000000000000000000000000000000000008152509050905600a165627a7a7230582077d0aade2769e29d91f721c553baa00c3cf8763e9ce6febf076339b8e072064b0029
```

### Step 2. Connect to testRPC.

There are different options for connecting to testPRC, such as `wscat` or `truffle console`. Let's consider the last one.

> Installation and more detailed usage of `truffle` are described in their [documentation](https://www.trufflesuite.com/docs/truffle/getting-started/installation).

> `truffle console` also allows to compile contracts through the command `compile`.

#### Step 2.1 Let's fix `truffle-config.js`.

In the directory from which we will run `truffle console` save the file `truffle-config.js`:
```js
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gasPrice: 20000000000,
      gas: 8500000000
    }
  },
};
```

#### Step 2.2 Launching a console.

```bash
truffle console --network development
```

### Step 3. Contract deployment.

In `truffle console`, we do as follows:

```js
truffle(development)> web3.eth.sendTransaction({from:"0x000000000000000000000000000000000000000b", data:"608060405234801561001057600080fd5b5061013f806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063cfae321714610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600581526020017f48656c6c6f0000000000000000000000000000000000000000000000000000008152509050905600a165627a7a7230582077d0aade2769e29d91f721c553baa00c3cf8763e9ce6febf076339b8e072064b0029"})
```

In fact, this is sending an ordinary transaction, but since there is the code indicated in `data`, the deployment of the contract will occur.
The result of the transaction will be displayed, in which the `contractAddress` field is present - this is the address of the contract.

```js
{
  transactionHash: '0x000000000000001300000000f3caacfafb9d431d72ce734c9ee51519986bc3ab',
  transactionIndex: 0,
  blockHash: '0x00000000000000000000000000000013dea48f37e802769b4462d7fd361dd685',
  blockNumber: 19,
  from: '0x000000000000000000000000000000000000000b',
  to: null,
  cumulativeGasUsed: 280,
  gasUsed: 280,
  contractAddress: '0x0100000000000000000000000000000000000000',
  logs: [],
  logsBloom: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true
}
```

> You can also make sure that the contract is deployed using `web3.eth.getCode("0x0100000000000000000000000000000000000000")`, the contract code should be back.

### Step 4. Contract call

To call the contract, you must send a transaction with the method signature in the `data` field. In our case, the function `greet()` has the signature `0xcfae3217`.

> On the Internet, you can find many articles that describe how to call Ethereum contracts through method signatures and transactions.

In `truffle console` we do as follows:

```js
truffle(development)> web3.eth.sendTransaction({to:"0x0100000000000000000000000000000000000000", from:"0x000000000000000000000000000000000000000b", data:"0xcfae3217"})
```
