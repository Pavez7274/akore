#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const helpers_1 = require("./helpers");
const { version } = require("../package.json");
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
    .action(async (rootDir, options) => {
    (0, helpers_1.transpileFiles)(rootDir, options);
});
// Parse the command line arguments
commander_1.program.parse(process.argv);
