# Playwright Hooks Study Guide

## Overview
This guide explains Playwright hooks used in this codebase for API testing with the Conduit API. Hooks are special functions that run at specific times during test execution (before all tests, before each test, after tests, etc.).

---

## What Are Hooks?

Hooks are lifecycle methods that allow you to run code at specific points in your test suite:
- **Setup**: Initialize data, authenticate, prepare resources
- **Teardown**: Clean up resources, reset state
- **Isolation**: Ensure tests don't affect each other

---

## Hook Types in Playwright

### 1. `test.beforeAll()` - Run Once Before All Tests

**Purpose**: Execute setup code a single time before ANY test runs in the file.

**Syntax**:
```typescript
test.beforeAll('Setup Description', async ({ request }) => {
    // Setup code here
});
```

**Key Characteristics**:
- Runs only **once** per test file
- Runs **before** all tests
- Cannot access individual test data
- Perfect for shared initialization
- Receives fixtures like `{ request }` for API calls

**Real Example from `hooks.spec.ts`**:
```typescript
let authToken: string

test.beforeAll('Get Authorization for API', async ({ request }) => {
    const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "pradeepmathialagan.work@gmail.com", "password": "Playwright@2025" } }
    })
    const tokenResponseJson = await tokenResponse.json()
    authToken = 'Token ' + tokenResponseJson.user.token
});
```

**What This Does**:
- Makes ONE login request to get an authentication token
- Stores the token in a file-scoped variable
- All tests in the file can reuse this token without logging in multiple times
- More efficient than authenticating before each test

---

### 2. `test()` - The Actual Test

**Syntax**:
```typescript
test('Test Name', async ({ request }) => {
    // Test code here
});
```

**Real Example**:
```typescript
test('Delete Articles', async ({ request }) => {
    // Create an article
    const newArticlesResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: { "article": { "title": "Cricket_03", ... } },
        headers: { Authorization: authToken }
    })
    
    // Delete the article
    const deleteArticlesResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
        headers: { Authorization: authToken }
    })
    expect(deleteArticlesResponse.status()).toBe(204)
});
```

---

### 3. `test.afterAll()` - Run Once After All Tests

**Purpose**: Clean up resources after all tests complete.

**Syntax**:
```typescript
test.afterAll('Cleanup Description', async () => {
    // Cleanup code here
});
```

**When to Use**:
- Close database connections
- Delete test data
- Reset global state
- Collect logs

---

### 4. `test.beforeEach()` - Run Before Each Test

**Purpose**: Prepare the environment before each individual test.

**Syntax**:
```typescript
test.beforeEach('Setup for each test', async ({ page }) => {
    // This runs before EVERY test
});
```

**When to Use**:
- Navigate to a fresh page
- Clear browser cache
- Reset mock data
- Initialize test-specific variables

**Not Used in This Codebase**: The `hooks.spec.ts` file uses `beforeAll` instead because:
- All tests share the same authentication token
- Token doesn't change between tests
- More efficient than re-authenticating each time

---

### 5. `test.afterEach()` - Run After Each Test

**Purpose**: Clean up after each individual test.

**Syntax**:
```typescript
test.afterEach('Cleanup for each test', async ({ page }) => {
    // This runs after EVERY test
});
```

**When to Use**:
- Delete test-created resources
- Take screenshots on failure
- Log test results

---

## Fixtures in Hooks

Fixtures are objects provided by Playwright that give you access to specific tools:

### Common Fixtures:

| Fixture | Purpose | Example |
|---------|---------|---------|
| `request` | Make HTTP requests (API testing) | `await request.post(url, { data })` |
| `page` | Control browser page (UI testing) | `await page.goto(url)` |
| `context` | Control browser context | `await context.addCookies([...])` |
| `browser` | Control browser instance | `browser.contexts()` |

**Using Fixtures in Hooks**:
```typescript
test.beforeAll('Setup', async ({ request }) => {
    // request fixture is available
    const response = await request.get(url);
});

test('My test', async ({ page, request }) => {
    // Both fixtures available
    await page.goto(url);
    const api = await request.get(url);
});
```

---

## Real-World Pattern: Shared Authentication

This codebase uses `beforeAll` to solve a common problem:

### ❌ Without Hooks (Inefficient):
```typescript
test('Delete Articles', async ({ request }) => {
    // Login every single time
    const tokenResponse = await request.post(loginUrl, { ... })
    const authToken = ...
    // Then do the test
});

test('Create Articles', async ({ request }) => {
    // Login again
    const tokenResponse = await request.post(loginUrl, { ... })
    const authToken = ...
    // Then do the test
});
```

**Problem**: Each test logs in separately (wastes time and API calls)

### ✅ With `beforeAll` Hook (Efficient):
```typescript
let authToken: string

test.beforeAll('Get Authorization for API', async ({ request }) => {
    // Login ONCE
    const tokenResponse = await request.post(loginUrl, { ... })
    const tokenResponseJson = await tokenResponse.json()
    authToken = 'Token ' + tokenResponseJson.user.token
});

test('Delete Articles', async ({ request }) => {
    // Reuse the token from beforeAll
    const deleteResponse = await request.delete(url, {
        headers: { Authorization: authToken }
    })
});

test('Create Articles', async ({ request }) => {
    // Reuse the same token
    const createResponse = await request.post(url, {
        headers: { Authorization: authToken }
    })
});
```

**Benefit**: Login happens once, all tests share the token

---

## Hook Execution Order

```
┌─────────────────────────────────────────┐
│       test.beforeAll()                  │  ← Runs once
│  (Get authorization token in this case) │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│       test.beforeEach()                 │  ← Runs before each test
│    (Not used in hooks.spec.ts)          │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│       test('Test Name', ...)            │  ← Individual test
│         (Test body)                     │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│       test.afterEach()                  │  ← Runs after each test
│    (Not used in hooks.spec.ts)          │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│   test.afterAll()                       │  ← Runs once after all
│   (Not used in hooks.spec.ts)           │
└─────────────────────────────────────────┘
```

---

## Common Mistakes & Best Practices

### ❌ Mistake 1: Declaring Variables in Wrong Scope
```typescript
test.beforeAll(async ({ request }) => {
    const authToken = await getToken(); // ❌ Only visible inside beforeAll
});

test('Delete', async ({ request }) => {
    // ❌ authToken is undefined here!
    await request.delete(url, { headers: { Authorization: authToken } })
});
```

### ✅ Fix: Declare at File Level
```typescript
let authToken: string; // ✅ File scope

test.beforeAll(async ({ request }) => {
    authToken = await getToken(); // ✅ Sets file-level variable
});

test('Delete', async ({ request }) => {
    // ✅ authToken is available
    await request.delete(url, { headers: { Authorization: authToken } })
});
```

---

### ❌ Mistake 2: Using `beforeEach` When `beforeAll` is Better
```typescript
test.beforeEach(async ({ request }) => {
    // ❌ This runs before EVERY test
    authToken = await request.post(loginUrl, { ... })
});
```
**Problem**: Tests run slower because authentication happens repeatedly

### ✅ Fix: Use `beforeAll` for Shared Setup
```typescript
test.beforeAll(async ({ request }) => {
    // ✅ Runs once - more efficient
    authToken = await request.post(loginUrl, { ... })
});
```

---

### ✅ Best Practice: Clear Naming
```typescript
// Good: Describes what the hook does
test.beforeAll('Get Authorization for API', async ({ request }) => {
    ...
});

// Less clear
test.beforeAll(async ({ request }) => {
    ...
});
```

---

## Summary Table

| Hook | When | How Many Times | Use Case |
|------|------|---|----------|
| `beforeAll` | Before any test | Once | Shared setup (auth, database init) |
| `beforeEach` | Before each test | Many | Per-test isolation setup |
| `afterEach` | After each test | Many | Per-test cleanup (delete resources) |
| `afterAll` | After all tests | Once | Final cleanup (close connections) |

---

## Practice Questions

1. **Q**: In `hooks.spec.ts`, why is `authToken` declared outside the `beforeAll` hook?
   **A**: So all tests in the file can access it. If it was declared inside `beforeAll`, it would only exist within that function.

2. **Q**: Would it be better to use `beforeEach` instead of `beforeAll` for authentication?
   **A**: No - `beforeAll` is more efficient because we only authenticate once, and all tests share the token.

3. **Q**: What fixture is used in the `beforeAll` hook in this codebase?
   **A**: The `request` fixture - it allows making HTTP requests to the API.

4. **Q**: How many times does the test authentication happen in `hooks.spec.ts`?
   **A**: Once (in `beforeAll`). All tests reuse the same token.

---

## Resources

- [Playwright Test Hooks Documentation](https://playwright.dev/docs/test-advanced#hooks)
- [Playwright Fixtures Documentation](https://playwright.dev/docs/test-fixtures)
- [API Testing with Playwright](https://playwright.dev/docs/api-testing)
