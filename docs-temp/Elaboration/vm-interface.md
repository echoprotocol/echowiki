# Описание вызова VM

![](https://www.planttext.com/plantuml/img/JP51RiGW34NtFeMNoHMOHKVDkbBLIjqYb_maI0GYS4QJsvTaDDEmGpRl-PjhKScwpe58lGPm9o6mIr6pE2KwoXIJWWC6fMV5uYPX5KtP65cMi3KjfqozgFnAWPN56-CgoxvUn6JT977qSRGLgsXQGknvXnEPRmGuvPyFzb6H1t6udCJT4vCMP56V8azI-3PRtHQSGLr6XTTfs9spL2oNmu6-MixiJodbrMUFgVSWz0LTSooCEzowAsr6MOEUR7xWfjjJWOzCRothXCZDXj8IrsEwDCzU_o7yW5mUrVTgu57AXH0Ak8dfs8eVzjsdXUXQR_L__W00)

# Диаграмма классов интерфейса виртуальных машин
![](https://i.imgur.com/tKy1Dyq.png)

При открытии базы данных с помощью `database::open` инициализируется список виртуальных машин `vms`.
Каждая виртуальная машина инициализируетя через `abstract_vm::init` через который она получает:
* необходимый интерфейс к базе данных
* текущую рабочую директорию для произвольного чтения состояния с диска
* последний блок для получения хеша состояния

При реиндексе чейна состояния ВМ должны сбрасываться, для этого они запускаются через `abstract_vm::init_clean`.

Состояние ВМ (`state`) хранит в себе:
* коды контрактов
* значения переменных контрактов

Хеш состояния вычисляется на основании его содержимого.

Запись хешей состояний всех ВМ в блок производится через метод `abstract_vm::write_state_hash_to`, который вызывается при генерации блока.

При вызове `contract_evaluator::do_apply` выбирается виртуальная машина из массива `vms` по индексу `vm_type` из `contract_operation`.

`eth_executor` - в настоящий момент класс `vm::evm` - ВМ эфира, служащая для запуска его контрактов.
