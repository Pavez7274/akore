[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / ControlFlowNode

# Class: ControlFlowNode\<T\>

Abstract class representing a node in the transpiler.

## Type parameters

• **T** *extends* `object`

The type of value held by the node.

## Implements

- [`Node`](Node.md)\<`T`\>

## Constructors

### new ControlFlowNode()

> **new ControlFlowNode**\<`T`\>(`value`): [`ControlFlowNode`](ControlFlowNode.md)\<`T`\>

#### Parameters

• **value**: `T`

#### Returns

[`ControlFlowNode`](ControlFlowNode.md)\<`T`\>

#### Source

[common/javascript/nodes.ts:76](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L76)

## Properties

### type

> `readonly` **type**: `"control_flow"` = `"control_flow"`

The type identifier for the node.

#### Implementation of

[`Node`](Node.md).[`type`](Node.md#type)

#### Source

[common/javascript/nodes.ts:73](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L73)

***

### value

> **value**: `T`

The value held by the node.

#### Implementation of

[`Node`](Node.md).[`value`](Node.md#value)

#### Source

[common/javascript/nodes.ts:74](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L74)

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

[common/javascript/nodes.ts:80](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/nodes.ts#L80)
