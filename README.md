# Akore

Akore is a lightweight and versatile transpiler utility for JavaScript. It provides a simple and efficient way to tokenize, parse, and compile code snippets, enabling developers to build custom transpilers or preprocessors tailored to their specific needs.

## Installation

You can install Akore via npm:

```bash
npm install akore
```

## Configuration

To configure Akore, create a `akconfig.json` file in the root directory of your project. Alternatively, you can use YAML format for configuration.

Example `akconfig.json`:

```json
{
	"rootDir": "./src/",
	"outDir": "./dist/",
	"instructions": ["./custom-instructions/"]
}
```

- `rootDir`: The directory where your source files are located.
- `outDir`: The directory where compiled files will be output.
- `instructions`: An array of paths to directories containing custom instruction definitions.

## Usage

To transpile your code, use the following command:

```bash
npx akore [rootDir]
```

If you have configured the `rootDir` in the `akconfig.json`, it will be used by default. Otherwise, you can specify it as an argument.

## Example Transpilation

Suppose we have a source file `fib.kita` in the `src` directory:

```php
$var[number;30]
$var[n1;0]
$var[n2;1]

$print[Fibonacci Series:]

$for[$var[i;1]; $get[i] < $get[number]; $increment[i];
    $print[$get[n1]]
    $var[next;$sum[$get[n1];$get[n2]]]
    $var[n1;$get[n2]]
    $var[n2;$get[next]]
]
```

After running the transpilation command, the transpiled JavaScript file `fib.js` will be output in the `dist` directory:

```javascript
var number = 30;
var n1 = 0;
var n2 = 1;
console.log("Fibonacci Series:");
for (var i = 1; i < number; i++) {
	console.log(n1);
	var next = n1 + n2;
	n1 = n2;
	n2 = next;
}
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request on the [GitHub repository](https://github.com/Pavez7274/akore).
