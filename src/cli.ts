#!/usr/bin/env node

import { BasicInstructions, Compiler, Logger } from "./";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { getFiles } from "./helpers/get_files";
import { dirname, join } from "path";
import { program } from "commander";

// Path to the global configuration file
const configPath = join(process.cwd(), "akconfig.json");
const { version } = require("../package.json");
const cwd = process.cwd();

// Load global configuration if it exists
let globalConfig: Record<string, string> = {};
if (existsSync(configPath)) {
	globalConfig = JSON.parse(readFileSync(configPath, "utf-8"));
}

// Set up the command line interface
program
	.version(version, "-v, --version", "Output the current version")
	.usage("akore [path] [options]")
	.arguments("[path]") // Optional argument for the path
	.option("-d, --debug", "Enable debug mode")
	.option("-r, --rootDir <rootDir>", "Set the root directory for compilation")
	.option("-o, --outDir <outDir>", "Set the output directory for compiled files")
	.option("-di, --disableInstructions <instructions>", "Disable specific instructions")
	.option("-m, --minify", "Minifys the output")
	.action(async (rootDir: string = globalConfig.rootDir || "./", options) => {
		// If a path is provided, resolve it relative to the current working directory
		rootDir = rootDir ? join(cwd, rootDir) : cwd;
		if (existsSync(rootDir)) {
			// Use the provided output directory or the global configuration's output directory
			options.outDir ||= globalConfig.outDir;
			const outDir = options.outDir ? join(cwd, options.outDir) : cwd;
			if (outDir && !existsSync(outDir)) {
				// Create the output directory if it doesn't exist
				mkdirSync(outDir, { recursive: true });
			}

			const compiler = new Compiler();
			// Add basic instructions to the compiler
			for (const i of Object.values(BasicInstructions)) {
				compiler.addInstruction(new i(compiler));
			}

			if ("instructions" in globalConfig && Array.isArray(globalConfig.instructions)) {
				for (let mod of globalConfig.instructions) {
					let path = join(cwd, mod);
					if (!existsSync(path)) {
						Logger.warn(`No such file or directory "${mod}"!`, "globalConfig.instructions");
						continue;
					}
					if (compiler.loaddir(path))
						Logger.info(`${mod} instructions loaded successfully!`, "Compiler.loaddir");
					else Logger.warn(`${mod} instructions did not load!`, "Compiler.loaddir");
				}
			}

			if ("disableInstructions" in options && typeof options.disableInstructions === "string") {
				compiler.disableInstructions(
					...options.disableInstructions.split(",").map((name: string) => name.trim())
				);
			}

			// Process files in the specified path
			for (const file of getFiles(rootDir)) {
				const start = Date.now();
				if (file.endsWith(".kita")) {
					// If the file is a .kita file, compile it
					const compiled = await compiler
						.setInput(readFileSync(file, "utf-8"))
						.compile(options.debug, options.minify);
					const destPath = file.slice(0, -5).concat(".js").replace(rootDir, outDir);
					const dir = dirname(destPath);
					if (!existsSync(dir)) {
						mkdirSync(dir, { recursive: true });
					}
					writeFileSync(destPath, compiled ?? "'COMPILATION ERROR';", "utf-8");
					Logger.info(
						`Compiled \x1b[94m${file.replace(cwd, ".")}\x1b[0m to \x1b[92m${destPath.replace(
							cwd,
							"."
						)}\x1b[0m in \x1b[97m${Date.now() - start}ms\x1b[0m`,
						"Compiler"
					);
				} else {
					// If it's not a .kita file, copy it to the output directory
					const destPath = file.replace(rootDir, outDir);
					const dir = dirname(destPath);
					if (!existsSync(dir)) {
						mkdirSync(dir, { recursive: true });
					}
					copyFileSync(file, destPath);
					Logger.info(
						`Copied \x1b[94m${file.replace(cwd, ".")}\x1b[0m to \x1b[92m${destPath.replace(
							cwd,
							"."
						)}\x1b[0m in \x1b[97m${Date.now() - start}ms\x1b[0m`,
						"Compiler"
					);
				}
			}
		} else {
			Logger.error(`No such file or directory "${rootDir}"`);
		}
	});

// Parse the command line arguments
program.parse(process.argv);
