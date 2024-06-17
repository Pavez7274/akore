[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / isSubclassOf

# Function: isSubclassOf()

> **isSubclassOf**(`subclass`, `superclass`): `boolean`

Determines if a given subclass is a subclass of a specified superclass.

## Parameters

• **subclass**: `any`

The subclass to check. Any class can be received.

• **superclass**: `any`

The superclass to check against. Any class can be received.

## Returns

`boolean`

Returns true if `subclass` is a subclass of `superclass`, false otherwise.

## Example

```ts
class Animal {}
class Dog extends Animal {}
class Cat {}

console.log(isSubclassOf(Dog, Animal)); // true
console.log(isSubclassOf(Cat, Animal)); // false
console.log(isSubclassOf(Dog, Cat));    // false
```

## Source

[common/is\_subclass\_of.ts:18](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/is_subclass_of.ts#L18)
