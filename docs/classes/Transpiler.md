[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / Transpiler

# Class: `abstract` Transpiler

Abstract base class for creating a transpiler.
Handles schema validation, competence management, and code tokenization.

## Extended by

- [`JavaScriptTranspiler`](JavaScriptTranspiler.md)

## Constructors

### new Transpiler()

> **new Transpiler**(`schemas`, `lexer`, `logger`): [`Transpiler`](Transpiler.md)

Constructs a new Transpiler instance.

#### Parameters

• **schemas**: `Record`\<`string`, `any`\>

Record of schemas used for validation.

• **lexer**: [`Lexer`](Lexer.md)= `undefined`

Instance of Lexer for tokenizing code. Defaults to a new Lexer instance.

• **logger**: [`Logger`](Logger.md)= `undefined`

Instance of Logger for logging messages. Defaults to a new Logger instance.

#### Returns

[`Transpiler`](Transpiler.md)

#### Source

[structures/transpiler.ts:28](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L28)

## Properties

### lexer

> `readonly` **lexer**: [`Lexer`](Lexer.md)

Lexer instance for tokenizing input code

#### Source

[structures/transpiler.ts:19](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L19)

***

### logger

> `readonly` **logger**: [`Logger`](Logger.md)

Logger instance for logging messages

#### Source

[structures/transpiler.ts:16](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L16)

***

### registry

> `readonly` **registry**: [`Registry`](Registry.md)

Registry for storing and validating schemas

#### Source

[structures/transpiler.ts:13](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L13)

## Methods

### declare()

> **declare**(...`competences`): `void`

Declares competences to be used by the lexer.

#### Parameters

• ...**competences**: [`Competence`](Competence.md)\<[`Transpiler`](Transpiler.md)\>[]

Competences to declare.

#### Returns

`void`

#### Source

[structures/transpiler.ts:45](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L45)

***

### nodes()

> **nodes**(...`tokens`): [`Node`](Node.md)\<`unknown`\>[]

Converts tokens into nodes, validating them against the registry schemas.

#### Parameters

• ...**tokens**: [`Token`](../interfaces/Token.md)\<`boolean`\>[]

Tokens to convert into nodes.

#### Returns

[`Node`](Node.md)\<`unknown`\>[]

An array of nodes.

#### Source

[structures/transpiler.ts:84](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L84)

***

### resolve()

> **resolve**(`code`): [`Node`](Node.md)\<`unknown`\>[]

Resolves the input code into an array of nodes.

#### Parameters

• **code**: `string`

The input code to resolve.

#### Returns

[`Node`](Node.md)\<`unknown`\>[]

An array of nodes.

#### Source

[structures/transpiler.ts:75](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L75)

***

### toCode()

> `abstract` **toCode**(`code`): `string`

Transpiles the given code to a target format.

#### Parameters

• **code**: `string`

The input code to transpile.

#### Returns

`string`

The transpiled code as a string.

#### Source

[structures/transpiler.ts:39](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L39)

***

### undeclare()

> **undeclare**(...`identifiers`): `void`

Undeclares competences based on their identifiers.

#### Parameters

• ...**identifiers**: `string`[]

Identifiers of the competences to undeclare.

#### Returns

`void`

#### Source

[structures/transpiler.ts:60](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L60)
