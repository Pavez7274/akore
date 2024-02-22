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
    static AKITA_TAG = "\x1b[34m[AKITA]\x1b[0m";
    static PATH_TAG = "\x1b[90m[${PATH}]\x1b[0m";
    static error(message, path = "") {
        console.error(`${Logger.AKITA_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(MessageType.ERROR)} ${message}`);
        throw new Error(message);
    }
    static warn(message, path = "") {
        console.warn(`${Logger.AKITA_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(MessageType.WARN)} ${message}`);
    }
    static debug(message, path = "") {
        console.debug(`${Logger.AKITA_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(MessageType.DEBUG)} ${message}`);
    }
    static info(message, path = "") {
        console.info(`${Logger.AKITA_TAG} ${Logger.PATH_TAG.replace("${PATH}", path)} ${Logger.getTag(MessageType.INFO)} ${message}`);
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
