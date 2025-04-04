import { getErrorMessage } from "src/helpers/get-error-message";
import { Session, SessionData } from "express-session";

export async function signIn(
	signInToken: string,
	session: Session & Partial<SessionData>,
) {
	try {
		if (session.userId) return { userId: session.userId };
		if (
			session?.ctx?.signIn.token === signInToken &&
			Number(session.ctx.signIn.expires) > Date.now()
		)
			return { userId: session.ctx.user.id };

		return { userId: null };
	} catch (error) {
		console.error("---signIn---\n", error);
		throw new Error(getErrorMessage(error));
	}
}
