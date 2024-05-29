import { JavaScriptTranspiler } from "../dist/common/javascript/transpiler";
import { describe, expect, test } from "@jest/globals";

describe("Transpiler", () => {
	test("toCode", () => {
		const transpiler = new JavaScriptTranspiler();

		const code =
			"$declare[test;$call[someFunc];$call[process.cwd]]\n$print[$string[The value is $get[test]]]";
		transpiler.logger.info(`Transpiling:\n${code}`);

		const result = transpiler.toCode(code);
		transpiler.logger.debug(`Result:\n${result}`);

		expect(result);
	});
});
