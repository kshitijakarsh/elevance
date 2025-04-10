import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function interviewHandler(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText, transcript, roundType } = req.body;

    if (!resumeText || !transcript || !roundType) {
      return res.status(400).json({ error: "Missing resume, transcript or roundType" });
    }

    let prompt = "";

    if (roundType === "behavioral") {
      prompt = `
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
    } else if (roundType === "technical") {
      prompt = `
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
    } else {
      return res.status(400).json({ error: "Invalid roundType specified" });
    }

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
    console.error("Interview handler error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
