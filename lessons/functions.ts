// =====================================================
// TYPESCRIPT FUNCTIONS - COMPLETE STUDY GUIDE
// =====================================================
// Functions are blocks of reusable code that perform specific tasks.
// TypeScript adds type safety with parameter and return type annotations.
// Topics: declaration styles, parameters, returns, callbacks, higher-order functions, and best practices.

// ----------------------------
// 1. NAMED FUNCTIONS - Function Declaration
// ----------------------------
// Definition: Functions with a specific name; hoisted before execution; reusable.
// Syntax: function name(param: type): returnType { }
// Features: Can be called before declaration (hoisting); clear intent; suitable for reuse.
// Best for: Main program logic; reusable utilities; when hoisting behavior is beneficial.

console.log("\n--- 1. NAMED FUNCTIONS ---")
{
    // Basic named function with no parameters
    function greet(): void {
        console.log("Hello! Welcome to TypeScript functions")
    }
    
    greet()
    
    // Named function with parameters and return value
    function add(a: number, b: number): number {
        return a + b
    }
    
    const sum: number = add(10, 5)
    console.log(`10 + 5 = ${sum}`)
    
    // Named function with string parameter
    function capitalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
    
    console.log("Capitalized:", capitalize("typescript"))
}

// ----------------------------
// 2. ANONYMOUS FUNCTIONS - Function Expressions
// ----------------------------
// Definition: Functions without a name; assigned to variables; created at runtime.
// Syntax: const name = function(param: type): returnType { }
// Features: Not hoisted; can be passed as values; assigned to variables.
// Best for: Callbacks; event handlers; passing as arguments; avoiding global scope pollution.

console.log("\n--- 2. ANONYMOUS FUNCTIONS ---")
{
    // Basic anonymous function
    const sayGoodbye = function(): void {
        console.log("Goodbye! Thanks for learning")
    }
    
    sayGoodbye()
    
    // Anonymous function with parameters and return type
    const multiply = function(x: number, y: number): number {
        return x * y
    }
    
    console.log(`5 × 3 = ${multiply(5, 3)}`)
    
    // Anonymous function with type annotation
    const concatenate: (a: string, b: string) => string = function(a, b) {
        return a + b
    }
    
    console.log("Concatenated:", concatenate("Hello", " World"))
}

// ----------------------------
// 3. ARROW FUNCTIONS - Modern Concise Syntax
// ----------------------------
// Definition: ES6 syntax using => notation; lexical `this` binding; often preferred.
// Syntax: (param: type): returnType => { } or (param: type) => expression
// Features: Concise; no function keyword; implicit return for single expressions.
// Best for: Callbacks; array methods; most modern code; when `this` binding matters.

console.log("\n--- 3. ARROW FUNCTIONS ---")
{
    // Arrow function with explicit return
    const divide = (a: number, b: number): number => {
        return a / b
    }
    console.log(`20 ÷ 4 = ${divide(20, 4)}`)
    
    // Single-line arrow function (implicit return)
    const square = (n: number): number => n * n
    console.log(`5² = ${square(5)}`)
    
    // Arrow function with single parameter (no parentheses needed)
    const double = (n: number): number => n * 2
    console.log(`Double of 7 = ${double(7)}`)
    
    // Arrow function with no parameters
    const getCurrentTime = (): string => new Date().toLocaleTimeString()
    console.log("Current time:", getCurrentTime())
}

// ----------------------------
// 4. PARAMETERS - Optional, Default, Rest Parameters
// ----------------------------
// Definition: Function inputs with type safety; can be optional, have defaults, or variable-length.
// Features: Type checking; optional with ?; default values; rest parameters with ...
// Best for: Flexible function signatures; handling variable arguments; clear API contracts.

console.log("\n--- 4. PARAMETERS ---")
{
    // Default parameter
    function createUser(name: string, role: string = "user"): string {
        return `User: ${name}, Role: ${role}`
    }
    
    console.log(createUser("Alice"))  // Uses default "user"
    console.log(createUser("Bob", "admin"))  // Overrides default
    
    // Optional parameter (marked with ?)
    function displayInfo(name: string, age?: number): void {
        if (age !== undefined) {
            console.log(`Name: ${name}, Age: ${age}`)
        } else {
            console.log(`Name: ${name}, Age: Not provided`)
        }
    }
    
    displayInfo("Charlie")
    displayInfo("Diana", 25)
    
    // Rest parameters - accept variable number of arguments
    function sumAll(...numbers: number[]): number {
        return numbers.reduce((total, num) => total + num, 0)
    }
    
    console.log(`Sum of 1, 2, 3 = ${sumAll(1, 2, 3)}`)
    console.log(`Sum of 5, 10, 15, 20 = ${sumAll(5, 10, 15, 20)}`)
}

// ----------------------------
// 5. RETURN TYPES - Type Safety for Function Results
// ----------------------------
// Definition: Explicit type annotations for what functions return.
// Types: Specific types (number, string, boolean), void (no return), union types, objects.
// Features: Compile-time checking; documentation; prevents type mismatches.
// Best for: All functions; ensures API consistency; prevents runtime errors.

console.log("\n--- 5. RETURN TYPES ---")
{
    // Function returning a number
    function calculateArea(radius: number): number {
        return Math.PI * radius * radius
    }
    console.log("Circle area (r=5):", calculateArea(5).toFixed(2))
    
    // Function returning a string
    function getStatus(isActive: boolean): string {
        return isActive ? "Active" : "Inactive"
    }
    console.log("Status:", getStatus(true))
    
    // Function returning void (no return value)
    function logMessage(message: string): void {
        console.log(`[LOG] ${message}`)
    }
    logMessage("This is a log message")
    
    // Function returning boolean
    function isEven(num: number): boolean {
        return num % 2 === 0
    }
    console.log("5 is even:", isEven(5))
    console.log("4 is even:", isEven(4))
    
    // Function returning an object
    interface Point {
        x: number
        y: number
    }
    
    function createPoint(x: number, y: number): Point {
        return { x, y }
    }
    console.log("Point:", createPoint(10, 20))
}

// ----------------------------
// 6. CALLBACKS - Functions as Parameters
// ----------------------------
// Definition: Functions passed as arguments to other functions; executed later.
// Syntax: function(callback: (param: type) => returnType)
// Features: Higher-order functions; event handlers; async patterns; functional programming.
// Best for: Event handling; async operations; array methods; flexible function composition.

console.log("\n--- 6. CALLBACKS ---")
{
    // Define a function type for callbacks
    type MathOperation = (a: number, b: number) => number
    
    function calculate(x: number, y: number, operation: MathOperation): number {
        return operation(x, y)
    }
    
    // Use different operations as callbacks
    const add: MathOperation = (a, b) => a + b
    const subtract: MathOperation = (a, b) => a - b
    const multiply: MathOperation = (a, b) => a * b
    
    console.log(`Calculate 10 + 5 = ${calculate(10, 5, add)}`)
    console.log(`Calculate 10 - 5 = ${calculate(10, 5, subtract)}`)
    console.log(`Calculate 10 × 5 = ${calculate(10, 5, multiply)}`)
    
    // Array method with callback
    const numbers: number[] = [1, 2, 3, 4, 5]
    console.log("Even numbers:", numbers.filter(n => n % 2 === 0))
}

// ----------------------------
// 7. HIGHER-ORDER FUNCTIONS - Functions Returning Functions
// ----------------------------
// Definition: Functions that return other functions; enable function composition.
// Syntax: function name(param: type): (param: type) => returnType { }
// Features: Currying; partial application; factory patterns; powerful abstraction.
// Best for: Decorators; middleware; creating specialized functions; functional programming.

console.log("\n--- 7. HIGHER-ORDER FUNCTIONS ---")
{
    // Function that returns a function
    function makeMultiplier(factor: number): (num: number) => number {
        return (num: number) => num * factor
    }
    
    const multiplyBy2 = makeMultiplier(2)
    const multiplyBy10 = makeMultiplier(10)
    
    console.log(`Multiply 5 by 2 = ${multiplyBy2(5)}`)
    console.log(`Multiply 5 by 10 = ${multiplyBy10(5)}`)
    
    // Function that returns a function for composition
    function createGreeter(greeting: string): (name: string) => string {
        return (name: string) => `${greeting}, ${name}!`
    }
    
    const sayHello = createGreeter("Hello")
    const sayHi = createGreeter("Hi")
    
    console.log(sayHello("Alice"))
    console.log(sayHi("Bob"))
}

// ----------------------------
// 8. ARRAY METHODS WITH CALLBACKS - map, filter, reduce, forEach
// ----------------------------
// Definition: Array methods that take callback functions for transformations.
// Methods: map (transform), filter (select), reduce (aggregate), forEach (iterate)
// Features: Functional programming style; chainable; immutable; declarative.
// Best for: Data processing; transformations; selections; avoiding explicit loops.

console.log("\n--- 8. ARRAY METHODS WITH CALLBACKS ---")
{
    const numbers: number[] = [1, 2, 3, 4, 5]
    
    // map: transform each element
    const doubled = numbers.map((n) => n * 2)
    console.log("Doubled:", doubled)
    
    // filter: select elements matching condition
    const evenNumbers = numbers.filter((n) => n % 2 === 0)
    console.log("Even numbers:", evenNumbers)
    
    // reduce: combine elements into single value
    const total = numbers.reduce((sum, n) => sum + n, 0)
    console.log("Sum of all:", total)
    
    // forEach: execute function for each element
    console.log("Each number squared:")
    numbers.forEach((n) => console.log(`  ${n}² = ${n * n}`))
    
    // Chaining methods
    const result = numbers
        .filter(n => n > 2)           // [3, 4, 5]
        .map(n => n * 2)              // [6, 8, 10]
        .reduce((sum, n) => sum + n, 0)  // 24
    console.log("Filtered, mapped, reduced:", result)
}

// ----------------------------
// 9. FUNCTION TYPES & INTERFACES - Defining Function Shapes
// ----------------------------
// Definition: Type definitions for functions; specify parameter and return types.
// Syntax: type FuncType = (param: type) => returnType; interface with call signature
// Features: Reusable types; clear contracts; documentation; type safety.
// Best for: APIs; callbacks; ensuring consistent function signatures.

console.log("\n--- 9. FUNCTION TYPES & INTERFACES ---")
{
    // Type alias for function
    type Validator = (value: string) => boolean
    
    const isEmail: Validator = (value: string) => value.includes("@")
    const isNotEmpty: Validator = (value: string) => value.trim().length > 0
    
    console.log("Is valid email 'test@example.com':", isEmail("test@example.com"))
    console.log("Is not empty 'hello':", isNotEmpty("hello"))
    
    // Interface with call signature
    interface Calculator {
        (a: number, b: number): number
    }
    
    const add: Calculator = (a, b) => a + b
    const multiply: Calculator = (a, b) => a * b
    
    console.log("Add 5 + 3:", add(5, 3))
    console.log("Multiply 5 × 3:", multiply(5, 3))
}

// ----------------------------
// 10. PRACTICAL EXAMPLES - Real-World Function Patterns
// ----------------------------

console.log("\n--- 10. PRACTICAL EXAMPLES ---")
{
    // Example 1: User Management Functions
    interface User {
        id: number
        name: string
        email: string
        active: boolean
    }
    
    const users: User[] = [
        { id: 1, name: "Alice", email: "alice@example.com", active: true },
        { id: 2, name: "Bob", email: "bob@example.com", active: false },
        { id: 3, name: "Charlie", email: "charlie@example.com", active: true }
    ]
    
    // Function to filter active users
    const getActiveUsers = (userList: User[]): User[] => {
        return userList.filter((user) => user.active)
    }
    
    // Function to get user names
    const getUserNames = (userList: User[]): string[] => {
        return userList.map((user) => user.name)
    }
    
    // Function to find user by ID
    const findUserById = (userList: User[], id: number): User | undefined => {
        return userList.find((user) => user.id === id)
    }
    
    console.log("Active users count:", getActiveUsers(users).length)
    console.log("All user names:", getUserNames(users))
    
    const foundUser = findUserById(users, 2)
    if (foundUser) {
        console.log(`Found user: ${foundUser.name} (${foundUser.email})`)
    }
    
    // Example 2: Data Processing Pipeline
    const data = [10, 20, 30, 40, 50]
    
    const processData = (numbers: number[]): number => {
        return numbers
            .filter(n => n > 15)           // [20, 30, 40, 50]
            .map(n => n * 2)               // [40, 60, 80, 100]
            .reduce((sum, n) => sum + n, 0) // 280
    }
    
    console.log("Processed data result:", processData(data))
}

/*
 BEST PRACTICES:
✅ DO:
- Add type annotations to all parameters and return values
- Use descriptive function names (getUserById, not getU)
- Keep functions small and focused (single responsibility)
- Use arrow functions for callbacks and simple operations
- Use rest parameters for variable-length arguments
- Leverage higher-order functions for reusability
- Document complex functions with comments
- Use const/let (not var) for function declarations
- Return early to avoid nested if statements
- Use meaningful parameter names

❌ DON'T:
- Create functions with too many parameters (use objects instead)
- Forget return type annotations
- Use `var` keyword (use `const`/`let`)
- Create deeply nested functions (hard to read and debug)
- Use `function` keyword inside functions unnecessarily
- Forget about function scope and closures
- Mutate parameters unless clearly intended
- Create side effects without documenting them
- Mix different function styles inconsistently
- Overuse higher-order functions for simple operations
*/
