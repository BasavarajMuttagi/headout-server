import { Request, Response } from "express";
import { GameSessionService } from "../services/GameSessionService";
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

    const questionSet = await QuestionSetService.createQuestionSet(questions);
    const newSession = await GameSessionService.startGameSession(
      userId,
      questionSet.id
    );
    res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to start game session" });
  }
};

const getSessionById = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = await GameSessionService.getSessionById(sessionId);

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
    const user = req.body.user;
    const userId = user.userId;
    const { sessionId, questionId } = req.params;
    const { destinationId, questionNumber } = req.body;

    if (
      !sessionId ||
      !userId ||
      !destinationId ||
      questionNumber === undefined
    ) {
      res.status(400).json({
        message:
          "Session ID, User ID, Destination ID, Question Index, and isCorrect are required",
      });
      return;
    }
    const question = await GameSessionService.getQuestion(questionId);
    await GameSessionService.answerQuestion(
      sessionId,
      userId,
      destinationId,
      questionNumber,
      question?.destinationId === destinationId
    );
    res.status(201).json({
      validity: question?.destinationId === destinationId,
      destinationId: question?.destinationId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to answer question" });
  }
};

const endGameSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSession = await GameSessionService.endGameSession(id);

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

    const gameHistory = await GameSessionService.getUserGameHistory(
      userId,
      limitNumber
    );
    res.json(gameHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user game history" });
  }
};

const getQuestionByNumber = async (req: Request, res: Response) => {
  try {
    const { sessionId, questionNumber } = req.params;
    console.log(sessionId, questionNumber);
    const session = await GameSessionService.getSessionById(sessionId);

    if (!session) {
      res.status(404).json({ message: "session not found" });
      return;
    }

    const question = await GameSessionService.getQuestionByNumber(
      session.questionSetId,
      parseInt(questionNumber)
    );

    const options = question?.options.map((option) => ({
      id: option.destination.id,
      city: option.destination.city.city,
      country: option.destination.city.country.country,
    }));

    res.json({
      ...question?.destination,
      options,
      id: question?.id,
      totalQuestions: question?.totalQuestions,
      questionNumber: question?.questionNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get question set" });
  }
};

export {
  answerQuestion,
  endGameSession,
  getQuestionByNumber,
  getSessionById,
  getUserGameHistory,
  startGameSession,
};
