const config = require("./config.json");
const { GithubNotionSync } = require("./GithubNotionSync");
const sync = new GithubNotionSync(config);

sync.execute()
	.then((x) => console.log(`synced ${x} issues`))
	.catch(console.error);
