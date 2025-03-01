import express from "express";
import {
  createUser,
  deleteUser,
  getUserByID,
  getUserByUserName,
} from "../controllers/user.controller";

const UserRoute = express.Router();

UserRoute.post("/", createUser);
UserRoute.get("/:id", getUserByID);
UserRoute.get("/:username", getUserByUserName);
UserRoute.delete("/:id", deleteUser);
