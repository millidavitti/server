import { transporter } from "@db/email/mailer";
import { magicLinkEmailTemplate } from "@db/email/templates/magic-link.template";
import { getErrorMessage } from "src/helpers/get-error-message";

export async function sendMagicLink(email: string, signInToken: string) {
	try {
		// await transporter.sendMail({
		// 	from: process.env.EMAIL_FROM,
		// 	to: email,
		// 	subject: "Sign In Magic Link",
		// 	html: magicLinkEmailTemplate(
		// 		`${process.env.ORIGIN}/auth/sign-in/verification?sign-in-token=${signInToken}`,
		// 	),
		// });
		console.log(
			"---Magic Link---\n",
			`${process.env.ORIGIN}/auth/sign-in/verification?sign-in-token=${signInToken}`,
		);
	} catch (error) {
		console.error("---sendMagicLink---\n", error);
		throw new Error(getErrorMessage(error));
	}
}
