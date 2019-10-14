# Install a Full Node

There are several ways to install and run a full Echo node on your machine.

## Downloading Files

The quickest way is to simply download the binary files from the link below and run the node with the default configuration. The minimum recommended resource requirements for now are  1 CPU core and 1GB RAM.

### Linux

1. Download the Echo node binary: [echo-linux.v0.11.2.tar](https://d14s13k07yt1gw.cloudfront.net/echo-linux.0.11.2.tar)



   ```bash
   wget https://d14s13k07yt1gw.cloudfront.net/echo-linux.0.11.2.tar
   ```

2. Unzip the binary:



   ```bash
   tar -xvf echo-linux.0.11.2.tar
   cd echo-linux.0.11.2
   ```

3. Launch the Echo node with an activate RPC interface on port 6312

   ```bash
   ./echo_node --rpc-endpoint=127.0.0.1:6312 --testnet
   ```

At this point, the Echo node should connect to some default seed nodes and begin downloading and verifying the complete blockchain. The time to sync to the latest block \(as shown on the [block explorer](https://explorer.echo.org/)\) depends on the bandwidth and CPU available, but typically take 0.5-2 hours on the current network. An example of the node log output during sync is below.

{% hint style="info" %}
If you see warning messages during the sync process saying that "Signature verifier is invalid", you can safely ignore these and the blockchain download will still proceed.
{% endhint %}

```text
17:10:37.574833    570 th_a       application.cpp:145           reset_p2p_node       ] Adding seed node 165.22.120.218:6310
17:10:37.575350    517 th_a       application.cpp:145           reset_p2p_node       ] Adding seed node 178.128.47.58:6310
17:10:37.575809    459 th_a       application.cpp:145           reset_p2p_node       ] Adding seed node 178.128.34.126:6310
17:10:37.576323    514 th_a       application.cpp:145           reset_p2p_node       ] Adding seed node 165.22.191.78:6310
17:10:37.576821    498 th_a       application.cpp:145           reset_p2p_node       ] Adding seed node 159.89.54.163:6310
17:10:37.577364    543 th_a       application.cpp:145           reset_p2p_node       ] Adding seed node 159.89.49.128:6310
17:10:37.577865    501 th_a       application.cpp:145           reset_p2p_node       ] Adding seed node 159.89.49.129:6310
17:10:37.578322    457 th_a       application.cpp:145           reset_p2p_node       ] Adding seed node 159.89.52.29:6310
17:10:37.578731    409 th_a       application.cpp:161           reset_p2p_node       ] Configured p2p node to listen on 0.0.0.0:35834
17:10:37.579513    782 th_a       application.cpp:236           reset_websocket_serv ] Configured websocket rpc to listen on 127.0.0.1:6312
17:10:37.579619    106 th_a       echorand.cpp:98               plugin_startup       ] EchoRand plugin:  plugin_startup() begin
17:10:37.579665     46 th_a       plugin.cpp:51                 plugin_startup       ] Registration plugin:  plugin_startup() begin
17:10:37.579696     31 th_a       plugin.cpp:52                 plugin_startup       ] Imported registrar-account:
17:10:37.579725     29 th_a       plugin.cpp:53                 plugin_startup       ] Registration plugin:  plugin_startup() end
17:10:37.579803     78 th_a       main.cpp:293                  main                 ] Started ECHO node on a chain with 6449 blocks.
17:10:37.579848     45 th_a       main.cpp:294                  main                 ] Chain ID is e63b8287f9ae25a433dc4892e2f193167993c04f1f8b24aedce356a570f0facb
17:10:39.549318 1.969s th_a       application.cpp:477           handle_block         ] Synchronized block 7449 ...
17:10:41.295757 1.746s th_a       application.cpp:477           handle_block         ] Synchronized block 8449 ...
17:10:42.818861 1.523s th_a       echorand.cpp:238              on_round_info        ] EchoRand plugin:  start agreement in mode passive = true
17:10:42.819350    489 th_a       echorand.cpp:196              create_agreement     ] EchoRand: dispatched 188 message to create agreement
17:10:44.050128 1.231s th_a       application.cpp:477           handle_block         ] Synchronized block 9449 ...
17:10:45.009351 959223 th_a       application.cpp:450           handle_block         ] Got block: #10000 time: 2019-08-19T21:57:28 latency: 1797197009 ms irreversible: 9984 (-16)
17:10:45.793360 784009 th_a       application.cpp:477           handle_block         ] Synchronized block 10449 ...
17:10:47.831909 2.039s th_a       application.cpp:477           handle_block         ] Synchronized block 11449 ...
```

### Mac OS

* Build from sources only.

### Windows

* Not supported yet.

## Running as a Docker Image

The Echo node is also available as a docker image.

Detailed information on how to run the Echo container can be found here: [echoprotocol/echo](https://hub.docker.com/r/echoprotocol/echo)

## Building from the Source Code

{% hint style="warning" %}
Note: this is currently unsupported as the Echo node source code isn't available publicly on Github yet.
{% endhint %}

### Installing Dependencies

Main system dependencies:

* **CMake 3.8.0** and later.
* **GCC 7** and later or **Clang 5** and later.

#### Installing Dependencies on Mac OS

To install dependencies for Mac OS, follow these steps:

* Install `Homebrew` by following the instructions here: [http://brew.sh/](http://brew.sh/)
* Update `Homebrew`:

```bash
brew doctor
brew update
```

* Install the necessary packages:

```bash
brew install cmake git autoconf automake leveldb libtool libelf doxygen
```

#### Installing Dependencies on Ubuntu 16.04 LTS

**Ubuntu 16.04 LTS**

Ubuntu 16.04 LTS has no required `cmake` and `gcc-7` in its default repositories. They can be installed through Pip and third-party PPA repository.

```bash
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt update

sudo apt install python3-pip
sudo pip3 install cmake

sudo apt install build-essential g++-7 libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev  libcurl4-openssl-dev libleveldb-dev libelf-dev
```

#### Installing Dependencies on Ubuntu 18.04 LTS and Later

```bash
sudo apt update
sudo apt install cmake make g++-7 libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev  libcurl4-openssl-dev libleveldb-dev libelf-dev
```

### Build Instructions

#### Preparation step

```bash
git clone https://github.com/echoprotocol/echo.git
cd echo
git submodule update --init --recursive
mkdir build
cd build
```

#### Build

``` bash
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build .
```

On Ubuntu 16.04 LTS you need additionally pass compiler paths to cmake:

```bash
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER=/usr/bin/gcc-7 -DCMAKE_CXX_COMPILER=/usr/bin/g++-7 ..
cmake --build .
```
