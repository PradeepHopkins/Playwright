# Playwright Test Execution Study Guide

## Overview
This guide explains how Playwright executes tests, controls parallelization, retries, browser configurations, and reports results. Understanding test execution helps you optimize test performance and debug issues effectively.

---

## What is Test Execution?

Test execution is the process of running your test files and generating results. It includes:
- **Discovery**: Finding all test files
- **Initialization**: Setting up browsers/contexts
- **Execution**: Running individual tests
- **Reporting**: Collecting and displaying results

---

## Your Configuration Analysis

### From `playwright.config.ts`:

```typescript
export default defineConfig({
  testDir: './tests',           // Where tests are located
  fullyParallel: false,         // Sequential test execution
  forbidOnly: !!process.env.CI, // Prevent test.only in CI
  retries: process.env.CI ? 2 : 0,  // Retries on CI only
  workers: process.env.CI ? 1 : undefined,  // Workers for parallel execution
  reporter: [['html'], ['list']], // Report formats
  projects: [{ name: 'api-test' }]  // Browser/project configs
});
```

**Key Insight**: Your config is optimized for **API testing** (no browser instances needed), not UI testing.

---

## 1. Test Discovery

### How Playwright Finds Tests

```
testDir: './tests'
    ↓
[Searches for .spec.ts and .test.ts files]
    ↓
Found Files:
  - delete-method.spec.ts
  - get-method.spec.ts
  - hooks.spec.ts
  - post-method.spec.ts
  - put-method.spec.ts
```

### File Naming Conventions

| Pattern | Found? | Example |
|---------|--------|---------|
| `*.spec.ts` | ✅ Yes | `get-method.spec.ts` |
| `*.test.ts` | ✅ Yes | `auth.test.ts` |
| `*.spec.js` | ✅ Yes | `main.spec.js` |
| `*.helpers.ts` | ❌ No | Not a test file |
| `utils.ts` | ❌ No | Not a test file |

### Configuration
```typescript
testDir: './tests'  // Playwright only looks here
```

To change test location:
```typescript
testDir: './e2e'    // Now tests are in e2e/ folder
testDir: './src'    // Can search other locations
```

---

## 2. Test Structure & Execution Flow

### Basic Test Structure

```typescript
import test, { expect } from "@playwright/test";

test('Test Name', async ({ request }) => {
    // Test code
    // Assertions
});
```

### Execution Timeline for a Single Test

```
┌─────────────────────────────────────┐
│  1. test() declaration              │
│     (Test is registered)            │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  2. beforeAll hooks execute         │
│     (Global setup, once)            │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  3. beforeEach hooks execute        │
│     (Per-test setup)                │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  4. Test code runs                  │
│     (API calls, assertions)         │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  5. afterEach hooks execute         │
│     (Per-test cleanup)              │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  6. Test result recorded            │
│     (Pass/Fail)                     │
└─────────────────────────────────────┘
```

---

## 3. Sequential vs. Parallel Execution

### Your Configuration: Sequential

```typescript
fullyParallel: false  // Tests run ONE at a time
```

### Visual: Sequential Execution (Your Setup)

```
Time →
┌──────────────┐
│  Test 1      │ (hooks.spec.ts)
└──────────────┘
               ┌──────────────┐
               │  Test 2      │ (get-method.spec.ts)
               └──────────────┘
                              ┌──────────────┐
                              │  Test 3      │ (post-method.spec.ts)
                              └──────────────┘

⏱️ Total time: ~30 seconds (if each test takes 10 seconds)
```

### Alternative: Parallel Execution

```typescript
fullyParallel: true  // Tests run SIMULTANEOUSLY
```

### Visual: Parallel Execution

```
Time →
┌──────────────┐
│  Test 1      │
├──────────────┤
│  Test 2      │
├──────────────┤
│  Test 3      │
└──────────────┘

⏱️ Total time: ~10 seconds (3 tests run at once)
```

### Why Your Config Uses Sequential (`fullyParallel: false`)

Looking at your test files, they make API calls to the **same Conduit API**:
- Multiple parallel tests = Multiple simultaneous API calls
- API might rate-limit concurrent requests
- Shared authentication token might cause conflicts
- **Sequential execution avoids these issues**

---

## 4. Workers: Controlling Parallelization

### What is a Worker?

A worker is a process that runs tests. Multiple workers = parallel execution.

### Your Configuration

```typescript
workers: process.env.CI ? 1 : undefined
```

| Scenario | Workers | Meaning |
|----------|---------|---------|
| **Local machine** | `undefined` | Use default (CPU cores) |
| **CI/CD Pipeline** | `1` | Sequential - one test at a time |

### Examples

```typescript
// Configuration Options:

workers: 1        // Sequential (1 test at a time)
workers: 4        // 4 tests run in parallel
workers: undefined // Automatic (uses CPU count)
workers: process.env.WORKERS || 2  // From environment or default to 2
```

### Visual: Worker Pools

**1 Worker (CI/CD)**:
```
Worker 1: [Test 1] → [Test 2] → [Test 3]
⏱️ Sequential
```

**4 Workers (Local)**:
```
Worker 1: [Test 1]
Worker 2: [Test 2]
Worker 3: [Test 3]
Worker 4: [Idle]
⏱️ Parallel (3 tests at once)
```

---

## 5. Test Retries

### Your Configuration

```typescript
retries: process.env.CI ? 2 : 0
```

| Scenario | Retries | Meaning |
|----------|---------|---------|
| **Local machine** | `0` | Fail immediately on error |
| **CI/CD Pipeline** | `2` | Retry failed tests twice |

### Why Retries on CI Only?

```
Local Development:
- You see the failure immediately
- Faster feedback loop
- You fix the issue and re-run

CI/CD Pipeline:
- Flaky tests fail randomly (network issues, timing)
- Retries catch temporary failures
- Reduces false positives
```

### Example: Test Retry Flow

```
Test Execution Flow:
┌─────────────────────┐
│  Run Test           │
└────────┬────────────┘
         │
         ▼
    ❌ FAILED
         │
         ▼
┌─────────────────────┐
│  Retry 1            │
└────────┬────────────┘
         │
         ▼
    ❌ FAILED
         │
         ▼
┌─────────────────────┐
│  Retry 2            │
└────────┬────────────┘
         │
         ▼
    ✅ PASSED (or still failing)
         │
         ▼
Final Result: PASSED (counts as pass if any attempt passes)
```

### Configuring Retries

```typescript
// Never retry
retries: 0

// Always retry once
retries: 1

// Retry 3 times
retries: 3

// Conditional retry
retries: process.env.CI ? 3 : 1

// Retry based on environment
retries: process.env.STRICT_MODE ? 0 : 2
```

---

## 6. Projects: Multi-Browser Testing

### What is a Project?

A project is a configuration for running tests in a specific environment (browser, device, etc.).

### Your Configuration

```typescript
projects: [
  {
    name: 'api-test',
    // No browser needed for API testing
  }
]
```

### Available Projects (Commented Out in Your Config)

```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
]
```

### How Projects Work

When you have 3 projects, Playwright runs all tests in each:

```
Test Suite with 3 Projects:
┌──────────────────────────────────┐
│  chromium project                │
│  Run: Test 1, Test 2, Test 3    │
└──────────────────────────────────┘
         ↓
┌──────────────────────────────────┐
│  firefox project                 │
│  Run: Test 1, Test 2, Test 3    │
└──────────────────────────────────┘
         ↓
┌──────────────────────────────────┐
│  webkit project                  │
│  Run: Test 1, Test 2, Test 3    │
└──────────────────────────────────┘

Total tests executed: 9 (3 projects × 3 tests)
```

### Why Your Config Has Only `api-test`

- No browser UI needed for API testing
- Faster execution (no browser startup)
- Lighter resource usage
- Pure API validation

---

## 7. Test Reporters

### Your Configuration

```typescript
reporter: [['html'], ['list']]
```

### Available Reporters

| Reporter | Output | Location |
|----------|--------|----------|
| `html` | Interactive HTML report | `playwright-report/` |
| `list` | Console output | Terminal |
| `json` | JSON results | `test-results/` |
| `junit` | JUnit XML (CI/CD) | Configurable |
| `github` | GitHub Annotations | For GitHub Actions |

### HTML Reporter

```typescript
reporter: [['html']]

// Output Location: playwright-report/index.html
// Features:
//   - Visual test results
//   - Failures with screenshots
//   - Logs and traces
//   - Test duration
```

### List Reporter

```typescript
reporter: [['list']]

// Output: Console/Terminal
// Example:
//   ✓ Get Tags (100ms)
//   ✓ Get All Articles (200ms)
//   ✓ Create Articles (500ms)
//   ✓ Delete Articles (300ms)
//   ✓ PUt Update Articles (600ms)
```

### Using Both (Your Setup)

```typescript
reporter: [['html'], ['list']]

// You get:
// 1. HTML report for detailed analysis
// 2. Console output for quick feedback
```

---

## 8. Trace Viewer: Debugging Failed Tests

### Your Configuration

```typescript
use: {
  trace: 'on-first-retry'
}
```

| Option | When Trace Recorded |
|--------|-------------------|
| `'on-first-retry'` | On first retry of a failed test |
| `'on'` | Always |
| `'off'` | Never |
| `'retain-on-failure'` | Only on failure |

### What is a Trace?

A trace records:
- Network requests (XHR/Fetch)
- DOM snapshots at each step
- Screenshots
- Console logs
- Timing information

### Viewing a Trace

```bash
# After test runs
npx playwright show-trace trace.zip

# This opens an interactive viewer showing:
# - Timeline of test execution
# - Network requests to API
# - Step-by-step progression
```

---

## 9. Running Tests: Command Patterns

### Run All Tests

```bash
npx playwright test
```

Executes all test files matching `./tests/**/*.spec.ts`

### Run Specific Test File

```bash
npx playwright test hooks.spec.ts
```

Only runs tests in `hooks.spec.ts`

### Run Specific Test by Name

```bash
npx playwright test --grep "Get Authorization"
```

Runs only tests matching the pattern

### Run in Debug Mode

```bash
npx playwright test --debug
```

Opens Inspector for step-by-step debugging

### Run with UI Mode

```bash
npx playwright test --ui
```

Opens interactive test runner with live feedback

### Watch Mode (Re-run on File Change)

```bash
npx playwright test --watch
```

Automatically re-runs tests when you save files

### Run with Reporter

```bash
npx playwright test --reporter=html
npx playwright test --reporter=list
```

---

## 10. CI/CD Integration

### Your Configuration for CI

```typescript
forbidOnly: !!process.env.CI,  // ❌ Fail if test.only found
retries: process.env.CI ? 2 : 0,  // 2 retries
workers: process.env.CI ? 1 : undefined,  // 1 worker
```

### Detection

Playwright detects CI environment from:
```typescript
process.env.CI  // Set by GitHub Actions, GitLab, Jenkins, etc.
```

### Example: GitHub Actions

```yaml
# .github/workflows/tests.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx playwright test
        env:
          CI: true  # Triggers CI-specific config
```

When `CI=true`:
- Tests run sequentially (1 worker)
- Failed tests retry twice
- `.only` tests are forbidden
- HTML report generated for artifacts

---

## 11. Test Execution Lifecycle

### Complete Execution Flow

```
START
  │
  ├─→ Load playwright.config.ts
  │
  ├─→ Discover test files in ./tests
  │   Found: 5 .spec.ts files
  │
  ├─→ Initialize projects
  │   Project: 'api-test'
  │
  ├─→ Spawn workers (1 or more)
  │
  ├─→ For each worker:
  │   │
  │   ├─→ beforeAll hooks
  │   │
  │   ├─→ Run Test 1
  │   │   ├─ beforeEach
  │   │   ├─ Test code
  │   │   ├─ afterEach
  │   │   └─ Record result
  │   │
  │   ├─→ Run Test 2
  │   │   └─ ... (same as Test 1)
  │   │
  │   ├─→ Run Test 3, 4, 5
  │   │   └─ ... (same as above)
  │   │
  │   └─→ afterAll hooks
  │
  ├─→ Collect all results
  │
  ├─→ Generate reports
  │   - HTML report
  │   - List report
  │   - playwright-report/index.html
  │
  └─→ EXIT with status (0 = pass, 1 = fail)
```

## Common Issues & Solutions

### ❌ Issue 1: "No tests found"

```typescript
// Wrong: tests are in wrong location
testDir: './e2e'  // But your files are in ./tests
```

**Fix**: Update `testDir` to match your test location
```typescript
testDir: './tests'
```

---

### ❌ Issue 2: Tests Running Too Slowly

```typescript
// Wrong: Sequential execution
fullyParallel: false
workers: 1

// 5 tests × 10 seconds each = 50 seconds
```

**Fix**: Enable parallel execution (if tests don't interfere)
```typescript
fullyParallel: true
workers: 4  // Or undefined for auto

// 5 tests in parallel ≈ 10 seconds
```

---

### ❌ Issue 3: Flaky Tests Failing Locally

```typescript
retries: process.env.CI ? 2 : 0
// 0 retries locally = immediate failure
```

**Fix**: Add retries locally too
```typescript
retries: 2  // Always retry
```

---

### ❌ Issue 4: Can't See Test Results

```typescript
// Wrong: No reporter
reporter: []
```

**Fix**: Add reporters
```typescript
reporter: [['html'], ['list']]  // Your setup
```

---

## Best Practices for Test Execution

### ✅ 1. Use Sequential for API Tests

API tests often share state. Sequential execution avoids conflicts:
```typescript
fullyParallel: false  // Good for API tests
```

### ✅ 2. Use Parallel for Independent UI Tests

UI tests usually don't share state:
```typescript
fullyParallel: true  // Good for UI tests
```

### ✅ 3. Configure Retries Wisely

```typescript
retries: process.env.CI ? 2 : 0  // Your approach (good)
// Fail fast locally, retry in CI
```

### ✅ 4. Always Use Reporters

```typescript
reporter: [['html'], ['list']]  // Visibility is important
```

### ✅ 5. Keep `forbidOnly` Enabled

```typescript
forbidOnly: !!process.env.CI  // Prevent accidental .only
```

---

## Summary Table

| Setting | Your Value | Purpose |
|---------|-----------|---------|
| `testDir` | `'./tests'` | Where to find tests |
| `fullyParallel` | `false` | Sequential execution (API safe) |
| `forbidOnly` | `true` (on CI) | Prevent skipped tests in CI |
| `retries` | `2` (on CI) | Retry flaky tests |
| `workers` | `1` (on CI) | Single process on CI |
| `reporter` | `html`, `list` | Test result output |
| `trace` | `on-first-retry` | Debug trace on retry |
| `projects` | `api-test` | API testing config |

---

## Practice Questions

1. **Q**: Why does your config use `fullyParallel: false`?
   **A**: API tests often run against the same server and may share state. Sequential execution prevents conflicts.

2. **Q**: What happens when a test fails with `retries: 2` on CI?
   **A**: It automatically re-runs up to 2 times. If any attempt passes, the test is marked as passed.

3. **Q**: How many times do all tests run with 3 projects and 5 test files?
   **A**: 15 times total (3 projects × 5 files). However, your config has only 1 project ('api-test'), so 5 times.

4. **Q**: What does `trace: 'on-first-retry'` do?
   **A**: Records a detailed trace of the first retry attempt, helpful for debugging why the test initially failed.

5. **Q**: How would you run only the hooks test file?
   **A**: `npx playwright test hooks.spec.ts`

---

## Resources

- [Playwright Configuration](https://playwright.dev/docs/test-configuration)
- [Test Execution](https://playwright.dev/docs/intro)
- [Reporters](https://playwright.dev/docs/test-reporters)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)
