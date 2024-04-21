#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const _1 = require("./");
const get_files_1 = require("./helpers/get_files");
const path_1 = require("path");
const commander_1 = require("commander");
const js_yaml_1 = require("js-yaml");
const uglify_js_1 = require("uglify-js");
// Path to the global configuration file
const configPath = (0, path_1.join)(process.cwd(), "akconfig");
const { version } = require("../package.json");
const cwd = process.cwd();
// Load global configuration if it exists
let globalConfig = {};
if ((0, fs_1.existsSync)(configPath + ".json")) {
    globalConfig = JSON.parse((0, fs_1.readFileSync)(configPath + ".json", "utf-8"));
}
else if ((0, fs_1.existsSync)(configPath + ".yaml") || (0, fs_1.existsSync)(configPath + ".yml")) {
    const ext = (0, fs_1.existsSync)(configPath + ".yaml") ? ".yaml" : ".yml";
    const configFile = (0, fs_1.readFileSync)(configPath + ext, "utf-8");
    globalConfig = (0, js_yaml_1.load)(configFile);
}
// Set up the command line interface
commander_1.program
    .version(version, "-v, --version", "Output the current version")
    .usage("akore [path] [options]")
    .arguments("[path]") // Optional argument for the path
    .option("-d, --debug", "Enable debug mode")
    .option("-r, --rootDir <rootDir>", "Set the root directory for compilation")
    .option("-o, --outDir <outDir>", "Set the output directory for compiled files")
    .option("-di, --disableInstructions <instructions>", "Disable specific instructions")
    .option("-m, --minify", "Minify the output")
    .action(async (rootDir = globalConfig.rootDir || "./", options) => {
    // If a path is provided, resolve it relative to the current working directory
    rootDir = rootDir ? (0, path_1.join)(cwd, rootDir) : cwd;
    if ((0, fs_1.existsSync)(rootDir)) {
        // Use the provided output directory or the global configuration's output directory
        options.outDir ||= globalConfig.outDir;
        const outDir = options.outDir ? (0, path_1.join)(cwd, options.outDir) : cwd;
        if (outDir && !(0, fs_1.existsSync)(outDir)) {
            // Create the output directory if it doesn't exist
            (0, fs_1.mkdirSync)(outDir, { recursive: true });
        }
        const compiler = new _1.Transpiler();
        // Add basic instructions to the compiler
        for (const i of Object.values(_1.BasicInstructions)) {
            compiler.manager.add(new i(compiler));
        }
        if ("instructions" in globalConfig && Array.isArray(globalConfig.instructions)) {
            for (let mod of globalConfig.instructions) {
                let path = (0, path_1.join)(cwd, mod);
                if (!(0, fs_1.existsSync)(path)) {
                    _1.Logger.warn(`No such file or directory "${mod}"!`, "globalConfig.instructions");
                    continue;
                }
                if (compiler.manager.loaddir(path, compiler))
                    _1.Logger.info(`${mod} instructions loaded successfully!`, "Compiler.loaddir");
                else
                    _1.Logger.warn(`${mod} instructions did not load!`, "Compiler.loaddir");
            }
        }
        if ("disableInstructions" in options && typeof options.disableInstructions === "string") {
            compiler.manager.disable(...options.disableInstructions.split(",").map((name) => name.trim()));
        }
        // Process files in the specified path
        for (const file of (0, get_files_1.getFiles)(rootDir)) {
            const start = Date.now();
            if (file.endsWith(".kita")) {
                // If the file is a .kita file, compile it
                const compiled = (await compiler.setInput((0, fs_1.readFileSync)(file, "utf-8")).transpile(options.debug)) ?? "'COMPILATION ERROR';";
                const destPath = file.slice(0, -5).concat(".js").replace(rootDir, outDir);
                const dir = (0, path_1.dirname)(destPath);
                if (!(0, fs_1.existsSync)(dir)) {
                    (0, fs_1.mkdirSync)(dir, { recursive: true });
                }
                (0, fs_1.writeFileSync)(destPath, options.minify ? (0, uglify_js_1.minify)(compiled, { output: { beautify: true } }).code : compiled, "utf-8");
                _1.Logger.info(`Compiled \x1b[94m${file.replace(cwd, ".")}\x1b[0m to \x1b[92m${destPath.replace(cwd, ".")}\x1b[0m in \x1b[97m${Date.now() - start}ms\x1b[0m`, "Compiler");
            }
            else {
                // If it's not a .kita file, copy it to the output directory
                const destPath = file.replace(rootDir, outDir);
                const dir = (0, path_1.dirname)(destPath);
                if (!(0, fs_1.existsSync)(dir)) {
                    (0, fs_1.mkdirSync)(dir, { recursive: true });
                }
                (0, fs_1.copyFileSync)(file, destPath);
                _1.Logger.info(`Copied \x1b[94m${file.replace(cwd, ".")}\x1b[0m to \x1b[92m${destPath.replace(cwd, ".")}\x1b[0m in \x1b[97m${Date.now() - start}ms\x1b[0m`, "Compiler");
            }
        }
    }
    else {
        _1.Logger.error(`No such file or directory "${rootDir}"`);
    }
});
// Parse the command line arguments
commander_1.program.parse(process.argv);
