import express from "express";
import {
  acceptChallenge,
  createChallenge,
} from "../controllers/challenge.controller";
import { validateToken } from "../middlewares/auth.middleware";

const ChallengeRouter = express.Router();

ChallengeRouter.get("/:sessionId/create", validateToken, createChallenge);
ChallengeRouter.get("/accept/:shareCode", validateToken, acceptChallenge);

export default ChallengeRouter;
