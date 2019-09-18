# Interact with a Smart Contract

After deploying the PiggyBank contract, we can interact with it and send it some ECHOs. If you haven't deployed the contract already, follow the first tutorial.

{% page-ref page="deploy-a-solidity-contract.md" %}

![](../.gitbook/assets/screen-shot-2019-09-09-at-4.01.13-pm.png)

First, click on the name of the contract you want to interact with from your watch list - `Hello` in this case.

![](../.gitbook/assets/screen-shot-2019-09-09-at-4.06.35-pm.png)

After navigating to the contract,  you have two options for interacting with the contract:

* View Properties: Read from the contract without changing data
* Call Contracts: Send an Echo transaction to invoke a contract function

In this case, we can read the output of the `getMessage()` function, which returns the string `Hello World` \(also represented by the hex `0x48656c6c6f20576f726c64000000000000000000000000000000000000000000`\). 

To change the message, switch to the `Call Contracts` tab and enter the new message in form, with the `set message` method selected. The transaction fee for this contract call \(denominated in ECHO\) will automatically populate.

![](../.gitbook/assets/screen-shot-2019-09-09-at-4.08.08-pm.png)

Send this transaction by entering your password again and confirming the transaction details.

![](../.gitbook/assets/screen-shot-2019-09-09-at-4.10.32-pm.png)

After the transaction is broadcast to the network and included in a block \(approximately 10-30 seconds\), you can return to the `Smart Contracts` tab and view the properties of the `Hello` contract again. This time, you should see your new message!

![](../.gitbook/assets/screen-shot-2019-09-09-at-4.11.14-pm.png)



