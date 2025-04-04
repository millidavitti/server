import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "../../helpers/timestamp";
import { createId } from "@paralleldrive/cuid2";

export const userSchema = pgTable("users", {
	id: text()
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	name: text().notNull(),
	email: text("email").unique().notNull(),
	emailVerified: timestamp("email_verified"),
	image: text(),
	...timestamps,
});
