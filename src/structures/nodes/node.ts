export abstract class Node<T> {
	abstract readonly type: string;
	public value: T;

	constructor(value: T) {
		this.value = value;
	}

	abstract toCode(): string;
}
