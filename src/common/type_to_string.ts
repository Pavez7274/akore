/**
 * Converts a given value to its corresponding type as a string representation.
 *
 * @param value - The value to convert to a type string.
 * @param indentLevel - The current level of indentation for nested structures.
 * @returns The type of the value as a string representation.
 *
 * @example
 * typeToString("hello");   // "string"
 * typeToString(42);        // "number"
 * typeToString([1, 2, 3]); // "number[]"
 * typeToString({ name: "Alice", age: 30 }); // "{\n\tname: string;\n\tage: number;\n}"
 */
export function typeToString(value: unknown, indentLevel = 1): string {
	const indent = "\t".repeat(indentLevel || 0);

	if (typeof value === "string") {
		return "string";
	}

	if (typeof value === "number") {
		return "number";
	}

	if (typeof value === "boolean") {
		return "boolean";
	}

	if (value === null) {
		return "null";
	}

	if (value === undefined) {
		return "undefined";
	}

	if (Array.isArray(value)) {
		if (value.length === 0) return "any[]";
		const types = new Set(value.map((el) => typeToString(el, 0)));
		if (types.size === 1) return `${types.values().next().value}[]`;
		return `(${[...types].join(" | ")})[]`;
	}

	if (typeof value === "object") {
		// Handle class instances
		if (value.constructor && value.constructor !== Object) {
			return `${value.constructor.name}`;
		}

		// Handle plain objects
		const entries = Object.entries(value)
			.map(
				([key, val]) =>
					`${"\t".repeat(indentLevel + 1)}${key}: ${typeToString(val, indentLevel + 1)}`,
			)
			.join(";\n");
		return `${"\t".repeat(indentLevel - 1 || 0)}{\n${entries}\n${indent}}`;
	}

	if (typeof value === "function") {
		return "function";
	}

	return "unknown";
}
