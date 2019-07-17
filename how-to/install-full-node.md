# Install Full Node

There are several ways to install and run a full Echo node on your machine.

## Download files

The easiest of them is to simply download the pre-installed binary files from the link below and run the node with the pre-installed configurations

### Linux

- [echo-linux.v0.8.0rc2.tar](https://echo-bin.s3.eu-central-1.amazonaws.com/echo-linux.v0.8.0rc2.tar)

```bash
wget https://echo-bin.s3.eu-central-1.amazonaws.com/echo-linux.v0.8.0rc2.tar
tar -xvf echo-linux.v0.8.0rc2.tar
./echo_node \
    --seed-node=echo-testnet-us-1.echo-dev.io:6310  \
    --seed-node=echo-testnet-eu-1.echo-dev.io:6310 \
    --rpc-endpoint=127.0.0.1:6312 --testnet
```

Having executed these commands, you download the archive, unzip it and 
launch the blockchain node with the activated RPC interface on port 6312. 
After starting, the blockchain should start synchronizing with the main network.

### MacOS

- Build from sources only

### Windows

- Not supported yet

## Run as Docker

The Echo node is also available as a docker container. 

Detailed information on how to run the Echo container can be found by 
clicking on this link - [echoprotocol/echo][https://hub.docker.com/r/echoprotocol/echo]

## Build from sources

### Installing dependencies

Main system dependencies:

- **CMake 3.8.0** and later
- **GCC 7** and later or **Clang 5** and later

#### Installing dependencies on macOS

To install dependencies for macOS follow this steps:

* Install Homebrew by following the instructions here: [http://brew.sh/](http://brew.sh/)
* Initialize Homebrew:

```bash
brew doctor
brew update
```
* Install necessary packages:

```bash
brew install cmake git autoconf automake leveldb libtool libelf doxygen
```

#### Installing dependencies on Ubuntu 16.04 LTS

Ubuntu 16.04 LTS have no required cmake and gcc-7 in default repositories. They can be installed though Pip and third-party PPA repository.

```bash
sudo add-apt-repository ppa:jonathonf/gcc-7.3
sudo apt update

sudo apt install python3-pip
sudo pip3 install cmake

sudo apt install make g++-7 libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev  libcurl4-openssl-dev libleveldb-dev libelf-dev
```

#### Installing dependencies on Ubuntu 18.04 LTS and later

```bash
sudo apt update
sudo apt install cmake make g++-7 libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev  libcurl4-openssl-dev libleveldb-dev libelf-dev
```

### Build instructions
```bash
git clone https://github.com/echoprotocol/echo.git
cd echo
git submodule update --init --recursive
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build .
```