import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import ora from "ora";
import { readConfig, writeConfig } from "./lib/util.mjs";

// Command handlers
import { backlog } from "./lib/commands/backlog.mjs";
import { todo } from "./lib/commands/todo.mjs";
import { current } from "./lib/commands/current.mjs";
import { done } from "./lib/commands/done.mjs";
import { donow } from "./lib/commands/donow.mjs";
import { inspire } from "./lib/commands/inspire.mjs";
import { score } from "./lib/commands/score.mjs";
import { skip } from "./lib/commands/skip.mjs";
import { help } from "./lib/commands/help.mjs";
import { deleteTodos } from "./lib/commands/deleteTodos.mjs";

// Constants
const commands = [
  "/help",
  "/delete",
  "/backlog",
  "/todo",
  "/current",
  "/done",
  "/donow",
  "/inspire",
  "/score",
  "/skip",
  "/quit",
  "/exit",
  "/q",
  "/stop",
  "/kill"
];

const commandMap = {
  "/help": help,
  "/backlog": backlog,
  "/todo": todo,
  "/current": current,
  "/done": done,
  "/donow": donow,
  "/inspire": inspire,
  "/score": score,
  "/skip": skip,
  "/delete": deleteTodos,
  "/remove": deleteTodos
};

const init = async () => {
  // clear the console
  console.clear();
  // Small figlet to welcome user
  console.log(
    chalk.blueBright(
      figlet.textSync("Get Shit Done", {
        font: "avatar",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
  console.log(
    chalk.blueBright(
      `Welcome to the Todo App. Type /help for a list of commands. Press control + c to close.`
    )
  );

  // Check for an OpenAI API Key in the config file
  let config = readConfig();
  const APIKey = config?.apiKey;
  if (!APIKey) {
    // Prompt the user for the key
    const { key } = await inquirer.prompt({
      name: "key",
      message: "Please enter your OpenAI API Key:",
      type: "input"
    });
    config.apiKey = key;
    writeConfig(config);
  }
};

// Main app loop
const main = async () => {
  await init();
  while (true) {
    let { command } = await inquirer.prompt({
      name: "command",
      message: "🧠 >",
      type: "input"
    });

    command = command.trim().toLowerCase();

    if (
      command === "quit" ||
      command === "exit" ||
      command === "q" ||
      command === "stop" ||
      command === "kill"
    ) {
      break;
    }

    // Catch help with no /
    if (command === "help") {
      command = "/help";
    }

    // Treat no command as todo
    if (command[0] !== "/") {
      command = `/todo ${command}`;
    }

    // Get slash command from command
    const slashCommand = command.split(" ")[0];
    // Args are everything after the first space
    const args = command.split(" ").slice(1).join(" ");

    // Check if command is valid
    if (!commands.includes(slashCommand)) {
      console.log(`Invalid command: ${slashCommand}`);
      console.log(`Try /help for a list of commands`);
      continue;
    }

    // Handle command
    // Start spinner
    const spinner = ora().start();
    try {
      // Run command
      await commandMap[slashCommand](args, spinner);
    } catch (err) {
      spinner.fail(chalk.red(err));
    }
    // Stop the spinner if it's still running
    if (spinner.isSpinning) {
      spinner.stop();
    }
  }
};

main()
  .catch((err) => {
    console.log(chalk.red(err));
  })
  .finally(() => {
    console.log(chalk.blueBright("Goodbye!"));
  });
