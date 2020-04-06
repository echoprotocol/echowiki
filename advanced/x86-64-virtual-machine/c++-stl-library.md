# Using STL in C++ Smart-Contracts

## Limitations

Currently x64-vm does not support any system calls, so all functions from libc and from STL that use them would not compile.

The most common examples are:
- Streams
- [C-style I/O, formatting](https://en.cppreference.com/w/cpp/io/c)

## CMake project setup

```bash
# Add x86-64 project
add_subdirectory(x86-64)

# Get properties from x86-64 project
get_property(compiler_options GLOBAL PROPERTY SMART_CONTRACT_O0_COMPILE_OPTIONS)
get_property(linker_options GLOBAL PROPERTY SMART_CONTRACT_LINKER_OPTIONS)
get_property(stl_compiler_options GLOBAL PROPERTY X64VM_STL_COMPILE_FLAGS )
get_property(stl_linker_options GLOBAL PROPERTY X64VM_STL_LINK_FLAGS)
get_property(stl_include_derictories GLOBAL PROPERTY X64VM_STL_INCLUDE_DERICTORIES)
get_property(stl_links GLOBAL PROPERTY X64VM_STL_LINKS)

# Add example target
add_executable(stl_example stl_example.cpp)
add_dependencies(stl_example libstdcxx)

set(CMAKE_EXE_LINKER_FLAGS "${linker_options} ${stl_linker_options}")
set_target_properties(stl_example PROPERTIES COMPILE_OPTIONS "${compiler_options};${stl_compiler_options}")
set_target_properties(stl_example PROPERTIES LINK_LIBRARIES "${stl_links}")

target_include_directories(stl_example PRIVATE ${stl_include_derictories})
target_include_directories(stl_example PRIVATE x86-64/contracts)

# Add repack target
add_custom_target(stl_example_esc
    COMMAND $<TARGET_FILE:repackager> $<TARGET_FILE:stl_example> -o $<TARGET_FILE:stl_example>.esc
    DEPENDS stl_example repackager
    COMMENT "Repack stl_example"
)
```

Then to produce .esc contract file build `stl_example_esc` target:
```bash
cmake ..
make stl_example_esc
```

## Usage example

```cpp
#include "contract_base.hpp"
#include "libstd/stl_contract_base.hpp"
#include "string.hpp"

#include <vector>
#include <map>

using namespace x86_64_contract;

extern "C" void __apply() {
    std::string str("Hello");
    str.insert(str.size(), " World!");
    set_return_values(string(str.c_str())); // \f\0\0\0Hello World!

    std::vector<char> vec;
    for (char i = 'A'; i <= 'Z'; ++i)
        vec.push_back(i);
    std::string str2(vec.data(), vec.size());
    set_return_values(string(str2.c_str())); // \x1A\0\0\0ABCDEFGHIJKLMNOPQRSTUVWXYZ

    std::map<char, int> codes;
    for (char i = 'A'; i <= 'F'; ++i)
        codes.emplace(i, i);
    
    std::string str3;
    str3.reserve(codes.size() * 5);
    for (const auto& e : codes) {
        str3.push_back(e.first);
        str3.push_back('=');
        str3.push_back(e.second / 10 + '0');
        str3.push_back(e.second % 10 + '0');
        str3.push_back(',');
    }
    set_return_values(string(str3.c_str())); // \x1E\0\0\0A=65,B=66,C=67,D=68,E=69,F=70,
}
```

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
