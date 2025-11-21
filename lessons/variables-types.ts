// =====================================================
// TYPESCRIPT VARIABLES & TYPES - COMPLETE STUDY GUIDE
// =====================================================
// Variables store data values; types define what kind of data they hold.
// TypeScript enforces type safety at compile-time, preventing runtime errors.
// Topics: let/const/var, primitive types, complex types, unions, enums, interfaces, and best practices.

// ----------------------------
// 1. VARIABLE DECLARATION - let, const, var
// ----------------------------
// Definition: Variables are containers for storing data values.
// let: Block-scoped, can be reassigned, modern choice
// const: Block-scoped, cannot be reassigned, prevents accidental changes
// var: Function-scoped (legacy, avoid using)
// Best for: Use const by default, let when reassignment needed.

console.log("\n--- 1. VARIABLE DECLARATION ---")
{
    // Example: Variable Declaration and Assignment
    let firstName: string = "Pradeep"
    let lastName: string = "Hopkins"
    console.log(`Full name: ${firstName} ${lastName}`)

    // Example: Variable Reassignment
    let age: string | number = "25"
    console.log(`Initial age: ${age}`)
    age = 26  // TypeScript allows type changes when using union types
    console.log(`Updated age: ${age}`)

    // Example: Constants
    const occupation: string = "Engineer"
    console.log(`Occupation: ${occupation}`)
    // const variables must be initialized and cannot be reassigned
}

// ----------------------------
// 2. PRIMITIVE TYPES - Basic Data Types
// ----------------------------
// Definition: Fundamental data types in TypeScript.
// string: Text data ("hello", "world")
// number: Numeric values (42, 3.14, -10)
// boolean: True or false values
// null: Explicitly set to no value
// undefined: Variable declared but not initialized
// Best for: Storing simple, single values.

console.log("\n--- 2. PRIMITIVE TYPES ---")
{
    const text: string = "Jack Sparrow"        // String type
    console.log(`String: ${text}`)

    const count: number = 30                    // Number type
    console.log(`Number: ${count}`)

    const isActive: boolean = true              // Boolean type
    console.log(`Boolean: ${isActive}`)

    const empty: null = null                    // Null type
    console.log(`Null: ${empty}`)

    const notSet: undefined = undefined         // Undefined type
    console.log(`Undefined: ${notSet}`)
}

// ----------------------------
// 3. ANY TYPE - Flexible but Not Type-Safe
// ----------------------------
// Definition: A type that can hold any value; disables type checking.
// Syntax: let variable: any = value
// Features: Flexible; loses type safety; use sparingly.
// Best for: Legacy code integration; external APIs with unknown types.

console.log("\n--- 3. ANY TYPE ---")
{
    let flexible: any                           // Can hold any type
    flexible = "API"
    console.log(`Any as string: ${flexible}`)

    flexible = 10
    console.log(`Any as number: ${flexible}`)

    flexible = true
    console.log(`Any as boolean: ${flexible}`)

    flexible = [10, 20, 30]
    console.log(`Any as array:`, flexible)

    flexible = { name: "API", count: 18 }
    console.log(`Any as object:`, flexible)
}

// ----------------------------
// 4. ARRAYS - Collections of Values
// ----------------------------
// Definition: Collections of values of the same type.
// Syntax: const array: type[] = [val1, val2, val3]
// Features: Indexed access; length property; array methods.
// Best for: Storing multiple values of same type.

console.log("\n--- 4. ARRAYS ---")
{
    const numbers: number[] = [10, 30, 40, 50]  // Number array
    console.log(`Numbers array: ${numbers}`)
    console.log(`First number: ${numbers[0]}`)
    console.log(`Array length: ${numbers.length}`)

    const strings: string[] = ["Alice", "Bob", "Charlie"]
    console.log(`Strings array:`, strings)

    // Array methods
    numbers.push(60)
    console.log(`After push:`, numbers)

    const doubled = numbers.map(n => n * 2)
    console.log(`Doubled:`, doubled)
}

// ----------------------------
// 5. TUPLES - Fixed-Length Arrays with Specific Types
// ----------------------------
// Definition: Arrays with fixed length and specific types for each position.
// Syntax: const tuple: [type1, type2, ...] = [val1, val2, ...]
// Features: Type safety for each position; better than arrays for fixed structures.
// Best for: Returning multiple values from functions; structured data.

console.log("\n--- 5. TUPLES ---")
{
    const birthInfo: [number, string, number] = [20, "May", 2000]
    console.log(`Birth date: ${birthInfo[0]} ${birthInfo[1]} ${birthInfo[2]}`)

    // Tuple with different types
    const userInfo: [string, number, boolean] = ["Sarah", 28, true]
    console.log(`User info:`, userInfo)
}

// ----------------------------
// 6. ENUMS - Named Constants
// ----------------------------
// Definition: Collection of named constant values.
// Syntax: enum EnumName { VALUE1 = "val", VALUE2 = "val" }
// Features: Readable code; prevents invalid values; type-safe.
// Best for: Defining fixed sets of related constants (status, colors, etc).

console.log("\n--- 6. ENUMS ---")
{
    enum Color { 
        Red = "RED",
        Green = "GREEN",
        Blue = "BLUE"
    }
    const selectedColor: Color = Color.Blue
    console.log(`Selected color: ${selectedColor}`)

    enum Status {
        Active = "ACTIVE",
        Inactive = "INACTIVE",
        Pending = "PENDING"
    }
    const userStatus: Status = Status.Active
    console.log(`User status: ${userStatus}`)
}

// ----------------------------
// 7. INTERFACES & OBJECTS - Structured Data
// ----------------------------
// Definition: Objects with defined structure (properties and types).
// Syntax: interface Name { property: type; property: type }
// Features: Type safety; intellisense support; document structure.
// Best for: Defining object shapes; ensuring consistent data structure.

console.log("\n--- 7. INTERFACES & OBJECTS ---")
{
    interface Student {
        name: string
        age: number
        isGraduate: boolean
    }

    const studentDetails: Student = {
        name: "Pradeep",
        age: 20,
        isGraduate: true
    }
    console.log(`Student:`, studentDetails)

    interface User {
        id: number
        username: string
        email: string
        isActive: boolean
    }

    const user: User = {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        isActive: true
    }
    console.log(`User:`, user)
}

// ----------------------------
// 8. UNION TYPES - Multiple Possible Types
// ----------------------------
// Definition: Variable can hold values of multiple specified types.
// Syntax: let variable: type1 | type2 | type3
// Features: Flexible while maintaining type safety; type narrowing possible.
// Best for: Variables that could be different types; function parameters.

console.log("\n--- 8. UNION TYPES ---")
{
    // Union of two types
    let identifier: number | string
    identifier = 18
    console.log(`Identifier as number: ${identifier}`)

    identifier = "8th of November"
    console.log(`Identifier as string: ${identifier}`)

    // Union with null/undefined
    let userResponse: string | null = null
    console.log(`Response (null):`, userResponse)

    userResponse = "Yes"
    console.log(`Response (string):`, userResponse)

    let userInput: string | undefined
    console.log(`Input (undefined):`, userInput)
}

// ----------------------------
// 9. FUNCTION TYPES - Type-Safe Functions
// ----------------------------
// Definition: Functions with type annotations for parameters and return values.
// Syntax: function name(param: type): returnType { }
// Features: Type checking; intellisense; prevent bugs.
// Best for: All functions; ensure correct usage and values.

console.log("\n--- 9. FUNCTION TYPES ---")
{
    // Function with return type
    function greet(name: string): string {
        return `Hello, ${name}!`
    }
    console.log(greet("Alice"))

    // Void Function (returns nothing)
    function logMessage(message: string): void {
        console.log(message)
        // No return statement needed
    }
    logMessage("This is a message")

    // Function with multiple parameters
    function add(a: number, b: number): number {
        return a + b
    }
    console.log(`5 + 3 = ${add(5, 3)}`)

    // Function with optional parameter
    function describe(name: string, age?: number): string {
        if (age !== undefined) {
            return `${name} is ${age} years old`
        }
        return `${name}'s age is unknown`
    }
    console.log(describe("Bob"))
    console.log(describe("Sarah", 28))
}

/*
BEST PRACTICES:
✅ DO:
- Use const by default; use let only when reassignment needed
- Add type annotations to variables and functions
- Use interfaces/types for object structures
- Use union types for flexibility with type safety
- Use enums for fixed sets of values
- Keep function return types explicit
- Document complex types with comments
- Use descriptive variable names

❌ DON'T:
- Use var keyword (legacy, function-scoped)
- Use any type (loses type safety)
- Leave variables untyped (except obvious cases)
- Create deeply nested object types (use interfaces)
- Overuse union types (may indicate poor design)
- Forget to validate user input
- Use magic numbers/strings (use const or enums)
- Create overly complex type definitions
*/
