# Github User Activity CLI 

## Requirement 

- Provide the GitHub username as an argument when running the CLI. 
- Fetch the recent activity of the specified GitHub user using the GitHub API. 
- Display the fetched activity in the terminal. 

## Implementation

- Handle errors gracefully, such as invalid usernames or API failures.
- Use a programming language of your choice to build this project.
- Do not use any external libraries or frameworks to fetch the GitHub activity.

## Conduct task with CLI

```json
mkdir github-user-activity
cd github-user-activity
npm init -y
npm install axios chalk commander // axios (api), chalk (color terminal), commander (cli)
```

- ```#!/usr/bin/env node``` add into index.js


```json
"bin": {
  "github-activity": "./index.js"
}
```

```
chmod +x index.js
npm link
```

- ```"type": "module"``` package.json change ```commonjs```