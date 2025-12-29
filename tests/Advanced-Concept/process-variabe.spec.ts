import test from '@playwright/test'
import { NavigationPage } from '../../page-objects/navigation-page'
import { FormLayoutsPage } from '../../page-objects/form-layouts-page'
import {faker} from '@faker-js/faker'
import 'dotenv/config'

const randomFullName =  faker.person.fullName()
const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

test('Test Data Generator', async ({ page }) => {
    await page.goto(process.env.BASE_URL)
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
// Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

// Install:
// npm install dotenv --save

// Useage: 
// Load dotenv as early as possible in your application.
// ES Modules (recommended)
// import 'dotenv/config';

// ES Modules with custom configuration
// import dotenv from 'dotenv';
// dotenv.config({
//   path: '/custom/path/to/.env',
// });

// Notes:

// import 'dotenv/config' is the simplest option when you don’t need custom settings.

// Use dotenv.config() only when you need options like a custom .env path.

// Always load dotenv before accessing process.env.