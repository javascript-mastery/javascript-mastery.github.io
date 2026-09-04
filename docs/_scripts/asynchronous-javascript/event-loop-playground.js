console.log("1. Synchronous Start");

setTimeout(() => {
  console.log("4. Macrotask: setTimeout");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3. Microtask: Promise 1");
  })
  .then(() => {
    console.log("3. Microtask: Promise 2");
  });

console.log("2. Synchronous End");
