import { JavaScriptTranspiler } from "../dist/common/javascript/transpiler";
import { describe, expect, test } from "@jest/globals";

describe("Transpiler", () => {
	test("toCode", () => {
		const transpiler = new JavaScriptTranspiler();

		const code = [
			"$declare[test;$someFunc*;$process.cwd*]",
			"$print[$string[The value is $get[test]]]",
			"$declare[object_1;$object]",
			"$declare[object_2;\n\t$object[\n\t\t$property[test;hiii]\n\t]\n]",
		].join("\n");
		transpiler.logger.debug("TEST", `Transpiling:\n${code}`);

		const result = transpiler.toCode(code);
		transpiler.logger.debug("TEST", `Result:\n${result}`);

		expect(result);
	});
});
