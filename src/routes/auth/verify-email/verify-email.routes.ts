import express from "express";
import { verifyEmailController } from "./verify-email.controllers";

const verifyEmailRoutes = express.Router();

// GET /verify-email/:verificationToken
verifyEmailRoutes.get("/:verificationToken", verifyEmailController);

export default verifyEmailRoutes;
