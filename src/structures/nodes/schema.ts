import { isClassImplementing, isSubclassOf } from "#common";
import { Node } from "./node";

// biome-ignore lint/suspicious/noExplicitAny: The schema must be able to receive any type.
export class Schema<T = any> {
	public readonly identifier: string;
	public readonly schema: T;

	constructor(identifier: string, schema: T) {
		this.identifier = identifier;
		this.schema = schema;
	}

	// biome-ignore lint/suspicious/noExplicitAny: Any type must be comparable.
	compare(value: any): boolean {
		return this.compareTypes(value, this.schema);
	}

	toString(indentLevel = 1): string {
		return `Schema <${this.identifier}> {\n\t${this.schemaToString(
			this.schema,
			indentLevel,
		)}\n${"\t".repeat(indentLevel - 1)}}`;
	}

	// biome-ignore lint/suspicious/noExplicitAny: It is necessary that any type be allowed to pass.
	private compareTypes(value: any, schema: any): boolean {
		if (typeof schema === "string") {
			// biome-ignore lint/suspicious/useValidTypeof: schema must be any typeof string.
			return typeof value === schema;
		}

		if (Array.isArray(schema)) {
			if (!Array.isArray(value)) return false;
			return value.every((item) =>
				schema.length === 1
					? this.compareTypes(item, schema[0])
					: schema.some((type) => this.compareTypes(item, type)),
			);
		}

		if (typeof schema === "object") {
			if (typeof value !== "object") return false;
			for (const key in schema) {
				if (!(key in value) || !this.compareTypes(value[key], schema[key])) {
					return false;
				}
			}
			return true;
		}

		if (typeof schema === "function") {
			if (schema === Node) {
				return (
					isClassImplementing(value.constructor, Node) || isSubclassOf(value.constructor, Node)
				);
			}
			return value instanceof schema;
		}

		return false;
	}

	// biome-ignore lint/suspicious/noExplicitAny: It is necessary that any type be allowed to pass.
	private schemaToString(schema: any, indentLevel: number): string {
		const indent = "\t".repeat(indentLevel || 0);
		if (typeof schema === "string") {
			return schema;
		}

		if (Array.isArray(schema)) {
			const types = new Set(schema.map((type) => this.schemaToString(type, 0)));
			if (types.size === 0) return "any[]";
			if (types.size === 1) return `${types.values().next().value}[]`;
			return `(${[...types].join(" | ")})[]`;
		}

		if (typeof schema === "object") {
			const entries = Object.entries(schema)
				.map(
					([key, value]) =>
						`${"\t".repeat(indentLevel + 1)}${key}: ${this.schemaToString(value, indentLevel + 1)}`,
				)
				.join(";\n");
			return `${"\t".repeat(indentLevel - 1 || 0)}{\n${entries}\n${indent}}`;
		}

		if (typeof schema === "function") {
			return schema.name;
		}

		return "unknown";
	}
}
