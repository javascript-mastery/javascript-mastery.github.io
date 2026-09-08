// ==========================================
// 1. OBJECT UPDATE CHECK
// ==========================================
const profile = {
    username: "anonymous_coder"
};

profile.username = "JavaScript_Guru";
console.log("Updated profile:", profile.username);


// ==========================================
// 2. BLOCK SCOPING CHECK
// ==========================================
if (true) {
    var leakedVar = "I am leaked!";
    let scopedLet = "I am safe!";
}

// 'var' leaks because it is function/globally scoped, not block scoped
console.log("var access:", leakedVar); 

// 'let' safely throws an error because it belongs only to the 'if' block
try {
    console.log("let access:", scopedLet);
} catch (err) {
    console.log("Caught expected error:", err.message);
}


// ==========================================
// 3. TEMPORAL DEAD ZONE (TDZ) CHECK
// ==========================================
try {
    // Accessing 'tdzVariable' before its declaration triggers the TDZ
    console.log("Accessing let before declaration:", tdzVariable);
    let tdzVariable = "I am successfully initialized!";
} catch (err) {
    console.log("Caught expected TDZ error:", err.message);
}