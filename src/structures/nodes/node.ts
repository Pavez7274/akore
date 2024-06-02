/**
 * Abstract class representing a node in the transpiler.
 * @template T - The type of value held by the node.
 */
export abstract class Node<T> {
	/** The type identifier for the node. */
	abstract readonly type: string;

	/** The value held by the node. */
	public value: T;

	/**
	 * Creates a new Node instance.
	 * @param value - The value to be held by the node.
	 */
	constructor(value: T) {
		this.value = value;
	}

	/**
	 * Converts the node to its code representation.
	 * @returns The code representation of the node as a string.
	 */
	abstract toCode(): string;
}
