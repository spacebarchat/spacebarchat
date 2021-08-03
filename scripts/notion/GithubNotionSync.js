const fetch = require("node-fetch");

class GithubNotionSync {
	constructor(config, githubOrg) {
		this.github_auth = config.githubAuth;
		this.notion_auth = config.notionAuth;
		this.org = githubOrg;
		this.urls = {
			base: "https://api.github.com/",
		};
	}

	/**
	 * @returns array of urls in the following form:
	 * https://api.github.com/repos/${this.org}/${repo_name}/issues
	 */
	async getAllIssueUrls() {
		let repos = await fetch(`${this.urls.base}orgs/${this.org}/repos`, {
			headers: {
				Authorization: `token ${this.github_auth}`,
				"User-Agent": this.org,
			},
		}).then((r) => r.json());
		return repos.map(
			(repo) => `${this.urls.base}repos/${this.org}/${repo.name}/issues`
		);
	}

	/**
	 * @param repoIssueUrl element of array returned by `getAllIssueUrls()`
	 * @returns array of issues for the given repo in the following json form:
	 * ```
	 * {
	 *  url: 'https://api.github.com/repos/fosscord/fosscord-api/issues/78',
	 *  title: '[Route] /guilds/:id/regions',
	 *  body: '- [ ] regions',
	 *  number: 78,
	 *  state: 'open',
	 *  label: 'Route',
	 *  assignee: 'Stylix58'
	 * }
	 * ```
	 */
	async getAllIssuesPerRepo(repoIssueUrl) {
		let issues = await fetch(repoIssueUrl, {
			headers: {
				Authorization: `token ${this.github_auth}`,
				"User-Agent": this.org,
			},
		}).then((r) => r.json());
		return issues.map((x) => {
			return {
				url: x?.url,
				title: x?.title,
				body: x?.body,
				number: x?.number,
				state: x?.state,
				label: x?.labels[0]?.name,
				assignee: x?.assignee?.login,
			};
		});
	}
}
module.exports = { GithubNotionSync };
