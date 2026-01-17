
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
} else {
    console.error("GEMINI_API_KEY is not set in environment variables.");
}

export const generateResponse = async (prompt: string, context: string = ""): Promise<string> => {
    if (!model) {
        throw new Error("Gemini AI is not initialized. Check GEMINI_API_KEY.");
    }

    try {
        const fullPrompt = `${context}\n\nUser Question: ${prompt}`;
        const result = await model.generateContent(fullPrompt);
        return result.response.text();
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw new Error("Failed to generate response from AI.");
    }
};
