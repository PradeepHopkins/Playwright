// Optimized Version (Easy to Understand)
const limit = 50;

for (let num = 2; num <= limit; num++) {
  let isPrime = true;

  // Only check up to half of the number
  for (let i = 2; i <= num / 2; i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }

  if (isPrime) console.log(num);
}

// A number cannot be divided by anything greater than half of itself

// Cuts the checks almost in half

// Easier to understand than Math.sqrt()

