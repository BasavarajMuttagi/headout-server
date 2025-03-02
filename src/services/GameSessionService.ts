import prisma from "../../prisma/db";

export const gameSessionService = {
  // Start a new game session
  async startGameSession(userId: string, questionSetId: string) {
    // Get the number of questions in the set
    const questionCount = await prisma.questionSetItem.count({
      where: { questionSetId },
    });

    return prisma.gameSession.create({
      data: {
        userId,
        questionSetId,
        totalQuestions: questionCount,
      },
    });
  },

  // Get session by ID
  async getSessionById(id: string) {
    return prisma.gameSession.findUnique({
      where: { id },
      include: {
        user: true,
        questionSet: {
          include: {
            questions: {
              orderBy: {
                questionNumber: "asc",
              },
              include: {
                destination: true,
              },
            },
          },
        },
        sessionQuestions: {
          orderBy: {
            questionNumber: "asc",
          },
        },
      },
    });
  },

  // Record an answer to a question
  async answerQuestion(
    sessionId: string,
    userId: string,
    destinationId: string,
    questionNumber: number,
    isCorrect: boolean,
  ) {
    // Create the session question record
    const sessionQuestion = await prisma.sessionQuestion.create({
      data: {
        userId,
        sessionId,
        destinationId,
        questionNumber,
        isCorrect,
      },
    });

    // Update the session score
    await prisma.gameSession.update({
      where: { id: sessionId },
      data: {
        score: {
          increment: isCorrect ? 1 : 0,
        },
      },
    });

    return sessionQuestion;
  },

  // End a game session
  async endGameSession(id: string) {
    return prisma.gameSession.update({
      where: { id },
      data: {
        endedAt: new Date(),
      },
    });
  },

  // Get user's game history
  async getUserGameHistory(userId: string, limit = 10) {
    return prisma.gameSession.findMany({
      where: { userId },
      orderBy: { startedAt: "desc" },
      take: limit,
      include: {
        questionSet: true,
        _count: {
          select: {
            sessionQuestions: true,
          },
        },
      },
    });
  },
};
