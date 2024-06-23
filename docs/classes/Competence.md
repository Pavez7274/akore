[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / Competence

# Class: `abstract` Competence\<T\>

Abstract class representing a competence within the transpiler.

## Extended by

- [`CallCompetence`](CallCompetence.md)
- [`DeclareCompetence`](DeclareCompetence.md)
- [`GetCompetence`](GetCompetence.md)
- [`NumberCompetence`](NumberCompetence.md)
- [`ObjectCompetence`](ObjectCompetence.md)
- [`StringCompetence`](StringCompetence.md)
- [`PrintCompetence`](PrintCompetence.md)
- [`SetCompetence`](SetCompetence.md)

## Type parameters

• **T** *extends* [`Transpiler`](Transpiler.md) = [`Transpiler`](Transpiler.md)

The type of the transpiler that uses this competence.

## Constructors

### new Competence()

> **new Competence**\<`T`\>(`t`): [`Competence`](Competence.md)\<`T`\>

Creates a new competence.

#### Parameters

• **t**: `T`

The transpiler instance that this competence belongs to.

#### Returns

[`Competence`](Competence.md)\<`T`\>

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

#### Source

[structures/competence.ts:43](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L43)

***

### identifier

> `readonly` `abstract` **identifier**: `string`

The unique identifier for this competence.

#### Source

[structures/competence.ts:28](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L28)

***

### ~~pattern~~

> `readonly` **pattern**: `RegExp`

The regular expression pattern that this competence matches.

#### Deprecated

#### Source

[structures/competence.ts:34](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L34)

***

### patterns

> `readonly` `abstract` **patterns**: [`Patterns`](../interfaces/Patterns.md)

The regular expressions patterns that this competence matches.

#### Source

[structures/competence.ts:40](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L40)

***

### transpiler

> `protected` **transpiler**: `T`

The transpiler instance that this competence belongs to.

#### Source

[structures/competence.ts:37](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L37)

## Methods

### resolve()

> `abstract` **resolve**(`token`): [`Node`](Node.md)\<`unknown`\>

Resolves a token into a node.

#### Parameters

• **token**: [`Token`](../interfaces/Token.md)\<`boolean`\>

The token to resolve.

#### Returns

[`Node`](Node.md)\<`unknown`\>

The node resulting from the resolution of the token.

#### Source

[structures/competence.ts:64](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L64)

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

#### Yields

An array of substrings split by the delimiter.

#### Source

[structures/competence.ts:72](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L72)
