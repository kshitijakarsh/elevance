import axios from "axios";
import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { GOOGLE_API_KEY, ADZUNA_APP_ID, ADZUNA_KEY } from "../constants";

const ai = new GoogleGenAI({
  apiKey: GOOGLE_API_KEY,
});

console.log("Using Adzuna Credentials:", ADZUNA_APP_ID, ADZUNA_KEY);

const searchJobs = async (job: string) => {
  const url = `http://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_KEY}&results_per_page=20&what=javascript%20${job}&content-type=application/json`;

  try {
    const response = await axios.get(url);
    const jobs = response.data?.results || [];
    

    return jobs.map((job: any) => ({
      title: job.title,
      description: job.description,
      company_name: job.company?.display_name || "Not Provided",
      contract_time: job.contract_time || "Unknown",
      redirect_url: job.redirect_url,
    }));
  } catch (error: any) {
    console.error(
      "Error fetching jobs:",
      error.response?.status,
      error.response?.data
    );
    return null;
  }
};

export default async function jobs(req: Request, res: Response): Promise<void> {
  try {
    const extractedText: string | undefined = (req as any).extractedText;
    if (!extractedText) {
      res.status(400).json({ error: "No extracted text provided" });
      return;
    }

    const prompt = `
    Extract all the technical skills and domain-specific skills mentioned in this resume.
    These include programming languages, tools, frameworks, or expertise related to the profession.

    ### Response Format (MUST be valid JSON):
    {
      "skills": ["skill1", "skill2", "skill3"],
      "job_profiles": ["job1", "job2", "job3"]
    }

    Ensure:
    - Return ONLY a valid JSON object, with NO extra text, explanation, or formatting.
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
    const parsedResponse = JSON.parse(cleanText) as {
      skills: string[];
      job_profiles: string[];
    };
    const { job_profiles } = parsedResponse;

    if (!Array.isArray(job_profiles) || job_profiles.length === 0) {
      res.status(400).json({ error: "No job profiles extracted" });
      return;
    }

    const jobResults = await Promise.all(
      job_profiles.map((job) => searchJobs(job))
    );

    res.status(200).json({ success: true, data: jobResults.filter(Boolean) });
  } catch (error) {
    console.error("Error processing jobs:", error);
    res.status(500).json({ error: "Failed to process jobs" });
  }
}
