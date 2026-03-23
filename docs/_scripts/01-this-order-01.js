function Person(name) {
  this.Name = name;
}

const p1 = {};
const PersonAnother = Person.bind(p1);
PersonAnother("dan-dan");

console.log(p1.Name);

const p2 = new PersonAnother("Ajay");
console.log(p1.Name);
console.log(p2.Name);