import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { GOOGLE_API_KEY } from "../constants";

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

export default async function projectDiscussionInterview(
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

This round is of project dicussion, do take reference from the example questions and ask questions to the interviewee.


Some example questions are : 

Tell me about the most recent project you worked on.
Describe a project you’re most proud of and why.
What was the most interesting project you’ve worked on?
Walk me through a project you led from start to finish.
What role did you play in your last cross-functional project?
How do you choose which projects to highlight on your resume?
What type of projects do you enjoy working on the most?
How do you define a successful project?
Which of your past projects do you think best prepared you for this role?
What types of projects are you most passionate about?
How do you approach project planning?
How do you define the scope of a project?
What techniques do you use to prioritize tasks?
How do you develop a project roadmap?
What deliverables do you set at the beginning of a project?
How do you ensure stakeholders are aligned from the beginning?
How do you estimate timelines and resource needs?
How do you handle risk assessment during planning?
How do you ensure clarity in project objectives?
How do you validate assumptions at the start of a project?
How do you track and monitor project progress?
How do you manage project budgets?
How do you ensure timely delivery of project milestones?
What tools do you use for project tracking and communication?
How do you ensure quality standards are met?
How do you handle scope creep?
What is your experience with Agile, Scrum, or Kanban?
When would you choose Waterfall over Agile?
How do you report status updates to stakeholders?
What’s your approach to managing distributed teams?
Describe a time when a project went off-track. How did you fix it?
What’s the biggest challenge you've faced in project management?
How do you handle last-minute changes?
How do you prioritize when everything is a priority?
Tell me about a bug or technical issue that took significant effort to resolve.
Describe a situation where a simple solution solved a complex problem.
How do you identify the root cause of project delays?
Have you ever had to recover a failing project? What did you do?
What’s your process for decision-making under pressure?
How do you manage conflicting opinions during problem-solving?
How do you identify and engage key stakeholders?
Describe a time you had to manage a difficult stakeholder.
How do you manage stakeholder expectations?
How do you handle conflicting stakeholder priorities?
How do you communicate risks to clients or sponsors?
How do you keep non-technical stakeholders informed?
How do you tailor your message depending on your audience?
What’s your process for handling escalations?
How do you get buy-in from skeptical stakeholders?
How do you handle negative feedback from stakeholders?
How do you build a high-performing project team?
How do you keep your team motivated during long projects?
How do you handle internal team conflict?
Describe a time you had to give feedback to an underperforming team member.
How do you resolve a conflict between engineering and product?
How do you ensure collaboration across departments?
What do you do when a team member constantly misses deadlines?
How do you balance workloads within your team?
Describe a time when team dynamics affected project success.
How do you foster trust and openness in your team?
What was your most successful project and why?
Describe a project that failed — what did you learn?
What KPIs do you use to measure project success?
Can you share a surprising result from a project?
How do you incorporate feedback from postmortems?
What’s the most important lesson you’ve learned as a project manager?
How do you evaluate project performance once it’s completed?
How do you define and measure “impact” in a project?
How do you ensure continuous improvement across projects?
How do you celebrate wins or milestones?
Tell me about a time you had to influence someone without authority.
Describe a time you made a tough call with limited data.
Have you managed a remote team using Agile? How did it go?
How do you prepare for sprint planning meetings?
When do you recommend a hybrid approach between Agile and Waterfall?


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
    console.error("Project Discussion Interview Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
