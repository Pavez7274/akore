[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / JavaScriptTranspiler

# Class: JavaScriptTranspiler

A transpiler for JavaScript code, extending the abstract Transpiler class.

## Extends

- [`Transpiler`](Transpiler.md)

## Constructors

### new JavaScriptTranspiler()

> **new JavaScriptTranspiler**(): [`JavaScriptTranspiler`](JavaScriptTranspiler.md)

Constructs a new JavaScriptTranspiler instance.
Initializes the schema for various node types and declares competences.

#### Returns

[`JavaScriptTranspiler`](JavaScriptTranspiler.md)

#### Overrides

[`Transpiler`](Transpiler.md).[`constructor`](Transpiler.md#constructors)

#### Source

[common/javascript/transpiler.ts:15](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/transpiler.ts#L15)

## Properties

### lexer

> `readonly` **lexer**: [`Lexer`](Lexer.md)

Lexer instance for tokenizing input code

#### Inherited from

[`Transpiler`](Transpiler.md).[`lexer`](Transpiler.md#lexer)

#### Source

[structures/transpiler.ts:19](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L19)

***

### logger

> `readonly` **logger**: [`Logger`](Logger.md)

Logger instance for logging messages

#### Overrides

[`Transpiler`](Transpiler.md).[`logger`](Transpiler.md#logger)

#### Source

[common/javascript/transpiler.ts:9](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/transpiler.ts#L9)

***

### registry

> `readonly` **registry**: [`Registry`](Registry.md)

Registry for storing and validating schemas

#### Inherited from

[`Transpiler`](Transpiler.md).[`registry`](Transpiler.md#registry)

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

#### Inherited from

[`Transpiler`](Transpiler.md).[`declare`](Transpiler.md#declare)

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

#### Inherited from

[`Transpiler`](Transpiler.md).[`nodes`](Transpiler.md#nodes)

#### Source

[structures/transpiler.ts:84](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L84)

***

### number()

> **number**(`code`): [`EscapeNode`](EscapeNode.md)\<`string`\> \| [`CallerNode`](CallerNode.md)\<`object`\>

Transpiles a code into a Number.

#### Parameters

• **code**: `string`

The input code to transpile.

#### Returns

[`EscapeNode`](EscapeNode.md)\<`string`\> \| [`CallerNode`](CallerNode.md)\<`object`\>

A CallerNode representing the transpiled number code.

#### Source

[common/javascript/transpiler.ts:95](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/transpiler.ts#L95)

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

#### Inherited from

[`Transpiler`](Transpiler.md).[`resolve`](Transpiler.md#resolve)

#### Source

[structures/transpiler.ts:75](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L75)

***

### sequence()

> **sequence**(`code`, `operator`): [`SequenceNode`](SequenceNode.md)\<`object`\>

Transpiles a code into a SequenceNode.

#### Parameters

• **code**: `string`

The input code to transpile.

• **operator**: `string`= `", "`

The operator to use between sequence elements.

#### Returns

[`SequenceNode`](SequenceNode.md)\<`object`\>

A SequenceNode representing the transpiled code.

##### elements

> **elements**: [`Node`](Node.md)\<`unknown`\>[]

##### operator

> **operator**: `string`

#### Source

[common/javascript/transpiler.ts:51](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/transpiler.ts#L51)

***

### string()

> **string**(`code`): [`EscapeNode`](EscapeNode.md)\<\`"$\{string\}"\`\> \| [`CallerNode`](CallerNode.md)\<`object`\>

Transpiles a code into a String.

#### Parameters

• **code**: `string`

The input code to transpile.

#### Returns

[`EscapeNode`](EscapeNode.md)\<\`"$\{string\}"\`\> \| [`CallerNode`](CallerNode.md)\<`object`\>

A CallerNode representing the transpiled string code.

#### Source

[common/javascript/transpiler.ts:63](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/transpiler.ts#L63)

***

### toCode()

> **toCode**(`code`): `string`

Transpiles the given code into JavaScript code.

#### Parameters

• **code**: `string`

The input code to transpile.

#### Returns

`string`

The transpiled JavaScript code.

#### Overrides

[`Transpiler`](Transpiler.md).[`toCode`](Transpiler.md#tocode)

#### Source

[common/javascript/transpiler.ts:39](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/common/javascript/transpiler.ts#L39)

***

### undeclare()

> **undeclare**(...`identifiers`): `void`

Undeclares competences based on their identifiers.

#### Parameters

• ...**identifiers**: `string`[]

Identifiers of the competences to undeclare.

#### Returns

`void`

#### Inherited from

[`Transpiler`](Transpiler.md).[`undeclare`](Transpiler.md#undeclare)

#### Source

[structures/transpiler.ts:60](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/transpiler.ts#L60)
