import type { Node } from "./node";
import { Schema } from "./schema";

/**
 * Class representing a registry for schemas.
 */
export class Registry {
	/** A record of schemas indexed by their type identifier. */
	public readonly schemas: Record<string, Schema>;

	/**
	 * Creates a new Registry instance.
	 * @param schemas - A record of schemas to initialize the registry.
	 */
	// biome-ignore lint/suspicious/noExplicitAny: As stated in schema.ts, a schema can receive any type of value
	constructor(schemas: Record<string, any>) {
		this.schemas = {};
		for (const type in schemas) {
			this.schemas[type] = new Schema(type, schemas[type]);
		}
	}

	/**
	 * Validates a node against its schema.
	 * @param node - The node to validate.
	 * @returns True if the node is valid according to its schema, false otherwise.
	 * @throws Will throw an error if the schema for the node type is not found.
	 */
	public validate<T>(node: Node<T>): boolean {
		const schema = this.schemas[node.type];
		if (schema) return schema.compare(node.value);
		throw new Error(`Schema for type "${node.type}" not found.`);
	}

	/**
	 * Resolves a node to its code representation if it is valid.
	 * @param node - The node to resolve.
	 * @returns The code representation of the node.
	 * @throws Will throw an error if the node is invalid according to its schema.
	 */
	public resolve<T>(node: Node<T>): string {
		if (this.validate(node)) {
			return node.toCode();
		}
		throw new Error(`Node of type "${node.type}" is invalid.`);
	}
}
