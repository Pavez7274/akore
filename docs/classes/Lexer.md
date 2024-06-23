[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / Lexer

# Class: Lexer

Lexer class responsible for tokenizing code into a series of tokens based on competences.

## Constructors

### new Lexer()

> **new Lexer**(): [`Lexer`](Lexer.md)

#### Returns

[`Lexer`](Lexer.md)

## Properties

### competences

> `readonly` **competences**: `Map`\<`string`, [`Competence`](Competence.md)\<[`Transpiler`](Transpiler.md)\>\>

Map of competences used by the lexer to tokenize code.

#### Source

[structures/lexer.ts:28](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/lexer.ts#L28)

***

### logger

> `protected` `readonly` **logger**: [`Logger`](Logger.md)

Logger instance for logging messages.

#### Source

[structures/lexer.ts:26](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/lexer.ts#L26)

## Accessors

### pattern

> `get` **pattern**(): `RegExp`

Gets the combined regular expression pattern for all competences.

#### Returns

`RegExp`

The combined regular expression pattern.

#### Source

[structures/lexer.ts:34](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/lexer.ts#L34)

## Methods

### tokenize()

> **tokenize**(`code`): `Generator`\<[`Token`](../interfaces/Token.md)\<`boolean`\>, `any`, `unknown`\>

Tokenizes the given code into a series of tokens based on defined competences.

#### Parameters

• **code**: `string`

The code to tokenize.

#### Returns

`Generator`\<[`Token`](../interfaces/Token.md)\<`boolean`\>, `any`, `unknown`\>

#### Yields

An array of tokens generated from the code.

#### Source

[structures/lexer.ts:46](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/lexer.ts#L46)
