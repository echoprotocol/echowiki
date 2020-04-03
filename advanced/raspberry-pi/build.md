# Build Echo for Raspberry Pi

## Building on Raspberry Pi itself
Echo build is memory-heavy, so you have to create a swap space for at least 4 GB. Compiling is done in one thread/job for the same reason.

Not an every target can be compiled for RaspPi, but `echo_node` and `echo_wallet` should do fine.

```bash
mkdir build-rp
cd build-rp
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_TOOLCHAIN_FILE=../cmake/toolchains/rpi-native.cmake ..

make echo_node echo_wallet
```
