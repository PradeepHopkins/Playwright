import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Radio Buttons', async ({ page }) => {

    const usingTheGridForms = page.locator('nb-card', { hasText: 'Using the Grid' })

    // await usingTheGridForms.getByLabel('Option 1').check() // check() used to select radio button
    await usingTheGridForms.getByRole('radio', { name: 'Option 1' }).check({ force: true }) // Whether to bypass the actionability checks. {force: Defaults to false}.
    // Generic Assertion
    const radioButton1 = await usingTheGridForms.getByRole('radio', { name: 'Option 1' }).isChecked()
    expect(radioButton1).toBeTruthy()
    // Locator Assertion
    await expect(usingTheGridForms.getByRole('radio', { name: 'Option 1' })).toBeChecked()

    await usingTheGridForms.getByRole('radio', {name: 'Option 2'}).check({force: true})
    const radioButton2 = await usingTheGridForms.getByRole('radio', {name: 'Option 2'}).isChecked()
    expect(radioButton2).toBeTruthy()

    // ensure radio button1 is disable
    await expect( usingTheGridForms.getByRole('radio', { name: 'Option 1' })).not.toBeChecked() // locator Assertion
    expect(await usingTheGridForms.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy() // Generic Assertion
})