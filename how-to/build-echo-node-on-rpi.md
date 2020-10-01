# How to: How to build and start Echo node on Raspberry Pi (RPi)

Echo build is supported for Raspberry Pi 4 with 4 GB RAM. Ubuntu 18.04 64 bit OS should be installed for Raspberry PI 4.

Echo build is memory-heavy, so a swap space for at least 4 GB should be created. Compiling should be done in one thread/job for the same reason.

To build echo_node and echo_wallet please use following commands. Other targets are not supported yet.

```bash
    mkdir build
    cd build
    cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_TOOLCHAIN_FILE=../cmake/toolchains/rpi-native.cmake ..
    cmake --build .
```
