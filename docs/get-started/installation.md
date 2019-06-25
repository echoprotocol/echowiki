# Installing Echo

### Install on macOS via Homebrew

### Install on Ubuntu via PPAs

## Build it from source code

### Installing dependencies

Main system dependencies:

- **CMake 3.8.0** and later
- **GCC 7** and later or **Clang 5** and later

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

#### Installing dependencies on Ubuntu 16.04 LTS

##### Ubuntu 16.04 LTS

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