import $function from "./instructions/types/function";
import $string from "./instructions/types/string";
import $object from "./instructions/types/object";
import $array from "./instructions/types/array";
import $null from "./instructions/types/null";

import $increment from "./instructions/variables/increment";
import $call from "./instructions/variables/call";
import $get from "./instructions/variables/get";
import $var from "./instructions/variables/var";

import $escape from "./instructions/escape";
import $print from "./instructions/print";
import $new from "./instructions/new";
import $if from "./instructions/if";

import $modulo from "./instructions/util/modulo";
import $multi from "./instructions/util/multi";
import $sum from "./instructions/util/sum";
import $sub from "./instructions/util/sub";

import $continue from "./instructions/loops/continue";
import $while from "./instructions/loops/while";
import $break from "./instructions/loops/break";
import $for from "./instructions/loops/for";

export const BasicInstructions = {
	$increment,
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
