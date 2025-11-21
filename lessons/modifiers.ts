// =====================================================
// TYPESCRIPT ACCESS MODIFIERS - COMPLETE STUDY GUIDE
// =====================================================
// Access modifiers control the visibility of class properties and methods.
// TypeScript provides public, private, protected, and readonly modifiers for encapsulation.
// Topics: Public, Private, Protected, Readonly, Combinations, Practical Examples, Best Practices.

// ----------------------------
// 1. PUBLIC - Default Accessible Everywhere
// ----------------------------
// Definition: Public members are accessible from anywhere (inside and outside the class).
// Syntax: public propertyName: type or just propertyName: type (default)
// Features: Default access level; no restrictions; explicitly visible.
// Best for: API methods; properties meant for external use; public interfaces.

console.log("\n--- 1. PUBLIC MODIFIER ---")
{
    class Product {
        public id: number
        public name: string
        public price: number

        constructor(id: number, name: string, price: number) {
            this.id = id
            this.name = name
            this.price = price
        }

        public getInfo(): string {
            return `${this.name} - $${this.price}`
        }

        public applyDiscount(percent: number): number {
            return this.price * (1 - percent / 100)
        }
    }

    const product = new Product(1, "Laptop", 999.99)
    console.log("Product ID:", product.id)
    console.log("Product info:", product.getInfo())
    console.log("Discounted price (10%):", product.applyDiscount(10).toFixed(2))

    // Public properties can be accessed and modified from outside
    product.price = 899.99
    console.log("Updated price:", product.price)
}

// ----------------------------
// 2. PRIVATE - Only Accessible Within Class
// ----------------------------
// Definition: Private members are only accessible inside the class; hidden from outside.
// Syntax: private propertyName: type
// Features: Encapsulation; prevents external modification; data hiding.
// Best for: Internal implementation; sensitive data; preventing accidental changes.

console.log("\n--- 2. PRIVATE MODIFIER ---")
{
    class BankAccount {
        private accountNumber: string
        private balance: number
        private PIN: number

        constructor(accountNumber: string, initialBalance: number, pin: number) {
            this.accountNumber = accountNumber
            this.balance = initialBalance
            this.PIN = pin
        }

        private validatePIN(pin: number): boolean {
            return pin === this.PIN
        }

        public withdraw(amount: number, pin: number): boolean {
            if (!this.validatePIN(pin)) {
                console.log("Invalid PIN")
                return false
            }

            if (amount <= this.balance) {
                this.balance -= amount
                console.log(`Withdrew $${amount}. New balance: $${this.balance}`)
                return true
            } else {
                console.log("Insufficient funds")
                return false
            }
        }

        public getBalance(pin: number): number | null {
            if (!this.validatePIN(pin)) {
                console.log("Invalid PIN")
                return null
            }
            return this.balance
        }
    }

    const account = new BankAccount("ACC123456", 5000, 1234)
    console.log("Withdrawal with correct PIN:")
    account.withdraw(500, 1234)
    console.log("Withdrawal with incorrect PIN:")
    account.withdraw(100, 9999)
    console.log("Balance check:", account.getBalance(1234))

    // ❌ Cannot access private members from outside
    // account.balance = 999999  // Error: Property 'balance' is private
    // account.validatePIN(1234)  // Error: Property 'validatePIN' is private
}

// ----------------------------
// 3. PROTECTED - Accessible in Class & Subclasses
// ----------------------------
// Definition: Protected members are accessible within the class and its subclasses.
// Syntax: protected propertyName: type
// Features: Inheritance support; hidden from outside; shared among family classes.
// Best for: Base class properties; inherited functionality; parent-child relationships.

console.log("\n--- 3. PROTECTED MODIFIER ---")
{
    class Animal {
        protected name: string
        protected age: number
        protected species: string

        constructor(name: string, age: number, species: string) {
            this.name = name
            this.age = age
            this.species = species
        }

        protected describe(): string {
            return `${this.name} is a ${this.age}-year-old ${this.species}`
        }

        public info(): string {
            return this.describe()
        }
    }

    class Dog extends Animal {
        private breed: string

        constructor(name: string, age: number, breed: string) {
            super(name, age, "Dog")
            this.breed = breed
        }

        public fullInfo(): string {
            // Can access protected members from parent class
            return `${this.describe()} (Breed: ${this.breed})`
        }

        public changeName(newName: string): void {
            this.name = newName
        }
    }

    const dog = new Dog("Buddy", 5, "Golden Retriever")
    console.log("Dog info:", dog.info())
    console.log("Dog full info:", dog.fullInfo())
    dog.changeName("Max")
    console.log("After rename:", dog.fullInfo())

    // ❌ Cannot access protected members from outside
    // dog.name = "Charlie"  // Error: Property 'name' is protected
    // dog.describe()  // Error: Property 'describe' is protected
}

// ----------------------------
// 4. READONLY - Immutable Properties
// ----------------------------
// Definition: Readonly properties can be set during initialization but not modified afterward.
// Syntax: readonly propertyName: type
// Features: Compile-time immutability; can be set in constructor; prevents accidental changes.
// Best for: Configuration; constants; IDs; timestamps; preventing modifications.

console.log("\n--- 4. READONLY MODIFIER ---")
{
    class User {
        readonly id: number
        readonly email: string
        readonly createdAt: Date
        name: string

        constructor(id: number, email: string, name: string) {
            this.id = id
            this.email = email
            this.name = name
            this.createdAt = new Date()
        }

        public updateName(newName: string): void {
            this.name = newName
            console.log(`Name updated to: ${this.name}`)
        }
    }

    const user = new User(101, "alice@example.com", "Alice")
    console.log("User ID:", user.id)
    console.log("User email:", user.email)
    console.log("Created at:", user.createdAt)
    console.log("Name:", user.name)

    user.updateName("Alice Smith")

    // ❌ Cannot modify readonly properties after initialization
    // user.id = 102  // Error: Cannot assign to readonly property 'id'
    // user.email = "newemail@example.com"  // Error: Cannot assign to readonly property 'email'
}

// ----------------------------
// 5. COMBINING MODIFIERS - Multiple Modifiers Together
// ----------------------------
// Definition: Modifiers can be combined (public/private/protected with readonly).
// Syntax: modifier1 modifier2 propertyName: type
// Features: Powerful encapsulation; fine-grained control; flexible access patterns.
// Best for: Complex classes; layered access control; mixed mutability requirements.

console.log("\n--- 5. COMBINING MODIFIERS ---")
{
    class SecureSettings {
        public readonly version: string = "1.0.0"
        public name: string
        private password: string
        private readonly secretKey: string = "SECRET_KEY_12345"
        protected readonly createDate: Date

        constructor(name: string, password: string) {
            this.name = name
            this.password = password
            this.createDate = new Date()
        }

        public updateName(newName: string): void {
            this.name = newName
        }

        public changePassword(oldPassword: string, newPassword: string): boolean {
            if (oldPassword === this.password) {
                this.password = newPassword
                console.log("Password changed successfully")
                return true
            } else {
                console.log("Old password incorrect")
                return false
            }
        }

        public getInfo(): string {
            return `Settings: ${this.name} (v${this.version})`
        }
    }

    class AdminSettings extends SecureSettings {
        public adminLevel: number

        constructor(name: string, password: string, adminLevel: number) {
            super(name, password)
            this.adminLevel = adminLevel
        }

        public getAdminInfo(): string {
            // Can access protected properties from parent
            return `${this.getInfo()} - Created: ${this.createDate} - Admin Level: ${this.adminLevel}`
        }
    }

    const settings = new SecureSettings("MyApp", "pass123")
    console.log("Version (public readonly):", settings.version)
    console.log("Info:", settings.getInfo())
    settings.changePassword("pass123", "newpass456")

    const adminSettings = new AdminSettings("AdminApp", "admin123", 5)
    console.log("Admin info:", adminSettings.getAdminInfo())

    // ❌ Cannot modify readonly properties
    // settings.version = "1.1.0"  // Error: Cannot assign to readonly property 'version'
}

// ----------------------------
// 6. PARAMETER PROPERTIES - Shorthand Modifier Syntax
// ----------------------------
// Definition: Declare and initialize properties directly in constructor parameters.
// Syntax: constructor(public/private/protected/readonly propertyName: type)
// Features: Reduces boilerplate; cleaner code; automatic initialization.
// Best for: Simple classes; reducing constructor code; DRY principle.

console.log("\n--- 6. PARAMETER PROPERTIES (SHORTHAND) ---")
{
    // Without parameter properties (verbose)
    class PersonVerbose {
        public firstName: string
        public lastName: string
        private age: number

        constructor(firstName: string, lastName: string, age: number) {
            this.firstName = firstName
            this.lastName = lastName
            this.age = age
        }
    }

    // With parameter properties (concise)
    class PersonConcise {
        constructor(
            public firstName: string,
            public lastName: string,
            private age: number
        ) {}

        public getFullName(): string {
            return `${this.firstName} ${this.lastName}`
        }

        public getAge(): number {
            return this.age
        }
    }

    const person = new PersonConcise("John", "Doe", 30)
    console.log("Full name:", person.getFullName())
    console.log("Age:", person.getAge())
    console.log("First name:", person.firstName)

    // ❌ Cannot access private age
    // console.log(person.age)  // Error: Property 'age' is private
}

// ----------------------------
// 7. GETTERS & SETTERS WITH MODIFIERS - Controlled Access
// ----------------------------
// Definition: Getter and setter methods provide controlled access to private properties.
// Syntax: get propertyName(): type { } and set propertyName(value: type) { }
// Features: Encapsulation; validation; computed properties; lazy loading.
// Best for: Property validation; computed values; side effects; data transformation.

console.log("\n--- 7. GETTERS & SETTERS WITH MODIFIERS ---")
{
    class Temperature {
        private _celsius: number

        constructor(celsius: number) {
            this._celsius = celsius
        }

        get celsius(): number {
            return this._celsius
        }

        set celsius(value: number) {
            if (value < -273.15) {
                console.log("Invalid temperature (below absolute zero)")
                return
            }
            this._celsius = value
        }

        get fahrenheit(): number {
            return (this._celsius * 9/5) + 32
        }

        set fahrenheit(value: number) {
            this._celsius = (value - 32) * 5/9
        }

        get kelvin(): number {
            return this._celsius + 273.15
        }
    }

    const temp = new Temperature(25)
    console.log("Celsius:", temp.celsius)
    console.log("Fahrenheit:", temp.fahrenheit.toFixed(2))
    console.log("Kelvin:", temp.kelvin.toFixed(2))

    temp.fahrenheit = 86
    console.log("\nAfter setting to 86°F:")
    console.log("Celsius:", temp.celsius.toFixed(2))
    console.log("Fahrenheit:", temp.fahrenheit.toFixed(2))

    // Attempting invalid temperature
    temp.celsius = -300
}

// ----------------------------
// 8. STATIC MEMBERS WITH MODIFIERS - Class-Level Access Control
// ----------------------------
// Definition: Static members can be public, private, or protected; belong to class itself.
// Syntax: static modifier propertyName: type
// Features: Shared across instances; class-level access control; no `this` required.
// Best for: Utility functions; shared counters; configuration; factory methods.

console.log("\n--- 8. STATIC MEMBERS WITH MODIFIERS ---")
{
    class Database {
        private static connections: number = 0
        public static readonly maxConnections: number = 10
        private static readonly secretKey: string = "DB_SECRET_KEY"

        private static validateKey(key: string): boolean {
            return key === Database.secretKey
        }

        public static connect(key: string): boolean {
            if (!Database.validateKey(key)) {
                console.log("Invalid database key")
                return false
            }

            if (Database.connections < Database.maxConnections) {
                Database.connections++
                console.log(`Connected. Active connections: ${Database.connections}`)
                return true
            } else {
                console.log("Max connections reached")
                return false
            }
        }

        public static disconnect(): void {
            if (Database.connections > 0) {
                Database.connections--
                console.log(`Disconnected. Active connections: ${Database.connections}`)
            }
        }

        public static getStats(): string {
            return `Connections: ${Database.connections}/${Database.maxConnections}`
        }
    }

    console.log("Max connections (public static readonly):", Database.maxConnections)
    Database.connect("DB_SECRET_KEY")
    Database.connect("DB_SECRET_KEY")
    console.log("Stats:", Database.getStats())
    Database.disconnect()
    console.log("Stats:", Database.getStats())

    // ❌ Cannot access private static members
    // Database.validateKey("key")  // Error: Property 'validateKey' is private
    // Database.secretKey  // Error: Property 'secretKey' is private
}

// ----------------------------
// 9. PRACTICAL EXAMPLES - Real-World Access Modifier Patterns
// ----------------------------

console.log("\n--- 9. PRACTICAL EXAMPLES ---")
{
    // Example 1: Shopping Cart with Protected Subtotals
    class ShoppingCart {
        protected items: { id: number; name: string; price: number; quantity: number }[] = []
        protected discountPercent: number = 0

        public addItem(id: number, name: string, price: number, quantity: number = 1): void {
            this.items.push({ id, name, price, quantity })
            console.log(`Added ${quantity}x ${name} to cart`)
        }

        protected getSubtotal(): number {
            return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }

        protected applyDiscount(percent: number): void {
            this.discountPercent = percent
        }

        public getTotal(): number {
            const subtotal = this.getSubtotal()
            return subtotal * (1 - this.discountPercent / 100)
        }

        public getCartSummary(): string {
            const subtotal = this.getSubtotal()
            const total = this.getTotal()
            return `Items: ${this.items.length} | Subtotal: $${subtotal.toFixed(2)} | Total: $${total.toFixed(2)}`
        }
    }

    class PremiumCart extends ShoppingCart {
        private membershipLevel: number

        constructor(membershipLevel: number) {
            super()
            this.membershipLevel = membershipLevel
        }

        public checkout(): void {
            const discount = this.membershipLevel * 5
            this.applyDiscount(discount)
            console.log(`Premium checkout - Discount applied: ${discount}%`)
            console.log(`Final total: $${this.getTotal().toFixed(2)}`)
        }
    }

    const cart = new PremiumCart(2)
    cart.addItem(1, "Book", 29.99, 2)
    cart.addItem(2, "Pen", 2.99, 5)
    console.log(cart.getCartSummary())
    cart.checkout()

    // Example 2: Logging System with Private State
    class Logger {
        private static readonly maxLogs: number = 100
        private static logs: string[] = []
        public readonly name: string

        constructor(name: string) {
            this.name = name
        }

        private static addLog(message: string): void {
            if (Logger.logs.length >= Logger.maxLogs) {
                Logger.logs.shift()
            }
            Logger.logs.push(message)
        }

        public info(message: string): void {
            Logger.addLog(`[${this.name}] INFO: ${message}`)
            console.log(`[${this.name}] ℹ️  ${message}`)
        }

        public error(message: string): void {
            Logger.addLog(`[${this.name}] ERROR: ${message}`)
            console.log(`[${this.name}] ❌ ${message}`)
        }

        public static getLogs(): string[] {
            return [...Logger.logs]
        }
    }

    const logger = new Logger("App")
    logger.info("Application started")
    logger.error("Configuration file not found")
    logger.info("Using default configuration")
    console.log("Total logs:", Logger.getLogs().length)
}

/*
BEST PRACTICES - Access Modifier Guidelines:
✅ DO:
- Default to private, expand to public/protected only when needed
- Use readonly for properties that shouldn't change after initialization
- Combine modifiers for fine-grained control (private readonly)
- Use parameter properties to reduce constructor boilerplate
- Use getters/setters for property validation and computed values
- Document public API clearly; keep implementation private
- Use protected for properties meant to be inherited
- Use static readonly for constants and configuration
- Leverage encapsulation for data integrity
- Test edge cases where modifiers prevent modifications

❌ DON'T:
- Make everything public (breaks encapsulation)
- Ignore readonly opportunities (allows accidental mutations)
- Use private when protected is needed for inheritance
- Over-complicate with unnecessary modifiers
- Expose internal implementation details
- Change modifiers carelessly (breaks consumer code)
- Use getters/setters for simple property access
- Mix conflicting modifiers (readonly + setter methods)
- Leave internal state unprotected
- Ignore type safety that modifiers provide

MODIFIER SELECTION GUIDE:
┌─────────────────────────────────────────────────────┐
│ Scope           │ Inside Class │ Subclasses │ Outside │
├─────────────────┼──────────────┼────────────┼─────────┤
│ public          │     ✅       │     ✅     │   ✅    │
│ protected       │     ✅       │     ✅     │   ❌    │
│ private         │     ✅       │     ❌     │   ❌    │
│ readonly        │ Set once     │ Set once   │ Read    │
└─────────────────────────────────────────────────────┘
*/
