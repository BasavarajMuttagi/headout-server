import prisma from "../../prisma/db";

export class QuestionSetService {
  // Create a new question set with destinations
  static async createQuestionSet(destinationIds: string[]) {
    return prisma.questionSet.create({
      data: {
        questions: {
          create: destinationIds.map((destinationId, index) => ({
            destinationId,
            questionNumber: index + 1,
          })),
        },
      },
      include: {
        questions: {
          include: {
            destination: true,
          },
        },
      },
    });
  }

  // Get random destinations for a new question set
  static async getRandomDestinations(count = 10) {
    const destinations = await prisma.destination.findMany({
      take: count,
      orderBy: {
        id: "asc",
      },
    });

    return destinations.map((d) => d.id);
  }

  // Get question set by ID
  static async getQuestionSetById(id: string) {
    return prisma.questionSet.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: {
            questionNumber: "asc",
          },
          include: {
            destination: {
              include: {
                city: {
                  include: {
                    country: true,
                  },
                },
                clues: true,
                funFacts: true,
                triviaItems: true,
              },
            },
          },
        },
      },
    });
  }

  // Delete question set
  static async deleteQuestionSet(id: string) {
    return prisma.questionSet.delete({
      where: { id },
    });
  }
}
