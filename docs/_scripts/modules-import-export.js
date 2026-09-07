// Define the MathModule object with properties and methods
const MathModule = {
  PI: 3.141592653589793,
  square: function(x) {
    return x * x;
  },
  cube: function(x) {
    return x * x * x;
  }
};

// Destructured import simulation
const { PI, square } = MathModule;
console.log("PI constant:", PI);
console.log("Square of 4:", square(4));

// Namespace import simulation (* as MathUtils)
function executeModuleMethod(moduleNamespace, methodName, arg) {
  return moduleNamespace[methodName](arg);
}

console.log("Cube of 3 via namespace:", executeModuleMethod(MathModule, "cube", 3));
