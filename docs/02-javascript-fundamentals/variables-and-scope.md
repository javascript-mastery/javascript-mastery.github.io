---
id: variables-and-scope
title: "Variables, Declarations, and Scope Mechanics"
sidebar_label: Variables & Scope
sidebar_position: 1
description: "Master variable declarations with var, let, and const, along with lexical scoping, block scope, and hoisting in JavaScript."
tags: [javascript, fundamentals, variables, scope, hoisting]
keywords: [javascript, variables, scope, hoisting, let, const, var]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/javascript-fundamentals/global-scope.js";
import blockScopeExample from "!!raw-loader!../_scripts/javascript-fundamentals/block-scope-example.js";
import scopePlayground from "!!raw-loader!../_scripts/javascript-fundamentals/scope-playground.js";
import solution from "!!raw-loader!../_scripts/javascript-fundamentals/solution.js";
import varHoisting from "!!raw-loader!../_scripts/javascript-fundamentals/var-hoisting.js";
import temporalDeadZone from "!!raw-loader!../_scripts/javascript-fundamentals/temporal-dead-zone.js";

In JavaScript, variables store data values, but how and where you declare them dictates their lifecycle, accessibility, and mutability. Understanding variable declarations and scoping mechanics is essential to writing clean, bug-free code.

## Declaration Types: `var` vs `let` vs `const`

JavaScript offers three keywords for variable declaration: `var` (ES5), `let` (ES6), and `const` (ES6).

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope Level** | Function / Global | Block Scope `{}` | Block Scope `{}` |
| **Re-declaration** | Allowed | Syntax Error | Syntax Error |
| **Re-assignment** | Allowed | Allowed | TypeError |
| **Hoisting Behavior** | Initialized as `undefined` | Uninitialized (Temporal Dead Zone) | Uninitialized (Temporal Dead Zone) |
| **Global Object Property** | Yes (`window.x`) | No | No |

## Scope Types Explained

Scope determines the visibility and accessibility of variables in different parts of your code.

```text
Scope Hierarchy
├── Global Scope       -> Accessible anywhere in the execution context
├── Function Scope     -> Bound inside function boundary (var, let, const)
└── Block Scope        -> Bound inside block curly braces {} (let, const only)

```

### 1. Global Scope

Variables declared outside any function or block belong to the global scope.

<JSEditor title="Global Scope Example" run={true}>
  {firstExample}
</JSEditor>

:::note

When you run the above code, the output is undefined because the variable `globalAppTitle` is declared in the global scope and is accessible inside the function `printTitle()`.

So, when we call `printTitle()`, it logs the value of `globalAppTitle` to the console.

**For example:**

```js {4,6}
const globalAppTitle = "JavaScript Mastery";

function printTitle() {
  console.log(globalAppTitle); // Accessible here
}
printTitle(); // Logs: "JavaScript Mastery"
```
:::

### 2. Block Scope (`let` / `const`)

Variables declared with `let` and `const` inside `{}` cannot be accessed outside that block.

<JSEditor title="Block Scope Example" run={true}>
  {blockScopeExample}
</JSEditor>

## Hoisting & The Temporal Dead Zone (TDZ)

**Hoisting** is JavaScript's default behavior of moving declarations to the top of their containing scope during the compilation phase prior to code execution.

### `var` Hoisting

Declarations are hoisted and initialized with `undefined`.

<JSEditor title="var Hoisting Example" run={true}>
  {varHoisting}
</JSEditor>

### `let` and `const` Hoisting (The TDZ)

`let` and `const` variables are hoisted, but remain **uninitialized**. The time between entering scope and variable declaration is called the **Temporal Dead Zone (TDZ)**.

<JSEditor title="Temporal Dead Zone Example" run={true}>
  {temporalDeadZone}
</JSEditor>

## Interactive Playground: Scope Exploration

Try editing the script below to observe how block scope and variable re-assignments behave live:

<JSEditor title="Scope Playground" run={true}>
  {scopePlayground}
</JSEditor>

## Best Practices

1. **Default to `const**`: Protect variables from unintended re-assignments.
2. **Use `let` for reassignment**: Use only when values must mutate (e.g., loop counters, accumulators).
3. **Avoid `var**`: Prevent scope-leakage issues and silent hoisting bugs in modern applications.

## Knowledge Check

### Exercise Requirements:

1. Fix the variable declarations below so no variables leak outside the `if` block.
2. Ensure `API_KEY` cannot be accidentally reassigned later in execution.

<JSEditor title="Solution" run={true}>
  {solution}
</JSEditor>

:::success Next Up
Now that you understand variable lifetimes and scoping, proceed to **Data Types and Type Coercion**!
:::