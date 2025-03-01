import prisma from "../../prisma/db";

export class QuestionSetService {
  // Create a new question set with destinations
  async createQuestionSet(name: string | null, destinationIds: string[]) {
    return prisma.questionSet.create({
      data: {
        name,
        questions: {
          create: destinationIds.map((destinationId, index) => ({
            destinationId,
            orderIndex: index,
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
  async getRandomDestinations(count = 10) {
    const destinations = await prisma.destination.findMany({
      take: count,
      orderBy: {
        id: "asc",
      },
    });

    return destinations.map((d) => d.id);
  }

  // Get question set by ID
  async getQuestionSetById(id: string) {
    return prisma.questionSet.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: {
            orderIndex: "asc",
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
  async deleteQuestionSet(id: string) {
    return prisma.questionSet.delete({
      where: { id },
    });
  }
}
