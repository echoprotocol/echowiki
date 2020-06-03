# Build instructions

## Dependencies on Ubuntu

We recommend building on Ubuntu 16.04 LTS, and the build dependencies may be installed with:

    sudo apt-get update
    sudo apt-get install autoconf cmake git g++ libtool

## Dependencies on MacOS

To install dependencies for Mac OS, follow these steps:

1. [Install Homebrew.](http://brew.sh/)
2. Update Homebrew:
    1. `brew doctor`
    2. `brew update`
3. Install the necessary packages:
```
brew install cmake git autoconf automake libtool doxygen
```

## Build (Ubuntu/MacOS)

To build after all dependencies are installed:

    git clone https://github.com/echoprotocol/echo.git
    cd echo
    git checkout <LATEST_RELEASE_TAG>
    git submodule update --init --recursive
    mkdir build
    cd build
    cmake -DCMAKE_BUILD_TYPE=Release ..
    cmake --build .

## Building on Raspberry Pi

Echo build is supported for Raspberry Pi 4 with 4 GB RAM. Ubuntu 18.04 64 bit OS should be installed for Raspberry PI 4.

Echo build is memory-heavy, so a swap space for at least 4 GB should be created. Compiling should be done in one thread/job for the same reason.

To build echo_node and echo_wallet please use following commands. Other targets are not supported yet.

    mkdir build
    cd build
    cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_TOOLCHAIN_FILE=../cmake/toolchains/rpi-native.cmake ..
    cmake --build .
