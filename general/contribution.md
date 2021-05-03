# Contribution

Please read the [concept page](Home/) first

## Issues

### Naming convention

The issue name must have the main label as a prefix in brackets: e.g. `[Feature] Test` or `[Bug] Test`.

The first letter of the prefix and the title must be uppercase.

You are not allowed to use CAPS.

## Project structure

Fosscord consists of many repositories, which together make up the client and the server:

### Server-side

* [Fosscord-server-util](https://github.com/fosscord/fosscord-server-util) contains all shared logic like Database Models, Utility functions 
* [Fosscord-api](https://github.com/fosscord/fosscord-api) is the REST HTTP API server
* [Fosscord-gateway](https://github.com/fosscord/fosscord-gateway) is the WebSocket Gateway server
* [Fosscord-media](https://github.com/fosscord/fosscord-media) will be the media server for voice and video sharing
* [Fosscord-cdn](https://github.com/fosscord/fosscord-cdn) is the content-delivery-content \(CDN\) that stores user uploaded images

### Client-side

* [Fosscord-UI](https://github.com/fosscord/fosscord-ui/wiki) is a user interface framework in the style of discord
* [Fosscord-Themes](https://github.com/fosscord/fosscord-themes) contains all the official themes for the client
* [Fosscord-Plugins](https://github.com/fosscord/fosscord-plugins) contains all the official plugins for the client
* [Fosscord-Landingpage](https://github.com/fosscord/fosscord-landingpage) represents and explains the project
* [Fosscord-Client](https://github.com/fosscord/fosscord-client) is the official Fosscord client

#### Discontinued

* [https://github.com/fosscord/react-native-withcss](https://github.com/fosscord/react-native-withcss)
* [https://github.com/fosscord/css-mediaquery](https://github.com/fosscord/css-mediaquery)

### Setup

To setup all repositories use this [setup script](https://github.com/fosscord/fosscord/tree/master/scripts/setup).

If you only want to work on a specific repository follow their setup guide.

