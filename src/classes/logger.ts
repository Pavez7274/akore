enum MessageType {
	ERROR = "ERROR",
	WARN = "WARN",
	DEBUG = "DEBUG",
	INFO = "INFO",
}

export class Logger {
	private static readonly AKORE_TAG = "\x1b[94m[AKORE]\x1b[0m";
	private static readonly PATH_TAG = "\x1b[93m[${PATH}]\x1b[0m";

	static error(message: string, path: string = ""): never {
		console.error(
			`${Logger.AKORE_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(
				MessageType.ERROR
			)} ${message}`
		);
		process.exit();
	}

	static warn(message: string, path: string = "") {
		console.warn(
			`${Logger.AKORE_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(
				MessageType.WARN
			)} ${message}`
		);
	}

	static debug(message: unknown, path: string = "") {
		console.debug(
			`${Logger.AKORE_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(
				MessageType.DEBUG
			)} ${message}`
		);
	}

	static info(message: string, path: string = "") {
		console.info(
			`${Logger.AKORE_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(
				MessageType.INFO
			)} ${message}`
		);
	}

	private static getTag(type: MessageType): string {
		switch (type) {
			case MessageType.ERROR:
				return "\x1b[31m[ERROR]\x1b[0m";
			case MessageType.WARN:
				return "\x1b[33m[WARN]\x1b[0m";
			case MessageType.DEBUG:
				return "\x1b[36m[DEBUG]\x1b[0m";
			case MessageType.INFO:
				return "\x1b[32m[INFO]\x1b[0m";
			default:
				return "";
		}
	}
}
