[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / Schema

# Class: Schema\<T\>

Class representing a schema for validating and comparing values.

## Type parameters

• **T** = `any`

The type of the schema.

## Constructors

### new Schema()

> **new Schema**\<`T`\>(`identifier`, `schema`): [`Schema`](Schema.md)\<`T`\>

Creates a new Schema instance.

#### Parameters

• **identifier**: `string`

The identifier for the schema.

• **schema**: `T`

The schema definition.

#### Returns

[`Schema`](Schema.md)\<`T`\>

#### Source

[structures/nodes/schema.ts:20](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/nodes/schema.ts#L20)

## Properties

### identifier

> `readonly` **identifier**: `string`

The identifier for this schema.

#### Source

[structures/nodes/schema.ts:11](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/nodes/schema.ts#L11)

***

### schema

> `readonly` **schema**: `T`

The schema definition.

#### Source

[structures/nodes/schema.ts:13](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/nodes/schema.ts#L13)

## Methods

### compare()

> **compare**(`value`): `boolean`

Compares a value against the schema.

#### Parameters

• **value**: `any`

The value to compare.

#### Returns

`boolean`

Whether the value matches the schema.

#### Source

[structures/nodes/schema.ts:31](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/nodes/schema.ts#L31)

***

### compareTypes()

> `private` **compareTypes**(`value`, `schema`): `boolean`

Compares a value against a specific schema.

#### Parameters

• **value**: `any`

The value to compare.

• **schema**: `any`

The schema to compare against.

#### Returns

`boolean`

Whether the value matches the schema.

#### Source

[structures/nodes/schema.ts:55](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/nodes/schema.ts#L55)

***

### schemaToString()

> `private` **schemaToString**(`schema`, `indentLevel`): `string`

Converts a schema to a string representation.

#### Parameters

• **schema**: `any`

The schema to convert.

• **indentLevel**: `number`

The indentation level for formatting the string.

#### Returns

`string`

A formatted string representation of the schema.

#### Source

[structures/nodes/schema.ts:100](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/nodes/schema.ts#L100)

***

### toString()

> **toString**(`indentLevel`): `string`

Returns a string representation of the schema.

#### Parameters

• **indentLevel**: `number`= `1`

The indentation level for formatting the string.

#### Returns

`string`

A formatted string representation of the schema.

#### Source

[structures/nodes/schema.ts:40](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/nodes/schema.ts#L40)
