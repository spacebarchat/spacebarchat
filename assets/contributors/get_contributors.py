import requests
import json
from config import auth

config = {
    "org_name": "fosscord",
    "auth": auth
}
headers = {
    "Authorization": f"token {config['auth']}",
	  "User-Agent": config['org_name'],
}
urls = {
    "base":f"https://api.github.com/orgs/{config['org_name']}",
    "all_repos":f"/repos",
}
contributors = []
contributors_names = ["flam3rboy","xnacly","intevel","stefan080106","timschweiz"]
def get_contributors_url(n):
    if n["fork"]:
        # * excludes forks
        return "none"
    return n["contributors_url"]

repos = requests.get(f"{urls['base']}{urls['all_repos']}", headers=headers).json()
repos = list(map(get_contributors_url, repos))

def format_contributor(n):
  return {
    "login": n["login"],
    "html_url": n["html_url"],
    "avatar_url": n["avatar_url"],

  }


for repo in repos:
    if repo == "none":
      continue
    contr = requests.get(repo, headers=headers).json()
    contr = list(map(format_contributor, contr))
    for cont in contr:
      if not cont["login"].lower() in contributors_names:
        if not cont["login"] == "actions-user":
          contributors_names.append(cont["login"].lower())
          contributors.append(cont)
        else : 
          continue 
      else:
        continue

with open("contributors.json","w") as f:
  f.write(json.dumps(contributors, indent=4))