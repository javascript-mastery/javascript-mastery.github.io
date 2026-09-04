---
id: event-loop-and-task-queue
title: "The Event Loop & Task Queue Mechanics"
sidebar_label: Event Loop & Task Queues
sidebar_position: 1
description: "Master the JavaScript Event Loop, asynchronous execution concurrency, Call Stack, Microtask Queue, Macrotask Queue, and microtask starvation."
tags: [javascript, async, event-loop, microtasks, macrotasks, concurrency]
keywords: [javascript, async, event-loop, microtasks, macrotasks, concurrency]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/asynchronous-javascript/event-loop-playground.js";
import secondExample from "!!raw-loader!../_scripts/asynchronous-javascript/event-loop-exercise.js";

JavaScript is single-threaded, meaning it can only execute one line of code at a time on its main thread. Despite this limitation, it handles non-blocking asynchronous operations—such as network requests, file I/O, and timers—efficiently through the **Event Loop**.

## Architecture of Asynchronous Execution

To handle asynchronous tasks without freezing the user interface, the JavaScript engine works alongside browser Web APIs (or Node.js C++ bindings) and two distinct execution queues.

```text
JavaScript Asynchronous Architecture
┌─────────────────────────────────────────────────────────────┐
│ Call Stack (Synchronous Execution LIFO)                     │
└──────────────────────────────┬──────────────────────────────┘
                               │ Delegation
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Web APIs (Timers, Fetch HTTP, DOM Events, File Systems)     │
└──────────────────────────────┬──────────────────────────────┘
                               │ Callbacks Ready
                               ▼
┌──────────────────────────────┬──────────────────────────────┐
│ Microtask Queue (High-Priority)│ Macrotask Queue (Task Queue)
│ ├── Promises (.then/catch)   │ ├── setTimeout / setInterval │
│ ├── queueMicrotask()         │ ├── setImmediate (Node.js)   │
│ └── MutationObserver         │ └── requestAnimationFrame    │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
               └───────────────┬──────────────┘
                               │ Event Loop Tick
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Call Stack (Executed when Call Stack is empty)              │
└─────────────────────────────────────────────────────────────┘

```

## Microtasks vs. Macrotasks (Task Priorities)

The Event Loop continuously monitors the **Call Stack**. When the stack is empty, it processes pending callbacks according to a strict priority hierarchy:

| Queue Type | Operations | Execution Rule / Priority |
| --- | --- | --- |
| **Microtask Queue** | `Promise` callbacks, `queueMicrotask()`, `process.nextTick` (Node) | **Highest Priority**: Drained **completely** until empty before any macrotask runs. |
| **Macrotask Queue** | `setTimeout`, `setInterval`, `setImmediate`, I/O, UI Rendering | **Normal Priority**: Processes **one single task** per Event Loop tick, then checks microtasks again. |

## The Event Loop Execution Algorithm

During every cycle ("tick") of the Event Loop, the runtime follows these exact steps:

1. **Execute Synchronous Code**: Process all frames in the Call Stack until it is completely empty.
2. **Drain Microtask Queue**: Process every single microtask currently in the queue. If a microtask schedules another microtask, it is executed in the *same* cycle.
3. **Render UI (Browser Only)**: Perform DOM re-paints and run `requestAnimationFrame` callbacks if needed.
4. **Execute One Macrotask**: Dequeue and run the oldest single task from the Macrotask Queue.
5. **Repeat**: Loop back to step 1.

## Microtask Starvation

Because the Event Loop must drain the **entire** Microtask Queue before yielding execution to macrotasks or UI rendering, continuously enqueuing microtasks will block the main thread indefinitely:

```javascript title="Infinite Microtask Starvation Example"
// WARNING: This recursively starves the Macrotask Queue and freezes the UI!
function infiniteMicrotask() {
  Promise.resolve().then(() => {
    infiniteMicrotask(); // Enqueues another microtask infinitely
  });
}

// infiniteMicrotask(); // Un-commenting will crash/freeze the thread!

```

## Interactive Playground: Tracing Execution Order

Predict the log sequence of synchronous statements, `setTimeout`, and `Promise.then` callbacks:

<JSEditor title="Event Loop Playground" run={true}>
  {firstExample}
</JSEditor>

## Best Practices

1. **Use Promises/Microtasks for Instant State Updates**: When you need async operations to resolve immediately before DOM repainting or downstream state changes occurs.
2. **Offload Heavy Loops with `setTimeout`**: Yield execution back to the browser frame engine by breaking intensive computations into macrotask chunks (`setTimeout(fn, 0)`).
3. **Avoid Infinite Microtask Chaining**: Never recursively queue microtasks (`queueMicrotask` or `.then`) without exit conditions; doing so blocks DOM rendering and input events.


## Knowledge Check

### Exercise Requirements:

Determine the exact console output order for the following code snippet:

<JSEditor title="Event Loop Exercise" run={true}>
  {secondExample}
</JSEditor>

#### Explanation:

1. Synchronous execution logs `A` and `F`.
2. Microtask Queue processes `C` and `E`.
3. Inside microtask `C`, a new macrotask (`D`) is scheduled behind `B`.
4. Macrotask Queue runs `B` first (oldest macrotask), then runs `D`.

:::success Next Up
Now that you have mastered Event Loop ordering and task queues, proceed to **Promises and Async/Await**!
:::