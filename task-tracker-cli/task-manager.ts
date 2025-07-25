import fs from "fs";
import { v4 as uuidv4 } from "uuid";
type Status = "todo" | "in-progress" | "done";
export type Task = {
  id: string;
  description: string;
  status: Status;
  createAt: Date;
  updatedAt: Date;
};

const file = "tasks.json";

export const loadTasks = (): Task[] => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8"));
};

export const saveTasks = (tasks: Task[]) => {
  fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
};

export const addTask = (description: string) => {
  const tasks = loadTasks();
  tasks.push({
    id: uuidv4(),
    description,
    status: "todo",
    createAt: new Date(),
    updatedAt: new Date(),
  });
  saveTasks(tasks);
  console.log(`Added: ${description}`);
};

export const deleteTask = (id: string) => {
  const tasks = loadTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
  console.log(`Removed ${id}`);
};

export const updateTask = (
  id: string,
  updates: {
    description?: string;
    status?: Status;
  }
) => {
  const tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (updates.description) tasks[index].description = updates.description;
  if (updates.status) tasks[index].status = updates.status;
  tasks[index].updatedAt = new Date();
  saveTasks(tasks);
  console.log(`Saved task ${id}`);
};

export const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((task) => {
    console.log(
      `[${task.status}] ${task.id}: ${task.description}\nCreated: ${task.createAt}\nUpdated: ${task.updatedAt}\n`
    );
  });
};

export const listTasksDone = () => {
  const tasks = loadTasks().filter((t) => t.status === "done");
  tasks.forEach((task) => {
    console.log(
      `[${task.status}] ${task.id}: ${task.description}\nCreated: ${task.createAt}\nUpdated: ${task.updatedAt}\n`
    );
  });
};

export const listTasksInProgess = () => {
  const tasks = loadTasks().filter((t) => t.status === "in-progress");
  tasks.forEach((task) => {
    console.log(
      `[${task.status}] ${task.id}: ${task.description}\nCreated: ${task.createAt}\nUpdated: ${task.updatedAt}\n`
    );
  });
};

export const listTasksTodo = () => {
  const tasks = loadTasks().filter((t) => t.status === "todo");
  tasks.forEach((task) => {
    console.log(
      `[${task.status}] ${task.id}: ${task.description}\nCreated: ${task.createAt}\nUpdated: ${task.updatedAt}\n`
    );
  });
};
