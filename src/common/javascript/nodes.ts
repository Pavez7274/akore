import type { Node } from "#structures";

export abstract class JsNode<T> implements Node<T> {
	public abstract readonly type: string;
	public readonly semicolon: boolean;
	public value: T;

	constructor(value: T, semicolon = true) {
		this.semicolon = semicolon;
		this.value = value;
	}

	abstract toCode(): string;
}

export class Program<T extends JsNode<unknown>[]> implements Node<T> {
	public readonly type = "program";
	public value: T;

	constructor(...values: T) {
		this.value = values;
	}

	public toCode(): string {
		return this.value
			.map((node) => {
				let transpiled = node.toCode();
				if (node.semicolon) transpiled += ";";
				return transpiled;
			})
			.join("\n");
	}
}

export class EscapeNode<T extends string> extends JsNode<T> {
	public readonly type = "escape" as const;

	public toCode(): T {
		return this.value;
	}
}

export class CallerNode<
	T extends {
		parameters: Node<unknown>[] | SequenceNode<{ elements: Node<unknown>[]; operator: string }>;
		callee: Node<unknown>;
		use_zero: boolean;
	},
> extends JsNode<T> {
	public readonly type = "caller" as const;

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

export class NumberNode<T extends Node<unknown>[]> extends JsNode<T> {
	public readonly type = "number";

	public toCode(): string {
		if (this.value.length === 0) return "0";
		return `Number(${this.value.map((node) => node.toCode()).join(" + ")})`;
	}
}

export class ControlFlowNode<
	T extends { identifier: Node<unknown>; block: Node<unknown> },
> extends JsNode<T> {
	public readonly type = "control_flow";

	public toCode(): string {
		return `${this.value.identifier.toCode()} ${this.value.block.toCode()}`;
	}
}

export class SequenceNode<
	T extends { elements: Node<unknown>[]; operator: string },
> extends JsNode<T> {
	public readonly type = "sequence" as const;

	public toCode(): string {
		return this.value.elements.map((node) => node.toCode()).join(this.value.operator);
	}
}
