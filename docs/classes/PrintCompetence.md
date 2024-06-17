[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / PrintCompetence

# Class: PrintCompetence

Abstract class representing a competence within the transpiler.

## Extends

- [`Competence`](Competence.md)\<[`JavaScriptTranspiler`](JavaScriptTranspiler.md)\>

## Constructors

### new PrintCompetence()

> **new PrintCompetence**(`t`): [`PrintCompetence`](PrintCompetence.md)

Creates a new competence.

#### Parameters

• **t**: [`JavaScriptTranspiler`](JavaScriptTranspiler.md)

The transpiler instance that this competence belongs to.

#### Returns

[`PrintCompetence`](PrintCompetence.md)

#### Inherited from

[`Competence`](Competence.md).[`constructor`](Competence.md#constructors)

#### Source

[structures/competence.ts:55](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L55)

## Properties

### identifier

> **identifier**: `string` = `"akore:print"`

The unique identifier for this competence.

#### Overrides

[`Competence`](Competence.md).[`identifier`](Competence.md#identifier)

#### Source

[common/javascript/competences/print.ts:6](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/competences/print.ts#L6)

***

### ~~pattern~~

> `readonly` **pattern**: `RegExp`

The regular expression pattern that this competence matches.

#### Deprecated

#### Inherited from

[`Competence`](Competence.md).[`pattern`](Competence.md#pattern)

#### Source

[structures/competence.ts:43](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L43)

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

[common/javascript/competences/print.ts:7](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/competences/print.ts#L7)

***

### transpiler

> `protected` **transpiler**: [`JavaScriptTranspiler`](JavaScriptTranspiler.md)

The transpiler instance that this competence belongs to.

#### Inherited from

[`Competence`](Competence.md).[`transpiler`](Competence.md#transpiler)

#### Source

[structures/competence.ts:46](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L46)

## Methods

### resolve()

> **resolve**(`__namedParameters`): [`CallerNode`](CallerNode.md)\<`object`\>

Resolves a token into a node.

#### Parameters

• **\_\_namedParameters**: [`Token`](../interfaces/Token.md)\<`true`\>

The token to resolve.

#### Returns

[`CallerNode`](CallerNode.md)\<`object`\>

The node resulting from the resolution of the token.

##### callee

> **callee**: [`EscapeNode`](EscapeNode.md)\<`"console.log"`\>

##### parameters

> **parameters**: [`Node`](Node.md)\<`unknown`\>[]

##### use\_zero

> **use\_zero**: `true` = `true`

#### Overrides

[`Competence`](Competence.md).[`resolve`](Competence.md#resolve)

#### Source

[common/javascript/competences/print.ts:13](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/javascript/competences/print.ts#L13)

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

[structures/competence.ts:72](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L72)
