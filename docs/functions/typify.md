[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / typify

# Function: typify()

> **typify**(`value`, `indentLevel`): `string`

Converts a given value to its corresponding type as a string representation.

## Parameters

• **value**: `unknown`

The value to convert to a type string.

• **indentLevel**: `number`= `1`

The current level of indentation for nested structures.

## Returns

`string`

The type of the value as a string representation.

## Example

```ts
typify("hello");   // "string"
typify(42);        // "number"
typify([1, 2, 3]); // "number[]"
typify({ name: "Alice", age: 30 }); // "{\n\tname: string;\n\tage: number;\n}"
```

## Source

common/typify.ts:14
