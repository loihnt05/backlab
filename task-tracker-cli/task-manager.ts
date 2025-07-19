import fs from 'fs';

export type Task = { id: number; title: string; completed: boolean };

const file = 'tasks.json';

export const loadTasks = (): Task[] => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

export const saveTasks = (tasks: Task[]) => {
  fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
};

export const addTask = (title: string) => {
  const tasks = loadTasks();
  tasks.push({ id: Date.now(), title, completed: false });
  saveTasks(tasks);
  console.log(`Đã thêm: ${title}`);
};

export const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach(task => {
    const status = task.completed ? '✔' : ' ';
    console.log(`[${status}] ${task.id}: ${task.title}`);
  });
};

export const completeTask = (id: number) => {
  const tasks = loadTasks();
  const updated = tasks.map(t =>
    t.id === id ? { ...t, completed: true } : t
  );
  saveTasks(updated);
  console.log(`Đã hoàn thành task ${id}`);
};

export const deleteTask = (id: number) => {
  const tasks = loadTasks().filter(t => t.id !== id);
  saveTasks(tasks);
  console.log(`Đã xoá task ${id}`);
};
