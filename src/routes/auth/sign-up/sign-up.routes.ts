import { signUpController } from "./sign-up.controllers";
import express from "express";

const signUpRoutes = express.Router();

// POST /sign-up

signUpRoutes.post("/", signUpController);

export default signUpRoutes;
