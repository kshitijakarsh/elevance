import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function systemDesignInterview(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText, transcript } = req.body;

    if (!resumeText || !transcript) {
      return res.status(400).json({ error: "Missing resume or transcript" });
    }

    const prompt = `
You are a senior engineer conducting a **System Design** interview.

You have the candidate’s resume and their latest answer. You are assessing:
- **Architectural thinking**
- **Scalability & performance**
- **Trade-offs**
- **Clarity of communication**

Your task:
- Start with a professional, engaging follow-up to their previous answer.
- Then ask a system design question that is either:
  1. Inspired by their resume (e.g., if they worked on messaging apps, ask about designing one),
  2. A classic scalable system (e.g., design Twitter feed, Uber backend, etc.)

Avoid repetition. Ask only one clean, focused design question. Keep it human and practical.

Resume:
"""
${resumeText}
"""

Candidate’s Latest Answer:
"""
${transcript}
"""

Your response:
    `;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = await aiResponse.text;

    if (!text) {
      throw new Error("No response text from Gemini.");
    }

    res.status(200).json({ success: true, result: text });
  } catch (error) {
    console.error("System Design Interview Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
