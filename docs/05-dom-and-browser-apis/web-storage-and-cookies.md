---
id: web-storage-and-cookies
title: "Web Storage & Cookies"
sidebar_label: Web Storage & Cookies
sidebar_position: 4
description: "Master client-side storage mechanisms in JavaScript, including localStorage, sessionStorage, HTTP cookies, security attributes, and cross-tab synchronization."
tags: [javascript, storage, localstorage, sessionstorage, cookies, web-apis, security]
---

import { LiveCodeEditor, EditorTemplates } from "@site/src/components/LiveCodeEditor";

Modern web applications rely on client-side storage to persist user preferences, session state, offline data, and authentication tokens across browser reloads and navigation.

## Client-Side Storage Overview

JavaScript provides multiple client-side storage mechanisms tailored for different use cases, data structures, and persistence requirements:

| Feature | `localStorage` | `sessionStorage` | Cookies | `IndexedDB` |
| :--- | :--- | :--- | :--- | :--- |
| **Capacity** | ~5 MB - 10 MB | ~5 MB | ~4 KB | > 250 MB (Varies) |
| **Expiration** | Persistent (Manual clear) | Tab / Window close | Manual `Expires` / `Max-Age` | Persistent |
| **Data Format** | Strings (Key-Value) | Strings (Key-Value) | Strings | Structured Objects / Blob |
| **Server Transfer** | No | No | Sent with every HTTP request | No |
| **Scope** | Same-Origin | Same-Origin + Same Tab | Domain + Path | Same-Origin |

## Web Storage API (`localStorage` & `sessionStorage`)

Both `localStorage` and `sessionStorage` share the synchronous `Storage` interface:

```javascript
// 1. Setting and Getting Items (Strings only)
localStorage.setItem("theme", "dark");
const currentTheme = localStorage.getItem("theme"); // "dark"

// 2. Storing JavaScript Objects (Requires JSON Serialization)
const userProfile = { id: 42, name: "Alex", role: "Developer" };
localStorage.setItem("user", JSON.stringify(userProfile));

const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // "Alex"

// 3. Removing and Clearing
localStorage.removeItem("theme");
localStorage.clear(); // Clears all keys for current origin

```

:::warning Synchronous Operations
The Web Storage API runs synchronously on the main thread. Accessing `localStorage` inside high-frequency loops or storing extremely large JSON payloads can cause UI frame drops.
:::

## Browser Cookies & Security Flags

Cookies are key-value string pairs automatically included in request headers sent to the server for matching domains.

```javascript
// Reading cookies
console.log(document.cookie); // "user=Alex; theme=dark"

// Setting a simple cookie via JavaScript
document.cookie = "username=Alex; max-age=3600; path=/";

```

### Critical Security Attributes (`Set-Cookie`)

For security-sensitive cookies (like session identifiers), server headers should include flags to mitigate **XSS** and **CSRF** attacks:

```http
Set-Cookie: sessionId=abc123xyz; Secure; HttpOnly; SameSite=Strict; Path=/

```

* **`HttpOnly`**: Prevents client-side JavaScript (`document.cookie`) from accessing the cookie, mitigating XSS token theft.
* **`Secure`**: Ensures the cookie is only transmitted over encrypted HTTPS connections.
* **`SameSite`**: Controls cross-site cookie transmission to defend against Cross-Site Request Forgery (CSRF):
* `Strict`: Never sent in cross-site requests (e.g., following an external link).
* `Lax`: Sent when navigating to the origin site from an external link (Default).
* `None`: Sent with cross-site requests (Requires `Secure` flag).

## Cross-Tab State Synchronization (`StorageEvent`)

When `localStorage` is updated in one tab, other tabs under the same origin can listen to the **`storage`** event to sync state in real time:

```javascript
// Listen for changes triggered in OTHER tabs/windows
window.addEventListener("storage", (event) => {
  console.log(`Key changed: ${event.key}`);
  console.log(`Old Value: ${event.oldValue}`);
  console.log(`New Value: ${event.newValue}`);
  console.log(`Source URL: ${event.url}`);
});

```

## Best Practices

1. **Never Store Sensitive Credentials in `localStorage`**: Avoid placing JWT tokens, passwords, or personal identifying information (PII) in Web Storage due to XSS vulnerabilities. Use `HttpOnly` cookies for sensitive sessions.
2. **Always Wrap Parsing in `try/catch`**: Invalid or corrupted data stored in `localStorage` will throw errors during `JSON.parse()`.
3. **Handle Quota Exceeded Errors**: Catch `QuotaExceededError` exceptions when writing large datasets to storage.

## Knowledge Check

### Exercise Requirements:

Write a helper class `LocalStorageAdapter` with `get(key, defaultValue)` and `set(key, value)` methods that handles JSON parsing/stringification gracefully and suppresses throwing runtime errors.

```javascript title="solution.js"
class LocalStorageAdapter {
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing key "${key}" to localStorage:`, error);
      return false;
    }
  }
}

```

:::success Phase 05 Complete!
Congratulations! You have completed **Phase 05: DOM & Browser APIs**. Proceed to **Phase 06: Modern JS Tooling & ES Modules**!
:::