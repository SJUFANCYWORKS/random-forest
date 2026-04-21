import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const askTutor = async (question: string) => {
  if (!process.env.GEMINI_API_KEY) return "API Key not configured. Please set GEMINI_API_KEY.";
  
  try {
    const prompt = `You are a friendly AI tutor helping a student learn about Random Forest machine learning. 
    Explain concepts simply, use analogies (like a forest of trees, voting, etc.), and be encouraging.
    
    Student asks: ${question}`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain right now. Can you try again later?";
  }
};
