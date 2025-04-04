import { getErrorMessage } from "src/helpers/get-error-message";
import { handleSessionError } from "src/helpers/handle-session-error";
import { Request, Response } from "express";

export async function signOutController(req: Request, res: Response) {
	try {
		req.sessionStore.destroy(req.sessionID);
		res.status(200).json({ isAuthenticated: false });
	} catch (error) {
		console.error("---signOut---\n", error);
		res.status(400).json({ error: getErrorMessage(error) });
	}
}
