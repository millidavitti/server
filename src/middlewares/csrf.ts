import { generateCsrfToken } from "@model/auth/csrf.model";
import { NextFunction, Request, Response } from "express";

export function csrf(req: Request, res: Response, next: NextFunction) {
	if (
		req.headers["x-csrf-token"] ===
		generateCsrfToken(req.sessionID, req.session.ctx?.secret)
	)
		next();
	else res.status(403).json({ error: "CSRF token mismatch" });
}
