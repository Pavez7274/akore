"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpileFiles = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const uglify_js_1 = require("uglify-js");
const __1 = require("..");
const get_config_1 = require("./get_config");
const get_files_1 = require("./get_files");
const cwd = process.cwd();
/**
 * Run the transpiler on the specified path
 * @param rootDir The root directory to compile
 * @param options The compiler options
 */
async function transpileFiles(rootDir, options = {}) {
    // Get the global configuration
    const globalConfig = (0, get_config_1.getConfig)();
    // If a path is provided, resolve it relative to the current working directory
    rootDir = rootDir ? (0, path_1.join)(cwd, rootDir || globalConfig.rootDir || "./") : cwd;
    if ((0, fs_1.existsSync)(rootDir)) {
        // Use the provided output directory or the global globalConfiguration's output directory
        options.outDir ||= globalConfig.outDir;
        const outDir = options.outDir ? (0, path_1.join)(cwd, options.outDir) : cwd;
        if (outDir && !(0, fs_1.existsSync)(outDir)) {
            // Create the output directory if it doesn't exist
            (0, fs_1.mkdirSync)(outDir, { recursive: true });
        }
        const compiler = new __1.Transpiler();
        // Add basic instructions to the compiler
        for (const i of Object.values(__1.BasicInstructions)) {
            compiler.manager.add(new i(compiler));
        }
        if ("instructions" in globalConfig && Array.isArray(globalConfig.instructions)) {
            for (let mod of globalConfig.instructions) {
                let path = (0, path_1.join)(cwd, mod);
                if (!(0, fs_1.existsSync)(path)) {
                    __1.Logger.warn(`No such file or directory "${mod}"!`, "globalConfig.instructions");
                    continue;
                }
                if (compiler.manager.loaddir(path, compiler))
                    __1.Logger.info(`${mod} instructions loaded successfully!`, "Compiler.loaddir");
                else
                    __1.Logger.warn(`${mod} instructions did not load!`, "Compiler.loaddir");
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
                __1.Logger.info(`Compiled \x1b[94m${file.replace(cwd, ".")}\x1b[0m to \x1b[92m${destPath.replace(cwd, ".")}\x1b[0m in \x1b[97m${Date.now() - start}ms\x1b[0m`, "Compiler");
            }
            else {
                // If it's not a .kita file, copy it to the output directory
                const destPath = file.replace(rootDir, outDir);
                const dir = (0, path_1.dirname)(destPath);
                if (!(0, fs_1.existsSync)(dir)) {
                    (0, fs_1.mkdirSync)(dir, { recursive: true });
                }
                (0, fs_1.copyFileSync)(file, destPath);
                __1.Logger.info(`Copied \x1b[94m${file.replace(cwd, ".")}\x1b[0m to \x1b[92m${destPath.replace(cwd, ".")}\x1b[0m in \x1b[97m${Date.now() - start}ms\x1b[0m`, "Compiler");
            }
        }
    }
    else {
        __1.Logger.error(`No such file or directory "${rootDir}"`);
    }
}
exports.transpileFiles = transpileFiles;
