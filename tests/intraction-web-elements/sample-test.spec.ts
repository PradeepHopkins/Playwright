import { expect, test } from "@playwright/test"
import { filter } from "rxjs-compat/operator/filter";


test('Typical Commands to Run Inside a Playwright Project Directory', async ({ page }) => {
  // 🔧 Project Setup & Maintenance
  // 1. Install Playwright (initall setup)
  // npm init playwright@latest
  // or, if already in a Node project:
  // npm i -D @playwright/test
  // npx playwright install

  // 2. Install browsers
  // npx playwright install

  // 3. Update Playwright
  // npx playwright install --with-deps

  // ▶️ Running Tests
  // 1. Run all tests / Runs the end-to-end tests.
  // npx playwright test

  // 2. Run tests with UI mode / Starts the interactive UI mode.
  // npx playwright test --ui

  // 3. Run a specific test file / Runs the tests in a specific file.
  // npx playwright test example

  // 4. Run a single test (by title)
  // npx playwright test -g "Test tittle"

  // 5. Run tests in Chromium browser / Runs the tests only on Desktop Chrome.
  // npx playwright test --project=chromium

  // 🤖 Code Generation & Debugging
  // 1. Launch code generator / Auto generate tests with Codegen.
  // npx playwright codegen
  // or, run lauch with url/
  //  npx playwright codegen <Url>

  // 2. Runs the tests in debug mode.
  // npx playwright test --debug

  // 3. Open Playwright Inspector
  // npx playwright test --headed

  // 📊 Reports
  // Show the test report
  // npx playwright show-report
})

test.beforeEach('Navigate to page', async ({ page }) => {
  await page.goto("http://localhost:4200")
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
});

test('First Test', async ({ page }) => {

  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Sceond Test', async ({ page }) => {

  await page.goto("http://localhost:4200")
  await page.getByText('Forms').click()
  await page.getByText('Datepicker').click()
})

test('Locator Syntax Rules', async ({ page }) => {

  // by Tag
  page.locator('input')

  // by ID
  page.locator('#inputEmail1')

  // by Attribute
  page.locator('[placeholder="Email"]')

  // by Class Value
  page.locator('.nb-transition')

  // by Class Value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  // by Partial text
  page.locator(':text("Using")')

  // by exact text match
  page.locator(':text-is("Using the Grid")') //:text-is("…") — exact match only

  // combine different selector
  page.locator('input#inputEmail1.nb-transition') // compound selector — all conditions must match the same element.

  // by Xpath (Not Recommended)
  page.locator('//*[@id="inputEmail1"')
})


test('User Facing Locator', async ({ page }) => {
  // User-facing locators are Playwright’s recommended way to find elements based on 
  // how a real user perceives the page — not based on HTML structure or CSS.

  await page.getByRole('textbox', { name: 'Email' }).first().click()
  await page.getByRole('textbox', { name: 'Password' }).first().click()
  await page.getByRole('button', { name: 'Sign in' }).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jane Doe').click()

  await page.getByText('Using the Grid').click()

  await page.getByTestId('Dummy').click()

  await page.getByTitle('IoT Dashboard').click()

})

test('Locating child elements', async ({ page }) => {
  /* 
   Meaning:
  
  nb-card → find all <nb-card> elements
  
  space → find descendants
  
  nb-radio → inside the card
  
  space → deeper descendants
  
  :text-is("Option 1") → find the element whose exact text is "Option 1" */

  await page.locator('nb-card nb-radio :text-is("Option 1")').click() // descendant selector — the space means any depth below.
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click()

  await page.locator('nb-card').nth(1).locator('button').click() // avoid using index based locator (.nth)

})

test('Locating parent elements', async ({ page }) => {

  await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click()

  await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: 'Email' }).click()

  await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('textbox', { name: 'Email' }).click()
  await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: 'Email' }).click()

  await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: 'Sign in' }).getByRole('textbox', { name: 'Email' }).click()

  await page.locator(':text-is("Using the Grid")').locator("..").getByRole('textbox', { name: 'Email' }).click()

})

test('Reusing Locator', async ({ page }) => {

  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  const emailField = basicForm.getByRole('textbox', { name: 'email' })
  const passwordField = basicForm.getByRole('textbox', { name: 'password' })

  await emailField.fill("pradeep@gamil.com")
  await passwordField.fill("123@test")
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('pradeep@gamil.com')
  await expect(passwordField).toHaveValue('123@test')
})

test('Extracting values', async ({ page }) => {
  // Single text vlaue
  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  const buttonText = await basicForm.getByRole('button').textContent()
  expect(buttonText).toEqual('Submit')

  // All text values
  const ratioButtonLayoutText = await page.locator('nb-radio').allTextContents()
  expect(ratioButtonLayoutText).toContain('Option 1')

  // input Value
  const emailField = basicForm.getByRole('textbox', { name: 'Email' })
  await emailField.fill('TestDemo@gmail.com')
  const emailVlaue = await emailField.inputValue()
  expect(emailVlaue).toEqual('TestDemo@gmail.com')

  const placeholderVlue = await emailField.getAttribute('placeholder')
  expect(placeholderVlue).toEqual("Email")

})

test('Assertion', async ({ page }) => {
  // General assertion
  const value = 5
  expect(value).toEqual(5)

  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button')
  const buttonText = await basicForm.textContent()
  expect(buttonText).toEqual('Submit')

  // Locator assertion
  await expect(basicForm).toHaveText('Submit')

  // Soft assertion
  await expect.soft(basicForm).toHaveText('Submit5')
  await basicForm.click()
})
