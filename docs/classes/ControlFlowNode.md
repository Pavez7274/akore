[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / ControlFlowNode

# Class: ControlFlowNode\<T\>

## Extends

- `JsNode`\<`T`\>

## Type parameters

• **T** *extends* `object`

## Constructors

### new ControlFlowNode()

> **new ControlFlowNode**\<`T`\>(`value`, `semicolon`): [`ControlFlowNode`](ControlFlowNode.md)\<`T`\>

#### Parameters

• **value**: `T`

• **semicolon**: `boolean`= `true`

#### Returns

[`ControlFlowNode`](ControlFlowNode.md)\<`T`\>

#### Inherited from

`JsNode<T>.constructor`

#### Source

[common/javascript/nodes.ts:8](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L8)

## Properties

### semicolon

> `readonly` **semicolon**: `boolean`

#### Inherited from

`JsNode.semicolon`

#### Source

[common/javascript/nodes.ts:5](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L5)

***

### type

> `readonly` **type**: `"control_flow"` = `"control_flow"`

#### Overrides

`JsNode.type`

#### Source

[common/javascript/nodes.ts:70](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L70)

***

### value

> **value**: `T`

#### Inherited from

`JsNode.value`

#### Source

[common/javascript/nodes.ts:6](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L6)

## Methods

### toCode()

> **toCode**(): `string`

#### Returns

`string`

#### Overrides

`JsNode.toCode`

#### Source

[common/javascript/nodes.ts:72](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L72)
