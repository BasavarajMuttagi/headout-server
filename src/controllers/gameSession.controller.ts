import { Request, Response } from "express";
import { gameSessionService } from "../services/GameSessionService";
import { QuestionSetService } from "../services/QuestionSetService";

const startGameSession = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const userId = user.userId;
    if (!userId) {
      res.status(400).json({ message: "token missing" });
      return;
    }
    const destinationsAofA =
      await QuestionSetService.generateRandomDestinationIds();

    const questions = destinationsAofA.map((destinations, index) => {
      const [correctDestination, ...optionDestinations] = destinations;
      const eachQuestion = {
        questionNumber: index + 1,
        destinationId: correctDestination,
        optionDestinationsIds: [correctDestination, ...optionDestinations],
      };
      return eachQuestion;
    });
    console.log(questions);
    const questionSet = await QuestionSetService.createQuestionSet(questions);
    console.log(JSON.stringify(questionSet));
    const newSession = await gameSessionService.startGameSession(
      userId,
      questionSet.id,
    );
    res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to start game session" });
  }
};

const getSessionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await gameSessionService.getSessionById(id);

    if (!session) {
      res.status(404).json({ message: "Game session not found" });
      return;
    }

    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get game session" });
  }
};

const answerQuestion = async (req: Request, res: Response) => {
  try {
    const { sessionId, userId, destinationId, questionIndex, isCorrect } =
      req.body;

    if (
      !sessionId ||
      !userId ||
      !destinationId ||
      questionIndex === undefined ||
      isCorrect === undefined
    ) {
      res.status(400).json({
        message:
          "Session ID, User ID, Destination ID, Question Index, and isCorrect are required",
      });
      return;
    }
    const sessionQuestion = await gameSessionService.answerQuestion(
      sessionId,
      userId,
      destinationId,
      questionIndex,
      isCorrect,
    );
    res.status(201).json(sessionQuestion); // 201 Created for creating a resource
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to answer question" });
  }
};

const endGameSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSession = await gameSessionService.endGameSession(id);

    if (!updatedSession) {
      res.status(404).json({ message: "Game session not found" });
      return;
    }
    res.json(updatedSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to end game session" });
  }
};

const getUserGameHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { limit } = req.query;
    const limitNumber = limit ? parseInt(limit as string, 10) : 10; // Default to 10

    if (!userId) {
      res.status(400).json({ message: "User Id is required" });
      return;
    }

    const gameHistory = await gameSessionService.getUserGameHistory(
      userId,
      limitNumber,
    );
    res.json(gameHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user game history" });
  }
};

export {
  answerQuestion,
  endGameSession,
  getSessionById,
  getUserGameHistory,
  startGameSession,
};
