import express from "express";
import {
  answerQuestion,
  endGameSession,
  getSessionById,
  getUserGameHistory,
  startGameSession,
} from "../controllers/gameSession.controller";
import { validateToken } from "../middlewares/auth.middleware";
const GameSessionRouter = express.Router();

GameSessionRouter.get("/start", validateToken, startGameSession);
GameSessionRouter.get("/:id", getSessionById);
GameSessionRouter.post("/answer", answerQuestion);
GameSessionRouter.put("/:id/end", endGameSession);
GameSessionRouter.get("/user/:userId", getUserGameHistory);

export default GameSessionRouter;
