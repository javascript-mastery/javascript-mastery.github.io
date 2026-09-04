---
id: promises-and-async-await
title: "Promises & Async/Await"
sidebar_label: Promises & Async/Await
sidebar_position: 2
description: "Master JavaScript Promises, Promise chaining, static concurrency combinators, async/await syntax, top-level await, and resilient error handling pattern."
tags: [javascript, async, promises, async-await, error-handling, es6]
keywords: [javascript, async, promises, async-await, error-handling, es6]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/asynchronous-javascript/async-await-playground.js";

Managing asynchronous operations using nested callbacks leads to unmaintainable "Callback Hell." Modern JavaScript handles asynchronous workflows cleanly using **Promises** and **`async/await`** syntax.

## Understanding Promises

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

```text
Promise Lifecycle & States
                       ┌───────────────┐
                       │   Pending     │
                       │ (Initial State)│
                       └───────┬───────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
   ┌─────────────────┐                   ┌─────────────────┐
   │    Fulfilled    │                   │    Rejected     │
   │  (resolve(val)) │                   │  (reject(err))  │
   └────────┬────────┘                   └────────┬────────┘
            │                                     │
            ▼                                     ▼
     .then(onFulfilled)                   .catch(onRejected)

```

A Promise can exist in one of three mutually exclusive states:

* **`pending`**: Initial state; neither fulfilled nor rejected.
* **`fulfilled`**: Operation completed successfully (`resolve()` was called).
* **`rejected`**: Operation failed (`reject()` was called).

## Promise Chaining & Error Propagation

The `.then()` method returns a **new Promise**, allowing operations to be chained sequentially:

```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) reject(new Error("Invalid User ID"));
    setTimeout(() => resolve({ id, name: "Alex" }), 100);
  });
}

fetchUser(1)
  .then((user) => {
    console.log("Fetched User:", user.name);
    return user.id;
  })
  .then((userId) => {
    console.log("Processing ID:", userId);
  })
  .catch((error) => {
    console.error("Error encountered:", error.message);
  })
  .finally(() => {
    console.log("Cleanup complete");
  });

```

## Async/Await Syntax

Introduced in ES2017, `async` and `await` are syntactic sugar built on top of Promises, making asynchronous code look and behave like synchronous code.

```javascript
async function getUserProfile(userId) {
  try {
    const user = await fetchUser(userId);
    console.log(`User Profile: ${user.name}`);
    return user;
  } catch (error) {
    console.error("Failed to load profile:", error.message);
  } finally {
    console.log("Request finished");
  }
}

```

:::info Key Rules of Async/Await

1. Marking a function `async` wraps its return value in a **Promise**.
2. `await` pauses function execution until the awaited Promise settles (fulfills or rejects).
3. `await` can only be used inside `async` functions (or at top-level in ES modules).
:::

## Static Promise Combinators (Concurrency Methods)

JavaScript provides 4 static methods to execute multiple Promises concurrently:

| Method | Behavior | Fails When... | Use Case |
| --- | --- | --- | --- |
| **`Promise.all()`** | Resolves when **all** promises resolve; returns array of results. | **Any** promise rejects (short-circuits). | Parallel operations where all must succeed. |
| **`Promise.allSettled()`** | Resolves when **all** promises settle (returns status + value/reason). | **Never** rejects. | Batch jobs where failure of one shouldn't cancel others. |
| **`Promise.race()`** | Settles as soon as the **first** promise settles (fulfilled or rejected). | Rejects if first promise rejects. | Timeouts or returning fastest responding node. |
| **`Promise.any()`** | Resolves as soon as the **first** promise fulfills. | Rejects only if **all** promises reject. | Fetching redundant fallback endpoints. |

```javascript
const requestA = fetch("/api/v1");
const requestB = fetch("/api/v2");

// Wait for both in parallel
const [resA, resB] = await Promise.all([requestA, requestB]);

```

## Interactive Playground: Async/Await Workflow

Experiment with resolved vs. rejected Promises using `async/await` and `try/catch`:

<JSEditor title="Async/Await Playground" run={true}>
  {firstExample}
</JSEditor>

## Best Practices

1. **Avoid Sequential `await` in Loops**: Use `Promise.all()` when requests don't depend on each other to prevent artificial performance bottlenecks.
2. **Always Handle Errors**: Wrap `await` expressions in `try/catch` blocks or attach a `.catch()` fallback to prevent unhandled promise rejections.
3. **Prefer `Promise.allSettled` for Batch Requests**: When firing multiple non-critical requests, `allSettled()` prevents one failing call from discarding successful results.

## Knowledge Check

### Exercise Requirements:

Refactor the following promise-chain code to use clean `async/await` syntax with proper `try/catch` error handling:

```javascript title="promise-chain.js"
async function loadData(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    console.log(posts);
  } catch (err) {
    console.error("Error loading user posts:", err);
  }
}
```

:::success Next Up
Now that you have mastered Promises and `async/await`, proceed to **Microtasks, Macrotasks, and Web APIs**!
:::