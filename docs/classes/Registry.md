[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / Registry

# Class: Registry

Class representing a registry for schemas.

## Constructors

### new Registry()

> **new Registry**(`schemas`): [`Registry`](Registry.md)

Creates a new Registry instance.

#### Parameters

• **schemas**: `Record`\<`string`, `any`\>

A record of schemas to initialize the registry.

#### Returns

[`Registry`](Registry.md)

#### Source

[structures/nodes/registry.ts:16](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/nodes/registry.ts#L16)

## Properties

### schemas

> `readonly` **schemas**: `Record`\<`string`, [`Schema`](Schema.md)\<`any`\>\>

A record of schemas indexed by their type identifier.

#### Source

[structures/nodes/registry.ts:9](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/nodes/registry.ts#L9)

## Methods

### resolve()

> **resolve**\<`T`\>(`node`): `string`

Resolves a node to its code representation if it is valid.

#### Type parameters

• **T**

#### Parameters

• **node**: [`Node`](Node.md)\<`T`\>

The node to resolve.

#### Returns

`string`

The code representation of the node.

#### Throws

Will throw an error if the node is invalid according to its schema.

#### Source

[structures/nodes/registry.ts:41](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/nodes/registry.ts#L41)

***

### validate()

> **validate**\<`T`\>(`node`): `boolean`

Validates a node against its schema.

#### Type parameters

• **T**

#### Parameters

• **node**: [`Node`](Node.md)\<`T`\>

The node to validate.

#### Returns

`boolean`

True if the node is valid according to its schema, false otherwise.

#### Throws

Will throw an error if the schema for the node type is not found.

#### Source

[structures/nodes/registry.ts:29](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/nodes/registry.ts#L29)
