#!/usr/bin/env node
import { Command } from "commander";
import { addExpense, getAllExpense, removeExpense, updateExpense, } from "./expenses-manager.js";
const program = new Command();
program.name("expense").description("Expenses Tracker").version("1.0.0");
program
    .command("add")
    .description("Add new expense")
    .option("-d, --description <description>", "decription about expense")
    .option("-a, --amount <amount>", "amount about expense")
    .action((options) => {
    try {
        if (!(options.description && options.amount)) {
            throw new Error("Need to fill in description and amount");
        }
        addExpense(options.description, Number(options.amount));
    }
    catch (e) {
        console.log(e);
    }
});
program
    .command("rm")
    .description("Delete Expense")
    .argument("<id>", "id of expense want to delete")
    .action((id) => {
    removeExpense(id);
});
program
    .command("list")
    .description("get all expenses")
    .action(() => getAllExpense());
program
    .command("update")
    .description("update expense by id")
    .argument("<id>", "id to update")
    .option("-d, --description <description>", "description")
    .option("-a, --amount <amount>", "amount")
    .action((id, options) => {
    updateExpense(id, options.description, options.amount);
});
program.parse();
