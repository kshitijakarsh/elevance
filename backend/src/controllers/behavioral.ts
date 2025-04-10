import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function behavioralInterview(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText, transcript } = req.body;

    if (!resumeText || !transcript) {
      return res.status(400).json({ error: "Missing resume or transcript" });
    }

    const prompt = `
You are an experienced HR interviewer conducting a behavioral interview.

You have access to the candidate's resume and their latest response in the conversation.

Your task is:
- Begin with a warm, thoughtful acknowledgment of the candidate’s previous answer.
- Then ask a thoughtful, challenging **behavioral** follow-up question.
- Keep the tone friendly and conversational, but insightful.
- Avoid repeating any earlier questions.
- Do not evaluate or explain anything.
- Do not include section headers, markdown, or labels — just the plain conversational message.

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
    console.error("Behavioral Interview error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
