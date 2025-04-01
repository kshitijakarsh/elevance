import { json, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyC5xgpjvRufP1v_w60-wHToWxlLLFg1NpM",
});

export const skillsExtract = async (
  req: Request,
  res: Response
): Promise<void> => {
  const extractedText = (req as any).extractedText;

  const prompt = `
  Extract all the technical skills and domain-specific skills mentioned in this resume. These include programming languages, tools, frameworks, or expertise related to the person's profession.

  ### Response Format (MUST be valid JSON):
  {
  "skills": ["skill1", "skill2", "skill3"],
  "job_profiles": ["job1", "job2", "job3"]
}


  Ensure:
  - Return ONLY a valid JSON object, with NO extra text, explanation, or formatting.
  - Do NOT wrap the response in a Markdown code block (no triple backticks).
  - The response must be directly parseable as JSON.

  Resume Text: ${extractedText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini");
    }

    const cleanText = response.text.replace(/```json\n?|\n?```/g, "").trim();
    const parsedResponse = JSON.parse(cleanText);
    res.json(parsedResponse);
  } catch (error) {
    console.error("Error extracting skills:", error);
    res.status(500).json({ error: "Failed to extract skills" });
  }
};
