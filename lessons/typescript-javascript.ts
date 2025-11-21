// =====================================================
// TYPESCRIPT VS JAVASCRIPT - COMPLETE STUDY GUIDE
// =====================================================
// TypeScript is a superset of JavaScript that adds static typing, interfaces, and compile-time checking.
// JavaScript is dynamically typed with runtime evaluation; TypeScript enforces types at compile time.
// Topics: Type System, Interfaces, Enums, Generics, Type Guards, Decorators, and Practical Examples.

// ----------------------------
// 1. TYPE SYSTEM - Static vs Dynamic Typing
// ----------------------------
// Definition: TypeScript enforces static types at compile time; JavaScript uses dynamic typing at runtime.
// Syntax (TS): let variable: type = value; (JS): let variable = value
// Features: TS type checking prevents errors; JS is more flexible but error-prone.
// Best for: TS for large projects; JS for scripts and prototypes.

console.log("\n--- 1. TYPE SYSTEM ---")
{
    // TypeScript: Static typing caught at compile time
    let tsName: string = "Alice"
    let tsAge: number = 25
    let tsActive: boolean = true
    let tsScores: number[] = [85, 90, 88]

    console.log("TypeScript variables:")
    console.log(`  Name: ${tsName} (type: string)`)
    console.log(`  Age: ${tsAge} (type: number)`)
    console.log(`  Active: ${tsActive} (type: boolean)`)
    console.log(`  Scores: ${tsScores.join(", ")} (type: number[])`)

    // JavaScript: Dynamic typing - no type declaration
    let jsName = "Bob"
    let jsAge = 30
    let jsActive = false
    let jsScores = [92, 88, 95]

    console.log("\nJavaScript variables (same values, no type annotations):")
    console.log(`  Name: ${jsName}`)
    console.log(`  Age: ${jsAge}`)
    console.log(`  Active: ${jsActive}`)
    console.log(`  Scores: ${jsScores.join(", ")}`)

    // TS catches type mismatches; JS allows them (runtime error potential)
    // tsAge = "twenty-five"  // ❌ TypeScript Error: Type 'string' not assignable to 'number'
    // jsAge = "thirty"        // ✅ JavaScript allows this (will cause errors later)
}

// ----------------------------
// 2. INTERFACES - TypeScript's Type Contracts
// ----------------------------
// Definition: Interfaces define the shape of objects; enforce structure and contracts.
// Syntax: interface InterfaceName { property: type; method(): type; }
// Features: TS-only feature; enforces object structure; enables code documentation.
// Best for: Defining object shapes; enforcing contracts; large codebases.

console.log("\n--- 2. INTERFACES ---")
{
    // TypeScript Interface (TS-only feature - doesn't exist in JS)
    interface User {
        id: number
        name: string
        email: string
        isActive: boolean
        role?: string  // Optional property
    }

    interface UserWithRole extends User {
        role: string
        permissions: string[]
    }

    const user: User = {
        id: 1,
        name: "Charlie",
        email: "charlie@example.com",
        isActive: true
    }

    const adminUser: UserWithRole = {
        id: 2,
        name: "Diana",
        email: "diana@example.com",
        isActive: true,
        role: "Admin",
        permissions: ["read", "write", "delete"]
    }

    console.log("User object (implements interface):", user)
    console.log("Admin user (extends interface):", adminUser)

    // In JavaScript, we use plain objects or type checking at runtime
    const jsUser = {
        id: 3,
        name: "Eve",
        email: "eve@example.com",
        isActive: true
    }
    console.log("JavaScript object (no interface enforcement):", jsUser)
}

// ----------------------------
// 3. ENUMS - Named Constants
// ----------------------------
// Definition: TypeScript Enums allow defining sets of named constants.
// Syntax: enum EnumName { VALUE1, VALUE2 }
// Features: TS-only; numeric or string enums; prevents invalid values.
// Best for: Representing fixed sets of values; status codes; modes.

console.log("\n--- 3. ENUMS ---")
{
    // TypeScript Enum (TS-only feature)
    enum Status {
        Active = "ACTIVE",
        Inactive = "INACTIVE",
        Pending = "PENDING",
        Suspended = "SUSPENDED"
    }

    enum Priority {
        Low = 1,
        Medium = 2,
        High = 3,
        Critical = 4
    }

    interface Task {
        title: string
        status: Status
        priority: Priority
    }

    const tasks: Task[] = [
        { title: "Learn TypeScript", status: Status.Active, priority: Priority.High },
        { title: "Write tests", status: Status.Pending, priority: Priority.Medium },
        { title: "Deploy app", status: Status.Active, priority: Priority.Critical }
    ]

    console.log("Tasks with Enums:")
    tasks.forEach(task => {
        console.log(`  ${task.title}: ${task.status} (Priority: ${task.priority})`)
    })

    // JavaScript equivalent: using constants (not enums)
    const jsStatus = {
        ACTIVE: "ACTIVE",
        INACTIVE: "INACTIVE",
        PENDING: "PENDING",
        SUSPENDED: "SUSPENDED"
    }

    const jsTasks = [
        { title: "Learn JavaScript", status: jsStatus.ACTIVE, priority: 3 }
    ]
    console.log("\nJavaScript equivalent (using object constants):", jsTasks[0])
}

// ----------------------------
// 4. GENERICS - Type Flexibility & Reusability
// ----------------------------
// Definition: Generics allow functions/classes to work with multiple types while maintaining type safety.
// Syntax: function func<T>(arg: T): T { }; class Generic<T> { }
// Features: Type-safe reusability; avoids repetition; compile-time checking.
// Best for: Reusable utilities; generic data structures; avoiding `any` type.

console.log("\n--- 4. GENERICS ---")
{
    // TypeScript Generics
    function identity<T>(arg: T): T {
        return arg
    }

    function getArrayLength<T>(arr: T[]): number {
        return arr.length
    }

    function filterByProperty<T>(items: T[], key: keyof T, value: any): T[] {
        return items.filter(item => item[key] === value)
    }

    interface Container<T> {
        value: T
        getValue(): T
    }

    const stringContainer: Container<string> = {
        value: "Hello TypeScript",
        getValue() {
            return this.value
        }
    }

    const numberContainer: Container<number> = {
        value: 42,
        getValue() {
            return this.value
        }
    }

    console.log("Generic identity function:")
    console.log(`  String: ${identity("TypeScript")}`)
    console.log(`  Number: ${identity(100)}`)
    console.log(`  Boolean: ${identity(true)}`)

    console.log("\nGeneric array length:", getArrayLength([1, 2, 3, 4, 5]))

    const people = [
        { name: "Frank", age: 28 },
        { name: "Grace", age: 28 },
        { name: "Henry", age: 35 }
    ]
    const sameAge = filterByProperty(people, "age", 28)
    console.log("People age 28:", sameAge)

    console.log("\nGeneric containers:")
    console.log(`  String container: ${stringContainer.getValue()}`)
    console.log(`  Number container: ${numberContainer.getValue()}`)

    // JavaScript doesn't have generics - must use loose typing
    function jsIdentity(arg: any) {
        return arg
    }
    console.log("\nJavaScript equivalent (no type safety):", jsIdentity("Any value"))
}

// ----------------------------
// 5. TYPE GUARDS - Runtime Type Checking
// ----------------------------
// Definition: TypeScript techniques to narrow types within code blocks.
// Syntax: typeof, instanceof, in operator, custom type predicates
// Features: Ensures type safety at runtime; prevents type errors; type narrowing.
// Best for: Handling union types; checking object properties; safe type access.

console.log("\n--- 5. TYPE GUARDS ---")
{
    // Union type requiring type guards
    type Input = string | number | boolean

    function processInput(input: Input): void {
        if (typeof input === "string") {
            console.log(`String length: ${input.length}`)
        } else if (typeof input === "number") {
            console.log(`Number doubled: ${input * 2}`)
        } else if (typeof input === "boolean") {
            console.log(`Boolean value: ${input}`)
        }
    }

    processInput("Hello")
    processInput(42)
    processInput(true)

    // instanceof guard for classes
    class Dog {
        bark(): string {
            return "Woof!"
        }
    }

    class Cat {
        meow(): string {
            return "Meow!"
        }
    }

    function makeSound(animal: Dog | Cat): void {
        if (animal instanceof Dog) {
            console.log(animal.bark())
        } else if (animal instanceof Cat) {
            console.log(animal.meow())
        }
    }

    makeSound(new Dog())
    makeSound(new Cat())

    // Custom type predicate
    interface Admin {
        role: "admin"
        permissions: string[]
    }

    interface User {
        role: "user"
        username: string
    }

    function isAdmin(user: Admin | User): user is Admin {
        return user.role === "admin"
    }

    const user1: User = { role: "user", username: "alice" }
    const user2: Admin = { role: "admin", permissions: ["read", "write"] }

    console.log(`\nUser 1 is admin: ${isAdmin(user1)}`)
    console.log(`User 2 is admin: ${isAdmin(user2)}`)

    // JavaScript requires manual checks (no type guards)
    function jsProcessInput(input: any) {
        if (typeof input === "string") {
            console.log(`JS String length: ${input.length}`)
        } else if (typeof input === "number") {
            console.log(`JS Number doubled: ${input * 2}`)
        }
    }
    jsProcessInput("JavaScript")
}

// ----------------------------
// 6. DECORATORS - Function/Class Enhancement (Experimental)
// ----------------------------
// Definition: Decorators are functions that modify classes or methods (experimental TS feature).
// Syntax: @decoratorName applied above class/method
// Features: Metadata attachment; aspect-oriented programming; clean separation.
// Best for: Logging; validation; timing; authentication; framework integration.

console.log("\n--- 6. DECORATORS (EXPERIMENTAL) ---")
{
    // Decorator pattern explained (TypeScript experimental feature - requires config)
    console.log("Decorators are an experimental TypeScript feature used in frameworks like Angular/NestJS")
    
    // Example concept - not executed due to strict compiler settings
    function Logged(target: any, propertyKey: string) {
        console.log(`  Method logged: ${propertyKey}`)
    }

    function Timed(target: any, propertyKey: string) {
        console.log(`  Method timed: ${propertyKey}`)
    }

    // Example usage pattern (conceptual)
    console.log("\nDecorator usage pattern:")
    console.log(`
    @Logged
    @Timed
    myMethod() {
        // Implementation
    }
    `)

    // Practical alternative: Higher-order functions
    function withLogging(fn: Function) {
        return function (...args: any[]) {
            console.log(`  [LOG] Calling function with args:`, args)
            return fn(...args)
        }
    }

    function add(a: number, b: number): number {
        return a + b
    }

    const loggedAdd = withLogging(add)
    console.log("Higher-order function alternative:")
    loggedAdd(5, 3)

    // JavaScript doesn't have decorators (JavaScript proposal, not standard)
    console.log("\nJavaScript doesn't have built-in decorators (uses manual wrapping or proposals)")
}

// ----------------------------
// 7. ACCESS MODIFIERS - Encapsulation
// ----------------------------
// Definition: TypeScript keywords (public, private, protected) control property/method visibility.
// Syntax: public/private/protected propertyName: type
// Features: TS-only; enforces encapsulation; prevents accidental access.
// Best for: OOP principles; data hiding; API design.

console.log("\n--- 7. ACCESS MODIFIERS ---")
{
    class BankAccount {
        private balance: number  // Only accessible within class
        protected accountNumber: string  // Accessible in subclasses
        public accountHolder: string  // Publicly accessible

        constructor(holder: string, number: string, initialBalance: number) {
            this.accountHolder = holder
            this.accountNumber = number
            this.balance = initialBalance
        }

        public getBalance(): number {
            return this.balance
        }

        private validateAmount(amount: number): boolean {
            return amount > 0 && amount <= this.balance
        }

        public withdraw(amount: number): boolean {
            if (this.validateAmount(amount)) {
                this.balance -= amount
                console.log(`Withdrew $${amount}. New balance: $${this.balance}`)
                return true
            }
            console.log("Withdrawal failed")
            return false
        }
    }

    const account = new BankAccount("John Doe", "12345", 1000)
    console.log("Account holder:", account.accountHolder)
    console.log("Balance:", account.getBalance())
    account.withdraw(200)
    // account.balance = 999999  // ❌ TypeScript Error: Private property
    // account.validateAmount(100)  // ❌ TypeScript Error: Private method

    // JavaScript has no access modifiers - uses naming conventions
    class JsBankAccount {
        accountHolder: string
        private _accountNumber: string
        private _balance: number

        constructor(holder: string, number: string, initialBalance: number) {
            this.accountHolder = holder  // Public (convention)
            this._accountNumber = number  // Protected (convention)
            this._balance = initialBalance  // Private (convention)
        }

        getBalance() {
            return this._balance
        }
    }

    const jsAccount = new JsBankAccount("Jane Doe", "54321", 500)
    console.log("\nJavaScript account (no enforced access control):", jsAccount)
}

// ----------------------------
// 8. PRACTICAL EXAMPLES - TypeScript vs JavaScript Comparison
// ----------------------------

console.log("\n--- 8. PRACTICAL EXAMPLES ---")
{
    // Example 1: Data Processing with Type Safety
    interface DataRecord {
        id: number
        name: string
        value: number
        timestamp: Date
    }

    function processRecords(records: DataRecord[]): number {
        return records.reduce((sum, record) => sum + record.value, 0)
    }

    const records: DataRecord[] = [
        { id: 1, name: "Sale", value: 100, timestamp: new Date() },
        { id: 2, name: "Return", value: -25, timestamp: new Date() },
        { id: 3, name: "Sale", value: 150, timestamp: new Date() }
    ]

    console.log("Total value from records:", processRecords(records))

    // Example 2: API Response Handling
    interface ApiResponse<T> {
        status: number
        data: T
        error?: string
    }

    async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
        return {
            status: 200,
            data: {} as T
        }
    }

    console.log("Generic API response handler configured")

    // Example 3: Configuration with Readonly
    interface AppConfig {
        readonly apiUrl: string
        readonly version: string
        readonly maxRetries: number
    }

    const config: AppConfig = {
        apiUrl: "https://api.example.com",
        version: "1.0.0",
        maxRetries: 3
    }

    console.log("App config:", config)
    // config.apiUrl = "..."  // ❌ TypeScript Error: Cannot assign to readonly
}

/*
BEST PRACTICES:
✅ USE TYPESCRIPT WHEN:
- Large team projects (enforced types prevent bugs)
- Mission-critical applications (type safety ensures reliability)
- Long-term maintenance (self-documenting code via types)
- Complex data structures (interfaces prevent errors)
- Using TypeScript frameworks (Angular, NestJS, etc.)
- Need compile-time error checking (catch errors before runtime)
- Working with APIs (types define contracts)
- Building libraries (types enable better IDE support)

✅ USE JAVASCRIPT WHEN:
- Quick prototypes and scripts (faster to write)
- Small projects (overhead not justified)
- Learning fundamentals (simpler, fewer concepts)
- Browser scripting (native language of browsers)
- Performance-critical code (no compilation overhead)
- Rapid experimentation (immediate feedback)

❌ DON'T:
- Use `any` type excessively (defeats TypeScript purpose)
- Ignore compiler warnings (they catch real bugs)
- Over-engineer simple projects (complexity without benefit)
- Mix typed and untyped code inconsistently
- Skip type annotations (defeats type safety)
- Use TypeScript for trivial scripts (overhead not worth it)
*/

console.log("\n--- KEY DIFFERENCES SUMMARY ---")
console.log(`
1. TYPING:
   TypeScript: Static, compile-time type checking
   JavaScript: Dynamic, runtime type checking

2. FEATURES:
   TypeScript: Interfaces, Enums, Generics, Decorators, Access Modifiers
   JavaScript: Plain objects, no compile-time features

3. TOOLING:
   TypeScript: Compilation required; TSC compiler
   JavaScript: Runs directly in browser/Node.js

4. ERROR DETECTION:
   TypeScript: Caught before runtime (compile-time)
   JavaScript: Discovered at runtime (user-facing)

5. IDE SUPPORT:
   TypeScript: Excellent IntelliSense and autocomplete
   JavaScript: Limited without JSDoc comments

6. LEARNING CURVE:
   TypeScript: Steeper (adds type system concepts)
   JavaScript: Gentler (more forgiving)
`)
