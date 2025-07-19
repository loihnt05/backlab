#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const task_manager_1 = require("./task-manager");
const program = new commander_1.Command();
program
    .name('task')
    .description('Task Tracker CLI')
    .version('1.0.0');
program
    .command('add')
    .argument('<title>', 'Tiêu đề task')
    .description('Thêm task mới')
    .action(title => {
    (0, task_manager_1.addTask)(title);
});
program
    .command('list')
    .description('Liệt kê tất cả task')
    .action(() => {
    (0, task_manager_1.listTasks)();
});
program
    .command('done')
    .argument('<id>', 'ID task để hoàn thành')
    .description('Đánh dấu task đã hoàn thành')
    .action(id => {
    (0, task_manager_1.completeTask)(Number(id));
});
program
    .command('delete')
    .argument('<id>', 'ID task cần xoá')
    .description('Xoá task')
    .action(id => {
    (0, task_manager_1.deleteTask)(Number(id));
});
program.parse();
