# How to become a registrar and start earn money with Echo

Каждый участник сети, запустивший свою ноду, может принять участие в консенсусе, предоставляя API для регистрации новых аккаунтов в сети.

## Шаг 1. Restrict API

You can restrict API's to particular users by specifying an `api-access` file in `config.ini` or by using the `--api-access /full/path/to/api-access.json` startup node command.
Here's example which allows only `registration_api` for all without any password:

```json
{
   "permission_map" :
   [
      [
         "*",
         {
            "password_hash_b64" : "*",
            "password_salt_b64" : "*",
            "allowed_apis" : ["registration_api"]
         }
      ]
   ]
}
```

> Note: вы можете разрешить использовать другое api, указывая пароль для фильтрации доступа. Более подробно про это можно прочитать в README.md проекта.

## Шаг 2. Запуск ноды

Запуск ноды описан в [этой статье](run_node_and_start_staking.md).

Необходимо при запуске указать конфигурацию для `registration plugin`, поэтому сама команда запуска ноды немного измениться (остальное останется как и в приведенной статье):

- `--plugins="registration"` - enable registration plugin
- `--registrar-account "1.2.26"` - ID of registrar account on this node (should be imported as account-info)
- `--registration-difficulty 20` - complexity of POW task to register account. Default is 20

```bash
./echo_node --rpc-endpoint="0.0.0.0:8090" --account-info="[\"1.2.514\", \"5KcP5uiAByA14Koo8o9eYgoPEyB6A53n57MmGMsKaMqi7wKQYiA\"]" --plugins="registration" --registrar-account "1.2.26" --registration-difficulty 20 --api-access "api-access.json"
```

## Шаг 3. Вызов API

Теперь можно распространять ссылку на API:

```
http://localhost:8090/rpc

localhost - ip of your node
8090 - rpc port of your node
```

Example of `request_registration_task` call:

```json
{"jsonrpc": "2.0", "params": ["registration", "request_registration_task", []], "method": "call", "id": 1}
```

Using curl:

```bash
curl --data '{"jsonrpc": "2.0", "params": ["registration", "request_registration_task", []], "method": "call", "id": 1}' http://localhost:8090/rpc
```

В [этом файле](../../api-reference/echo-node-api/registration-api.md) расписаны методы, которые можно вызвать через данное API.
