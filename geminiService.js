import { GoogleGenAI } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from './constants.js';

// API key MUST be obtained from process.env.API_KEY.
// Assumes process.env.API_KEY is pre-configured and accessible in the execution context.
// In a browser, this means window.process.env.API_KEY should be set by an external mechanism.
const API_KEY = (typeof process !== 'undefined' && process.env && process.env.API_KEY) 
                ? process.env.API_KEY 
                : (typeof window !== 'undefined' && window.process && window.process.env && window.process.env.API_KEY)
                  ? window.process.env.API_KEY
                  : null;

let ai;
if (API_KEY && API_KEY !== "MISSING_API_KEY") {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.error("Gemini API Key not found or is placeholder. Please ensure process.env.API_KEY is set correctly.");
}

export function isApiKeyAvailable() {
  return !!(API_KEY && API_KEY !== "MISSING_API_KEY");
}

export const createChatSession = () => {
  if (!ai) {
    console.error("Gemini AI client not initialized. API Key might be missing.");
    return null;
  }
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash-preview-04-17',
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
      },
    });
    return chat;
  } catch (error) {
    console.error("Failed to create chat session:", error);
    return null;
  }
};

export const sendMessageToGemini = async (chat, message) => {
  if (!ai) {
    return "Error: Gemini AI client not initialized. API Key might be missing.";
  }
  if (!chat) {
    return "Error: Chat session not available.";
  }
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    if (error instanceof Error) {
        return `Sorry, I encountered an error: ${error.message}. Please try again later.`;
    }
    return "Sorry, I encountered an unknown error. Please try again later.";
  }
};

// Note: generateImageWithGemini and askOneOffQuestionToGemini are not currently used by the UI
// but are kept for potential future use or reference, adapted from the original.
export const generateImageWithGemini = async (prompt) => {
  if (!ai) {
    console.error("API Key not found for image generation.");
    return null;
  }
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {numberOfImages: 1, outputMimeType: 'image/jpeg'},
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    return null;
  }
};

export const askOneOffQuestionToGemini = async (question) => {
  if (!ai) {
    return "Error: Gemini AI client not initialized. API Key might be missing.";
  }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: question,
        config: {
            systemInstruction: GEMINI_SYSTEM_INSTRUCTION
        }
    });
    return response.text;
  } catch (error) {
    console.error('Error asking question to Gemini:', error);
    if (error instanceof Error) {
        return `Sorry, I encountered an error: ${error.message}. Please try again.`;
    }
    return "Sorry, I encountered an unknown error. Please try again.";
  }
};
