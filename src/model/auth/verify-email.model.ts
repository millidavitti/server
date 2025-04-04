import { db } from "@db/connect-db";
import { getErrorMessage } from "src/helpers/get-error-message";
import { userSchema } from "@db/schema/user.schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { Session, SessionData } from "express-session";
import { z } from "zod";

export async function verifyEmail(
	verificationToken: string,
	session: Session & Partial<SessionData>,
) {
	try {
		const { data, success, error } = z
			.string()
			.email()
			.safeParse(session.ctx!.user.email);
		const [user] = await db
			.select()
			.from(userSchema)
			.where(
				and(
					eq(userSchema.email, session.ctx!.user.email),
					isNotNull(userSchema.emailVerified),
				),
			);
		if (user?.emailVerified) return { status: "Email verified" };

		if (success) {
			if (
				session?.ctx?.emailVerification.token === verificationToken &&
				Number(session.ctx.emailVerification.expires) > Date.now()
			) {
				await db
					.update(userSchema)
					.set({ emailVerified: new Date() })
					.where(eq(userSchema.email, data));
				return { status: "Email verified" };
			} else return { status: "Email not verified" };
		} else throw new Error(getErrorMessage(error));
	} catch (error) {
		console.error("---verifyEmail---\n", error);
		throw new Error(getErrorMessage(error));
	}
}
