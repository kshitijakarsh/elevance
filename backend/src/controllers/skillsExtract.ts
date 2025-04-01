import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyC5xgpjvRufP1v_w60-wHToWxlLLFg1NpM" });

export const skillsExtract = async (
  req: Request,
  res: Response
): Promise<void> => {
  const extractedText = (req as any).extractedText;

  const prompt = `
  Extract all the technical skills and domain-specific skills mentioned in this resume. These include skills such as programming languages, tools, frameworks, or any expertise related to the person’s profession. Return the skills in a comma-separated format, without categorizing them, so they can be used as tags for searching.
  
  Resume Text: ${extractedText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    res.json({ skills: response.text });
  } catch (error) {
    console.error("Error extracting skills:", error);
    res.status(500).json({ error: "Failed to extract skills" });
  }
};
