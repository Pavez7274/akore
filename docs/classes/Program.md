[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / Program

# Class: Program\<T\>

Abstract class representing a node in the transpiler.

## Type parameters

• **T** *extends* [`Node`](Node.md)\<`unknown`\>[]

The type of value held by the node.

## Implements

- [`Node`](Node.md)\<`T`\>

## Constructors

### new Program()

> **new Program**\<`T`\>(...`values`): [`Program`](Program.md)\<`T`\>

#### Parameters

• ...**values**: `T`

#### Returns

[`Program`](Program.md)\<`T`\>

#### Source

[common/javascript/nodes.ts:20](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L20)

## Properties

### type

> `readonly` **type**: `"program"` = `"program"`

The type identifier for the node.

#### Implementation of

[`Node`](Node.md).[`type`](Node.md#type)

#### Source

[common/javascript/nodes.ts:17](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L17)

***

### value

> **value**: `T`

The value held by the node.

#### Implementation of

[`Node`](Node.md).[`value`](Node.md#value)

#### Source

[common/javascript/nodes.ts:18](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L18)

## Methods

### toCode()

> **toCode**(): `string`

Converts the node to its code representation.

#### Returns

`string`

The code representation of the node as a string.

#### Implementation of

[`Node`](Node.md).[`toCode`](Node.md#tocode)

#### Source

[common/javascript/nodes.ts:24](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L24)
