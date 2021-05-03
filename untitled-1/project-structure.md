# Project-Structure

This repository currently contains the HTTP API Server

## Translation

Additionally we use [i18next](https://www.i18next.com/) to manage translation/localization in _some_ API Responses.

The `.json` language files are located in `/locales` and are separated by namespaces.

## Source code

We use [TypeScript](https://www.typescriptlang.org/) \(JavaScript with types\). The `.ts` source files are located in `/src/` and will be compiled to `.js` in the `/dist/` directory.

### Middlewares

All Express [Middlewares](http://expressjs.com/en/guide/writing-middleware.html) are in the directory `/src/middlewares/` and need to be manually loaded in `/src/Server.ts`.

### Routes

All Express [Router](http://expressjs.com/en/4x/api.html#router) Routes are in the directory `/src/routes/` and are automatically registered.

### Models

All Database Typescript interface models are in the directory `/src/models/`

### Util

All Utility functions are in the directory `/src/util/`.

