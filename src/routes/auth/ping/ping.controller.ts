import { getErrorMessage } from "src/helpers/get-error-message";
import { Request, Response } from "express";

export async function pingController(req: Request, res: Response) {
	try {
		res.status(200).json({
			user: {
				id: req.session.userId,
				expires: req.session.cookie.expires,
			},
			isAuthenticated: true,
		});
	} catch (error) {
		console.error("---pingController---\n", error);
		res.status(400).json({ error: getErrorMessage(error) });
	}
}
