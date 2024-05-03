import { existsSync, readFileSync } from "fs";
import { load } from "js-yaml";
import { join } from "path";

/**
 * Get the Akore configuration
 * @param configPath The path to the configuration file
 */
export function getConfig(configPath?: string) {
	// Path to the global configuration file
	configPath ||= join(process.cwd(), "akconfig");

	let config: Record<string, string> = {};

	if (existsSync(configPath + ".json")) {
		config = JSON.parse(readFileSync(configPath + ".json", "utf-8"));
	} else if (existsSync(configPath + ".yaml") || existsSync(configPath + ".yml")) {
		const ext = existsSync(configPath + ".yaml") ? ".yaml" : ".yml";
		const configFile = readFileSync(configPath + ext, "utf-8");
		config = load(configFile) as Record<string, string>;
	}

	return config;
}
