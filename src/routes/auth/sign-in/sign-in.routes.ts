import { signInController } from "./sign-in.controllers";
import express from "express";

const signInRoutes = express.Router();

// GET /sign-in
signInRoutes.get("/:signInToken", signInController);

export default signInRoutes;
