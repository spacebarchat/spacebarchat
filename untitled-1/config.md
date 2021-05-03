# Config

## Philosophy

Every fosscord server instance should be completely configurable in every way, without the need to change the source code.

The config should have reasonable defaults similar to discord.

Only in special cases it should require a third party config value.

The config should be changeable over the admin fosscord-dashboard and update in realtime without the need to restart the servers

The very first time the server starts, it saves to default config in the database. The next start it will load the config from the database.

## Getting Started

You **should not** `get()` the Config in the root of your file and it instead load the config every time you access a value

Import the file:

```javascript
// at the top of the file import the Config file from /src/util/Config.ts
import Config from "/../util/Config";
```

Access the Config in your route:

```javascript
router.get("/", (req: Request, res: Response) => {
    // call Config.get() to get the whole config object and then just access the property you want
    const { REGISTRATION_DISABLED } = Config.get().register
});
```

`Config.get()` returns the current config object and is not expensive at all

## Add own values to the Config

The default Config is located in `/src/util/Config.ts` and exports a `interface DefaultOptions` and a `const DefaultOptions` object with reasonable default values.

To add your own values to the config, add the properties to the `interface` with corresponding types and add default values to `const DefaultOptions`.

Also you don't need to worry about updating "old config versions", because new values will automatically be synced with the database.

Note, however, that if the database already has a default value it won't update it.

