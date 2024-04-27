import axios from "axios";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Define Gemini API URL and API key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = "AIzaSyDyruRnKA92b58NESc7tpSaw3tFh6ULY5Y"; // Replace with your actual Gemini API key

// Function to analyze the prompt using the Gemini API
async function analyzePrompt(prompt) {
  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, { prompt });
    return response.data.isBotNameQuestion;
  } catch (error) {
    console.error("Error analyzing prompt:", error);
    return false; // Assume it's not a bot's name question if analysis fails
  }
}

// Function to run the chat
async function runChat(prompt) {
  try {
    // Analyze the prompt using the Gemini API
    const isBotNameQuestion = await analyzePrompt(prompt);

    // If the prompt is asking for the bot's name, respond accordingly
    if (isBotNameQuestion) {
      const botNameResponse =
        `My name is nikki.ai developed by Luxeenet platform from Magomeni, Dar es Salaam, Tanzania. ${prompt}`;
      console.log(botNameResponse);
      return botNameResponse;
    }

    // If the prompt is not about the bot's name, proceed with the regular chat process
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: import.meta.env.VITE_MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
  } catch (error) {
    console.error("Error running chat:", error);
    return "Oops! Something went wrong. Please try again later.";
  }
}

export default runChat;

