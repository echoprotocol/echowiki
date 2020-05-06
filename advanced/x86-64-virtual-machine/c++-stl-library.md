# Using STL in C++ Smart-Contracts

## Limitations

As x64-vm is running in an isolated environment it does not support system calls, so all functions from libc and from STL that use them would not compile.

The most common examples are:
- I/O Streams
- Multithreading
- [C-style I/O, formatting](https://en.cppreference.com/w/cpp/io/c)

## CMake project setup and examples

Example of x64 contracts with STL support are available in `tests/stl_tests/test_contracts` directory.
CMake files for gcc version 7 and clang 10 STL support are located in `scripts` directory.
For gcc version 8 and version 9 STL scripts should be modified accordingly.

### Compiling with AppleClang

AppleClang requires to define custom allocator in collections, so you have to instantiate string, vector and map with explicit custom allocator:
```cpp
// `stl_allocator` is defined in x86-64/contracts/libstd/stl_allocator.hpp

// Instead of std::string str;
std_string str; // From x86-64/contracts/libstd/stl_string.hpp
std::basic_string<char, std::char_traits<char>, stl_allocator<char>> str;

// Instead of std::vector<int> vec;
std::vector<int, stl_allocator<int>> vec;

// Instead of std::map<std::string, int> map;
std::map<
    std_string, int,
    std::less<std_string>,
    stl_allocator<std::pair<const std_string, int>>
> map;
```
