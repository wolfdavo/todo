import chalk from "chalk";
import { printTodo, readDatabase } from "../util.mjs";

export const backlog = (args, spinner) => {
  // Read the database and print the backlog
  const db = readDatabase();
  spinner.stop();
  console.log(chalk.bold.blueBright("Backlog:"));
  console.log("");
  db.todo.forEach((item) => {
    printTodo(item);
    // Print a line break
    console.log("");
  });
  return;
};
