# akore

akore is a powerful package designed to streamline the transpilation process by providing robust tools for managing schemas, defining custom nodes, and processing code elements efficiently.

## Table of Contents

<details>
  <summary>Show</summary>

- [Installation](#installation)
- [Transpilers](#transpilers)

- [Overview](#overview)
- [Usage](#usage)
- [How it Works](#how-it-works)
- [Benefits](#benefits)

- [Registries](#registries)

  - [Overview](#overview-1)
  - [Usage](#usage-1)
  - [How it Works](#how-it-works-1)
  - [Benefits](#benefits-1)

- [Schemas](#schemas)

  - [Overview](#overview-2)
  - [Usage](#usage-2)
  - [How it Works](#how-it-works-2)
  - [Benefits](#benefits-2)

- [Nodes](#nodes)
  - [Overview](#overview-3)
  - [Usage](#usage-3)
  - [How it Works](#how-it-works-3)
  - [Benefits](#benefits-3)
- [Competences](#competences)

  - [Overview](#overview-4)
  - [Usage](#usage-4)
  - [How it Works](#how-it-works-4)
  - [Benefits](#benefits-4)

- [The JavaScriptTranspiler](#the-javascripttranspiler)

  - [Setting Up](#setting-up)
  - [Usage](#usage-5)
  - [Explanation](#explanation)
  - [Benefits](#benefits-5)

- [Contributing](#contributing)
- [License](#license)
</details>

## Installation

You can install the latest development version of akore via npm using the following command:

```bash
npm install --save-exact akore@dev
```

We recommend using `--save-exact` to ensure that your project always uses the exact version of akore specified in your package.json file. This helps maintain consistency across different environments and prevents unexpected changes due to automatic updates.

## Transpilers

### Overview

The `Transpiler` module serves as the core component of the Transpiler project, providing functionalities for transforming nodes into code.

### Usage

```typescript
import { Transpiler, Schema } from "akore";

const schemas: Record<string, any> = {
  // Define your schemas here
};

class CustomTranspiler extends Transpiler {
  toCode(code: string): string {
    // Implement custom transpiler logic here
    return code;
  }
}

const transpiler = new CustomTranspiler(schemas);
const code = "Your code here";
const transformedCode = transpiler.toCode(code);
```

### How it Works

The `Transpiler` module utilizes predefined schemas to validate nodes and generate code representations based on their content.

### Benefits

- Consistency: Enforces schemas and validation rules to ensure consistency in the generated code.
- Flexibility: Customizable to accommodate specific project requirements.
- Scalability: Modular design allows for scaling with project complexity.

## Registries

### Overview

The `Registry` class manages schemas and provides methods for validating and resolving nodes.

### Usage

```typescript
import { Registry, Node } from "akore";

const schemas: Record<string, any> = {
  // Define your schemas here
};

const registry = new Registry(schemas);
const node: Node<unknown> = new CustomNode("...");
const isValid = registry.validate(node);
const code = registry.resolve(node);
```

### How it Works

The `Registry` class stores schemas and validates nodes against them to ensure data consistency and integrity.

### Benefits

- Centralized Management: Provides a centralized location for managing schemas and validating nodes.
- Error Handling: Detects and handles invalid nodes to maintain data integrity.

## Schemas

### Overview

The `Schema` class defines schemas that describe the structure and types of data for validation.

### Usage

```typescript
import { Schema } from "akore";

const schema = new Schema({
  id: "string",
  value: {
    inside: "number",
  },
});

const isValid = schema.compare({
  id: "example",
  value: {
    inside: 123,
  },
});
```

### How it Works

The `Schema` class compares data against predefined schemas using recursive algorithms to ensure compliance with validation rules.

### Benefits

- Data Validation: Ensures that data conforms to specified rules and structures.
- Flexibility: Supports various types of schema definitions, including primitive types, nested objects, arrays, and custom classes.

## Nodes

### Overview

The `Node` class represents elements of code and provides methods for converting them into code representations.

### Usage

```typescript
import { Node } from "akore";

class CustomNode implements Node<string> {
  public readonly type = "custom"; // Refers to a key of a registered schema
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  toCode(): string {
    // Implementation
  }
}

const node = new CustomNode("example");
const code = node.toCode();
```

### How it Works

The `Node` class provides a blueprint for creating custom node types and methods for converting them into code representations.

### Benefits

- Customizability: Allows for the creation of custom node types tailored to specific project needs.
- Consistency: Promotes consistency in code representations by enforcing standardized conversion methods.

## Competences

### Overview

The `Competence` class defines competences for processing tokens and resolving them into nodes.

### Usage

```typescript
import { CustomTranspiler, CustomNode } from "...";
import { Competence, Token } from "akore";

class CustomCompetence extends Competence<CustomTranspiler> {
  override readonly identifier = "custom";
  override readonly pattern = /custom/;

  resolve(token: Token<boolean>): CustomNode {
    // Implement custom competence logic here
    return new CustomNode("example");
  }
}
```

### How it Works

The `Competence` class provides a framework for defining competences and resolving tokens into nodes based on predefined patterns.

### Benefits

- Modular Design: Facilitates the creation of reusable competences for token processing.
- Extensibility: Supports the addition of custom competences to extend transpiler functionality.

## The JavaScriptTranspiler

The `JavaScriptTranspiler` is a pre-defined transpiler that converts a custom syntax into JavaScript code. This section will guide you through setting up and using the `JavaScriptTranspiler` in your project.

### Setting Up

First, import the necessary classes and create an instance of the `JavaScriptTranspiler`:

```typescript
import { JavaScriptTranspiler } from "akore/javascript";

const transpiler = new JavaScriptTranspiler();
```

### Usage

You can use the `toCode` method to transpile your custom syntax into JavaScript. Here's an example:

```typescript
const code = `
  $declare[test;$someFunc*;$process.cwd*]
  $print[$string[The cwd is $get[test]]]
`;

console.log(transpiler.toCode(code));
```

```js
"use strict";
var test = (0, someFunc)(), (0, process.cwd)();
(0, console.log)(String("The value is " + test));
```

### Explanation

The `JavaScriptTranspiler` class extends the abstract `Transpiler` class and provides specific implementations for the custom syntax.

### Benefits

- **Ease of Use**: The `JavaScriptTranspiler` simplifies the process of converting custom syntax into JavaScript code.
- **Extensibility**: You can easily extend the transpiler by adding new competences and nodes.
- **Debugging**: The built-in logger helps track the transpilation process and debug issues effectively.

By following this guide, you should be able to set up and use the `JavaScriptTranspiler` in your project efficiently.

## Contributing

Contributions are welcome! Please create an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.
