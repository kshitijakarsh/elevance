import { GoogleGenAI } from "@google/genai";
import { GOOGLE_API_KEY } from "../constants";
import type { Request, Response } from "express";

const ai = new GoogleGenAI({
  apiKey: GOOGLE_API_KEY,
});

export default async function interview(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { resumeText, transcript, previousInteraction = [], latestQuestion, latestAnswer } = req.body;

    if (!resumeText || !transcript || !latestQuestion || !latestAnswer) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const interactionFormatted = previousInteraction
      .map(
        (entry: { question: string; answer: string }) =>
          `Q: ${entry.question}\nA: ${entry.answer}`
      )
      .join("\n");

    const prompt = `
You are a professional technical interviewer for a leading company.

You have the full resume of the candidate, and you're conducting an intelligent, adaptive interview.

Use the resume and previous responses to:
- Ask one highly relevant, thoughtful interview question at a time.
- Evaluate the candidate’s previous answers for depth, correctness, and quality.
- Adapt your next question based on their answers.
- Push deeper if the previous answer was vague or weak.
- Praise strong answers briefly, but stay formal and focused.

---

📄 Resume:
"""
${resumeText}
"""

🧠 Interview so far:
${interactionFormatted || "(None so far)"}

---

💬 Latest Answer to Evaluate:
Q: ${latestQuestion}
A: ${latestAnswer}

---

🆕 Your task:
1. Evaluate the candidate’s **most recent answer**.
2. Generate the next smart, context-aware interview question.
3. Justify why you asked it.

📤 Respond in this format:

Evaluation:
[Brief evaluation of the answer]

Next Question:
[Smart adaptive follow-up question]

Reason:
[Why this question was asked]
    `;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-pro",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const responseText = aiResponse.text

    if (!responseText) {
      throw new Error("No response text received from Gemini");
    }

    res.status(200).json({ success: true, result: responseText });
  } catch (error) {
    console.error("Interview handler error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
