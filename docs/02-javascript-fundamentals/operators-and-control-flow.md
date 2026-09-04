---
id: operators-and-control-flow
title: "Operators & Control Flow"
sidebar_label: Operators & Control Flow
sidebar_position: 4
description: "Master JavaScript operators, nullish coalescing, optional chaining, conditional branching, and control flow mechanics."
tags: [javascript, fundamentals, operators, control-flow, conditionals, loops]
keywords: [javascript, operators, control-flow, conditionals, loops, nullish coalescing, optional chaining]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/javascript-fundamentals/operators-playground.js";

Control flow governs the execution order of statements in your code. By combining comparison operators, modern short-circuiting mechanisms, and branching constructs, you can write resilient and expressive decision logic.

## Modern Operators & Short-Circuiting

Modern JavaScript provides powerful operators to streamline conditional checks and handle missing or nullish data safely.

| Operator | Name | Syntax | Behavior / Rule |
| :--- | :--- | :--- | :--- |
| **`??`** | Nullish Coalescing | `a ?? b` | Returns `b` **only if** `a` is `null` or `undefined` |
| **`?.`** | Optional Chaining | `obj?.prop` | Short-circuits to `undefined` if `obj` is `null` or `undefined` |
| **`&&`** | Logical AND | `a && b` | Returns `a` if falsy; otherwise returns `b` |
| **`\|\|`** | Logical OR | `a \|\| b` | Returns `a` if truthy; otherwise returns `b` |
| **`?:`** | Ternary Operator | `cond ? a : b` | Inline conditional expression |


## `||` vs. `??` (Nullish Coalescing)

The Logical OR operator (`||`) falls back on **any falsy value** (`0`, `""`, `false`, `null`, `undefined`), whereas Nullish Coalescing (`??`) falls back **only on `null` or `undefined`**.

```javascript title="nullish-coalescing.js"
const userConfig = {
  fontSize: 0,
  themeColor: "",
  showSidebar: false,
};

// Logical OR (Overwrites valid zero and empty string values!)
const sizeOR = userConfig.fontSize || 16;       // 16  (0 is falsy!)
const themeOR = userConfig.themeColor || "dark"; // "dark" ("" is falsy!)

// Nullish Coalescing (Preserves valid 0, false, and "")
const sizeNullish = userConfig.fontSize ?? 16;       // 0
const themeNullish = userConfig.themeColor ?? "dark"; // ""

```

## Safe Property Access with Optional Chaining (`?.`)

Optional chaining prevents runtime `TypeError: Cannot read properties of undefined` exceptions when traversing nested structures:

```javascript title="optional-chaining.js"
const userResponse = {
  profile: {
    name: "Alex",
  },
};

// Without optional chaining (Verbose & error-prone)
const cityOld = userResponse.profile && userResponse.profile.address && userResponse.profile.address.city;

// With optional chaining (Clean & safe)
const cityNew = userResponse?.profile?.address?.city; // undefined (No runtime crash!)

// Optional Method Calls & Array Indexing
const firstTag = userResponse?.tags?.[0];
const result = userResponse?.getAnalytics?.();

```

## Branching Mechanics

### 1. `if / else if / else`

Standard conditional branching for non-trivial logic.

### 2. `switch` Statements & Strict Matching

Useful for multi-branch checks against discrete values. Switches perform **strict equality checks (`===`)**.

```javascript title="switch-statement.js"
function getRolePermissions(role) {
  switch (role) {
    case "admin":
    case "superadmin":
      return ["read", "write", "delete"];
    case "editor":
      return ["read", "write"];
    case "viewer":
      return ["read"];
    default:
      return [];
  }
}

```

## Iteration & Looping Mechanics

JavaScript provides specialized loops designed for different data structures:

```text
Loops in JavaScript
├── 🔁 for              -> Traditional indexed iteration
├── 📦 for...of         -> Iterates over values of Iterables (Arrays, Strings, Maps)
└── 🔑 for...in         -> Iterates over enumerable keys/properties of Objects

```

```javascript title="looping-mechanics.js"
const frameworkList = ["React", "Vue", "Angular"];
const metadata = { version: "18.2", author: "Meta" };

// 1. for...of (Values)
for (const framework of frameworkList) {
  console.log("Framework:", framework);
}

// 2. for...in (Keys)
for (const key in metadata) {
  console.log(`${key}: ${metadata[key]}`);
}

```

:::warning Avoid `for...in` on Arrays
`for...in` iterates over property names (indexes as strings) and inherited prototype keys. Always prefer `for...of` or `.forEach()` for arrays.
:::

## Interactive Playground: Operators & Control Flow

Experiment with optional chaining, nullish coalescing, and short-circuiting in real time:

<JSEditor title="Operators Playground" run={true}>
  {firstExample}
</JSEditor>

## Best Practices

1. **Prefer `??` over `||` for defaults**: Protect numeric zeros, empty strings, and booleans from being unintentionally overridden.
2. **Chain safely, but don't over-use**: Use `?.` when property existence is genuinely uncertain; avoid using it everywhere to obscure design flaws.
3. **Keep branches clean**: Replace complex, nested `if...else` statements with early `return` guards or lookup maps.

## Knowledge Check

### Exercise Requirements:

1. Safely extract the `zipCode` property from `customerProfile` without throwing an error if `address` is missing.
2. Fall back to `"00000"` if `zipCode` is `null` or `undefined`.

```javascript title="solution.js"
const customerProfile = {
  id: 42,
  name: "Jordan",
  // address property is missing
};

// Combine optional chaining with nullish coalescing
const zipCode = customerProfile?.address?.zipCode ?? "00000";

console.log("Zip Code:", zipCode); // Output: "00000"

```

:::success Phase 02 Complete!
Congratulations! You have mastered **JavaScript Fundamentals**. Proceed to **Phase 03: Deep Dive Core** to master closures, prototypes, and engine mechanics!
:::