import { getErrorMessage } from "src/helpers/get-error-message";
import { sendVerificationEmail, signUp } from "@model/auth/sign-up.model";
import { createId } from "@paralleldrive/cuid2";
import { Request, Response } from "express";

export async function signUpController(req: Request, res: Response) {
	try {
		const user = await signUp(req.body);

		req.session.ctx = {
			emailVerification: {
				token: createId(),
				expires: Date.now() + 1000 * 60 * 60 * 48,
			},
			user: { email: user.email },
		};

		await sendVerificationEmail(
			user.email,
			req.session.ctx.emailVerification.token,
		);
		res.status(200).json(req.body);
	} catch (error) {
		console.error("---signUpController---\n", error);
		req.sessionStore.destroy(req.sessionID);
		res.status(400).json({ error: getErrorMessage(error) });
	}
}
