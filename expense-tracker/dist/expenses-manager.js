import fs from "fs";
import { v4 as uuidv4 } from "uuid";
const file = "expenses.json";
export const loadExpense = () => {
    if (!fs.existsSync(file))
        return [];
    return JSON.parse(fs.readFileSync(file, "utf-8"));
};
export const saveExpense = (expenses) => {
    fs.writeFileSync(file, JSON.stringify(expenses, null, 2));
};
export const addExpense = (description, amount) => {
    const expenses = loadExpense();
    expenses.push({
        id: uuidv4(),
        amount,
        description,
        date: new Date(),
    });
    try {
        saveExpense(expenses);
        console.log(`Add ${description} successful`);
    }
    catch {
        console.log("Adding new expense fail~");
    }
};
export const removeExpense = (id) => {
    const expenses = loadExpense().filter((ex) => ex.id !== id);
    try {
        saveExpense(expenses);
        console.log(`Remove ${id}`);
    }
    catch {
        console.log("Remove expense fail");
    }
};
