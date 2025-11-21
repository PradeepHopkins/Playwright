// ✅ 1. Using a Temporary Variable (Classic Method)
let a = 10;
let b = 20;
let swap = a;
b = a;
a = swap;
console.log(a, b);

// Explanation: This is the simplest and most readable approach — use a temporary variable to hold one value during the swap.

// ✅ 2. Using Array Destructuring (Modern & Clean)
let num1 = 25;
let num2 = 30;

[num1, num2] = [num2 , num1];
console.log(num1 , num2)
// Explanation: This uses ES6 destructuring assignment, which is concise and elegant. 
// It’s the most common method in modern TypeScript/JavaScript.

// ✅ 3. Using Arithmetic (Without Extra Variable)

let price1 = 50;
let price2 = 30;

price1 = price1 + price2; // 50 + 30 = 80
price2 = price1 - price2; // 80 - 30 = 50
price1 = price1 - price2; // 80 - 50 = 30

console.log(price1, price2);

// Explanation: This works without a temporary variable but can cause overflow or precision issues with very large numbers — 
// so use it mainly for demonstrating logic.
