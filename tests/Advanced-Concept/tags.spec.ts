import test, { expect } from "@playwright/test";
import tags from "../api/test-date/tags.json"

test.beforeEach('Mock API Test', async ({ page }) => {
    page.route('*/**/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })
    page.route('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', async route => {
        const response = await route.fetch()
        const responseBody = await response.json()
        responseBody.articles[0].title = 'This the mock test title'
        responseBody.articles[0].description = 'This the mock test for api interception'
        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })
    await page.goto('https://conduit.bondaracademy.com/')
})

test('Mock API Test @smoke', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('app-article-list h1').first()).toHaveText('This the mock test title')
    await expect(page.locator('app-article-list p').first()).toHaveText('This the mock test for api interception')
})

test('Mock API Test @regression', async ({ page }) => {
    await expect(page.locator('app-article-list h1').first()).toHaveText('This the mock test title')
    await expect(page.locator('app-article-list p').first()).toHaveText('This the mock test for api interception')
})
test('Mock API Test @sanity @unit', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('app-article-list h1').first()).toHaveText('This the mock test title')
    await expect(page.locator('app-article-list p').first()).toHaveText('This the mock test for api interception')
})

// npx playwright test --project=chromium --grep @smoke
// npx playwright test --project=chromium --grep "@smoke|unit"