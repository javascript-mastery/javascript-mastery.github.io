const createBankAccount = (initialBalance = 0) => {
  let balance = initialBalance; // Private variable retained by closure
  return {
    deposit(amount) {
      if (amount <= 0) return "Invalid amount";
      balance += amount;
      return `Deposited: $${amount} | New Balance: $${balance}`;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds!";
      balance -= amount;
      return `Withdrew: $${amount} | New Balance: $${balance}`;
    },
    getBalance() {
      return `Current Balance: $${balance}`;
    },
  };
};

const myAccount = createBankAccount(500);
console.log(myAccount.deposit(200));
console.log(myAccount.withdraw(150));
console.log(myAccount.getBalance());
console.log("Direct Balance Access:", myAccount.balance); // undefined!
