---
id: design-patterns
title: "JavaScript Design Patterns"
sidebar_label: Design Patterns
sidebar_position: 1
description: "Master modern Creational, Structural, and Behavioral design patterns in JavaScript, including Singleton, Factory, Observer, Module, and Strategy patterns."
tags: [javascript, design-patterns, architecture, singleton, factory, observer, strategy, clean-code]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/observer-pattern.js";

Design patterns are reusable solutions to commonly occurring problems in software design. In JavaScript, design patterns leverage features like closures, first-class functions, classes, and ES modules to build scalable, maintainable architectures.

## Creational Patterns

Creational patterns focus on object creation mechanisms, controlling how objects are instantiated to increase code flexibility and reuse.

### 1. Singleton Pattern

Ensures a class has only one instance and provides a global point of access to it.

```javascript
class DatabaseConnection {
  static #instance = null;

  constructor(connectionString) {
    if (DatabaseConnection.#instance) {
      return DatabaseConnection.#instance;
    }
    this.connectionString = connectionString;
    this.isConnected = true;
    DatabaseConnection.#instance = this;
  }

  static getInstance(connectionString) {
    if (!DatabaseConnection.#instance) {
      DatabaseConnection.#instance = new DatabaseConnection(connectionString);
    }
    return DatabaseConnection.#instance;
  }
}

const db1 = new DatabaseConnection("mongodb://localhost:27017");
const db2 = new DatabaseConnection("postgres://localhost:5432");

console.log(db1 === db2); // true (Both refer to the single instance)

```

:::tip ES Modules as Singletons
In modern JavaScript, ES modules are naturally singletons because they are evaluated once and cached across imports.
:::

### 2. Factory Pattern

Provides an interface for creating objects without explicitly specifying their exact classes, delegating instantiation logic to subclasses or factory functions.

```javascript
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

class UserFactory {
  static createUser(type, name) {
    switch (type.toLowerCase()) {
      case "admin":
        return new User(name, "Admin (Full Access)");
      case "editor":
        return new User(name, "Editor (Content Access)");
      default:
        return new User(name, "Viewer (Read-Only)");
    }
  }
}

const admin = UserFactory.createUser("admin", "Alex");
const viewer = UserFactory.createUser("viewer", "Jordan");

```

## Structural Patterns

Structural patterns deal with object composition, identifying simple ways to realize relationships between entities.

### 1. Observer Pattern (Pub/Sub)

Defines a one-to-many dependency where changing one object automatically updates and notifies dependent observers.

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener); // Unsubscribe handler
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(
      (listener) => listener !== listenerToRemove
    );
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(data));
  }
}

// Usage
const store = new EventEmitter();
const unsubscribe = store.on("cart:add", (item) => {
  console.log(`Item added to cart: ${item.name}`);
});

store.emit("cart:add", { id: 1, name: "Mechanical Keyboard" });
unsubscribe(); // Clean up listener

```

### 2. Module Pattern

Encapsulates private state and exposes a clean public API using closures or IIFEs (and natively via ES module scoping).

```javascript
const CartModule = (() => {
  // Private variables and functions
  const items = [];

  function calculateTotal() {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  // Public interface
  return {
    addItem(item) {
      items.push(item);
    },
    getTotal() {
      return calculateTotal();
    },
    getItemCount() {
      return items.length;
    }
  };
})();

CartModule.addItem({ name: "Monitor", price: 300 });
console.log(CartModule.getTotal()); // 300
// items array remains inaccessible from outside

```

## Behavioral Patterns

Behavioral patterns manage algorithms, responsibilities, and communication between objects.

### 1. Strategy Pattern

Encapsulates interchangeable algorithms inside objects so they can be swapped dynamically at runtime without altering client logic.

```javascript
// Strategies
const PaymentStrategies = {
  creditCard: (amount) => `Paid $${amount} via Credit Card (2% fee)`,
  paypal: (amount) => `Paid $${amount} via PayPal (1% fee)`,
  crypto: (amount) => `Paid $${amount} via Crypto (0% fee)`
};

// Context
class Checkout {
  constructor(strategy = PaymentStrategies.creditCard) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  processOrder(amount) {
    return this.strategy(amount);
  }
}

const checkout = new Checkout(PaymentStrategies.paypal);
console.log(checkout.processOrder(100)); // Paid $100 via PayPal (1% fee)

checkout.setStrategy(PaymentStrategies.crypto);
console.log(checkout.processOrder(100)); // Paid $100 via Crypto (0% fee)

```

## Interactive Playground: Observer Pattern

Observe event driven subscription management in interactive code execution:

<JSEditor title="observer-pattern.js" run={true}>
  {firstExample}
</JSEditor>

## Best Practices

1. **Avoid Over-Engineering**: Do not implement design patterns preemptively. Apply them when code complexity or duplication warrants structural refactoring.
2. **Favor Composition Over Inheritance**: Patterns like Strategy and Decorator favor flexible composition instead of deep class inheritance hierarchies.
3. **Use Native ES Constructs**: Modern features like ES Modules, Private Fields (`#`), and `Proxy` objects fulfill many pattern goals out-of-the-box.

## Knowledge Check

### Exercise Requirements:

Implement a `CommandPattern` interface with an `Invoker`, an `Execute` method, and an `Undo` method for managing text editor actions (such as adding and removing text).

```javascript title="solution.js"
class TextEditor {
  constructor() {
    this.content = "";
  }

  append(text) {
    this.content += text;
  }

  delete(length) {
    this.content = this.content.slice(0, -length);
  }
}

class AppendCommand {
  constructor(editor, textToAppend) {
    this.editor = editor;
    this.text = textToAppend;
  }

  execute() {
    this.editor.append(this.text);
  }

  undo() {
    this.editor.delete(this.text.length);
  }
}

class CommandHistory {
  constructor() {
    this.history = [];
  }

  execute(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

// Usage
const editor = new TextEditor();
const history = new CommandHistory();

history.execute(new AppendCommand(editor, "Hello "));
history.execute(new AppendCommand(editor, "World!"));
console.log(editor.content); // "Hello World!"

history.undo();
console.log(editor.content); // "Hello "

```

:::success Next Up
Now that you have mastered JavaScript Design Patterns, proceed to **Clean Code & Refactoring**!
:::