import { state } from "@angular/animations";
import test, { expect } from "@playwright/test";

test.beforeEach('AJAX website', async ({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    // testInfo.setTimeout(testInfo.timeout + 2000) increase overall time for dependent test
})

test('Auto Waiting', async ({ page }) => {

    const successButton = page.locator('.bg-success')
    // await successButton.click()
    // const text = await successButton.textContent()
    // await successButton.waitFor({ state: "attached" })
    // const text = await successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
})

test('Alternative  Waiting', async ({ page }) => {

    const successButton = page.locator('.bg-success')
    //____wait for element 
    // await page.waitForSelector('.bg-success')

    //____wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // ____wait for network calls to be completed (NOT RECOMMENDED)
    // await page.waitForLoadState('networkidle')

    //____Hard coded wait (NOT RECOMMENDED)
    // await page.waitForTimeout(15000)
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('Timeout', async ({ page }) => {
    // configure these timeouts in playwright.config.js (or .ts) under the use section and/or the top-level config
    //  depending on which timeout you want.

    // 1. timeout
    // Default timeout for all Playwright actions, unless overridden by more specific timeouts.
    // Applies to actions like click(), fill(), type(), waiting for selectors, etc.
    // timeout: 10000 // 10 seconds

    // 2. globalTimeout:
    // Total time allowed for the entire test run (or for a single test if set at test level).
    // If the run exceeds this time, Playwright stops the whole process.
    // globalTimeout: 10000 // 10 seconds total

    // 3. actionTimeout
    // Specific timeout for UI actions (clicks, typing, etc.).
    // Overrides the more general timeout.
    // actionTimeout: 5000 // 5 seconds

    // 4. navigationTimeout
    // Timeout for navigation events:
    // page.goto()
    // page.waitForNavigation()
    // redirects
    // navigationTimeout: 60000 // 60 seconds

    // test.setTimeout(10000)                                      // test timeout override 
    // test.slow()                                                // increase timout for test X 3 times
    const successButton = page.locator('.bg-success')
    // await successButton.click({ timeout: 18000 })            // action timeout override
})
