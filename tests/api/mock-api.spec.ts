import test, { expect } from "@playwright/test";
import tags from "./test-date/tags.json"

test.beforeEach('Mock API Test', async ({ page }) => {
    page.route('https://conduit-api.bondaracademy.com/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })
    await page.goto('https://conduit.bondaracademy.com/')
})

test('Mock API Test', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
})
