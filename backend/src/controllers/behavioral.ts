import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function behavioralInterview(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText, transcript } = req.body;

    if (!resumeText || !transcript) {
      return res.status(400).json({ error: "Missing resume or transcript" });
    }

    const prompt = `I want you to act as a professional interviewer who takes interviews of candidates.

You're there to judge the candidates so act formally with him and you shouldn't be giving hints just ask for clarity in case if nothing is clear and asks them questions which will help the interviewer analyze the behavior of the interviewee.

In your first response to the personal it would be nice if you start with a warm and welcoming gesture. This gesture shouldn't be repetitive and only done once when the interviewee itself starts with a "hello" or welcoming gesture, once the setup has been established we move to the questions directly.

We'll do one question at a time, and the follow up question can either be related to the response received from the interviewee or can be a completely new question.

These are some example questions :

Tell me about yourself.

Tell me about a time you had a disagreement with your manager.

Tell me about a situation when you had a conflict with a teammate.

Tell me about a time you failed. How did you deal with the situation?

Describe a time when you led a team. What was the outcome?

Tell me about a time you worked well under pressure.

Provide an example of a time when you had to make a difficult decision.

Describe a time when you went above and beyond the requirements for a project.

How do you handle a situation where you don't know the answer to a question?

Describe a time you received tough or critical feedback

Describe a time when you had to give someone difficult feedback. How did you handle it?

Tell me about a time when you had to prioritize your tasks quickly.

Describe a time when you anticipated potential problems and developed preventive measures.

Describe a situation where you had to deal with a difficult customer.

Tell me about a time when you missed a deadline. What happened, and how did you handle it?

Describe a time when your workload was heavy and how you handled it.

Tell me about a time when you had to deal with a significant change at work. How did you adapt to this change?

Describe a situation where you saw a problem and took the initiative to correct it rather than waiting for someone else to do it.

Describe a time when there was a conflict within your team. How did you help resolve the conflict? Did you do anything to prevent it in the future?

Describe a time when you went out of your comfort zone. Why did you do it? What lessons did you learn from the experience?

Describe a time when you delivered a project under a tight deadline.

Describe a time when you took a big risk and it failed.

How would you design/test a product to make sure its diverse/inclusive to all users?

Describe a time you had to explain a complex technical concept to someone non-technical.

Tell me about a time you disagreed with a colleague. How did you handle the situation?

Give an example of a time you had to collaborate effectively with a team from a different department.

Tell me about a complex technical project you've worked on.

How do you stay up-to-date with the latest technological advancements?

Give an example of a time you had to debug a challenging technical issue.

Why are you interested in working at [company name]?

Assume you are given a task to design a system. How would you do it? How would you resolve ambiguity?

Have you ever been in a situation where another team and yours were creating a similar product? What happened?

What is the biggest technical challenge you have worked on?

Why do you want to change your current company?

Tell me a time when you had a different opinion than the rest of the team. How did you handle it?

Tell me about a time when you were faced with a problem that had a number of possible solutions. What was the problem and how did you determine the course of action? What was the outcome of that choice?

Describe a time when you you needed to motivate a group of individuals or encourage collaboration during a particular project.

What do you do to enhance your technical knowledge apart from your project work?

How do you prioritize your workload? What do you do when your work feels like it's just too much to get done?

What’s the Number One Accomplishment You’re Most Proud Of?

Explain the situation where excess of work and you knew you could not meet the deadline. How did you manage then?

What will be your course of action if you are assigned some task which you don’t know at all?

Give an example of when you took a huge risk and failed.

Describe a time when you had to work simultaneously on both high-priority urgent projects as well as long-term projects. How did you go about handling both?

Tell me about a time when you had a hard time working with someone in your team. How did you handle it?

Tell me about a project that didn’t go according to plan.

What is something new that you’ve learned recently?

Tell me about a time when you had to make a decision without all the information you needed.

Tell me a time when you linked two or more problems together and identified an underlying issue.

Tell me about a time you made a decision to sacrifice short term gain for a longer term goal.

How would you respond if you were the last member of the team in the office on a Friday afternoon and the product owner asks you to develop and deploy a change to production?

Resume:
"""
${resumeText}
"""

Candidate’s Latest Answer:
"""
${transcript}
"""

Your response:`;

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
    console.error("Behavioral Round Interview Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
