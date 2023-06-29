import { readDatabase, writeDatabase } from "../util.mjs";
import inquirer from "inquirer";
import chalk from "chalk";

export const deleteTodos = async (args, spinner) => {
  // We want the user to select the todos to delete
  const db = readDatabase();
  spinner.stop();
  const choices = db.todo.map((item) => {
    return {
      name: item.title,
      value: item
    };
  });
  const answers = await inquirer.prompt([
    {
      type: "checkbox",
      name: "todosToDelete",
      message: "Select the todos to delete",
      choices: choices
    }
  ]);
  // Filter the todos to delete from the database
  const todosToDelete = answers.todosToDelete;
  const newTodo = db.todo.filter((item) => {
    return !todosToDelete.includes(item);
  });
  db.todo = newTodo;
  // Write the database
  writeDatabase(db);
  console.log(chalk.blueBright("Deleted todos 🗑"));
};
