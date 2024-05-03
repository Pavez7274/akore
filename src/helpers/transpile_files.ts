import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { minify } from "uglify-js";
import { BasicInstructions, Logger, Transpiler } from "..";
import { getConfig } from "./get_config";
import { getFiles } from "./get_files";

const cwd = process.cwd();

/**
 * Run the transpiler on the specified path
 * @param rootDir The root directory to compile
 * @param options The compiler options
 */
export async function transpileFiles(rootDir?: string, options: Record<string, any> = {}) {
	// Get the global configuration
	const globalConfig = getConfig();

	// If a path is provided, resolve it relative to the current working directory
	rootDir = rootDir ? join(cwd, rootDir || globalConfig.rootDir || "./") : cwd;

	if (existsSync(rootDir)) {
		// Use the provided output directory or the global globalConfiguration's output directory
		options.outDir ||= globalConfig.outDir;
		const outDir = options.outDir ? join(cwd, options.outDir) : cwd;
		if (outDir && !existsSync(outDir)) {
			// Create the output directory if it doesn't exist
			mkdirSync(outDir, { recursive: true });
		}

		const compiler = new Transpiler();
		// Add basic instructions to the compiler
		for (const i of Object.values(BasicInstructions)) {
			compiler.manager.add(new i(compiler));
		}

		if ("instructions" in globalConfig && Array.isArray(globalConfig.instructions)) {
			for (let mod of globalConfig.instructions) {
				let path = join(cwd, mod);
				if (!existsSync(path)) {
					Logger.warn(`No such file or directory "${mod}"!`, "globalConfig.instructions");
					continue;
				}
				if (compiler.manager.loaddir(path, compiler)) Logger.info(`${mod} instructions loaded successfully!`, "Compiler.loaddir");
				else Logger.warn(`${mod} instructions did not load!`, "Compiler.loaddir");
			}
		}

		if ("disableInstructions" in options && typeof options.disableInstructions === "string") {
			compiler.manager.disable(...options.disableInstructions.split(",").map((name: string) => name.trim()));
		}

		// Process files in the specified path
		for (const file of getFiles(rootDir)) {
			const start = Date.now();
			if (file.endsWith(".kita")) {
				// If the file is a .kita file, compile it
				const compiled =
					(await compiler.setInput(readFileSync(file, "utf-8")).transpile(options.debug)) ?? "'COMPILATION ERROR';";
				const destPath = file.slice(0, -5).concat(".js").replace(rootDir, outDir);
				const dir = dirname(destPath);
				if (!existsSync(dir)) {
					mkdirSync(dir, { recursive: true });
				}
				writeFileSync(destPath, options.minify ? minify(compiled, { output: { beautify: true } }).code : compiled, "utf-8");
				Logger.info(
					`Compiled \x1b[94m${file.replace(cwd, ".")}\x1b[0m to \x1b[92m${destPath.replace(
						cwd,
						".",
					)}\x1b[0m in \x1b[97m${Date.now() - start}ms\x1b[0m`,
					"Compiler",
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
						".",
					)}\x1b[0m in \x1b[97m${Date.now() - start}ms\x1b[0m`,
					"Compiler",
				);
			}
		}
	} else {
		Logger.error(`No such file or directory "${rootDir}"`);
	}
}
