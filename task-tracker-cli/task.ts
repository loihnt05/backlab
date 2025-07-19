#!/usr/bin/env node
import { Command } from "commander";
import {
  addTask,
  listTasks,
  listTasksDone,
  listTasksInProgess,
  listTasksTodo,
  updateTask,
  deleteTask,
} from "./task-manager";
import { stringToBytes } from "uuid/dist/cjs/v35";

const program = new Command();

program.name("task").description("Task Tracker CLI").version("1.0.0");

program
  .command("add")
  .argument("<title>", "Task Title")
  .description("Add new task")
  .action((title) => {
    addTask(title);
  });

program
  .command("list")
  .description("List all of tasks")
  .option("-d, --done", "All of tasks done")
  .option("-t, --todo", "All of tasks todo")
  .option("-i, --in-progress", "All of tasks in progress")
  .action((options) => {
    if (options.done) {
      listTasksDone();
    } else if (options.todo) {
      listTasksTodo();
    } else if (options.inProgress) {
      listTasksInProgess();
    } else {
      listTasks();
    }
  });

program
  .command("delete")
  .argument("<id>", "ID task remove")
  .description("Remove task by ID")
  .action((id) => {
    deleteTask(String(id));
  });

program.parse();
