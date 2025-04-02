import dotenv from "dotenv";
dotenv.config();

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
console.log(GOOGLE_API_KEY);

export const RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;