# Build instructions
## Installing dependencies on Ubuntu 16.04 LTS (64-bit)
```
sudo apt-get update
sudo apt-get install cmake make libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev g++ libcurl4-openssl-dev libleveldb-dev
```

## To install dependencies for macOS follow this steps:
##### 1.  Install Homebrew by following the instructions here: http://brew.sh/
##### 2.  Initialize Homebrew:

```
brew doctor
brew update
```
##### 3.  Install necessary packages:

```
brew install cmake git autoconf automake leveldb libtool
```

## Build instructions
```
git clone git@gitlab.pixelplex.by:631_echo/echo.git
cd echo
git submodule update --init --recursive
cmake -DCMAKE_BUILD_TYPE=Release .
make
```