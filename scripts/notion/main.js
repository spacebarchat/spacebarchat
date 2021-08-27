const config = require("./config.json");
const { GithubNotionSync } = require("./GithubNotionSync");
const sync = new GithubNotionSync(config);

sync.execute()
	.then((x) => console.log(`Successfuly synced ${x} issues!`))
	.catch(console.error);
