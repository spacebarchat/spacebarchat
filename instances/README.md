# Add your instance

By adding your Spacebar instance to our list, it will show up on our website.

## How to
1. Make sure your instance is in line with our [rules and guidelines](https://docs.spacebar.chat/contributing/instances/).
2. Click [here](https://github.com/spacebarchat/spacebarchat/edit/master/instances/instances.json) to edit the instances.json file and add your instance to it. Make sure to follow the example below.

```json
{
  "name": "Very nice chat",
  "url": "https://myinstance.tld",
  "description": "My cool Spacebar instance",
  "image": "https://myinstance.tld/logo.png",
  "display": true,
  "verified": false,
  "country": "uk",
  "language": "en"
}
```

4. Create a PR with your changes.

## Data Structure
### Required
- __name__: the name of your instance;
- __url__: the url of your instance's homepage. it doesn't need to be the webclient URL and it can be a simple landing page, but that's up to you;
- __description__: some words describing your instance.;

### Optional
- __image__: the url for your instance's logo. **(default undefined)**;
- __display__: should your instance be showing up on our website or you want it to be hidden? **(default true)**;
- __verified__: if your instance should be shown as an official verified spacebar instance. _(__SHOULD ALWAYS BE false__ - it will only change if spacebar team decides you are worth of this honor)_;
- __country__: what is the country of your instance? [fill in according to the ISO 8166-2 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
- __language__: what is the primary language of your instance? [fill in according to the ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1_codes)

## How to be an officially verified server
This has not been discussed yet - at this moment, only Spacebar's main instance will be officially verified.
Discussions on this topic are open.
