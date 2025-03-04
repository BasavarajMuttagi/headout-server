import { Request, Response } from "express";
import { UserService } from "../services/UserService";

// Create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }
    const user = await UserService.getUserByUsername(username);
    if (user) {
      const token = await UserService.generateToken(user);
      res.status(200).json({ token });
      return;
    }
    const newUser = await UserService.createUser(username);
    const token = await UserService.generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

// Get user by username
const getUserByUserName = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await UserService.getUserByUsername(username);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user" });
  }
};
// Delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserService.deleteUser(id);
    if (!deletedUser) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export { createUser, deleteUser, getUserByUserName };
