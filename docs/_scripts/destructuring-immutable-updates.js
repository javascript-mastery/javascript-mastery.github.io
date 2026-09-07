// Define the initial state of the shopping cart
const initialCart = {
  customer: "Alex Jones",
  discount: 0.05,
  items: [
    { name: "Laptop", price: 1200 },
    { name: "Mouse", price: 25 }
  ]
};

// Immutably add an item and update discount using Spread syntax
const updatedCart = { 
  ...initialCart, 
  discount: 0.15, 
  items: [ 
    ...initialCart.items, 
    { name: "Headphones", price: 150 } 
  ] 
};

// Destructure the updated values for logging
const { items, discount } = updatedCart;

// Output the results to the console
console.log("Updated Cart Items Count:", items.length);
console.log("New Discount:", discount);

// Verify that the original cart remained unchanged (immutability check)
console.log("\n--- Immutability Check ---\n");
console.log("Original Cart Items Count:", initialCart.items.length);
console.log("Original Discount:", initialCart.discount);