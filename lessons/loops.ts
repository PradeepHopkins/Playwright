// =====================================================
// TYPESCRIPT LOOPS - COMPLETE STUDY GUIDE
// =====================================================
// Loops allow you to execute code repeatedly over collections or conditions.
// TypeScript supports multiple loop types, each suited for different use cases.
// Topics: for, for...of, for...in, forEach, while, do...while, array methods, and best practices.

// ----------------------------
// 1. FOR LOOP - Traditional Counting Loop
// ----------------------------
// Definition: Execute code a specific number of times using counter variable.
// Syntax: for (initialization; condition; increment) { }
// Features: Can use break and continue statements; controlled iteration count.
// Best for: When you know the exact number of iterations needed.

console.log("\n--- 1. FOR LOOP ---")
{
    // Basic for loop
    for (let i: number = 0; i < 5; i++) {
        console.log(`  Loop iteration ${i}`)
    }
    
    // For loop with break
    console.log("\nFor loop with break:")
    for (let j: number = 0; j < 10; j++) {
        if (j === 5) {
            console.log("  Breaking at j = 5")
            break
        }
        console.log(`  j = ${j}`)
    }
    
    // For loop with continue
    console.log("\nFor loop with continue (skip even numbers):")
    for (let k: number = 1; k <= 5; k++) {
        if (k % 2 === 0) {
            continue  // Skip even numbers
        }
        console.log(`  Odd number: ${k}`)
    }
}

// ----------------------------
// 2. FOR...OF LOOP - Iterate Over Values
// ----------------------------
// Definition: Iterate over values of an iterable (array, string, etc.).
// Syntax: for (const element of iterable) { }
// Features: Can use break and continue; get values, not indexes; clean syntax.
// Best for: Arrays, strings, and when you don't need indexes.

console.log("\n--- 2. FOR...OF LOOP ---")
{
    // Iterate over array values
    const fruits: string[] = ["Apple", "Orange", "Mango", "Grapes"]
    console.log("Fruits:")
    for (const fruit of fruits) {
        console.log(`  - ${fruit}`)
    }
    
    // Iterate over string characters
    console.log("\nCharacters in 'TypeScript':")
    const word: string = "TypeScript"
    for (const char of word) {
        console.log(`  ${char}`)
    }
    
    // For...of with break
    console.log("\nFor...of with break (stop at Tomato):")
    const vegetables: string[] = ["Onion", "Potato", "Tomato", "Carrot"]
    for (const veg of vegetables) {
        console.log(`  - ${veg}`)
        if (veg === "Tomato") {
            console.log("  (stopped here)")
            break
        }
    }
}

// ----------------------------
// 3. FOR...IN LOOP - Iterate Over Object Properties
// ----------------------------
// Definition: Iterate over enumerable properties (keys) of an object or array.
// Syntax: for (const key in object) { }
// Features: Returns property names or array indexes, not values.
// Best for: Iterating over object properties; less common than for...of.

console.log("\n--- 3. FOR...IN LOOP ---")
{
    // Object property iteration
    const personObj: { name: string; age: number; city: string } = { 
        name: "Alice", 
        age: 25, 
        city: "London" 
    }

    console.log("Person object (for...in):")
    for (const key in personObj) {
        console.log(`  ${key}: ${personObj[key as keyof typeof personObj]}`)
    }

    // For...in with array (gets indexes)
    console.log("\nArray indexes (for...in):")
    const colors: string[] = ["Red", "Green", "Blue"]
    for (const index in colors) {
        console.log(`  Index ${index}: ${colors[parseInt(index)]}`)
    }
}

// ----------------------------
// 4. FOREACH() METHOD - Functional Array Iteration
// ----------------------------
// Definition: Array method that applies a function to each element.
// Syntax: array.forEach((element, index, array) => { })
// Features: Cannot use break/continue; functional programming style; clean syntax.
// Best for: Simple, functional operations on arrays without needing early exit.

console.log("\n--- 4. FOREACH() METHOD ---")
{
    const numbers: number[] = [10, 20, 30, 40]
    console.log("Numbers with forEach:")
    numbers.forEach((num) => {
        console.log(`  Value: ${num}`)
    })

    // forEach with index
    console.log("\nWith index:")
    numbers.forEach((num, index) => {
        console.log(`  Index ${index}: ${num}`)
    })

    // forEach with array reference
    console.log("\nWith array reference:")
    numbers.forEach((num, idx, arr) => {
        console.log(`  Item ${idx}/${arr.length}: ${num}`)
    })
}

// ----------------------------
// 5. WHILE LOOP - Repeat While Condition is True
// ----------------------------
// Definition: Repeat code block while a condition remains true.
// Syntax: while (condition) { }
// Features: Can use break and continue; useful for unknown iteration count.
// Best for: When you don't know the number of iterations beforehand.

console.log("\n--- 5. WHILE LOOP ---")
{
    // Basic while loop
    let counter: number = 0
    console.log("While loop (counting 0-3):")
    while (counter < 4) {
        console.log(`  Counter: ${counter}`)
        counter++
    }
    
    // While loop with break
    console.log("\nWhile loop with break:")
    let idx: number = 0
    while (idx < 10) {
        if (idx === 5) {
            console.log(`  Breaking at ${idx}`)
            break
        }
        console.log(`  idx = ${idx}`)
        idx++
    }

    // While with continue
    console.log("\nWhile with continue (skip 2):")
    let num: number = 0
    while (num < 5) {
        if (num === 2) {
            num++
            continue
        }
        console.log(`  num = ${num}`)
        num++
    }
}

// ----------------------------
// 6. DO...WHILE LOOP - Execute At Least Once
// ----------------------------
// Definition: Similar to while, but executes the block at least once before checking condition.
// Syntax: do { } while (condition)
// Features: Can use break and continue; runs at least once regardless of condition.
// Best for: When you need to execute code at least one time (e.g., menus, validation).

console.log("\n--- 6. DO...WHILE LOOP ---")
{
    // Basic do...while
    let cnt: number = 0
    console.log("Do...while loop:")
    do {
        console.log(`  Count: ${cnt}`)
        cnt++
    } while (cnt < 3)
    
    // Do...while with false condition (still runs once!)
    console.log("\nDo...while (runs even though condition is false):")
    let x: number = 10
    do {
        console.log(`  x = ${x} (block executes despite x > 5)`)
        x++
    } while (x < 5)  // This is false, but block ran once

    // Practical: Menu system
    console.log("\nPractical example - simple menu:")
    let choice: number = 0
    do {
        choice = 1  // Simulating user input
        console.log(`  Menu choice: ${choice}`)
    } while (choice !== 1)
}

// ----------------------------
// 7. ARRAY METHODS - map, filter, reduce (Functional Loops)
// ----------------------------
// Definition: Non-mutating functional methods for array transformation and iteration.
// Methods: map (transform), filter (select), reduce (aggregate), find, some, every
// Features: Return new arrays/values; chainable; declarative style; preferred for modern code.
// Best for: Data transformation; filtering; aggregation; functional programming.

console.log("\n--- 7. ARRAY METHODS - FUNCTIONAL ITERATION ---")
{
    const numbers: number[] = [1, 2, 3, 4, 5]
    
    // Map: Transform each element
    const doubled = numbers.map(n => n * 2)
    console.log("Doubled numbers:", doubled)
    
    // Filter: Select matching elements
    const evens = numbers.filter(n => n % 2 === 0)
    console.log("Even numbers:", evens)
    
    // Reduce: Aggregate to single value
    const sum = numbers.reduce((acc, n) => acc + n, 0)
    console.log("Sum:", sum)
    
    // Find: Get first match
    const found = numbers.find(n => n > 3)
    console.log("First number > 3:", found)
    
    // Some: Check if any match
    const hasEven = numbers.some(n => n % 2 === 0)
    console.log("Has even numbers:", hasEven)
    
    // Every: Check if all match
    const allPositive = numbers.every(n => n > 0)
    console.log("All positive:", allPositive)
}

// ----------------------------
// 8. PRACTICAL EXAMPLES - Real-World Loop Applications
// ----------------------------

console.log("\n--- 8. PRACTICAL EXAMPLES ---")
{
    // Example 1: Process array of students
    interface Student {
        id: number
        name: string
        score: number
    }
    
    const students: Student[] = [
        { id: 1, name: "Alice", score: 85 },
        { id: 2, name: "Bob", score: 92 },
        { id: 3, name: "Charlie", score: 78 }
    ]
    
    console.log("Student Results:")
    let totalScore: number = 0
    for (const student of students) {
        const grade = student.score >= 80 ? "A" : student.score >= 70 ? "B" : "C"
        console.log(`  ${student.name}: ${student.score} (Grade: ${grade})`)
        totalScore += student.score
    }
    console.log(`  Average: ${(totalScore / students.length).toFixed(2)}`)
    
    // Example 2: Find first matching element
    console.log("\nFind student with score > 90:")
    const topStudent = students.find((s) => s.score > 90)
    if (topStudent) {
        console.log(`  Found: ${topStudent.name} with score ${topStudent.score}`)
    }

    // Example 3: Transform with map
    console.log("\nStudent names (map):")
    const names = students.map((s) => s.name)
    names.forEach((name) => console.log(`  - ${name}`))

    // Example 4: Filter students
    console.log("\nPassing students (score >= 80):")
    const passing = students.filter((s) => s.score >= 80)
    passing.forEach((s) => console.log(`  - ${s.name}`))
}

// ----------------------------
// 9. LOOP COMPARISON TABLE & BEST USE CASES
// ----------------------------
/*
┌──────────────┬────────────────────┬─────────────────┬──────────────────┐
│ Loop Type    │ Best For           │ Break/Continue? │ When to Use      │
├──────────────┼────────────────────┼─────────────────┼──────────────────┤
│ for          │ Known iterations   │ Yes             │ Exact count      │
│ for...of     │ Array values       │ Yes             │ Values (no index)│
│ for...in     │ Object keys/props  │ Yes             │ Object props     │
│ forEach()    │ Simple operations  │ No              │ Functional style │
│ while        │ Unknown duration   │ Yes             │ Condition-based  │
│ do...while   │ At least 1 run     │ Yes             │ Menu loops       │
│ map()        │ Transform arrays   │ No              │ Map to new array │
│ filter()     │ Select elements    │ No              │ Get subset       │
│ reduce()     │ Aggregate values   │ No              │ Sum/combine      │
└──────────────┴────────────────────┴─────────────────┴──────────────────┘
*/

/*
BEST PRACTICES
✅ DO:
- Use for...of for iterating over array values (modern, clean)
- Use for...in for iterating over object properties
- Use forEach() for simple, functional operations
- Use array methods (map, filter, reduce) for transformations
- Add type annotations to loop variables (let i: number = 0)
- Use descriptive variable names in loops
- Use break/continue to control loop flow
- Use const for loop variables when possible (for...of)
- Choose the right loop for the specific task
- Extract complex loop logic into separate functions

❌ DON'T:
- Use for...in for arrays (use for...of instead)
- Modify array while iterating with forEach/map/filter
- Nest loops too deeply (hard to read; refactor into functions)
- Use var keyword (use const/let)
- Forget to increment counter in while loops (causes infinite loops)
- Create infinite loops unintentionally
- Use traditional for loop when for...of is clearer
- Forget type assertions in for...in loops
- Chain too many array methods without clarity
- Overuse array methods when simple loops are clearer
*/
