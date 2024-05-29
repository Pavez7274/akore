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
