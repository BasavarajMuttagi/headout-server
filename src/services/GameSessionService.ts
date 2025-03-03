import prisma from "../../prisma/db";

export class GameSessionService {
  // Start a new game session
  static async startGameSession(userId: string, questionSetId: string) {
    // Get the number of questions in the set
    const questionCount = await prisma.question.count({
      where: { questionSetId },
    });

    return prisma.gameSession.create({
      data: {
        userId,
        questionSetId,
        totalQuestions: questionCount,
      },
    });
  }

  // Get session by ID
  static async getSessionById(id: string) {
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
  }

  // Record an answer to a question
  static async answerQuestion(
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
  }

  // End a game session
  static async endGameSession(sessionId: string) {
    return prisma.gameSession.update({
      where: { id: sessionId },
      data: {
        endedAt: new Date(),
      },
    });
  }

  static async getQuestion(questionId: string) {
    return prisma.question.findUnique({
      where: { id: questionId },
    });
  }
  static async getGameStats(sessionId: string) {
    return prisma.gameSession.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        totalQuestions: true,
        score: true,
        _count: {
          select: {
            sessionQuestions: {
              where: {
                isAttempted: {
                  equals: true,
                },
                isCorrect: {
                  equals: true,
                },
              },
            },
          },
        },
      },
    });
  }

  // Get user's game history
  static async getUserGameHistory(userId: string, limit = 10) {
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
  }
  static async getQuestionByNumber(
    questionSetId: string,
    questionNumber: number,
  ) {
    return prisma.question.findUnique({
      where: {
        questionSetId_questionNumber: {
          questionSetId,
          questionNumber,
        },
      },
      select: {
        id: true,
        questionNumber: true,
        totalQuestions: true,
        destination: {
          select: {
            imageUrl: true,
            clues: {
              select: {
                text: true,
              },
            },
            funFacts: {
              select: {
                text: true,
              },
            },
            triviaItems: {
              select: {
                text: true,
              },
            },
          },
        },
        options: {
          select: {
            destination: {
              select: {
                id: true,
                city: {
                  select: {
                    city: true,
                    country: {
                      select: {
                        country: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
