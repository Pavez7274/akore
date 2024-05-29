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

export class Logger {
	private akore = this.color(" AKORE ", AnsiStyle.BgBlue, AnsiStyle.Bold);

	public pad(text: string, length: number, chars = " "): string {
		if (text.length >= length) return text;
		const start = Math.floor(length / 2) - text.length;
		const end = length - start - text.length;
		return chars.repeat(start) + text + chars.repeat(end);
	}

	public createAnsiCode(...styles: string[]): string {
		return `\x1b[${styles.join(";")}m`;
	}

	public color(text: string, ...styles: string[]) {
		return `${this.createAnsiCode(...styles)}${text}${AnsiStyle.Reset}`;
	}

	public format(text: string) {
		return `\n\t${text.replace(/(\n+)(\s*)/g, "$1\t$2")}`;
	}

	public info(message: string) {
		console.log(
			this.akore,
			this.color(" INFORMATION ", AnsiStyle.BgGreen, AnsiStyle.Bold),
			this.time,
			this.color(this.format(message), AnsiStyle.Dim),
		);
	}

	public debug(message: string) {
		console.log(
			this.akore,
			this.color(" DEBUG ", AnsiStyle.BgMagenta, AnsiStyle.Bold),
			this.time,
			this.color(this.format(message), AnsiStyle.Dim, AnsiStyle.Italic),
		);
	}

	public warn(message: string) {
		console.log(
			this.akore,
			this.color(" WARN ", AnsiStyle.BgYellow, AnsiStyle.Bold),
			this.time,
			this.color(this.format(message), AnsiStyle.Yellow),
		);
	}

	public error(error: string) {
		console.log(
			this.akore,
			this.color(" ERROR ", AnsiStyle.BgRed, AnsiStyle.Bold),
			this.time,
			this.color(this.format(error), AnsiStyle.Red),
		);
	}

	private get time() {
		const date = new Date();
		return this.color(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`, AnsiStyle.Dim);
	}
}

export const logger = new Logger();
