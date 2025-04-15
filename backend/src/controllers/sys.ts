import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function systemDesignInterview(
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

This round is of system design, do take reference from the example questions and ask questions to the interviewee.

Your task:
- Start with a professional, engaging follow-up to their previous answer.
- Then ask a system design question that is either:
  1. Inspired by their resume (e.g., if they worked on messaging apps, ask about designing one),
  2. A classic scalable system (e.g., design Twitter feed, Uber backend, etc.)

Avoid repetition. Ask only one clean, focused design question. Keep it human and practical.

Some example questions : 

What is CAP theorem?
How is Horizontal scaling different from Vertical scaling?
What do you understand by load balancing? Why is it important in system design?
What do you understand by Latency, throughput, and availability of a system?
What is Sharding?
How is NoSQL database different from SQL databases?
How is sharding different from partitioning?
How is performance and scalability related to each other?
What is Caching? What are the various cache update strategies available in caching?
What are the various Consistency patterns available in system design?
What do you understand by Content delivery network?
What do you understand by Leader Election?
How do you answer system design interview questions?
What are some of the design issues in distributed systems?
Design Uber, Ola or Lyft type of systems.
Design ATM system.
Design Web Crawler.
Design a traffic control system.
Design Tic-Tac-Toe game.
Design Netflix.
Design a type-ahead search engine service.
How do you design global file storage and file sharing services like Google Drive, Dropbox etc?
Design an API Rate Limiter system for GitHub or Firebase sites.
How do you design a recommendation system?
Design a parking lot system?
Design Facebook’s newsfeed system.
Design a forum-like systems like Quora, Reddit or HackerNews.
How do you design a URL shortening service like TinyURL or bit.ly?
Design a global chat service like Whatsapp or a facebook messenger.


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
    console.error("System Design Interview Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
