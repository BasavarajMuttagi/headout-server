import express from "express";
import {
  answerQuestion,
  endGameSession,
  getQuestionByNumber,
  getScore,
  getSessionById,
  getUserGameHistory,
  startGameSession,
} from "../controllers/gameSession.controller";
import { validateToken } from "../middlewares/auth.middleware";
const GameSessionRouter = express.Router();

GameSessionRouter.get("/start", validateToken, startGameSession);
GameSessionRouter.get("/:id", getSessionById);
GameSessionRouter.post(
  "/answer/:sessionId/:questionId",
  validateToken,
  answerQuestion,
);
GameSessionRouter.put("/:id/end", endGameSession);
GameSessionRouter.get("/user/:userId", getUserGameHistory);
GameSessionRouter.get(
  "/question/:sessionId/:questionNumber",
  getQuestionByNumber,
);
GameSessionRouter.get("/session/:sessionId/score", getScore);

export default GameSessionRouter;
