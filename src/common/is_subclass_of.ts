// biome-ignore lint/suspicious/noExplicitAny: Any class can be received.F
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
