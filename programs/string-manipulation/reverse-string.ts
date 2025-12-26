// Reverse a string (iterative and recursive)

let string = 'ABCDEF'

let result = '';

for(let i = string.length -1; i >= 0; i--){
    result += string[i];
}
console.log(result)

// The loop walks backwards through the string

// Each character is added to result

// This reverses the string iteratively