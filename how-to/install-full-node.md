# Installing a Full Node

There are several ways to install and run a full Echo node on your machine.

## Downloading Files

The quickest way is to simply download the binary files from the link below and run the node with the default configuration:

### Linux

* [echo-linux.v0.8.0rc2.tar](https://echo-bin.s3.eu-central-1.amazonaws.com/echo-linux.v0.8.0rc2.tar)

```bash
wget https://echo-bin.s3.eu-central-1.amazonaws.com/echo-linux.v0.8.0rc2.tar
tar -xvf echo-linux.v0.8.0rc2.tar
./echo_node \
    --seed-node=echo-testnet-us-1.echo-dev.io:6310  \
    --seed-node=echo-testnet-eu-1.echo-dev.io:6310 \
    --rpc-endpoint=127.0.0.1:6312 --testnet
```

By executing these commands, you have:

1. Downloaded the archive.
2. Unzipped it.
3. Launched the Echo node with an activated RPC interface on port 6312

### Mac OS

* Build from sources only.

### Windows

* Not supported yet.

## Running as a Docker Image

The Echo node is also available as a docker image.

Detailed information on how to run the Echo container can be found here: [echoprotocol/echo](https://hub.docker.com/r/echoprotocol/echo)

## Building from the Source Code

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

##### Ubuntu 16.04 LTS

Ubuntu 16.04 LTS has no required `cmake` and `gcc-7` in its default repositories. They can be installed through Pip and third-party PPA repository.

```bash
sudo add-apt-repository ppa:jonathonf/gcc-7.3
sudo apt update

sudo apt install python3-pip
sudo pip3 install cmake

sudo apt install make g++-7 libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev  libcurl4-openssl-dev libleveldb-dev libelf-dev
```

#### Installing Dependencies on Ubuntu 18.04 LTS and Later

```bash
sudo apt update
sudo apt install cmake make g++-7 libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev  libcurl4-openssl-dev libleveldb-dev libelf-dev
```

### Build Instructions

```bash
git clone https://github.com/echoprotocol/echo.git
cd echo
git submodule update --init --recursive
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build .
```
