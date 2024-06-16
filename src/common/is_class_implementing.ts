/**
 * Determines if a given class implements all the properties and methods of a specified base class or interface.
 *
 * @param target - The target class to check.
 * @param base - The base class or interface to check against.
 * @returns Returns true if the target class implements the base class or interface, false otherwise.
 *
 * @throws {Error} If the base class or interface does not have a prototype.
 *
 * @example
 * class Interface {
 *   method() {}
 * }
 *
 * class Implementation implements Interface {
 *   method() {}
 * }
 *
 * class AnotherClass {}
 *
 * console.log(isClassImplementing(Implementation, Interface)); // true
 * console.log(isClassImplementing(AnotherClass, Interface));   // false
 */
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
