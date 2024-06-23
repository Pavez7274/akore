[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / Node

# Class: `abstract` Node\<T\>

Abstract class representing a node in the transpiler.

## Type parameters

• **T**

The type of value held by the node.

## Constructors

### new Node()

> **new Node**\<`T`\>(`value`): [`Node`](Node.md)\<`T`\>

Creates a new Node instance.

#### Parameters

• **value**: `T`

The value to be held by the node.

#### Returns

[`Node`](Node.md)\<`T`\>

#### Source

[structures/nodes/node.ts:16](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/nodes/node.ts#L16)

## Properties

### type

> `readonly` `abstract` **type**: `string`

The type identifier for the node.

#### Source

[structures/nodes/node.ts:7](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/nodes/node.ts#L7)

***

### value

> **value**: `T`

The value held by the node.

#### Source

[structures/nodes/node.ts:10](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/nodes/node.ts#L10)

## Methods

### toCode()

> `abstract` **toCode**(): `string`

Converts the node to its code representation.

#### Returns

`string`

The code representation of the node as a string.

#### Source

[structures/nodes/node.ts:24](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/nodes/node.ts#L24)
