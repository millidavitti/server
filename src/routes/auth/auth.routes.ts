import express from "express";
import signUpRoutes from "./sign-up/sign-up.routes";
import verifyEmailRoutes from "./verify-email/verify-email.routes";
import magicLinkRoutes from "./magic-link/magic-link.routes";
import signInRoutes from "./sign-in/sign-in.routes";
import signOutRoutes from "./sign-out/sign-out.routes";
import csrfRoutes from "./csrf/csrf.routes";
import pingRoutes from "./ping/ping.routes";
import { authenticate } from "src/middlewares/authenticate";

const auth = express.Router();

auth.use("/sign-up", signUpRoutes);
auth.use("/verify-email", verifyEmailRoutes);
auth.use("/magic-link", magicLinkRoutes);
auth.use("/sign-in", signInRoutes);
auth.use("/sign-out", signOutRoutes);
auth.use("/csrf", csrfRoutes);
auth.use("/ping", authenticate, pingRoutes);

export default auth;
