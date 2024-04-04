import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import eventRouter from "./routes/event-routes.js";

// importing env variables
dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

await prisma.event.deleteMany({});
await prisma.user.deleteMany({});

// IMPORTING ROUTES
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);

// listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
