# How to use Ethereum stake sidechain

If you want to use stake feature with Ethereum tokens, you need to stake some ETH on Echo network contract.

At `global_property_object` -> `chain_parameters` -> `stake_sidechain_config` you can find `contract_address` wich contains address of eth contract (or at some other places, e.g. standart genesis). If you want to use stake sidechain you need to call this contract.

{% hint style="info" %}

If you stake some funds from different Ethereum accounts to one Echo account, you can only withdraw the amount that each account sent, and only to the corresponding account.

Example:

- eth_account1 stake 10 ETH for echo_account;
- eth_account2 stake 5 ETH for echo_account;

So echo_account will have 15 `SBTC`, but if you want to withdraw:

- eth_account1 can withdraw up to 10 ETH;
- eth_account2 can withdraw up to 5 ETH;

{% endhint %}

Step-by-step:
1. Get contract address(and other information) from any resource.
2. Call `stake` method of contract.
3. Wait for committie approvals on Echo network.
4. Enjoy!

If you want to withdraw:
1. Call `unstake` method of contract.
2. Wait about 8 days for unstaking.
3. Call `withdraw` method of contract.
4. Use your funds!

{% hint style="info" %}
Note: there is **no** fee on such transactions! (except Ethereum fee)
{% endhint %}

## Staking guide.

### 1. Get contract address and ABI.

First of all you need to get smart contract address and it's ABI from our resources.

All you need to know about contract code now is:

```solidity
contract Staking {
    uint256 constant public SECONDS_PER_BLOCK = 15;
    uint256 constant public UNSTAKING_BLOCKS_COUNT = 8 days / SECONDS_PER_BLOCK;

    function stake(uint256 echoAccountId) payable external onlyPositiveAmount(msg.value) returns (bool success) {
        return true;
    }
    
    function unstake(uint256 echoAccountId, uint256 amount) external onlyPositiveAmount(amount) returns (bool success) {
        return true;
    }
    
    function withdraw() external returns (bool success) {
        return true;
    }
    
    modifier onlyPositiveAmount(uint256 amount) {
        require(amount > 0, "Amount should be positive");
        _;
    }
}
```

{% hint style="info" %}
Note: in contract above `UNSTAKING_BLOCKS_COUNT` is count of Echo blocks to wait for unfreezing you founds after calling `unstake` method.
{% endhint %}


You can use [Remix IDE](https://remix.ethereum.org) for compilation and getting ABI(or methods signatures).

Methods signatures:

```json
{
	"a694fc3a": "stake(uint256)",
	"9e2c8a5b": "unstake(uint256,uint256)",
	"3ccfd60b": "withdraw()"
}
```

### 2. Call the `stake` method of contract.

You can use different tools to interact with smart contract. For this example we will use `truffle console`.

> Installation and more detailed usage of `truffle` are described in their [documentation](https://www.trufflesuite.com/docs/truffle/getting-started/installation).

#### Step 2.1 Let's setup `truffle-config.js`.

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

> In this config you can set ip and port of your Ethereum node.

#### Step 2.2 Launching a console.

```bash
truffle console --network development
```

#### Step 2.3 Call contract

Method `stake` have signature:

```json
"a694fc3a": "stake(uint256)"
```

So you need just to send transaction to contract address with signature of method and id of Echo account.

> ID of Echo account is instance ID in triplet, e.g. 1.2.26 account have ID=26.

We will use 1.2.26 Echo account for this example.

So as argument for `stake` we have 26. And methods gets `uint256`, so we take hex number `1A` (that 26 in hex), and paste some 0 to get 32 bytes number:

    000000000000000000000000000000000000000000000000000000000000001A

After that we create call data in such way:

    `<method signature> + <argument data>`

As output we have `0xa694fc3a000000000000000000000000000000000000000000000000000000000000001A`.

Now finally call contract:

```js
truffle(development)> web3.eth.sendTransaction({to:"0x3D0a386Dd3B9Bb99A7190f92c80F473C1d2749A5", from:"0x727935C5cd6C94b569AF373554E21c8a508b8471", data:"0xa694fc3a000000000000000000000000000000000000000000000000000000000000001A", value:1000000, nonce: 45})
```

Explanation:
- `to:"0x3D0a386Dd3B9Bb99A7190f92c80F473C1d2749A5"` - address of contract
- `from:"0x727935C5cd6C94b569AF373554E21c8a508b8471"` - your ETH account address
- `data:"0xa694fc3a000000000000000000000000000000000000000000000000000000000000001A"` - call data 
- `value:1000000` - value to stake (at the example it equals to 0.000000000001 Ether)
- `nonce: 45` - number of transaction sent by your Ethereum account

### Wait for Echo committie members approve and enjoy Echo network!

Please wait for a short while...

> 20 blocks on Ethereum network
> after that about 2 blocks on Ethereum network to wait Echo committie members approves.

> In sum 22 blocks on Ethereum network.

## Unstaking guide.

First look to staking guide, here is example how to call smart contract methods.

### 1. Call the `unstake` method of contract.

Method `unstake` have signature:

```json
"9e2c8a5b": "unstake(uint256,uint256)"
```

First argument is account ID and second is amount to unstake.

Calling data for this transaction:
```js
var signature = "0x9e2c8a5b";
var accountID = "000000000000000000000000000000000000000000000000000000000000001A";
var amount = "00000000000000000000000000000000000000000000000000000000000F4240";
var calldata = signature + accountID + amount;
```

Now send transaction:

```js
truffle(development)> web3.eth.sendTransaction({to:"0x3D0a386Dd3B9Bb99A7190f92c80F473C1d2749A5", from:"0x727935C5cd6C94b569AF373554E21c8a508b8471", data:"0x9e2c8a5b000000000000000000000000000000000000000000000000000000000000001A00000000000000000000000000000000000000000000000000000000000F4240", nonce: 46})
```

> Explanation you can find at staking guide.

### 2. Wait about 8 days for unstaking.

Wait until system preparing you funds...

> Explanation you can find at staking guide.

### 3. Call the `withdraw` method of contract.

Method `withdraw` have signature:

```json
"3ccfd60b": "withdraw()"
```

Send transaction

```js
truffle(development)> web3.eth.sendTransaction({to:"0x3D0a386Dd3B9Bb99A7190f92c80F473C1d2749A5", from:"0x727935C5cd6C94b569AF373554E21c8a508b8471", data:"0x3ccfd60b", nonce: 48})
```

### 4. Use your funds!

Thank you for using Echo sidechain!
