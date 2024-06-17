[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / Logger

# Class: Logger

Logger class for logging messages with ANSI styling and formatting.

## Constructors

### new Logger()

> **new Logger**(): [`Logger`](Logger.md)

#### Returns

[`Logger`](Logger.md)

## Properties

### akore

> `private` **akore**: `string`

Prefix for log messages with AKORE styling

#### Source

[structures/logger.ts:61](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L61)

## Accessors

### time

> `get` `private` **time**(): `string`

Gets the current date and time formatted as a string.

#### Returns

`string`

The formatted date and time string.

#### Source

[structures/logger.ts:169](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L169)

## Methods

### color()

> **color**(`text`, ...`styles`): `string`

Colors the given text with the specified ANSI styles.

#### Parameters

• **text**: `string`

The text to color.

• ...**styles**: `string`[]

The styles to apply.

#### Returns

`string`

The styled text.

#### Source

[structures/logger.ts:92](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L92)

***

### createAnsiCode()

> **createAnsiCode**(...`styles`): `string`

Creates an ANSI escape code string with the specified styles.

#### Parameters

• ...**styles**: `string`[]

The styles to apply.

#### Returns

`string`

The ANSI escape code string.

#### Source

[structures/logger.ts:82](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L82)

***

### debug()

> **debug**(`from`, `message`): `void`

Logs a debug message.

#### Parameters

• **from**: `string`

The source of the message.

• **message**: `string`

The message to log.

#### Returns

`void`

#### Source

[structures/logger.ts:125](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L125)

***

### error()

> **error**(`from`, `error`): `void`

Logs an error message.

#### Parameters

• **from**: `string`

The source of the message.

• **error**: `string`

The error message to log.

#### Returns

`void`

#### Source

[structures/logger.ts:155](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L155)

***

### format()

> **format**(`text`): `string`

Formats the given text by adding a tab character before each line.

#### Parameters

• **text**: `string`

The text to format.

#### Returns

`string`

The formatted text.

#### Source

[structures/logger.ts:101](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L101)

***

### info()

> **info**(`from`, `message`): `void`

Logs an informational message.

#### Parameters

• **from**: `string`

The source of the message.

• **message**: `string`

The message to log.

#### Returns

`void`

#### Source

[structures/logger.ts:110](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L110)

***

### pad()

> **pad**(`text`, `length`, `chars`): `string`

Pads the given text to the specified length using the specified characters.

#### Parameters

• **text**: `string`

The text to pad.

• **length**: `number`

The desired length of the padded text.

• **chars**: `string`= `" "`

The characters to use for padding. Defaults to a space.

#### Returns

`string`

The padded text.

#### Source

[structures/logger.ts:70](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L70)

***

### warn()

> **warn**(`from`, `message`): `void`

Logs a warning message.

#### Parameters

• **from**: `string`

The source of the message.

• **message**: `string`

The message to log.

#### Returns

`void`

#### Source

[structures/logger.ts:140](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/structures/logger.ts#L140)
