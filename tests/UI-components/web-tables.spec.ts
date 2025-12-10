import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
    await page.getByRole('link', { name: 'Tables & Data' }).click()
    await page.getByRole('link', { name: 'Smart Table' }).click()
})

test("get the target row by any rows in table", async ({ page }) => {
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' })
    // Click edit icon inside that row
    await expect(targetRow.locator('.nb-edit')).toBeVisible()
    await targetRow.locator('.nb-edit').click()
    const ageInput = page.locator('input-editor').getByPlaceholder('Age')
    await ageInput.clear()
    await ageInput.fill('25')
    await expect(ageInput).toHaveValue('25')
    await page.locator('.nb-checkmark').click()
})

test("Get the row bases on the value in the specific column", async ({ page }) => {
    const pagination = page.locator('.ng2-smart-pagination')
    await pagination.getByRole('link', { name: '2' }).click()
    const targetRow = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRow.locator('.nb-edit').click()
    const inputFiled = page.locator('input-editor').getByPlaceholder('E-mail')
    await inputFiled.clear()
    await inputFiled.fill('Pradeep@concord.net')
    await page.locator('.nb-checkmark').click()
    await expect(targetRow.locator('td').nth(5)).toHaveText('Pradeep@concord.net')
})

test("Test filter of the table", async ({ page }) => {
    const ages = ['20', '30', '40', '200']

    for (const age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500) // wait for filter result will show (animation)
        const ageRows = page.locator('tbody tr')

        for (const row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if (age == '200') {
                await expect(page.locator('tbody td')).toHaveText(' No data found ')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})
