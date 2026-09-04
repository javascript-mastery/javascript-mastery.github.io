// 1. Implicit String Coercion
console.log("Result 1:", "5" + 3);

// 2. Implicit Numeric Coercion
console.log("Result 2:", "10" - 5);

// 3. Falsy vs Truthy Evaluations
console.log("Empty Array Truthy Test:", Boolean([]));
console.log("Empty Object Truthy Test:", Boolean({}));

// 4. Loose Equality Quirks
console.log("0 == false:", 0 == false);
console.log("'' == false:", '' == false);
console.log("0 === false:", 0 === false);