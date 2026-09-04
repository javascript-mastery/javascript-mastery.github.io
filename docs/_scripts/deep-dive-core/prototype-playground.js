// 1. Create a prototype object
const vehiclePrototype = {
    startEngine() {
        return `${this.type} engine started!`;
    }
};

// 2. Link Object via Object.create()
const myCar = Object.create(vehiclePrototype);
myCar.type = "Sports Sedan"; // Property Shadowing

// 3. Inspect Linkage
console.log(myCar.startEngine());
console.log("Has Own Property 'type':", myCar.hasOwnProperty("type"));
console.log("Has Own Property 'startEngine':", myCar.hasOwnProperty("startEngine"));

// 4. Verify Prototype Chain
console.log("Is prototype linked:", Object.getPrototypeOf(myCar) === vehiclePrototype);