# Installing Echo

### Install on macOS via Homebrew

### Install on Ubuntu via PPAs

## Build it from source code

### Installing dependencies

#### Installing dependencies on macOS

To install dependencies for macOS follow this steps:

* Install Homebrew by following the instructions here: [http://brew.sh/](http://brew.sh/)
* Initialize Homebrew:

```
brew doctor
brew update
```
* Install necessary packages:

```
brew install cmake git autoconf automake leveldb libtool libelf doxygen
```

#### Installing dependencies on Ubuntu 16.04 LTS (64-bit)
```
sudo apt-get update
sudo apt-get install cmake make libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev g++ libcurl4-openssl-dev libleveldb-dev libelf-dev
```

### Build instructions
```
git clone https://github.com/echoprotocol/echo.git
cd echo
git submodule update --init --recursive
cmake -DCMAKE_BUILD_TYPE=Release .
make
```