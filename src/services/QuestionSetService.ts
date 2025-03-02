import { Destination } from "@prisma/client";
import prisma from "../../prisma/db";

export class QuestionSetService {
  // Create a new question set with destinations
  static async createQuestionSet(
    questions: {
      questionNumber: number;
      destinationId: string;
      optionDestinationsIds: string[];
    }[],
  ) {
    return prisma.questionSet.create({
      data: {
        questions: {
          create: questions.map((question) => ({
            destinationId: question.destinationId,
            questionNumber: question.questionNumber,
            options: {
              create: question.optionDestinationsIds.map((id) => ({
                destinationId: id,
              })),
            },
            totalQuestions: questions.length,
          })),
        },
      },
    });
  }

  // Get random destinations for a new question set
  static async generateRandomDestinationIds(count = 10) {
    const results = await prisma.$transaction(async (prisma) => {
      const arrays = [];
      for (let i = 0; i < count; i++) {
        const destinationIds: Destination[] = await prisma.$queryRaw`
        WITH random_countries AS (
          SELECT co.id AS "countryId"
          FROM "Country" co 
          ORDER BY RANDOM()
          LIMIT 4
        )
        SELECT d.id
        FROM random_countries rc
        JOIN "Country" co ON co.id = rc."countryId"
        JOIN "City" ci ON ci."countryId" = co.id
        JOIN "Destination" d ON d."cityId" = ci.id
        ORDER BY RANDOM()
        LIMIT 4
      `;
        arrays.push(destinationIds.map((d) => d.id));
      }
      return arrays;
    });
    return results;
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
