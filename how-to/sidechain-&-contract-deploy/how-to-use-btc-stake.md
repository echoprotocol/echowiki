# How to use Bitcoin stake sidechain

If you want to use stake feature with Bitcoin tokens, you need to stake some BTC on Echo network address.

Step-by-step:
1. Generate stake address.
2. Transfer BTC to given address.
3. Wait for approvals.
4. Enjoy!

{% hint style="info" %}
Note: there is **no** fee on such transactions! (except Bitcoin miner fee)
{% endhint %}

You can withdraw founds at any time.
There is no timestamp or else blocking with this type of script.
For more info look into section above.

{% hint style="info" %}
Note: only you can unlock such transaction(you can use script below for that reason).
{% endhint %}

## Generate stake address

For this you cat use Wallet API method [create_btc_stake_address](/api-reference/echo-wallet-api/README.md#create_btc_stake_address-account-user_pubkey-broadcast).

```
create_btc_stake_address nathan 03cce12c983779287b097cdba8699929f616f0fe6622b1f018e6ada1125549518b true
```

## Get stake address

For this you cat use Wallet API method [get_btc_stake_address](/api-reference/echo-wallet-api/README.md#get_btc_stake_address-account).

```
>>> get_btc_stake_address nathan
{
  "id": "1.26.0",
  "account": "1.2.26",
  "stake_script": "76a9146334edf1175678f7905763e6b24361ab998aa23288ac52755675",
  "p2sh_address": "2N92ShU1GRnkMwMtqN86WVUEw5NwjXrJYHC",
  "extensions": []
}
```

`stake_script` is modified P2PKH script:

- scriptPubKey: `OP_DUP OP_HASH160 <pubkey hash> OP_EQUALVERIFY OP_CHECKSIG <digit from the instance> OP_DROP ... <digit from the instance> OP_DROP`
- scriptSig: `<sig> <pubkey> <stake_script>`

> `<digit from the instance>` - is digit from instance id of account (for 1.2.16 it will be 1 and 6)

Example:
- nathan have 1.2.26 ID
- nathan used public key `03cce12c983779287b097cdba8699929f616f0fe6622b1f018e6ada1125549518b` (`hash160(pubkey) = 6334edf1175678f7905763e6b24361ab998aa232`)

So he got `stake_script` = `OP_DUP OP_HASH160 6334edf1175678f7905763e6b24361ab998aa232 OP_EQUALVERIFY OP_CHECKSIG OP_2 OP_DROP OP_6 OP_DROP`

## Unlock such script after sending funds

For this you can use [bitcoin-utils](https://pypi.org/project/bitcoin-utils/) Python library.

Example of script, that generates spent transaction.

Preconditions:
- nathan have 1.2.26 ID
- nathan used private key `cRissuViCFcDHkqsDZ8LekVPNpJS8WajToQVF6wsfEV1eRojak8g`
- nathan used public key `03cce12c983779287b097cdba8699929f616f0fe6622b1f018e6ada1125549518b`
- nathan sent 25 BTC to `2N92ShU1GRnkMwMtqN86WVUEw5NwjXrJYHC`

```python
from bitcoinutils.setup import setup
from bitcoinutils.utils import to_satoshis
from bitcoinutils.transactions import Transaction, TxInput, TxOutput
from bitcoinutils.keys import P2pkhAddress, P2shAddress, PrivateKey
from bitcoinutils.script import Script

def main():
    # always remember to setup the network
    setup('testnet')

    # create transaction input from tx id of UTXO (contained 0.1 tBTC)
    txin = TxInput('28cfd7b592e6d3cc87e28071c3a0b134e0a5f8243ca7e438e1051c618c11129d', 0)

    # secret key needed to spend P2PK that is wrapped by P2SH
    p2pk_sk = PrivateKey('cRissuViCFcDHkqsDZ8LekVPNpJS8WajToQVF6wsfEV1eRojak8g')
    p2pk_pk = p2pk_sk.get_public_key().to_hex()
    
    # create the redeem script - needed to sign the transaction
    redeem_script = Script(['OP_DUP', 'OP_HASH160', '6334edf1175678f7905763e6b24361ab998aa232', 'OP_EQUALVERIFY', 'OP_CHECKSIG', 'OP_2', 'OP_DROP', 'OP_6', 'OP_DROP'])

    to_addr = P2pkhAddress('n4bkvTyU1dVdzsrhWBqBw8fEMbHjJvtmJR')
    txout = TxOutput(to_satoshis(24.99), to_addr.to_script_pub_key() )

    # create transaction from inputs/outputs -- default locktime is used
    tx = Transaction([txin], [txout])

    # print raw transaction
    print("\nRaw unsigned transaction:\n" + tx.serialize())

    # use the private key corresponding to the address that contains the
    # UTXO we are trying to spend to create the signature for the txin -
    # note that the redeem script is passed to replace the scriptSig
    sig = p2pk_sk.sign_input(tx, 0, redeem_script )

    # set the scriptSig (unlocking script)
    txin.script_sig = Script([sig, p2pk_pk, redeem_script.to_hex()])
    signed_tx = tx.serialize()

    # print raw signed transaction ready to be broadcasted
    print("\nRaw signed transaction:\n" + signed_tx)
    print("\nTxId:", tx.get_txid()) 

if __name__ == "__main__":
    main()
```
