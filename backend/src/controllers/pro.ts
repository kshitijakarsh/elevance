import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function projectDiscussionInterview(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText, transcript } = req.body;

    if (!resumeText || !transcript) {
      return res.status(400).json({ error: "Missing resume or transcript" });
    }

    const prompt = `
You are an interviewer conducting a **project-focused** round.

You have access to the candidate’s resume and their most recent answer.

Your task:
- Begin with a warm but curious acknowledgment of the candidate’s response.
- Then ask a deep, specific follow-up question about **one of their projects** mentioned in the resume.
- Your question should probe for:
  - **Problem-solving approach**
  - **Technical depth**
  - **Decision-making**
  - **Real-world impact**
- Do not repeat previous questions.
- Avoid labeling sections — just write a clean, human follow-up.

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
    console.error("Project Discussion Interview Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
