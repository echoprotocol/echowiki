## Create witness account
Prerequisites:
- Lifetime member account
- [Public EdDSA key](#generate-eddsa-keypair)

`create_witness` arguments:
- Owner account name.
- Optional reference URL. May be blank.
- EdDSA public key.
- Should broadcast creation transaction. Default `false`.

Example:
```bash
# Upgrade to lifetime member account
upgrade_account nathan true
create_witness nathan "http://example.com" DETBGA3mdJ626GSHbsaxXX1Lfngj9TbYCVYsutdE true
```


## Update witness account
`update_witness` arguments:
- Owner account name.
- Optional new reference URL. May be blank.
- Optional new EdDSA public key. May be blank.
- Optional new block signing public key. May be blank.
- Should broadcast update transaction. Default `false`.

Example:
```bash
update_witness nathan "" DETDgXCYMjuf5p3xGZEMD3gDHMDBotqJXcqm24nV "" true
```


## Generate EdDSA keypair
New EdDSA keys are generated with command `create_eddsa_keypair`.  
Output format: `["public key", "private key"]`.

Example:
```bash
create_eddsa_keypair
[
"DETBGA3mdJ626GSHbsaxXX1Lfng5CvWnmj9TLbYCVYsutdE",
"DET2NWT6mGW7cYvn2iEkiz7P3VzLRtsziFEQaSnCPiKZDNV"
]
```