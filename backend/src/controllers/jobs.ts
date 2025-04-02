import axios from "axios";
import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyC5xgpjvRufP1v_w60-wHToWxlLLFg1NpM",
});

export default async function jobs(req: Request, res: Response): Promise<void> {
  try {
    const extractedText: string | undefined = (req as any).extractedText;
    if (!extractedText) {
      res.status(400).json({ error: "No extracted text provided" });
      return;
    }

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

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    if (!aiResponse.text) {
      throw new Error("No response text received from Gemini");
    }

    const cleanText = aiResponse.text.replace(/```json\n?|\n?```/g, "").trim();
    const parsedResponse: { skills: string[]; job_profiles: string[] } =
      JSON.parse(cleanText);
    const { job_profiles } = parsedResponse;

    if (!Array.isArray(job_profiles) || job_profiles.length === 0) {
      res.status(400).json({ error: "No job profiles extracted" });
      return;
    }

    const jobResults: Record<string, any> = {};

    for (const job of job_profiles) {
      const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/search",
        params: {
          query: `${job}`,
          page: "1",
          num_pages: "1",
          country: "all",
          date_posted: "all",
        },
        headers: {
          "x-rapidapi-key":
            "3210130567msh0702efca39f8998p12ec30jsnb2055c9b5803",
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.job_description);
      } catch (error) {
        console.error(error);
      }
    }

    res.status(200).json(jobResults);
  } catch (error) {
    console.error("Error processing jobs:", error);
    res.status(500).json({ error: "Failed to process jobs" });
  }
}
