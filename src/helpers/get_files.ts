import { readdirSync } from "fs";
import { join } from "path";

export function getFiles(mod: string): string[] {
	const entries = readdirSync(mod, { withFileTypes: true });
	let result: string[] = [];

	for (const entry of entries) {
		const fullPath = join(mod, entry.name);
		if (entry.isDirectory()) {
			result = result.concat(getFiles(fullPath));
		} else {
			result.push(fullPath);
		}
	}

	return result;
}
