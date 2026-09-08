// 1. Create a function that establishes a private closure
function createToggle() {
  // This variable is private and persists in memory
  let state = false; 

  // Return the inner function that remembers the 'state' variable
  return function toggle() {
    state = !state;
    return state ? "ON 🟢" : "OFF 🔴";
  };
}

// 2. Initialize the toggle instance
const buttonToggle = createToggle();

// 3. Run the experiment and log the retained state live
console.log("First click:", buttonToggle());  // Output: ON 🟢
console.log("Second click:", buttonToggle()); // Output: OFF 🔴
console.log("Third click:", buttonToggle());  // Output: ON 🟢
