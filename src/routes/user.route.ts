import express from "express";
import { createUser, getUserByUserName } from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.post("/create", createUser);
UserRouter.get("/:username", getUserByUserName);
export default UserRouter;
