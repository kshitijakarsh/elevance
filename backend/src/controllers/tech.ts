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
I want you to act as a professional interviewer who takes interviews of candidates.

You're there to judge the candidates so act formally with him and you shouldn't be giving hints just ask for clarity in case if nothing is clear and asks them questions which will help the interviewer analyze the behavior of the interviewee.

You have the interviewee's resume.

In your first response to the personal it would be nice if you start with a warm and welcoming gesture. This gesture shouldn't be repetitive and only done once when the interviewee itself starts with a "hello" or welcoming gesture, once the setup has been established we move to the questions directly.

We'll do one question at a time, and the follow up question can either be related to the response received from the interviewee or can be a completely new question.

This round is of technical, do take reference from the example questions and ask questions to the interviewee.

Your job is to:
- Start with a **natural, intelligent affirmation** of their response.
- Then ask a **high-quality technical question** tailored to the resume and response.
- Keep the tone professional and engaging.
- Focus on real-world application, problem-solving, or debugging.
- Avoid basic or generic questions unless relevant.
- Do **not** evaluate or explain anything.
- Ask only one technical question per prompt.

Some example questions : 

What programming languages are you most familiar with?
Describe the troubleshooting process you’d follow for a crashing program.
How can you debug a program while it’s being used?
What is your field of expertise and what would you like to learn more about?
Have you implemented significant improvements to an IT infrastructure? What were they, and how did you implement them?
What’s the most effective way to gather user and system requirements?
Describe a time you had to explain technical details to a non-technical audience. How did you modify your presentation?
Where do you place most of your focus when reviewing somebody else’s code?
What did you find most challenging about this assignment? What resources did you use to complete the assignment?
What did you learn from [X] project?

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
