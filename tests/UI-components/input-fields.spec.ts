import test, { expect } from "@playwright/test";
import { delay } from "rxjs-compat/operator/delay";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
})

test.describe("Form Layouts page ", async () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test("Input Fields", async ({ page }) => {

        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'email' })
        await usingTheGridEmailInput.fill("Concord@gmail.com")
        await usingTheGridEmailInput.clear() // clear the input value
        await usingTheGridEmailInput.pressSequentially('pradeep@gmail.com', {delay: 500}) // using Keyboard key values
        
        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('pradeep@gmail.com')

        // locator assertion 
        await expect(usingTheGridEmailInput).toHaveValue('pradeep@gmail.com');
    })

})