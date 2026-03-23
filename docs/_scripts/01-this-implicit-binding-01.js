function sayNameFunc() {
  console.log(`Hello, my name is ${this.name}`);
}

const person = {
  name: "Ajay",
  sayName: sayNameFunc,
};

person.sayName(); // Hello, my name is Ajay