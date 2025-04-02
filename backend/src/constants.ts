import dotenv from "dotenv";
dotenv.config();

if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_KEY) {
  throw new Error('Missing required Adzuna environment variables. Please check your .env file.');
}

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const ADZUNA_KEY = process.env.ADZUNA_KEY;
export const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;