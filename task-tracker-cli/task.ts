#!/usr/bin/env node
import { Command } from 'commander';
import {
  addTask,
  listTasks,
  completeTask,
  deleteTask,
} from './task-manager';

const program = new Command();

program
  .name('task')
  .description('Task Tracker CLI')
  .version('1.0.0');

program
  .command('add')
  .argument('<title>', 'Task Title')
  .description('Add new task')
  .action(title => {
    addTask(title);
  });

program
  .command('list')
  .description('List all of tasks')
  .action(() => {
    listTasks();
  });

program
  .command('done')
  .argument('<id>', 'ID task done')
  .description('Check task done')
  .action(id => {
    completeTask(Number(id));
  });

program
  .command('delete')
  .argument('<id>', 'ID task remove')
  .description('Remove task by ID')
  .action(id => {
    deleteTask(Number(id));
  });

program.parse();
