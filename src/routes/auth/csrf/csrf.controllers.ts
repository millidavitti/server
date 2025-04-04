import { getErrorMessage } from "src/helpers/get-error-message";
import { Request, Response } from "express";
import { generateCsrfToken } from "@model/auth/csrf.model";

export async function generateCsrfTokenController(req: Request, res: Response) {
	try {
		const csrfToken = generateCsrfToken(req.sessionID, req.session.ctx?.secret);
		res.status(200).json({ csrfToken });
	} catch (error) {
		console.error("---csrf---\n", error);
		res.status(400).json({ error: getErrorMessage(error) });
	}
}
