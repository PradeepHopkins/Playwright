// find the first repeating character in the string
const input = "Aplee";
const seen: Record<string, boolean> = {};
let repeatingChar: string | null = null;

for (let char of input) {
  if (seen[char]) {
    repeatingChar = char;
    break; // stop after first repeating character
  }
  seen[char] = true;
}

console.log(repeatingChar);

// find the repeating character in the string
const reapats = "APple";
const frequencys: Record<string, number> = {};

for (let char of reapats.toLocaleLowerCase()) {
  if (frequencys[char]) {
    frequencys[char]++;
  } else {
    frequencys[char] = 1;
  }
}

console.log(frequencys);

// only Repeating Characters from Frequency Map
const repeat = "Apple";
const frequency: Record<string, number> = {};
const repeatingOnly: Record<string, number> = {};

// Build frequency map
for (let char of repeat) {
  frequency[char] = (frequency[char] || 0) + 1;
}

// Extract only repeating characters
for (let char in frequency) {
  if (frequency[char] > 1) {
    repeatingOnly[char] = frequency[char];
  }
}

console.log(repeatingOnly);
