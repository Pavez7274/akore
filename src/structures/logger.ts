export enum AnsiStyle {
	// Reset
	Reset = "\x1b[0m",

	// Text Styles
	Bold = "1",
	Dim = "2",
	Italic = "3",
	Underline = "4",
	Blink = "5",
	Inverse = "7",
	Hidden = "8",
	Strikethrough = "9",

	// Text Colors
	Black = "30",
	Red = "31",
	Green = "32",
	Yellow = "33",
	Blue = "34",
	Magenta = "35",
	Cyan = "36",
	White = "37",

	// Bright Text Colors
	BrightBlack = "90",
	BrightRed = "91",
	BrightGreen = "92",
	BrightYellow = "93",
	BrightBlue = "94",
	BrightMagenta = "95",
	BrightCyan = "96",
	BrightWhite = "97",

	// Background Colors
	BgBlack = "40",
	BgRed = "41",
	BgGreen = "42",
	BgYellow = "43",
	BgBlue = "44",
	BgMagenta = "45",
	BgCyan = "46",
	BgWhite = "47",

	// Bright Background Colors
	BgBrightBlack = "100",
	BgBrightRed = "101",
	BgBrightGreen = "102",
	BgBrightYellow = "103",
	BgBrightBlue = "104",
	BgBrightMagenta = "105",
	BgBrightCyan = "106",
	BgBrightWhite = "107",
}

/**
 * Logger class for logging messages with ANSI styling and formatting.
 */
export class Logger {
	/** Prefix for log messages with AKORE styling */
	private akore = this.color(" AKORE ", AnsiStyle.BgBlue, AnsiStyle.Bold);

	/**
	 * Pads the given text to the specified length using the specified characters.
	 * @param text - The text to pad.
	 * @param length - The desired length of the padded text.
	 * @param chars - The characters to use for padding. Defaults to a space.
	 * @returns The padded text.
	 */
	public pad(text: string, length: number, chars = " "): string {
		if (text.length >= length) return text;
		const start = Math.floor(length / 2) - text.length;
		const end = length - start - text.length;
		return chars.repeat(start) + text + chars.repeat(end);
	}

	/**
	 * Creates an ANSI escape code string with the specified styles.
	 * @param styles - The styles to apply.
	 * @returns The ANSI escape code string.
	 */
	public createAnsiCode(...styles: string[]): string {
		return `\x1b[${styles.join(";")}m`;
	}

	/**
	 * Colors the given text with the specified ANSI styles.
	 * @param text - The text to color.
	 * @param styles - The styles to apply.
	 * @returns The styled text.
	 */
	public color(text: string, ...styles: string[]): string {
		return `${this.createAnsiCode(...styles)}${text}${AnsiStyle.Reset}`;
	}

	/**
	 * Formats the given text by adding a tab character before each line.
	 * @param text - The text to format.
	 * @returns The formatted text.
	 */
	public format(text: string): string {
		return `\n\t${text.replace(/(\n+)(\s*)/g, "$1\t$2")}`;
	}

	/**
	 * Logs an informational message.
	 * @param from - The source of the message.
	 * @param message - The message to log.
	 */
	public info(from: string, message: string) {
		console.log(
			this.akore,
			this.color(` ${from.toUpperCase()} `, AnsiStyle.BgGreen, AnsiStyle.Bold),
			this.color(" INFORMATION ", AnsiStyle.BgGreen, AnsiStyle.Bold),
			this.time,
			this.color(this.format(message), AnsiStyle.Dim),
		);
	}

	/**
	 * Logs a debug message.
	 * @param from - The source of the message.
	 * @param message - The message to log.
	 */
	public debug(from: string, message: string) {
		console.log(
			this.akore,
			this.color(` ${from.toUpperCase()} `, AnsiStyle.BgMagenta, AnsiStyle.Bold),
			this.color(" DEBUG ", AnsiStyle.BgMagenta, AnsiStyle.Bold),
			this.time,
			this.color(this.format(message), AnsiStyle.Dim, AnsiStyle.Italic),
		);
	}

	/**
	 * Logs a warning message.
	 * @param from - The source of the message.
	 * @param message - The message to log.
	 */
	public warn(from: string, message: string) {
		console.log(
			this.akore,
			this.color(` ${from.toUpperCase()} `, AnsiStyle.BgYellow, AnsiStyle.Bold),
			this.color(" WARN ", AnsiStyle.BgYellow, AnsiStyle.Bold),
			this.time,
			this.color(this.format(message), AnsiStyle.Yellow),
		);
	}

	/**
	 * Logs an error message.
	 * @param from - The source of the message.
	 * @param error - The error message to log.
	 */
	public error(from: string, error: string) {
		console.log(
			this.akore,
			this.color(` ${from.toUpperCase()} `, AnsiStyle.BgRed, AnsiStyle.Bold),
			this.color(" ERROR ", AnsiStyle.BgRed, AnsiStyle.Bold),
			this.time,
			this.color(this.format(error), AnsiStyle.Red),
		);
	}

	/**
	 * Gets the current date and time formatted as a string.
	 * @returns The formatted date and time string.
	 */
	private get time() {
		const date = new Date();
		return this.color(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`, AnsiStyle.Dim);
	}
}

export const logger = new Logger();
