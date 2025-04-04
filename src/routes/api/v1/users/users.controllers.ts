import { getErrorMessage } from "src/helpers/get-error-message";
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "@model/user.model";
import { NextFunction, Request, Response } from "express";

export async function getUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const user = await getUser(req.params.userId);
		res.status(200).json({ success: true, user });
	} catch (error) {
		next(
			Object.assign(error as any, {
				controller: "getUser",
				route: "/api/v1/users/:userId",
			}),
		);
	}
}

export async function getUsersController(
	_: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const users = await getUsers();
		res.status(200).json({ success: true, users });
	} catch (error) {
		next(
			Object.assign(error as any, {
				controller: "getUsers",
				route: "/api/v1/users",
			}),
		);
	}
}

export async function createUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const user = await createUser(req.body);
		res.status(200).json({ success: true, user });
	} catch (error) {
		next(
			Object.assign(error as any, {
				controller: "getUser",
				route: "/api/v1/users",
			}),
		);
	}
}

export async function updateUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const update = await updateUser(req.params.userId, req.body);
		res.status(200).json({ success: true, user: update });
	} catch (error) {
		next(
			Object.assign(error as any, {
				controller: "getUser",
				route: "/api/v1/users/:userId",
			}),
		);
	}
}

export async function deleteUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const user = await deleteUser(req.params.userId);
		res.status(200).json({ success: true, user: user });
	} catch (error) {
		next(
			Object.assign(error as any, {
				controller: "getUser",
				route: "/api/v1/users/:userId",
			}),
		);
	}
}
