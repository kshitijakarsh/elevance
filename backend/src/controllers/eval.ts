import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function Eval(req: Request, res: Response): Promise<any> {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Missing question or answer" });
    }

    const prompt = `
You are a senior technical interviewer evaluating a candidate’s answer during a coding interview.

You are given:
- The candidate’s **resume**
- The **DSA question** asked in the interview
- The **candidate’s submitted code**

Your task is to act like a professional interviewer and **evaluate** the candidate’s answer.

---

### Your goals:
-  Clearly state whether the solution is **Correct / Incorrect / Partially Correct**
-  Evaluate:
  - Code correctness and logic
  - Edge case handling
  - Time and space complexity
  - Code style and structure
- Suggest improvements or optimizations if needed

Do **NOT** generate a new question.  
Do **NOT** solve the question yourself.  
Just evaluate the submitted answer professionally.

---

### Format your response like this:

Verdict: [Correct / Incorrect / Partially Correct]

Feedback:
- [Explain what was done well or poorly and why]

Suggestions:
- [Suggest concrete improvements, corrections, or optimizations]

---

### Context:

**Question:**
"""
${question}
"""

**Candidate’s Code:**
${answer}
    `;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const output = await aiResponse.text;
    if (!output) {
      throw new Error("No response text from Gemini.");
    }

    res.status(200).json({ success: true, result: output });
  } catch (error) {
    console.error("Error evaluating code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
