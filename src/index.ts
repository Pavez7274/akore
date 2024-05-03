import { register } from "tsconfig-paths";
register();

import $array from "./instructions/types/array";
import $function from "./instructions/types/function";
import $null from "./instructions/types/null";
import $object from "./instructions/types/object";
import $string from "./instructions/types/string";

import $call from "./instructions/variables/call";
import $compound from "./instructions/variables/compound";
import $get from "./instructions/variables/get";
import $var from "./instructions/variables/var";

import $escape from "./instructions/escape";
import $if from "./instructions/if";
import $new from "./instructions/new";
import $print from "./instructions/print";

import $modulo from "./instructions/util/modulo";
import $multi from "./instructions/util/multi";
import $sub from "./instructions/util/sub";
import $sum from "./instructions/util/sum";

import $break from "./instructions/loops/break";
import $continue from "./instructions/loops/continue";
import $for from "./instructions/loops/for";
import $while from "./instructions/loops/while";

export const BasicInstructions = {
	$compound,
	$function,
	$continue,
	$string,
	$object,
	$modulo,
	$escape,
	$multi,
	$break,
	$array,
	$print,
	$while,
	$null,
	$call,
	$sum,
	$sub,
	$new,
	$for,
	$get,
	$var,
	$if,
};

export * from "./classes/";
export { transpileFiles } from "./helpers/transpile_files";
