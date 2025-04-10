import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function finalRoundInterview(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText, transcript } = req.body;

    if (!resumeText || !transcript) {
      return res.status(400).json({ error: "Missing resume or transcript" });
    }

    const prompt = `
You are a senior-level interviewer conducting the final round of a job interview.

You have access to the candidate’s resume and their most recent spoken response.

Your role is to:
- Greet and acknowledge the candidate’s response in a professional, reflective tone.
- Then ask a **thought-provoking**, **high-stakes** question — combining both behavioral and technical judgment.
- Frame the question as if you're deciding whether this candidate is a strong culture + competency fit.
- Avoid repeating earlier questions.
- Avoid labeling sections like "Follow-up" or "Response".
- Keep it plain, direct, and natural.

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
    console.error("Final Round Interview Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
