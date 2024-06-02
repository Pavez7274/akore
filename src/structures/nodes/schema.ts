import { isClassImplementing, isSubclassOf } from "#common";
import { Node } from "./node";

/**
 * Class representing a schema for validating and comparing values.
 * @template T - The type of the schema.
 */
// biome-ignore lint/suspicious/noExplicitAny: The schema must be able to receive any type.
export class Schema<T = any> {
	/** The identifier for this schema. */
	public readonly identifier: string;
	/** The schema definition. */
	public readonly schema: T;

	/**
	 * Creates a new Schema instance.
	 * @param identifier - The identifier for the schema.
	 * @param schema - The schema definition.
	 */
	constructor(identifier: string, schema: T) {
		this.identifier = identifier;
		this.schema = schema;
	}

	/**
	 * Compares a value against the schema.
	 * @param value - The value to compare.
	 * @returns Whether the value matches the schema.
	 */
	// biome-ignore lint/suspicious/noExplicitAny: Any type must be comparable.
	compare(value: any): boolean {
		return this.compareTypes(value, this.schema);
	}

	/**
	 * Returns a string representation of the schema.
	 * @param indentLevel - The indentation level for formatting the string.
	 * @returns A formatted string representation of the schema.
	 */
	toString(indentLevel = 1): string {
		return `Schema <${this.identifier}> {\n\t${this.schemaToString(
			this.schema,
			indentLevel,
		)}\n${"\t".repeat(indentLevel - 1)}}`;
	}

	/**
	 * Compares a value against a specific schema.
	 * @param value - The value to compare.
	 * @param schema - The schema to compare against.
	 * @returns Whether the value matches the schema.
	 * @private
	 */
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

	/**
	 * Converts a schema to a string representation.
	 * @param schema - The schema to convert.
	 * @param indentLevel - The indentation level for formatting the string.
	 * @returns A formatted string representation of the schema.
	 * @private
	 */
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
