
import { Request, Response } from 'express';
import { generateResponse } from '../services/aiService';

export const chatWithAI = async (req: Request, res: Response) => {
    try {
        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message is required." });
        }

        // Basic system instruction to guide the AI
        const systemInstruction = `You are an expert admission counselor for MHT-CET and JEE students in Maharashtra. 
        Provide helpful, accurate, and encouraging advice. 
        If you don't know something, admit it. 
        Keep responses concise unless asked for details.`;

        const finalContext = context ? `${systemInstruction}\nContext: ${context}` : systemInstruction;

        const response = await generateResponse(message, finalContext);

        return res.json({ response });
    } catch (error: any) {
        console.error("AI Chat Error:", error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};
