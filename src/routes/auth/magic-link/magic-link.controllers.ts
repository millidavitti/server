import { db } from "@db/connect-db";
import { getErrorMessage } from "src/helpers/get-error-message";
import { userSchema } from "@db/schema/user.schema";
import { sendMagicLink } from "@model/auth/magic-link.model";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export async function magicLinkController(req: Request, res: Response) {
	try {
		const [user] = await db
			.select()
			.from(userSchema)
			.where(eq(userSchema.email, req.body.email));
		if (user) {
			req.session.ctx = {
				signIn: {
					token: createId(),
					expires: Date.now() + 1000 * 60 * 15,
				},
				user: { id: user.id },
			};
			await sendMagicLink(user.email, req.session.ctx.signIn.token);
			res.status(200).json({ status: "Magic link sent" });
		} else res.status(200).json({ status: "You do not have an account" });
	} catch (error) {
		console.error("---magicLinkController---\n", error);
		res.status(400).json({ error: getErrorMessage(error) });
	}
}
