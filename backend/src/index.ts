import express from "express";
import cors from "cors";
import multer from "multer";
import {extractPDFText} from "./middlewares/upload";
import jobs from "./controllers/jobs";
import interview from "./controllers/interview";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
app.post("/submit", upload.single("file"), extractPDFText, jobs);
app.post("/interview", interview)

app.listen(3000, () => console.log("Server running on port 3000"));
