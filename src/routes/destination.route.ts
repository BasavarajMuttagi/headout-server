import express from "express";
import {
  createDestination,
  getAllDestinations,
  getDestinationById,
} from "../controllers/destination.controller";

const DestinationRoute = express.Router();

DestinationRoute.get("/", getAllDestinations);
DestinationRoute.get("/:id", getDestinationById);
DestinationRoute.post("/", createDestination);

export default DestinationRoute;
