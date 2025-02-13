import express from "express";
import taskRoutes from "./tasks/tasks.route.js";

const api = express.Router();

api.use("/tasks", taskRoutes);

export default api;
