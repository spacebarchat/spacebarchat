const arg = require("arg");
const puppeteer = require("puppeteer");
const prompts = require("prompts");
const { token } = require("./config.json");
const fetch = require("node-fetch");
const base = "https://api.github.com";

const request = async (path, opts = {}) =>
	await fetch(`${base}${path}`, {
		...opts,
		headers: {
			...opts.headers,
			Authorization: `token ${token}`,
		},
	}).then((response) => response.json());

const args = arg({
	"--org": String,
	"--from": String,
	"--to": String,
	"--type": String,
	"--username": String,
	"--password": String,
	"--otp": String,
});
console.log(args);
if (Object.keys(args).length < 5) {
	console.log(
		`usage:\nnode transfer-issues.js --org org-name --from original-repo-name --to new-repo-name --type closed --username username --password password`
	);
	process.exit();
}

async function main() {
	var issues = (
		await request(`/repos/${args["--org"]}/${args["--from"]}/issues?state=all&per_page=100&page=1`)
	).filter((x) => !x.pull_request);

	const browser = await puppeteer.launch({ headless: false });

	const page = await browser.newPage();

	await page.goto("https://github.com/login");

	await page.waitForSelector("#login_field");
	await page.type("#login_field", args["--username"]);
	await page.type("#password", args["--password"]);
	const wait = page.waitForNavigation();
	await page.click(".btn.btn-primary.btn-block");
	await wait;

	let otp;

	if (args["--otp"]) {
		otp = args["--otp"];
	} else {
		const response = await prompts({
			type: "text",
			name: "otp",
			message: "Enter OTP for GitHub",
		});

		otp = response.otp;
	}

	await page.waitForSelector("#otp");
	await page.type("#otp", otp);
	await page.waitFor(500);
	try {
		await page.click(".btn.btn-primary.btn-block");
		await page.waitForNavigation();
	} catch (error) {}

	for (const issue of issues) {
		await page.goto(issue.html_url);

		const transfer = `[action="${issue.html_url.replace("https://github.com", "")}/transfer"]`;

		await page.waitForSelector(transfer);
		await page.click(transfer);

		await page.waitForSelector(`${transfer} .select-menu-button`);
		await page.click(`${transfer} .select-menu-button`);

		await page.waitFor(1000);

		await page.waitForSelector('[placeholder="Find a repository"]');
		await page.type('[placeholder="Find a repository"]', args["--to"]);

		await page.waitFor(2000);

		await page.waitForSelector("#transfer-possible-repositories-menu .select-menu-item");
		await page.click("#transfer-possible-repositories-menu .select-menu-item");

		await page.waitForSelector('[data-disable-with="Transferring issue…"');
		await page.click('[data-disable-with="Transferring issue…"');
		await page.waitFor(500);
	}
}

main();
