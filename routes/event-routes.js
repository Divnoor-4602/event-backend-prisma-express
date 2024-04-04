import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
} from "../controllers/event-controller.js";
import express from "express";

const eventRouter = express.Router();

eventRouter.post("/create", createEvent);
eventRouter.put("/update/:id", updateEvent);
eventRouter.delete("/delete/:id", deleteEvent);
eventRouter.get("/", getEvents);

export default eventRouter;
