import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { usersTable } from "./schema/user.ts";

const { Pool } = pg;
const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
});
// You can specify any property from the node-postgres connection options
const db = drizzle({
	client: pool,
	casing: "snake_case",
});

async function main() {
	const user: typeof usersTable.$inferInsert = {
		name: "John",
		age: 30,
		email: "john@example.com",
	};

	await db.insert(usersTable).values(user);
	console.log("New user created!");

	const users = await db.select().from(usersTable);
	console.log("Getting all users from the database: ", users);
	/*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

	await db
		.update(usersTable)
		.set({
			age: 31,
		})
		.where(eq(usersTable.email, user.email));
	console.log("User info updated!");

	// await db.delete(usersTable).where(eq(usersTable.email, user.email));
	// console.log("User deleted!");
}

main();
console.log(
	readFileSync(
		resolve(fileURLToPath(import.meta.url), "../", "ca.pem"),
	).toString(),
);
