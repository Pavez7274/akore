// biome-ignore lint/suspicious/noExplicitAny: The schema must be able to receive any type.
export class Schema<T = any> {
	private schema: T;

	constructor(schema: T) {
		this.schema = schema;
	}

	// biome-ignore lint/suspicious/noExplicitAny: Any type must be comparable.
	compare(value: any): boolean {
		return this.compareTypes(value, this.schema);
	}

	// biome-ignore lint/suspicious/noExplicitAny: It is necessary that any type be allowed to pass.
	private compareTypes(value: any, schema: any): boolean {
		if (typeof schema === "string") {
			// biome-ignore lint/suspicious/useValidTypeof: schema must be any typeof string.
			return typeof value === schema;
		}

		if (Array.isArray(schema)) {
			if (!Array.isArray(value)) return false;
			return value.every((item) => this.compareTypes(item, schema[0]));
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
			return value instanceof schema;
		}

		return false;
	}
}
