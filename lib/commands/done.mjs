import { blueLog, readDatabase, writeDatabase } from "../util.mjs";
import { current } from "./current.mjs";

export const done = async (args, spinner) => {
  // Mark the current Todo as done
  const db = readDatabase();
  const currentTodo = db?.current;
  if (!currentTodo) {
    console.log("No current todo");
    return;
  }

  // Move the current todo to the done list
  db.done.push(currentTodo);
  db.current = undefined;

  // Write the database
  writeDatabase(db);
  blueLog(`Marked ${currentTodo.title} as done ✅`);
  blueLog("Next todo:");
  await current("", spinner);
  return;
};
