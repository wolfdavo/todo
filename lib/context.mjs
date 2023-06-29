import fs from "fs";
import { readDatabase } from "./util.mjs";

export const getContext = () => {
  // Context is a long string that gives GPT4 information needed to
  // prioritize todos and suggest new ones

  // 1. The current time and date
  const CUR_TIME_AND_DATE = new Date().toString();

  // 2. A summary of what we are expecting from GPT4
  const CORNERSTONE = `You are being used within an extremely smart Todo App as a part of the backend. You are to respond exactly as you are instructed. There is a user expecting the software which you are apart of to function correctly. You are not being used as a chatbot. Do not try to be conversational, as it could result in unexpected responses from you.`;

  // Common models
  const COMMON_MODELS = `
  Some common things you will need to know:
   - A todo is an object that contains a title, description, and a priority score of 1 - 100.
   - The priority score is a number that represents how important a todo is. The higher the number, the more important the todo.
   - If you are tasked with creating new todos for the user, they must be able to be completed in a small amount of time. The user does not want to be overwhelmed with too many todos, or todos that are abstract and not "tickable". Keep them short and sweet. It's ok if they are just a small step towards a bigger goal.
    - If you are tasked with suggesting new todos for the user, you should take into account the users current todos, goals, strengths and weaknesses, and network.

  `;

  // 3. The users goals
  // Read the goals from the txt file
  const USER_GOALS_RAW = fs.readFileSync("info/myGoals.txt", "utf-8");
  const USER_GOALS = `The user has entered their goals into a text file. You should use this to help prioritise tasks and reccomend new tasks that will advance the user towards their goals quickly. Here are the contents of the users goals.txt file:
  -----------start goals.txt-----------
  ${USER_GOALS_RAW}
  ----------end goals.txt-------------
  `;

  // 4. The users strengths and weaknesses
  // Read the strengths and weaknesses from the txt file
  const USER_STRENGTHS_AND_WEAKNESSES_RAW = fs.readFileSync(
    "info/myStrengthsAndWeaknesses.txt",
    "utf-8"
  );
  const USER_STRENGTHS_AND_WEAKNESSES = `The user has entered their strengths and weaknesses into a text file. Here are the contents of the users strengthsAndWeaknesses.txt file:
  -----------start strengthsandweaknesses.txt------------
  ${USER_STRENGTHS_AND_WEAKNESSES_RAW}
  -----------end strengthsandweaknesses.txt------------
  `;

  // 5. The users network (or people he can lean on)
  // Read the network from the txt file
  const USER_NETWORK_RAW = fs.readFileSync("info/myNetwork.txt", "utf-8");
  const USER_NETWORK = `The user has entered their network into a text file. You should use this to advise the user when to delegate, or who to go to advice for. Here are the contents of the users network.txt file:
  ----------start network.txt-------------
  ${USER_NETWORK_RAW}
  ----------end network.txt-------------
  `;

  // 6. The users current todos
  // Read the todos from the database
  const TODOS = readDatabase()?.todo || [];
  const USER_TODOS = `These are the current Todos for the user:
  ----------start TODOS-------------
  ${JSON.stringify(TODOS, null, 2)}
  ----------end TODOS-------------
  `;

  // Done todos
  const DONE_TODOS = readDatabase()?.done || [];
  const USER_DONE_TODOS = `These are the completed Todos for the user:
  ----------start DONE_TODOS-------------
  ${JSON.stringify(DONE_TODOS, null, 2)}
  ----------end DONE_TODOS-------------
  `;

  // Put it all together
  const CONTEXT = `
  Current time and date: ${CUR_TIME_AND_DATE}
  ${CORNERSTONE}
  ${COMMON_MODELS}
  ${USER_GOALS}
  ${USER_STRENGTHS_AND_WEAKNESSES}
  ${USER_NETWORK}
  ${USER_TODOS}
  ${USER_DONE_TODOS}
  `;

  return CONTEXT;
};

console.log(getContext());
