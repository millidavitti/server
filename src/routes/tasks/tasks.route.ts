import express from "express";
import { getTasksController } from "./tasks.controllers.js";

const taskRoutes = express.Router();

// GET /tasks
taskRoutes.get("/", getTasksController);

// POST /tasks
taskRoutes.post("/", () => {});

// PUT /tasks
taskRoutes.put("/:id", () => {});

// DELETE /tasks/:id
taskRoutes.delete("/:id", () => {});

export default taskRoutes;
