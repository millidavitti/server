import { Request, Response } from "express";

export async function getTasksController(_: Request, res: Response) {
	try {
		// Async task here
		res.status(200).json({ success: true });
	} catch (error) {
		console.log("---getTasksController---\n", error);
		res.status(400).json({ error });
	}
}
