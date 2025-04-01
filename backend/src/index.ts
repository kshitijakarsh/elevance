import express from "express";
import cors from "cors";
import multer from "multer";
import {extractPDFText} from "./middlewares/upload";
import { skillsExtract } from "./controllers/skillsExtract";

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });
app.post("/submit", upload.single("file"), extractPDFText, skillsExtract);

app.listen(3000, () => console.log("Server running on port 3000"));
