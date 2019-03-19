# Mobile Frameworks

Native mobile frameworks for working with the Echo blockchain. Can be used to work with accounts, transactions and contracts in iOS and Android, and to easily obtain data from the blockchain via public apis.

  - [echo-ios-framework](#echo-ios-framework)
  - [echo-android-framework](#echo-android-framework)


## echo-ios-framework

GitHub Repository: [https://github.com/echoprotocol/echo-ios-framework](https://github.com/echoprotocol/echo-ios-framework)

### Install

This framework can be obtained through CocoaPods:
```
pod 'ECHO', :git => 'https://github.com/echoprotocol/echo-ios-framework.git'
```

### Setup

For setup framework use this simple code:
```swift
// Create and Setup framework main class
let echo = ECHO(settings: Settings(build: {

    /** Here you can put your custom settings for our framework

        Example: 
        Custom api options which can be used
    */
    $0.apiOptions = [.accountHistory, .database, .networkBroadcast]
}))

// Start framwork. Connect to nodes and setup public apis
echo.start { (result) in

    switch result {
    case .success(let result):
        print(result)
    case .failure(let error):
        print(error)
}
```

### Usage

Examples of using the framework can be found in the [README.md](https://github.com/echoprotocol/echo-ios-framework/blob/master/README.md) and in the [framework tests](https://github.com/pixelplex/echo-ios-framework/blob/master/ECHOTests/ECHOInterfaceTests.swift).


API documentation: [https://echoprotocol.github.io/echo-ios-framework](https://echoprotocol.github.io/echo-ios-framework/)


## echo-android-framework

GitHub Repository: [https://github.com/echoprotocol/echo-android-framework](https://github.com/echoprotocol/echo-android-framework)

## Install

This framework can be obtained through gradle dependency:

```
implementation 'org.echo.mobile:echoframework:3.0.2'
```

Or maven dependency:

```
<dependency>
  <groupId>org.echo.mobile</groupId>
  <artifactId>echoframework</artifactId>
  <version>3.0.2</version>
  <type>pom</type>
</dependency>
```

## Setup

For setup framework use this simple code:
```kotlin
// Create and Setup framework main class
fun init() { 
    val echo = EchoFramework.create(
            /** Here you can put your custom settings for our framework
            Example:
            Custom api options which can be used
             */
            Settings.Configurator()
                .setUrl(ECHO_URL)
                .setApis(Api.DATABASE, Api.ACCOUNT_HISTORY, Api.NETWORK_BROADCAST)
                .configure()
            )
    // Start framework. Connect to node and setup public apis
    echo.start(object : Callback<Any> {
                  override fun onError(error: LocalException) { }
    
                  override fun onSuccess(result: Any) {}
            })
}
```


### Usage

Examples of using the framework can be found in the [README.md](https://github.com/echoprotocol/echo-android-framework/blob/master/README.md) and in the [sample-app](https://github.com/echoprotocol/echo-android-framework/tree/master/echo-sample).


API documentation: [https://echoprotocol.github.io/echo-android-framework](https://echoprotocol.github.io/echo-android-framework/)
