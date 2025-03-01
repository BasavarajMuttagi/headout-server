import prisma from "../../prisma/db";

export class UserService {
  // Create a new user
  async createUser(username: string) {
    return prisma.user.create({
      data: { username },
    });
  }

  // Get user by ID
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  // Get user by username
  async getUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  // Delete user
  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
