import { expect, test } from '@playwright/test'
import 'dotenv/config'
import { NavigationPage } from '../../page-objects/navigation-page'

test('Mobile Test', async ({ page }, testInfo) => {

    await page.goto('http://localhost:4200')
    const navigateTo = new NavigationPage(page);
    if (testInfo.project.name == 'Mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    await navigateTo.formLayoutsPage()
    if (testInfo.project.name == 'Mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    const usingTheGridForms = page.locator('nb-card', { hasText: 'Using the Grid' })
    // await usingTheGridForms.getByLabel('Option 1').check() // check() used to select radio button
    await usingTheGridForms.getByRole('radio', { name: 'Option 1' }).check({ force: true }) // Whether to bypass the actionability checks. {force: Defaults to false}.
    // Locator Assertion
    await expect(usingTheGridForms.getByRole('radio', { name: 'Option 1' })).toBeChecked()
})