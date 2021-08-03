const fetch = require("node-fetch")
class GithubNotionSync{
  constructor(config, github_org){
    this.github_auth = config.github_auth;
    this.notion_auth = config.notion_auth;
    this.org = github_org
  }

  async getAllIssues (){

  }
}
