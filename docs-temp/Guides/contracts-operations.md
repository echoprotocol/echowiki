## Create contract
Create and deploy in chain the new contract

`create_contract` arguments:
- Owner account name.
- Asset type.
- Contract code.
- Value which we transfer to the contract.
- Gas price.
- Gas which we transfer to the contract.
- Should broadcast creation transaction. Default `false`.
- Should save in wallet creation transaction. Default `true`.

Example:
```bash
create_contract nathan ECHO "608060405234801561001057600080fd5b506101a2806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630775107014610046575b600080fd5b34801561005257600080fd5b5061005b61005d565b005b60405180807f312e322e35206c69666574696d655f72656665727265725f6665655f7065726381526020017f656e746167650000000000000000000000000000000000000000000000000000815250602601905060405180910390bb600090805190602001906100ce9291906100d1565b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061011257805160ff1916838001178555610140565b82800160010185558215610140579182015b8281111561013f578251825591602001919060010190610124565b5b50905061014d9190610151565b5090565b61017391905b8082111561016f576000816000905550600101610157565b5090565b905600a165627a7a72305820f15a07ca60484fc3690bf46c388f8330643974e18925d812c5a73ba93e5c9e400029" 0 1 2000000 true true
```


## Call function of contract
Call function of contract

`call_contract` arguments:
- Owner account name.
- Contract id.
- The code of function(hex).
- Value which we transfer to the contract.
- Gas price.
- Gas which we transfer to the contract.
- Should broadcast creation transaction. Default `false`.
- Should save in wallet creation transaction. Default `true`.

Example:
```bash
call_contract nathan 1.16.4 "07751070" 0 1 2000000 true true
```


## Get contract field
Returns information about the given field

`call_contract_no_changing_state` arguments:
- Contract id.
- Owner account name.
- Asset type.
- The code of field(hex).

Example:
```bash
call_contract_no_changing_state 1.16.4 nathan ECHO "73d4a13a"
```