---
id: prototype-and-inheritance
title: "Prototypes & Inheritance Mechanics"
sidebar_label: Prototypes & Inheritance
sidebar_position: 2
description: "Master JavaScript prototype chains, object linkage, constructor functions, ES6 classes, and prototypal inheritance patterns."
tags: [javascript, advanced, prototype, inheritance, OOP, classes]
keywords: [javascript, advanced, prototype, inheritance, OOP, classes]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/deep-dive-core/prototype-playground.js";

Unlike traditional class-based object-oriented languages like Java or C++, JavaScript uses **Prototypal Inheritance**. Every JavaScript object possesses an internal link to another object called its **Prototype**, forming a chain used for property and method resolution.

## The Prototype Chain

When you attempt to access a property or method on an object, the JavaScript engine follows a strict lookup procedure:

```text
Prototype Resolution Chain
┌──────────────────────────────────────────────┐
│ myObject                                     │
│  └─ [[Prototype]] -> DeveloperPrototype      │
│      └─ [[Prototype]] -> Object.prototype    │
│          └─ [[Prototype]] -> null            │
└──────────────────────────────────────────────┘

```

1. Checks if the property exists directly on `myObject` (an **own property**).
2. If missing, traverses up the internal `[[Prototype]]` link.
3. Continues climbing until it finds the property or reaches `Object.prototype.[[Prototype]]`, which is `null`.
4. Returns `undefined` if the property is unfound anywhere along the chain.

## `prototype` Property vs. `__proto__`

A common source of confusion in JavaScript is the distinction between `Function.prototype` and `Object.__proto__`.

| Entity | Description | Where It Exists |
| --- | --- | --- |
| **`prototype`** | Blueprint object assigned to instances created via `new`. | Exists **only** on Functions / Classes |
| **`__proto__`** | Historic getter/setter exposing an object's internal `[[Prototype]]`. | Exists on all Objects |
| **`Object.getPrototypeOf()`** | Modern standard method to access an object's prototype. | Built-in static method |

```javascript title="prototype-vs-__proto__.js"
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, I'm ${this.name}`;
};

const alex = new User("Alex");

console.log(alex.__proto__ === User.prototype); // true
console.log(Object.getPrototypeOf(alex) === User.prototype); // true

```

## Prototypal vs. Class-Based Syntax

ES6 introduced the `class` keyword. However, JavaScript classes are primarily **syntactic sugar** over the existing prototypal system—under the hood, functions and prototypes still power everything.

### Prototypal Delegation Pattern

```javascript title="prototypal-delegation.js"
const animalActions = {
  eat() {
    return `${this.name} is eating.`;
  }
};

// Create object linked directly to animalActions
const dog = Object.create(animalActions);
dog.name = "Rex";

console.log(dog.eat()); // "Rex is eating."

```

### Modern ES6 Class Syntax

```javascript title="es6-class-syntax.js"
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return `${this.name} is eating.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  bark() {
    return `${this.name} barks loudly!`;
  }
}

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.eat());  // "Rex is eating." (Inherited from Animal)
console.log(rex.bark()); // "Rex barks loudly!"

```

## Interactive Playground: Prototypal Chain Lookup

Inspect prototype linkage, property shadows, and method overrides in real time:

<JSEditor title="Prototypes in Action" run={true}>
  {firstExample}
</JSEditor>

## Best Practices

1. **Use ES6 Class Syntax for Readability**: Prefer `class` and `extends` for clean OOP structures, but remember it uses prototypes underneath.
2. **Avoid Modifying Native Prototypes**: Do not extend built-in objects like `Array.prototype` or `Object.prototype` (monkey patching), as it causes collisions with third-party libraries.
3. **Use `Object.getPrototypeOf()**`: Avoid using the legacy `__proto__` accessor in production code; use standard methods like `Object.getPrototypeOf()` and `Object.setPrototypeOf()`.

## Knowledge Check

### Exercise Requirements:

1. Implement a constructor function or class `Shape` that accepts `color`.
2. Extend `Shape` with a `Rectangle` subclass that accepts `color`, `width`, and `height`, and includes a method `getArea()`.

```javascript title="solution.js"
class Shape {
  constructor(color) {
    this.color = color;
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

const rect = new Rectangle("blue", 10, 5);
console.log(`Color: ${rect.color}, Area: ${rect.getArea()}`); // Color: blue, Area: 50

```

:::success Next Up
Now that you have mastered prototype delegation and class mechanics, proceed to **Execution Context and Call Stack**!
:::