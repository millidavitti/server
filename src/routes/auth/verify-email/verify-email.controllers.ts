import { getErrorMessage } from "src/helpers/get-error-message";
import { verifyEmail } from "@model/auth/verify-email.model";
import { Request, Response } from "express";

export async function verifyEmailController(req: Request, res: Response) {
	try {
		const status = await verifyEmail(req.params.verificationToken, req.session);
		req.sessionStore.destroy(req.sessionID);
		res.status(200).json(status);
	} catch (error) {
		console.error("---verifyEmailController---\n", error);
		res.status(400).json({ error: getErrorMessage(error) });
	}
}
