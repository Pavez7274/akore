import type { Node } from "#structures";

export class Program<T extends Node<unknown>[]> implements Node<T> {
	public readonly type = "program" as const;
	public value: T;

	constructor(value: T) {
		this.value = value;
	}

	public toCode(): string {
		return this.value.map((node) => `${node.toCode()};`).join("\n");
	}
}

export class EscapeNode<T extends string> implements Node<T> {
	public readonly type = "escape" as const;
	public value: T;

	constructor(value: T) {
		this.value = value;
	}

	public toCode(): T {
		return this.value;
	}
}

export class CallerNode<
	T extends {
		parameters: Node<unknown>[] | SequenceNode<{ elements: Node<unknown>[]; operator: ", " }>;
		callee: Node<unknown>;
		use_zero: boolean;
	},
> implements Node<T>
{
	public type = "caller" as const;
	public value: T;

	constructor(value: T) {
		this.value = value;
	}

	public toCode(): string {
		const callee = this.value.use_zero
			? `(0, ${this.value.callee.toCode()})`
			: this.value.callee.toCode();
		const parameters = Array.isArray(this.value.parameters)
			? this.value.parameters.map((node) => node.toCode()).join(", ")
			: this.value.parameters.toCode();

		return `${callee}(${parameters})`;
	}
}

export class StringNode<T extends Node<unknown>[]> implements Node<T> {
	public readonly type = "string";
	public value: T;

	constructor(...values: T) {
		this.value = values;
	}

	public toCode(): string {
		if (this.value.length === 0) return '""';
		return `String(${this.value.map((node) => node.toCode()).join(" + ")})`;
	}
}

export class NumberNode<T extends Node<unknown>[]> implements Node<T> {
	public readonly type = "number";
	public value: T;

	constructor(...values: T) {
		this.value = values;
	}

	public toCode(): string {
		if (this.value.length === 0) return "0";
		return `Number(${this.value.map((node) => node.toCode()).join(" + ")})`;
	}
}

export class ControlFlowNode<T extends { identifier: Node<unknown>; block: Node<unknown> }>
	implements Node<T>
{
	public readonly type = "control_flow";
	public value: T;

	constructor(value: T) {
		this.value = value;
	}

	public toCode(): string {
		return `${this.value.identifier.toCode()} ${this.value.block.toCode()}`;
	}
}

export class SequenceNode<T extends { elements: Node<unknown>[]; operator: string }>
	implements Node<T>
{
	public readonly type = "sequence" as const;
	public value: T;

	constructor(value: T) {
		this.value = value;
	}

	public toCode(): string {
		return this.value.elements.map((node) => node.toCode()).join(this.value.operator);
	}
}