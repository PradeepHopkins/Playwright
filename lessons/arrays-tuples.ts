// =====================================================
// TYPESCRIPT ARRAYS & TUPLES - COMPLETE STUDY GUIDE
// =====================================================
// Arrays store multiple values of the same type; Tuples store fixed-length collections with specific types.
// TypeScript enforces type safety for array elements and tuple positions at compile-time.
// Topics: array declaration, mutations, searches, transformations, tuples, and best practices.

// ----------------------------
// 1. ARRAY DECLARATION & BASIC OPERATIONS
// ----------------------------
// Definition: Collections of values of the same type stored in a single variable.
// Syntax: const array: type[] = [val1, val2, val3] or const array: Array<type>
// Features: Indexed access starting at 0; length property; type-safe elements.
// Best for: Storing lists of related items; batch processing; iterations.

console.log("\n--- 1. ARRAY DECLARATION & BASICS ---")
{
    // Type-safe array declarations
    const numbers: number[] = [10, 20, 30, 40, 50]
    const names: string[] = ["Alice", "Bob", "Charlie"]
    const active: boolean[] = [true, false, true]
    
    // Alternative generic syntax
    const prices: Array<number> = [99.99, 199.99, 299.99]
    
    // Empty array with type
    const items: string[] = []
    
    // Accessing elements by index
    console.log("First number:", numbers[0])
    console.log("Last name:", names[names.length - 1])
    console.log("Array length:", numbers.length)
    
    // Modifying elements
    numbers[1] = 25
    names[0] = "Alexandra"
    console.log("Modified numbers:", numbers)
    console.log("Modified names:", names)
}

// ----------------------------
// 2. ARRAY MUTATION METHODS - Adding & Removing Elements
// ----------------------------
// Definition: Methods that modify array contents in-place.
// Methods: push, pop, shift, unshift, splice
// Features: Modify original array; change array length; return affected elements.
// Best for: Adding/removing elements; managing array size.

console.log("\n--- 2. ARRAY MUTATION METHODS ---")
{
    // Adding to end: push
    const cars: string[] = ["Volvo", "BMW", "Tesla"]
    cars.push("Mercedes")
    console.log("After push:", cars)
    
    // Adding to beginning: unshift
    cars.unshift("Audi")
    console.log("After unshift:", cars)
    
    // Removing from end: pop
    const removed = cars.pop()
    console.log(`Popped: ${removed}, Array:`, cars)
    
    // Removing from beginning: shift
    const first = cars.shift()
    console.log(`Shifted: ${first}, Array:`, cars)
    
    // Splice: Remove/replace at any position
    const numbers: number[] = [10, 20, 30, 40, 50]
    const spliced = numbers.splice(2, 1, 35)  // Remove 1 at index 2, insert 35
    console.log("Spliced element:", spliced)
    console.log("After splice:", numbers)
}

// ----------------------------
// 3. ARRAY SEARCH METHODS - Finding Elements
// ----------------------------
// Definition: Methods for locating elements in an array.
// Methods: indexOf, includes, find, findIndex, filter
// Features: Non-destructive; return indices, booleans, or elements.
// Best for: Searching; validating presence; conditional operations.

console.log("\n--- 3. ARRAY SEARCH METHODS ---")
{
    const fruits: string[] = ["Apple", "Banana", "Cherry", "Date"]
    const scores: number[] = [45, 78, 92, 88, 76, 95, 82]
    
    // IndexOf: Find element position (returns -1 if not found)
    console.log("Index of 'Cherry':", fruits.indexOf("Cherry"))
    console.log("Index of 'Grape':", fruits.indexOf("Grape"))
    
    // Includes: Check if element exists
    console.log("Contains 'Banana':", fruits.includes("Banana"))
    console.log("Contains 'Orange':", fruits.includes("Orange"))
    
    // Find: Get first element matching condition
    const found = fruits.find(fruit => fruit.length > 5)
    console.log("First fruit with length > 5:", found)
    
    // FindIndex: Get index of first matching element
    const idx = scores.findIndex(score => score >= 90)
    console.log("First score >= 90 at index:", idx)
    
    // Filter: Get all matching elements
    const highScores = scores.filter(score => score >= 80)
    console.log("Scores >= 80:", highScores)
}

// ----------------------------
// 4. ARRAY TRANSFORMATION METHODS - map, sort, reduce, reverse
// ----------------------------
// Definition: Methods that transform array contents without mutating original.
// Methods: map, sort, reverse, reduce, join
// Features: Create new arrays; functional style; chainable operations.
// Best for: Data processing; calculations; string conversion.

console.log("\n--- 4. ARRAY TRANSFORMATION METHODS ---")
{
    const numbers: number[] = [10, 20, 30, 40, 50]
    const names: string[] = ["Charlie", "Alice", "Bob"]
    
    // Map: Transform each element
    const doubled = numbers.map(n => n * 2)
    console.log("Doubled:", doubled)
    
    const nameLengths = names.map(name => name.length)
    console.log("Name lengths:", nameLengths)
    
    // Sort: Order elements (creates new array with spread)
    const sorted = [...names].sort()
    console.log("Sorted names:", sorted)
    
    const numSorted = [...numbers].sort((a, b) => b - a)  // Descending
    console.log("Numbers descending:", numSorted)
    
    // Reverse: Flip array order
    const reversed = [...numbers].reverse()
    console.log("Reversed:", reversed)
    
    // Join: Convert array to string
    const joined = names.join(", ")
    console.log("Names joined:", joined)
}

// ----------------------------
// 5. ARRAY REDUCTION - Aggregating Values
// ----------------------------
// Definition: Combine array elements into a single value.
// Syntax: array.reduce((accumulator, current) => accumulation, initialValue)
// Features: Powerful for aggregation; calculating totals; creating objects.
// Best for: Summing; averaging; combining array elements.

console.log("\n--- 5. ARRAY REDUCTION ---")
{
    const prices: number[] = [50, 75, 100, 85]
    
    // Sum all elements
    const total = prices.reduce((sum, price) => sum + price, 0)
    console.log("Total:", total)
    
    // Average
    const average = total / prices.length
    console.log("Average:", average)
    
    // Count occurrences
    const items: string[] = ["apple", "banana", "apple", "cherry", "apple"]
    const count = items.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1
        return acc
    }, {} as Record<string, number>)
    console.log("Item counts:", count)
    
    // Find max value
    const max = prices.reduce((max, price) => price > max ? price : max)
    console.log("Max price:", max)
}

// ----------------------------
// 6. ITERATION METHODS - forEach, some, every
// ----------------------------
// Definition: Methods for iterating through array without mutation.
// Methods: forEach, some (at least one), every (all elements)
// Features: Execute code per element; boolean checks; no new array creation.
// Best for: Side effects; conditional checks; validation.

console.log("\n--- 6. ITERATION METHODS ---")
{
    const students: string[] = ["Alice", "Bob", "Charlie"]
    const scores: number[] = [85, 92, 78, 88, 95]
    
    // ForEach: Execute for each element
    console.log("Students:")
    students.forEach((student, index) => {
        console.log(`  ${index + 1}. ${student}`)
    })
    
    // Some: Check if at least one matches condition
    const hasHighScore = scores.some(score => score > 90)
    console.log("Has score > 90:", hasHighScore)
    
    // Every: Check if all match condition
    const allPassed = scores.every(score => score >= 75)
    console.log("All passed (>= 75):", allPassed)
}

// ----------------------------
// 7. TUPLES - Fixed-Length Arrays with Specific Types
// ----------------------------
// Definition: Arrays with fixed length and specific types for each position.
// Syntax: const tuple: [type1, type2, type3] = [val1, val2, val3]
// Features: Type safety per position; prevents accidental modifications; structured data.
// Best for: Returning multiple values; fixed data structures; key-value pairs.

console.log("\n--- 7. TUPLES - FIXED-LENGTH TYPED ARRAYS ---")
{
    // Basic tuple with three types
    const birthDate: [number, string, number] = [15, "March", 1995]
    console.log(`Birth date: ${birthDate[0]} ${birthDate[1]} ${birthDate[2]}`)
    
    // Tuple for coordinate
    const coordinate: [number, number] = [10.5, 20.3]
    console.log("Coordinate:", coordinate)
    
    // Tuple with different types
    const userRecord: [string, number, boolean] = ["John", 30, true]
    console.log("User record:", userRecord)
    
    // Accessing tuple elements
    const [name, age, isActive] = userRecord
    console.log(`Name: ${name}, Age: ${age}, Active: ${isActive}`)
}

// ----------------------------
// 8. TUPLES - Optional & Labeled Elements
// ----------------------------
// Definition: Tuples with optional elements and descriptive labels.
// Syntax: [label: type, label?: type, ...types[]]
// Features: Optional elements; named elements; variable-length support.
// Best for: API responses; function returns; optional data.

console.log("\n--- 8. TUPLES - ADVANCED FEATURES ---")
{
    // Tuple with optional element
    const response: [string, number, boolean?] = ["Success", 200]
    console.log("Response:", response)
    
    // Tuple with labeled elements
    type HttpResponse = [status: number, message: string, data?: Record<string, unknown>]
    const apiResponse: HttpResponse = [200, "OK", { id: 1, name: "Product" }]
    console.log("API Response:", apiResponse)
    
    // Variable-length tuple
    type StringNumberTuple = [string, ...number[]]
    const mixed: StringNumberTuple = ["scores", 85, 90, 95]
    console.log("Mixed tuple:", mixed)
}

// ----------------------------
// 9. PRACTICAL EXAMPLES - Real-World Usage
// ----------------------------

console.log("\n--- 9. PRACTICAL EXAMPLES ---")
{
    // Example 1: Student grades analysis
    const students: [string, number][] = [
        ["Alice", 92],
        ["Bob", 87],
        ["Charlie", 95],
        ["Diana", 88]
    ]
    
    console.log("Student Grades:")
    const totalGrades = students.reduce((sum, [name, grade]) => {
        console.log(`  ${name}: ${grade}`)
        return sum + grade
    }, 0)
    
    const average = totalGrades / students.length
    console.log(`Average: ${average.toFixed(2)}`)
    
    // Example 2: Product inventory
    const inventory: Array<{ id: number; name: string; stock: number }> = [
        { id: 1, name: "Laptop", stock: 5 },
        { id: 2, name: "Mouse", stock: 50 },
        { id: 3, name: "Keyboard", stock: 20 }
    ]
    
    const lowStock = inventory.filter(item => item.stock < 10)
    console.log("\nLow stock items:", lowStock.map(item => item.name))
    
    const totalItems = inventory.reduce((sum, item) => sum + item.stock, 0)
    console.log("Total inventory:", totalItems)
}


/*
BEST PRACTICES:
✅ DO:
- Use const for arrays that won't be reassigned
- Always specify array type: const arr: type[] = []
- Use map/filter/reduce for transformations (functional style)
- Use spread operator [...arr] to avoid mutating original
- Use tuples for fixed-structure returns (especially in functions)
- Label tuple elements for clarity: type MyTuple = [name: string, age: number]
- Use findIndex/includes for searches (clearer than indexOf)
- Use forEach/some/every for side effects or validation
- Document complex array types with interfaces/types
- Validate array length before accessing tuple positions

❌ DON'T:
- Don't mutate arrays unnecessarily (use spread operator instead)
- Don't mix array and tuple types without clear reason
- Don't use any[] (specify element type)
- Don't assume array index exists without checking length
- Don't use map() if you only need side effects (use forEach)
- Don't forget that arrays are passed by reference
- Don't modify tuples after creation (immutable by intent)
- Don't use for loops when map/filter/reduce is clearer
- Don't mix different types in arrays (use union types if necessary)
- Don't forget to handle empty arrays in reductions
*/
