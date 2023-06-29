import { Configuration, OpenAIApi } from "openai";
import { readConfig } from "./util.mjs";
import { getContext } from "./context.mjs";
const { apiKey } = readConfig();

const configuration = new Configuration({
  apiKey
});

const ai = new OpenAIApi(configuration);

export const gpt4 = async (query) => {
  try {
    // First we need to get the base message
    const context = getContext();

    // Now we can send a request to OpenAI
    const completion = await ai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: context },
        { role: "user", content: query }
      ]
    });

    // Extract the response from the completion
    const response = completion.data.choices[0].message.content;

    // Return the response
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default ai;
