import { describe, expect, test } from "@jest/globals";
import {
	Competence,
	type JavaScriptTranspiler,
	PrintCompetence,
	isClassImplementing,
	isSubclassOf,
} from "../dist";

describe("Helpers", () => {
	test("isSubclassOf", () => {
		expect(isSubclassOf(PrintCompetence, Competence)).toBe(true);
	});

	test("isSubclassOf (inited)", () => {
		const print = new PrintCompetence(null as unknown as JavaScriptTranspiler);
		expect(isSubclassOf(print.constructor, Competence)).toBe(true);
	});

	test("isClassImplementing", () => {
		expect(isClassImplementing(PrintCompetence, Competence)).toBe(true);
	});

	test("isClassImplementing (inited)", () => {
		const print = new PrintCompetence(null as unknown as JavaScriptTranspiler);
		expect(isClassImplementing(print.constructor, Competence)).toBe(true);
	});
});
