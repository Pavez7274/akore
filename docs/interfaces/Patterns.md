[**AKORE v1.8.4**](../README.md) • **Docs**

***

[AKORE v1.8.4](../globals.md) / Patterns

# Interface: Patterns

## Properties

### closer?

> `optional` `readonly` **closer**: `RegExp`

Optional regular expression to match the closing delimiter of a nested structure.

#### Source

[structures/competence.ts:19](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L19)

***

### foremost

> `readonly` **foremost**: `RegExp`

Regular expression to match the foremost pattern in the code.

#### Source

[structures/competence.ts:7](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L7)

***

### inside?

> `optional` `readonly` **inside**: `RegExp`

Optional regular expression to match the valid content inside a nested structure.

#### Source

[structures/competence.ts:13](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L13)

***

### opener?

> `optional` `readonly` **opener**: `RegExp`

Optional regular expression to match the opening delimiter of a nested structure.

#### Source

[structures/competence.ts:10](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L10)

***

### unstoppable?

> `optional` `readonly` **unstoppable**: `boolean`

Optional flag indicating if the parsing should continue even if the inside pattern does not match.

#### Source

[structures/competence.ts:16](https://github.com/Pavez7274/akore//blob/16b0580217e27fdbdfda0f584c9911f51b124649/src/structures/competence.ts#L16)
