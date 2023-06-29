import { gpt4 } from "../ai.mjs";
import { blueLog } from "../util.mjs";

export const inspire = async (args, spinner) => {
  // Use GPT-4 to generate a random inspirational quote
  const q = `Your task: Inspire the user. \n\nOUTPUT:`;
  const quote = await gpt4(q);
  spinner.stop();

  // Log the quote
  blueLog(quote);
  return;
};
