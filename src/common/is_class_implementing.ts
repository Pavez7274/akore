// biome-ignore lint/complexity/noBannedTypes: Function (in this case) is used to represent classes
export function isClassImplementing(target: Function, base: Function): boolean {
	// Check if targetClass extends baseClassOrInterface
	if (target.prototype instanceof base) {
		return true;
	}

	// If base is an interface (object with methods/properties to be implemented)
	const base_prototype = base.prototype;
	const target_prototype = target.prototype;

	if (!base_prototype) {
		throw new Error("The baseClassOrInterface does not have a prototype.");
	}

	// Check if targetPrototype has all properties of basePrototype
	for (const key of Object.getOwnPropertyNames(base_prototype)) {
		if (typeof base_prototype[key] === "function") {
			if (typeof target_prototype[key] !== "function") {
				return false;
			}
		} else if (!(key in target_prototype)) {
			return false;
		}
	}

	return true;
}
