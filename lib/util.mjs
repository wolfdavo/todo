import fs from "fs";
import chalk from "chalk";

export const readDatabase = () => {
  // Read the local database.json file and return it as a JavaScript object
  const database = fs.readFileSync("./database.json", "utf8");
  return JSON.parse(database);
};

export const writeDatabase = (database) => {
  // Write the in-memory database object to the local database.json file
  fs.writeFileSync("./database.json", JSON.stringify(database));
  return;
};

export const readConfig = () => {
  // Read the local config.json file and return it as a JavaScript object
  const config = fs.readFileSync("./config.json", "utf8");
  return JSON.parse(config);
};

export const writeConfig = (config) => {
  // Write the in-memory config object to the local config.json file
  fs.writeFileSync("./config.json", JSON.stringify(config));
  return;
};

export const blueLog = (text) => {
  // Log text in blue
  console.log(chalk.blueBright(text));
  return;
};

export const printTodo = (todo) => {
  // Print a todo to the console
  // A todo has a title, description, and priority
  console.log(chalk.blueBright(todo.title));
  console.log(chalk.italic.whiteBright(todo.description));
  console.log(chalk.greenBright(`Priority: ${todo.priority}`));
  return;
};
