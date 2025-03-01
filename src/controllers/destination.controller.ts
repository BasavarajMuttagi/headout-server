import { Request, Response } from "express";
import { DestinationService } from "../services/DestinationService";

const getAllDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await DestinationService.getAllDestinations();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving destinations", error });
  }
};

const getDestinationById = async (req: Request, res: Response) => {
  try {
    const destinationId = req.params.id;
    const destination =
      await DestinationService.getDestinationById(destinationId);
    if (destination) {
      res.status(200).json(destination);
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving destination", error });
  }
};

const createDestination = async (req: Request, res: Response) => {
  try {
    const { city, country, imageUrl } = req.body;
    if (!city) {
      res.status(400).json({ message: "City is required" });
      return;
    }
    const newDestination = await DestinationService.createDestination(
      city,
      country,
      imageUrl,
    );
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ message: "Error creating destination", error });
  }
};

const updateDestination = async (req: Request, res: Response) => {
  try {
    const destinationId = req.params.id;
    const updatedDestination = await DestinationService.updateDestination(
      destinationId,
      req.body,
    );
    if (updatedDestination) {
      res.status(200).json(updatedDestination);
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating destination", error });
  }
};

const deleteDestination = async (req: Request, res: Response) => {
  try {
    const destinationId = req.params.id;
    const deleted = await DestinationService.deleteDestination(destinationId);
    if (deleted) {
      res.status(200).json({ message: "Destination deleted successfully" });
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting destination", error });
  }
};

export {
  createDestination,
  deleteDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
};
