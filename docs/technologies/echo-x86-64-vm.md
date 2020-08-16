{% hint style="warning" %}
Is now in the development stage.
{% endhint %}

# ECHO x86-64 virtual machine 
## Technical specification


ECHO x86-64 virtual machine has the following structure

![x86-64-structure.png](./x86-64-structure.png)

x86-64 virtual machine consists of main instruction decoder,
instruction decoders for each type of instruction (add, mov, logical,
etc), set of instructions, different type of operands and emulators of
hardware (memory and CPU). Operands are CPU registers, memory location
or immediate value stored in the instruction. VM emulates the bytecode
received from the ECHO blockchain and return the result which is
recorded back to ECHO blockchain.

Smart contract is running in a isolated environment, no system calls or
system memory addresses are available, all the interactions with the
outside world are performed through the VM via special instructions. For
that interaction VM requires the following interfaces:

- Contract interface is required to get the start address and different
  sections of the ELF executable bytecode
- ECHO blockchain interface is required for interaction with blockchain,
  retrieving the contract parameters, read/write into blokchain,
  etc.
- Persistent storage interface is required to store and get values
  that are persisted between the contract calls.

In addition to this VM provides special functions for memory allocation
on the heap.

The flow of the VM executing the smart contract is as follows:

- Loading the bytecode into memory. Set up stack and heap in the memory.
- Starting emulation from the start address
- For every instruction VM does the following 
    - Decoding of the instruction 
        - Prefixes are decoded by main decoder (unused prefixes, REX prefix,
          operand size prefix)
        - Instruction opcode is decoded by main decoder 
        - Appropriate instruction decoder is called which reads the rest of
          the instruction (MODRM and SIB bytes, immediate values) and
          creates operands 
            - Instructions are divided into groups based on the instruction
            operation codes (one byte, two bytes, one byte with additional 3
            bits in MODRM, three bytes), hash maps are created for each
            group and instruction decoders are stored there for fast access
            - Operands are created based on values of the MODRM and SIB byte
            and instruction code itself, please see
            [https://wiki.osdev.org/X86-64_Instruction_Encoding](https://wiki.osdev.org/X86-64_Instruction_Encoding)
            for a brief description or
            [https://software.intel.com/sites/default/files/managed/39/c5/325462-sdm-vol-1-2abcd-3abcd.pdf](https://software.intel.com/sites/default/files/managed/39/c5/325462-sdm-vol-1-2abcd-3abcd.pdf)
            for the detailed Intel x86-64 instructions set specification.
    - Executing decoded instruction 
        - Operands read from memory/CPU registers or immediate values
          encoded in the instruction, taking into account the size of
          operands specified by prefixes or instruction itself.
        - Instruction does appropriate calculations 
        - Operands write back the result(s) to memory and/or CPU
          registers including the flag register for some of the
          instructions.
    - Interrupt instruction is used to communicate with the VM from
    running script. Based on the value provided with the interrupt
    instruction the following is performed: 
        - access to parameters and returning result of the smart
          contract 
        - interaction with the ECHO blockchain 
        - heap memory allocation. This is required as the script is
          running in a isolated environment without access to system
          memory 
        - debug output 
        - set of different functions used by contract developer
          (cryptography functions, math functions, etc)
- Finish the execution after the ret instruction push the null value
  into the RIP register 
- Return value can be retrieved from the VM as a byte array


