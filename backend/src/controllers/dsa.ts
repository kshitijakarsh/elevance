import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function dsa(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: "Missing resume or transcript" });
    }

    const prompt = `
You are a senior technical interviewer conducting a coding interview.

You have access to the candidate's resume and their latest answer in the interview conversation.

Your goal:
- Based on the resume and the candidate’s latest response, generate a relevant **coding problem**.
- The question should be a **Data Structutres and Algorithm-style problem** that tests the candidate's problem-solving skills.
- It should be real-world and non-trivial, suitable for mid-to-advanced level.
- Provide **only the question description**, with constraints and example input/output if relevant.
- Do NOT explain the solution or give the answer.
- Do NOT evaluate the candidate’s previous response.

Resume:
"""
${resumeText}
"""

Your response:
    `;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = await aiResponse.text;
    if (!text) throw new Error("No response text from Gemini.");

    res.status(200).json({ success: true, result: text });
  } catch (error) {
    console.error("DSA Interview Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
