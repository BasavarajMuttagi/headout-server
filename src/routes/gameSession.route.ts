import express from "express";
import {
  answerQuestion,
  endGameSession,
  getQuestionByNumber,
  getScore,
  getSessionById,
  getStats,
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
GameSessionRouter.put("/:id/end", validateToken, endGameSession);
GameSessionRouter.get("/user/:userId", validateToken, getUserGameHistory);
GameSessionRouter.get(
  "/question/:sessionId/:questionNumber",
  validateToken,
  getQuestionByNumber,
);
GameSessionRouter.get("/session/:sessionId/score", validateToken, getScore);
GameSessionRouter.get("/session/:sessionId/stats", validateToken, getStats);

export default GameSessionRouter;
