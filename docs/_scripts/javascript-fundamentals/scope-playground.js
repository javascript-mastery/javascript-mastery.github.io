const maxLimit = 500;
// maxLimit = 600; // Un-comment to see TypeError!

// 2. Block Scope Test
function runScopeTest() {
if (true) {
var varMessage = "Accessible outside block";
let letMessage = "Hidden inside block";
}
console.log(varMessage);
// console.log(letMessage); // Un-comment to see ReferenceError
}

runScopeTest();
console.log(`Points: ${points}, Max: ${maxLimit}`);