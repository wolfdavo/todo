import { gpt4 } from "./ai.mjs";

export const generateTodo = async () => {
  const q = `YOUR TASK: Generate a new todo for the user. Any todos that you generate should have a ✨ emoji at the end of the title. Return the todo object as stringified json. Your output will be used to update the todo list. \n\nOUTPUT:`;

  const rawTodo = await gpt4(q);
  const todo = JSON.parse(rawTodo);

  return todo;
};
