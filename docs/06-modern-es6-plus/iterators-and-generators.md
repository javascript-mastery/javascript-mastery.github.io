---
id: iterators-and-generators
title: "Iterators & Generators"
sidebar_label: Iterators & Generators
sidebar_position: 4
description: "Master JavaScript iteration protocols, custom iterators, generator functions, two-way yield communication, and asynchronous generators."
tags: [javascript, es6, iterators, generators, symbol-iterator, async-generators]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/fibonacci-gen.js";

ES6 introduced **Iterators** and **Generators**, providing a uniform interface for traversing data structures and a mechanism for writing pauseable, stateful functions.

## The Iteration Protocols

JavaScript defines iteration capabilities through two formal protocols:

1. **The Iterable Protocol**: An object is iterable if it defines a method at key `[Symbol.iterator]` that returns an Iterator object. Built-in iterables include `Array`, `String`, `Map`, `Set`, and `NodeList`.
2. **The Iterator Protocol**: An object that implements a `.next()` method returning an object with two properties:
   - `value`: The current item value.
   - `done`: A boolean (`true` when iteration finishes).

```text
Iteration Protocol Flow
  Iterable Object ──[Symbol.iterator]()──> Iterator Object
                                                │
                                          .next()
                                                │
                                                ▼
                                    { value: X, done: false }

```

### Creating a Custom Iterator

```javascript
const customSequence = {
  start: 1,
  end: 3,
  [Symbol.iterator]() {
    let current = this.start;
    const last = this.end;

    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const num of customSequence) {
  console.log(num); // Logs: 1, 2, 3
}

```

## Generator Functions (`function*`)

Generators are special functions that can be paused mid-execution using the `yield` keyword and resumed on demand. Defining a function with `function*` returns a **Generator Object**, which implements both the Iterator and Iterable protocols.

```javascript
function* idGenerator() {
  let id = 1;
  while (true) {
    yield `USER_${id++}`;
  }
}

const gen = idGenerator();
console.log(gen.next().value); // "USER_1"
console.log(gen.next().value); // "USER_2"
console.log(gen.next().value); // "USER_3"

```

## Two-Way Generator Communication

The `yield` expression not only yields values out of the generator—it also receives values passed back into `.next(value)` when execution resumes:

```javascript
function* conversation() {
  const name = yield "What is your name?";
  const action = yield `Hello, ${name}! What do you want to do?`;
  return `Executing ${action} for ${name}.`;
}

const chat = conversation();

// 1. First next() starts execution until first yield
console.log(chat.next().value); // "What is your name?"

// 2. Pass value into first yield
console.log(chat.next("Alex").value); // "Hello, Alex! What do you want to do?"

// 3. Pass value into second yield
console.log(chat.next("Data Backup").value); // "Executing Data Backup for Alex."

```

## Generator Delegation (`yield*`)

Use `yield*` to delegate iteration authority to another iterable or nested generator:

```javascript
function* taskGroupA() {
  yield "Task A1";
  yield "Task A2";
}

function* masterWorkflow() {
  yield "Workflow Started";
  yield* taskGroupA(); // Delegates execution to taskGroupA
  yield "Workflow Completed";
}

const workflow = masterWorkflow();
console.log([...workflow]);
// ["Workflow Started", "Task A1", "Task A2", "Workflow Completed"]

```

## Asynchronous Generators (`for await...of`)

Async generators combine async/await with generators, yielding Promises that can be traversed sequentially using `for await...of`:

```javascript
async function* fetchPaginatedPages(maxPages) {
  for (let page = 1; page <= maxPages; page++) {
    const data = await fetch(`https://api.example.com/items?page=${page}`).then(res => res.json());
    yield data;
  }
}

async function processData() {
  for await (const pageData of fetchPaginatedPages(3)) {
    console.log("Fetched Page Data:", pageData);
  }
}

```

## Interactive Playground: Fibonacci Generator

Observe infinite generator state evaluation without memory stack overflow:

<JSEditor title="fibonacci-gen.js" run={true}>
  {firstExample}
</JSEditor>

## Best Practices

1. **Use Generators for Memory-Efficient Streams**: Generate large sequences lazily on demand instead of allocating massive arrays in RAM.
2. **Avoid Generator Overuse for Simple Loops**: Use standard `for...of` loops or Array iterator methods (`map`, `filter`) when standard iteration suffices.
3. **Always Consume Iterators Cleanly**: Leverage `for...of`, `[...iterable]`, or Array destructuring to automatically consume iterator values until `done: true`.

## Knowledge Check

### Exercise Requirements:

Write a custom iterable object `range(start, end, step)` using `Symbol.iterator` or a generator function that yields numbers from `start` to `end` incremented by `step`.

```javascript title="solution.js"
function* range(start, end, step = 1) {
  let current = start;
  while (current <= end) {
    yield current;
    current += step;
  }
}

// Usage
console.log([...range(2, 10, 2)]); // [2, 4, 6, 8, 10]

```

:::success Phase 06 Complete!
Congratulations! You have completed **Phase 06: Modern ES6+ Features**. Proceed to **Phase 07: Advanced JS Concepts**!
:::