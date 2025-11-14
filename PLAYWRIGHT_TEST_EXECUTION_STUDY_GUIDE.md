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

## Default Configuration Analysis

### Basic `playwright.config.ts` Structure:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',                    // Where tests are located
  fullyParallel: true,                   // Run tests in parallel
  forbidOnly: !!process.env.CI,          // Prevent test.only in CI
  retries: process.env.CI ? 2 : 0,       // Retries on CI only
  workers: process.env.CI ? 1 : undefined, // Workers for parallel execution
  reporter: 'html',                      // Report format
  use: {
    trace: 'on-first-retry',             // Trace on retry
  },
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
  ],
});
```

**Note**: This guide explains default Playwright configuration options. Your specific project may have different settings optimized for API testing.

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

### Default Configuration

```typescript
fullyParallel: true  // Tests run in parallel (default)
```

### What Can You Change?

This setting controls whether tests run simultaneously or one after another:

```typescript
// Option 1: Parallel execution (DEFAULT)
fullyParallel: true
// Tests run at the same time
// Faster overall execution
// Good for independent tests
// ⏱️ 3 tests × 10 seconds = ~10 seconds total

// Option 2: Sequential execution
fullyParallel: false
// Tests run one after another
// Slower but more stable
// Good for tests that share state/resources
// ⏱️ 3 tests × 10 seconds = ~30 seconds total
```

### Visual: Sequential Execution

```
Time →
┌──────────────┐
│  Test 1      │
└──────────────┘
               ┌──────────────┐
               │  Test 2      │
               └──────────────┘
                              ┌──────────────┐
                              │  Test 3      │
                              └──────────────┘

⏱️ Total time: ~30 seconds (if each test takes 10 seconds)
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

⏱️ Total time: ~10 seconds (3 tests run simultaneously)
```

### When to Use Each

**Use Parallel (`fullyParallel: true`)** - Default for UI Tests:
- Tests are independent
- No shared state or resources
- Want faster execution
- Standard UI testing approach

**Use Sequential (`fullyParallel: false`)** - For Dependent Tests:
- Tests share resources (database, API)
- Tests affect each other's state
- API rate-limiting is a concern
- Common in API testing suites

---

## 3.5. forbidOnly: Prevent Accidental test.only()

### Default Configuration

```typescript
forbidOnly: !!process.env.CI
```

### What Can You Change?

The `forbidOnly` setting prevents tests with `test.only()` from accidentally running in production pipelines:

```typescript
// Option 1: Allow .only everywhere (NOT RECOMMENDED)
forbidOnly: false
// ✅ Allows: test.only() in all environments
// ❌ Risk: Accidentally skip tests in CI

// Option 2: Forbid .only everywhere (STRICT)
forbidOnly: true
// ❌ Forbids: test.only() everywhere
// ❌ Problem: Can't use for local debugging

// Option 3: Forbid .only on CI only (RECOMMENDED)
forbidOnly: !!process.env.CI
// ✅ On Local: Allows test.only() for debugging
// ✅ On CI: Forbids test.only() to catch mistakes
// ✅ Best for: Most projects

// Option 4: Conditional based on custom variable
forbidOnly: process.env.STRICT === 'true'
// Control via environment variable
// ✅ Best for: Team-specific policies
```

### What is test.only()?

```typescript
// Regular test - will always run
test('Get all tags', async ({ request }) => {
  // ...
});

// Test with .only - ONLY THIS TEST RUNS
test.only('Get specific article', async ({ request }) => {
  // ...
});

// This test is SKIPPED because another test has .only
test('Update article', async ({ request }) => {
  // ...
});
```

### forbidOnly Behavior Examples

**With `forbidOnly: false`** (Allow .only):
```bash
$ npx playwright test
✓ Get specific article (test.only is allowed)
⊘ Get all tags (skipped - another test has .only)
⊘ Update article (skipped - another test has .only)

Result: ✅ Tests run successfully
```

**With `forbidOnly: true`** (Forbid .only):
```bash
$ npx playwright test
Error: "forbidOnly" option is set, but test.only() was used
File: tests/api.spec.ts:15
```

**With `forbidOnly: !!process.env.CI`** (Local vs CI):
```bash
# On Local Machine (no CI env var)
$ npx playwright test
✓ Get specific article (.only allowed locally)
⊘ Get all tags (skipped)
⊘ Update article (skipped)
Result: ✅ Works for debugging

# On CI (CI=true)
$ CI=true npx playwright test
Error: forbidOnly option is set, but test.only() was used
Result: ❌ Catches the mistake before committing
```

## 4. Workers: Controlling Parallelization

### What is a Worker?

A worker is a process that runs tests. Multiple workers = parallel execution.

### Default Configuration

```typescript
workers: process.env.CI ? 1 : undefined
```

This is the recommended pattern in most Playwright configs.

### What Can You Change?

The `workers` setting controls how many parallel processes run tests:

```typescript
// Option 1: Automatic (DEFAULT on local machine)
workers: undefined
// Uses all available CPU cores
// On a 4-core machine: 4 workers
// On an 8-core machine: 8 workers
// ✅ Best for: Local development (fastest)

// Option 2: Single worker (CI/CD default)
workers: 1
// Sequential execution (one test at a time)
// Most stable on shared infrastructure
// ✅ Best for: CI/CD pipelines, servers

// Option 3: Fixed number
workers: 2
workers: 4
workers: 8
// Use exactly this many parallel processes
// ✅ Best for: Specific performance tuning

// Option 4: Conditional (RECOMMENDED)
workers: process.env.CI ? 1 : undefined
// On local: Use all CPU cores (undefined = auto)
// On CI: Use single worker (1)
// ✅ Best for: Works well everywhere

// Option 5: Environment-based
workers: process.env.WORKERS ? parseInt(process.env.WORKERS) : 4
// Get from environment variable or default
// ✅ Best for: Team configurations
```

### Comparison Table

| Setting | Behavior | Use Case | Speed | Stability |
|---------|----------|----------|-------|-----------|
| `undefined` | Auto (CPU cores) | Local development | 🟢 Very Fast | 🟡 Good |
| `1` | Sequential | CI/CD pipelines | 🔴 Slow | 🟢 Very Stable |
| `2` | 2 parallel | Small projects | 🟡 Medium | 🟢 Stable |
| `4` | 4 parallel | Medium projects | 🟢 Fast | 🟡 Good |
| `8+` | Many parallel | Large projects | 🟢 Very Fast | 🟡 Good |

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

### Why Use Conditional Workers?

```typescript
workers: process.env.CI ? 1 : undefined
```

**On Local Machine** (`undefined`):
- Uses all available CPU cores
- Faster test execution
- Good for development

**On CI/CD** (`1`):
- Sequential execution
- More stable and predictable
- Avoids resource contention
- Better for shared infrastructure

---

## 5. Test Retries

### Default Configuration

```typescript
retries: process.env.CI ? 2 : 0
```

This is the standard pattern: retry on CI, but fail fast locally.

### What Can You Change?

The `retries` setting controls how many times to re-run failed tests:

```typescript
// Option 1: Never retry (LOCAL default)
retries: 0
// Failed test fails immediately
// No re-runs
// ✅ Best for: Local development (fast feedback)

// Option 2: Retry once
retries: 1
// If test fails, run it 1 more time
// Maximum 2 total runs per test

// Option 3: Retry twice (CI default)
retries: 2
// If test fails, run it 2 more times
// Maximum 3 total runs per test
// ✅ Best for: CI/CD pipelines

// Option 4: Retry 3+ times
retries: 3
retries: 5
// More retries for flaky tests
// But takes longer if test keeps failing
// ✅ Best for: Very flaky or network-dependent tests

// Option 5: Conditional (RECOMMENDED)
retries: process.env.CI ? 2 : 0
// On local: 0 retries (fail fast)
// On CI: 2 retries (handle flakiness)
// ✅ Best for: Most projects

// Option 6: Always retry
retries: 2
// Same number on local and CI
// ✅ Best for: Consistently flaky tests
```

### Retry Behavior Examples

**With `retries: 0`**:
```
Test Run:  [Run 1]
           ❌ FAILED
Result:    ❌ FAILED (no retries)
Total Runs: 1
```

**With `retries: 2`**:
```
Test Run:  [Run 1]
           ❌ FAILED
           
           [Run 2]
           ❌ FAILED
           
           [Run 3]
           ✅ PASSED
Result:    ✅ PASSED (one retry succeeded)
Total Runs: 3
```

**With `retries: 2` (all fail)**:
```
Test Run:  [Run 1]
           ❌ FAILED
           
           [Run 2]
           ❌ FAILED
           
           [Run 3]
           ❌ FAILED
Result:    ❌ FAILED (all retries exhausted)
Total Runs: 3
```

### Comparison Table

| Setting | Behavior | Use Case | Feedback Speed | Reliability |
|---------|----------|----------|---|---|
| `0` | No retries | Local dev | 🟢 Fast | 🔴 Fragile |
| `1` | Retry once | CI/CD | 🟡 Medium | 🟡 Better |
| `2` | Retry twice | CI/CD standard | 🟡 Slower | 🟢 Good |
| `3+` | Retry multiple | Very flaky tests | 🔴 Slow | 🟢 Very Reliable |

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

### Default Configuration

```typescript
reporter: 'html'
// Or multiple reporters:
reporter: [['html'], ['list'], ['json']]
```

### What Can You Change?

The `reporter` setting controls how test results are displayed and stored:

```typescript
// Option 1: Single reporter (simple)
reporter: 'html'           // HTML only
reporter: 'list'           // Console only
reporter: 'json'           // JSON only

// Option 2: Multiple reporters (RECOMMENDED)
reporter: [
  ['html'],                // Generate HTML report
  ['list'],                // Show in console/terminal
]

// Option 3: Three reporters (comprehensive)
reporter: [
  ['html'],                // Interactive HTML
  ['list'],                // Terminal output
  ['json'],                // Programmatic access
]

// Option 4: With custom options
reporter: [
  ['html', { outputFolder: 'my-report' }],
  ['list'],
  ['junit', { outputFile: 'results.xml' }],
]

// Option 5: CI/CD specific
reporter: [
  ['json'],                // For CI integration
  ['junit'],               // For test reports
  ['github'],              // For GitHub Actions
]

// Option 6: Minimal (silent)
reporter: []               // No output (not recommended)
```

### Available Reporters

| Reporter | Output | Location | Use Case |
|----------|--------|----------|----------|
| `html` | Interactive HTML report | `playwright-report/` | Detailed analysis |
| `list` | Console output | Terminal | Quick feedback |
| `json` | JSON results | `test-results/` | CI/CD integration |
| `junit` | JUnit XML | Configurable | CI/CD reports |
| `github` | GitHub Annotations | GitHub Actions | PR feedback |
| `dot` | Single-line dots | Terminal | Minimal output |

### Reporter Comparison Table

| Reporter | View Type | Details | Best For |
|----------|-----------|---------|----------|
| `html` | Visual | High | Analyzing failures |
| `list` | Text | Medium | Quick feedback |
| `json` | Structured | High | Automation/APIs |
| `junit` | XML | Medium | CI systems |
| `github` | Annotations | Low | GitHub Actions |
| `dot` | Minimal | Low | CI logs |

### HTML Reporter

```typescript
reporter: 'html'

// Output Location: playwright-report/index.html
// Features:
//   - Visual test results with pass/fail status
//   - Failure details with error messages
//   - Screenshots and videos
//   - Logs and traces
//   - Test duration and timing
```

### List Reporter

```typescript
reporter: 'list'

// Output: Console/Terminal
// Example:
//   ✓ Get Tags (100ms)
//   ✓ Get All Articles (200ms)
//   ✓ Create Articles (500ms)
//   ✓ Delete Articles (300ms)
//   ✓ Update Articles (600ms)
```

### Using Multiple Reporters

```typescript
// Run with both HTML and list output
reporter: [
  ['html'],           // Generate HTML report
  ['list'],           // Show list in terminal
  ['json'],           // Generate JSON results
]

// You get:
// 1. HTML report for detailed analysis
// 2. Console output for quick feedback
// 3. JSON for programmatic access
```

### Reporter Configuration

```typescript
// Custom reporter options
reporter: [
  ['html', { outputFolder: 'my-report' }],
  ['list'],
  ['junit', { outputFile: 'junit-results.xml' }],
]
```

---

## 8. Trace Viewer: Debugging Failed Tests

### Default Configuration

```typescript
use: {
  trace: 'on-first-retry'
}
```

### What Can You Change?

The `trace` setting controls when to record detailed test execution traces:

```typescript
// Option 1: Trace on first retry (DEFAULT)
trace: 'on-first-retry'
// Records trace only when test is retried
// Balances debugging info with storage
// ✅ Best for: Most projects (good default)

// Option 2: Always trace
trace: 'on'
// Records trace for every test run
// High storage usage but maximum debugging info
// ✅ Best for: Heavy debugging/CI failures

// Option 3: Never trace
trace: 'off'
// No traces recorded
// Saves storage and execution time
// ✅ Best for: Quick local testing

// Option 4: Trace only on failure
trace: 'retain-on-failure'
// Records trace only for failed tests
// Good balance of storage and info
// ✅ Best for: Production pipelines

// Option 5: Conditional tracing
use: {
  trace: process.env.CI ? 'on-first-retry' : 'off'
}
// Trace on CI only, no traces locally
// ✅ Best for: Faster local development
```

### Trace Options Comparison

| Option | When Recorded | Storage | Use Case |
|--------|---|---|---|
| `on-first-retry` | First retry only | 🟡 Medium | Default (good balance) |
| `on` | Every test | 🔴 High | Heavy debugging |
| `off` | Never | 🟢 None | Fast local tests |
| `retain-on-failure` | Failed tests only | 🟡 Medium | Production builds |

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

### Run in Headed Mode

```bash
npx playwright test --headed
```

Shows browser UI while tests run (for browser-based tests). Good for watching test execution visually.

**Example Output**: Browser window opens showing each step of the test.

### Run in Headless Mode

```bash
npx playwright test --headed=false
```

Runs without browser UI (default behavior). Faster, uses less resources.

**When to Use**:
- CI/CD environments
- Running on servers without displays
- Faster test execution

### Run in Debug Mode

```bash
npx playwright test --debug
```

Opens Inspector for step-by-step debugging. Step through code, inspect elements, and watch network requests.

**Inspector Features**:
- Step through test line-by-line
- Inspect DOM elements
- View network requests
- See console output
- Evaluate expressions

### Run with UI Mode

```bash
npx playwright test --ui
```

Opens interactive test runner with live feedback. Visual test explorer with pass/fail indicators.

**UI Mode Features**:
- Watch tests run in real-time
- See test timeline
- View pass/fail status
- Re-run failed tests
- Step through execution

### Watch Mode (Re-run on File Change)

```bash
npx playwright test --watch
```

Automatically re-runs tests when you save files. Great for development and debugging.

**Typical Workflow**:
1. Save test file changes
2. Tests automatically re-run
3. See results in console immediately
4. Fix issues and repeat

### Run with Reporter

```bash
npx playwright test --reporter=html
npx playwright test --reporter=list
npx playwright test --reporter=json
```

Specify which reporter to use. Can override config values.

**Multiple Reporters**:
```bash
npx playwright test --reporter=html --reporter=list
```

### Combined Commands

```bash
# Run specific file in headed mode with UI
npx playwright test hooks.spec.ts --headed --ui

# Run with grep pattern in debug mode
npx playwright test --grep "Delete" --debug

# Run with watch mode in headed mode
npx playwright test --watch --headed

# Run with custom reporter and specific project
npx playwright test --reporter=json --project=api-test
```

---

## 10. CI/CD Integration

### Default Configuration for CI

```typescript
forbidOnly: !!process.env.CI,           // ❌ Fail if test.only found
retries: process.env.CI ? 2 : 0,        // 2 retries on CI
workers: process.env.CI ? 1 : undefined,  // 1 worker on CI
```

### How Playwright Detects CI

Playwright automatically detects CI environments:
```typescript
process.env.CI  // Set by most CI/CD platforms
```

### CI Platforms That Set `CI=true`

- GitHub Actions
- GitLab CI
- Jenkins
- CircleCI
- Travis CI
- Azure Pipelines
- AWS CodeBuild
- And many others...

### Example: GitHub Actions Workflow

```yaml
# .github/workflows/tests.yml
name: Playwright Tests
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
      - run: npx playwright install
      - run: npx playwright test
        # CI environment variable automatically set by GitHub Actions
```

### Configuration Behavior on CI

When `CI=true`:

```typescript
forbidOnly: !!process.env.CI  // = true
// ❌ Fails if any test uses test.only
// Prevents accidental skipped tests in CI

retries: process.env.CI ? 2 : 0  // = 2
// Automatically retry failed tests up to 2 times
// Handles temporary network issues

workers: process.env.CI ? 1 : undefined  // = 1
// Run tests sequentially (one at a time)
// More stable on shared CI infrastructure
```

### Configuration Behavior Locally

When `CI` is NOT set:

```typescript
forbidOnly: !!process.env.CI  // = false
// ✅ Allows test.only for quick debugging

retries: process.env.CI ? 2 : 0  // = 0
// Fail immediately on error
// Faster feedback during development

workers: process.env.CI ? 1 : undefined  // = undefined
// Use default (all CPU cores)
// Faster test execution locally
```

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

### ✅ 1. Use Parallel for Independent Tests

Most UI tests don't share state:
```typescript
fullyParallel: true  // Good for UI tests (default)
```

**Benefits**:
- Faster execution (3x-10x speedup)
- Better resource utilization
- Standard practice

### ✅ 2. Use Sequential for Dependent Tests

API tests or shared resources:
```typescript
fullyParallel: false  // Good for API/dependent tests
```

**Benefits**:
- Avoids conflicts and race conditions
- Simpler debugging
- More predictable results

### ✅ 3. Configure Retries by Environment

```typescript
retries: process.env.CI ? 2 : 0  // Default pattern (good)
// Fail fast locally, retry in CI
```

**Benefits**:
- Quick feedback during development
- Handles flaky tests in CI
- Reduces false positives

### ✅ 4. Always Enable forbidOnly in CI

```typescript
forbidOnly: !!process.env.CI  // Prevent accidental .only
```

**Benefits**:
- Prevents skipped tests reaching CI
- Catches developer mistakes
- Ensures full test suite runs

### ✅ 5. Use Multiple Reporters

```typescript
reporter: [
  ['html'],    // Detailed analysis
  ['list'],    // Quick feedback
  ['json'],    // Programmatic access
]
```

**Benefits**:
- Multiple views of results
- Better visibility
- CI/CD integration friendly

---

## Complete Configuration Reference: Defaults and Alternatives

### All Configuration Options with Changeable Values

```typescript
export default defineConfig({
  // 1. Test Discovery
  testDir: './tests',              // Can change: './e2e', './src', etc.

  // 2. Parallelization
  fullyParallel: true,             // Can change: false
  // true = parallel (default, faster)
  // false = sequential (more stable)

  // 3. forbidOnly Protection
  forbidOnly: !!process.env.CI,    // Can change: true, false
  // true = forbid test.only() everywhere
  // false = allow test.only() everywhere
  // !!process.env.CI = forbid on CI only (recommended)

  // 4. Retries
  retries: process.env.CI ? 2 : 0, // Can change: 0, 1, 2, 3, 4, 5...
  // 0 = no retries
  // 1 = retry once
  // 2 = retry twice (standard on CI)
  // 3+ = more retries for flaky tests

  // 5. Workers
  workers: process.env.CI ? 1 : undefined,  // Can change: 1, 2, 4, 8, undefined
  // 1 = sequential
  // 2-8 = parallel with specific workers
  // undefined = auto (uses CPU cores)

  // 6. Reporters
  reporter: 'html',                // Can change: 'list', 'json', 'junit', 'github', 'dot'
  // Or multiple: [['html'], ['list'], ['json']]
  // String = single reporter
  // Array = multiple reporters

  // 7. Trace Viewer
  use: {
    trace: 'on-first-retry',       // Can change: 'on', 'off', 'retain-on-failure'
    // 'on-first-retry' = trace on first retry (default, good balance)
    // 'on' = trace every test (storage heavy)
    // 'off' = no traces (save storage)
    // 'retain-on-failure' = trace only failed tests
  },

  // 8. Projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Can add: firefox, webkit, mobile, edge, etc.
    // Or remove projects for API testing
  ],
});
```

---

## Summary Table: Defaults and Alternatives

| Setting | Default Value | Alternative Values | Use Case |
|---------|---|---|---|
| `testDir` | `'./tests'` | `'./e2e'`, `'./src'`, custom path | Where to find tests |
| `fullyParallel` | `true` | `false` | Parallel (true) vs Sequential (false) |
| `forbidOnly` | `!!process.env.CI` | `true`, `false` | Allow/forbid test.only() |
| `retries` | `0` locally, `2` on CI | `0, 1, 2, 3, 4, 5...` | How many retries |
| `workers` | `undefined` locally, `1` on CI | `1, 2, 4, 8, undefined` | Parallel workers count |
| `reporter` | `'html'` | `'list'`, `'json'`, `'junit'`, `'github'`, `'dot'`, or array | Report format(s) |
| `trace` | `'on-first-retry'` | `'on'`, `'off'`, `'retain-on-failure'` | When to record traces |
| `projects` | Multiple browsers | Single project, API config | Test environments |

---

## Practice Questions

1. **Q**: Why is `fullyParallel: true` the default in Playwright?
   **A**: Most UI tests are independent and don't share state. Parallel execution runs tests simultaneously, making the suite much faster.

2. **Q**: What happens when a test fails with `retries: 2` on CI?
   **A**: The test automatically re-runs up to 2 times. If any attempt passes, the test is marked as passing overall.

3. **Q**: How many times do all tests run if you have 3 projects and 5 test files?
   **A**: 15 times total (3 projects × 5 test files). Each project runs the entire test suite independently.

4. **Q**: What does `trace: 'on-first-retry'` do?
   **A**: Records a detailed trace (network requests, DOM snapshots, screenshots) during the first retry of a failed test for debugging.

5. **Q**: What's the difference between `--headed` and `--headless` modes?
   **A**: `--headed` shows the browser UI during test execution (good for debugging). `--headless` runs without UI (faster, uses less resources, default).

6. **Q**: How does Playwright detect if it's running in CI?
   **A**: It checks the `process.env.CI` variable, which is automatically set by CI platforms like GitHub Actions, GitLab CI, Jenkins, etc.

7. **Q**: Why would you use sequential execution (`fullyParallel: false`)?
   **A**: When tests depend on each other or share resources (like a database or API). Parallel execution could cause conflicts or race conditions.

8. **Q**: What does `forbidOnly: !!process.env.CI` prevent?
   **A**: It prevents any test using `test.only()` from running in CI environments, ensuring the full test suite always runs in production pipelines.

---

## Resources

- [Playwright Configuration](https://playwright.dev/docs/test-configuration)
- [Test Execution](https://playwright.dev/docs/intro)
- [Reporters](https://playwright.dev/docs/test-reporters)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)
