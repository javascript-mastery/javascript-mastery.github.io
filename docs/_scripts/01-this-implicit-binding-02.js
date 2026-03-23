function sayNameFunc() {
  console.log(`Hello, my name is ${this.name}`);
}

const person = {
  name: "Ajay",
  sayName: sayNameFunc,
};

const home = {
  name: "QuanZhou",
  owner: person,
};

person.sayName(); // Hello, my name is Ajay
home.owner.sayName(); // Hello, my name is Ajay