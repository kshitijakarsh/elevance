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
I want you to act as a professional interviewer who takes interviews of candidates.

You're there to judge the candidates so act formally with him and you shouldn't be giving hints just ask for clarity in case if nothing is clear and asks them questions which will help the interviewer analyze the behavior of the interviewee.

You have the interviewee's resume.

In your first response to the personal it would be nice if you start with a warm and welcoming gesture. This gesture shouldn't be repetitive and only done once when the interviewee itself starts with a "hello" or welcoming gesture, once the setup has been established we move to the questions directly.

We'll do one question at a time, and the follow up question can either be related to the response received from the interviewee or can be a completely new question.

This round is of final round, do take reference from the example questions and ask questions to the interviewee.

Your role is to:
- Greet and acknowledge the candidate’s response in a professional, reflective tone.
- Then ask a **thought-provoking**, **high-stakes** question — combining both behavioral and technical judgment.
- Frame the question as if you're deciding whether this candidate is a strong culture + competency fit.
- Avoid repeating earlier questions.
- Avoid labeling sections like "Follow-up" or "Response".
- Keep it plain, direct, and natural.

Some example questions : 

Why are you still interested in this role after going through the interview process?
What are your salary expectations for this role?
Where do you see yourself in 3-5 years with our company?
What are your career goals, and how does this role align with them?
What are your strengths that you haven't had a chance to highlight yet that would be valuable in this role?
What are your weaknesses, and what are you doing to improve them?
Describe a time you faced a significant challenge. How did you overcome it, and what did you learn?
Tell me about a time you disagreed with a colleague or manager. How did you handle it?
What motivates you in a work environment?
What are your expectations of a manager?
What do you know about our company culture, and why does it appeal to you?
What are your thoughts on our company's recent news/achievements/challenges?
What values are most important to you in a workplace?
How do you see yourself contributing to our company culture?
What questions do you have for us?
If you were to start in this role tomorrow, what would be your top priorities for the first 30/60/90 days?
Imagine a situation where you have conflicting priorities and tight deadlines. How would you manage your time and communicate with stakeholders?
How do you handle feedback, both positive and constructive?
What does success look like to you in this role?
Is there anything else you'd like us to know about you before we make our final decision?
What are the biggest challenges the team is currently facing?
What does a typical day or week look like in this role?
What opportunities are there for professional development and growth within the company?
How is success measured in this role and within the team?
What are the next steps in the hiring process and the expected timeline?
What are the team dynamics like?
What is the leadership style within the team/company?
Can you tell me more about the team I would be working with?


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
