#!/usr/bin/env node
import readline from 'node:readline';
let guessingNumber;
let choice = 1;
const random = Math.floor(Math.random() * 100) + 1;
console.log(random)//

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("Welcome to the Number Guessing Game!");
console.log("I'm thinking of a number between 1 and 100.");
console.log("You have the number of chances to guess the correct number.");

console.log("\nPlease select the difficulty level");
console.log("1. Easy (10 chances) - default");
console.log("2. Medium (5 chances)");
console.log("3. Hard (3 chances)");

rl.question("\nEnter your choice: ", (answer) => {
  if (answer) choice = parseInt(answer);
  rl.close();
});

console.log(`Great! You have selected the ${choice} difficulty level.`);
console.log("Let's start the game!");

for (let i = 1; i <= Math.floor(10 / choice); ++i) {
  rl.question("\nEnter your guess: ", (answer) => {
    guessingNumber = parseInt(answer);
    if (guessingNumber === random) {
        console.log("Congratulations! You guessed the correct number in ${i} attempts.")
        return;
    } else {
        console.log(`Incorrect! The number is ${(guessingNumber < random) ? "less" : "greater"} than ${guessingNumber}.`)
    }
    rl.close();
  });
}

