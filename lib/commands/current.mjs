import { writeDatabase, readDatabase, printTodo } from "../util.mjs";
import { generateTodo } from "../generateTodo.mjs";

export const current = async (args, spinner) => {
  // Check if there is a current todo set in the database
  let db = readDatabase();
  const currentTodo = db?.current;
  if (currentTodo?.title && currentTodo?.priority && currentTodo?.description) {
    // If there is, print it
    spinner.stop();
    printTodo(currentTodo);
    return;
  }

  let todos = db.todo;
  let todo;
  if (todos.length > 0) {
    // Get the todo with the highest priority
    todo = todos.reduce((acc, todo) => {
      if (todo.priority > acc.priority) {
        return todo;
      }
      return acc;
    });
    db.todo = todos.filter((t) => t !== todo);
  } else {
    // Or generate one
    todo = await generateTodo();
  }

  // Set the current todo in the database
  db.current = todo;

  writeDatabase(db);

  spinner.stop();

  // Print the todo
  printTodo(todo);
  return;
};
