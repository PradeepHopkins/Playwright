import test from '@playwright/test'
import { NavigationPage } from '../../../page-objects/navigation-page'
import { FormLayoutsPage } from '../../../page-objects/form-layouts-page'
import {faker} from '@faker-js/faker'

const randomFullName =  faker.person.fullName()
const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

test('Test Data Generator', async ({ page }) => {
    await page.goto("http://localhost:4200")
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})