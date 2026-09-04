async function getTodo() {
  try {
    // 1. Send GET request to the mock API
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    // 2. Check if the HTTP status code is successful (200-299)
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    // 3. Parse JSON response body 
    const todo = await response.json();
    
    // 4. Output the result
    console.log("Fetched Todo:", todo);
    return todo;

  } catch (error) {
    // 5. Catch network failures or manually thrown HTTP errors
    console.error("Fetch Error:", error.message);
  }
}

// Execute the function
getTodo();
