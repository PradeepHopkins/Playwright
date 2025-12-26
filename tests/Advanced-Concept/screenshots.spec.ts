import test from '@playwright/test'
import { NavigationPage } from '../../page-objects/navigation-page'
import { FormLayoutsPage } from '../../page-objects/form-layouts-page'
import { faker } from '@faker-js/faker'

const randomFullName = faker.person.fullName()
const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

test('Full Page ScreenShot', async ({ page }) => {
    await page.goto("http://localhost:4200")
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await page.screenshot({ path: '.screenshots/FormLayoutPage.png' })
})

test('Particular Section/Part ScreenShot', async ({ page }) => {
    await page.goto("http://localhost:4200")
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: '.screenshots/inline.png' })
})

// Let's say that after the screenshot is created you want to save it as a binary.
// In order to send to some other system or servers or maybe integrate with a slack so you can save the
// screenshot as a binary as well.

test('Binary ScreenShot', async ({ page }) => {
    await page.goto("http://localhost:4200")
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    const buffer = await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: '.screenshots/inline.png' })
    // const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))
})