"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicInstructions = void 0;
const tslib_1 = require("tslib");
const function_1 = tslib_1.__importDefault(require("./instructions/types/function"));
const string_1 = tslib_1.__importDefault(require("./instructions/types/string"));
const object_1 = tslib_1.__importDefault(require("./instructions/types/object"));
const array_1 = tslib_1.__importDefault(require("./instructions/types/array"));
const null_1 = tslib_1.__importDefault(require("./instructions/types/null"));
const increment_1 = tslib_1.__importDefault(require("./instructions/variables/increment"));
const call_1 = tslib_1.__importDefault(require("./instructions/variables/call"));
const get_1 = tslib_1.__importDefault(require("./instructions/variables/get"));
const var_1 = tslib_1.__importDefault(require("./instructions/variables/var"));
const escape_1 = tslib_1.__importDefault(require("./instructions/escape"));
const print_1 = tslib_1.__importDefault(require("./instructions/print"));
const new_1 = tslib_1.__importDefault(require("./instructions/new"));
const if_1 = tslib_1.__importDefault(require("./instructions/if"));
const modulo_1 = tslib_1.__importDefault(require("./instructions/util/modulo"));
const multi_1 = tslib_1.__importDefault(require("./instructions/util/multi"));
const sum_1 = tslib_1.__importDefault(require("./instructions/util/sum"));
const sub_1 = tslib_1.__importDefault(require("./instructions/util/sub"));
const continue_1 = tslib_1.__importDefault(require("./instructions/loops/continue"));
const while_1 = tslib_1.__importDefault(require("./instructions/loops/while"));
const break_1 = tslib_1.__importDefault(require("./instructions/loops/break"));
const for_1 = tslib_1.__importDefault(require("./instructions/loops/for"));
exports.BasicInstructions = {
    $increment: increment_1.default,
    $function: function_1.default,
    $continue: continue_1.default,
    $string: string_1.default,
    $object: object_1.default,
    $modulo: modulo_1.default,
    $escape: escape_1.default,
    $multi: multi_1.default,
    $break: break_1.default,
    $array: array_1.default,
    $print: print_1.default,
    $while: while_1.default,
    $null: null_1.default,
    $call: call_1.default,
    $sum: sum_1.default,
    $sub: sub_1.default,
    $new: new_1.default,
    $for: for_1.default,
    $get: get_1.default,
    $var: var_1.default,
    $if: if_1.default,
};
tslib_1.__exportStar(require("./classes/"), exports);
