#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const task_manager_1 = require("./task-manager");
const program = new commander_1.Command();
program.name("task").description("Task Tracker CLI").version("1.0.0");
program
    .command("add")
    .argument("<title>", "Task Title")
    .description("Add new task")
    .action((title) => {
    (0, task_manager_1.addTask)(title);
});
program
    .command("list")
    .description("List all of tasks")
    .option("-d, --done", "All of tasks done")
    .option("-t, --todo", "All of tasks todo")
    .option("-i, --in-progress", "All of tasks in progress")
    .action((options) => {
    if (options.done) {
        (0, task_manager_1.listTasksDone)();
    }
    else if (options.todo) {
        (0, task_manager_1.listTasksTodo)();
    }
    else if (options.inProgress) {
        (0, task_manager_1.listTasksInProgess)();
    }
    else {
        (0, task_manager_1.listTasks)();
    }
});
program
    .command("delete")
    .argument("<id>", "ID task remove")
    .description("Remove task by ID")
    .action((id) => {
    (0, task_manager_1.deleteTask)(String(id));
});
program
    .command('update')
    .argument('<id>', 'ID task to update')
    .option('-d, --description <desc>', 'Description of task')
    .option('-s, --status <status>', 'Status of task')
    .description('Update task by ID')
    .action((id, options) => {
    const updates = {};
    if (options.description) {
        updates.description = options.description;
    }
    if (options.status) {
        updates.status = options.status;
    }
    if (Object.keys(updates).length === 0) {
        console.log('No update fields provided. Use -d or -s.');
        return;
    }
    (0, task_manager_1.updateTask)(id, updates);
});
program.parse();
