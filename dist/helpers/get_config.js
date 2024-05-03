"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const path_1 = require("path");
/**
 * Get the Akore configuration
 * @param configPath The path to the configuration file
 */
function getConfig(configPath) {
    // Path to the global configuration file
    configPath ||= (0, path_1.join)(process.cwd(), "akconfig");
    let config = {};
    if ((0, fs_1.existsSync)(configPath + ".json")) {
        config = JSON.parse((0, fs_1.readFileSync)(configPath + ".json", "utf-8"));
    }
    else if ((0, fs_1.existsSync)(configPath + ".yaml") || (0, fs_1.existsSync)(configPath + ".yml")) {
        const ext = (0, fs_1.existsSync)(configPath + ".yaml") ? ".yaml" : ".yml";
        const configFile = (0, fs_1.readFileSync)(configPath + ext, "utf-8");
        config = (0, js_yaml_1.load)(configFile);
    }
    return config;
}
exports.getConfig = getConfig;
