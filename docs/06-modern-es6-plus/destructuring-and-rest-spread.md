---
id: destructuring-and-rest-spread
title: "Destructuring & Rest/Spread Syntax"
sidebar_label: Destructuring & Rest/Spread
sidebar_position: 1
description: "Master ES6+ array and object destructuring, default values, rest parameter collection, and spread operator immutability patterns in modern JavaScript."
tags: [javascript, es6, destructuring, rest-spread, immutability, clean-code]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/destructuring-immutable-updates.js";

ES6 introduced **Destructuring assignment** and the **Rest/Spread (`...`) operator**, revolutionizing how developers extract, unpack, transform, and merge data structures in JavaScript with clean, declarative syntax.

## Destructuring Assignment

Destructuring allows you to unpack values from arrays or properties from objects directly into distinct variables.

### 1. Object Destructuring

Object destructuring extracts values using property key names:

```javascript
const user = {
  id: 101,
  username: "alex_dev",
  email: "alex@example.com",
  profile: { role: "admin" }
};

// Basic extraction
const { username, email } = user;

// Renaming variables and assigning default values
const { id: userId, isVerified = false } = user;

// Nested object destructuring
const { profile: { role } } = user;

console.log(username, userId, isVerified, role);
// Output: "alex_dev", 101, false, "admin"

```

### 2. Array Destructuring

Array destructuring extracts elements based on ordered position:

```javascript
const coordinates = [37.7749, -122.4194, 15]; // [lat, lng, altitude]

// Unpacking by position
const [lat, lng] = coordinates;

// Skipping elements with empty commas
const [, longitude, altitude = 0] = coordinates;

// Swapping variables without temporary variables
let a = 1;
let b = 2;
[a, b] = [b, a]; // a = 2, b = 1

```

## Rest vs. Spread Operator (`...`)

Although both use the `...` syntax, their purpose depends entirely on where they are used:

* **Rest Operator**: *Gathers* multiple individual elements into a single array or object.
* **Spread Operator**: *Expands* an array or iterable into individual elements or object properties.

```text
Rest vs. Spread Spectrum
┌──────────────────────────────────────────────────────────┐
│ REST: Gather elements into an array                      │
│ function sum(...numbers) { ... }                         │
├──────────────────────────────────────────────────────────┤
│ SPREAD: Expand iterable into discrete elements           │
│ const Combined = [...arr1, ...arr2];                    │
└──────────────────────────────────────────────────────────┘

```

### The Rest Operator (`...`)

Collects remaining items during function parameter definitions or destructuring assignments:

```javascript
// Rest in Function Parameters
function calculateTotal(taxRate, ...prices) {
  const sum = prices.reduce((acc, curr) => acc + curr, 0);
  return sum * (1 + taxRate);
}

// Rest in Object Destructuring
const product = { id: 1, name: "Keyboard", price: 99, inStock: true };
const { id, name, ...metadata } = product;

console.log(metadata); // { price: 99, inStock: true }

```

### The Spread Operator (`...`)

Unpacks iterables or object key-value pairs into new structures:

```javascript
// Array Spreading & Concatenation
const frontend = ["React", "Vue"];
const backend = ["Node", "Express"];
const stack = [...frontend, "TypeScript", ...backend];

// Object Spreading & Merging
const defaultSettings = { theme: "light", notifications: true };
const userSettings = { theme: "dark" };

// Deep properties are overwritten by right-most spread objects
const currentConfig = { ...defaultSettings, ...userSettings };
// { theme: "dark", notifications: true }

```

:::warning Shallow Copy Warning
Spreading arrays or objects creates a **shallow copy**. Nested object references remain shared across copies. Use `structuredClone()` or libraries like Lodash for deep copying.
:::

## Interactive Playground: Destructuring & Immutable Updates

Experiment with updating nested object states immutably using object destructuring and spread syntax:

<JSEditor title="destructuring-immutable-updates.js" run={true}>
  {firstExample}
</JSEditor>

## Best Practices

1. **Use Destructuring in Function Parameters**: Cleanly extract options or props directly in the parameter signature: `function Profile({ name, age = 18 })`.
2. **Preserve Immutability with Spread**: Use the spread operator instead of mutating existing arrays with `push()` or objects with direct property assignment.
3. **Provide Fallbacks for Safety**: Always assign default values during destructuring to prevent runtime `TypeError` issues on `undefined` properties.

## Knowledge Check

### Exercise Requirements:

Write a function `formatUserResponse(response)` that uses destructuring, default values, and the rest operator to extract `id`, `name`, and collect all remaining user settings into a single `preferences` object.

```javascript title="solution.js"
function formatUserResponse(response) {
  const {
    id = 0,
    name = "Anonymous",
    status,
    ...preferences
  } = response;

  return {
    id,
    name,
    preferences
  };
}

```

:::success Next Up
Now that you have mastered destructuring and rest/spread syntax, proceed to **Modules and ES6 Imports/Exports**!
:::