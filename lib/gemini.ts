import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY가 설정되지 않았습니다.");
}

export const GEMINI_MODEL = "gemini-3.5-flash-lite";

export const GEMINI_CONFIG = {
    temperature: 0,
    maxOutputTokens: 200,
} as const;

export const gemini = new GoogleGenAI({
    apiKey,
});
