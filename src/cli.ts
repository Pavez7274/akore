#!/usr/bin/env node

import { program } from "commander";
import { transpileFiles } from "./helpers";

const { version } = require("../package.json");

// Set up the command line interface
program
	.version(version, "-v, --version", "Output the current version")
	.usage("akore [path] [options]")
	.arguments("[path]") // Optional argument for the path
	.option("-d, --debug", "Enable debug mode")
	.option("-r, --rootDir <rootDir>", "Set the root directory for compilation")
	.option("-o, --outDir <outDir>", "Set the output directory for compiled files")
	.option("-di, --disableInstructions <instructions>", "Disable specific instructions")
	.option("-m, --minify", "Minify the output")
	.action(async (rootDir: string, options) => {
		transpileFiles(rootDir, options);
	});

// Parse the command line arguments
program.parse(process.argv);
