[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / NumberNode

# Class: NumberNode\<T\>

Abstract class representing a node in the transpiler.

## Type parameters

• **T** *extends* [`Node`](Node.md)\<`unknown`\>[]

The type of value held by the node.

## Implements

- [`Node`](Node.md)\<`T`\>

## Constructors

### new NumberNode()

> **new NumberNode**\<`T`\>(...`values`): [`NumberNode`](NumberNode.md)\<`T`\>

#### Parameters

• ...**values**: `T`

#### Returns

[`NumberNode`](NumberNode.md)\<`T`\>

#### Source

[common/javascript/nodes.ts:60](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L60)

## Properties

### type

> `readonly` **type**: `"number"` = `"number"`

The type identifier for the node.

#### Implementation of

[`Node`](Node.md).[`type`](Node.md#type)

#### Source

[common/javascript/nodes.ts:57](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L57)

***

### value

> **value**: `T`

The value held by the node.

#### Implementation of

[`Node`](Node.md).[`value`](Node.md#value)

#### Source

[common/javascript/nodes.ts:58](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L58)

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

[common/javascript/nodes.ts:64](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L64)
