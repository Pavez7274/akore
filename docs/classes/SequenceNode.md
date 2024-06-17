[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / SequenceNode

# Class: SequenceNode\<T\>

Abstract class representing a node in the transpiler.

## Type parameters

• **T** *extends* `object`

The type of value held by the node.

## Implements

- [`Node`](Node.md)\<`T`\>

## Constructors

### new SequenceNode()

> **new SequenceNode**\<`T`\>(`value`): [`SequenceNode`](SequenceNode.md)\<`T`\>

#### Parameters

• **value**: `T`

#### Returns

[`SequenceNode`](SequenceNode.md)\<`T`\>

#### Source

[common/javascript/nodes.ts:91](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L91)

## Properties

### type

> `readonly` **type**: `"sequence"`

The type identifier for the node.

#### Implementation of

[`Node`](Node.md).[`type`](Node.md#type)

#### Source

[common/javascript/nodes.ts:88](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L88)

***

### value

> **value**: `T`

The value held by the node.

#### Implementation of

[`Node`](Node.md).[`value`](Node.md#value)

#### Source

[common/javascript/nodes.ts:89](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L89)

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

[common/javascript/nodes.ts:95](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L95)
