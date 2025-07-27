import fs from "fs";
import { v4 as uuidv4, v4 } from "uuid";

const file = "expenses.json";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export const loadExpense = (): Expense[] => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8"));
};

export const saveExpense = (expenses: Expense[]) => {
  fs.writeFileSync(file, JSON.stringify(expenses, null, 2));
};

export const addExpense = (description: string, amount: number) => {
  const expenses = loadExpense();

  expenses.push({
    id: uuidv4(),
    date: new Date(),
    description,
    amount,
  });
  try {
    saveExpense(expenses);
    console.log(`Add ${description} successful`);
  } catch {
    console.log("Adding new expense fail~");
  }
};

export const removeExpense = (id: string) => {
  const expenses = loadExpense().filter((ex) => ex.id !== id);

  try {
    saveExpense(expenses);
    console.log(`Remove ${id}`);
  } catch {
    console.log("Remove expense fail");
  }
};

export const getAllExpense = () => {
  const expenses = loadExpense();

  try {
    if (expenses.length === 0) {
      console.log("No have any expense");
    } else {
      console.log("All Expenses detail");
      console.table(expenses);
    }
  } catch (e) {
    console.log(e);
  }
};

// update
export const updateExpense = (
  id: string,
  description?: string,
  amount?: number
) => {
  const expenses = loadExpense();
  const index = expenses.findIndex((ex) => ex.id === id);
  if (index === -1 ) {
    console.log("Fail")
    return null
  }

  return (expenses[index] = {
    ...expenses[index],
    ...(description !== undefined && { description }),
    ...(amount !== undefined && { amount }),
  });
};

// summary all expenses

// summary all expenses for specific month

// export csv

// add categories -> filter categories
