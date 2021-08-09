const fetch = require("node-fetch");
const { Client } = require("@notionhq/client");

class GithubNotionSync {
	constructor(config, githubOrg, notionDatabase) {
		this.githubAuth = config.githubAuth;
		this.notionAuth = config.notionAuth;
		this.databaseID = notionDatabase;
		this.org = githubOrg;
		this.notion = new Client({ auth: this.notionAuth });
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
				Authorization: `token ${this.githubAuth}`,
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
				Authorization: `token ${this.githubAuth}`,
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

	async addItemToDb(issue) {
		try {
			const response = await this.notion.pages.create({
				parent: { database_id: this.databaseID },
				properties: {
					Name: {
						title: [
							{
								text: {
									content: issue.title /*.replace(
										/(\[.+\].)/g,
										""
									),*/,
								},
							},
						],
					},
					State: {
						select: {
							name: issue.state,
						},
					},
					// "Type of Issue": {
					// 	select: {
					// 		name:
					// 			issue.title.split("]")[0].replace("[", "") ||
					// 			"none",
					// 	},
					// },
					Label: {
						select: {
							name: issue.label || "none",
						},
					},
					Assignee: {
						select: {
							name: issue.assignee || "none",
						},
					},
					Repo: {
						select: {
							name: issue.url.match(
								/fosscord\/(fosscord-)?([\w.-]+)/
							)[2],
						},
					},
					Url: {
						url: issue.url,
					},
					Number: { number: issue.number },
				},
				children: [
					{
						object: "block",
						type: "paragraph",
						paragraph: {
							text: [
								{
									type: "text",
									text: {
										content: `${
											issue.body.length > 1990
												? "issue body too long"
												: issue.body
										}`,
									},
								},
							],
						},
					},
				],
			});
			console.log(response);
		} catch (error) {
			console.log(issue);
			console.error(error.body);
		}
	}
}
module.exports = { GithubNotionSync };
