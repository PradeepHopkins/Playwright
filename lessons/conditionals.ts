// =====================================================
// TYPESCRIPT CONDITIONALS - COMPLETE STUDY GUIDE
// =====================================================
// Conditional statements allow you to execute different code blocks based on conditions.
// TypeScript enhances conditionals with type narrowing, type guards, and optional chaining.
// Topics: if/else, switch, ternary, logical operators, type guards, and best practices.

// ----------------------------
// # 1. IF / ELSE / ELSE IF - Basic Branching
// ----------------------------
// Definition: Execute code blocks based on boolean conditions.
// if (condition) { } else if (condition) { } else { }
// TypeScript performs type narrowing within each branch.

console.log("\n--- 1. IF / ELSE / ELSE IF ---")
{
    // Basic if/else with number
    const temperature: number = 25
    if (temperature > 30) {
        console.log("It's hot!")
    } else if (temperature > 20) {
        console.log("It's warm")
    } else if (temperature > 10) {
        console.log("It's cool")
    } else {
        console.log("It's cold!")
    }

    // Type narrowing with union types
    console.log("\nType narrowing with typeof:")
    let value: number | string = Math.random() > 0.5 ? 42 : "hello"
    if (typeof value === "string") {
        console.log(`  String length: ${value.length}`)
    } else {
        console.log(`  Number: ${value.toFixed(2)}`)
    }
}

// ----------------------------
// # 2. SWITCH STATEMENT - Multi-way Branching
// ----------------------------
// Definition: Compare a value against multiple cases.
// switch (expression) { case value1: ... break; case value2: ... break; default: ... }
// Use break to exit each case; without it, code "falls through" to next case.

console.log("\n--- 2. SWITCH STATEMENT ---")
{
    // Switch with day of week
    const today: string = "mon"
    
    switch (today) {
        case "mon":
        case "tue":
        case "wed":
        case "thu":
        case "fri":
            console.log("  Weekday - work day!")
            break
        case "sat":
        case "sun":
            console.log("  Weekend - time to relax!")
            break
        default:
            console.log("  Unknown day")
    }

    // Switch with numeric grades
    console.log("\nSwitch with grade scoring:")
    const score: number = 85
    switch (true) {
        case score >= 90:
            console.log(`  Grade: A (${score})`)
            break
        case score >= 80:
            console.log(`  Grade: B (${score})`)
            break
        case score >= 70:
            console.log(`  Grade: C (${score})`)
            break
        default:
            console.log(`  Grade: F (${score})`)
    }
}

// ----------------------------
// # 3. TERNARY OPERATOR - Inline Conditional
// ----------------------------
// Definition: Shorthand for if/else in a single expression.
// condition ? valueIfTrue : valueIfFalse
// Use for simple assignments; avoid nesting for readability.

console.log("\n--- 3. TERNARY OPERATOR ---")
{
    // Simple ternary
    const age: number = 25
    const status = age >= 18 ? "Adult" : "Minor"
    console.log(`  Age ${age}: ${status}`)

    // Nested ternary (readable version)
    const score: number = 88
    const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"
    console.log(`  Score ${score}: Grade ${grade}`)

    // With function calls
    const items: string[] = ["apple", "banana"]
    console.log(`  Items: ${items.length > 0 ? items.join(", ") : "empty"}`)
}

// ----------------------------
// # 4. LOGICAL OPERATORS - && (AND), || (OR), ! (NOT)
// ----------------------------
// Definition: Combine or negate conditions.
// && returns first falsy value or last value
// || returns first truthy value or last value
// ! negates a boolean

console.log("\n--- 4. LOGICAL OPERATORS ---")
{
    // && (AND) - both conditions must be true
    const hasLicense: boolean = true
    const hasInsurance: boolean = true
    if (hasLicense && hasInsurance) {
        console.log("  ✅ Can drive legally")
    }

    // || (OR) - at least one condition must be true
    const hasCreditCard: boolean = false
    const hasDebitCard: boolean = true
    if (hasCreditCard || hasDebitCard) {
        console.log("  ✅ Can make payment")
    }

    // ! (NOT) - negates condition
    const isRaining: boolean = false
    if (!isRaining) {
        console.log("  ✅ No rain - go outside!")
    }

    // Short-circuit evaluation
    console.log("\nShort-circuit evaluation:")
    const user = { name: "Alice", role: "admin" }
    if (user && user.role === "admin") {
        console.log("  ✅ Admin access granted")
    }
}

// ----------------------------
// # 5. NULLISH COALESCING (??) vs LOGICAL OR (||)
// ----------------------------
// Definition:
// ?? returns right side only if left is null or undefined (not falsy!)
// || returns right side if left is any falsy value (false, 0, "", null, undefined, NaN)

console.log("\n--- 5. NULLISH COALESCING (??) ---")
{
    // Difference between ?? and ||
    const emptyString: string = ""
    const resultOr = emptyString || "default"  // "" is falsy, so uses default
    const resultCoalesce = emptyString ?? "default"  // "" is not nullish, so uses ""
    
    console.log(`  || with empty string: "${resultOr}"`)  // "default"
    console.log(`  ?? with empty string: "${resultCoalesce}"`)  // ""

    const zeroValue: number = 0
    console.log(`  || with 0: ${zeroValue || 100}`)  // 100 (0 is falsy)
    console.log(`  ?? with 0: ${zeroValue ?? 100}`)  // 0 (0 is not nullish)

    const nullValue: string | null = null
    console.log(`  ?? with null: ${nullValue ?? "fallback"}`)  // "fallback"
}

// ----------------------------
// # 6. OPTIONAL CHAINING (?.)
// ----------------------------
// Definition: Safely access nested properties that might not exist.
// obj?.prop returns undefined if obj is null/undefined
// Prevents "Cannot read property of null" errors.

console.log("\n--- 6. OPTIONAL CHAINING (?.) ---")
{
    interface Address {
        street?: string
        city?: string
        country?: string
    }

    interface Person {
        name: string
        address?: Address
    }

    const person1: Person = { name: "Alice", address: { city: "London" } }
    const person2: Person = { name: "Bob" }  // no address

    console.log(`  Alice's city: ${person1.address?.city}`)  // "London"
    console.log(`  Bob's city: ${person2.address?.city}`)  // undefined (no error!)
    
    // With nullish coalescing for default
    const city1 = person1.address?.city ?? "Unknown"
    const city2 = person2.address?.city ?? "Unknown"
    console.log(`  Alice: ${city1}`)
    console.log(`  Bob: ${city2}`)
}

// ----------------------------
// # 7. DISCRIMINATED UNIONS & TYPE GUARDS
// ----------------------------
// Definition: Use a common property (discriminant) to narrow union types.
// Provides better type safety than typeof checks alone.

console.log("\n--- 7. DISCRIMINATED UNIONS ---")
{
    type Circle = { kind: "circle"; radius: number }
    type Square = { kind: "square"; side: number }
    type Triangle = { kind: "triangle"; base: number; height: number }
    type Shape = Circle | Square | Triangle

    function getArea(shape: Shape): number {
        switch (shape.kind) {
            case "circle":
                return Math.PI * shape.radius ** 2
            case "square":
                return shape.side ** 2
            case "triangle":
                return (shape.base * shape.height) / 2
        }
    }

    const circle: Shape = { kind: "circle", radius: 5 }
    const square: Shape = { kind: "square", side: 4 }
    
    console.log(`  Circle area: ${getArea(circle).toFixed(2)}`)
    console.log(`  Square area: ${getArea(square).toFixed(2)}`)
}

// ----------------------------
// # PRACTICAL EXAMPLE - User Permission System
// ----------------------------

console.log("\n--- 8. PRACTICAL EXAMPLE ---")
{
    interface User {
        id: number
        name: string
        role: "admin" | "user" | "guest"
        isActive: boolean
    }

    function canDeletePost(user: User | null, isAuthor: boolean): boolean {
        // Check if user exists
        if (!user) return false

        // Check if user is active
        if (!user.isActive) return false

        // Admin can delete any post
        if (user.role === "admin") return true

        // Regular user can only delete their own posts
        if (user.role === "user" && isAuthor) return true

        // Guest cannot delete
        return false
    }

    const admin: User = { id: 1, name: "Admin", role: "admin", isActive: true }
    const user: User = { id: 2, name: "John", role: "user", isActive: true }
    const guest: User = { id: 3, name: "Guest", role: "guest", isActive: true }

    console.log(`  Admin can delete any post: ${canDeletePost(admin, false)}`)  // true
    console.log(`  User can delete own post: ${canDeletePost(user, true)}`)  // true
    console.log(`  User cannot delete others: ${canDeletePost(user, false)}`)  // false
    console.log(`  Guest cannot delete: ${canDeletePost(guest, true)}`)  // false
}

/*
BEST PRACTICES:
✅ DO:
- Use if/else for simple conditions
- Use switch for multiple fixed values
- Use ternary for simple inline conditionals
- Use ?? for null/undefined defaults
- Use ?. to safely access nested properties
- Use discriminated unions for type safety
- Use type narrowing (typeof, instanceof, etc.)
- Keep conditions readable and simple
- Add comments explaining complex logic

❌ DON'T:
- Nest ternary operators too deeply
- Use || for defaults when you need ?? 
- Forget break in switch cases (unless intentional fall-through)
- Mix multiple logical operators without parentheses
- Make conditions too complex
- Use == instead of === (always use strict equality)
- Assume properties exist without checking
- Create deeply nested if/else chains
*/
