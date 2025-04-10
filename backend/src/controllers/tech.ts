import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function technicalInterview(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText, transcript } = req.body;

    if (!resumeText || !transcript) {
      return res.status(400).json({ error: "Missing resume or transcript" });
    }

    const prompt = `
You are conducting a **Technical Round** interview for a software engineering role.

You are provided with:
1. The candidate’s **resume**.
2. Their **latest spoken answer**.

Your job is to:
- Start with a **natural, intelligent affirmation** of their response.
- Then ask a **high-quality technical question** tailored to the resume and response.
- Keep the tone professional and engaging.
- Focus on real-world application, problem-solving, or debugging.
- Avoid basic or generic questions unless relevant.
- Do **not** evaluate or explain anything.
- Ask only one technical question per prompt.

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
    console.error("Technical Interview Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
