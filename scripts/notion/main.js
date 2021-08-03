const config = require("./config.json");
const { GithubNotionSync } = require("./GithubNotionSync");
const sync = new GithubNotionSync(config, "fosscord");

(async () => {
	const repos = await sync.getAllIssueUrls();
	const issues = [];
	for (repo of repos) {
		for (issue of await sync.getAllIssuesPerRepo(repo)) {
			issues.push(issue);
		}
	}
	console.log(issues);
})();
