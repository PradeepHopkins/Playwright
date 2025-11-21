// =====================================================
// TYPESCRIPT STRINGS - COMPLETE STUDY GUIDE
// =====================================================
// Strings are sequences of characters used to represent text data.
// TypeScript provides built-in string methods for manipulation and formatting.
// Topics: concatenation, template literals, string methods, arrays, and best practices.

// ----------------------------
// 1. STRING DECLARATION & TYPES
// ----------------------------
// Definition: Strings are immutable sequences of characters.
// Syntax: const variable: string = "value" or 'value' or `value`
// Features: Single/double quotes equivalent; template literals for interpolation.
// Best for: Text data; messages; labels; identifiers.

console.log("\n--- 1. STRING DECLARATION ---")
{
    // Different ways to declare strings
    const singleQuote: string = 'Hello'
    const doubleQuote: string = "World"
    const backtick: string = `Both work!`
    
    console.log(`Single: ${singleQuote}`)
    console.log(`Double: ${doubleQuote}`)
    console.log(`Backtick: ${backtick}`)
}

// ----------------------------
// 2. STRING CONCATENATION - Traditional Approach
// ----------------------------
// Definition: Combining multiple strings using the + operator.
// Syntax: string1 + string2 + string3
// Features: Works with any value type; automatic type coercion.
// Best for: Simple string combinations (use template literals for readability).

console.log("\n--- 2. STRING CONCATENATION ---")
{
    const price: number = 50
    const itemName: string = "Cup"
    
    // Using + operator
    const messageToPrint: string = "The price for your " + itemName + " is " + price + " rupees"
    console.log(messageToPrint)
    
    // Concatenating different types
    const age: number = 25
    const name: string = "Alice"
    const message = "Name: " + name + ", Age: " + age
    console.log(message)
}

// ----------------------------
// 3. TEMPLATE LITERALS - Modern String Formatting
// ----------------------------
// Definition: Strings using backticks with ${} for variable interpolation.
// Syntax: `Text ${variable} more text`
// Features: Multi-line support; expressions inside ${}; cleaner syntax.
// Best for: String formatting with variables; preferred over concatenation.

console.log("\n--- 3. TEMPLATE LITERALS ---")
{
    const price: number = 50
    const itemName: string = "Cup"
    
    // Template literal with single variable
    const message: string = `The price for your ${itemName} is ${price} rupees`
    console.log(message)
    
    // Template literal with expressions
    const quantity: number = 3
    const total = quantity * price
    console.log(`Total: ${quantity} × ${price} = ${total} rupees`)
    
    // Multi-line template literals
    const receipt: string = `
Product: ${itemName}
Price: ${price} rupees
Quantity: ${quantity}
Total: ${total} rupees
Thank you for your purchase!`
    console.log(receipt)
}

// ----------------------------
// 4. STRING METHODS - Common Operations
// ----------------------------
// Definition: Built-in functions that operate on strings.
// Methods: length, toUpperCase, toLowerCase, includes, indexOf, trim, substring, replace, split, join
// Features: Non-destructive (strings are immutable); chainable operations.
// Best for: String manipulation; searching; formatting.

console.log("\n--- 4. STRING METHODS ---")
{
    const productName: string = "Coffee Machine"
    
    // Case conversion
    console.log(`Original: ${productName}`)
    console.log(`Uppercase: ${productName.toUpperCase()}`)
    console.log(`Lowercase: ${productName.toLowerCase()}`)
    
    // Length property
    console.log(`Length: ${productName.length}`)
    
    // String searching
    console.log(`Contains "Coffee": ${productName.includes("Coffee")}`)
    console.log(`Index of "Machine": ${productName.indexOf("Machine")}`)
    
    // Whitespace handling
    const withSpaces: string = "   Hello World   "
    console.log(`Original: "${withSpaces}"`)
    console.log(`Trimmed: "${withSpaces.trim()}"`)
    
    // Substring extraction
    console.log(`Substring(0,6): ${productName.substring(0, 6)}`)
    
    // String replacement
    console.log(`Replace Coffee→Tea: ${productName.replace("Coffee", "Tea")}`)
    
    // String splitting
    const words: string[] = productName.split(" ")
    console.log(`Split result:`, words)
}

// ----------------------------
// 5. WORKING WITH ARRAYS OF STRINGS
// ----------------------------
// Definition: Collections of string values with array methods.
// Methods: join, split, map, filter, sort, forEach
// Features: Array operations combined with string methods.
// Best for: Processing lists of strings; batch operations.

console.log("\n--- 5. ARRAYS OF STRINGS ---")
{
    // Array of strings
    const items: string[] = ['Coffee', 'Tea', 'Sugar', 'Milk']
    
    // Join: Convert array to string
    const itemList: string = items.join(', ')
    console.log(`Available items: ${itemList}`)
    
    // Join with different separator
    const pathItems: string[] = ['home', 'user', 'documents']
    const filePath: string = pathItems.join('/')
    console.log(`File path: ${filePath}`)
    
    // Map: Transform each string
    const upperItems = items.map((item) => item.toUpperCase())
    console.log(`Uppercase: ${upperItems.join(', ')}`)
    
    // Filter: Select specific strings
    const longItems = items.filter((item) => item.length > 3)
    console.log(`Items with length > 3:`, longItems)
    
    // Sort: Alphabetical order
    const sortedItems = [...items].sort()
    console.log(`Sorted:`, sortedItems)
}

// ----------------------------
// 6. PRACTICAL EXAMPLES - Real-World String Usage
// ----------------------------

console.log("\n--- 6. PRACTICAL EXAMPLES ---")
{
    // Example 1: Order receipt
    const orderData = {
        orderId: 12345,
        customer: "John Doe",
        items: ["Laptop", "Mouse", "Keyboard"],
        prices: [999, 29, 79]
    }
    
    console.log("Order Receipt:")
    console.log(`Order #${orderData.orderId}`)
    console.log(`Customer: ${orderData.customer}`)
    console.log(`Items: ${orderData.items.join(", ")}`)
    
    let totalPrice: number = 0
    for (let i = 0; i < orderData.prices.length; i++) {
        totalPrice += orderData.prices[i]
    }
    console.log(`Total: $${totalPrice.toFixed(2)}`)
    
    // Example 2: Email validation check
    const email: string = "user@example.com"
    const isValidEmail = email.includes("@") && email.includes(".")
    console.log(`\nEmail "${email}" is valid: ${isValidEmail}`)
    
    // Example 3: Password strength
    const password: string = "SecurePass123!"
    const hasUppercase = password !== password.toLowerCase()
    const hasNumbers = /\d/.test(password)
    const isStrong = password.length >= 12 && hasUppercase && hasNumbers
    console.log(`Password strength: ${isStrong ? "Strong" : "Weak"}`)
}

// ----------------------------
// 7. STRING FORMATTING - Number & Date Formatting
// ----------------------------
// Definition: Formatting strings with specific numeric and date values.
// Methods: toFixed(), padStart(), padEnd(), Number formatting with template literals
// Features: Number precision control; padding; date formatting.
// Best for: Currency; percentages; formatted output.

console.log("\n--- 7. STRING FORMATTING ---")
{
    // Number formatting with toFixed
    const price: number = 49.999
    console.log(`Price: $${price.toFixed(2)}`)  // Fixed 2 decimals
    
    // Percentage formatting
    const percentage: number = 0.85
    console.log(`Completion: ${(percentage * 100).toFixed(0)}%`)
    
    // Padding strings
    const padded: string = "5".padStart(3, "0")
    console.log(`Invoice #${padded}`)
    
    // Date formatting
    const today = new Date()
    const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
    console.log(`Today: ${dateStr}`)
}

/*
BEST PRACTICES:
✅ DO:
- Use template literals for string interpolation (cleaner, more readable)
- Use const for string variables that won't change
- Chain string methods for efficiency
- Use meaningful variable names for strings
- Use trim() to clean user input
- Validate string content before processing
- Use appropriate string methods (includes vs indexOf)
- Document expected string formats

❌ DON'T:
- Use concatenation with + for complex strings
- Mutate strings (they're immutable - create new ones)
- Forget to handle whitespace (use trim())
- Compare strings with == (use === for type safety)
- Use string methods without knowing return types
- Create deeply nested template literals
- Ignore special characters in strings
- Use var for string declarations (use const/let)
*/
