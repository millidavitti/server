import express from "express";
import {
	createUserController,
	deleteUserController,
	getUserController,
	getUsersController,
	updateUserController,
} from "./users.controllers";

const userRoutes = express.Router();

userRoutes.get("/", getUsersController);
userRoutes.post("/", createUserController);
userRoutes.get("/:userId", getUserController);
userRoutes.put("/:userId", updateUserController);
userRoutes.delete("/:userId", deleteUserController);

export default userRoutes;
