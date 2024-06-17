[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / Patterns

# Interface: Patterns

## Properties

### closer?

> `optional` `readonly` **closer**: `RegExp`

Optional regular expression to match the closing delimiter of a nested structure.

#### Source

[structures/competence.ts:19](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L19)

***

### eater?

> `optional` `readonly` **eater**: `object`

Optional object defining patterns to be eaten before or after the main patterns.

#### after?

> `optional` `readonly` **after**: *typeof* [`Competence`](../classes/Competence.md)[]

Array of competences to be consumed after the main patterns.

#### before?

> `optional` `readonly` **before**: *typeof* [`Competence`](../classes/Competence.md)[]

Array of competences to be consumed before the main patterns.

#### Source

[structures/competence.ts:22](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L22)

***

### foremost

> `readonly` **foremost**: `RegExp`

Regular expression to match the foremost pattern in the code.

#### Source

[structures/competence.ts:7](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L7)

***

### inside?

> `optional` `readonly` **inside**: `RegExp`

Optional regular expression to match the valid content inside a nested structure.

#### Source

[structures/competence.ts:13](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L13)

***

### opener?

> `optional` `readonly` **opener**: `RegExp`

Optional regular expression to match the opening delimiter of a nested structure.

#### Source

[structures/competence.ts:10](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L10)

***

### unstoppable?

> `optional` `readonly` **unstoppable**: `boolean`

Optional flag indicating if the parsing should continue even if the inside pattern does not match.

#### Source

[structures/competence.ts:16](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/competence.ts#L16)
