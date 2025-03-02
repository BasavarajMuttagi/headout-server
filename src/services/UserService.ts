import { User } from "@prisma/client";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/db";
config();
export class UserService {
  // Create a new user
  static async createUser(username: string) {
    return prisma.user.create({
      data: { username },
    });
  }

  // Get user by ID
  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  // Get user by username
  static async getUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  // Delete user
  static async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }

  static async generateToken(user: User) {
    return jwt.sign(
      { userId: user.id, username: user.username },
      process.env.SECRET_SALT!,
      { expiresIn: "7d" },
    );
  }
}
