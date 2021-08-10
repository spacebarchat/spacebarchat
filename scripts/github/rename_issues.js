const { token } = require("./config.json");
const fetch = require("node-fetch");
const base = "https://api.github.com";
const organization = "fosscord";

const request = async (path, opts = {}) =>
	await fetch(`${base}${path}`, {
		...opts,
		headers: {
			...opts.headers,
			Authorization: `token ${token}`,
		},
	}).then((response) => response.json());

async function getRepos() {
	return (await request(`/orgs/${organization}/repos`)).map((repo) => repo.name);
}

async function main() {
	const repos = await getRepos();
	for (const repo of repos) {
		var page = 1;
		do {
			var issues = await request(`/repos/${organization}/${repo}/issues?state=all&per_page=100&page=${page}`);
			for (const issue of issues) {
				const replacer = [
					"[Feature]",
					"[BUG]",
					"[Bug]",
					"[Security]",
					"[Route]",
					"[Voice]",
					"[Page]",
					"[Media]",
					"[Gateway]",
					"[Fix]",
					"[Plugin]",
				];
				const newTitle = replacer.reduce((acc, curr) => acc.replace(curr, ""), issue.title).trim();

				if (newTitle !== issue.title) {
					console.log(`old: ${issue.title}, new: ${newTitle}`, issue.number);
					// continue;
					await request(`/repos/${organization}/${repo}/issues/${issue.number}`, {
						method: "PATCH",
						body: JSON.stringify({ title: newTitle }),
					});
				}
			}
			page++;
		} while (issues.length);
	}
}

main()
	.then(() => console.log("done"))
	.catch(console.error);
