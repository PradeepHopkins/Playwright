import { expect, test } from '@playwright/test'
import 'dotenv/config'
import { NavigationPage } from '../../page-objects/navigation-page'

test('Visual Testing', async ({ page }, testInfo) => {

    await page.goto('http://localhost:4200')
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage()
    const usingTheGridForms = page.locator('nb-card', { hasText: 'Using the Grid' })
    // await usingTheGridForms.getByLabel('Option 1').check() // check() used to select radio button
    await usingTheGridForms.getByRole('radio', { name: 'Option 1' }).check({ force: true }) // Whether to bypass the actionability checks. {force: Defaults to false}.
    // Locator Assertion
    await expect(usingTheGridForms.getByRole('radio', { name: 'Option 1' })).toHaveScreenshot()
})
// Playwright Test includes the ability to produce and visually compare screenshots using await expect(page).toHaveScreenshot(). 
// On first execution, Playwright test will generate reference screenshots. Subsequent runs will compare against the reference.

// # Updating screenshots
// Sometimes you need to update the reference screenshot, for example when the page has changed. 
// Do this with the --update-snapshots flag.
// npx playwright test --update-snapshots

// # maxDiffPixels
// Playwright Test uses the pixelmatch library. You can pass various options to modify its behavior:
//  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });