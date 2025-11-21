// =====================================================
// TYPESCRIPT OPERATORS & COMPARISONS - COMPLETE STUDY GUIDE
// =====================================================
// Operators perform operations on values; Comparisons evaluate relationships between values.
// TypeScript enforces type safety while supporting JavaScript's rich operator set.
// Topics: arithmetic, comparison, logical, assignment, ternary, type operators, and best practices.

// ----------------------------
// 1. ARITHMETIC OPERATORS - Mathematical Operations
// ----------------------------
// Definition: Operators for performing mathematical calculations.
// Operators: +, -, *, /, %, ** (exponentiation), ++, --
// Features: Work with numbers; some have special string behavior (+).
// Best for: Calculations; math operations; numeric transformations.

console.log("\n--- 1. ARITHMETIC OPERATORS ---")
{
    const a: number = 20
    const b: number = 5
    
    // Basic operations
    console.log("Addition:", a + b)              // 25
    console.log("Subtraction:", a - b)           // 15
    console.log("Multiplication:", a * b)        // 100
    console.log("Division:", a / b)              // 4
    console.log("Modulo (remainder):", a % b)    // 0
    console.log("Exponentiation:", a ** 2)       // 400
    
    // Unary operations
    let counter: number = 10
    console.log("Pre-increment:", ++counter)     // 11
    counter = 10
    console.log("Post-increment:", counter++)    // 10 (returns 10, then increments)
    console.log("After post-increment:", counter) // 11
    
    // String concatenation with +
    const str: string = "Result: " + 42
    console.log(str)
}

// ----------------------------
// 2. RELATIONAL (COMPARISON) OPERATORS - Value Relationships
// ----------------------------
// Definition: Operators that compare two values and return boolean.
// Operators: <, >, <=, >=, ==, ===, !=, !==
// Features: Return true/false; === preferred over == for type safety.
// Best for: Conditional logic; range checks; equality validation.

console.log("\n--- 2. RELATIONAL OPERATORS ---")
{
    const num1: number = 10
    const num2: number = 5
    
    // Greater than / Less than
    console.log("num1 > num2:", num1 > num2)    // true
    console.log("num1 < num2:", num1 < num2)    // false
    console.log("num1 >= num1:", num1 >= num1)  // true
    console.log("num1 <= num2:", num1 <= num2)  // false
    
    // Equality (strict type-safe)
    console.log("10 === 10:", 10 === 10)        // true
    console.log("'10' === '10':", "10" === "10")  // true
    
    // Inequality
    console.log("5 !== 5:", 5 !== 5)            // false
    console.log("'5' !== 5:", "5" !== "5")      // false
    
    // String comparisons (lexicographic)
    const str1: string = "apple"
    const str2: string = "banana"
    console.log("'apple' < 'banana':", str1 < str2)  // true
}

// ----------------------------
// 3. LOGICAL OPERATORS - Boolean Logic
// ----------------------------
// Definition: Operators for combining or inverting boolean conditions.
// Operators: && (AND), || (OR), ! (NOT)
// Features: Short-circuit evaluation; return actual values, not just boolean.
// Best for: Conditional branching; validating multiple conditions.

console.log("\n--- 3. LOGICAL OPERATORS ---")
{
    const isValid: boolean = true
    const isEnabled: boolean = false
    
    // AND (&&): True only if both operands are true
    console.log("true && false:", isValid && isEnabled)      // false
    console.log("true && true:", isValid && isValid)         // true
    
    // OR (||): True if at least one operand is true
    console.log("true || false:", isValid || isEnabled)      // true
    console.log("false || false:", isEnabled || isEnabled)   // false
    
    // NOT (!): Inverts boolean value
    console.log("!true:", !isValid)                          // false
    console.log("!false:", !isEnabled)                       // true
    
    // Complex logical expressions
    const age: number = 25
    const hasLicense: boolean = true
    const canDrive = age >= 18 && hasLicense
    console.log("Can drive (age 25, has license):", canDrive)  // true
    
    // Short-circuit evaluation
    const user: string | null = null
    const username = user || "Guest"
    console.log("Username (null or 'Guest'):", username)     // "Guest"
}

// ----------------------------
// 4. ASSIGNMENT OPERATORS - Assigning & Modifying Values
// ----------------------------
// Definition: Operators for assigning values to variables.
// Operators: =, +=, -=, *=, /=, %=, **=, &&=, ||=, ??=
// Features: Shorthand compound assignments; update existing values.
// Best for: Variable initialization; value updates; compound operations.

console.log("\n--- 4. ASSIGNMENT OPERATORS ---")
{
    // Basic assignment
    let x: number = 10
    console.log("x = 10:", x)
    
    // Compound assignments
    x += 5
    console.log("x += 5:", x)                   // 15
    
    x -= 3
    console.log("x -= 3:", x)                   // 12
    
    x *= 2
    console.log("x *= 2:", x)                   // 24
    
    x /= 4
    console.log("x /= 4:", x)                   // 6
    
    x %= 4
    console.log("x %= 4:", x)                   // 2
    
    // Logical assignments
    let flag: boolean = false
    flag ||= true
    console.log("flag ||= true:", flag)         // true
    
    let value: string | null = null
    value ??= "default"
    console.log("value ??= 'default':", value) // "default"
}

// ----------------------------
// 5. TERNARY (CONDITIONAL) OPERATOR - Inline Conditionals
// ----------------------------
// Definition: Compact conditional expression using ? :
// Syntax: condition ? valueIfTrue : valueIfFalse
// Features: Evaluates condition and returns one of two values; readable for simple cases.
// Best for: Simple conditionals; concise assignments; readability when not nested.

console.log("\n--- 5. TERNARY OPERATOR ---")
{
    const age: number = 25
    
    // Simple ternary
    const status = age >= 18 ? "Adult" : "Minor"
    console.log("Status:", status)              // "Adult"
    
    // Ternary with expressions
    const discount = age < 18 ? 0.2 : age > 65 ? 0.15 : 0
    console.log("Discount for age 25:", discount)  // 0
    
    // Nested ternary (use cautiously - can reduce readability)
    const category = age < 13 ? "Child" : age < 18 ? "Teen" : age < 65 ? "Adult" : "Senior"
    console.log("Category:", category)         // "Adult"
    
    // Ternary with function calls
    const getGrade = (score: number): string => {
        return score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"
    }
    console.log("Grade for score 85:", getGrade(85))  // "B"
}

// ----------------------------
// 6. TYPE OPERATORS - Type Checking & Conversion
// ----------------------------
// Definition: Operators for checking and converting types.
// Operators: typeof, instanceof, in, keyof, as (type assertion)
// Features: Runtime type checking; type guards; object property checking.
// Best for: Type narrowing; runtime validation; discriminated unions.

console.log("\n--- 6. TYPE OPERATORS ---")
{
    // typeof: Check variable type
    console.log("typeof 42:", typeof 42)                      // "number"
    console.log("typeof 'hello':", typeof "hello")            // "string"
    console.log("typeof true:", typeof true)                  // "boolean"
    console.log("typeof undefined:", typeof undefined)        // "undefined"
    console.log("typeof {}:", typeof {})                      // "object"
    console.log("typeof []:", typeof [])                      // "object"
    
    // Type narrowing with typeof
    const value: string | number = Math.random() > 0.5 ? "text" : 42
    if (typeof value === "string") {
        console.log("String value:", value.toUpperCase())
    } else {
        console.log("Number value:", value * 2)
    }
    
    // instanceof: Check object type
    const arr: number[] = [1, 2, 3]
    console.log("[] instanceof Array:", arr instanceof Array)  // true
    
    // in: Check if property exists
    const person = { name: "John", age: 30 }
    console.log("'name' in person:", "name" in person)       // true
    console.log("'email' in person:", "email" in person)     // false
}

// ----------------------------
// 7. COMPARISON PATTERNS - Common Real-World Scenarios
// ----------------------------
// Definition: Practical patterns for typical comparison needs.
// Patterns: null/undefined checks, range validation, type guards, object comparison.
// Features: Safety; readability; prevents common bugs.
// Best for: Real-world applications; data validation; user input handling.

console.log("\n--- 7. COMPARISON PATTERNS ---")
{
    // Null/undefined checks
    let nullable: string | null = null
    console.log("Is null:", nullable === null)              // true
    console.log("Is not null:", nullable !== null)          // false
    
    // Checking values with || operator (null coalescing pattern)
    const possibleName: string | null = null
    const userName = possibleName || "Anonymous"
    console.log("User name:", userName)                      // "Anonymous"
    
    // Range validation
    const score: number = 85
    const isPass = score >= 60 && score <= 100
    console.log("Is valid score:", isPass)                  // true
    
    // Multiple conditions
    const role: string = "admin"
    const hasAccess = role === "admin" || role === "moderator"
    console.log("Has access:", hasAccess)                   // true
}

// ----------------------------
// 8. BITWISE OPERATORS - Binary Operations
// ----------------------------
// Definition: Operators working on binary representations of numbers.
// Operators: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift)
// Features: Low-level operations; useful for flags and bit manipulation.
// Best for: Flags; permissions; bit-level operations (less common in TypeScript).

console.log("\n--- 8. BITWISE OPERATORS ---")
{
    const a: number = 5      // Binary: 0101
    const b: number = 3      // Binary: 0011
    
    console.log("5 & 3 (AND):", a & b)          // 1 (0001)
    console.log("5 | 3 (OR):", a | b)           // 7 (0111)
    console.log("5 ^ 3 (XOR):", a ^ b)          // 6 (0110)
    console.log("~5 (NOT):", ~a)                // -6
    console.log("5 << 1 (left shift):", a << 1) // 10
    console.log("5 >> 1 (right shift):", a >> 1) // 2
}

// ----------------------------
// 9. PRACTICAL EXAMPLES - Real-World Operator Usage
// ----------------------------

console.log("\n--- 9. PRACTICAL EXAMPLES ---")
{
    // Example 1: Access control
    interface User {
        id: number
        role: "admin" | "user" | "guest"
        isActive: boolean
    }
    
    const currentUser: User = { id: 1, role: "admin", isActive: true }
    const canDelete = (currentUser.role === "admin") && currentUser.isActive
    console.log("Can delete:", canDelete)
    
    // Example 2: Price calculation
    const basePrice: number = 100
    const discount: number = 0.1
    const taxRate: number = 0.08
    const finalPrice = (basePrice * (1 - discount)) * (1 + taxRate)
    console.log("Final price:", finalPrice.toFixed(2))
    
    // Example 3: Validation
    const email: string = "user@example.com"
    const isValidEmail = email.includes("@") && email.includes(".") && email.length > 5
    console.log("Email valid:", isValidEmail)
    
    // Example 4: Status determination
    const age: number = 20
    const income: number = 35000
    const creditScore: number = 720
    const qualifiesForLoan = age >= 18 && income >= 30000 && creditScore >= 700
    console.log("Qualifies for loan:", qualifiesForLoan)
}

/*
BEST PRACTICES:
✅ DO:
- Use === and !== for comparisons (always, unless you need coercion)
- Use && and || for logical operations over nested ifs
- Use ternary for simple, single-line conditionals
- Use optional chaining (?.) and nullish coalescing (??)
- Use typeof for runtime type checking
- Keep complex comparisons in variables with descriptive names
- Use compound assignment operators (+=, -=, etc.) for clarity
- Comment complex logical expressions for maintainability
- Use in operator to check property existence
- Prefer early returns over deeply nested conditionals

❌ DON'T:
- Use == or != (automatic type coercion causes bugs)
- Overuse ternary operators (nested ternaries are unreadable)
- Mix loose and strict comparisons in same code
- Forget that && and || return values, not just booleans
- Use bitwise operators unless necessary (rare in web dev)
- Compare objects with === (compare properties instead)
- Mutate comparison operands inside conditionals
- Use typeof with null (it returns "object" - use === null instead)
- Create overly complex boolean expressions
- Forget operator precedence (use parentheses for clarity)
*/
