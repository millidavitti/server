import express from "express";
import { generateCsrfTokenController } from "./csrf.controllers";

const csrfRoutes = express.Router();

// GET /csrf
csrfRoutes.get("/", generateCsrfTokenController);

export default csrfRoutes;
