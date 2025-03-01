import prisma from "../../prisma/db";

export class DestinationService {
  // Create a destination with city and country
  async createDestination(
    cityName: string,
    countryName: string,
    imageUrl?: string,
  ) {
    // Find or create country
    let country = await prisma.country.findUnique({
      where: { name: countryName },
    });

    if (!country) {
      country = await prisma.country.create({
        data: { name: countryName },
      });
    }

    // Find or create city
    let city = await prisma.city.findFirst({
      where: {
        name: cityName,
        countryId: country.id,
      },
    });

    if (!city) {
      city = await prisma.city.create({
        data: {
          name: cityName,
          countryId: country.id,
        },
      });
    }

    // Create destination
    return prisma.destination.create({
      data: {
        cityId: city.id,
        imageUrl,
      },
    });
  }

  // Get destination by ID with related data
  async getDestinationById(id: string) {
    return prisma.destination.findUnique({
      where: { id },
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
    });
  }

  // Get all destinations
  async getAllDestinations(limit = 100, offset = 0) {
    return prisma.destination.findMany({
      include: {
        city: {
          include: {
            country: true,
          },
        },
      },
      skip: offset,
      take: limit,
    });
  }

  // Add clue to destination
  async addClue(destinationId: string, text: string) {
    return prisma.clue.create({
      data: {
        text,
        destinationId,
      },
    });
  }

  // Add fun fact to destination
  async addFunFact(destinationId: string, text: string) {
    return prisma.funFact.create({
      data: {
        text,
        destinationId,
      },
    });
  }

  // Add trivia to destination
  async addTrivia(destinationId: string, text: string) {
    return prisma.trivia.create({
      data: {
        text,
        destinationId,
      },
    });
  }

  // Update destination
  async updateDestination(id: string, data: { imageUrl?: string }) {
    return prisma.destination.update({
      where: { id },
      data,
    });
  }

  // Delete destination
  async deleteDestination(id: string) {
    return prisma.destination.delete({
      where: { id },
    });
  }
}
