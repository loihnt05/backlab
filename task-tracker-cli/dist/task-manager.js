"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.completeTask = exports.listTasks = exports.addTask = exports.saveTasks = exports.loadTasks = void 0;
const fs_1 = __importDefault(require("fs"));
const file = 'tasks.json';
const loadTasks = () => {
    if (!fs_1.default.existsSync(file))
        return [];
    return JSON.parse(fs_1.default.readFileSync(file, 'utf-8'));
};
exports.loadTasks = loadTasks;
const saveTasks = (tasks) => {
    fs_1.default.writeFileSync(file, JSON.stringify(tasks, null, 2));
};
exports.saveTasks = saveTasks;
const addTask = (title) => {
    const tasks = (0, exports.loadTasks)();
    tasks.push({ id: Date.now(), title, completed: false });
    (0, exports.saveTasks)(tasks);
    console.log(`Đã thêm: ${title}`);
};
exports.addTask = addTask;
const listTasks = () => {
    const tasks = (0, exports.loadTasks)();
    tasks.forEach(task => {
        const status = task.completed ? '✔' : ' ';
        console.log(`[${status}] ${task.id}: ${task.title}`);
    });
};
exports.listTasks = listTasks;
const completeTask = (id) => {
    const tasks = (0, exports.loadTasks)();
    const updated = tasks.map(t => t.id === id ? { ...t, completed: true } : t);
    (0, exports.saveTasks)(updated);
    console.log(`Đã hoàn thành task ${id}`);
};
exports.completeTask = completeTask;
const deleteTask = (id) => {
    const tasks = (0, exports.loadTasks)().filter(t => t.id !== id);
    (0, exports.saveTasks)(tasks);
    console.log(`Đã xoá task ${id}`);
};
exports.deleteTask = deleteTask;
