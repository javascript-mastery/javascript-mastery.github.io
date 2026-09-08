function debounce(fn, delay) {
  let timeoutId;
  
  return function (...args) {
    // Clear the previous timer if the function is called again before the delay finishes
    clearTimeout(timeoutId);
    
    // Set a new timer to execute the function after the specified delay
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// Create the debounced search function
const handleSearch = debounce((query) => {
  console.log("Triggering API search for:", query);
}, 300);

// Simulating fast user keystrokes
handleSearch("J");
handleSearch("Java");
handleSearch("JavaScript"); // Only this final call executes after 300ms!