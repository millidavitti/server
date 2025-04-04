import { getEnvironmentValue } from "src/helpers/get-environment-value";
import { getErrorMessage } from "src/helpers/get-error-message";
import { generateCsrfSecret } from "@model/auth/csrf.model";
import { sendMagicLink } from "@model/auth/magic-link.model";
import { signIn } from "@model/auth/sign-in.model";
import { createId } from "@paralleldrive/cuid2";
import { Request, Response } from "express";

export async function signInController(req: Request, res: Response) {
	try {
		const { userId } = await signIn(req.params.signInToken, req.session);

		if (userId) {
			req.sessionStore.destroy(req.sessionID);
			req.sessionStore.generate(req);
			req.sessionStore.createSession(req, {
				cookie: {
					originalMaxAge: 1000 * 60 * 60 * 48,
					httpOnly: true,
					path: "/",
					secure: getEnvironmentValue({ development: false, production: true }),
					sameSite: "lax",
				},
				userId,
				ctx: { secret: generateCsrfSecret() },
			});
			res.status(200).json({ status: "User authenticated" });
		} else {
			req.sessionStore.destroy(req.sessionID);
			res.status(200).json({ status: "User not authenticated" });
		}
	} catch (error) {
		console.error("---signInController---\n", error);
		req.sessionStore.destroy(req.sessionID);
		res.status(400).json({ error: getErrorMessage(error) });
	}
}
