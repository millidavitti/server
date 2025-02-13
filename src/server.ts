import http from "http";
import dotenv from "dotenv";
import app from "./app.ts";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const listen = async () => {
	server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

listen();
