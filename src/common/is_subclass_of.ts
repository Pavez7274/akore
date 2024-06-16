/**
 * Determines if a given subclass is a subclass of a specified superclass.
 *
 * @param subclass - The subclass to check. Any class can be received.
 * @param superclass - The superclass to check against. Any class can be received.
 * @returns Returns true if `subclass` is a subclass of `superclass`, false otherwise.
 *
 * @example
 * class Animal {}
 * class Dog extends Animal {}
 * class Cat {}
 *
 * console.log(isSubclassOf(Dog, Animal)); // true
 * console.log(isSubclassOf(Cat, Animal)); // false
 * console.log(isSubclassOf(Dog, Cat));    // false
 */
// biome-ignore lint/suspicious/noExplicitAny: Any class can be received.
export function isSubclassOf(subclass: any, superclass: any): boolean {
	// Check if subclass or superclass are not valid constructor functions
	if (typeof subclass !== "function" || typeof superclass !== "function") {
		return false;
	}

	// Traverse the prototype chain to see if the superclass is in it
	let proto = subclass.prototype;
	while (proto) {
		if (proto === superclass.prototype) {
			return true;
		}
		proto = Object.getPrototypeOf(proto);
	}

	return false;
}
