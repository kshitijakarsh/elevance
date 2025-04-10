// middlewares/connect.ts
import { Request, Response, NextFunction } from "express";
import { GoogleGenAI } from "@google/genai";
import { GOOGLE_API_KEY } from "../constants";

interface GenAIRequest extends Request {
  genai?: GoogleGenAI["models"];
}

const connect = (req: GenAIRequest, res: Response, next: NextFunction) => {
  try {
    const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });
    req.genai = ai.models;
    next();
  } catch (error) {
    console.error("Error initializing GenAI:", error);
    res.status(500).json({ error: "Failed to connect to GenAI" });
  }
};

export default connect;
