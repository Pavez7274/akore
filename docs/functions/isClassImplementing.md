[**AKORE v1.8.3**](../README.md) • **Docs**

***

[AKORE v1.8.3](../globals.md) / isClassImplementing

# Function: isClassImplementing()

> **isClassImplementing**(`target`, `base`): `boolean`

Determines if a given class implements all the properties and methods of a specified base class or interface.

## Parameters

• **target**: `Function`

The target class to check.

• **base**: `Function`

The base class or interface to check against.

## Returns

`boolean`

Returns true if the target class implements the base class or interface, false otherwise.

## Throws

If the base class or interface does not have a prototype.

## Example

```ts
class Interface {
  method() {}
}

class Implementation implements Interface {
  method() {}
}

class AnotherClass {}

console.log(isClassImplementing(Implementation, Interface)); // true
console.log(isClassImplementing(AnotherClass, Interface));   // false
```

## Source

[common/is\_class\_implementing.ts:25](https://github.com/Pavez7274/akore//blob/9379e12b9c8fd6ab82cc6e06af5ef6733f206841/src/common/is_class_implementing.ts#L25)
