---
id: dom-manipulation
title: "DOM Manipulation & Node Mutation"
sidebar_label: DOM Manipulation
sidebar_position: 2
description: "Master Document Object Model (DOM) tree traversal, node creation, layout performance optimization, DocumentFragment batching, and element attribute/style manipulation."
tags: [javascript, dom, browser-api, performance, web-dev, frontend]
keywords: [javascript, dom, browser-api, performance, web-dev, frontend]
---

import { LiveCodeEditor, EditorTemplates } from "@site/src/components/LiveCodeEditor";

The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page as a structured tree of nodes, allowing JavaScript to dynamically query, alter, add, or remove content, structural elements, and styling.

## DOM Tree Structure & Node Types

Every element, attribute, and piece of text in an HTML document exists as a node inside the DOM tree hierarchy:

```text
Document (Root)
└── html (Element Node)
    ├── head (Element Node)
    │   └── title (Element Node)
    │       └── "Page Title" (Text Node)
    └── body (Element Node)
        ├── h1 (Element Node)
        │   └── "Heading Text" (Text Node)
        └── main (Element Node)
            └── p (Element Node)
                └── "Paragraph content..." (Text Node)
```

Common node types include:

* **`Node.ELEMENT_NODE`** (Type `1`): Standard HTML elements (`<div>`, `<p>`, `<a>`).
* **`Node.TEXT_NODE`** (Type `3`): Raw text inside elements (including whitespace and line breaks).
* **`Node.COMMENT_NODE`** (Type `8`): HTML comments (`<!-- comment -->`).
* **`Node.DOCUMENT_NODE`** (Type `9`): The root `document` object.

## Querying & Selecting Elements

Modern JavaScript provides powerful methods to traverse and select DOM elements:

| Method | Return Type | Live vs Static |
| --- | --- | --- |
| `document.getElementById('id')` | `Element | null` | N/A |
| `document.querySelector('selector')` | `Element | null` | Static |
| `document.querySelectorAll('selector')` | `NodeList` | **Static** (Snapshot at query time) |
| `document.getElementsByClassName('class')` | `HTMLCollection` | **Live** (Updates automatically) |
| `document.getElementsByTagName('tag')` | `HTMLCollection` | **Live** (Updates automatically) |

```javascript title="query-selectors.js"
// Query single element by CSS selector
const primaryButton = document.querySelector(".btn-primary");

// Query all matching elements (returns static NodeList)
const cardItems = document.querySelectorAll("#card-list .item");

// Convert NodeList or HTMLCollection to an Array for functional methods
const cardArray = Array.from(cardItems);

```

## Creating & Inserting Nodes

To construct dynamic interfaces, you can create nodes in memory and mount them to the active DOM tree:

```javascript title="create-insert-nodes.js"
// 1. Create a new element
const newCard = document.createElement("div");

// 2. Configure attributes & classes
newCard.classList.add("card", "shadow-sm");
newCard.dataset.id = "101";

// 3. Set text/content safely
newCard.textContent = "Interactive Card Content";

// 4. Mount to parent element
const container = document.querySelector("#app");
container.appendChild(newCard); // Appends to end of child nodes list

```

### Modern Insertion Methods (`append`, `prepend`, `before`, `after`)

```javascript title="modern-insert.js"
const target = document.querySelector(".target-element");

// Flexible positioning
target.before(el1);   // Inserts before target element
target.prepend(el2);  // Inserts inside target, as first child
target.append(el3);   // Inserts inside target, as last child
target.after(el4);    // Inserts after target element

```

## High-Performance Batching with `DocumentFragment`

Updating the active DOM tree triggers browser **Reflow** (layout computation) and **Repaint** operations, which are expensive. Inserting multiple elements individually in a loop leads to layout thrashing.

Use a **`DocumentFragment`**—a lightweight, off-screen DOM container—to perform operations in memory before doing a single batch insertion:

```javascript title="document-fragment.js"
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  ul.appendChild(li); 
}

const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.appendChild(li); // Appended in-memory
}

ul.appendChild(fragment); // Single paint operation!

```

## Styles, Classes, and Dataset Attributes

```javascript title="styles-classes-dataset.js"
const element = document.querySelector("#hero");

// 1. Managing Classes
element.classList.add("active", "highlight");
element.classList.remove("hidden");
element.classList.toggle("collapsed");
const isVisible = element.classList.contains("visible");

// 2. Manipulating Inline Styles
element.style.backgroundColor = "#1e293b";
element.style.padding = "1rem";

// 3. Reading/Writing Data Attributes (data-*)
// HTML: <div id="hero" data-user-role="admin"></div>
console.log(element.dataset.userRole); // "admin"
element.dataset.status = "complete";  // Sets data-status="complete"

```

## Interactive Playground: Live DOM Mutator

Try updating the simulated DOM node properties below:

<div>
      <LiveCodeEditor 
        lessonTitle="JS Mastery Docs: DOM Manipulation"
        lessonSubtitle="Creating Elements & Tracking Computed Node Signatures"
        templates={{
  initialHtml: `<div id="button-preview"></div>`,
  initialCss: `.btn-primary {
  background-color: #2563eb;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
}
.rounded { border-radius: 0.375rem; }`,
  initialJs: `const mockElement = document.createElement("button");
mockElement.classList.add("btn-primary", "rounded");
mockElement.textContent = "Submit Order";

const previewContainer = document.getElementById("button-preview");
if (previewContainer) {
  previewContainer.appendChild(mockElement);
}

console.log("Tag Name:", mockElement.tagName);
console.log("Classes:", Array.from(mockElement.classList).join(" "));`,
}}
      />
    </div>


## Best Practices

1. **Use `textContent` over `innerHTML` for Text**: Avoid XSS (Cross-Site Scripting) vulnerabilities when setting dynamic user input by defaulting to `textContent`.
2. **Batch DOM Mutations with `DocumentFragment`**: Always construct multi-element UI branches in memory before appending to active DOM trees.
3. **Prefer `classList` over inline `style`**: Keep presentation separate from logic by toggling predefined CSS classes instead of manipulating `element.style` directly.

## Knowledge Check

### Exercise Requirements:

Write a JavaScript function `renderList(container, items)` that accepts a parent element and an array of string items. The function must clear existing container content safely and render new list items using a `DocumentFragment`.

```javascript title="solution.js"
function renderList(container, items) {
  // Clear previous content safely
  container.textContent = "";

  const ul = document.createElement("ul");
  const fragment = document.createDocumentFragment();

  items.forEach((itemText) => {
    const li = document.createElement("li");
    li.textContent = itemText;
    fragment.appendChild(li);
  });

  ul.appendChild(fragment);
  container.appendChild(ul);
}

```

:::success Next Up
Now that you have mastered DOM queries and element mutation, proceed to **Event Handling and Delegation**!
:::