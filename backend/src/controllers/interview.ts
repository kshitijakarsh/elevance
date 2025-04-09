import { GoogleGenAI } from "@google/genai";
import { GOOGLE_API_KEY } from "../constants";
import type { Request, Response } from "express";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function interview(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText, transcript } = req.body;

    if (!resumeText || !transcript) {
      return res.status(400).json({ error: "Missing resume or transcript" });
    }

    const prompt = `
You are a professional technical interviewer at a top-tier company.

You are conducting a real-time, intelligent interview based on the candidate's resume and their most recent spoken answer.

Your task:
- Start with a brief, natural-sounding, human affirmation of the candidate's latest response. Do NOT use robotic or generic one-word phrases like "Understood" or "Alright".
- Then, based on the resume and this answer, ask the most contextually relevant, technically challenging follow-up question.
- Avoid repeating any previous questions.
- Keep the tone conversational but professional.
- Do not evaluate or explain anything.
- Do not include any formatting, section headers, or labels.

Resume:
"""
${resumeText}
"""

Latest Answer:
"""
${transcript}
"""

Your response:


    `;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const responseText = aiResponse.text;

    if (!responseText) {
      throw new Error("No response text from Gemini.");
    }

    res.status(200).json({ success: true, result: responseText });
  } catch (error) {
    console.error("Interview handler error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
