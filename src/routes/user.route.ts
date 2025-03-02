import express from "express";
import {
  createUser,
  deleteUser,
  getUserByID,
  getUserByUserName,
} from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.post("/create", createUser);
UserRouter.get("/:id", getUserByID);
UserRouter.get("/:username", getUserByUserName);
UserRouter.delete("/:id", deleteUser);
export default UserRouter;
