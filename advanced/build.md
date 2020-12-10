# Build instructions

## Dependencies on Ubuntu

We recommend building on Ubuntu 16.04 LTS or Ubuntu 18.04 LTS, and the build dependencies may be installed with:

* `cmake` version should be greter than 3.11. 16.04 have cmake version 3.5.2 and 18.04 - 3.10.2, therefore better install cmake by pip3.
* `g++` version should be greater than 5.4.

```bash
    sudo apt-get update
    sudo apt-get install autoconf git g++ libtool xxd doxygen perl python3-pip
    pip3 install cmake --upgrade
```

## Dependencies on MacOS

To install dependencies for Mac OS, follow these steps:

1. [Install Homebrew.](http://brew.sh/)
2. Update Homebrew:
    1. `brew doctor`
    2. `brew update`
3. Install the necessary packages:

```bash
brew install cmake git autoconf automake libtool doxygen perl
```

## Build (Ubuntu/MacOS)

To build after all dependencies are installed:

```bash
    git clone https://github.com/echoprotocol/echo.git
    cd echo
    git checkout <LATEST_RELEASE_TAG>
    git submodule update --init --recursive
    mkdir build
    cd build
    cmake -DCMAKE_BUILD_TYPE=Release ..
    cmake --build .
```

## Building on Raspberry Pi

Echo build is supported for Raspberry Pi 4 with 4 GB RAM. Ubuntu 18.04 64 bit OS should be installed for Raspberry PI 4.

Echo build is memory-heavy, so a swap space for at least 4 GB should be created. Compiling should be done in one thread/job for the same reason.

To build echo_node and echo_wallet please use following commands. Other targets are not supported yet.

```bash
    mkdir build
    cd build
    cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_TOOLCHAIN_FILE=../cmake/toolchains/rpi-native.cmake ..
    cmake --build .
```
