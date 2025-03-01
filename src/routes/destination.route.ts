import express from "express";
import {
  createDestination,
  deleteDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
} from "../controllers/destination.controller";

const DestinationRoute = express.Router();

DestinationRoute.get("/", getAllDestinations);
DestinationRoute.get("/:id", getDestinationById);
DestinationRoute.post("/", createDestination);
DestinationRoute.put("/:id", updateDestination);
DestinationRoute.delete("/:id", deleteDestination);

export default DestinationRoute;
