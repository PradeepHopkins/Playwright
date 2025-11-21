function printPrimes(limit: number): void {
  for (let num = 2; num <= limit; num++) {
    if (isPrime(num)) {
      console.log(num);
    }
  }
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Print primes up to 50
printPrimes(50);

function printPrime(limit: number): void {
  for (let num = 2; num <= limit; num++) {
    let isPrime = true;

    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) console.log(num);
  }
}

printPrime(50);


