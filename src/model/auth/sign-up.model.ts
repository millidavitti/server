import { emailVerificationTemplate } from "@db/email/templates/email-verification";
import { transporter } from "@db/email/mailer";
import { z } from "zod";
import { createUser } from "@model/user.model";
import { getErrorMessage } from "src/helpers/get-error-message";

export async function signUp(credentials: Credentials) {
	try {
		const { data, success, error } = ZodCredentials.safeParse(credentials);
		if (success) {
			const user = await createUser(data);
			return user;
		} else throw new Error(getErrorMessage(error));
	} catch (error) {
		console.error("---signUp---\n", error);
		throw new Error(getErrorMessage(error));
	}
}

export async function sendVerificationEmail(
	email: string,
	verificationToken: string,
) {
	try {
		await transporter.sendMail({
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Verify your email address",
			html: emailVerificationTemplate(
				`${process.env.ORIGIN}/auth/sign-up/verify-email?verification-token=${verificationToken}`,
			),
		});
		console.log(
			"---Verification Email---\n",
			`${process.env.ORIGIN}/auth/sign-up/verify-email?verification-token=${verificationToken}`,
		);
	} catch (error) {
		console.error("---sendVerificationEmail---\n", error);
		throw new Error(getErrorMessage(error));
	}
}

const ZodCredentials = z.object({
	name: z.string(),
	email: z.string().email(),
});
type Credentials = z.infer<typeof ZodCredentials>;
