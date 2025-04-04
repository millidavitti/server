import { magicLinkController } from "./magic-link.controllers";
import express from "express";

const magicLinkRoutes = express.Router();

// POST /sign-up
// POST /magic-link
magicLinkRoutes.post("/", magicLinkController);

export default magicLinkRoutes;
