[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / GetCompetence

# Class: GetCompetence

Abstract class representing a competence within the transpiler.

## Extends

- [`Competence`](Competence.md)\<[`JavaScriptTranspiler`](JavaScriptTranspiler.md)\>

## Constructors

### new GetCompetence()

> **new GetCompetence**(`t`): [`GetCompetence`](GetCompetence.md)

Creates a new competence.

#### Parameters

• **t**: [`JavaScriptTranspiler`](JavaScriptTranspiler.md)

The transpiler instance that this competence belongs to.

#### Returns

[`GetCompetence`](GetCompetence.md)

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

> **identifier**: `string` = `"akore:javascript:get"`

The unique identifier for this competence.

#### Overrides

[`Competence`](Competence.md).[`identifier`](Competence.md#identifier)

#### Source

[common/javascript/competences/get.ts:6](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/competences/get.ts#L6)

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

[common/javascript/competences/get.ts:7](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/competences/get.ts#L7)

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

> **resolve**(`__namedParameters`): [`EscapeNode`](EscapeNode.md)\<`string`\>

Resolves a token into a node.

#### Parameters

• **\_\_namedParameters**: [`Token`](../interfaces/Token.md)\<`true`\>

The token to resolve.

#### Returns

[`EscapeNode`](EscapeNode.md)\<`string`\>

The node resulting from the resolution of the token.

#### Overrides

[`Competence`](Competence.md).[`resolve`](Competence.md#resolve)

#### Source

[common/javascript/competences/get.ts:13](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/competences/get.ts#L13)

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
