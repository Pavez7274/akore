#!/usr/bin/env node

import { BasicInstructions, Compiler, Logger } from "./";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { getFiles } from "./helpers/get_files";
import { program } from "commander";
import { dirname, join } from "path";

const configPath = join(process.cwd(), "akconfig.json");

let globalConfig: Record<string, string> = {};
if (existsSync(configPath)) {
	globalConfig = JSON.parse(readFileSync(configPath, "utf-8"));
}

program
	.arguments("[path]") // Ahora path es opcional
	.option("-d, --debug", "Enable debug mode")
	.option("-r, --rootDir <rootDir>", "Set the root directory for compilation")
	.option("-o, --outDir <outDir>", "Set the output directory for compiled files")
	.action(async (path: string | undefined = globalConfig.rootDir, options) => {
		path = path ? join(process.cwd(), path) : process.cwd();
		if (existsSync(path)) {
			options.outDir ||= globalConfig.outDir;
			const outDir = options.outDir ? join(process.cwd(), options.outDir) : process.cwd();
			if (outDir && !existsSync(outDir)) {
				mkdirSync(outDir, { recursive: true });
			}

			const compiler = new Compiler();
			for (const i of Object.values(BasicInstructions)) {
				compiler.instructionsManager.add(new i(compiler));
			}

			for (const file of getFiles(path)) {
				if (file.endsWith(".kita")) {
					console.log(compiler.output, compiler.vars);
					const compiled = await compiler
						.setInput(readFileSync(file, "utf-8"))
						.compile(options.debug);
					const destPath = file.slice(0, -5).concat(".js").replace(path, outDir);
					const dir = dirname(destPath);
					if (!existsSync(dir)) {
						mkdirSync(dir, { recursive: true });
					}
					Logger.debug(`Compiled ${file} to ${destPath}`, "Compiler");
					writeFileSync(destPath, compiled ?? "'COMPILATION ERROR';", "utf-8");
				} else {
					const destPath = file.replace(path, outDir);
					const dir = dirname(destPath);
					if (!existsSync(dir)) {
						mkdirSync(dir, { recursive: true });
					}
					Logger.debug(`Copied ${file} to ${destPath}`, "Compiler");
					copyFileSync(file, destPath);
				}
			}
		} else {
			Logger.error(`No such file or directory "${path}"`);
		}
	});

program.parse(process.argv);
