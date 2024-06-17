[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / EscapeNode

# Class: EscapeNode\<T\>

Abstract class representing a node in the transpiler.

## Type parameters

• **T** *extends* `string`

The type of value held by the node.

## Implements

- [`Node`](Node.md)\<`T`\>

## Constructors

### new EscapeNode()

> **new EscapeNode**\<`T`\>(`value`): [`EscapeNode`](EscapeNode.md)\<`T`\>

#### Parameters

• **value**: `T`

#### Returns

[`EscapeNode`](EscapeNode.md)\<`T`\>

#### Source

[common/javascript/nodes.ts:20](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L20)

## Properties

### type

> `readonly` **type**: `"escape"`

The type identifier for the node.

#### Implementation of

[`Node`](Node.md).[`type`](Node.md#type)

#### Source

[common/javascript/nodes.ts:17](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L17)

***

### value

> **value**: `T`

The value held by the node.

#### Implementation of

[`Node`](Node.md).[`value`](Node.md#value)

#### Source

[common/javascript/nodes.ts:18](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L18)

## Methods

### toCode()

> **toCode**(): `T`

Converts the node to its code representation.

#### Returns

`T`

The code representation of the node as a string.

#### Implementation of

[`Node`](Node.md).[`toCode`](Node.md#tocode)

#### Source

[common/javascript/nodes.ts:24](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L24)
