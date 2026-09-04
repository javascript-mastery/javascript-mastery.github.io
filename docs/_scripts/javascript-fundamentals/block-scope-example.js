if (true) {
  var functionScopedVar = "I leak outside!";
  let blockScopedLet = "I am trapped inside!";
}

console.log(functionScopedVar); // "I leak outside!"
console.log(blockScopedLet);   // ReferenceError: blockScopedLet is not defined
