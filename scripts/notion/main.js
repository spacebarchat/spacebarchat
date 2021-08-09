const config = require("./private.json");
const { GithubNotionSync } = require("./GithubNotionSync");
const sync = new GithubNotionSync(
	config,
	"fosscord",
	"2c7fe9e73f9842d3bab3a4912dedd091"
);

(async () => {
	const repos = await sync.getAllIssueUrls();
	let issues = 0;
	for (repo of repos) {
		for (issue of await sync.getAllIssuesPerRepo(repo)) {
			await sync.addItemToDb(issue);
			issues++;
		}
	}
	console.log(`synced ${issues}`);
})();
