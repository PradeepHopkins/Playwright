import { test } from "../utils/fixture"

// A URL Builder is a small utility whose job is to construct URLs safely, cleanly, and programmatically.
// Instead of manually concatenating strings like: base + path + '?' + key + '=' + value

test('Fluent Interface Design Test', async ({ api }) => {

    const url = api
        // .url('https://conduit-api.bondaracademy.com')
        .path('/api/articles')
        .param({ limit: 10, offset: 0 })
        .header({ Authorization: 'authToken' })

    console.log(url);
})


// 🧠 Why Do We Need a URL Builder?

// ❌ Manual URL building is bad:
// Hard to maintain
// Easy to break with extra/missing slashes
// Query params need encoding
// Harder to compose dynamically
// Becomes messy in tests or complex API clients

// ✔ URL Builder solves all of this
// Uses the native URL class (safe, consistent, encoded)
// Prevents double slashes:
// "https://api.com" + "/users" → "https://api.com/users"
// Avoids broken query strings
// Makes your code expressive and readable
