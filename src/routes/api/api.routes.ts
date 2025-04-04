import express from "express";
import { authenticate } from "src/middlewares/authenticate";
import { csrf } from "src/middlewares/csrf";
import v1 from "./v1/v1.routes";

const api = express.Router();

api.use(authenticate, csrf);
api.use("/v1", v1);

export default api;
