
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, RiskTier, UserBio } from "../types";
import { SYSTEM_INSTRUCTIONS } from "../constants";

// Initialize Gemini API client using the environment variable directly as per SDK guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMeghanResponse = async (
  history: ChatMessage[], 
  tier: RiskTier, 
  mood: string, 
  source: string,
  bio: UserBio
) => {
  // Use ai.models.generateContent directly to perform the request.
  // When maxOutputTokens is set, thinkingBudget must also be defined to avoid empty responses.
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: history.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    })),
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS(tier, mood, source, bio),
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 500,
      thinkingConfig: { thinkingBudget: 200 },
    },
  });

  // Access the .text property of GenerateContentResponse directly (not a function call).
  return response.text || "I'm here for you. Take a deep breath.";
};
