import chalk from "chalk";

export const help = (args, spinner) => {
  // Print the help message
  spinner.stop();
  console.log(chalk.bgWhite.black(` Commands: \n`));

  // Todo
  console.log(chalk.blueBright(`  /todo [item]`));
  console.log(chalk.italic.white(`  Add a todo item`));
  console.log(`\n`);

  // Backlog
  console.log(chalk.blueBright(`  /backlog`));
  console.log(chalk.italic.white(`  View the backlog`));
  console.log(`\n`);

  // Delete
  console.log(chalk.blueBright(`  /delete`));
  console.log(chalk.italic.white(`  Delete todo item(s)`));
  console.log(`\n`);

  // Current
  console.log(chalk.blueBright(`  /current`));
  console.log(chalk.italic.white(`  View the current todo`));
  console.log(`\n`);

  // Done
  console.log(chalk.blueBright(`  /done`));
  console.log(chalk.italic.white(`  Mark the current todo as done`));
  console.log(`\n`);

  // Do Now
  console.log(chalk.blueBright(`  /donow`));
  console.log(chalk.italic.white(`  Select a new todo`));
  console.log(`\n`);

  // Skip
  console.log(chalk.blueBright(`  /skip`));
  console.log(chalk.italic.white(`  Skip the current todo`));
  console.log(`\n`);

  // Inspire
  console.log(chalk.blueBright(`  /inspire`));
  console.log(chalk.italic.white(`  Get a personalized inspirational quote`));
  console.log(`\n`);

  // Score
  console.log(chalk.blueBright(`  /score`));
  console.log(chalk.italic.white(`  View your score`));
  console.log(`\n`);
  return;
};
