## How to: Как создать свой собственный asset на стороне Echo

### Общее описание

Для того, чтобы создать собственную валюту(пользовательский или рыночный актив) и как пример, торговать ею на бирже, необходим начальный баланс аккаунта, который издаёт валюту, в BTC, ETH, Echo. В зависимости от размера названия нового актива количество взимаемых средств разное.

### Пример создание нового актива

Создание `asset` происходит с помощью [echo wallet](how-to/use-cli-wallet.md).

1. Если нет аккаунта в сети Echo, регистрируем новый аккаунт с помощью методов [echo wallet](how-to/use-cli-wallet.md) [register_account](../api-reference/echo-wallet-api/README.md#register_account) или [register_account_with_api](../api-reference/echo-wallet-api/README.md#register_account_with_api).

2. Импортируем личный ключ в [import_key](../api-reference/echo-wallet-api/README.md#import_key) от своего аккаунта.

3. Создаем новый актив с помощью метода [create_asset](../api-reference/echo-wallet-api/README.md#create_asset)
