import chalk from "chalk";
import { getErrorMessage } from "./get-error-message";

export function generateErrorLog(fnName: string, error: unknown) {
	const log = `🚨 ${chalk.red.bold("[Error][Model]")}: ${chalk.blue.bold(
		fnName,
	)} - | ${chalk.cyan.bold("Message")}: ${chalk.bold(getErrorMessage(error))}`;
	console.error(log);
	console.error(error);
}
