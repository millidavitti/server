import express from "express";
import api from "./routes/api.ts";

const app = express();

app.use(express.json());
app.use("/v1", api);

export default app;
