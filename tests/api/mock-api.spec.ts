import test, { expect } from "@playwright/test";
import tags from "./test-date/tags.json"

test.beforeEach('Mock API Test', async ({ page }) => {
    page.route('*/**/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })
    await page.goto('https://conduit.bondaracademy.com/')
})

test('Mock API Test', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
})
// Instead of providing the full API URL, we can simplify the route by using wildcards (*).
// Wildcards allow us to replace part of the base URL and match any pattern that ends with the desired path.
// For example: **/api/tags
