import { db } from "@db/connect-db";
import { sessionSchema } from "@db/schema/auth/session.schema";
import { eq } from "drizzle-orm";
import session from "express-session";
import { getErrorMessage } from "./get-error-message";

export class MySessionStore extends session.Store {
	constructor() {
		super();
	}

	get(
		sid: string,
		callback: (err: any, session?: session.SessionData) => void,
	): void {
		// Implement session retrieval
		// console.log("---Saved Session ID---\n", sid);
		db.select()
			.from(sessionSchema)
			.where(eq(sessionSchema.sessionId, sid))
			.then(([session]) => {
				// console.log("---Saved Session---\n", session);
				if (session) callback(null, { ...JSON.parse(session.session) });
				else callback(null);
			})
			.catch((error) => {
				console.error("---Saved Session ID---\n", error);
				if (callback) callback(new Error(getErrorMessage(error)));
			});
	}

	set(
		sid: string,
		session: session.SessionData,
		callback?: (err?: any) => void,
	): void {
		// Implement session storage
		// console.log("---Set Session ID---\n", sid);
		// console.log("---Session---\n", session);

		db.insert(sessionSchema)
			.values({
				sessionId: sid,
				userId: session.userId,
				session: JSON.stringify(session),
				expires: session.cookie.expires
					? new Date(session.cookie.expires)
					: new Date(Date.now() + 86400000),
			})
			.onConflictDoUpdate({
				target: [sessionSchema.sessionId],
				set: {
					session: JSON.stringify(session),
					expires: session.cookie.expires
						? new Date(session.cookie.expires)
						: new Date(Date.now() + 86400000),
				},
			})
			.then(() => {
				if (callback) callback();
			})
			.catch((error) => {
				console.error("---Set Session ID---\n", error);
				if (callback) callback(new Error(getErrorMessage(error)));
			});
	}

	destroy(sid: string, callback?: (err?: any) => void): void {
		// Implement session deletion

		db.delete(sessionSchema)
			.where(eq(sessionSchema.sessionId, sid))
			.then(() => {
				if (callback) callback();
			})
			.catch((error) => {
				console.error("---Destroy Session ID---\n", sid);

				if (callback) callback(new Error(getErrorMessage(error)));
			});
	}
}
