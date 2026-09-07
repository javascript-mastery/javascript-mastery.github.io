---
id: event-handling-and-delegation
title: "Event Handling & Event Delegation"
sidebar_label: Event Handling & Delegation
sidebar_position: 3
description: "Master JavaScript event mechanics, event propagation phases (capturing and bubbling), event delegation patterns, custom events, and performance optimization."
tags: [javascript, events, event-delegation, bubbling, event-listener, browser-apis]
---

import { LiveCodeEditor, EditorTemplates } from "@site/src/components/LiveCodeEditor";

Interactivity in web applications is driven by browser **Events**—signals dispatched by the browser when a user interacts with the page (e.g., clicking, scrolling, typing) or when system states change.

## Event Propagation Lifecycle

When an event occurs on a target element, it does not execute in isolation. It flows through the DOM tree in three distinct phases:

```text
Event Propagation Lifecycle
┌─────────────────────────────────────────────────────────────┐
│ 1. Capturing Phase (Trickling down from Window to Target)   │
│    Window ──> Document ──> <html> ──> <body> ──> Parent    │
├─────────────────────────────────────────────────────────────┤
│ 2. Target Phase (Event reaches the actual Target Node)      │
│    Target Node Executing Listeners                          │
├─────────────────────────────────────────────────────────────┤
│ 3. Bubbling Phase (Bubbling back up from Target to Window)  │
│    Parent ──> <body> ──> <html> ──> Document ──> Window     │
└─────────────────────────────────────────────────────────────┘

```

1. **Capturing Phase (Trickle Down)**: The event moves down from the `window` object through ancestral nodes toward the target element.
2. **Target Phase**: The event reaches the target element where it originated (`event.target`).
3. **Bubbling Phase (Bubble Up)**: The event bubbles back up through ancestral nodes toward `window`. By default, most event listeners fire during this phase.

---

## Listening to Events (`addEventListener`)

The standard method for registering event handlers is `addEventListener()`. It allows multiple handlers per event and fine-grained control via configuration options:

```javascript
element.addEventListener(type, listener, options);

```

```javascript
const button = document.querySelector("#submit-btn");

function handleClick(event) {
  console.log("Button Clicked!", event.target);
}

// Register listener (Bubbling phase by default)
button.addEventListener("click", handleClick);

// Listener with advanced options
button.addEventListener("click", handleClick, {
  once: true,     // Automatically removes listener after first invocation
  passive: true,  // Indicates function won't call event.preventDefault() (optimizes scroll performance)
  capture: false  // If true, executes during Capturing Phase instead of Bubbling Phase
});

```

## Controlling Event Flow

| Method / Property | Description |
| --- | --- |
| **`event.target`** | The actual element that triggered the event (innermost node). |
| **`event.currentTarget`** | The element to which the current event listener is attached (`this`). |
| **`event.preventDefault()`** | Cancels the browser's default behavior (e.g., prevents link navigation or form submission). |
| **`event.stopPropagation()`** | Stops the event from bubbling up or capturing further down the DOM chain. |
| **`event.stopImmediatePropagation()`** | Stops propagation **and** prevents remaining listeners on the *same* element from executing. |

## Event Delegation Pattern

**Event Delegation** is a performance optimization pattern where a single event listener is attached to a parent element to manage events for all of its existing and future child elements.

Instead of attaching 1,000 listeners to 1,000 table rows or list items, attach **one single listener** to the parent container leveraging event bubbling:

```javascript
// ❌ Poor Pattern: Attaching 1,000 individual event listeners
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", (e) => console.log(e.target));
});

// ✅ Optimal Pattern: Event Delegation on the Parent Container
const parentList = document.querySelector("#item-list");

parentList.addEventListener("click", (event) => {
  // Use .closest() to match target or ancestral child elements
  const listItem = event.target.closest(".item");

  if (listItem && parentList.contains(listItem)) {
    console.log("Clicked Item ID:", listItem.dataset.id);
  }
});

```

## Custom Events

You can define and dispatch application-specific custom events using the `CustomEvent` constructor:

```javascript
const userContainer = document.querySelector("#user-profile");

// 1. Listen for custom event
userContainer.addEventListener("userUpdated", (event) => {
  console.log("Updated User:", event.detail.username);
});

// 2. Dispatch custom event with payload
const customEvt = new CustomEvent("userUpdated", {
  detail: { username: "Alex", role: "Admin" },
  bubbles: true // Allows event to bubble up DOM tree
});

userContainer.dispatchEvent(customEvt);

```

## Interactive Playground: Delegation Simulator

Observe how event bubbling identifies child element targets through a single parent handler:

<div>
      <LiveCodeEditor 
        lessonTitle="JS Mastery Docs: Event Delegation Demo"
        lessonSubtitle="A complete, working example demonstrating event delegation in JavaScript with HTML, CSS, and interactive simulation is provided below."
        templates={{
  initialHtml: `<div class="counter-card">
  <div class="display" id="count">0</div>
  <div class="actions">
    <button id="dec" class="btn btn-sec">-</button>
    <button id="inc" class="btn btn-pri">+</button>
  </div>
</div>`,
  initialCss: `body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0f172a;
  color: #f8fafc;
  font-family: system-ui, sans-serif;
}
.counter-card {
  background: #1e293b;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  text-align: center;
  width: 200px;
}
.display {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #38bdf8;
}
.actions {
  display: flex;
  gap: 1rem;
}
.btn {
  flex: 1;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  font-weight: 600;
}
.btn-pri { background: #0284c7; color: white; }
.btn-sec { background: #334155; color: white; }`,
  initialJs: `const countEl = document.getElementById('count');
const incBtn = document.getElementById('inc');
const decBtn = document.getElementById('dec');

let count = 0;
incBtn.addEventListener('click', () => {
  count++;
  countEl.textContent = count;
  console.log("count:", count)
});
decBtn.addEventListener('click', () => {
  count--;
  countEl.textContent = count;
  console.log("count:", count)
});`,
}}
      />
    </div>

## Best Practices

1. **Leverage Event Delegation for Dynamic Content**: Use delegation when working with lists, tables, or UI components where elements are added/removed dynamically.
2. **Clean Up Event Listeners**: Always call `removeEventListener()` when tearing down elements or components to prevent memory leaks.
3. **Use `{ passive: true }` on Scroll/Touch Handlers**: Mark touch and wheel listeners as passive to improve scrolling performance on mobile screens.

## Knowledge Check

### Exercise Requirements:

Write an event delegation function `setupAccordion(containerElement)` that listens for clicks on elements with the class `.accordion-header` inside the container, toggles the `.active` class on its parent `.accordion-item`, and closes all other open items.

```javascript title="solution.js"
function setupAccordion(containerElement) {
  containerElement.addEventListener("click", (event) => {
    const header = event.target.closest(".accordion-header");
    if (!header || !containerElement.contains(header)) return;

    const currentItem = header.closest(".accordion-item");

    // Close all other items
    const allItems = containerElement.querySelectorAll(".accordion-item");
    allItems.forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("active");
      }
    });

    // Toggle current item
    currentItem.classList.toggle("active");
  });
}

```

:::success Next Up
Now that you have mastered event propagation and delegation, proceed to **Browser Storage & State Management**!
:::