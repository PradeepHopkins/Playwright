import { test as base } from "@playwright/test"
import { RequestHandler } from "./request-handler"

/**
 * TestOptions - Custom fixtures for API testing
 * 
 * Custom Fixtures:
 * - api: RequestHandler instance for making API requests with fluent interface
 */
export type TestOptions = {
    api: RequestHandler
}

export const test = base.extend<TestOptions>({
    api: async ({ }, use) => {
        const requestHandler = new RequestHandler()
        await use(requestHandler)
    }
})

/**
 * Custom test fixture extending Playwright's base test
 * 
 * This creates a custom fixture called 'api' that provides a RequestHandler instance
 * to every test that uses it.
 * 
 * @typedef {Object} TestOptions - Defines the custom fixtures available in tests
 * @property {RequestHandler} api - Pre-configured RequestHandler for API testing
 * 
 * Fixture Breakdown:
 * 
 * 1. base.extend<TestOptions>()
 *    - Extends Playwright's built-in test with custom fixtures
 *    - TestOptions type defines what fixtures are available
 *    - Returns a new test object with both built-in and custom fixtures
 * 
 * 2. api: async ({ }, use) => { ... }
 *    - Defines the 'api' fixture
 *    - 'async' means this fixture initialization is asynchronous
 *    - '{ }' - destructuring parameter (empty because no dependencies)
 *    - 'use' - callback function to provide the fixture value to tests
 * 
 * 3. const requestHandler = new RequestHandler()
 *    - Creates a fresh RequestHandler instance for each test
 *    - Each test gets its own isolated instance
 *    - No state carries over between tests (clean isolation)
 * 
 * 4. await use(requestHandler)
 *    - Provides the RequestHandler instance to the test
 *    - Code before 'use' runs BEFORE the test
 *    - Code after 'use' runs AFTER the test (cleanup)
 *    - Tests access it via: test('name', async ({ api }) => { ... })
 * 
 * Usage in Tests:
 * 
 * test('Example', async ({ api }) => {
 *     // 'api' is the RequestHandler instance
 *     const response = await api
 *         .url('https://api.example.com')
 *         .path('/articles')
 *         .get()
 * })
 * 
 * Fixture Lifecycle:
 * 
 * 1. Test starts
 * 2. Fixture initialization: new RequestHandler() is created
 * 3. await use() - Test receives the 'api' fixture
 * 4. Test code runs
 * 5. Fixture teardown: code after use() runs (if any)
 * 6. Test ends
 * 
 * Multiple Tests - Each Gets Fresh Instance:
 * 
 * test('Test 1', async ({ api }) => {
 *     // Gets a NEW RequestHandler instance
 * })
 * 
 * test('Test 2', async ({ api }) => {
 *     // Gets a different NEW RequestHandler instance
 *     // No shared state with Test 1
 * })
 */
