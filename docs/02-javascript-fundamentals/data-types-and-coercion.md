---
id: data-types-and-coercion
title: "Data Types & Type Coercion"
sidebar_label: Data Types & Coercion
sidebar_position: 2
description: "Master primitive and reference data types in JavaScript, memory allocation, explicit type conversion, and implicit type coercion mechanics."
tags: [javascript, fundamentals, datatypes, coercion, equality]
keywords: [javascript, datatypes, coercion, equality, type conversion, type coercion]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/javascript-fundamentals/coercion-lab.js";

JavaScript is a **dynamically typed** language. This means variables do not have fixed types; instead, the values assigned to them do. Understanding how JavaScript classifies types and converts them internally prevents subtle runtime bugs.

## The 8 JavaScript Data Types

JavaScript categorizes values into two main memory structures: **Primitives** and **Reference Types (Objects)**.

```text
JavaScript Data Types
├── 🧊 Primitives (Immutable, Stored by Value on Stack)
│   ├── String
│   ├── Number
│   ├── BigInt
│   ├── Boolean
│   ├── Undefined
│   ├── Null
│   └── Symbol
└── 📦 Reference Types (Mutable, Stored by Reference on Heap)
    └── Object (Arrays, Functions, Dates, Objects)

```

| Type | Description | Example |
| --- | --- | --- |
| **String** | Textual data enclosed in quotes | `"Hello World"`, `'JS'` |
| **Number** | Double-precision 64-bit float | `42`, `3.14`, `NaN`, `Infinity` |
| **BigInt** | Arbitrary-precision integers | `9007199254740991n` |
| **Boolean** | Logical entity | `true`, `false` |
| **Undefined** | Variable declared but not assigned | `let x;` |
| **Null** | Intentional absence of value | `const user = null;` |
| **Symbol** | Unique, immutable identifier | `Symbol("id")` |
| **Object** | Collection of key-value pairs | `{ name: "Alex", age: 25 }` |

:::warning The `typeof null` Caveat
`typeof null` returns `"object"`. This is a historic bug from the first version of JavaScript and is preserved for backward compatibility.
:::

## Memory: Primitives vs. Reference Types

Primitives are copied **by value**, while objects are copied **by reference**.

```javascript title="memory.js"
// Primitive: Value Copy
let x = 10;
let y = x; // Copy created
y = 20;
console.log(x); // 10 (unmodified)

// Reference: Pointer Copy
let obj1 = { name: "Alice" };
let obj2 = obj1; // Copies memory reference
obj2.name = "Bob";
console.log(obj1.name); // "Bob" (mutated!)
```

## Type Conversion vs. Type Coercion

* **Explicit Conversion**: Intentional conversion performed using built-in constructors (`String()`, `Number()`, `Boolean()`).
* **Implicit Coercion**: Automatic type conversion triggered by operators or binary operations.

### 1. Truthy vs. Falsy Values

JavaScript coerces values to `Boolean` in logical contexts (`if`, `while`, logical operators).

There are exactly **8 Falsy values**:

* `false`
* `0`, `-0`, `0n`
* `""` (empty string)
* `null`
* `undefined`
* `NaN`

*Everything else in JavaScript is **Truthy*** (including `{}` and `[]`).

### 2. The `+` Operator Coercion Rules

The addition operator handles both numeric addition and string concatenation:

```javascript
"5" + 2;   // "52" (Number coerced to String)
"5" - 2;   // 3    (String coerced to Number)
"5" * "2"; // 10   (Both coerced to Numbers)

```

### 3. Loose (`==`) vs. Strict (`===`) Equality

* **`==` (Loose)**: Coerces types before comparison.
* **`===` (Strict)**: Compares both **value** and **type** without coercion.

```javascript title="equality.js"
5 == "5";  // true  (Coerced)
5 === "5"; // false (Types differ)

null == undefined;  // true
null === undefined; // false

```

## Interactive Playground: Coercion Lab

Test how JavaScript evaluates implicit type conversions in real time:

<JSEditor title="Coercion Lab" run={true}>
  {firstExample}
</JSEditor>

## Best Practices

1. **Always use `===**`: Prevent unpredictable behavior caused by implicit coercion during equality checks.
2. **Explicitly convert types**: Use `Number(str)`, `String(val)`, or `Boolean(val)` instead of relying on implicit tricks (`+str` or `!!val`).
3. **Use BigInt for large integers**: Numbers exceed safe integer precision beyond `2^53 - 1` (`Number.MAX_SAFE_INTEGER`).

## Knowledge Check

### Exercise Requirements:

Predict the output of the following coercion operations, then check your answers below.

1. `true + false`
2. `[] + {}`
3. `typeof NaN`

```javascript title="solution.js"
// 1. Outputs: 1
// Booleans are coerced to numbers: true = 1, false = 0
console.log(true + false);

// 2. Outputs: "[object Object]"
// Empty array converts to empty string "", object converts to "[object Object]"
console.log([] + {});

// 3. Outputs: "number"
// NaN stands for "Not-a-Number", but its data type is officially Number!
console.log(typeof NaN);

```

:::success Next Up
Now that you have mastered data types and coercion, proceed to **Functions and Arrow Functions**!
:::