"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTasksTodo = exports.listTasksInProgess = exports.listTasksDone = exports.listTasks = exports.updateTask = exports.deleteTask = exports.addTask = exports.saveTasks = exports.loadTasks = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const file = "tasks.json";
const loadTasks = () => {
    if (!fs_1.default.existsSync(file))
        return [];
    return JSON.parse(fs_1.default.readFileSync(file, "utf-8"));
};
exports.loadTasks = loadTasks;
const saveTasks = (tasks) => {
    fs_1.default.writeFileSync(file, JSON.stringify(tasks, null, 2));
};
exports.saveTasks = saveTasks;
const addTask = (description) => {
    const tasks = (0, exports.loadTasks)();
    tasks.push({
        id: (0, uuid_1.v4)(),
        description,
        status: "todo",
        createAt: new Date(),
        updatedAt: new Date(),
    });
    (0, exports.saveTasks)(tasks);
    console.log(`Added: ${description}`);
};
exports.addTask = addTask;
const deleteTask = (id) => {
    const tasks = (0, exports.loadTasks)().filter((t) => t.id !== id);
    (0, exports.saveTasks)(tasks);
    console.log(`Removed ${id}`);
};
exports.deleteTask = deleteTask;
const updateTask = (id, updates) => {
    const tasks = (0, exports.loadTasks)();
    const index = tasks.findIndex((t) => t.id === id);
    if (updates.description)
        tasks[index].description = updates.description;
    if (updates.status)
        tasks[index].status = updates.status;
    tasks[index].updatedAt = new Date();
    (0, exports.saveTasks)(tasks);
    console.log(`Saved task ${id}`);
};
exports.updateTask = updateTask;
const listTasks = () => {
    const tasks = (0, exports.loadTasks)();
    tasks.forEach((task) => {
        console.log(`[${task.status}] ${task.id}: ${task.description}\nCreated: ${task.createAt}\nUpdated: ${task.updatedAt}\n`);
    });
};
exports.listTasks = listTasks;
const listTasksDone = () => {
    const tasks = (0, exports.loadTasks)().filter((t) => t.status === "done");
    tasks.forEach((task) => {
        console.log(`[${task.status}] ${task.id}: ${task.description}\nCreated: ${task.createAt}\nUpdated: ${task.updatedAt}\n`);
    });
};
exports.listTasksDone = listTasksDone;
const listTasksInProgess = () => {
    const tasks = (0, exports.loadTasks)().filter((t) => t.status === "in-progress");
    tasks.forEach((task) => {
        console.log(`[${task.status}] ${task.id}: ${task.description}\nCreated: ${task.createAt}\nUpdated: ${task.updatedAt}\n`);
    });
};
exports.listTasksInProgess = listTasksInProgess;
const listTasksTodo = () => {
    const tasks = (0, exports.loadTasks)().filter((t) => t.status === "todo");
    tasks.forEach((task) => {
        console.log(`[${task.status}] ${task.id}: ${task.description}\nCreated: ${task.createAt}\nUpdated: ${task.updatedAt}\n`);
    });
};
exports.listTasksTodo = listTasksTodo;
