import { Request, Response } from "express";
import { ChallengeService } from "../services/ChallengeService";
import { GameSessionService } from "../services/GameSessionService";

const acceptChallenge = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const userId = user.userId;
    const { shareCode } = req.params;
    if (!shareCode) {
      res.status(404).json({ message: "shareCode not found" });
      return;
    }
    const challenge = await ChallengeService.getChallengeByShareCode(shareCode);
    if (!challenge) {
      res.status(404).json({ message: "challenge not found" });
      return;
    }
    const newSession = await GameSessionService.startGameSession(
      userId,
      challenge.questionSetId,
    );

    await ChallengeService.recordChallengeAttempt(
      challenge.id,
      userId,
      newSession.id,
    );
    res.status(200).json(newSession);
  } catch (error) {
    res.status(500).json({ message: "Error accepting challenges", error });
  }
};

const createChallenge = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const userId = user.userId;
    const { sessionId } = req.params;
    if (!sessionId) {
      res.status(404).json({ message: "sessionId not found" });
      return;
    }
    const challenge = await ChallengeService.createChallenge(userId, sessionId);
    res.status(201).json({ shareCode: challenge.shareCode });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating challenge" });
  }
};

export { acceptChallenge, createChallenge };
