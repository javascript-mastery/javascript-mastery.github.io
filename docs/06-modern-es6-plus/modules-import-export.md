---
id: modules-import-export
title: "ES6 Modules: Import & Export"
sidebar_label: Modules (Import / Export)
sidebar_position: 2
description: "Master JavaScript ES6 modules, named vs. default exports, module resolution, dynamic import() code-splitting, and top-level await mechanics."
tags: [javascript, es6, modules, import, export, tooling, build-tools]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/modules-import-export.js";

Before ES6, JavaScript lacked an official language-level module system, relying on script tags, CommonJS (`require`), or AMD. Modern JavaScript uses **ES Modules (ESM)**—a standardized declarative syntax to organize code into reusable, scoped, and maintainable files.

## Module Scope & Strict Mode

Every ES module executes in its own **Module Scope** rather than the global scope. Variables declared inside a module are private unless explicitly exported.

:::info ES Module Semantics
1. **Implicit Strict Mode**: All ES modules automatically execute in `'use strict'` mode.
2. **Static Structure**: `import` and `export` statements are static—they must reside at the top level (outside functions, loops, or conditionals).
3. **Deferred Execution**: HTML `<script type="module">` tags are automatically deferred until DOM parsing completes.
:::

## Named Exports vs. Default Exports

JavaScript modules support two types of exports: **Named Exports** (multiple per module) and **Default Exports** (one per module).

### 1. Named Exports

Named exports allow exporting multiple functions, objects, or primitives by explicit identifier:

```js title="mathUtils.js (Exporting)"
// Export inline during declaration
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

// Export list at bottom of file
function subtract(a, b) {
  return a - b;
}
export { subtract };
```


```javascript title="app.js (Importing)"
// Named imports must match exact names and use curly braces
import { PI, add, subtract } from "./mathUtils.js";

// Importing with aliases
import { add as sum } from "./mathUtils.js";

// Import all named exports under a namespace object
import * as MathUtils from "./mathUtils.js";
console.log(MathUtils.add(5, 10));
```

### 2. Default Exports

A default export represents the primary value or entity provided by a module:

```javascript title="Logger.js (Exporting)"
export default class Logger {
  log(message) {
    console.log(`[LOG]: ${message}`);
  }
}
```

```javascript title="app.js (Importing)"
// Default imports do NOT use curly braces and can be renamed freely
import AppLogger from "./Logger.js";

const logger = new AppLogger();
logger.log("Module system initialized!");
```

## Module Aggregation & Re-Exporting

Re-exporting allows aggregating multiple internal module sub-paths into a clean central entry point (often an `index.js` barrel file):

```javascript title="services/index.js"
// Re-export named entities from child modules
export { fetchUser, updateUser } from "./userService.js";

// Re-export default exports as named exports
export { default as AuthService } from "./authService.js";

// Re-export all named exports from a module
export * from "./apiConfig.js";

```

## Dynamic Imports (`import()`)

Static imports must be at the top level of a file. For **Code Splitting**, conditional loading, or route-based lazy loading, use dynamic `import()` which returns a **Promise**:

```javascript
// Dynamic import loads script on demand
async function loadAnalytics() {
  if (userHasConsented) {
    try {
      const { initTracker } = await import("./analytics.js");
      initTracker();
    } catch (err) {
      console.error("Failed to load module:", err);
    }
  }
}

// Route-based dynamic import
button.addEventListener("click", () => {
  import("./chartWidget.js").then((module) => {
    module.renderChart();
  });
});

```

## Interactive Playground: Module Simulation

Simulate namespace export binding and default alias imports:

<JSEditor title="modules-import-export.js" run={true}>
  {firstExample}
</JSEditor>

## Best Practices

1. **Prefer Named Exports for Utility Libraries**: Named exports enable better tree-shaking support in bundlers (Webpack, Vite, Rollup) and prevent naming inconsistencies.
2. **Avoid Barrel File Over-use**: Aggregating hundreds of re-exports in a single `index.js` file can degrade initial bundle size if not tree-shaken properly.
3. **Use Dynamic Imports for Heavy Modals or Routes**: Lazy-load non-critical features to keep initial page load fast.

## Knowledge Check

### Exercise Requirements:

Write a JavaScript file setup that defines a module `formatter.js` exporting two named functions (`capitalize` and `truncate`) and a default function `formatCurrency`. Show how to import all three into `main.js`.

```javascript title="formatter.js"
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str, length) {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export default function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

```

```javascript title="main.js"
import formatCurrency, { capitalize, truncate } from "./formatter.js";

console.log(capitalize("hello")); // "Hello"
console.log(truncate("JavaScript Mastery", 10)); // "JavaScript..."
console.log(formatCurrency(49.9)); // "$49.90"

```

:::success Next Up
Now that you have mastered ES6 Modules, proceed to **Optional Chaining & Nullish Coalescing**!
:::