import express from "express";
import connect from "../middlewares/connect";
import behavioralInterview from "../controllers/behavioral";
import finalRoundInterview from "../controllers/fin";
import projectDiscussionInterview from "../controllers/pro";
import systemDesignInterview from "../controllers/sys";
import dsa from "../controllers/dsa";
import technicalInterview from "../controllers/tech";
import Eval from "../controllers/eval";


const router = express.Router();


router.post("/behavioral", connect, behavioralInterview);
router.post("/dsa", connect, dsa);
router.post("/eval", connect, Eval)
router.post("/fin", connect, finalRoundInterview);
router.post("/pro", connect, projectDiscussionInterview);
router.post("/sys", connect, systemDesignInterview);
router.post("/tech", connect,  technicalInterview);

export default router;