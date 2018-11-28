## Исходники
Программа должна иметь функцию `int __apply(int hash, int args, const char** argv)` которая является точкой входа и вызывает нужную функцию по хэшу.
Можно использовать макросы `ECHO_ABI` из [`abi.h`](https://gitlab.pixelplex.by/631_echo/x86-vm/tree/master/include/echo-x86vm/abi.h) и [`abi.hpp`](https://gitlab.pixelplex.by/631_echo/x86-vm/tree/master/include/echo-x86vm/abi.hpp) для её генерации.

## Компиляция
Компиляция должна производиться для 32-битной архитектуры, с включенным PIC, который нужен для поддержки динамических библиотек.

Пример команды:
```bash
gcc -c -m32 -fPIC -O3 -o example_contract.o example_contract.c
```

## Линковка
Линковать нужно в динамическую библиотеку с эмуляцией `elf_i386`.

Команда вызова линковщика будет начинаться так:
```bash
ld -m elf_i386 --shared -o example_contract.so example_contract.o
```

Также можно использовать динамические библиотеки, поддерживаемые x86vm.

## Перепаковка в ESC
Для перепаковки ELF библиотеки в формат контракта используется утилита repackager. Она расположена в подпроекте x86-vm, но также собирается вместе с echo.

Пример:
```bash
./repackager -o example_contract.esc example_contract.so
```

В результате в файл `example_contract.esc` будет записан контракт в бинарном формате.

## Создание контракта на чейне
Для начала нужно получить hex получившегося контракта, для этого можно использовать следующую команду:
```bash
xxd -p example_contract.esc | tr -d '\n'
```

Затем вызывается команда `create_contract`, например через curl:
```bash
curl --data '{"jsonrpc": "2.0", "method": "call", "params": [0, "create_contract", ["nathan", "ECHO", "7768792061726520796f752072656164696e67206d653f3f3f0a", 0, 1, 120000, true, true] ], "id": 1}' http://127.0.0.1:8190/rpc
```

## Вызов метода контракта
Для вызова метода используется команда `call_contract`. В этом примере вызывается метод контракта `1.16.4` c хэшем `520796f7`:
```bash
call_contract nathan 1.16.4 "520796f7" 0 1 2000000 true true
```