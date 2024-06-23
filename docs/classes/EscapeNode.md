[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / EscapeNode

# Class: EscapeNode\<T\>

## Extends

- `JsNode`\<`T`\>

## Type parameters

• **T** *extends* `string`

## Constructors

### new EscapeNode()

> **new EscapeNode**\<`T`\>(`value`, `semicolon`): [`EscapeNode`](EscapeNode.md)\<`T`\>

#### Parameters

• **value**: `T`

• **semicolon**: `boolean`= `true`

#### Returns

[`EscapeNode`](EscapeNode.md)\<`T`\>

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

> `readonly` **type**: `"escape"`

#### Overrides

`JsNode.type`

#### Source

[common/javascript/nodes.ts:30](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L30)

***

### value

> **value**: `T`

#### Inherited from

`JsNode.value`

#### Source

[common/javascript/nodes.ts:6](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L6)

## Methods

### toCode()

> **toCode**(): `T`

#### Returns

`T`

#### Overrides

`JsNode.toCode`

#### Source

[common/javascript/nodes.ts:32](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/nodes.ts#L32)
