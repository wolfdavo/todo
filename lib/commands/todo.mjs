import chalk from "chalk";
import { readDatabase, writeDatabase } from "../util.mjs";
import { gpt4 } from "../ai.mjs";

export const todo = async (arg, spinner) => {
  // Check if the todo is empty
  if (!arg) {
    spinner.fail(chalk.redBright("Please provide a todo"));
    return;
  }

  // Use GPT-4 to format the todo
  const q = `YOUR TASK: Format this natual language message into a proper todo json object that can be added to the todo array. Use your creativity, and format it in a nice way with a meaningful priority score that reflects the user's goals. Your output should be a JSON object. \n\nINPUT: ${arg}\n\nOUTPUT:`;

  const rawTodo = await gpt4(q);
  const formattedTodo = JSON.parse(rawTodo);

  // Save the todo to the database
  let db = readDatabase();
  db.todo.push(formattedTodo);
  writeDatabase(db);
  spinner.succeed(chalk.blueBright("Added to the backlog 📝"));
  return;
};
