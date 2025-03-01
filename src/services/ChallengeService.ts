import prisma from "../../prisma/db";

export class ChallengeService {
  // Create a challenge from a completed game session
  async createChallenge(challengerId: string, sessionId: string) {
    // Get the session to link the question set
    const session = await prisma.gameSession.findUnique({
      where: { id: sessionId },
      select: { questionSetId: true },
    });

    if (!session) {
      throw new Error("Game session not found");
    }

    return prisma.challenge.create({
      data: {
        challengerId,
        challengerSessionId: sessionId,
        questionSetId: session.questionSetId,
      },
    });
  }

  // Get challenge by share code
  async getChallengeByShareCode(shareCode: string) {
    return prisma.challenge.findUnique({
      where: { shareCode },
      include: {
        challenger: true,
        challengerSession: true,
        questionSet: {
          include: {
            questions: {
              orderBy: {
                orderIndex: "asc",
              },
              include: {
                destination: true,
              },
            },
          },
        },
        challengeAttempts: {
          include: {
            user: true,
            gameSession: true,
          },
        },
      },
    });
  }

  // Record an attempt at a challenge
  async recordChallengeAttempt(
    challengeId: string,
    userId: string,
    sessionId: string,
  ) {
    return await prisma.challengeAttempt.create({
      data: {
        challengeId,
        userId,
        sessionId,
      },
    });
  }

  // Get challenges created by a user
  async getUserChallenges(userId: string) {
    return prisma.challenge.findMany({
      where: { challengerId: userId },
      include: {
        challengerSession: true,
        _count: {
          select: {
            challengeAttempts: true,
          },
        },
      },
    });
  }

  // Get challenge attempts by a user
  async getUserChallengeAttempts(userId: string) {
    return prisma.challengeAttempt.findMany({
      where: { userId },
      include: {
        challenge: {
          include: {
            challenger: true,
            challengerSession: true,
          },
        },
        gameSession: true,
      },
    });
  }
}
