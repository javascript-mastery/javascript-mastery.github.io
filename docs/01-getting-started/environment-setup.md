---
id: environment-setup
title: "Setting Up Your JavaScript Environment"
sidebar_label: Environment Setup
sidebar_position: 2
description: "Configure Node.js, package managers, browser dev tools, and VS Code for modern JavaScript development."
tags: [setup, nodejs, vscode, devtools, workflow]
keywords: [setup, nodejs, vscode, devtools, workflow]
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

To write, debug, and optimize modern JavaScript efficiently, you need a robust local setup. This guide covers configuring **Node.js**, **browser Developer Tools**, and **Visual Studio Code**.

## The Essential Toolchain

A modern JavaScript workflow relies on three core pillars:

| Tool | Purpose | Primary Use Case |
| :--- | :--- | :--- |
| **Node.js & npm** | JavaScript Runtime & Package Manager | Executing JS outside browsers, managing dependencies |
| **Browser DevTools** | Inspection & Debugging | DOM inspection, performance profiling, network logs |
| **VS Code** | Code Editor & IDE | Autocompletion, linting, formatting, integrated terminal |

## 1. Installing Node.js & Package Managers

**Node.js** allows you to execute JavaScript on your local machine outside of a web browser.

:::tip LTS vs. Current
Always download the **LTS (Long Term Support)** version for maximum stability and ecosystem compatibility.
:::

### Step 1: Verify or Install Node.js

Check if Node.js is already installed on your system by running these commands in your terminal:

```bash title="Terminal"
node -v
npm -v
```

If not installed, choose your operating system setup below:

<Tabs>

<TabItem value="macos" label="macOS">

```bash
brew install node
```

</TabItem>

<TabItem value="windows" label="Windows">

```powershell
winget install OpenJS.NodeJS.LTS
```

</TabItem>

<TabItem value="linux" label="Linux">

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

</TabItem>
</Tabs>

## 2. Configuring Visual Studio Code

**Visual Studio Code (VS Code)** is the industry-standard IDE for web development.

### Recommended Extensions

Install these essential extensions to automate formatting and detect syntax bugs instantly:

* **Prettier - Code formatter** (`esbenp.prettier-vscode`): Enforces consistent code formatting.
* **ESLint** (`dbaeumer.vscode-eslint`): Identifies logic errors and bad patterns.
* **Live Server** (`ritwickdey.liveserver`): Launches a local development server with live reload.
* **JavaScript (ES6) code snippets** (`xabikos.javascriptsnippets`): Provides modern syntax shortcuts.

### Recommended VS Code Workspace Settings

Create or update `.vscode/settings.json` in your project root to auto-format files on save:

```json title=".vscode/settings.json"
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "javascript.suggest.completeFunctionCalls": true,
  "files.autoSave": "afterDelay"
}

```

## 3. Mastering Browser Developer Tools

Every modern browser comes with built-in Developer Tools (DevTools). Access them using:

* **Windows/Linux**: `F12` or `Ctrl + Shift + I`
* **macOS**: `Cmd + Option + I`

### Core DevTools Tabs Explained

```text
DevTools Engine
├── Console     -> Live REPL for logging and instant JS execution
├── Elements    -> Live DOM modification and CSS inspection
├── Sources     -> Breakpoint debugging and callstack inspection
├── Network     -> Monitoring HTTP requests, APIs, and load times
└── Application -> Managing LocalStorage, SessionStorage, and Cookies

```

## Knowledge Check: Your First Local JS Script

Let's test your local setup by creating and running a script using Node.js.

### Step 1: Create a workspace directory

```bash title="Terminal"
mkdir js-practice
cd js-practice
```

### Step 2: Create a test script (`app.js`)

```javascript title="app.js"
const systemInfo = {
  environment: "Node.js",
  status: "Active",
  timestamp: new Date().toISOString(),
};

console.log("System Check Successful:");
console.table(systemInfo);

```

### Step 3: Run the script

```bash title="Terminal"
node app.js
```

```text
        System Check Successful:
┌─────────────┬──────────────────────────┐
│   (index)   │          Values          │
├─────────────┼──────────────────────────┤
│ environment │        'Node.js'         │
│   status    │         'Active'         │
│  timestamp  │'2026-09-04T03:02:54.920Z'│
└─────────────┴──────────────────────────┘

```

:::success Environment Ready!
Your local environment is fully configured. Proceed to **Phase 02: JavaScript Fundamentals** to master variables, types, and scope!
:::