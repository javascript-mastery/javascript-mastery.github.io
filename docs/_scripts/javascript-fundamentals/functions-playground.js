// 1. Implicit Return
const square = (n) => n * n;

// 2. Rest Parameters
const calculateAverage = (...scores) => {
const sum = scores.reduce((acc, score) => acc + score, 0);
return (sum / scores.length).toFixed(1);
};
console.log("Average Score:", calculateAverage(85, 90, 78, 92));

// 3. Arrow Function Object Return
const makePoint = (x, y) => ({ x, y, timestamp: Date.now() });
console.log("Point Object:", makePoint(10, 25));