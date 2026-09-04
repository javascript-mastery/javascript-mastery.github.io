---
id: fetch-api-and-ajax
title: "Fetch API & Asynchronous HTTP"
sidebar_label: Fetch API & AJAX
sidebar_position: 3
description: "Master asynchronous HTTP requests in JavaScript with the Fetch API, AbortController timeout handling, streaming responses, and proper error handling."
tags: [javascript, async, fetch, ajax, http, abortcontroller, web-apis]
keywords: [javascript, async, fetch, ajax, http, abortcontroller, web-apis]
---

import JSEditor from "@site/src/components/js-live-code-editor";
import CodeBlock from "@theme/CodeBlock";
import firstExample from "!!raw-loader!../_scripts/asynchronous-javascript/live-fetch.js";

Asynchronous JavaScript and XML (**AJAX**) allows web applications to communicate with backend servers asynchronously without reloading the current page. Modern JavaScript applications utilize the native promise-based **Fetch API** for networking.

## Evolution: `XMLHttpRequest` to `fetch()`

Before `fetch()`, asynchronous requests relied on `XMLHttpRequest` (XHR), which required verbose, callback-driven code:

```javascript title="legacy-xhr.js"
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data");
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.onerror = function () {
  console.error("Network Error");
};
xhr.send();
```

The modern **Fetch API** streamlines networking with standard Promises and cleaner configuration objects:

```javascript title="modern-fetch.js"
// Modern Promise-based Fetch
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch Error:", error));
```

## Configuring Requests & Headers

The `fetch()` function accepts two arguments: the target `resource` URL and an optional `options` configuration object.

```javascript title="fetch-config.js"
async function createUser(userData) {
  const response = await fetch("https://api.example.com/users", {
    method: "POST", // HTTP Method: GET, POST, PUT, DELETE, PATCH
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_JWT_TOKEN"
    },
    body: JSON.stringify(userData), // Serialize JavaScript object to JSON
    mode: "cors", // cors, no-cors, or same-origin
    cache: "no-cache"
  });

  return await response.json();
}

```

## The Fetch Error-Handling Gotcha

Unlike HTTP libraries like Axios, `fetch()` **does not reject** its Promise on HTTP error status codes (such as `404 Not Found` or `500 Internal Server Error`). A `fetch()` Promise only rejects on network failures or blocked requests.

To handle HTTP errors properly, check the `response.ok` boolean property (`status` between 200–299):

```javascript title="safe-fetch.js"
async function safeFetch(url) {
  try {
    const response = await fetch(url);

    // Check for HTTP error status codes (4xx, 5xx)
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request Failed:", error.message);
  }
}

```

## Aborting Requests & Timeouts (`AbortController`)

To cancel ongoing network requests or implement request timeouts, use the native **`AbortController`** interface:

```javascript title="abort-fetch.js"
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;

  // 1. Create an AbortController instance
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal // Connect signal to fetch
    });
    clearTimeout(id);
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out!");
    }
    throw error;
  }
}

```

## Interactive Playground: Live Fetch Explorer

Run the live `fetch()` request below using JSONPlaceholder API:

<JSEditor title="Live Fetch Playground" run={true}>
  {firstExample}
</JSEditor>      

## Best Practices

1. **Always Check `response.ok`**: Never assume a resolved `fetch()` promise indicates a successful data payload.
2. **Set Request Timeouts**: Wrap network calls with `AbortController` to prevent hanging pending requests on poor connections.
3. **Use Typed Response Parsing**: Match body parsing methods to payloads (`.json()`, `.text()`, `.blob()`, or `.arrayBuffer()`).

## Knowledge Check

### Exercise Requirements:

Write a reusable function `postJSON(url, payload)` using `async/await` that sends a `POST` request, handles non-2xx HTTP errors properly, and returns the parsed JSON response.

```javascript title="solution.js"
async function postJSON(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Failed to POST to ${url} - Status: ${response.status}`);
  }

  return await response.json();
}

```

:::success Phase 04 Complete!
Congratulations! You have completed **Phase 04: Asynchronous JavaScript**. Proceed to **Phase 05: DOM & Browser APIs** to build interactive Web applications!
:::