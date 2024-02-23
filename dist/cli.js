#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const fs_1 = require("fs");
const get_files_1 = require("./helpers/get_files");
const commander_1 = require("commander");
const path_1 = require("path");
const configPath = (0, path_1.join)(process.cwd(), "akconfig.json");
let globalConfig = {};
if ((0, fs_1.existsSync)(configPath)) {
    globalConfig = JSON.parse((0, fs_1.readFileSync)(configPath, "utf-8"));
}
commander_1.program
    .arguments("[path]") // Ahora path es opcional
    .option("-d, --debug", "Enable debug mode")
    .option("-r, --rootDir <rootDir>", "Set the root directory for compilation")
    .option("-o, --outDir <outDir>", "Set the output directory for compiled files")
    .action(async (path = globalConfig.rootDir, options) => {
    path = path ? (0, path_1.join)(process.cwd(), path) : process.cwd();
    if ((0, fs_1.existsSync)(path)) {
        options.outDir ||= globalConfig.outDir;
        const outDir = options.outDir ? (0, path_1.join)(process.cwd(), options.outDir) : process.cwd();
        if (outDir && !(0, fs_1.existsSync)(outDir)) {
            (0, fs_1.mkdirSync)(outDir, { recursive: true });
        }
        const compiler = new _1.Compiler();
        for (const i of Object.values(_1.BasicInstructions)) {
            compiler.instructionsManager.add(new i(compiler));
        }
        for (const file of (0, get_files_1.getFiles)(path)) {
            if (file.endsWith(".kita")) {
                console.log(compiler.output, compiler.vars);
                const compiled = await compiler
                    .setInput((0, fs_1.readFileSync)(file, "utf-8"))
                    .compile(options.debug);
                const destPath = file.slice(0, -5).concat(".js").replace(path, outDir);
                const dir = (0, path_1.dirname)(destPath);
                if (!(0, fs_1.existsSync)(dir)) {
                    (0, fs_1.mkdirSync)(dir, { recursive: true });
                }
                _1.Logger.debug(`Compiled ${file} to ${destPath}`, "Compiler");
                (0, fs_1.writeFileSync)(destPath, compiled ?? "'COMPILATION ERROR';", "utf-8");
            }
            else {
                const destPath = file.replace(path, outDir);
                const dir = (0, path_1.dirname)(destPath);
                if (!(0, fs_1.existsSync)(dir)) {
                    (0, fs_1.mkdirSync)(dir, { recursive: true });
                }
                _1.Logger.debug(`Copied ${file} to ${destPath}`, "Compiler");
                (0, fs_1.copyFileSync)(file, destPath);
            }
        }
    }
    else {
        _1.Logger.error(`No such file or directory "${path}"`);
    }
});
commander_1.program.parse(process.argv);
