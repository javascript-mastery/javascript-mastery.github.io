// 1. Implicit Binding
const company = {
  name: "CodeHarborHub",
  getBrand() {
    return `Company: ${this.name}`;
  }
};
console.log("Implicit Call:", company.getBrand());

// 2. Explicit Override
const externalCompany = { brand: "CodeHarborHub" };
console.log("Explicit Override:", company.getBrand.call(externalCompany));

// 3. Hard Binding
const fixedBrand = company.getBrand.bind(externalCompany);
console.log("Bound Output:", fixedBrand());