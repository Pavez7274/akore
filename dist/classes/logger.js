"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var MessageType;
(function (MessageType) {
    MessageType["ERROR"] = "ERROR";
    MessageType["WARN"] = "WARN";
    MessageType["DEBUG"] = "DEBUG";
    MessageType["INFO"] = "INFO";
})(MessageType || (MessageType = {}));
class Logger {
    static AKORE_TAG = "\x1b[94m[AKORE]\x1b[0m";
    static PATH_TAG = "\x1b[93m[${PATH}]\x1b[0m";
    static error(message, path = "") {
        throw new Error(`${Logger.AKORE_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(MessageType.ERROR)} ${message}`);
    }
    static warn(message, path = "") {
        console.warn(`${Logger.AKORE_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(MessageType.WARN)} ${message}`);
    }
    static debug(message, path = "") {
        console.debug(`${Logger.AKORE_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(MessageType.DEBUG)} ${message}`);
    }
    static info(message, path = "") {
        console.info(`${Logger.AKORE_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(MessageType.INFO)} ${message}`);
    }
    static getTag(type) {
        switch (type) {
            case MessageType.ERROR:
                return "\x1b[31m[ERROR]\x1b[0m";
            case MessageType.WARN:
                return "\x1b[33m[WARN]\x1b[0m";
            case MessageType.DEBUG:
                return "\x1b[36m[DEBUG]\x1b[0m";
            case MessageType.INFO:
                return "\x1b[32m[INFO]\x1b[0m";
            default:
                return "";
        }
    }
}
exports.Logger = Logger;
