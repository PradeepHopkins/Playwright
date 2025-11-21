// =====================================================
// TYPESCRIPT OBJECTS & INTERFACES - COMPLETE STUDY GUIDE
// =====================================================
// Objects are collections of key-value pairs; Interfaces define the structure and types of objects.
// TypeScript uses interfaces for type safety, documentation, and compile-time validation.
// Topics: object creation, interfaces, type safety, inheritance, methods, and best practices.

// ----------------------------
// 1. BASIC OBJECTS - Creating and Accessing
// ----------------------------
// Definition: Collections of related properties and methods stored as key-value pairs.
// Syntax: const obj: Type = { key: value, key: value, ... }
// Features: Dynamic properties; methods; nested structures; type-safe with interfaces.
// Best for: Grouping related data; representing entities; organizing code.

console.log("\n--- 1. BASIC OBJECTS ---")
{
    // Simple object without interface
    const simpleObject = {
        name: "John",
        age: 30,
        city: "New York"
    }
    
    console.log("Simple object:", simpleObject)
    console.log("Accessing name:", simpleObject.name)
    console.log("Accessing age:", simpleObject.age)
    
    // Object with explicit type (type literal)
    const person: { firstName: string; lastName: string; age: number } = {
        firstName: "Alice",
        lastName: "Johnson",
        age: 25
    }
    
    console.log("Person:", person)
    console.log("Full name:", `${person.firstName} ${person.lastName}`)
}

// ----------------------------
// 2. INTERFACES - Defining Object Structure
// ----------------------------
// Definition: Blueprints that define the structure and types of objects.
// Syntax: interface InterfaceName { property: type; property: type; }
// Features: Type safety; documentation; compilation checking; no runtime overhead.
// Best for: Defining object shapes; ensuring consistency; API contracts.

console.log("\n--- 2. INTERFACES ---")
{
    // Basic interface
    interface User {
        id: number
        username: string
        email: string
    }
    
    const user1: User = {
        id: 1,
        username: "john_doe",
        email: "john@example.com"
    }
    
    console.log("User:", user1)
    
    // Another interface
    interface Product {
        productId: number
        title: string
        price: number
        inStock: boolean
    }
    
    const product: Product = {
        productId: 101,
        title: "Laptop",
        price: 999.99,
        inStock: true
    }
    
    console.log("Product:", product)
}

// ----------------------------
// 3. OPTIONAL & READONLY PROPERTIES
// ----------------------------
// Definition: Properties that may be optional (?) or cannot be modified (readonly).
// Syntax: property?: type (optional), readonly property: type (read-only)
// Features: Flexible object structures; immutability enforcement; safer designs.
// Best for: Optional configuration; preventing accidental mutations; flexible APIs.

console.log("\n--- 3. OPTIONAL & READONLY PROPERTIES ---")
{
    // Interface with optional properties
    interface StudentRecord {
        name: string
        studentId: number
        email?: string           // Optional
        phone?: string          // Optional
        gpa: number
    }
    
    const student1: StudentRecord = {
        name: "Bob",
        studentId: 101,
        gpa: 3.8
        // email and phone are optional
    }
    
    const student2: StudentRecord = {
        name: "Carol",
        studentId: 102,
        email: "carol@school.edu",
        phone: "555-1234",
        gpa: 3.9
    }
    
    console.log("Student 1:", student1)
    console.log("Student 2:", student2)
    
    // Readonly properties
    interface Configuration {
        readonly appName: string
        readonly version: string
        port: number
    }
    
    const config: Configuration = {
        appName: "MyApp",
        version: "1.0.0",
        port: 3000
    }
    
    console.log("Config:", config)
    config.port = 8080  // OK - port is not readonly
    // config.appName = "NewApp"  // ERROR - appName is readonly
    console.log("Updated port:", config.port)
}

// ----------------------------
// 4. NESTED OBJECTS & COMPLEX STRUCTURES
// ----------------------------
// Definition: Objects containing other objects or arrays as properties.
// Syntax: Properties can be interfaces, arrays of interfaces, or nested objects.
// Features: Hierarchical data; type safety at all levels; composition patterns.
// Best for: Complex data structures; API responses; hierarchical entities.

console.log("\n--- 4. NESTED OBJECTS ---")
{
    interface Address {
        street: string
        city: string
        zipcode: string
    }
    
    interface Company {
        name: string
        industry: string
        address: Address
    }
    
    const company: Company = {
        name: "Tech Corp",
        industry: "Software",
        address: {
            street: "123 Main St",
            city: "San Francisco",
            zipcode: "94102"
        }
    }
    
    console.log("Company:", company)
    console.log("Company address:", company.address)
    console.log("City:", company.address.city)
    
    // Array of objects
    interface TeamMember {
        name: string
        role: string
        yearsExperience: number
    }
    
    const team: TeamMember[] = [
        { name: "Alice", role: "Engineer", yearsExperience: 5 },
        { name: "Bob", role: "Designer", yearsExperience: 3 },
        { name: "Carol", role: "Manager", yearsExperience: 8 }
    ]
    
    console.log("Team members:", team)
    console.log("First member:", team[0])
}

// ----------------------------
// 5. OBJECT METHODS - Adding Functions to Objects
// ----------------------------
// Definition: Functions that belong to objects; operate on object data.
// Syntax: property: (param: type) => returnType or methodName(param: type): returnType
// Features: Encapsulation; state management; behavior bundling with data.
// Best for: Defining object behavior; data transformation; utility functions.

console.log("\n--- 5. OBJECT METHODS ---")
{
    interface Calculator {
        value: number
        add: (n: number) => void
        multiply: (n: number) => void
        getResult: () => number
    }
    
    const calculator: Calculator = {
        value: 0,
        add(n: number) {
            this.value += n
        },
        multiply(n: number) {
            this.value *= n
        },
        getResult() {
            return this.value
        }
    }
    
    calculator.add(10)
    console.log("After add(10):", calculator.value)
    calculator.multiply(2)
    console.log("After multiply(2):", calculator.value)
    console.log("Result:", calculator.getResult())
    
    // User object with methods
    interface Account {
        username: string
        balance: number
        deposit: (amount: number) => void
        withdraw: (amount: number) => boolean
    }
    
    const account: Account = {
        username: "john_doe",
        balance: 1000,
        deposit(amount: number) {
            this.balance += amount
            console.log(`Deposited $${amount}. New balance: $${this.balance}`)
        },
        withdraw(amount: number) {
            if (amount <= this.balance) {
                this.balance -= amount
                console.log(`Withdrew $${amount}. New balance: $${this.balance}`)
                return true
            }
            console.log("Insufficient funds")
            return false
        }
    }
    
    account.deposit(500)
    account.withdraw(200)
    account.withdraw(5000)  // Fails
}

// ----------------------------
// 6. INTERFACE INHERITANCE - extends
// ----------------------------
// Definition: Creating interfaces that extend other interfaces (inheritance).
// Syntax: interface Child extends Parent { newProperties }
// Features: Code reuse; hierarchy; specialization; type composition.
// Best for: Creating specialized types; avoiding duplication; designing APIs.

console.log("\n--- 6. INTERFACE INHERITANCE ---")
{
    // Base interface
    interface BaseEntity {
        id: number
        createdAt: Date
        updatedAt: Date
    }
    
    // Extend base interface
    interface User extends BaseEntity {
        username: string
        email: string
    }
    
    // Further specialization
    interface Admin extends User {
        role: "admin"
        permissions: string[]
    }
    
    const admin: Admin = {
        id: 1,
        username: "admin_user",
        email: "admin@example.com",
        role: "admin",
        permissions: ["read", "write", "delete"],
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date()
    }
    
    console.log("Admin object:", admin)
    console.log("Admin permissions:", admin.permissions)
    
    // Multiple inheritance
    interface Timestamped {
        createdAt: Date
        updatedAt: Date
    }
    
    interface Named {
        firstName: string
        lastName: string
    }
    
    interface Employee extends Timestamped, Named {
        employeeId: number
        department: string
    }
    
    const employee: Employee = {
        firstName: "John",
        lastName: "Smith",
        employeeId: 12345,
        department: "Engineering",
        createdAt: new Date(),
        updatedAt: new Date()
    }
    
    console.log("Employee:", employee)
}

// ----------------------------
// 7. DISCRIMINATED UNIONS - Type Safety with Variants
// ----------------------------
// Definition: Unions of interfaces with a common discriminator property.
// Syntax: type UnionType = Interface1 | Interface2; checked with discriminator
// Features: Type-safe pattern matching; compile-time checking; exhaustiveness checking.
// Best for: State machines; variant types; API responses; error handling.

console.log("\n--- 7. DISCRIMINATED UNIONS ---")
{
    interface SuccessResponse {
        status: "success"
        data: { id: number; name: string }
    }
    
    interface ErrorResponse {
        status: "error"
        error: string
    }
    
    interface LoadingResponse {
        status: "loading"
    }
    
    type ApiResponse = SuccessResponse | ErrorResponse | LoadingResponse
    
    const handleResponse = (response: ApiResponse) => {
        switch (response.status) {
            case "success":
                console.log("Success:", response.data)
                break
            case "error":
                console.log("Error:", response.error)
                break
            case "loading":
                console.log("Loading...")
                break
        }
    }
    
    const response1: ApiResponse = {
        status: "success",
        data: { id: 1, name: "Product" }
    }
    
    const response2: ApiResponse = {
        status: "error",
        error: "Network timeout"
    }
    
    handleResponse(response1)
    handleResponse(response2)
}

// ----------------------------
// 8. TYPE ALIASES vs INTERFACES
// ----------------------------
// Definition: Type aliases (type) and Interfaces (interface) define object shapes.
// Syntax: type TypeName = { ... }; interface InterfaceName { ... }
// Features: Both support objects; interfaces support inheritance; types are more flexible.
// Best for: Use interfaces for objects/classes; types for unions/primitives.

console.log("\n--- 8. TYPE ALIASES vs INTERFACES ---")
{
    // Type alias
    type PersonType = {
        name: string
        age: number
    }
    
    // Interface
    interface PersonInterface {
        name: string
        age: number
    }
    
    const person1: PersonType = { name: "Alice", age: 30 }
    const person2: PersonInterface = { name: "Bob", age: 25 }
    
    console.log("Person from type:", person1)
    console.log("Person from interface:", person2)
    
    // Type alias with union
    type Status = "active" | "inactive" | "pending"
    
    interface UserWithStatus {
        username: string
        status: Status
    }
    
    const user: UserWithStatus = {
        username: "john",
        status: "active"
    }
    
    console.log("User with status:", user)
}

// ----------------------------
// 9. PRACTICAL EXAMPLES - Real-World Object Usage
// ----------------------------

console.log("\n--- 9. PRACTICAL EXAMPLES ---")
{
    // Example 1: E-commerce product catalog
    interface Rating {
        stars: number
        count: number
    }
    
    interface Inventory {
        total: number
        inStock: number
    }
    
    interface Product {
        id: number
        name: string
        price: number
        rating: Rating
        inventory: Inventory
    }
    
    const product: Product = {
        id: 1,
        name: "Wireless Mouse",
        price: 29.99,
        rating: { stars: 4.5, count: 128 },
        inventory: { total: 500, inStock: 350 }
    }
    
    console.log("Product:", product)
    console.log(`${product.name}: $${product.price} (${product.rating.stars}★)`)
    
    // Example 2: User authentication
    interface LoginCredentials {
        email: string
        password: string
    }
    
    interface AuthToken {
        token: string
        expiresIn: number
    }
    
    interface AuthResult {
        success: boolean
        message: string
        token?: AuthToken
    }
    
    const authenticate = (credentials: LoginCredentials): AuthResult => {
        if (credentials.email === "user@example.com" && credentials.password === "pass123") {
            return {
                success: true,
                message: "Authentication successful",
                token: {
                    token: "eyJhbGc...",
                    expiresIn: 3600
                }
            }
        }
        return {
            success: false,
            message: "Invalid credentials"
        }
    }
    
    const result = authenticate({ email: "user@example.com", password: "pass123" })
    console.log("Auth result:", result)
    
    // Example 3: Blog post system
    interface Author {
        id: number
        name: string
        email: string
    }
    
    interface BlogPost {
        id: number
        title: string
        content: string
        author: Author
        tags: string[]
        published: boolean
        createdAt: Date
    }
    
    const blogPost: BlogPost = {
        id: 1,
        title: "Introduction to TypeScript",
        content: "TypeScript is a typed superset of JavaScript...",
        author: {
            id: 101,
            name: "Jane Doe",
            email: "jane@blog.com"
        },
        tags: ["typescript", "programming", "tutorial"],
        published: true,
        createdAt: new Date("2024-01-15")
    }
    
    console.log("Blog post:", blogPost)
    console.log(`"${blogPost.title}" by ${blogPost.author.name}`)
}

/*
BEST PRACTICES
✅ DO:
- Use interfaces to define object shapes
- Name interfaces descriptively (User, Product, Config)
- Use extends for interface inheritance and code reuse
- Make properties readonly when they shouldn't change
- Use optional (?) for flexible properties
- Nest interfaces for related data (Address in Company)
- Use discriminated unions for variant types
- Document complex interfaces with comments
- Prefer interfaces over inline object types
- Keep interfaces focused and single-responsibility

❌ DON'T:
- Use any type for object properties (defeats type safety)
- Create deeply nested interface hierarchies (prefer composition)
- Mix interfaces and classes without reason (choose one pattern)
- Use interface names that don't describe the data (I-prefix, etc.)
- Make everything optional (defeats type safety)
- Mutate readonly properties (defeats immutability)
- Create overly large interfaces (split into smaller ones)
- Use string/number indices unnecessarily (use mapped types instead)
- Forget to handle all discriminator cases in unions
- Duplicate interface properties (use inheritance/extends)
*/
