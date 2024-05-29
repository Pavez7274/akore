export abstract class Node<T> {
	abstract readonly type: string;
	public value: T;

	constructor(value: T) {
		this.value = value;
	}

	toCode(): string {
		return `Node { type: "${this.type}", value: ${JSON.stringify(this.value)} }`;
	}
}
