# Task Tracker CLI

## Requirement 

- Add, Update, and Delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress

## Implementation


- You can use any programming language to build this project.
- Use positional arguments in command line to accept user inputs.
- Use a JSON file to store the tasks in the current directory.
- The JSON file should be created if it does not exist.
- Use the native file system module of your programming language to interact with the JSON file.
- Do not use any external libraries or frameworks to build this project.
- Ensure to handle errors and edge cases gracefully.

## Conduct task with CLI
- Install commander ```pnpm add commander``` or ```pnpm add -D @types/commander```

- Add bin into package.json to build task:
```json
"bin": {
  "task": "dist/task.js"
}
```

- Write in a head of task.ts ```#!/usr/bin/env node``` 

- ```ts.config.json ``` like 
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "./",
    "esModuleInterop": true
  },
  "include": ["task.ts", "taskManager.ts"]
}
```
- Compile code from .ts to .js to run ```npx tsc ```
- Grant execution permission ```chmod +x dist/task.js```

- Link to global file ```npm link```

## How to use Task Tracker CLI

```json
task-cli add "new task" // create new task
task-cli update "1" -d "new change" -s "done" // update description and status by id
task-cli delete "2" // delete task by id
task-cli list // all tasks
```