// Define the generator function for the Fibonacci sequence
function* fibonacciSequence(limit) {
    let prev = 0;
    let curr = 1;
    let count = 0;

    while (count < limit) {
        yield prev;
        // Use destructuring assignment to calculate the next numbers
        [prev, curr] = [curr, prev + curr];
        count++;
    }
}

// Create the generator instance with a limit of 7 items
const fibGen = fibonacciSequence(7);
const results = [];

// Iterate through the generator
for (const value of fibGen) {
    results.push(value);
}

// Print the final array as a comma-separated string
console.log("Fibonacci Sequence (7 items):", results.join(", "));
