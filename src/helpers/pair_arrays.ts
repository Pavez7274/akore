export function pairArrays<F extends unknown, S extends unknown>(first: F[], second: S[]) {
	const result: [F, S | undefined][] = [];
	for (let i = 0; i < first.length; i++) {
		result.push([first[i]!, second[i]]);
	}

	return result;
}
