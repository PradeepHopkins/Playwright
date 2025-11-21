// =====================================================
// JAVASCRIPT CLASSES & OBJECTS - COMPLETE STUDY GUIDE
// =====================================================
// Classes are blueprints for creating objects; Objects are instances of classes.
// JavaScript ES6+ classes provide structured OOP patterns with constructors, methods, and inheritance.
// Topics: class declaration, constructors, properties, methods, inheritance, static members, and best practices.

// ----------------------------
// 1. CLASS DECLARATION - Basic Structure
// ----------------------------
// Definition: Classes are templates that define the structure and behavior of objects.
// Syntax: class ClassName { constructor() { } method() { } }
// Features: Constructor for initialization; methods for behavior; encapsulation.
// Best for: Organizing code; creating reusable templates; object-oriented programming.

console.log("\n--- 1. CLASS DECLARATION ---")
{
    // Basic class definition
    class Animal {
        constructor(name, type) {
            this.name = name
            this.type = type
        }

        describe() {
            return `${this.name} is a ${this.type}`
        }
    }

    // Creating objects from class
    const dog = new Animal("Buddy", "Dog")
    const cat = new Animal("Whiskers", "Cat")

    console.log(dog.describe())
    console.log(cat.describe())
    console.log("Dog name:", dog.name)
}

// ----------------------------
// 2. CONSTRUCTORS - Initializing Objects
// ----------------------------
// Definition: Special method called when creating an object; initializes properties.
// Syntax: constructor(param1, param2) { this.prop = param }
// Features: Runs automatically on instantiation; sets up initial state; only one per class.
// Best for: Initialization; setting default values; parameter validation.

console.log("\n--- 2. CONSTRUCTORS ---")
{
    class Person {
        constructor(firstName, lastName, age) {
            this.firstName = firstName
            this.lastName = lastName
            this.age = age
            this.email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`
        }

        getFullName() {
            return `${this.firstName} ${this.lastName}`
        }
    }

    const person1 = new Person("John", "Doe", 30)
    const person2 = new Person("Jane", "Smith", 25)

    console.log("Person 1:", person1.getFullName(), "Age:", person1.age)
    console.log("Person 1 Email:", person1.email)
    console.log("Person 2:", person2.getFullName(), "Age:", person2.age)
}

// ----------------------------
// 3. INSTANCE PROPERTIES - Object State
// ----------------------------
// Definition: Variables that belong to individual objects; each instance has its own.
// Syntax: this.propertyName = value
// Features: Store object state; unique per instance; access via dot notation.
// Best for: Storing data; representing object state; instance-specific values.

console.log("\n--- 3. INSTANCE PROPERTIES ---")
{
    class BankAccount {
        constructor(accountHolder, initialBalance) {
            this.accountHolder = accountHolder
            this.balance = initialBalance
            this.transactions = []
        }

        deposit(amount) {
            this.balance += amount
            this.transactions.push(`Deposit: +$${amount}`)
            console.log(`Deposited $${amount}. New balance: $${this.balance}`)
        }

        withdraw(amount) {
            if (amount <= this.balance) {
                this.balance -= amount
                this.transactions.push(`Withdrawal: -$${amount}`)
                console.log(`Withdrew $${amount}. New balance: $${this.balance}`)
            } else {
                console.log("Insufficient funds")
            }
        }

        showStatement() {
            console.log(`\nStatement for ${this.accountHolder}:`)
            this.transactions.forEach(t => console.log(`  ${t}`))
            console.log(`  Current balance: $${this.balance}`)
        }
    }

    const account = new BankAccount("Alice Johnson", 1000)
    account.deposit(500)
    account.withdraw(200)
    account.showStatement()
}

// ----------------------------
// 4. INSTANCE METHODS - Object Behavior
// ----------------------------
// Definition: Functions that belong to objects; operate on instance properties.
// Syntax: methodName(param) { }
// Features: Access `this`; modify state; perform actions; called on instances.
// Best for: Defining behavior; state manipulation; business logic.

console.log("\n--- 4. INSTANCE METHODS ---")
{
    class Calculator {
        constructor() {
            this.result = 0
        }

        add(num) {
            this.result += num
            return this
        }

        subtract(num) {
            this.result -= num
            return this
        }

        multiply(num) {
            this.result *= num
            return this
        }

        getResult() {
            return this.result
        }

        reset() {
            this.result = 0
            return this
        }
    }

    const calc = new Calculator()
    calc.add(10).multiply(2).subtract(5)
    console.log("Result:", calc.getResult())

    calc.reset().add(100).subtract(25)
    console.log("After reset:", calc.getResult())
}

// ----------------------------
// 5. OBJECT INSTANTIATION - Creating Instances
// ----------------------------
// Definition: Creating individual objects from a class using `new` keyword.
// Syntax: const object = new ClassName(arguments)
// Features: Calls constructor; creates unique instance; sets up all properties.
// Best for: Creating multiple related objects; managing collections; data representation.

console.log("\n--- 5. OBJECT INSTANTIATION ---")
{
    class Student {
        constructor(id, name, grade) {
            this.id = id
            this.name = name
            this.grade = grade
            this.enrolled = true
        }

        studyHours(hours) {
            console.log(`${this.name} studied for ${hours} hours`)
        }
    }

    // Creating multiple instances
    const students = [
        new Student(101, "Alice", "A"),
        new Student(102, "Bob", "B"),
        new Student(103, "Charlie", "A"),
    ]

    console.log("Students enrolled:")
    students.forEach(student => {
        console.log(`  ${student.id}: ${student.name} (Grade ${student.grade})`)
        student.studyHours(2)
    })
}

// ----------------------------
// 6. INHERITANCE - Extending Classes
// ----------------------------
// Definition: Creating new classes based on existing ones; `extends` for parent class.
// Syntax: class Child extends Parent { }; super() in constructor
// Features: Code reuse; method overriding; parent functionality; hierarchy.
// Best for: Creating specialized classes; avoiding duplication; modeling relationships.

console.log("\n--- 6. INHERITANCE ---")
{
    // Parent class
    class Vehicle {
        constructor(brand, model) {
            this.brand = brand
            this.model = model
            this.isRunning = false
        }

        start() {
            this.isRunning = true
            console.log(`${this.brand} ${this.model} started`)
        }

        stop() {
            this.isRunning = false
            console.log(`${this.brand} ${this.model} stopped`)
        }
    }

    // Child class inheriting from Vehicle
    class Car extends Vehicle {
        constructor(brand, model, doors) {
            super(brand, model)  // Call parent constructor
            this.doors = doors
        }

        honk() {
            console.log(`${this.brand} ${this.model} goes honk! 🚗`)
        }
    }

    const myCar = new Car("Toyota", "Camry", 4)
    myCar.start()
    myCar.honk()
    myCar.stop()
}

// ----------------------------
// 7. STATIC MEMBERS - Class-Level Properties & Methods
// ----------------------------
// Definition: Properties and methods that belong to the class itself, not instances.
// Syntax: static propertyName = value; static methodName() { }
// Features: Shared across all instances; called on class, not object; no `this`.
// Best for: Utility functions; shared counters; factory methods; constants.

console.log("\n--- 7. STATIC MEMBERS ---")
{
    class User {
        static userCount = 0
        static role = "User"

        constructor(name) {
            this.name = name
            User.userCount++
        }

        static getTotalUsers() {
            return User.userCount
        }

        static createAdmin(name) {
            const admin = new User(name)
            admin.isAdmin = true
            return admin
        }
    }

    const user1 = new User("Alice")
    const user2 = new User("Bob")
    const admin = User.createAdmin("Charlie")

    console.log("Total users:", User.getTotalUsers())
    console.log("User role (static):", User.role)
    console.log("Admin object:", admin.name, "Is Admin:", admin.isAdmin)
}

// ----------------------------
// 8. GETTERS & SETTERS - Controlled Property Access
// ----------------------------
// Definition: Special methods for getting and setting property values with logic.
// Syntax: get propertyName() { } and set propertyName(value) { }
// Features: Control property access; validation; computed values; privacy patterns.
// Best for: Validation; computed properties; side effects on property change; encapsulation.

console.log("\n--- 8. GETTERS & SETTERS ---")
{
    class Temperature {
        constructor(celsius) {
            this._celsius = celsius  // Private convention: leading underscore
        }

        get celsius() {
            return this._celsius
        }

        set celsius(value) {
            if (value < -273.15) {
                console.log("Invalid temperature (below absolute zero)")
                return
            }
            this._celsius = value
        }

        get fahrenheit() {
            return (this._celsius * 9/5) + 32
        }

        set fahrenheit(value) {
            this._celsius = (value - 32) * 5/9
        }
    }

    const temp = new Temperature(25)
    console.log("Celsius:", temp.celsius)
    console.log("Fahrenheit:", temp.fahrenheit.toFixed(2))

    temp.fahrenheit = 86
    console.log("After setting to 86°F:")
    console.log("  Celsius:", temp.celsius.toFixed(2))
    console.log("  Fahrenheit:", temp.fahrenheit.toFixed(2))
}

// ----------------------------
// 9. PRACTICAL EXAMPLES - Real-World Class Usage
// ----------------------------

console.log("\n--- 9. PRACTICAL EXAMPLES ---")
{
    // Example 1: Product Management System
    class Product {
        constructor(id, name, price, stock) {
            this.id = id
            this.name = name
            this.price = price
            this.stock = stock
        }

        getInfo() {
            return `${this.name} - $${this.price} (Stock: ${this.stock})`
        }

        inStock() {
            return this.stock > 0
        }
    }

    const products = [
        new Product(1, "Laptop", 999.99, 5),
        new Product(2, "Mouse", 29.99, 50),
        new Product(3, "Keyboard", 79.99, 0)
    ]

    console.log("Product Inventory:")
    products.forEach(product => {
        console.log(`  ${product.getInfo()} - ${product.inStock() ? "Available" : "Out of Stock"}`)
    })

    // Example 2: Todo List with Tasks
    class TodoList {
        constructor(name) {
            this.name = name
            this.tasks = []
        }

        addTask(task) {
            this.tasks.push({ text: task, completed: false })
            console.log(`Added: ${task}`)
        }

        completeTask(index) {
            if (this.tasks[index]) {
                this.tasks[index].completed = true
                console.log(`Completed: ${this.tasks[index].text}`)
            }
        }

        showTasks() {
            console.log(`\n${this.name} Tasks:`)
            this.tasks.forEach((task, i) => {
                const status = task.completed ? "✓" : "○"
                console.log(`  ${status} ${task.text}`)
            })
        }
    }

    const myTodo = new TodoList("My Tasks")
    myTodo.addTask("Learn JavaScript Classes")
    myTodo.addTask("Build a project")
    myTodo.addTask("Practice OOP")
    myTodo.completeTask(0)
    myTodo.showTasks()
}

/*
BEST PRACTICES:
✅ DO:
- Use descriptive class names (PascalCase: User, BankAccount, etc.)
- Initialize all properties in constructor
- Use meaningful method names (getName, setBalance, etc.)
- Return `this` from setter methods to enable method chaining
- Use inheritance (extends) to avoid code duplication
- Use static for utility functions and shared data
- Document complex classes with comments
- Keep classes focused on single responsibility
- Use getters/setters for property validation
- Validate input in constructors and setters

❌ DON'T:
- Use lowercase class names (use PascalCase)
- Create overly large classes (split into smaller ones)
- Mutate object properties without validation
- Use `var` keyword (use `const`/`let`)
- Forget to call `super()` in child constructors
- Mix static and instance logic unnecessarily
- Create deeply nested class hierarchies
- Use getter/setter for simple properties (use direct access)
- Modify constructor parameters without clear reason
- Create classes with too many responsibilities
*/
