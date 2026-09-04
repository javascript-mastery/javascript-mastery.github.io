const mockApiCall = (shouldSucceed) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ data: "Fetched Data Successfully!" });
      } else {
        reject(new Error("API Call Failed!"));
      }
    }, 1000);
  });
};
async function runDataPipeline() {
  console.log("Fetching data...");
  try {
    const response = await mockApiCall(true);
    console.log("Success:", response.data);
  } catch (err) {
    console.error("Caught error:", err.message);
  }
}

runDataPipeline();
