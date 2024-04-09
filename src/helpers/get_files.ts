import { readdirSync } from "fs";
import { join } from "path";

/**
 * Recursively get all files in a directory and its subdirectories.
 * @param {string} mod - The path of the directory to search.
 * @returns {string[]} An array containing the paths of all files found in the directory and its subdirectories.
 */
export function getFiles(mod: string): string[] {
	const entries = readdirSync(mod, { withFileTypes: true });
	let result: string[] = [];

	for (const entry of entries) {
		const fullPath = join(mod, entry.name);
		if (entry.isDirectory()) {
			// Recursively get files in subdirectories
			result = result.concat(getFiles(fullPath));
		} else {
			// Add file path to result array
			result.push(fullPath);
		}
	}

	return result;
}
