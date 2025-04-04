import crypto from "crypto";

export function generateCsrfToken(sessionID: string, secret: string) {
	if (sessionID && secret)
		return crypto
			.createHmac("sha256", secret)
			.update(sessionID)
			.digest("base64");
}

export function generateCsrfSecret() {
	return crypto.randomBytes(32).toString("base64");
}
