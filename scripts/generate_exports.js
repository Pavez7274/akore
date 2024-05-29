const fs = require("node:fs");
const path = require("node:path");

/**
 * @param {string} directory
 * @returns
 */
function createExports(directory) {
	const files = fs.readdirSync(directory, { withFileTypes: true });
	const exportStatements = [];

	for (const file of files) {
		if (file.name === "index.ts") continue;

		if (file.name.endsWith(".ts")) {
			const fileName = path.basename(file.name, ".ts");
			exportStatements.push(`export * from "./${fileName}";`);
		}

		if (file.isDirectory()) {
			createExports(path.join(directory, file.name));
			const fileName = path.basename(file.name);
			exportStatements.push(`export * from "./${fileName}";`);
		}
	}

	const indexPath = path.join(directory, "index.ts");
	fs.writeFile(indexPath, exportStatements.join("\n"), (err) => {
		if (err) {
			return console.log(`Error writing index.ts file: ${err}`);
		}
		console.log(`${indexPath} generated successfully.`);
	});
}

createExports(path.join(__dirname, "../src"));
