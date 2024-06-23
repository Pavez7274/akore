[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / ObjectCompetence

# Class: ObjectCompetence

Abstract class representing a competence within the transpiler.

## Extends

- [`Competence`](Competence.md)\<[`JavaScriptTranspiler`](JavaScriptTranspiler.md)\>

## Constructors

### new ObjectCompetence()

> **new ObjectCompetence**(`t`): [`ObjectCompetence`](ObjectCompetence.md)

Creates a new competence.

#### Parameters

• **t**: [`JavaScriptTranspiler`](JavaScriptTranspiler.md)

The transpiler instance that this competence belongs to.

#### Returns

[`ObjectCompetence`](ObjectCompetence.md)

#### Inherited from

[`Competence`](Competence.md).[`constructor`](Competence.md#constructors)

#### Source

[structures/competence.ts:55](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L55)

## Properties

### eaters?

> `optional` `readonly` **eaters**: `object`

Optional object defining patterns to be eaten before or after the main patterns.

#### after?

> `optional` `readonly` **after**: *typeof* [`Competence`](Competence.md)[]

Array of competences to be consumed after the main patterns.

#### before?

> `optional` `readonly` **before**: *typeof* [`Competence`](Competence.md)[]

Array of competences to be consumed before the main patterns.

#### Inherited from

[`Competence`](Competence.md).[`eaters`](Competence.md#eaters)

#### Source

[structures/competence.ts:43](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L43)

***

### identifier

> `readonly` **identifier**: `"akore:javascript:object"` = `"akore:javascript:object"`

The unique identifier for this competence.

#### Overrides

[`Competence`](Competence.md).[`identifier`](Competence.md#identifier)

#### Source

[common/javascript/competences/primitives/object.ts:20](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/competences/primitives/object.ts#L20)

***

### ~~pattern~~

> `readonly` **pattern**: `RegExp`

The regular expression pattern that this competence matches.

#### Deprecated

#### Inherited from

[`Competence`](Competence.md).[`pattern`](Competence.md#pattern)

#### Source

[structures/competence.ts:34](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L34)

***

### patterns

> **patterns**: `object`

The regular expressions patterns that this competence matches.

#### closer

> **closer**: `RegExp`

#### foremost

> **foremost**: `RegExp`

#### opener

> **opener**: `RegExp`

#### Overrides

[`Competence`](Competence.md).[`patterns`](Competence.md#patterns)

#### Source

[common/javascript/competences/primitives/object.ts:21](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/competences/primitives/object.ts#L21)

***

### transpiler

> `protected` **transpiler**: [`JavaScriptTranspiler`](JavaScriptTranspiler.md)

The transpiler instance that this competence belongs to.

#### Inherited from

[`Competence`](Competence.md).[`transpiler`](Competence.md#transpiler)

#### Source

[structures/competence.ts:37](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L37)

## Methods

### resolve()

> **resolve**(`__namedParameters`): [`CallerNode`](CallerNode.md)\<`object`\>

Resolves a token into a node.

#### Parameters

• **\_\_namedParameters**: [`Token`](../interfaces/Token.md)\<`boolean`\>

The token to resolve.

#### Returns

[`CallerNode`](CallerNode.md)\<`object`\>

The node resulting from the resolution of the token.

##### callee

> **callee**: [`EscapeNode`](EscapeNode.md)\<`"Object"`\>

##### parameters

> **parameters**: [`EscapeNode`](EscapeNode.md)\<\`\{ $\{string\} \}\`\>[]

##### use\_zero

> **use\_zero**: `false` = `false`

#### Overrides

[`Competence`](Competence.md).[`resolve`](Competence.md#resolve)

#### Source

[common/javascript/competences/primitives/object.ts:27](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/competences/primitives/object.ts#L27)

***

### splitByDelimiter()

> `protected` **splitByDelimiter**(`inside`, `delimiter`): `Generator`\<`string`, `any`, `unknown`\>

Splits the inside string by a specified delimiter, accounting for nested structures defined by opener and closer patterns.

#### Parameters

• **inside**: `string`

The string to split.

• **delimiter**: `string`= `";"`

The delimiter to split the string by. Defaults to ";".

#### Returns

`Generator`\<`string`, `any`, `unknown`\>

#### Inherited from

[`Competence`](Competence.md).[`splitByDelimiter`](Competence.md#splitbydelimiter)

#### Yields

An array of substrings split by the delimiter.

#### Source

[structures/competence.ts:72](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L72)
