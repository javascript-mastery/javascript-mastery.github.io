function firstTask() {
    console.log("1. Inside firstTask()");
    secondTask();
}

function secondTask() {
  console.log("2. Inside secondTask()");
  thirdTask();
  console.log("3. Exiting secondTask()");
}

function thirdTask() {
  console.log("   -> Inside thirdTask() [Top of Stack]");
}

console.log("--- Starting Execution ---");
firstTask();
console.log("--- Execution Completed ---");
