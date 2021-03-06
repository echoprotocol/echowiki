{% hint style="warning" %}
Is now in the development stage.
{% endhint %}

# Using echo chain interface

There is a set of classes and functions in `chain.hpp` and `contract_base.hpp` for the interaction with the Echo chain.

### `chain interface` includes:


##### Get balance

Member of class `account`.

You can get balance of account or contract in needed assets.

###### Parameters

| Option | Description | Example |
| :--- | :--- | :--- |
| `string id` | triplet id of account or contract | 1.2.5646 or 1.11.165 |
| `string asset_id` | triplet asset id | 1.3.0 |

###### Return

`int64_t` - requested balance.

###### Example

```c++
int64_t my_get_balance(string id, string asset_id)
{
    account other(id);
    return other.get_balance(asset_id);
}
```


##### Transfer

Member of class `contract_base`.

You can transfer assets from contract to the recipient.

###### Parameters

| Option | Description | Example |
| :--- | :--- | :--- |
| `string to` | triplet id of account | 1.2.5646 |
| `string asset_id` | triplet asset id | 1.3.0 |
| `int64_t amount` | transferred amount | 100 |

###### Return

`void`

###### Example

```c++
void my_transfer(string to, string asset_id, int64_t amount)
{
    transfer(to, asset_id, amount);
}
```


##### Get property of objects from echo chain

Member of class `object`.

You can get property of object from echo chain.

###### Parameters

| Option | Description | Example |
| :--- | :--- | :--- |
| `string id` | triplet id of object | 1.2.15 |
| `string request` | name of property | echorand_key |

###### Return

`string` - value of requested property.

###### Example

```c++
string my_get_property(string id, string request)
{
    object other(id);
    return other.get_property(request);
}
```


##### Get asset id for current contract call

Member of class `contract_base`.

You can get asset id with which the contract was called.

###### Return

`uint64_t` - asset id with which the contract was called.

###### Example

```c++
uint64_t my_get_call_asset_id()
{
    return get_call_asset_id();
}
```


##### Get block hash by number

Static member of class `chain`, in the namespace `x86_64_contract`.

You can get block hash by number.

###### Parameters

| Option | Description | Example |
| :--- | :--- | :--- |
| `uint32_t number` | number of block | 15445 |

###### Return

`string` - block hash.

###### Example

```c++
string my_get_block_hash(uint32_t number)
{
    return chain::get_block_hash(number);
}
```


##### Get current head block author

Member of class `contract_base`.

You can get the author of current block.

###### Return

`string` - block author id.

###### Example

```c++
string my_get_block_author()
{
    return get_block_author();
}
```


##### Get current gas limit

Member of class `contract_base`.

You can get current gas limit.

###### Return

`uint64_t int` - current gas limit in 10^-8^ ECHO.

###### Example

```c++
uint64_t int my_get_gas_limit()
{
    return get_gas_limit();
}
```


##### Get current head block number

Member of class `contract_base`.

You can get current head block number.

###### Return

`uint32_t` - block number.

###### Example

```c++
uint32_t my_get_block_number()
{
    return get_block_number();
}
```


##### Get current head block timestamp

Member of class `contract_base`.

You can get current head block timestamp.

###### Return

`uint32_t` - block timestamp in seconds.

###### Example

```c++
uint32_t my_get_block_timestamp()
{
    return get_block_timestamp();
}
```


##### Get send value for current contract call

Member of class `contract_base`.

You can get send value for current contract call.

###### Return

`int64_t` - amount of send.

###### Example

```c++
int64_t my_get_send_value()
{
    return get_send_value();
}
```


##### Get sender for current contract call

Member of class `contract_base`.

You can get sender for current contract call.

###### Return

`string` - triplet id of sender.

###### Example

```c++
string my_get_sender()
{
    return get_sender();
}
```


##### Get origin sender for current contract call

Member of class `contract_base`.

You can get origin sender for current contract call.

###### Return

`string` - triplet id of sender.

###### Example

```c++
string my_get_origin_sender()
{
    return get_origin_sender();
}
```


##### Get called contract id

Static member of class `chain`, in the namespace `x86_64_contract`.

You can get called contract id.

###### Return

`uint32_t` - id of contract.

###### Example

```c++
uint32_t my_get_contract_id()
{
    return chain::get_contract_id();
}
```


##### Get called full contract id

Member of class `contract_base`.

You can get full contract id.

###### Return

`string` - triplet id of contract.

###### Example

```c++
string my_get_full_contract_id()
{
    return get_full_contract_id();
}
```


##### Get contract variable from another x86-64 contract

Member of class `contract_object`.

You can call get storage variable from another x86-64 contract. For the get, you will need to pass the amount by 0, count of gas by 0 and the variable name.

###### Parameters

| Option | Description | Example |
| :--- | :--- | :--- |
| `string id` | triplet id of contract | 1.11.165 |
| `uint64_t amount` | amount, doesn't affect anything | 0 |
| `uint64_t gas` | gas, doesn't affect anything | 0 |
| `string var_name` | variable name | "var_name" |

###### Return

`string` - result of executing an internal contract call. First 4 bytes(8 characters) - size of output.

###### Example

```c++
void call_contract(string id, string var_name, uint64_t amount, uint64_t gas)
{
    contract_object c(id);
    string var_1 = c.call(amount, gas, var_name);
    string var_2 = c.call(amount, gas, string("var_name"));
}
```


##### Call x86-64 contract from another x86-64 contract with call line

Member of class `contract_object`.

You can call another x86-64 contract. For the call, you will need to pass the amount, count of gas to perform and the call line. If you do not want to limit the call to the gas, 0 is transmitted.

###### Parameters

| Option | Description | Example |
| :--- | :--- | :--- |
| `string id` | triplet id of contract | 1.11.165 |
| `uint64_t amount` | amount allocated to the contract, in the smallest units | 0 or 1000000 |
| `uint64_t gas` | gas restriction for internal call, if you set 0, then there will be no limit | 0  or 10000000 |
| `string call_line` | call line | greet() or get_balance(\"1.2.236\", \"1.3.0\") |

###### Return

`string` - result of executing an internal contract call. First 4 bytes(8 characters) - size of output.

###### Example

```c++
string call_contract(string id, string call_line, uint64_t amount, uint64_t gas)
{
    contract_object c(id);
    return c.call(amount, gas, call_line);
}
```


##### Call x86-64 contract from another x86-64 contract with parameters

Member of class `contract_object`.

You can call another x86-64 contract. For the call, you will need to pass the amount, count of gas to perform, callee function name and the call params. If you do not want to limit the call to the gas, 0 is transmitted.

###### Parameters

| Option | Description | Example |
| :--- | :--- | :--- |
| `string id` | triplet id of contract | 1.11.165 |
| `uint64_t amount` | amount allocated to the contract, in the smallest units | 0 or 1000000 |
| `uint64_t int gas` | gas restriction for internal call, if you set 0, then there will be no limit | 0  or 10000000 |
| `string function_name` | callee function name | get_balance |
| `args... params` | call params | a, true, 637, string("string_param") |

###### Return

`string` - result of executing an internal contract call. First 4 bytes(8 characters) - size of output.

###### Example

```c++
string call_contract(string id, string var_1, unsigned int var_2, uint64_t amount, uint64_t gas)
{
    int var_local = 544;
    bool var_bool = true;

    contract_object c(id);
    return c.call(amount, gas, string("my_function"), var_1, var_2, var_local, var_bool, -45);
}
```


### Echo interface contract example

```c++
#include "chain.hpp"
#include "contract_base.hpp"
#include "db_types.hpp"
#include "parameters.hpp"
#include "string.hpp"

namespace x86_64_contract {

class contract : public contract_base
{
public:
    void send_to_contract()
    {
        _value += get_send_value();
    }

    bool transfer(string to, string asset_id, uint64_t amount)
    {
        string sender = get_origin_sender();
        uint64_t send_with_call = get_send_value();

        object sender_obj(sender);
        string sender_name = sender_obj.get_property("name");

        if (sender != _owner && sender_name != "my_second_account")
        {
            if (send_with_call < amount)
                return false;
            else
            {
                transfer(to, asset_id, amount);
                _value += send_with_call - amount;
                return true;
            }
        }

        if (_value + send_with_call < amount)
            return false;

        transfer(to, asset_id, amount);
        _value += send_with_call - amount;        
        return true;
    }

    void constructor() override
    {
        _owner = get_origin_sender();
    }

private:
    string _name { "my_contract" };
    DB_STRING(_owner);
    DB_UINT64(_value);
};

MAIN(contract, FUNC(send_to_contract) FUNC(transfer))

}
```