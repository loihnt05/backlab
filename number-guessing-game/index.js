#!/usr/bin/env node
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
const random = Math.floor(Math.random() * 100) + 1;

console.log("Welcome to the Number Guessing Game!");
console.log("I'm thinking of a number between 1 and 100.");
console.log("You have the number of chances to guess the correct number.");

console.log("\nPlease select the difficulty level");
console.log("1. Easy (10 chances) - default");
console.log("2. Medium (5 chances)");
console.log("3. Hard (3 chances)");

let choiceStr = await rl.question("\nEnter your choice: ");
let choice = parseInt(choiceStr);
if (![1, 2, 3].includes(choice)) choice = 1;

let attempts = choice === 1 ? 10 : choice === 2 ? 5 : 3;
console.log(`\nGreat! You have selected level ${choice}. You have ${attempts} chances.`);
console.log("Let's start the game!");

for (let i = 1; i <= attempts; ++i) {
  let guessStr = await rl.question(`\nAttempt ${i}: Enter your guess: `);
  let guess = parseInt(guessStr);

  if (guess === random) {
    console.log(`Congratulations! You guessed the correct number in ${i} attempts.`);
    rl.close();
    process.exit(0); 
  } else {
    console.log(`Incorrect! The number is ${(guess < random) ? "greater" : "less"} than ${guess}.`);
  }
}

console.log(`\nGame over! The correct number was ${random}`);
rl.close();
