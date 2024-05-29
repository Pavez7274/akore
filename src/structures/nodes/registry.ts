import type { Node } from "./node";
import { Schema } from "./schema";

export class Registry {
	private schemas: Record<string, Schema>;

	// biome-ignore lint/suspicious/noExplicitAny: As stated in schema.ts, a schema can receive any type of value
	constructor(schemas: Record<string, any>) {
		this.schemas = {};
		for (const type in schemas) {
			this.schemas[type] = new Schema(schemas[type]);
		}
	}

	public validate<T>(node: Node<T>): boolean {
		const schema = this.schemas[node.type];
		if (!schema) {
			throw new Error(`Schema for type "${node.type}" not found.`);
		}
		return schema.compare(node.value);
	}

	public resolve<T>(node: Node<T>): string {
		if (!this.validate(node)) {
			throw new Error(`Node of type "${node.type}" is invalid.`);
		}
		return node.toCode();
	}
}
