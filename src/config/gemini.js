import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = import.meta.env.VITE_MODEL_NAME;
const API_KEY = import.meta.env.VITE_MODEL_API_KEY;

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Check if the user's prompt is asking for the bot's name
  const askingForBotName =
    prompt.toLowerCase().includes("bot's name") ||
    prompt.toLowerCase().includes("what's your name?");

  // If the user is asking for the bot's name, respond with the bot's name
  if (askingForBotName) {
    const botNameResponse =
      "My name is nikki.ai from Luxeenet platform.";
    console.log(botNameResponse);
    return botNameResponse;
  }

  // Concatenate additional text with the user prompt
  const concatenatedPrompt = "Additional text: " + prompt;

  // If the prompt is not about the bot's name, proceed with the regular chat process
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(concatenatedPrompt); // Use the concatenated prompt
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default runChat;

