/**
 * @deprecated use Competence.splitInside
 */
export function splitInside(input: string, splitter = ";") {
	if (!input.includes(";")) return [input];
	const parts: string[] = [];

	let current = "";
	let i = 0;
	let depth = 0;
	let char: string;
	while (i < input.length) {
		char = input.charAt(i++);
		if (char === splitter && depth === 0) {
			parts.push(current);
			current = "";
		} else if (char === "[") {
			current += char;
			depth++;
		} else if (char === "]") {
			current += char;
			depth--;
		} else {
			current += char;
		}
	}

	parts.push(current);

	return parts;
}
