// 1. Nullish Coalescing
const userSettings = {
  theme: null,
  notifications: undefined,
};

// 2. Deep Optional Chaining
const apiData = {
status: 200,
data: {
users: [{ id: 101, details: { email: "alex@example.com" } }]
}
};

const secondUserEmail = apiData?.data?.users?.[1]?.details?.email ?? "Email Not Found";
console.log("Safe Fetch Output:", secondUserEmail);

// 3. Short-circuit execution
const isLogged = true;
isLogged && console.log("User session verified!");