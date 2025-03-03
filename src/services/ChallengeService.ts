import prisma from "../../prisma/db";

export class ChallengeService {
  // Create a challenge from a completed game session
  static async createChallenge(challengerId: string, sessionId: string) {
    // Get the session to link the question set
    const session = await prisma.gameSession.findUnique({
      where: { id: sessionId },
      select: { questionSetId: true },
    });
    console.log(session);
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
  static async getChallengeByShareCode(shareCode: string) {
    return prisma.challenge.findUnique({
      where: { shareCode },
    });
  }

  // Record an attempt at a challenge
  static async recordChallengeAttempt(
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
}
