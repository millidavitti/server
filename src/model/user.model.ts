import { db } from "@db/connect-db";
import { getErrorMessage } from "src/helpers/get-error-message";
import { userSchema } from "@db/schema/user.schema";
import chalk from "chalk";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { generateErrorLog } from "src/helpers/generate-error-log";

export async function getUser(userId: string) {
	try {
		const [result] = await db
			.select({
				id: userSchema.id,
				name: userSchema.name,
				image: userSchema.image,
			})
			.from(userSchema)
			.where(eq(userSchema.id, userId));

		return result;
	} catch (error) {
		generateErrorLog("getUser", error);
		throw new Error(getErrorMessage(error));
	}
}

export async function getUsers() {
	try {
		const results = await db.select().from(userSchema);

		return results;
	} catch (error) {
		generateErrorLog("getUsers", error);
		throw new Error(getErrorMessage(error));
	}
}

export async function createUser(user: User) {
	try {
		const { data, success, error } = ZodUser.safeParse(user);
		if (success) {
			const [result] = await db.insert(userSchema).values(data).returning();
			return result;
		} else throw new Error(getErrorMessage(error));
	} catch (error) {
		generateErrorLog("createUser", error);
		throw new Error(getErrorMessage(error));
	}
}

export async function updateUser(userId: string, update: Partial<User>) {
	try {
		const { data, success, error } = ZodUser.partial().safeParse(update);
		if (success) {
			const [result] = await db
				.update(userSchema)
				.set(data)
				.where(eq(userSchema.id, userId))
				.returning();
			return result;
		} else throw new Error(getErrorMessage(error));
	} catch (error) {
		generateErrorLog("updateUser", error);
		throw new Error(getErrorMessage(error));
	}
}

export async function deleteUser(userId: string) {
	try {
		const [result] = await db
			.delete(userSchema)
			.where(eq(userSchema.id, userId))
			.returning();
		return result;
	} catch (error) {
		generateErrorLog("deleteUser", error);
		throw new Error(getErrorMessage(error));
	}
}

const ZodUser = z.object({
	id: z.string().cuid2().optional(),
	name: z.string(),
	email: z.string().email(),
	image: z.string().url().nullable().optional(),
});
export type User = z.infer<typeof ZodUser>;
